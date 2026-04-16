import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons';
import { personalInfo } from '../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Let's Talk</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mx-auto mt-4" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Let's work together</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: 'Location', value: personalInfo.location, href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 p-4 rounded-2xl bg-[#16161f] border border-white/5 hover:border-violet-500/30 transition-all duration-200 group">
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-200 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                    <div className="text-white font-medium text-sm">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-4">Follow me on</p>
              <div className="flex gap-3">
                {[
                  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
                  { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-11 h-11 rounded-xl bg-[#16161f] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#16161f] rounded-2xl p-8 border border-white/5">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-white font-bold text-xl">Message Sent!</h4>
                  <p className="text-gray-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block font-medium">Your Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-200" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block font-medium">Email Address</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-200" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block font-medium">Subject</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Project Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-200" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block font-medium">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-200 resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
