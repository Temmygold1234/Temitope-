import { motion } from 'motion/react';
import { ArrowRight, Star, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" 
            alt="About TemmyLuxury" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/80 font-ui text-sm uppercase tracking-[0.3em] mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">
              Redefining <span className="italic font-normal">Elegance</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Curating the world's most exquisite fashion pieces for those who demand nothing but the absolute best in craftsmanship and design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-8">The TemmyLuxury Heritage</h2>
            <p className="font-body text-gray-600 mb-6 leading-relaxed">
              Founded on the principle that true luxury lies in the details, TemmyLuxury has established itself as the premier destination for discerning individuals who appreciate the finer things in life.
            </p>
            <p className="font-body text-gray-600 mb-8 leading-relaxed">
              We travel the globe to hand-select pieces that represent the pinnacle of fashion engineering and artistic expression. From timeless leather goods to precision timepieces, every item in our collection tells a story of passion, heritage, and uncompromising quality.
            </p>
            <Link to="/collections" className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-widest text-brand-black hover:text-brand-pink transition-colors">
              Explore Our Collections <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 h-[500px] rounded-sm overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?w=800&q=80" 
              alt="Craftsmanship" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Values */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl mb-6">Our Philosophy</h2>
            <div className="w-16 h-0.5 bg-brand-pink mx-auto mb-8"></div>
            <p className="font-body text-gray-600 leading-relaxed">
              We believe that luxury is not just a price tag, but a state of mind. It is an appreciation for artistry, a commitment to quality, and a desire to surround oneself with objects that inspire and elevate the everyday experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-10 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-brand-black" size={24} />
              </div>
              <h3 className="font-heading text-xl mb-4">Uncompromising Quality</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                We partner only with brands and artisans who share our obsession with perfection, ensuring every piece meets our exacting standards.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-10 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-brand-black" size={24} />
              </div>
              <h3 className="font-heading text-xl mb-4">Curated Excellence</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                Our collections are not just assembled; they are carefully orchestrated to represent the absolute vanguard of contemporary luxury.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-10 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-brand-black" size={24} />
              </div>
              <h3 className="font-heading text-xl mb-4">Exceptional Service</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                We provide a highly personalized shopping experience, treating every client with the utmost care, discretion, and attention to detail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visit Us Banner */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <h2 className="font-heading text-4xl mb-6">Experience TemmyLuxury</h2>
        <p className="font-body text-gray-600 mb-8 max-w-2xl mx-auto">
          We invite you to experience our collections firsthand. Our dedicated styling consultants are ready to assist you in finding the perfect pieces to complement your unique style.
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-brand-black text-white px-10 py-4 font-ui text-sm uppercase tracking-widest hover:bg-brand-pink transition-colors"
        >
          Contact Our Consultants
        </Link>
      </section>
    </div>
  );
}
