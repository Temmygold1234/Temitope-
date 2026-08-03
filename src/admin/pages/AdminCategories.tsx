import { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminCategories() {
  const { categories } = useCMS();

  const handleAdd = () => alert('Add category feature coming soon!');
  const handleEdit = () => alert('Edit category feature coming soon!');
  const handleDelete = () => confirm('Are you sure you want to delete this category?') && alert('Category deleted!');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">Manage product categories.</p>
        </div>
        <button onClick={handleAdd} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.name}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 flex-shrink-0">
                    <img className="h-12 w-12 rounded-md object-cover" src={category.image} alt="" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={handleEdit} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"><Edit size={18} /></button>
                  <button onClick={handleDelete} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
