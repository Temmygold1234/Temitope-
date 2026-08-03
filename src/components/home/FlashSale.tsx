import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-brand-pink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-sm font-ui uppercase tracking-widest text-brand-pink mb-4">Limited Time Offer</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-brand-black mb-6">Flash Sale<br/>Up to 50% Off</h3>
            <p className="text-gray-600 font-body mb-8 max-w-md mx-auto md:mx-0">
              Elevate your wardrobe with our premium selection at unbeatable prices. The clock is ticking.
            </p>
            
            <div className="flex justify-center md:justify-start gap-4 mb-10">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="bg-white w-16 h-16 flex items-center justify-center rounded-sm shadow-sm mb-2">
                    <span className="font-heading text-2xl text-brand-black">{value.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs font-ui uppercase tracking-widest text-gray-500">{unit}</span>
                </div>
              ))}
            </div>

            <Link
              to="/shop?sale=true"
              className="inline-block bg-brand-black text-white px-10 py-4 font-ui uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
            >
              Shop the Sale
            </Link>
          </div>
          
          <div className="flex-1">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1000&q=80"
                alt="Flash Sale Featured Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
