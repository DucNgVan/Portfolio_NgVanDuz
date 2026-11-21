import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import CinematicCanvas from './CinematicCanvas';
import CinematicScenes from './CinematicScenes';
import { analyticsService } from '@/services/analyticsService';

// Milestone anchor checkpoints for the 5 scenes
const SCENE_ANCHORS = [0.00, 0.30, 0.54, 0.76, 1.00];

/**
 * CinematicPortfolio
 * Main orchestrator for the bright artistic 3D portfolio experience.
 * Features:
 * - 3D Character alternating left & right, zooming in & out across scenes
 * - Interleaved luxury editorial layout
 * - Pure top Navbar with smooth chapter navigation
 * - Dynamic mouse typography tilt & interactive color-shifting lens cursor
 * - Smart Section Snapping: Each scroll / long swipe transitions cleanly and locks
 *   at the key milestone of the next scene without momentum overshooting!
 */
export const CinematicPortfolio = ({ onSwitchMode = () => {} }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const activeSceneRef = useRef(0);

  // Snapping & Smooth Scroll State Refs
  const isSnappingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const scrollSettleTimeoutRef = useRef(null);
  const wheelAccumulatorRef = useRef(0);
  const wheelTimerRef = useRef(null);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);
  const isTouchActiveRef = useRef(false);
  const activeAnchorRef = useRef(0);

  // 0. Disable browser native CSS smooth scroll on html to prevent RAF fighting
  useEffect(() => {
    const originalBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = originalBehavior;
    };
  }, []);

  // 1. Initialize anonymous session telemetry
  useEffect(() => {
    analyticsService.trackVisit();
  }, []);

  // 2. Custom Silk-Smooth RAF Scroll with Cubic Ease-In-Out
  const smoothScrollToY = useCallback((targetY, duration = 800) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) {
      isSnappingRef.current = false;
      return;
    }

    const startTime = performance.now();
    isSnappingRef.current = true;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        animationFrameRef.current = null;
        // Hold lock for a cooldown buffer to swallow trailing trackpad inertia
        const isLateScene = activeAnchorRef.current >= 0.70;
        setTimeout(() => {
          isSnappingRef.current = false;
        }, isLateScene ? 240 : 130);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  }, []);

  // 3. Find next / previous anchor milestone
  const getNextAnchor = useCallback((currentProgress, direction) => {
    const EPSILON = 0.025;
    if (direction > 0) {
      // Forward / scroll down
      for (let i = 0; i < SCENE_ANCHORS.length; i++) {
        if (SCENE_ANCHORS[i] > currentProgress + EPSILON) {
          return SCENE_ANCHORS[i];
        }
      }
      return SCENE_ANCHORS[SCENE_ANCHORS.length - 1];
    } else {
      // Backward / scroll up
      for (let i = SCENE_ANCHORS.length - 1; i >= 0; i--) {
        if (SCENE_ANCHORS[i] < currentProgress - EPSILON) {
          return SCENE_ANCHORS[i];
        }
      }
      return SCENE_ANCHORS[0];
    }
  }, []);

  // 4. Trigger jump to next or previous scene
  const triggerSceneJump = useCallback((direction) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;

    const currentProgress = window.scrollY / totalHeight;
    const targetAnchor = getNextAnchor(currentProgress, direction);
    activeAnchorRef.current = targetAnchor;
    const targetY = Math.round(targetAnchor * totalHeight);

    if (Math.abs(targetY - window.scrollY) > 4) {
      // The last 2 scenes (Honors & Contact) feature dramatic lighting, camera fly-through and
      // dark/bright transitions. We allocate a calm, luxurious 1250ms duration so swiping feels deliberate and smooth.
      const isLateSceneTransition = currentProgress >= 0.65 || targetAnchor >= 0.70;
      const duration = isLateSceneTransition ? 1250 : 800;
      smoothScrollToY(targetY, duration);
    }
  }, [getNextAnchor, smoothScrollToY]);

  // 5. Scroll tracking & progress normalization (0.0 to 1.0)
  const snapToNearestAnchor = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const currentProgress = window.scrollY / totalHeight;

    let closestAnchor = SCENE_ANCHORS[0];
    let minDiff = Infinity;
    for (const anchor of SCENE_ANCHORS) {
      const diff = Math.abs(currentProgress - anchor);
      if (diff < minDiff) {
        minDiff = diff;
        closestAnchor = anchor;
      }
    }

    // Only snap if not already at the anchor
    if (minDiff > 0.015) {
      activeAnchorRef.current = closestAnchor;
      const isLate = closestAnchor >= 0.70 || currentProgress >= 0.65;
      smoothScrollToY(Math.round(closestAnchor * totalHeight), isLate ? 1050 : 600);
    }
  }, [smoothScrollToY]);

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
    setScrollProgress(progress);

    // Track scene progression in telemetry
    let sceneIndex = 0;
    if (progress < 0.20) sceneIndex = 0;
    else if (progress < 0.42) sceneIndex = 1;
    else if (progress < 0.65) sceneIndex = 2;
    else if (progress < 0.85) sceneIndex = 3;
    else sceneIndex = 4;

    if (sceneIndex !== activeSceneRef.current) {
      activeSceneRef.current = sceneIndex;
      analyticsService.trackScene(sceneIndex);
    }

    // Idle Settle Snap: If user drags native scrollbar directly, gently snap after release
    if (scrollSettleTimeoutRef.current) {
      clearTimeout(scrollSettleTimeoutRef.current);
    }
    if (!isSnappingRef.current) {
      scrollSettleTimeoutRef.current = setTimeout(() => {
        if (!isSnappingRef.current && document.body.style.overflow !== 'hidden') {
          snapToNearestAnchor();
        }
      }, 250);
    }
  }, [snapToNearestAnchor]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollSettleTimeoutRef.current) clearTimeout(scrollSettleTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleScroll]);

  // 6. Wheel / Trackpad Gesture Controller (Prevents Momentum Overshoot!)
  useEffect(() => {
    const handleWheel = (e) => {
      // Do not intercept if a modal lightbox is open
      if (document.body.style.overflow === 'hidden') return;

      // Do not intercept if user is actively scrolling inside an open modal dialog or scrollable textarea
      const target = e.target;
      if (target && target.closest) {
        if (target.closest('[role="dialog"]')) return;
        const textarea = target.closest('textarea');
        if (textarea && textarea.scrollHeight > textarea.clientHeight) return;
      }

      // Intercept wheel to prevent multi-page momentum fling
      e.preventDefault();

      // If already in transition cooldown, ignore residual trackpad inertia
      if (isSnappingRef.current) return;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      const isLateScene = currentProgress >= 0.65;

      const rawDelta = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
      wheelAccumulatorRef.current += rawDelta;

      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, isLateScene ? 180 : 120);

      const THRESHOLD = isLateScene ? 60 : 35; // px swipe sensitivity (higher resistance on late scenes to avoid abrupt jumping)
      if (Math.abs(wheelAccumulatorRef.current) >= THRESHOLD) {
        const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
        wheelAccumulatorRef.current = 0;
        triggerSceneJump(direction);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [triggerSceneJump]);

  // 7. Touch Swiping for Mobile & Tablets
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      if (document.body.style.overflow === 'hidden') return;
      const target = e.target;
      if (target && target.closest) {
        if (target.closest('[role="dialog"]')) return;
        const textarea = target.closest('textarea');
        if (textarea && textarea.scrollHeight > textarea.clientHeight) return;
      }
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
      isTouchActiveRef.current = true;
    };

    const handleTouchMove = (e) => {
      if (!isTouchActiveRef.current) return;
      if (document.body.style.overflow === 'hidden') return;
      const target = e.target;
      if (target && target.closest) {
        if (target.closest('[role="dialog"]')) return;
        const textarea = target.closest('textarea');
        if (textarea && textarea.scrollHeight > textarea.clientHeight) return;
      }

      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      const deltaX = touchStartXRef.current - e.touches[0].clientX;

      // Ignore primarily horizontal swipes (e.g. project image gallery sliders)
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      if (isSnappingRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      const isLateScene = currentProgress >= 0.65;
      const TOUCH_THRESHOLD = isLateScene ? 60 : 40;

      if (Math.abs(deltaY) >= TOUCH_THRESHOLD) {
        if (e.cancelable) e.preventDefault();
        isTouchActiveRef.current = false;
        const direction = deltaY > 0 ? 1 : -1;
        triggerSceneJump(direction);
      }
    };

    const handleTouchEnd = () => {
      isTouchActiveRef.current = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [triggerSceneJump]);

  // 8. Keyboard Navigation (Arrow Keys, Page Up/Down, Space, Home, End)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.body.style.overflow === 'hidden') return;
      const isEditing =
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) ||
        document.activeElement?.isContentEditable;
      if (isEditing) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        triggerSceneJump(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        triggerSceneJump(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        activeAnchorRef.current = 0;
        smoothScrollToY(0, 750);
      } else if (e.key === 'End') {
        e.preventDefault();
        activeAnchorRef.current = 1.0;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        smoothScrollToY(totalHeight, 750);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [smoothScrollToY, triggerSceneJump]);

  // 9. Window Resize Anchor Lock
  useEffect(() => {
    const handleResize = () => {
      if (activeAnchorRef.current !== null) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, activeAnchorRef.current * totalHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 10. Mouse position tracking for camera parallax & dynamic text tilt (RAF-throttled to avoid React render lag)
  useEffect(() => {
    let rafId = null;
    let pendingPos = null;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pendingPos = { x, y };

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (pendingPos) {
            setMousePos(pendingPos);
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 11. Navigation seek handler (Navbar links jump smoothly to scene milestones)
  const handleSelectScene = (targetPercent) => {
    activeAnchorRef.current = targetPercent;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.round(targetPercent * totalHeight);
    const isLate = targetPercent >= 0.70;
    smoothScrollToY(targetY, isLate ? 1250 : 800);
  };

  // 12. Replay from top handler
  const handleReplay = () => {
    activeAnchorRef.current = 0;
    smoothScrollToY(0, 800);
  };

  return (
    <div className="relative min-h-[1050vh] bg-[#f8f7f4] text-[#111113] selection:bg-[#d8c8a8] selection:text-black font-sans">
      {/* 1. Original Clean Menu Bar (as requested by user screenshot) */}
      <Navbar onNavigate={handleSelectScene} scrollProgress={scrollProgress} />

      {/* 2. Three.js 3D Viewport with Interleaved Left/Right Gliding & Zoom In/Out */}
      <CinematicCanvas scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* 3. 5 Interleaved Scrollytelling Scenes with Dynamic Mouse Parallax & Modals */}
      <CinematicScenes 
        scrollProgress={scrollProgress} 
        mousePos={mousePos} 
        onReplay={handleReplay} 
      />
    </div>
  );
};

export default CinematicPortfolio;
