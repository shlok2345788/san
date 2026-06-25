'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './WhyUs.module.css';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed', icon: '🏗️' },
  { value: 150, suffix: '+', label: 'Enterprise Clients', icon: '🏢' },
  { value: 15, suffix: 'yr', label: 'Industry Experience', icon: '📅' },
  { value: 99, suffix: '%', label: 'Client Satisfaction', icon: '⭐' },
];

const reasons = [
  {
    icon: '🔬',
    title: 'Advanced Technology',
    desc: 'We deploy the latest CCTV pipe inspection, hydro-jetting, and precision cleaning systems used by global leaders.',
  },
  {
    icon: '🛡️',
    title: 'Certified Professionals',
    desc: 'ISO 9001:2015 certified team with HACCP and FDA compliance expertise for the most demanding environments.',
  },
  {
    icon: '⚡',
    title: '24/7 Emergency Response',
    desc: 'Round-the-clock emergency drainage and sanitation services — because hygiene crises don\'t wait for business hours.',
  },
  {
    icon: '🌿',
    title: 'Eco-Safe Chemicals',
    desc: 'All our products and chemicals are biodegradable, people-safe, and compliant with international environmental standards.',
  },
  {
    icon: '📊',
    title: 'Data-Driven Reports',
    desc: 'Every job comes with detailed digital inspection reports, GPS mapping, and photographic evidence for full accountability.',
  },
  {
    icon: '🤝',
    title: 'Long-Term Partnership',
    desc: 'We don\'t just solve problems — we build relationships. Annual maintenance contracts with SLA guarantees.',
  },
];

const clients = [
  'Marriott Hotels', 'Apollo Hospitals', 'Reliance Industries', 'ITC Hotels',
  'AIIMS Delhi', 'Taj Group', 'Hyatt Regency', 'Max Healthcare',
];

function useCounter(target, visible, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return count;
}

function StatItem({ stat, visible }) {
  const count = useCounter(stat.value, visible);
  return (
    <div className={styles.statItem}>
      <div className={styles.statIcon}>{stat.icon}</div>
      <div className={styles.statValue}>
        {count}<span className={styles.statSuffix}>{stat.suffix}</span>
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

function useInView(threshold = 0.2) {
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

export default function WhyUs() {
  const [statsRef, statsVisible] = useInView(0.3);
  const [headerRef, headerVisible] = useInView(0.2);

  return (
    <section className={`${styles.whyUs} section`} id="whyus">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`${styles.header} ${headerVisible ? styles.visible : ''}`}>
          <div className="tag-label">Why Choose Us</div>
          <h2 className="section-title">
            The <span>Elite Standard</span> in Hygiene
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Trusted by India's most prestigious hotels, hospitals, and industrial giants — here's why they choose Elite Hygiene.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className={`${styles.statsGrid} ${statsVisible ? styles.statsVisible : ''}`}>
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} visible={statsVisible} />
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Reasons Bento Grid */}
        <div className={`${styles.bentoGrid} ${headerVisible ? styles.bentoVisible : ''}`}>
          {reasons.map((r, i) => (
            <div key={r.title} className={`${styles.bentoCard} glass-card`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.bentoIcon}>{r.icon}</div>
              <h4 className={styles.bentoTitle}>{r.title}</h4>
              <p className={styles.bentoDesc}>{r.desc}</p>
              <div className={styles.bentoBorder} />
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className={`${styles.clientSection} ${statsVisible ? styles.clientVisible : ''}`}>
          <p className={styles.clientLabel}>Trusted by India's leading organisations</p>
          <div className={styles.clientTrack}>
            <div className={styles.clientInner}>
              {[...clients, ...clients].map((client, i) => (
                <span key={i} className={styles.clientLogo}>{client}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bgGlow} />
    </section>
  );
}
