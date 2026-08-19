import { Upload, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function AdminMedia() {
  const [notification, setNotification] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=400&q=80",
    "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80"
  ]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpload = () => {
    // Show a file picker dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages(prev => [event.target!.result as string, ...prev]);
            showNotification('Image uploaded successfully!');
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      showNotification('Image URL copied to clipboard!');
    }).catch(() => {
      showNotification('Failed to copy URL. Please try manually.');
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto relative">
      {notification && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity">
          {notification}
        </div>
      )}
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
          {images.map((imgSrc, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden relative group"> 
               <img src={imgSrc || undefined} className="w-full h-full object-cover" alt={`Uploaded media ${index}`} />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button onClick={() => handleCopyUrl(imgSrc)} className="text-white text-sm bg-black/80 px-3 py-1 rounded">Copy URL</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
