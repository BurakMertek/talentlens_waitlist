import React from 'react';
import { motion } from 'framer-motion';
import WaitlistForm from '@/components/WaitlistForm';
import WaitlistStats from '@/components/WaitlistStats';
import { Logo } from '@/components/Logo';
import { useOptimizedUnicornStudio } from '@/hooks/useOptimizedUnicornStudio';


const Index = () => {
  const { elementRef, toggle } = useOptimizedUnicornStudio({
    projectId: "jBlnKCGZVWrPIrXnJfvF",
    enabled: true,
    dpi: 1.0, // Reduced from 1.5 for better performance
    scale: 1,
    lazyLoad: true
  });

  return (
    <div className="min-h-screen relative">
      {/* Optimized Unicorn Studio Background */}
      <div 
        ref={elementRef}
        data-us-alttext="Animated background"
        data-us-arialabel="Unicorn Studio animated background scene"
        className="fixed inset-0 w-full h-full -z-10"
        style={{ width: '100vw', height: '100vh' }}
      ></div>

      {/* Static Background Fallback */}
      <div className="static-background fixed inset-0 w-full h-full -z-10 hidden"></div>

      {/* Performance Controls (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={toggle}
          className="fixed top-4 right-4 z-50 bg-black/50 text-white px-3 py-1 rounded text-xs"
        >
          Toggle Animation
        </button>
      )}


      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <Logo />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-balance text-5xl font-medium text-white md:text-6xl">
              Are You Ready to Elevate Your Career?
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto leading-tight"
          >
            Be the first to experience our revolutionary platform. Join our exclusive waitlist and get early access.
          </motion.p>

          {/* Waitlist form */}
          <div className="flex justify-center mb-8">
            <WaitlistForm />
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 pt-8 border-t border-waitlist-gray border-opacity-20"
          >
            <p className="text-gray-500 text-sm">
              No spam, ever. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
