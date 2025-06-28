"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Send, Heart } from "lucide-react";
import { profileData } from "../data/profile";

export default function ContactSection() {
  const { personal } = profileData;
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
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-lg text-blue-100 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            I'm always open to discussing new opportunities, collaborating on interesting projects, or just having a chat about technology
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Contact Information */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Whether you have a project in mind, want to discuss opportunities, or simply want to connect, I'd love to hear from you. I'm currently open to new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <Link
                    href={`mailto:${personal.email}`}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {personal.email}
                  </Link>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Phone className="w-6 h-6" />
                </motion.div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <Link
                    href={`tel:${personal.phone}`}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {personal.phone}
                  </Link>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-6 h-6" />
                </motion.div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-blue-200">Hyderabad, India</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/20">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {personal.github && (
                  <motion.div
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
                    >
                      <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
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
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
                    >
                      <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </Link>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={profileData.blog.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-center"
              variants={floatingVariants}
              animate="animate"
            >
              <motion.div
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Ready to collaborate?</h3>
              <p className="text-blue-100 mb-6">
                I'm always excited to work on challenging projects and bring ideas to life. Let's discuss how we can work together.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`mailto:${personal.email}?subject=Let's%20Collaborate&body=Hi%20Nithin,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss...`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Start a Conversation
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/20 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
        >
          <p className="text-blue-200 flex items-center justify-center">
            © 2025 {personal.name}. Built with 
            <motion.span
              className="mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.span>
            using Next.js and Tailwind CSS.
          </p>
          <motion.p
            className="text-blue-300 mt-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            Thank you for visiting my portfolio!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}