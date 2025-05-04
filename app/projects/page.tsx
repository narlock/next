'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '../../data/projects.json' assert { type: 'json' };

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const techFilter = searchParams.get('tech');

  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    if (techFilter) {
      const filtered = projectsData.filter((project) =>
        project.technologies.includes(techFilter)
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projectsData);
    }
  }, [techFilter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredProjects.map((project, index) => (
        <Link key={index} href={project.website}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-orange-900 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
            
            {/* Icon inside a rounded rectangle */}
            <div className="bg-gray-900 p-4 rounded-4xl mb-4 border-2 border-white">
              <Image
                src={project.icon}
                alt={`${project.title} Icon`}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-white">{project.title}</h2>

            {/* Description */}
            <p className="text-gray-400 mt-2">{project.description}</p>

            {/* Technologies */}
            <div className="flex flex-wrap justify-center mt-4">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2 mb-2"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center mt-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* GitHub Link */}
            {project.github && (
              <div className="mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:underline text-sm"
                  onClick={(e) => e.stopPropagation()} // prevent card link from triggering
                >
                  View on GitHub
                </a>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Projects</h1>

      {/* Wrap dynamic content inside Suspense */}
      <Suspense fallback={<div className="text-white text-center">Loading projects...</div>}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
