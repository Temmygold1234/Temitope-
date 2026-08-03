import { Download } from 'lucide-react';

export default function AdminNewsletter() {
  const handleExport = () => {
    alert('Exporting newsletter subscribers to CSV...');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your email subscriber list and export for campaigns.</p>
        </div>
        <button onClick={handleExport} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 transition-colors">
          <Download size={18} /> Export to CSV
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
           <span className="text-sm font-medium text-gray-700">Total Subscribers: 1,240</span>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">customer@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-07-31</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Footer Form</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">jane.doe@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-07-30</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Checkout</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
