'use client';

import BannerSection from "@/components/homepage/BannerSection";
import FeaturedOpportunities from "@/components/homepage/FeaturedOpportunities";
import FeaturedStartups from "@/components/homepage/FeaturedStartups";
import StartupStats from "@/components/homepage/StartupStats";
import Testimonials from "@/components/homepage/Testimonials";
import WhyJoin from "@/components/homepage/WhyJoin";


export default function Home() {
  return (
  <>
   
    <BannerSection></BannerSection>
     <FeaturedStartups></FeaturedStartups>
      <WhyJoin></WhyJoin>
      <StartupStats/>
      <Testimonials></Testimonials>
     <FeaturedOpportunities></FeaturedOpportunities>
  
  
  </>
  );
}
