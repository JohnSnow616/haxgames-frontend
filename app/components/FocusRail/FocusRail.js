"use client"

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import "./FocusRail.css";

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18,
  mass: 1,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
}) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef(0);
  const wrapperRef = React.useRef(null);
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // SCROLL WHEEL - ONLY when hovering on focus rail
  const onWheel = React.useCallback(
    (e) => {
      if (!isHovering) return; // Only work when hovering

      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        e.preventDefault(); // Prevent page scroll ONLY when hovering
        if (delta > 0) handleNext();
        else handlePrev();
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev, isHovering]
  );

  // TOUCH SWIPE SUPPORT
  const handleTouchStart = React.useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleSwipe = React.useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left, go to next
        handleNext();
      } else {
        // Swiped right, go to previous
        handlePrev();
      }
    }
  }, [handleNext, handlePrev]);

  const handleTouchEnd = React.useCallback((e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  }, [handleSwipe]);

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.addEventListener('wheel', onWheel, { passive: false });
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener('wheel', onWheel);
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onWheel, handleTouchStart, handleTouchEnd]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      ref={wrapperRef}
      className="focus-rail-wrapper"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* AMBIENT BACKGROUND - EXTENDS BEHIND NAVBAR */}
      <div className="focus-rail-bg">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="focus-rail-bg-inner"
          >
            <img src={activeItem.imageSrc} alt="" />
            <div className="focus-rail-bg-overlay" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MAIN STAGE */}
      <div className="focus-rail-stage">

        {/* CARDS - NO DRAG, JUST CLICK */}
        <div className="focus-rail-track">
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            const xOffset = offset * 420;
            const zOffset = -dist * 160;
            const scale = isCenter ? 1 : 0.82;
            const rotateY = offset * -18;
            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 5;
            const brightness = isCenter ? 1 : 0.45;

            return (
              <motion.div
                key={absIndex}
                className={`focus-card ${isCenter ? "focus-card-center" : ""}`}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale,
                  rotateY,
                  opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={(val) => {
                  if (val === "scale") return TAP_SPRING;
                  return BASE_SPRING;
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link
                  href={item.href}
                  className="focus-card-link"
                  onClick={() => {
                    if (offset !== 0) setActive((p) => p + offset);
                  }}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="focus-card-img"
                  />
                  <div className="focus-card-shine" />
                  <div className="focus-card-dark" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* INFO + CONTROLS */}
        <div className="focus-rail-info">
  
          {/* LEFT - empty placeholder to balance grid */}
          <div className="focus-rail-left" />

          {/* CENTER - text */}
          <div className="focus-rail-text">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="focus-rail-text-inner"
              >
                {activeItem.meta && (
                  <span className="focus-meta">{activeItem.meta}</span>
                )}
                <h2 className="focus-title">{activeItem.title}</h2>
                {activeItem.description && (
                  <p className="focus-desc">{activeItem.description}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT - controls */}
          <div className="focus-controls">
            <div className="focus-nav-group">
              <button onClick={handlePrev} className="focus-nav-btn" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <span className="focus-counter">
                {activeIndex + 1} / {count}
              </span>
              <button onClick={handleNext} className="focus-nav-btn" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>

            {activeItem.href && (
              <Link href={activeItem.href} className="focus-explore-btn">
                Explore
                <ArrowUpRight size={15} />
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default FocusRail;