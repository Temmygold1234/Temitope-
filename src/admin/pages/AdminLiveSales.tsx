import { Save } from 'lucide-react';

export default function AdminLiveSales() {
  const handleSave = () => {
    alert('Live sales settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Sales Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">Configure the popup notifications that show recent purchases to create urgency.</p>
        </div>
        <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors">
          <Save size={18} /> Save Settings
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center pb-6 border-b border-gray-100">
          <input type="checkbox" defaultChecked id="enableLiveSales" className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
          <label htmlFor="enableLiveSales" className="ml-3 text-sm font-medium text-gray-900">
            Enable Live Sales Notifications
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Delay (seconds)</label>
            <input type="number" defaultValue="5" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            <p className="text-xs text-gray-500 mt-1">Time before the first notification appears.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interval Between Popups (seconds)</label>
            <input type="number" defaultValue="15" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            <p className="text-xs text-gray-500 mt-1">Time to wait before showing the next notification.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Duration (seconds)</label>
            <input type="number" defaultValue="5" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
            <p className="text-xs text-gray-500 mt-1">How long each notification stays visible.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
