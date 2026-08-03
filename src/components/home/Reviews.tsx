import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { text: "Beautiful quality and fast delivery. I received exactly what I ordered.", author: "A.O.", location: "Lagos" },
  { text: "My shoes and perfume exceeded my expectations. True luxury.", author: "F.M.", location: "Abuja" },
  { text: "I'll definitely shop here again. The packaging alone was worth it.", author: "C.E.", location: "Ibadan" },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-brand-black text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[200px] text-white/5 font-heading opacity-50 pointer-events-none">
        "
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center gap-1 mb-10 text-brand-pink">
          {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} fill="currentColor" strokeWidth={0} />)}
        </div>
        
        <div className="h-48 md:h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="font-heading text-2xl md:text-3xl leading-relaxed mb-8">
                "{REVIEWS[current].text}"
              </p>
              <div className="font-ui text-sm uppercase tracking-widest text-gray-400">
                — {REVIEWS[current].author}, {REVIEWS[current].location}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${idx === current ? 'bg-brand-pink' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
