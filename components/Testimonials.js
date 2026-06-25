'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Rajan Mehta',
    role: 'Facilities Manager',
    company: 'Marriott Hotels, Mumbai',
    avatar: 'RM',
    rating: 5,
    text: 'Elite Hygiene has been our preferred vendor for 3 years. Their CCTV drain inspections and high-pressure cleaning are unmatched. Zero downtime, professional team, and meticulous reporting.',
    color: '#c9a84c',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Infection Control Officer',
    company: 'Apollo Hospitals, Delhi',
    avatar: 'PS',
    rating: 5,
    text: 'In a healthcare setting, hygiene is not optional. Elite Hygiene\'s deep cleaning protocols and FDA-approved chemicals meet our stringent standards every single time.',
    color: '#4a90d9',
  },
  {
    name: 'Arjun Kapoor',
    role: 'GM Operations',
    company: 'ITC Maratha Hotel',
    avatar: 'AK',
    rating: 5,
    text: 'Phenomenal service quality and attention to detail. Their team worked through the night to ensure our kitchens met health inspection standards. Highly recommended.',
    color: '#2dd4bf',
  },
  {
    name: 'Sunita Rao',
    role: 'Plant Manager',
    company: 'Reliance Industries, Gujarat',
    avatar: 'SR',
    rating: 5,
    text: 'We engaged Elite Hygiene for our industrial facility. Their drain cleaning and pest management programs have kept our plant compliant and hygienic for 2 years running.',
    color: '#f59e0b',
  },
  {
    name: 'Vikram Nair',
    role: 'Chief Engineer',
    company: 'Hyatt Regency, Bangalore',
    avatar: 'VN',
    rating: 5,
    text: 'The pipe camera inspection service revealed issues we didn\'t even know existed. Proactive, professional, and incredibly detailed. A true partner in facilities excellence.',
    color: '#6b5fcf',
  },
];

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < rating ? '#c9a84c' : 'rgba(201,168,76,0.2)'}>
          <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.1 3.4 12l.7-4L1.2 5.2l4-.6L7 1z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % testimonials.length);
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const t = testimonials[current];

  return (
    <section className={`${styles.testimonials} section`} id="testimonials">
      <div className="container">
        <div className={styles.header}>
          <div className="tag-label">Testimonials</div>
          <h2 className="section-title">
            Trusted by <span>Industry Leaders</span>
          </h2>
        </div>

        <div className={styles.sliderWrap}>
          {/* Main Featured Card */}
          <div className={`${styles.mainCard} ${isAnimating ? styles.animOut : styles.animIn}`}>
            <div className={styles.quoteIcon}>
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
                <path d="M0 30V18C0 8 6 2 18 0l2 4C12 5.5 9 9 9 14h7v16H0zm22 0V18C22 8 28 2 40 0l2 4C34 5.5 31 9 31 14h7v16H22z" fill="rgba(201,168,76,0.15)"/>
              </svg>
            </div>

            <p className={styles.testimonialText}>{t.text}</p>

            <div className={styles.reviewer}>
              <div className={styles.avatar} style={{ background: `${t.color}20`, border: `2px solid ${t.color}40`, color: t.color }}>
                {t.avatar}
              </div>
              <div>
                <div className={styles.reviewerName}>{t.name}</div>
                <div className={styles.reviewerRole}>{t.role} · {t.company}</div>
              </div>
              <div className={styles.ratingWrap}>
                <StarRating rating={t.rating} />
              </div>
            </div>
          </div>

          {/* Sidebar thumbnails */}
          <div className={styles.sidebar}>
            {testimonials.map((item, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
                onClick={() => goTo(i)}
                style={i === current ? { borderColor: item.color } : {}}
              >
                <div className={styles.thumbAvatar} style={{ color: item.color, background: `${item.color}15` }}>
                  {item.avatar}
                </div>
                <div className={styles.thumbInfo}>
                  <span className={styles.thumbName}>{item.name}</span>
                  <span className={styles.thumbCompany}>{item.company}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button className={styles.navBtn} onClick={prev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
          <button className={styles.navBtn} onClick={next} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.bgDecor} />
    </section>
  );
}
