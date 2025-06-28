"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Palette, Server, Database, Settings, CheckCircle } from "lucide-react";
import { profileData } from "../data/profile";

export default function SkillsSection() {
  const { skills } = profileData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getSkillColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Languages: "from-blue-500 to-blue-600",
      Frontend: "from-purple-500 to-purple-600",
      Backend: "from-green-500 to-green-600",
      Databases: "from-indigo-500 to-indigo-600",
      "DevOps & Tools": "from-orange-500 to-orange-600",
      "Core Concepts": "from-red-500 to-red-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code className="w-6 h-6" />;
      case "Frontend":
        return <Palette className="w-6 h-6" />;
      case "Backend":
        return <Server className="w-6 h-6" />;
      case "Databases":
        return <Database className="w-6 h-6" />;
      case "DevOps & Tools":
        return <Settings className="w-6 h-6" />;
      case "Core Concepts":
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getProficiencyLevel = (category: string) => {
    const levels: { [key: string]: { level: string; percentage: number } } = {
      Languages: { level: "Advanced", percentage: 90 },
      Frontend: { level: "Expert", percentage: 95 },
      Backend: { level: "Advanced", percentage: 85 },
      Databases: { level: "Intermediate", percentage: 75 },
      "DevOps & Tools": { level: "Intermediate", percentage: 70 },
      "Core Concepts": { level: "Advanced", percentage: 88 },
    };
    return levels[category] || { level: "Intermediate", percentage: 70 };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
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
            Technical Skills
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            A comprehensive overview of my technical expertise and the tools I work with
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((skillCategory, index) => {
            const proficiency = getProficiencyLevel(skillCategory.category);
            
            return (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 group"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Header */}
                <div className="flex items-center mb-6">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${getSkillColor(skillCategory.category)} text-white mr-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getSkillIcon(skillCategory.category)}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {skillCategory.category}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${getSkillColor(skillCategory.category)} text-white`}>
                      {proficiency.level}
                    </span>
                  </div>
                </div>

                {/* Proficiency Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Proficiency
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {proficiency.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(skillCategory.category)}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${proficiency.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    />
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-3 mb-6">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 + skillIndex * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        {skill}
                      </span>
                      <motion.div
                        className="flex space-x-1"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.7 + skillIndex * 0.1 }}
                      >
                        {[1, 2, 3, 4, 5].map((level) => (
                          <motion.div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= 4 + Math.random()
                                ? `bg-gradient-to-r ${getSkillColor(skillCategory.category)}`
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                            whileHover={{ scale: 1.3 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Stats */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      {skillCategory.skills.length} Skills
                    </span>
                    <motion.div
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSkillColor(skillCategory.category)} text-white shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {proficiency.level}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies and best practices in web development.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Always Learning</span>
              </div>
              <div className="flex items-center">
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <span>Industry Ready</span>
              </div>
              <div className="flex items-center">
                <motion.div
                  className="w-3 h-3 bg-purple-500 rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <span>Best Practices</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}