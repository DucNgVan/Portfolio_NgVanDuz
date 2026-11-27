import { useCallback, useEffect, useState } from 'react';
import styles from './contactModal.module.scss';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

const TARGET_EMAIL = 'ducnva.wk@gmail.com';

function ContactModal() {
  const [isContactOpen, setIsContactOpen] = useStore(
    useShallow((state) => [state.isContactOpen, state.setIsContactOpen]),
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleClose = useCallback(() => {
    setIsContactOpen(false);
    // Reset state after animation finishes
    setTimeout(() => {
      setStatus('idle');
      setErrorMessage('');
    }, 300);
  }, [setIsContactOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (isContactOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isContactOpen, handleKeyDown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(TARGET_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // 1. Try our Next.js API endpoint first
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
        });
        return;
      }

      // 2. Direct fallback to FormSubmit AJAX endpoint if API proxy fails
      const directRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Contact] ${formData.subject} from ${formData.name}`,
          message: formData.message,
          _captcha: 'false',
        }),
      });

      const directData = await directRes.json().catch(() => ({}));
      if (directRes.ok && (directData.success === 'true' || directData.success === true || directData.message?.includes('Activation'))) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
        });
        return;
      }

      throw new Error(data.message || directData.message || 'Unable to deliver message right now.');
    } catch (err) {
      console.error('Fast email submit error:', err);
      setStatus('error');
      setErrorMessage(
        'Could not send automatically. You can copy my email below or open your mail app directly.',
      );
    }
  };

  if (!isContactOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.dot} /> Available for projects & opportunities
          </div>
          <h2 className={styles.title}>Send a Fast Email</h2>
          <p className={styles.subtitle}>
            Write your message directly below — it will be delivered straight to my personal inbox!
          </p>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </header>

        {status === 'success' ? (
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>✓</div>
            <h3>Message Sent!</h3>
            <p>
              Thank you for getting in touch! Your message has been sent directly to{' '}
              <strong>{TARGET_EMAIL}</strong>. I usually reply within 24 hours.
            </p>
            <button type="button" className={styles.doneBtn} onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {status === 'error' && errorMessage ? (
              <div className={styles.errorBanner}>
                {errorMessage}
              </div>
            ) : null}

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Johnson"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email">Your Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="e.g. alex@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-subject">Subject</label>
              <select
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={status === 'submitting'}
              >
                <option value="Project Collaboration">Project Collaboration</option>
                <option value="Job / Freelance Opportunity">Job / Freelance Opportunity</option>
                <option value="Technical Consultation">Technical Consultation</option>
                <option value="General Inquiry">General Inquiry / Say Hello</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tell me about your project, idea, or inquiry..."
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
            </div>

            <div className={styles.footerActions}>
              <div className={styles.directEmail}>
                <span>{TARGET_EMAIL}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.copyBtn}
                  aria-label="Copy email address"
                >
                  {copied ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message ✉️'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactModal;
