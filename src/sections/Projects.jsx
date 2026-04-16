import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { projects } from '../data/portfolio';

const categories = ['All', 'Fullstack', 'Frontend', 'Backend'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">My Work</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mx-auto mt-4" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A selection of projects I've built — from full-stack applications to polished UIs.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setShowAll(false); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-[#16161f] text-gray-400 hover:text-white border border-white/5 hover:border-violet-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-xl border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 font-semibold transition-all duration-200"
            >
              {showAll ? 'Show Less' : `Show All (${filtered.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="group relative bg-[#16161f] rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all duration-300 card-hover flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161f] via-transparent to-transparent" />
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-600/90 text-white text-xs font-semibold">
            <Star size={10} fill="currentColor" /> Featured
          </div>
        )}
        {/* Overlay links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-violet-600 transition-colors">
            <GithubIcon size={18} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-violet-600 transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
            {project.category}
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
