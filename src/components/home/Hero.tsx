import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { homeSettings } = useCMS();
  
  // Filter enabled slides and check schedules
  const now = new Date();
  const activeSlides = homeSettings.hero.slides.filter((slide: any) => {
    if (!slide.enabled) return false;
    if (slide.startDate && new Date(slide.startDate) > now) return false;
    if (slide.endDate && new Date(slide.endDate) < now) return false;
    return true;
  });

  const displayDuration = homeSettings.hero.displayDuration || 6000;
  const transitionEffect = homeSettings.hero.transitionEffect || 'fade';

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, displayDuration);
    return () => clearInterval(timer);
  }, [activeSlides.length, displayDuration]);

  if (activeSlides.length === 0) return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));

  const slide = activeSlides[currentSlide];

  // Transition settings
  const getVariants = () => {
    if (transitionEffect === 'slide') {
      return {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '-100%' }
      };
    } else if (transitionEffect === 'zoom') {
      return {
        initial: { scale: 1.1, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.1, opacity: 0 }
      };
    }
    // Default fade
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };
  };

  const textAlignClass = 
    slide.textAlign === 'center' ? 'items-center text-center' :
    slide.textAlign === 'right' ? 'items-end text-right' : 
    'items-start text-left';

  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white">
      <AnimatePresence initial={false} mode={transitionEffect === 'fade' || transitionEffect === 'zoom' ? 'wait' : 'popLayout'}>
        <motion.div
          key={currentSlide}
          variants={getVariants()}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
             <img
                src={slide.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80'}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
          </div>
          
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black transition-opacity duration-300"
            style={{ opacity: (slide.overlayOpacity ?? 40) / 100 }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 z-20">
            <div className={`flex flex-col max-w-3xl ${textAlignClass} w-full`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {slide.subtitle && (
                  <div className="text-white/80 font-ui text-sm sm:text-base uppercase tracking-[0.2em] mb-4">
                    {slide.subtitle}
                  </div>
                )}
                
                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.1] mb-6 text-white drop-shadow-md">
                  {slide.title}
                </h1>
                
                {slide.description && (
                  <p className="font-body text-base sm:text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow">
                    {slide.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 font-ui text-[13px] uppercase tracking-widest mt-4">
                  {slide.button1Text && (
                    <Link
                      to={slide.button1Link || '#'}
                      className="bg-white text-black px-10 py-4 hover:bg-brand-pink hover:text-white hover:border-brand-pink border border-white transition-all text-center"
                    >
                      {slide.button1Text}
                    </Link>
                  )}
                  {slide.button2Text && (
                    <Link
                      to={slide.button2Link || '#'}
                      className="border border-white text-white px-10 py-4 hover:bg-white hover:text-black transition-colors text-center backdrop-blur-sm bg-black/10"
                    >
                      {slide.button2Text}
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white backdrop-blur flex items-center justify-center transition-colors rounded-full z-30"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white backdrop-blur flex items-center justify-center transition-colors rounded-full z-30"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
