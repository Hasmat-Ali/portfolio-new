import { useState, useEffect } from 'react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons';
import { personalInfo } from '../data/portfolio';

const roles = ['Senior Software Engineer', 'Angular Developer', 'React Developer', 'Fullstack Developer', 'Node.js Developer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 blob animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-indigo-600/15 blob animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for work
            </div>

            <div>
              <p className="text-gray-400 text-lg mb-2">Hi there, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-4">
                <span className="text-white">{personalInfo.name.split(' ')[0]} </span>
                <span className="gradient-text glow-text">{personalInfo.name.split(' ')[1]}</span>
              </h1>
              <div className="flex items-center gap-3 text-2xl lg:text-3xl font-semibold text-gray-300 h-10">
                <span className="text-violet-400">&lt;</span>
                <span className="typing-cursor min-w-[280px]">{displayed}</span>
                <span className="text-violet-400">/&gt;</span>
              </div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{personalInfo.bio}</p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
              >
                View My Work <ExternalLink size={16} />
              </button>
              <a
                href={personalInfo.resumeUrl}
                download="Hasmat_Ali_Resume.docx"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-violet-500/50 text-white font-semibold transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5"
              >
                <Download size={16} /> Download CV
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Find me on</span>
              <div className="flex gap-3">
                {[
                  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
                  { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex gap-8 pt-4 border-t border-white/5">
              {[
                { value: personalInfo.yearsExp, label: 'Years Experience' },
                { value: personalInfo.projectsDone, label: 'Projects Done' },
                { value: personalInfo.happyClients, label: 'Happy Clients' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-3xl font-black gradient-text">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-[420px] lg:h-[420px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/40 to-indigo-600/40 blur-2xl animate-pulse-slow" />
              <div className="relative w-full h-full blob overflow-hidden border-2 border-violet-500/30">
                <img src={personalInfo.heroImage} alt={personalInfo.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent" />
              </div>
              <div className="absolute -left-8 top-1/4 bg-[#16161f] border border-white/10 rounded-xl px-4 py-3 shadow-xl animate-float">
                <div className="text-xs text-gray-400">Experience</div>
                <div className="text-lg font-bold text-white">{personalInfo.yearsExp} Years</div>
              </div>
              <div className="absolute -right-8 bottom-1/4 bg-[#16161f] border border-white/10 rounded-xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                <div className="text-xs text-gray-400">Projects</div>
                <div className="text-lg font-bold text-white">{personalInfo.projectsDone} Done</div>
              </div>
              <div className="absolute -top-4 right-1/4 bg-violet-600/90 rounded-xl px-3 py-2 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-xs text-white font-semibold">⚡ Open to Work</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs">Scroll down</span>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="animate-bounce">
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
