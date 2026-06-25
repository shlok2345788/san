'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Services.module.css';

const services = [
  {
    id: 'drain-cleaning',
    tag: 'Drain Cleaning Service',
    title: 'Precision Drain & Sewer Cleaning',
    description: 'Our advanced high-pressure hydro-jetting systems blast through the most stubborn blockages. We deploy cutting-edge technology to restore full drainage flow, ensuring your infrastructure remains clog-free and in peak condition year-round.',
    highlights: ['High-Pressure Hydro Jetting', 'Root Removal', 'Grease Trap Cleaning', 'Emergency Response'],
    image: '/drain_cleaning.png',
    accentColor: '#c9a84c',
  },
  {
    id: 'pipe-inspection',
    tag: 'CCTV Pipe Inspection',
    title: 'Precision Drain & Sewer Inspections',
    description: 'Our drain cleaning and sewer inspection service uses advanced CCTV technology to identify and resolve blockages efficiently. With real-time inspection systems, we diagnose drainage issues accurately for effective cleaning and maintenance. Keep your pipes clog-free and in good condition with our expert services.',
    highlights: ['Real-time CCTV Monitoring', 'Digital Reporting', 'Pipe Mapping', 'Structural Analysis'],
    image: '/pipe_camera_inspection.png',
    accentColor: '#4a90d9',
  },
  {
    id: 'pest-control',
    tag: 'Pest Control',
    title: 'Integrated Pest Management',
    description: 'Comprehensive pest elimination using eco-safe, industry-approved chemicals and advanced baiting systems. Our certified technicians provide scheduled treatments to maintain pest-free environments compliant with health regulations.',
    highlights: ['Rodent Control', 'Insect Treatment', 'Termite Solutions', 'Scheduled Monitoring'],
    image: '/drain_machine_hero.png',
    accentColor: '#6b5fcf',
  },
  {
    id: 'industrial-hygiene',
    tag: 'Industrial Hygiene',
    title: 'Industrial Deep Cleaning',
    description: 'Full-spectrum industrial facility hygiene solutions including kitchen deep cleans, tank cleaning, and sanitation audits. We help commercial kitchens, hospitals, and factories meet the highest hygiene compliance standards.',
    highlights: ['Kitchen Deep Clean', 'Tank Sanitisation', 'Hygiene Audits', 'Compliance Reports'],
    image: '/mop_bucket.png',
    accentColor: '#2dd4bf',
  },
  {
    id: 'pipe-camera',
    tag: 'Pipe Camera Inspection',
    title: 'Advanced Pipeline Camera Survey',
    description: 'State-of-the-art pipeline camera surveys for accurate diagnosis of cracks, joint failures, and blockage locations. Receive detailed video reports and GPS-mapped findings to plan precise, cost-effective maintenance interventions.',
    highlights: ['HD Video Surveys', 'GPS Pipe Mapping', 'Defect Analysis', 'Digital Reports'],
    image: '/pipe_camera_inspection.png',
    accentColor: '#f59e0b',
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

function ServiceRow({ service, index }) {
  const [ref, visible] = useInView(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`${styles.serviceRow} ${isEven ? styles.rowNormal : styles.rowReverse} ${visible ? styles.rowVisible : ''}`}
      id={service.id}
    >
      {/* Text Side */}
      <div className={styles.textSide}>
        <span className={styles.serviceTag} style={{ color: service.accentColor, borderColor: `${service.accentColor}30`, background: `${service.accentColor}0d` }}>
          {service.tag}
        </span>
        <h3 className={styles.serviceTitle}>{service.title}</h3>
        <p className={styles.serviceDesc}>{service.description}</p>

        <ul className={styles.highlights}>
          {service.highlights.map((h) => (
            <li key={h} className={styles.highlightItem}>
              <span className={styles.hlDot} style={{ background: service.accentColor }} />
              {h}
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.learnBtn} style={{ borderColor: `${service.accentColor}40`, color: service.accentColor }}>
          Request Service
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Image Side */}
      <div className={styles.imageSide}>
        {/* Accent glow */}
        <div className={styles.imgGlow} style={{ background: `radial-gradient(circle, ${service.accentColor}25 0%, transparent 70%)` }} />

        <div className={styles.imgFrame}>
          {/* Corner lines */}
          <div className={styles.frameTL} style={{ borderColor: service.accentColor }} />
          <div className={styles.frameBR} style={{ borderColor: service.accentColor }} />

          <Image
            src={service.image}
            alt={service.title}
            width={540}
            height={400}
            className={styles.serviceImg}
          />
        </div>

        {/* Decorative number */}
        <div className={styles.serviceNum} style={{ color: `${service.accentColor}15` }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [headerRef, headerVisible] = useInView(0.2);

  return (
    <section className={`${styles.services} section`} id="services">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}>
          <div className="tag-label">Our Services</div>
          <h2 className="section-title">
            Comprehensive <span>Hygiene Solutions</span>
          </h2>
          <p className="section-subtitle">
            From precision drain inspections to full industrial deep cleans — we deliver results that meet the world's most demanding standards.
          </p>
        </div>

        {/* Service Rows */}
        <div className={styles.rowsWrap}>
          {services.map((svc, i) => (
            <ServiceRow key={svc.id} service={svc} index={i} />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgGrid} />
    </section>
  );
}
