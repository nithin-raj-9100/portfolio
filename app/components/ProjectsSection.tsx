import Link from "next/link";
import { profileData } from "../data/profile";

export default function ProjectsSection() {
  const { projects } = profileData;

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      React: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Next.js":
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      TypeScript:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      TailwindCSS:
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
      Fastify:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      PostgreSQL:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      Prisma:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      Supabase:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      Cloudinary:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      Vite: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    };
    return (
      colors[tech] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my latest work in full-stack development
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col w-full max-w-sm min-h-[500px]"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {project.duration}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 min-h-[3rem]">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5 min-h-[4rem] items-start">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTechColor(
                          tech
                        )}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 whitespace-nowrap">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 min-h-[8rem] flex flex-col justify-start">
                    {project.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <svg
                            className="w-3 h-3 text-green-500 mt-1 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature.split(".")[0]}.</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 mt-auto">
                <div className="flex space-x-3">
                  {project.links.website && (
                    <Link
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span>Live Demo</span>
                      </div>
                    </Link>
                  )}
                  {project.links.github && (
                    <Link
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-800 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Code</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Technical Blog
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sharing knowledge and insights from my development journey
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {profileData.blog.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {profileData.blog.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Published on {profileData.blog.platform}
                </span>
                {profileData.blog.link && (
                  <Link
                    href={profileData.blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Read Article
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
