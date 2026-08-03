import { CheckCircle2, ShieldCheck, Truck, Package, HeartHandshake, Award } from 'lucide-react';

const FEATURES = [
  { icon: Award, title: "Premium Quality", description: "Only the finest materials and craftsmanship." },
  { icon: Truck, title: "Nationwide Delivery", description: "Fast and secure delivery to your doorstep." },
  { icon: ShieldCheck, title: "Secure Shopping", description: "Safe and encrypted checkout process." },
  { icon: Package, title: "Beautiful Packaging", description: "Every order arrives in our signature luxury box." },
  { icon: HeartHandshake, title: "Exceptional Care", description: "Dedicated support team at your service." },
  { icon: CheckCircle2, title: "Carefully Curated", description: "Handpicked selections by our expert stylists." },
];

export default function Features() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-brand-black mb-4">Why Choose Us</h2>
          <div className="w-16 h-0.5 bg-brand-pink mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-sm bg-gray-50/50 hover:bg-brand-pink/5 transition-colors duration-300">
                <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-6 text-brand-pink">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl text-brand-black mb-3">{feature.title}</h3>
                <p className="font-body text-gray-500 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
