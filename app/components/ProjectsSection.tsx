"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Calendar, Zap, Star } from "lucide-react";
import { profileData } from "../data/profile";

export default function ProjectsSection() {
  const { projects } = profileData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      React: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Next.js": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      TailwindCSS: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
      Fastify: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      PostgreSQL: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      Prisma: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      Supabase: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      Cloudinary: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      Vite: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    };
    return colors[tech] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

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

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
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
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            A showcase of my latest work in full-stack development
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col w-full max-w-sm min-h-[600px] border border-gray-200 dark:border-gray-700"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Project Header */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Zap className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{project.duration}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTechColor(tech)}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 whitespace-nowrap">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.5 + featureIndex * 0.1 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span>{feature.split(".")[0]}.</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Project Actions */}
              <div className="px-6 pb-6">
                <div className="flex space-x-3">
                  {project.links.website && (
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={project.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </Link>
                    </motion.div>
                  )}
                  {project.links.github && (
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Blog Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Technical Blog
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sharing knowledge and insights from my development journey
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200/50 dark:border-purple-700/50">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {profileData.blog.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {profileData.blog.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                  Published on {profileData.blog.platform}
                </span>
                {profileData.blog.link && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={profileData.blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <span>Read Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}