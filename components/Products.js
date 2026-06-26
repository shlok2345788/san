'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Products.module.css';

const categories = [
  'ALL', 'SERVICES', 'TISSUE PAPER', 'SURFACE & AIR CARE',
  'DISPENSER', 'MOP & TOOLS', 'HAND DRYER',
  'CHEMICAL PRODUCTS', 'TROLLEY BUCKETS', 'DUSTBINS',
  'GARBAGE BAGS', 'MACHINES',
];

const products = [
  { id: 1, name: 'Drain Cleaning Machine', category: 'MACHINES', image: '/drain_cleaning.png', badge: 'Best Seller' },
  { id: 2, name: 'M-Fold Tissue Paper', category: 'TISSUE PAPER', image: '/tissue_paper.png', badge: '' },
  { id: 3, name: 'Manual Soap Dispenser', category: 'DISPENSER', image: '/soap_dispenser.png', badge: 'Premium' },
  { id: 4, name: 'Industrial Mop & Bucket', category: 'MOP & TOOLS', image: '/mop_bucket.png', badge: '' },
  { id: 5, name: 'High-Speed Hand Dryer', category: 'HAND DRYER', image: '/hand_dryer.png', badge: 'New' },
  { id: 6, name: 'CCTV Pipe Camera', category: 'MACHINES', image: '/pipe_camera_inspection.png', badge: '' },
  { id: 7, name: 'Drain Inspection Service', category: 'SERVICES', image: '/pipe_camera_inspection.png', badge: '' },
  { id: 8, name: 'Surface Disinfectant', category: 'SURFACE & AIR CARE', image: '/soap_dispenser.png', badge: '' },
  { id: 9, name: 'Trolley Bucket Set', category: 'TROLLEY BUCKETS', image: '/mop_bucket.png', badge: '' },
  { id: 10, name: 'Industrial Dustbin 120L', category: 'DUSTBINS', image: '/drain_machine_hero.png', badge: '' },
  { id: 11, name: 'Garbage Bags (Pack 50)', category: 'GARBAGE BAGS', image: '/tissue_paper.png', badge: '' },
  { id: 12, name: 'Chemical Degreaser', category: 'CHEMICAL PRODUCTS', image: '/soap_dispenser.png', badge: '' },
];

function useInView(threshold = 0.1) {
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

function ProductCard({ product, index, onZoom }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={styles.productCard}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) ${hovered ? 'translateY(-6px)' : ''}`,
        animationDelay: `${(index % 4) * 0.08}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Badge */}
      {product.badge && (
        <span className={styles.cardBadge}>{product.badge}</span>
      )}

      {/* Image Zone */}
      <div className={styles.cardImgWrap}>
        <div className={styles.cardImgBg}>
          <Image
            src={product.image}
            alt={product.name}
            width={260}
            height={200}
            className={styles.cardImg}
          />
        </div>
        <div className={styles.cardOverlay}>
          <button className={styles.zoomBtn} aria-label="View product" onClick={() => onZoom(product)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="1.5"/>
              <path d="M14 14l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 9h4M9 7v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>{product.name}</p>
        <a href="#contact" className={styles.cardCta}>
          Enquire Now
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [zoomedProduct, setZoomedProduct] = useState(null);
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.05);

  // Close modal on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section className={`${styles.products} section`} id="products">
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}
        >
          <div className="tag-label">Our Products</div>
          <h2 className="section-title">
            Comprehensive Hygiene <span>Solutions for Every Need</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            <strong style={{ color: 'var(--white)' }}>Elite Hygiene</strong> provides a complete range of high-quality hygiene products — from drain cleaning systems and inspection tools to cleaning chemicals, dispensers, tissue papers, and housekeeping materials.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className={`${styles.filterWrap} ${headerVisible ? styles.filterVisible : ''}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className={`${styles.grid} ${gridVisible ? styles.gridVisible : ''}`}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onZoom={setZoomedProduct} />
          ))}
        </div>

        {/* Load More */}
        <div className={styles.loadMore}>
          <a href="#contact" className="btn-outline">
            Request Full Catalogue
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* BG decoration */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

      {/* Zoom Modal Popup */}
      {zoomedProduct && (
        <div className={styles.modal} onClick={() => setZoomedProduct(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setZoomedProduct(null)} aria-label="Close modal">
              &times;
            </button>
            <div className={styles.modalImageWrap}>
              <Image
                src={zoomedProduct.image}
                alt={zoomedProduct.name}
                width={600}
                height={450}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalInfo}>
              <h4 className={styles.modalName}>{zoomedProduct.name}</h4>
              <span className={styles.modalCategory}>{zoomedProduct.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
