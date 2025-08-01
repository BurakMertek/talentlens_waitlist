import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, SendHorizonal, MapPin } from 'lucide-react';

// <-- Replace with your real Formspree endpoint!
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdkdlogo";

const WaitlistForm = () => {
  return (
    <motion.form
      action={FORMSPREE_ENDPOINT}
      method="POST"
      className="mx-auto max-w-lg space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Email Input */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="email"
          name="email"
          placeholder="Your email address"
          required
          className="pl-10 h-12 bg-background/80 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Location Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            name="city"
            placeholder="City"
            required
            className="pl-10 h-12 bg-background/80 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <Input
          type="text"
          name="country"
          placeholder="Country"
          required
          className="h-12 bg-background/80 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Optional: Custom Redirect after submit */}
      {/* 
      <input type="hidden" name="_redirect" value="https://yourdomain.com/thanks" />
      */}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
      >
        <div className="flex items-center gap-2">
          <span>Join Waitlist</span>
          <SendHorizonal className="w-4 h-4" />
        </div>
      </Button>
    </motion.form>
  );
};

export default WaitlistForm;
