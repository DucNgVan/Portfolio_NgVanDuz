import { useCallback, useEffect, useState } from 'react';

import CustomHead from '@src/components/dom/CustomHead';
import Image from 'next/image';
import certificates from '@src/constants/certificates';
import clsx from 'clsx';
import styles from './certificates.module.scss';

const seo = {
  title: 'Nguyen Van Duc - Certificates & Honors',
  description:
    'Explore official academic honors, competition awards, and leadership certificates of Nguyen Van Duc, including Greenwich Top 3 Student 2024 and Best Student ICM 2026.',
  keywords: [
    'Nguyen Van Duc Certificates',
    'Greenwich Top 3 Student 2024',
    'Best Student ICM 2026',
    'Impact Innovation Bootcamp 2025',
    'LG Dream Code Challenge',
    'Greenwich Newspaper Group Best Club',
    'Software Engineer Honors',
    'Academic Excellence Vietnam',
  ],
};

function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setSelectedCert(null);
    }
  }, []);

  useEffect(() => {
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCert, handleKeyDown]);

  return (
    <>
      <CustomHead {...seo} />
      <div className={clsx(styles.root, 'layout-block-inner')}>
        <header className={styles.titleContainer}>
          <span className={styles.headerBadge}>Honors & Accreditations</span>
          <h1 className={clsx(styles.title, 'h1')}>Certificates & Honors</h1>
          <p className={styles.subtitle}>
            Official academic commendations, national competition awards, and
            campus leadership recognitions awarded to Nguyen Van Duc.
          </p>
        </header>

        <section className={styles.grid}>
          {certificates.map((cert) => (
            <article
              key={cert.id}
              className={styles.card}
              onClick={() => setSelectedCert(cert)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className={styles.viewOverlay}>
                  <span className={styles.viewBadge}>VIEW CERTIFICATE 🔍</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.category}>{cert.category}</span>
                  <span className={styles.year}>{cert.year}</span>
                </div>

                <h2 className={styles.cardTitle}>{cert.title}</h2>
                <div className={styles.issuer}>{cert.issuer}</div>
                <div className={styles.decision}>{cert.decision}</div>

                <p className={styles.desc}>{cert.description}</p>

                <div className={styles.tags}>
                  {cert.highlights.map((h, i) => (
                    <span key={i} className={styles.tag}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        {selectedCert ? (
          <div
            className={styles.modalBackdrop}
            onClick={() => setSelectedCert(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>{selectedCert.title}</h3>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate preview"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalImageContainer}>
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  sizes="100vw"
                  priority
                />
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.modalMeta}>
                  <strong>{selectedCert.issuer}</strong> ·{' '}
                  <span>{selectedCert.decision}</span> ({selectedCert.year})
                </div>
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.modalLink}
                >
                  Open Full Resolution Image ↗
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CertificatesPage;
