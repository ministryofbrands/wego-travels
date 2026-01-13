import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Fade In Section Component (Matching About/Services)
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    interest: 'Holiday Package',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "c9706216-ead7-44fb-8a1c-bba44052c6d8",
          name: formData.fullName,
          email: formData.email,
          interest: formData.interest,
          message: formData.message,
          subject: `New Inquiry from ${formData.fullName}`,
          from_name: "Wego Travels Website",
          to_email: "ilankoonhansani@gmail.com"
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmissionStatus('success');
        setFormData({ fullName: '', email: '', interest: 'Holiday Package', message: '' });
      } else {
        setSubmissionStatus('error');
      }
    } catch (err) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Immersive Hero Section - Matching Site Aesthetic */}
      <section className="relative h-[85vh] w-full bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[2px] w-12 bg-[#F48A34]"></div>
              <span className="text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base">Support 24/7</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
              Let's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                Talk.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
              We're here to help you design your next unforgettable journey. Reach out and let the adventure begin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="py-32 bg-white antialiased relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="relative mb-24 text-center">
              <span
                className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                style={{ WebkitTextStroke: '2px #f3f5f8ff', color: 'rgba(246, 248, 249, 0.5)' }}
              >
                CONTACT
              </span>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                  <span className="text-[#F48A34] font-bold tracking-widest uppercase text-sm">Reach Out</span>
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Get In Touch With Us</h2>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                  Have questions about our tours or need assistance with your travel plans? Our team is ready to help you every step of the way.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
                  color: 'bg-blue-50',
                  iconColor: 'text-blue-600'
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  details: ['hello@wegotravels.com', 'support@wegotravels.com'],
                  color: 'bg-orange-50',
                  iconColor: 'text-orange-600'
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  details: ['123 Adventure Lane, Suite 400', 'Travel City, TC 90210'],
                  color: 'bg-green-50',
                  iconColor: 'text-green-600'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-8 md:p-6 lg:p-10 rounded-[2.5rem] border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-500 group bg-white shadow-sm flex flex-col h-full">
                  <div className={`mb-8 md:mb-6 lg:mb-8 w-16 h-16 md:w-12 md:h-12 lg:w-16 lg:h-16 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className={`w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-2xl md:text-xl lg:text-2xl font-bold text-blue-900 mb-4">{item.title}</h3>
                  <div className="space-y-2 mt-auto">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-500 font-light text-lg md:text-sm lg:text-lg">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* 3. Main Contact Section: Form & Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Contact Form */}
            <FadeInSection>
              <div className="bg-gray-50 p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Send a Message</h2>
                  <p className="text-gray-500 font-light">Tell us about your dreams, and we'll help you fly.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {submissionStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl flex items-center gap-4 mb-6"
                    >
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                      <p className="font-medium text-sm">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                    </motion.div>
                  )}

                  {submissionStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-center gap-4 mb-6"
                    >
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <p className="font-medium text-sm">Something went wrong. Please try again later or contact us directly via email.</p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F48A34] focus:border-transparent outline-none transition-all shadow-sm disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F48A34] focus:border-transparent outline-none transition-all shadow-sm disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Interest</label>
                    <div className="relative">
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F48A34] focus:border-transparent outline-none transition-all shadow-sm appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option>Holiday Package</option>
                        <option>Business Tour</option>
                        <option>Ticket Booking</option>
                        <option>General Inquiry</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Share your travel vision..."
                      required
                      disabled={isSubmitting}
                      className="w-full px-8 py-6 bg-white border border-gray-100 rounded-3xl focus:ring-2 focus:ring-[#F48A34] focus:border-transparent outline-none transition-all shadow-sm resize-none disabled:opacity-50"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F48A34] text-white font-bold py-6 rounded-2xl hover:bg-orange-600 transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 text-lg group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </FadeInSection>

            {/* Additional Info & Map */}
            <div className="space-y-16">
              <FadeInSection>
                <div>
                  <h3 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-4">
                    <Clock className="text-[#F48A34]" /> Our Schedule
                  </h3>
                  <div className="space-y-4">
                    {[
                      { days: 'Monday - Friday', time: '09:00 AM - 08:00 PM' },
                      { days: 'Saturday', time: '10:00 AM - 04:00 PM' },
                      { days: 'Sunday', time: 'Closed' }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-6 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                        <span className="font-bold text-gray-900">{item.days}</span>
                        <span className="text-gray-500 font-light">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection>
                <div className="relative">
                  <h3 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-4">
                    <Globe className="text-[#F48A34]" /> Find Us
                  </h3>
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] border-8 border-white">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280821814!2d-74.11976373993144!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1642100000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                    ></iframe>
                  </div>
                  {/* Floating Map Detail */}
                  <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white p-6 rounded-2xl shadow-2xl hidden md:block max-w-[200px]">
                    <p className="text-xs font-black uppercase tracking-widest mb-2 text-orange-400">Main Office</p>
                    <p className="text-sm font-light">Join us in the heart of Travel City.</p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}