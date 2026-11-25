import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Copy, Check, Mail, Phone, MapPin } from "lucide-react";

import { styles } from "@/styles";
import { EarthCanvas } from "@/components/canvas";
import { SectionWrapper } from "@/hoc";
import { slideIn } from "@/utils/motion";
import { analyticsService } from "@/services/analyticsService";

export const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ducnv179.wk@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return;

    setLoading(true);

    try {
      await analyticsService.addMessage({
        senderName: form.name.trim() || "Recruiter / Visitor",
        senderContact: form.email.trim() || "Not provided",
        message: form.message.trim(),
      });

      setLoading(false);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        message: "",
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#915EFF", "#00cea8", "#bf61ff", "#ffffff"],
      });

      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong. Please email directly to ducnv179.wk@gmail.com");
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl border border-white/10'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/* 1-Click Copy Direct Email Box */}
        <div className='my-5 p-4 rounded-xl bg-tertiary border border-white/10 flex items-center justify-between'>
          <div className='flex items-center gap-2.5 text-sm font-mono text-white'>
            <Mail className='w-4 h-4 text-[#915EFF]' />
            <span>ducnv179.wk@gmail.com</span>
          </div>
          <button
            type='button'
            onClick={handleCopyEmail}
            className='p-2 rounded-lg bg-white/[0.08] hover:bg-[#915EFF] text-white transition-colors cursor-pointer'
            title='Copy Email'
          >
            {copied ? <Check className='w-4 h-4 text-emerald-400' /> : <Copy className='w-4 h-4' />}
          </button>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-6 flex flex-col gap-6'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium focus:border-[#915EFF] transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3'>Your Email / Contact</span>
            <input
              type='text'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email or LinkedIn handle?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium focus:border-[#915EFF] transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3'>Your Message</span>
            <textarea
              rows={5}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to build or discuss?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium focus:border-[#915EFF] transition-colors resize-none'
              required
            />
          </label>

          {success && (
            <p className='text-emerald-400 font-mono text-xs'>
              ✓ Thank you! Your message has been dispatched straight to Nguyen Van Duc.
            </p>
          )}

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary border border-white/10 hover:border-[#915EFF] hover:bg-[#915EFF]/10 transition-all cursor-pointer'
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className='mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs font-mono text-secondary'>
          <div className='flex items-center gap-2'>
            <Phone className='w-3.5 h-3.5 text-[#915EFF]' />
            <span>078.855.1709</span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='w-3.5 h-3.5 text-[#915EFF]' />
            <span>Da Nang, Viet Nam · Remote Ready</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
