"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Briefcase, Calendar, MapPin, Award } from "lucide-react";
import { profileData } from "../data/profile";

export default function ExperienceSection() {
  const { education, experience } = profileData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            variants={itemVariants}
          >
            Experience & Education
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            My academic journey and professional experience in web development
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
            variants={timelineVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />

          {/* Education */}
          <motion.div
            className="relative flex flex-col md:flex-row items-start md:items-center mb-16"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200/50 dark:border-blue-700/50"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="p-2 bg-blue-500 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    Education
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {education.degree} in {education.field}
                </h3>
                <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {education.institution}
                </h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{education.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{education.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-green-500" />
                  <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    CGPA: {education.cgpa}
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center order-1 md:order-2 shadow-lg"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GraduationCap className="w-4 h-4 text-white" />
            </motion.div>

            <div className="flex-1 md:pl-8 order-3 md:order-3"></div>
          </motion.div>

          {/* Experience */}
          <motion.div
            className="relative flex flex-col md:flex-row items-start md:items-center"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-1 md:pr-8 order-2 md:order-1"></div>

            <motion.div
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center order-1 md:order-2 shadow-lg"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase className="w-4 h-4 text-white" />
            </motion.div>

            <div className="flex-1 md:pl-8 order-3 md:order-3">
              <motion.div
                className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200/50 dark:border-green-700/50"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="p-2 bg-green-500 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Briefcase className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    Experience
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {experience.role}
                </h3>
                <h4 className="text-lg text-green-600 dark:text-green-400 font-medium mb-3">
                  {experience.company}
                </h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{experience.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{experience.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {experience.description.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}