import { useEffect, useRef, useCallback } from 'react';

interface UseOptimizedUnicornStudioOptions {
  projectId: string;
  enabled?: boolean;
  dpi?: number;
  scale?: number;
  lazyLoad?: boolean;
}

export const useOptimizedUnicornStudio = (options: UseOptimizedUnicornStudioOptions) => {
  const {
    projectId,
    enabled = true,
    dpi = 1.0, // Reduced from 1.5 for better performance
    scale = 1,
    lazyLoad = true
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLoadedRef = useRef(false);
  const pausedRef = useRef(false);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Memory monitoring
  const checkMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = memory.usedJSHeapSize / 1024 / 1024;
      
      if (usedMB > 150) { // If using more than 150MB
        console.warn('High memory usage detected:', usedMB.toFixed(2), 'MB');
        return true;
      }
    }
    return false;
  }, []);

  // Initialize UnicornStudio with optimizations
  const initializeUnicornStudio = useCallback(() => {
    if (!enabled || prefersReducedMotion || isLoadedRef.current) return;

    const element = elementRef.current;
    if (!element) return;

    // Set optimized attributes
    element.setAttribute('data-us-project', projectId);
    element.setAttribute('data-us-scale', scale.toString());
    element.setAttribute('data-us-dpi', dpi.toString());
    element.setAttribute('data-us-lazyload', lazyLoad.toString());

    // Monitor memory usage
    const memoryInterval = setInterval(() => {
      if (checkMemoryUsage()) {
        // Pause animation if memory usage is too high
        pausedRef.current = true;
        element.style.display = 'none';
      }
    }, 5000);

    // Check if UnicornStudio is available
    const checkAndInit = () => {
      if (window.UnicornStudio && window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init()
          .then(() => {
            isLoadedRef.current = true;
            console.log('UnicornStudio optimized initialization complete');
          })
          .catch((err) => {
            console.error('UnicornStudio initialization failed:', err);
          });
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    checkAndInit();

    return () => {
      clearInterval(memoryInterval);
    };
  }, [projectId, scale, dpi, lazyLoad, enabled, prefersReducedMotion, checkMemoryUsage]);

  // Pause/resume on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      const element = elementRef.current;
      if (!element) return;

      if (document.hidden) {
        // Pause animation when tab is not visible
        element.style.display = 'none';
        pausedRef.current = true;
        // Show static background
        element.nextElementSibling?.classList.remove('hidden');
      } else if (!pausedRef.current) {
        // Resume animation when tab becomes visible
        element.style.display = 'block';
        // Hide static background
        element.nextElementSibling?.classList.add('hidden');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad || !enabled) {
      initializeUnicornStudio();
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoadedRef.current) {
            initializeUnicornStudio();
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazyLoad, enabled, initializeUnicornStudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.UnicornStudio) {
        // Clean up UnicornStudio resources if possible
        try {
          window.UnicornStudio.destroy?.();
        } catch (err) {
          console.warn('UnicornStudio cleanup failed:', err);
        }
      }
    };
  }, []);

  return {
    elementRef,
    isLoaded: isLoadedRef.current,
    isPaused: pausedRef.current,
    toggle: () => {
      const element = elementRef.current;
      const staticBg = element?.nextElementSibling;
      if (!element || !staticBg) return;

      pausedRef.current = !pausedRef.current;
      
      if (pausedRef.current) {
        // Hide animation, show static background
        element.style.display = 'none';
        staticBg.classList.remove('hidden');
      } else {
        // Show animation, hide static background
        element.style.display = 'block';
        staticBg.classList.add('hidden');
      }
    }
  };
};

// Global types for UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      scenes: any[];
      init: () => Promise<any>;
      destroy?: () => void;
    };
  }
}