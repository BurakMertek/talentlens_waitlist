import React from 'react';
import { motion } from 'framer-motion';
import WaitlistForm from '@/components/WaitlistForm';
import WaitlistStats from '@/components/WaitlistStats';
import { Logo } from '@/components/Logo';


const Index = () => {
  React.useEffect(() => {
    console.log('Index component mounted');
    
    // Check if UnicornStudio is available
    const checkUnicornStudio = () => {
      if (window.UnicornStudio) {
        console.log('UnicornStudio is available:', window.UnicornStudio);
        console.log('UnicornStudio isInitialized:', window.UnicornStudio.isInitialized);
        console.log('UnicornStudio scenes:', window.UnicornStudio.scenes);
        
        // Try to manually initialize if needed
        if (window.UnicornStudio.isInitialized && window.UnicornStudio.scenes.length === 0) {
          console.log('Attempting manual initialization...');
          window.UnicornStudio.init()
            .then((scenes) => {
              console.log('Manual initialization successful, scenes:', scenes);
            })
            .catch((err) => {
              console.error('Manual initialization failed:', err);
            });
        }
      } else {
        console.log('UnicornStudio is not available yet');
      }
    };

    // Check immediately
    checkUnicornStudio();
    
    // Check periodically for a few seconds
    const interval = setInterval(() => {
      checkUnicornStudio();
      if (window.UnicornStudio && window.UnicornStudio.isInitialized && window.UnicornStudio.scenes.length > 0) {
        console.log('UnicornStudio successfully initialized with scenes');
        clearInterval(interval);
      }
    }, 500);

    // Clean up after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      console.log('Stopped checking for UnicornStudio');
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Unicorn Studio Background */}
      <div 
        data-us-project="jBlnKCGZVWrPIrXnJfvF"
        data-us-scale="1"
        data-us-dpi="1.5"
        data-us-lazyload="false"
        data-us-alttext="Animated background"
        data-us-arialabel="Unicorn Studio animated background scene"
        className="fixed inset-0 w-full h-full -z-10"
        style={{ width: '100vw', height: '100vh' }}
        ref={(el) => {
          if (el) {
            console.log('Background div ref set:', el);
            console.log('Background div attributes:', {
              'data-us-project': el.getAttribute('data-us-project'),
              'data-us-scale': el.getAttribute('data-us-scale'),
              'data-us-dpi': el.getAttribute('data-us-dpi'),
              'data-us-lazyload': el.getAttribute('data-us-lazyload')
            });
          }
        }}
      ></div>


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
