import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, SendHorizonal, MapPin } from 'lucide-react';


const API_ENDPOINT = "https://eomc58yrofjnm3.m.pipedream.net";

const WaitlistForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("You joined the waitlist!");
        e.currentTarget.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
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

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
        disabled={loading}
      >
        <div className="flex items-center gap-2">
          <span>{loading ? "Joining..." : "Join Waitlist"}</span>
          <SendHorizonal className="w-4 h-4" />
        </div>
      </Button>
    </motion.form>
  );
};

export default WaitlistForm;
