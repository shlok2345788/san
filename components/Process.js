'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './Process.module.css';

const steps = [
  {
    number: '01',
    icon: '📞',
    title: 'Initial Consultation',
    desc: 'Contact us to discuss your hygiene and drainage requirements. We conduct a preliminary assessment of your facility\'s needs.',
  },
  {
    number: '02',
    icon: '🔍',
    title: 'Site Inspection',
    desc: 'Our certified technicians visit your premises for a comprehensive audit using CCTV and diagnostic equipment.',
  },
  {
    number: '03',
    icon: '📋',
    title: 'Customised Proposal',
    desc: 'We deliver a detailed, transparent proposal with scope of work, timeline, and pricing — no hidden costs.',
  },
  {
    number: '04',
    icon: '⚙️',
    title: 'Expert Execution',
    desc: 'Our trained team deploys advanced equipment to complete the job to the highest quality standards.',
  },
  {
    number: '05',
    icon: '✅',
    title: 'Quality Verification',
    desc: 'Post-completion inspection, digital reporting, and sign-off to confirm all work meets agreed specifications.',
  },
  {
    number: '06',
    icon: '🔄',
    title: 'Ongoing Support',
    desc: 'Scheduled maintenance visits and 24/7 emergency response to keep your facility in peak condition.',
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

export default function Process() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [stepsRef, stepsVisible] = useInView(0.1);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className={`${styles.process} section`} id="process">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}>
          <div className="tag-label">Our Process</div>
          <h2 className="section-title">
            A Seamless <span>6-Step Workflow</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From first contact to long-term partnership — every step is designed for maximum efficiency and zero disruption to your operations.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className={`${styles.stepsGrid} ${stepsVisible ? styles.stepsVisible : ''}`}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`${styles.stepCard} ${activeStep === i ? styles.stepActive : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              onMouseEnter={() => setActiveStep(i)}
            >
              {/* Connector line */}
              {i < steps.length - 1 && i % 3 !== 2 && (
                <div className={styles.connector} />
              )}

              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.desc}</p>

              {/* Active glow border */}
              <div className={styles.activeBorder} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`${styles.processCta} ${headerVisible ? styles.ctaVisible : ''}`}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
              <p className={styles.ctaText}>
                Join 150+ enterprise clients who trust Elite Hygiene for mission-critical sanitation.
              </p>
            </div>
            <a href="#contact" className="btn-primary">
              Book a Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bgLines} />
    </section>
  );
}
