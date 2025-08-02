import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, SendHorizonal, MapPin } from 'lucide-react';

const WaitlistForm = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.form
      name="waitlist"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={() => setSubmitted(true)}
      className="mx-auto max-w-lg space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      // optional: for custom Netlify thank-you page
      action="/thank-you.html"
    >
      {/* Netlify required fields */}
      <input type="hidden" name="form-name" value="waitlist" />
      <input type="hidden" name="subject" value="New Waitlist Submission" />

      {/* Netlify honeypot anti-spam */}
      <div style={{ display: 'none' }}>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </div>

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

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
        disabled={submitted}
      >
        <div className="flex items-center gap-2">
          <span>{submitted ? "Joined!" : "Join Waitlist"}</span>
          <SendHorizonal className="w-4 h-4" />
        </div>
      </Button>
    </motion.form>
  );
};

export default WaitlistForm;
