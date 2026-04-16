import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/portfolio';

export default function Testimonials() {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Kind Words</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="relative bg-[#16161f] rounded-2xl p-6 border border-white/5 hover:border-violet-500/20 transition-all duration-300 card-hover flex flex-col gap-4">
              <div className="absolute top-5 right-5 text-violet-500/20">
                <Quote size={40} fill="currentColor" />
              </div>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-violet-500/20" />
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
