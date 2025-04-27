import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { 
  FaJava, 
  FaAws, 
  FaGitAlt,
  FaGamepad
} from 'react-icons/fa';
import { SiSpringboot, SiApachekafka, SiGraphql, SiPython } from 'react-icons/si';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-700 p-4">
      {/* Centered container for entire page content */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center">

        {/* Profile Image */}
        <img 
          src="/avatar.png" 
          alt="Narlock Profile" 
          className="w-64 h-64 rounded-full mb-6 object-cover border-4 border-white bg-gray-800"
        />

        {/* Name */}
        <h1 className="text-5xl font-bold text-white">narlock</h1>

        {/* Subtitle */}
        <p className="text-gray-300 mt-4 max-w-2xl text-lg">
          Software Engineer with a focus on fullstack development and integration engineering across modern web, cloud, and distributed systems.
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
          <h2 className="text-3xl font-bold text-white mb-8">Technologies I use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Java */}
            <Link href="/projects?tech=Java" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <FaJava className="w-10 h-10 text-orange-400" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">Java</h3>
                <p className="text-gray-400 text-xs mt-1">Programming Language</p>
              </div>
            </Link>

            {/* Spring Boot */}
            <Link href="/projects?tech=Spring Boot" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <SiSpringboot className="w-10 h-10 text-green-400" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">Spring Boot</h3>
                <p className="text-gray-400 text-xs mt-1">Java Framework</p>
              </div>
            </Link>

            {/* Apache Kafka */}
            <Link href="/projects?tech=Apache Kafka" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <SiApachekafka className="w-10 h-10 text-yellow-400" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">Apache Kafka</h3>
                <p className="text-gray-400 text-xs mt-1">Data Streaming</p>
              </div>
            </Link>

            {/* GraphQL */}
            <Link href="/projects?tech=GraphQL" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <SiGraphql className="w-10 h-10 text-pink-400" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">GraphQL</h3>
                <p className="text-gray-400 text-xs mt-1">Query Language</p>
              </div>
            </Link>

            {/* Python */}
            <Link href="/projects?tech=Python" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <SiPython className="w-10 h-10 text-blue-400" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">Python</h3>
                <p className="text-gray-400 text-xs mt-1">Programming Language</p>
              </div>
            </Link>

            {/* AWS */}
            <Link href="/projects?tech=AWS" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <FaAws className="w-10 h-10 text-yellow-500" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">AWS</h3>
                <p className="text-gray-400 text-xs mt-1">Cloud Services</p>
              </div>
            </Link>

            {/* Git */}
            <Link href="/projects?tech=Git" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <FaGitAlt className="w-10 h-10 text-red-400" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">Git</h3>
                <p className="text-gray-400 text-xs mt-1">Version Control</p>
              </div>
            </Link>

            {/* LibGDX */}
            <Link href="/projects?tech=LibGDX" className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition">
              <FaGamepad className="w-10 h-10 text-orange-300" />
              <div className="flex flex-col items-start ml-4">
                <h3 className="text-white text-base font-semibold">LibGDX</h3>
                <p className="text-gray-400 text-xs mt-1">Game Dev</p>
              </div>
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}
