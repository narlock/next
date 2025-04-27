'use client';

import { useSearchParams } from 'next/navigation';
import projects from '../../data/projects.json'; // Adjust path depending on your structure

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const techFilter = searchParams.get('tech');

  const filteredProjects = techFilter
    ? projects.filter((project) =>
        project.technologies.includes(techFilter)
      )
    : projects; // Show all if no filter

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
            <p className="text-gray-400 mt-2">{project.description}</p>
            <div className="flex flex-wrap mt-4">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2 mb-2">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
