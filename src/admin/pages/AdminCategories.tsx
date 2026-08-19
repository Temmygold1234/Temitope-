import { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCMS();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoryName, setEditingCategoryName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    image: ''
  });

  const handleOpenModal = (category?: any) => {
    if (category) {
      setEditingCategoryName(category.name);
      setFormData({ name: category.name, image: category.image });
    } else {
      setEditingCategoryName(null);
      setFormData({ name: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategoryName(null);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setFormData(prev => ({ ...prev, image: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategoryName) {
      updateCategory(editingCategoryName, formData);
    } else {
      addCategory(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      deleteCategory(name);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">Manage product categories.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors">
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
                    <img className="h-12 w-12 rounded-md object-cover" src={category.image} alt={category.name} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleOpenModal(category)} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(category.name)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No categories found.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingCategoryName ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black" />
                  <button type="button" onClick={handleImageUpload} className="bg-gray-100 border border-gray-300 rounded-md px-3 hover:bg-gray-200 flex items-center justify-center" title="Upload Image">
                    <Upload size={18} />
                  </button>
                </div>
                {formData.image && (
                  <div className="mt-2 h-32 w-full object-cover overflow-hidden rounded-md border border-gray-200">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors mt-4">
                {editingCategoryName ? 'Save Changes' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
