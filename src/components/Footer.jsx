import { Heart, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { personalInfo, navLinks } from '../data/portfolio';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#080810] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-2xl font-black gradient-text mb-3">&lt;Hasmat /&gt;</div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Fullstack Developer & Senior Software Engineer passionate about building beautiful, performant web experiences.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-500 hover:text-violet-400 text-sm text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
                { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-4">{personalInfo.email}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            Made with <Heart size={13} className="text-violet-500 fill-violet-500" /> by {personalInfo.name} © {new Date().getFullYear()}
          </p>
          <button onClick={scrollTop}
            className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400 hover:bg-violet-600 hover:text-white transition-all duration-200">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
