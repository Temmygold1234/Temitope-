import { useState, useEffect, ChangeEvent } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save } from 'lucide-react';

export default function HomeEditor() {
  const { homeSettings, updateHomeSettings } = useCMS();
  const [formData, setFormData] = useState(homeSettings);

  useEffect(() => {
    setFormData(homeSettings);
  }, [homeSettings]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, index?: number) => {
    if (index !== undefined) {
      const newSlides = [...formData.hero.slides];
      newSlides[index] = { ...newSlides[index], [field]: e.target.value };
      setFormData({ ...formData, hero: { ...formData.hero, slides: newSlides } });
    } else {
      setFormData({ ...formData, hero: { ...formData.hero, [field]: e.target.value } });
    }
  };

  const handleSave = () => {
    updateHomeSettings(formData);
    alert('Home settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Home Page Editor</h1>
          <p className="mt-1 text-sm text-gray-500">Edit the content displayed on the main landing page.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Hero Section Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
              <input
                type="text"
                value={formData.hero.button1 || ''}
                onChange={(e) => handleChange(e, 'button1')}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
              <input
                type="text"
                value={formData.hero.button2 || ''}
                onChange={(e) => handleChange(e, 'button2')}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Hero Slides</h2>
          
          <div className="space-y-8">
            {formData.hero.slides.map((slide: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Slide {index + 1}</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => handleChange(e, 'image', index)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"
                  />
                  {slide.image && (
                    <div className="mt-2 h-32 w-full object-cover overflow-hidden rounded-md border border-gray-200">
                      <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleChange(e, 'title', index)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
                  <textarea
                    value={slide.subtitle}
                    onChange={(e) => handleChange(e, 'subtitle', index)}
                    rows={2}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
