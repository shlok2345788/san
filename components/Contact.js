'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './Contact.module.css';

const contactInfo = [
  {
    icon: '📍',
    label: 'Head Office',
    value: 'Mumbai, Maharashtra, India',
    sub: 'Serving Pan-India',
  },
  {
    icon: '📞',
    label: 'Call Us',
    value: '+91 98765 43210',
    sub: '24/7 Emergency Line',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'info@elitehygiene.in',
    sub: 'Response within 2 hours',
  },
  {
    icon: '🕐',
    label: 'Business Hours',
    value: 'Mon–Sat: 8AM – 8PM',
    sub: 'Emergency: 24/7',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Contact() {
  const [ref, visible] = useInView(0.1);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className={`${styles.contact} section`} id="contact">
      <div className="container">
        <div ref={ref} className={`${styles.inner} ${visible ? styles.visible : ''}`}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <div className="tag-label">Contact Us</div>
            <h2 className={styles.contactTitle}>
              Let's Build a<br /><span>Cleaner Tomorrow</span>
            </h2>
            <p className={styles.contactSub}>
              Reach out for a free consultation, service quote, or product enquiry. Our experts will respond within 2 business hours.
            </p>

            <div className={styles.infoCards}>
              {contactInfo.map((info) => (
                <div key={info.label} className={styles.infoCard}>
                  <span className={styles.infoIcon}>{info.icon}</span>
                  <div>
                    <div className={styles.infoLabel}>{info.label}</div>
                    <div className={styles.infoValue}>{info.value}</div>
                    <div className={styles.infoSub}>{info.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className={styles.socials}>
              {['LinkedIn', 'Instagram', 'WhatsApp'].map((s) => (
                <a key={s} href="#" className={styles.socialLink}>{s}</a>
              ))}
            </div>
          </div>

          {/* Right Panel — Form */}
          <div className={styles.rightPanel}>
            {submitted ? (
              <div className={styles.successMsg}>
                <span>✅</span>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 2 business hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Company</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email *</label>
                    <input
                      className={styles.input}
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone</label>
                    <input
                      className={styles.input}
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Service Required</label>
                  <select className={styles.select} name="service" value={formData.service} onChange={handleChange}>
                    <option value="">Select a service...</option>
                    <option>Drain Cleaning</option>
                    <option>CCTV Pipe Inspection</option>
                    <option>Pest Control</option>
                    <option>Industrial Deep Cleaning</option>
                    <option>Product Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Message *</label>
                  <textarea
                    className={styles.textarea}
                    name="message"
                    placeholder="Describe your requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8l12-6-6 12-2-4-4-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bgBlob} />
    </section>
  );
}
