import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading text-brand-black mb-4">Contact Us</h1>
          <div className="w-16 h-0.5 bg-brand-pink mx-auto mb-6"></div>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            We are here to assist you with any inquiries regarding our luxury collections, your orders, or styling advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 p-8 md:p-12 rounded-sm"
          >
            <h2 className="font-heading text-2xl mb-8 text-brand-black">Send us a message</h2>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">Email Address *</label>
                <input type="email" required className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">Message *</label>
                <textarea rows={5} required className="w-full bg-white border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-brand-black text-white font-ui text-sm uppercase tracking-widest py-4 hover:bg-brand-pink transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-10"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-brand-pink" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2 text-brand-black">Our Boutique</h3>
                <p className="font-body text-gray-500 leading-relaxed">
                  Ikeja, Lagos, Nigeria<br />
                  (Visit strictly by appointment)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="text-brand-pink" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2 text-brand-black">Phone & WhatsApp</h3>
                <p className="font-body text-gray-500 leading-relaxed">
                  07077758928<br />
                  Available Mon-Sat
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-brand-pink" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2 text-brand-black">Email</h3>
                <p className="font-body text-gray-500 leading-relaxed">
                  <a href="mailto:ridwanatolubodun02@gmail.com" className="hover:text-brand-pink transition-colors">
                    ridwanatolubodun02@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center shrink-0">
                <Clock className="text-brand-pink" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2 text-brand-black">Business Hours</h3>
                <p className="font-body text-gray-500 leading-relaxed">
                  Monday - Friday: 9:00 AM - 7:00 PM<br />
                  Saturday: 10:00 AM - 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <a 
              href="https://wa.me/2347077758928?text=Hello%20TemmyLuxury%20Ltd,%20I'm%20interested%20in%20your%20luxury%20products."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui uppercase tracking-widest text-sm py-4 px-8 rounded-sm hover:bg-[#1EBE5D] transition-colors mt-4 w-fit"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div className="h-[400px] w-full bg-gray-100 relative rounded-sm overflow-hidden group">
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center z-10 pointer-events-none">
             <div className="bg-white px-6 py-3 rounded-sm shadow-md flex items-center gap-2">
                <MapPin size={18} className="text-brand-pink" />
                <span className="font-ui text-sm uppercase tracking-widest">Ikeja, Lagos</span>
             </div>
          </div>
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80" alt="Map Location" className="w-full h-full object-cover filter grayscale opacity-60" />
        </div>

      </div>
    </div>
  );
}
