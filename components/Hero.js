'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const floatingCards = [
  { icon: '🏆', value: '500+', label: 'Projects Delivered', delay: 0 },
  { icon: '⭐', value: '4.9/5', label: 'Client Rating', delay: 0.2 },
  { icon: '🔧', value: '15yr', label: 'Industry Expertise', delay: 0.4 },
];

const trustBadges = ['ISO 9001:2015', 'HACCP Certified', 'FDA Approved', '24/7 Support'];

export default function Hero() {
  const particleRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Particle canvas
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        gold: Math.random() > 0.7,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201, 168, 76, ${p.opacity})`
          : `rgba(192, 204, 216, ${p.opacity * 0.6})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Parallax mouse effect
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      {/* Particle background */}
      <canvas ref={particleRef} className={styles.particles} />

      {/* Background gradient blobs */}
      <div className={styles.blobWrap} style={{
        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -10}px)`
      }}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      <div className={`${styles.inner} container`}>
        {/* Left Content */}
        <div className={styles.content}>
          <div className={`tag-label ${styles.fadeIn}`} style={{ animationDelay: '0.1s' }}>
            India's Premier Hygiene Solutions
          </div>

          <h1 className={`${styles.headline} ${styles.fadeIn}`} style={{ animationDelay: '0.2s' }}>
            Engineering
            <span className={styles.gradText}> Cleanliness</span>
            <br />to Perfection
          </h1>

          <p className={`${styles.sub} ${styles.fadeIn}`} style={{ animationDelay: '0.35s' }}>
            World-class hygiene and drainage solutions trusted by leading hotels,
            hospitals, and industrial facilities. Precision-engineered. Professionally delivered.
          </p>

          <div className={`${styles.actions} ${styles.fadeIn}`} style={{ animationDelay: '0.5s' }}>
            <a href="#services" className="btn-primary">
              Explore Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#products" className="btn-outline">
              View Products
            </a>
          </div>

          {/* Trust Badges */}
          <div className={`${styles.badges} ${styles.fadeIn}`} style={{ animationDelay: '0.65s' }}>
            {trustBadges.map((badge) => (
              <span key={badge} className={styles.badge}>{badge}</span>
            ))}
          </div>
        </div>

        {/* Right — Product Image */}
        <div
          className={styles.imageWrap}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * -3}deg) rotateX(${mousePos.y * 2}deg)`
          }}
        >
          {/* Glow behind image */}
          <div className={styles.imageGlow} />

          {/* Main image */}
          <div className={styles.imageBg}>
            <Image
              src="/drain_machine_hero.png"
              alt="Elite Hygiene Premium Drain Cleaning Equipment"
              width={600}
              height={520}
              className={styles.productImg}
              priority
            />
          </div>

          {/* Floating stat cards */}
          {floatingCards.map((card, i) => (
            <div
              key={card.label}
              className={styles.floatCard}
              style={{
                '--delay': `${card.delay}s`,
                top: i === 0 ? '10%' : i === 1 ? '45%' : '72%',
                left: i === 0 ? '-30px' : i === 1 ? 'auto' : '-20px',
                right: i === 1 ? '-20px' : 'auto',
              }}
            >
              <span className={styles.floatIcon}>{card.icon}</span>
              <div>
                <div className={styles.floatValue}>{card.value}</div>
                <div className={styles.floatLabel}>{card.label}</div>
              </div>
            </div>
          ))}

          {/* Corner accent lines */}
          <div className={styles.cornerTL} />
          <div className={styles.cornerBR} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
