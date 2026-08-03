import { Save } from 'lucide-react';

export default function AdminContact() {
  const handleSave = () => {
    alert('Contact settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Page Editor</h1>
          <p className="mt-1 text-sm text-gray-500">Manage contact information, business hours, and location.</p>
        </div>
        <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors">
          <Save size={18} /> Save Changes
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="text" defaultValue="ridwanatolubodun02@gmail.com" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="text" defaultValue="07077758928" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Boutique Address</label>
          <textarea rows={2} defaultValue="Ikeja, Lagos, Nigeria&#10;(Visit strictly by appointment)" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
          <textarea rows={3} defaultValue="Monday - Friday: 9:00 AM - 7:00 PM&#10;Saturday: 10:00 AM - 5:00 PM&#10;Sunday: Closed" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Message Template</label>
          <input type="text" defaultValue="Hello TemmyLuxury Ltd, I'm interested in your luxury products." className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black" />
          <p className="text-xs text-gray-500 mt-1">This text will be pre-filled when a customer clicks the WhatsApp button.</p>
        </div>
      </div>
    </div>
  );
}
