import React from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, SendHorizonal, CheckCircle, MapPin } from "lucide-react";


const FORMSPREE_FORM_ID = "https://formspree.io/f/mdkdlogo";

const WaitlistForm = () => {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <CheckCircle className="w-16 h-16 text-waitlist-white mx-auto" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-waitlist-white mb-4"
        >
          You're on the list!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-waitlist-gray"
        >
          We'll notify you when we launch. Thanks for your interest!
        </motion.p>
      </motion.div>
    );
  }

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
          id="email"
          type="email"
          name="email"
          placeholder="Your email address"
          required
          className="pl-10 h-12 bg-background/80 border-white/20 text-white placeholder:text-gray-400"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      {/* Location Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="city"
            type="text"
            name="city"
            placeholder="City"
            required
            className="pl-10 h-12 bg-background/80 border-white/20 text-white placeholder:text-gray-400"
          />
          <ValidationError prefix="City" field="city" errors={state.errors} />
        </div>
        <Input
          id="country"
          type="text"
          name="country"
          placeholder="Country"
          required
          className="h-12 bg-background/80 border-white/20 text-white placeholder:text-gray-400"
        />
        <ValidationError prefix="Country" field="country" errors={state.errors} />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
        disabled={state.submitting}
      >
        <div className="flex items-center gap-2">
          <span>{state.submitting ? "Joining..." : "Join Waitlist"}</span>
          <SendHorizonal className="w-4 h-4" />
        </div>
      </Button>
      <ValidationError errors={state.errors} />
    </motion.form>
  );
};

export default WaitlistForm;
