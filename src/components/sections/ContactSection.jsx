import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ExternalLink,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/BrandIcons';
import { personalInfo } from '@/data/portfolioData';
import HandshakeInteractive from '@/components/ui/HandshakeInteractive';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const ContactSection = () => {
  const [copiedField, setCopiedField] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#080808] text-[#f4efea] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono tracking-[0.25em] text-[#888888] uppercase mb-2 block">
              GET IN TOUCH
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-white">
              GET IN TOUCH & CONNECT
            </h2>
            <div className="w-24 h-[2px] bg-[#d8c8a8] mx-auto mt-3"></div>
          </ScrollReveal>
        </div>

        {/* 1. INTERACTIVE HANDSHAKE COMPONENT WITH ZOOM REVEAL */}
        <ScrollReveal direction="zoom" delay={0.1} className="mb-20">
          <HandshakeInteractive />
        </ScrollReveal>

        {/* 2. CONTACT DETAILS & DIRECT FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info Cards (Slide in from Left) */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-5 space-y-4 text-left">
            <h3 className="font-syne text-xl font-bold text-white mb-2">
              Direct Contact Information
            </h3>
            <p className="text-xs sm:text-sm text-[#888888] mb-6">
              Feel free to copy my direct contact details or send a message:
            </p>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#d8c8a8]/40 flex items-center justify-between group transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#333333] flex items-center justify-center text-[#d8c8a8]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#666666] uppercase">Direct Email</div>
                  <div className="text-sm font-semibold text-[#f4efea] group-hover:text-[#d8c8a8] transition-colors">
                    {personalInfo.email}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className="p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a] text-[#888888] hover:text-[#d8c8a8] hover:border-[#d8c8a8] transition-all cursor-pointer"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#d8c8a8]/40 flex items-center justify-between group transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#333333] flex items-center justify-center text-[#d8c8a8]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#666666] uppercase">Phone Number</div>
                  <div className="text-sm font-semibold text-[#f4efea] group-hover:text-[#d8c8a8] transition-colors">
                    {personalInfo.phone}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className="p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a] text-[#888888] hover:text-[#d8c8a8] hover:border-[#d8c8a8] transition-all cursor-pointer"
                title="Copy Phone Number"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#333333] flex items-center justify-center text-[#d8c8a8]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#666666] uppercase">Location</div>
                  <div className="text-sm font-semibold text-[#f4efea]">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(personalInfo.location, 'location')}
                className="p-2.5 rounded-xl bg-[#181818] border border-[#2a2a2a] text-[#888888] hover:text-[#d8c8a8] hover:border-[#d8c8a8] transition-all cursor-pointer"
                title="Copy Location"
              >
                {copiedField === 'location' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Channels */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222]">
              <div className="text-[11px] font-mono text-[#666666] uppercase mb-3">Social Channels & Profiles</div>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#181818] hover:bg-[#222222] border border-[#2a2a2a] hover:border-[#d8c8a8] text-xs font-mono text-[#cccccc] hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-[#666666]" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#181818] hover:bg-[#222222] border border-[#2a2a2a] hover:border-[#d8c8a8] text-xs font-mono text-[#cccccc] hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#d8c8a8]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-[#666666]" />
                </a>
              </div>
            </div>

          </ScrollReveal>

          {/* Right: Direct Contact Form (Slide in from Right) */}
          <ScrollReveal direction="left" delay={0.25} className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#111111] border border-[#222222] text-left">
              <h3 className="font-syne text-xl font-bold text-white mb-2">
                Send a Quick Message
              </h3>
              <p className="text-xs sm:text-sm text-[#888888] mb-6">
                I'll get back to you as soon as possible:
              </p>

              {formSubmitted ? (
                <div className="py-12 px-6 rounded-2xl bg-[#181818] border border-[#d8c8a8]/40 text-center animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#d8c8a8]/20 text-[#d8c8a8] flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Message sent successfully!</h4>
                  <p className="text-xs sm:text-sm text-[#d8c8a8]">
                    Thank you for reaching out. I will respond to your email promptly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#777777] mb-1.5 uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-[#282828] text-sm text-[#f4efea] placeholder-[#555555] focus:outline-none focus:border-[#d8c8a8] transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#777777] mb-1.5 uppercase">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-[#282828] text-sm text-[#f4efea] placeholder-[#555555] focus:outline-none focus:border-[#d8c8a8] transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#777777] mb-1.5 uppercase">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Job Opportunity / Project Collaboration..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-[#282828] text-sm text-[#f4efea] placeholder-[#555555] focus:outline-none focus:border-[#d8c8a8] transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#777777] mb-1.5 uppercase">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-[#282828] text-sm text-[#f4efea] placeholder-[#555555] focus:outline-none focus:border-[#d8c8a8] transition-all font-sans resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#d8c8a8] hover:bg-[#e2d5bd] text-[#0d0d0d] font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
