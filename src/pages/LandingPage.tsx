"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from '../components/ui/aurora-background';
import { Link } from "react-router-dom";
import MovingCard from "../components/MovingCard";

const  LandingPage = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >

         <div className="text-4xl md:text-6xl dark:text-white text-center font-extrabold">
         Test Your Skills & Boost
          <br />
          <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Your Knowledge
          </span>
        </div>
        <div className="flex justify-center items-center">
  <div className="font-extralight text-center text-base md:text-2xl dark:text-neutral-200 py-4">
    Challenge Yourself with Interactive Quizzes. Track Progress, <br /> Dive into Coding, and Level Up!
  </div>
</div>

        <Link to={'/questions'}>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-5 py-2">
          Start now
        </button>
        </Link>
       
      </motion.div>
      
    </AuroraBackground>
    
  );
}

export default LandingPage;