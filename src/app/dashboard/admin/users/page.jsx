"use client";

import { useEffect, useState } from "react";
import { Card, Avatar, Chip, Button } from "@heroui/react";
import toast from "react-hot-toast";
import {
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/admin/users`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error("Failed to load users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleToggleBlock = async (email, isBlocked) => {
    setActionLoading(email);
    const endpoint = isBlocked ? "unblock" : "block";

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SITE_URL}/api/admin/users/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isBlocked ? "User Unblocked! " : "User Blocked! ");
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.email === email ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(null);
    }
  };
  const { data:session } = authClient.useSession();
  console.log('sestion', session);
  const filteredUsers = users.filter(user => {
    if (user.email === session?.user?.email) return false;
    return (
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  return (
    <div className="w-full px-2 sm:px-4 md:p-8 space-y-6 mt-20 md:mt-0 max-w-full">

      <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800 pb-5 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineUsers className="size-8 text-indigo-600 dark:text-indigo-400" />
            Manage Users
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            View platform members, manage control access, and toggle block status.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 font-medium"
            />
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 rounded-xl transition-all shadow-sm active:scale-95 text-gray-700 dark:text-slate-200 shrink-0"
          >
            <HiOutlineArrowPath className={`size-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden w-full">
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-6 col-span-full">Loading user directory...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-6 col-span-full">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm w-full">
              <div className="flex items-center gap-3">
                <Avatar radius="xl" className="">
                  <Avatar.Image alt={user.name} src={user?.image
} />
                </Avatar>
                <div className="truncate min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-800/60 pt-3">
                <div className="flex gap-1.5">
                  <Chip size="sm" variant="flat" className="capitalize font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                    {user.role}
                  </Chip>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={user.isBlocked ? "danger" : "success"}
                    className="font-bold"
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Chip>
                </div>
                <Button
                  size="sm"
                  radius="lg"
                  variant={user.isBlocked ? "solid" : "bordered"}
                  color={user.isBlocked ? "success" : "danger"}
                  className="font-bold text-xs px-4"
                  isLoading={actionLoading === user.email}
                  onPress={() => handleToggleBlock(user.email, user.isBlocked)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
      <div className="hidden lg:block w-full overflow-hidden bg-white dark:bg-[#111827] border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm font-medium text-gray-700 dark:text-slate-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">Loading user records...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">No users available.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/40 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <Avatar src={user.image} name={user.name} radius="xl" size="sm" />
                    <span className="font-bold text-gray-900 dark:text-white">{user.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 dark:text-slate-400 font-mono text-xs">{user.email}</td>
                  <td className="py-4 px-6 capitalize">
                    <Chip size="sm" variant="flat" className="font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                      {user.role}
                    </Chip>
                  </td>
                  <td className="py-4 px-6">
                    <Chip
                      size="sm"
                      variant="dot"
                      color={user.isBlocked ? "danger" : "success"}
                      className="font-bold border-none bg-transparent"
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </Chip>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      radius="xl"
                      variant={user.isBlocked ? "flat" : "light"}
                      color={user.isBlocked ? "success" : "danger"}
                      className="font-black text-xs px-4"
                      startContent={user.isBlocked ? <HiOutlineShieldCheck className="size-4" /> : <HiOutlineShieldExclamation className="size-4" />}
                      isLoading={actionLoading === user.email}
                      onPress={() => handleToggleBlock(user.email, user.isBlocked)}
                    >
                      {user.isBlocked ? "Unblock" : "Block User"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}