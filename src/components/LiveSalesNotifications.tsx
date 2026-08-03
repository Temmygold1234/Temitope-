import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';

const NOTIFICATIONS = [
  { name: "Grace", location: "Lagos", product: "Handbag", time: "2 minutes ago" },
  { name: "Mary", location: "Abuja", product: "Shoes", time: "5 minutes ago" },
  { name: "Aisha", location: "Ibadan", product: "Perfume", time: "8 minutes ago" },
];

export default function LiveSalesNotifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cycleNotification = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        }, 1000); // Wait 1 second before showing the next one
      }, 5000); // Show for 5 seconds
    };

    // Initial delay
    const initialTimer = setTimeout(cycleNotification, 3000);

    const intervalId = setInterval(cycleNotification, 12000); // Repeat every 12 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, []);

  const currentNotification = NOTIFICATIONS[currentIndex];

  return (
    <div className="fixed bottom-20 left-8 z-[60] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/70 backdrop-blur-md p-3 rounded-lg border border-white flex items-center gap-4 shadow-sm w-72 pointer-events-auto"
          >
            <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center font-bold text-brand-black text-[12px] shrink-0">
              {currentNotification.name.substring(0,2).toUpperCase()}
            </div>
            <div className="font-body text-[11px] leading-snug">
              <span className="font-bold">{currentNotification.name} from {currentNotification.location}</span> purchased a<br/>
              <span className="italic">{currentNotification.product}</span> • {currentNotification.time}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
