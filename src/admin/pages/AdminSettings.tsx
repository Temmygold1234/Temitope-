import { Save } from 'lucide-react';

export default function AdminSettings() {
  const handleSave = () => {
    alert('Website settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage global website configurations and preferences.</p>
        </div>
        <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors">
          <Save size={18} /> Save Settings
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" defaultValue="TemmyLuxury" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" defaultValue="Luxury That Speaks Before You Do" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Localization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
              <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>NGN (₦)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black">
                <option>Africa/Lagos (GMT+1)</option>
                <option>UTC (GMT+0)</option>
                <option>America/New_York (GMT-5)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Social Media Links</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="text" defaultValue="https://instagram.com/temmyluxury" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="text" defaultValue="https://facebook.com/temmyluxury" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
              <input type="text" defaultValue="https://twitter.com/temmyluxury" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
