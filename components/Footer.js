'use client';
import styles from './Footer.module.css';

const footerLinks = {
  Services: ['Drain Cleaning', 'CCTV Inspection', 'Pest Control', 'Industrial Hygiene', 'Pipe Camera Survey'],
  Products: ['Dispensers', 'Tissue Paper', 'Mop & Tools', 'Hand Dryers', 'Chemical Products'],
  Company: ['About Us', 'Our Process', 'Certifications', 'Careers', 'Contact Us'],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />

      <div className={`${styles.inner} container`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="url(#fg1)" strokeWidth="1.5"/>
                <path d="M8 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="url(#fg1)" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M11 14c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="url(#fg1)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="14" cy="17" r="1.5" fill="url(#fg1)"/>
                <defs>
                  <linearGradient id="fg1" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c9a84c"/>
                    <stop offset="1" stopColor="#e8c96a"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <div>
              <span className={styles.logoName}>Elite Hygiene</span>
              <span className={styles.logoTagline}>YOUR ETHICAL HYGIENE PARTNER</span>
            </div>
          </div>

          <p className={styles.brandDesc}>
            India's premier industrial hygiene and drainage solutions company. Trusted by 150+ enterprise clients across hospitality, healthcare, and industry.
          </p>

          <div className={styles.certBadges}>
            {['ISO 9001', 'HACCP', 'FDA'].map(c => (
              <span key={c} className={styles.certBadge}>{c}</span>
            ))}
          </div>

          <div className={styles.socialRow}>
            {['LinkedIn', 'Instagram', 'WhatsApp', 'YouTube'].map((s) => (
              <a key={s} href="#" className={styles.socialBtn} title={s}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className={styles.linkCol}>
            <h4 className={styles.colTitle}>{group}</h4>
            <ul className={styles.linkList}>
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.footerLink}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Quick Column */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Quick Contact</h4>
          <div className={styles.quickContacts}>
            <a href="tel:+919876543210" className={styles.quickItem}>
              <span>📞</span>+91 98765 43210
            </a>
            <a href="mailto:info@elitehygiene.in" className={styles.quickItem}>
              <span>✉️</span>info@elitehygiene.in
            </a>
            <div className={styles.quickItem}>
              <span>📍</span>Mumbai, Maharashtra
            </div>
          </div>
          <a href="#contact" className={styles.footerCta}>
            Get a Free Quote →
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span className={styles.copyright}>
              © {year} Elite Hygiene Pvt. Ltd. All rights reserved.
            </span>
            <div className={styles.bottomLinks}>
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((l) => (
                <a key={l} href="#" className={styles.bottomLink}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
