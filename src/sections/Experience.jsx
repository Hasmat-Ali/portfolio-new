import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { experience, education } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">My Journey</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Briefcase size={18} />
              </div>
              <h3 className="text-xl font-bold text-white">Work History</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent" />

              <div className="flex flex-col gap-8">
                {experience.map((exp, i) => (
                  <div key={exp.id} className="relative pl-12">
                    {/* Dot */}
                    <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      i === 0 ? 'bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-500/30' : 'bg-[#16161f] border-violet-500/30 text-violet-400'
                    }`}>
                      {i + 1}
                    </div>

                    <div className="bg-[#16161f] rounded-2xl p-6 border border-white/5 hover:border-violet-500/20 transition-all duration-300 card-hover">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h4 className="text-white font-bold text-lg">{exp.role}</h4>
                          <p className="text-violet-400 font-semibold">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                            <Calendar size={11} /> {exp.duration}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin size={11} /> {exp.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                      <ul className="flex flex-col gap-2 mb-4">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-violet-400 mt-0.5 shrink-0">▸</span>
                            {a}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {exp.tech.map(t => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education + Summary */}
          <div className="flex flex-col gap-8">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <GraduationCap size={18} />
                </div>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>
              {education.map((edu, i) => (
                <div key={i} className="bg-[#16161f] rounded-2xl p-6 border border-white/5 hover:border-violet-500/20 transition-all duration-300">
                  <h4 className="text-white font-bold">{edu.degree}</h4>
                  <p className="text-violet-400 font-semibold text-sm mt-1">{edu.school}</p>
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    <Calendar size={11} /> {edu.duration}
                  </p>
                  <p className="text-gray-400 text-sm mt-3">{edu.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-[#16161f] rounded-2xl p-6 border border-white/5">
              <h4 className="text-white font-bold mb-5">Career Highlights</h4>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Total Experience', value: '10+ Years' },
                  { label: 'Companies Worked', value: '3' },
                  { label: 'Projects Delivered', value: '20+' },
                  { label: 'Technologies Used', value: '15+' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <span className="text-violet-400 font-bold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-2xl p-6 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Available for hire</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                I'm currently open to new opportunities — full-time, contract, or freelance. Let's build something great together!
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-4 w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
