import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import CinematicCanvas from './CinematicCanvas';
import CinematicScenes from './CinematicScenes';
import { analyticsService } from '@/services/analyticsService';

/**
 * CinematicPortfolio
 * Main orchestrator for the bright artistic 3D portfolio experience.
 * Features:
 * - 3D Character alternating left & right, zooming in & out across scenes
 * - Interleaved luxury editorial layout
 * - Pure top Navbar with smooth chapter navigation
 * - Dynamic mouse typography tilt & interactive color-shifting lens cursor
 */
export const CinematicPortfolio = ({ onSwitchMode = () => {} }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const activeSceneRef = useRef(0);

  // 0. Initialize anonymous session telemetry
  useEffect(() => {
    analyticsService.trackVisit();
  }, []);

  // 1. Scroll tracking & progress normalization (0.0 to 1.0)
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
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 2. Mouse position tracking for camera parallax & dynamic text tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Navigation seek handler (Navbar links jump smoothly to scene milestones)
  const handleSelectScene = (targetPercent) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = targetPercent * totalHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // 4. Replay from top handler
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[900vh] bg-[#f8f7f4] text-[#111113] selection:bg-[#d8c8a8] selection:text-black font-sans">
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
