import { getSession } from "better-auth/api"
import { redirect } from "next/navigation";


export const requireRole = async (role)=>{
    const user = await getSession();
    if(user.role !== role){
     return  redirect("/unauthorization")
    }
}