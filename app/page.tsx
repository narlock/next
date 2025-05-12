import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { 
  FaJava, 
  FaAws, 
  FaGitAlt,
  FaGamepad
} from 'react-icons/fa';
import { SiSpringboot, SiApachekafka, SiGraphql, SiPython, SiJavascript } from 'react-icons/si';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-700 p-4">
      {/* Centered container for entire page content */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center">

        {/* Profile Image */}
        <img 
          src="/avatar.png" 
          alt="Narlock Profile" 
          className="w-48 h-48 rounded-full mb-6 object-cover border-4 border-white bg-gray-800"
        />

        {/* Name */}
        <h1 className="text-5xl font-bold text-white">narlock</h1>

        {/* Subtitle */}
        <p className="text-gray-300 mt-4 max-w-2xl text-lg">
          Software Engineer with a focus on Integration Engineering and Fullstack Development across modern web, cloud, and distributed systems.
        </p>

        {/* Social Links */}
        <div className="flex space-x-6 mt-6">
          <a href="https://github.com/narlock" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="w-8 h-8 text-white hover:text-gray-400 hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="https://discord.gg/eEbEYbXaNS" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDiscord} className="w-8 h-8 text-white hover:text-gray-400 hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="https://www.youtube.com/@narlock" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} className="w-8 h-8 text-white hover:text-gray-400 hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="https://x.com/narlockdev" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} className="w-8 h-8 text-white hover:text-gray-400 hover:scale-110 transition-transform duration-300" />
          </a>
        </div>

        {/* Divider */}
        <hr className="w-full border-t border-gray-600 my-12" />

        {/* Technologies Section */}
        <section className="w-full">
          <h2 className="text-3xl font-bold text-white">Technologies I use</h2>
          <p className="text-gray-400 text-sm mt-2 mb-8 max-w-xl mx-auto">
            Click on any technology below to view projects where I've used that technology.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Java */}
            <Link href="/projects?tech=Java" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <FaJava className="w-10 h-10 md:w-12 md:h-12 text-orange-400" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">Java</h3>
                <p className="text-gray-400 text-xs mt-1">Programming Language</p>
              </div>
            </Link>

            {/* Spring Boot */}
            <Link href="/projects?tech=Spring Boot" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <SiSpringboot className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">Spring Boot</h3>
                <p className="text-gray-400 text-xs mt-1">Java Framework</p>
              </div>
            </Link>

            {/* Apache Kafka */}
            <Link href="/projects?tech=Apache Kafka" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <SiApachekafka className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">Apache Kafka</h3>
                <p className="text-gray-400 text-xs mt-1">Data Streaming</p>
              </div>
            </Link>

            {/* GraphQL */}
            <Link href="/projects?tech=GraphQL" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <SiGraphql className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">GraphQL</h3>
                <p className="text-gray-400 text-xs mt-1">Query Language for APIs</p>
              </div>
            </Link>

            {/* Python */}
            <Link href="/projects?tech=Python" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <SiPython className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">Python</h3>
                <p className="text-gray-400 text-xs mt-1">Programming Language</p>
              </div>
            </Link>

            {/* AWS */}
            <Link href="/projects?tech=AWS" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <FaAws className="w-10 h-10 md:w-12 md:h-12 text-yellow-500" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">AWS</h3>
                <p className="text-gray-400 text-xs mt-1">Cloud Services</p>
              </div>
            </Link>

            {/* Git */}
            <Link href="/projects?tech=Git" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <FaGitAlt className="w-10 h-10 md:w-12 md:h-12 text-red-400" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">Git</h3>
                <p className="text-gray-400 text-xs mt-1">Version Control</p>
              </div>
            </Link>

            {/* JavaScript */}
            <Link href="/projects?tech=JavaScript" className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-orange-900 hover:scale-105 transition duration-300">
              <SiJavascript className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
              <div className="flex flex-col items-center md:items-start ml-0 md:ml-4 mt-2 md:mt-0">
                <h3 className="text-white text-base font-semibold">JavaScript</h3>
                <p className="text-gray-400 text-xs mt-1">Programming Language</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
