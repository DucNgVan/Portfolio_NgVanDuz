import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Layout components
import { Navbar } from '@/components/layout';

// Modular UI components
import { CustomCursor, Preloader, PrivacyConsentBanner } from '@/components/ui';

// Desktop 3D Cinematic Portfolio (100% Untouched on PC)
import { CinematicPortfolio } from '@/components/cinematic';

// Mobile-First Bespoke Portfolio (Optimized for Phones & Tablets)
import { MobilePortfolio } from '@/components/mobile';

// Standalone Secured Admin & Analytics Portal
import { AdminPortal } from '@/components/admin/AdminPortal';

function App() {
  const [loading, setLoading] = useState(true);

  // Responsive device check (< 768px -> Mobile Experience)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hidden admin route checking: #admin, /admin, or ?admin=true
  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.hash === '#admin' ||
      window.location.pathname === '/admin' ||
      window.location.search.includes('admin=true')
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdmin);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdmin());
    };

    // Global hidden shortcut for Duc: Ctrl + Shift + A or Cmd + Shift + A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminRoute((prev) => {
          const next = !prev;
          if (next) {
            window.location.hash = '#admin';
          } else {
            window.history.pushState(null, '', window.location.pathname + window.location.search);
          }
          return next;
        });
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExitAdmin = () => {
    setIsAdminRoute(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  // If hidden Admin route is engaged, render the secured Admin & Analytics Portal directly
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] text-white font-sans selection:bg-[#d8c8a8] selection:text-black">
        <AdminPortal onExit={handleExitAdmin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#111113] selection:bg-[#d8c8a8] selection:text-black relative overflow-x-hidden font-sans">
      {/* 1. Preloader Screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Custom Interactive Follower Lens (Desktop Only) */}
      {!isMobile && <CustomCursor />}

      {/* 3. Adaptive Main Experience: Desktop 3D Cinematic vs Mobile-First */}
      {isMobile ? (
        <MobilePortfolio />
      ) : (
        <CinematicPortfolio />
      )}

      {/* 4. Privacy & Consent Notice for Anonymous Telemetry */}
      <PrivacyConsentBanner />
    </div>
  );
}

export default App;
