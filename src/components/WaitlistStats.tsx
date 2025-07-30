
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Zap } from 'lucide-react';

const WaitlistStats = () => {
  const stats = [
    {
      icon: Users,
      number: '2,847',
      label: 'People waiting',
      delay: 0.8
    },
    {
      icon: Clock,
      number: '< 24h',
      label: 'Response time',
      delay: 1.0
    },
    {
      icon: Zap,
      number: '99%',
      label: 'Satisfaction',
      delay: 1.2
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: stat.delay + 0.2, type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <stat.icon className="w-8 h-8 text-waitlist-white mx-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: stat.delay + 0.4 }}
            className="text-2xl font-bold text-waitlist-white mb-2"
          >
            {stat.number}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: stat.delay + 0.6 }}
            className="text-waitlist-gray"
          >
            {stat.label}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WaitlistStats;
