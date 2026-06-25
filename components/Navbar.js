'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#whyus' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const magnetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMagnet = (e) => {
    const btn = magnetRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const resetMagnet = () => {
    if (magnetRef.current) magnetRef.current.style.transform = '';
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="url(#g1)" strokeWidth="1.5"/>
              <path d="M8 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="url(#g1)" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M11 14c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="14" cy="17" r="1.5" fill="url(#g1)"/>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c9a84c"/>
                  <stop offset="1" stopColor="#e8c96a"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <div>
            <span className={styles.logoName}>Elite</span>
            <span className={styles.logoSub}>Hygiene</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`${styles.link} ${activeLink === link.href ? styles.active : ''}`}
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}
                <span className={styles.linkUnderline} />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={styles.ctaBtn}
          ref={magnetRef}
          onMouseMove={handleMagnet}
          onMouseLeave={resetMagnet}
        >
          Get a Quote
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className={`${styles.ctaBtn} ${styles.mobileCta}`}>
          Get a Quote
        </a>
      </div>
    </nav>
  );
}
