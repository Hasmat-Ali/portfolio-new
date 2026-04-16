import { MapPin, Mail, Phone, Download } from 'lucide-react';
import { personalInfo, techStack } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="section-padding bg-secondary relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-80 lg:w-96 lg:h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-indigo-600/30 rounded-2xl blur-xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 gradient-border">
                <img
                  src={personalInfo.aboutImage}
                  alt="About me"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
              </div>
              {/* Decorative dots */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 grid grid-cols-4 gap-1.5 opacity-30">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                ))}
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 grid grid-cols-4 gap-1.5 opacity-30">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{personalInfo.name}</h3>
              <p className="text-violet-400 font-medium">{personalInfo.title}</p>
            </div>

            <p className="text-gray-400 leading-relaxed text-lg">{personalInfo.bio}</p>

            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical blog posts. I believe in writing clean, maintainable code and building products that make a real difference.
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Mail, label: 'Email', value: personalInfo.email },
                { icon: Phone, label: 'Phone', value: personalInfo.phone },
                { icon: MapPin, label: 'Location', value: personalInfo.location },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-[#16161f] border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="text-sm text-white font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 w-fit"
            >
              <Download size={16} /> Download Resume
            </a>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">Technologies I work with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(tech => (
              <div
                key={tech.name}
                className="px-4 py-2 rounded-full bg-[#16161f] border border-white/8 text-sm font-medium text-gray-300 hover:border-violet-500/40 hover:text-white transition-all duration-200 cursor-default"
                style={{ borderColor: `${tech.color}20` }}
              >
                <span style={{ color: tech.color }}>●</span> {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
