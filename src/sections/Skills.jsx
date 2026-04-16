import { useState, useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';

function SkillBar({ name, level, icon, animate }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{name}</span>
        </div>
        <span className="text-sm font-bold text-violet-400">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 skill-bar-fill"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, [activeTab]);

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mx-auto mt-4" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {skills.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === i
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-[#16161f] text-gray-400 hover:text-white border border-white/5 hover:border-violet-500/30'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills[activeTab].items.map(skill => (
            <div key={skill.name} className="p-5 rounded-2xl bg-[#16161f] border border-white/5 hover:border-violet-500/20 transition-all duration-200">
              <SkillBar {...skill} animate={animate} />
            </div>
          ))}
        </div>

        {/* Bottom summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { label: 'Frontend', value: '6+', desc: 'Frameworks & Libraries', icon: '🎨' },
            { label: 'Backend', value: '5+', desc: 'Technologies & DBs', icon: '⚙️' },
            { label: 'Tools', value: '10+', desc: 'Dev Tools & Platforms', icon: '🛠️' },
            { label: 'Projects', value: '30+', desc: 'Completed Projects', icon: '🚀' },
          ].map(card => (
            <div key={card.label} className="p-5 rounded-2xl bg-[#16161f] border border-white/5 text-center hover:border-violet-500/20 transition-all duration-200 card-hover">
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-2xl font-black gradient-text">{card.value}</div>
              <div className="text-white font-semibold text-sm">{card.label}</div>
              <div className="text-gray-500 text-xs mt-1">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
