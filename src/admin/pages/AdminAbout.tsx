import { Save } from 'lucide-react';

export default function AdminAbout() {
  const handleSave = () => {
    alert('About Page content saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Page Editor</h1>
          <p className="mt-1 text-sm text-gray-500">Edit the content of the About Us page.</p>
        </div>
        <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors">
          <Save size={18} /> Save Changes
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
          <input type="text" defaultValue="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input type="text" defaultValue="Redefining Elegance" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Our Story (Paragraph 1)</label>
          <textarea rows={4} defaultValue="Founded on the principle that true luxury lies in the details, TemmyLuxury has established itself as the premier destination for discerning individuals who appreciate the finer things in life." className="w-full border border-gray-300 rounded-md px-4 py-2"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Our Story (Paragraph 2)</label>
          <textarea rows={4} defaultValue="We travel the globe to hand-select pieces that represent the pinnacle of fashion engineering and artistic expression. From timeless leather goods to precision timepieces, every item in our collection tells a story of passion, heritage, and uncompromising quality." className="w-full border border-gray-300 rounded-md px-4 py-2"></textarea>
        </div>
      </div>
    </div>
  );
}
