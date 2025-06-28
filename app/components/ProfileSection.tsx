"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ChevronDown, Download, MapPin } from "lucide-react";
import { profileData } from "../data/profile";

export default function ProfileSection() {
  const { personal } = profileData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id="profile"
      className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-300 shadow-inner">
                {personal.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              {personal.name}
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-xl md:text-2xl font-medium mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Full-Stack Developer & Tech Enthusiast
            </motion.h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {personal.bio}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <Mail className="w-5 h-5 text-blue-500" />
              <Link
                href={`mailto:${personal.email}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {personal.email}
              </Link>
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <Phone className="w-5 h-5 text-green-500" />
              <Link
                href={`tel:${personal.phone}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {personal.phone}
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <MapPin className="w-5 h-5 text-red-500" />
              <span>Hyderabad, India</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center space-x-6 mb-10"
            variants={itemVariants}
          >
            {personal.github && (
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </Link>
              </motion.div>
            )}
            {personal.linkedin && (
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Linkedin className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
            </motion.button>

            <motion.button
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={floatingVariants}
        animate="animate"
      >
        <motion.div
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            const element = document.getElementById("experience");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}