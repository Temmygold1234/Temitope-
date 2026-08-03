import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminCollections() {
  const [collections, setCollections] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCreate = () => {
    if (!newCollectionName.trim()) {
      alert('Collection name is required');
      return;
    }
    setCollections([...collections, { id: Date.now(), name: newCollectionName }]);
    setNewCollectionName('');
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      setCollections(collections.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
          <p className="mt-1 text-sm text-gray-500">Manage curated product collections (e.g. Summer Collection, Vintage).</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Create Collection
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex gap-4 items-end">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Collection Name</label>
            <input 
              type="text" 
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g. Summer 2026"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"
            />
          </div>
          <button onClick={handleCreate} className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Save size={18} /> Save
          </button>
          <button onClick={() => setIsAdding(false)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200">
            <X size={18} /> Cancel
          </button>
        </div>
      )}

      {collections.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center text-gray-500">
          <p>No collections created yet.</p>
          <button 
            onClick={() => setIsAdding(true)}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Click here to create your first collection
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collections.map(c => (
                <tr key={c.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
