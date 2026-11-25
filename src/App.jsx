import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Layout components
import { Navbar } from '@/components/layout';

// Modular UI components
import { CustomCursor, Preloader, PrivacyConsentBanner, NotFound } from '@/components/ui';

// Modern Creative Engineering Portfolio (No 3D Model, Smooth Document Scroll, High-Performance)
import { ModernPortfolio } from '@/components/modern';

// Standalone Secured Admin & Analytics Portal
import { AdminPortal } from '@/components/admin/AdminPortal';

function App() {
  const [loading, setLoading] = useState(true);

  // Ensure default view starts at the very top of the page on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        if (window.location.hash === '#admin') {
          window.location.href = '/admin';
          return;
        }
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  const handlePreloaderComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setLoading(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 60);
  };

  // Hidden admin route checking: only via verified /admin route
  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdmin);
  const [mtlsVerified, setMtlsVerified] = useState(null); // null = verifying, true = verified, false = rejected

  // If user enters #admin or ?admin=true, redirect to /admin so the server can challenge for mTLS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        window.location.href = '/admin';
      }
    }
  }, []);

  // Verify mTLS certificate via server endpoint whenever on /admin
  useEffect(() => {
    if (!isAdminRoute) return;

    fetch('/api/verify-mtls')
      .then((res) => {
        if (res.ok) {
          return res.json().then(() => setMtlsVerified(true));
        }
        setMtlsVerified(false);
      })
      .catch(() => {
        // If server endpoint does not respond or rejects connection
        setMtlsVerified(false);
      });
  }, [isAdminRoute]);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdmin());
    };

    // Global hidden shortcut for Duc: Ctrl + Shift + A or Cmd + Shift + A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExitAdmin = () => {
    window.location.href = '/';
  };

  // If on Admin route, strictly verify mTLS before rendering AdminPortal
  if (isAdminRoute) {
    if (mtlsVerified === false) {
      return <NotFound onGoHome={handleExitAdmin} />;
    }

    if (mtlsVerified === true) {
      return (
        <div className="min-h-screen bg-[#0d0d0f] text-white font-sans selection:bg-[#d8c8a8] selection:text-black">
          <AdminPortal onExit={handleExitAdmin} />
        </div>
      );
    }

    // Checking handshake state
    return (
      <div className="min-h-screen bg-[#0c0d10] flex items-center justify-center font-mono text-xs text-[#8c7355]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8c7355] animate-ping" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  return (
    <div className="min-h-screen bg-[#08090d] text-[#ededed] selection:bg-[#d8c8a8] selection:text-black relative overflow-x-hidden font-sans">
      {/* 1. Preloader Screen */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* 2. Custom Interactive Follower Lens (Fine pointer devices only) */}
      {isFinePointer && <CustomCursor />}

      {/* 3. Modern Creative Engineering Portfolio (No 3D Model, Smooth Document Scroll, High-Performance) */}
      <ModernPortfolio />

      {/* 4. Privacy & Consent Notice for Anonymous Telemetry */}
      <PrivacyConsentBanner />
    </div>
  );
}

export default App;
