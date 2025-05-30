import { profileData } from "../data/profile";

export default function ExperienceSection() {
  const { education, experience } = profileData;

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My academic journey and professional experience in web development
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800"></div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center mb-12">
            <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {education.degree} in {education.field}
                </h3>
                <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {education.institution}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {education.location}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {education.duration}
                </p>
                <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  CGPA: {education.cgpa}
                </div>
              </div>
            </div>

            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center order-1 md:order-2">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z" />
              </svg>
            </div>

            <div className="flex-1 md:pl-8 order-3 md:order-3"></div>
          </div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-1 md:pr-8 order-2 md:order-1"></div>

            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-green-600 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center order-1 md:order-2">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>

            <div className="flex-1 md:pl-8 order-3 md:order-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {experience.role}
                </h3>
                <h4 className="text-lg text-green-600 dark:text-green-400 font-medium mb-2">
                  {experience.company}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {experience.type}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {experience.duration}
                </p>

                <ul className="space-y-2">
                  {experience.description.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
