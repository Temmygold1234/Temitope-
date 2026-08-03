import { Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminMedia() {
  const handleUpload = () => {
    alert('Select files to upload (mock functionality).');
  };

  const handleCopyUrl = () => {
    alert('Image URL copied to clipboard!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your uploaded images and visual assets.</p>
        </div>
        <button onClick={handleUpload} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 transition-colors">
          <Upload size={18} /> Upload Media
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <div onClick={handleUpload} className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center flex flex-col items-center mb-8 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <ImageIcon className="text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 font-medium">Drag and drop images here, or click to browse</p>
          <p className="text-gray-400 text-sm mt-2">Supports JPG, PNG, WEBP up to 10MB</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Mock gallery items */}
          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden relative group">
             <img src="https://images.unsplash.com/photo-1549439602-43ebca2327af?w=400&q=80" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button onClick={handleCopyUrl} className="text-white text-sm bg-black/80 px-3 py-1 rounded">Copy URL</button>
             </div>
          </div>
          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden relative group">
             <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button onClick={handleCopyUrl} className="text-white text-sm bg-black/80 px-3 py-1 rounded">Copy URL</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
