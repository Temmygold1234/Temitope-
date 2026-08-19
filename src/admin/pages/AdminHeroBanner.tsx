import { useState, useEffect, DragEvent } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, Plus, GripVertical, Trash2, Edit2, Image as ImageIcon, Eye, EyeOff, LayoutTemplate } from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
  overlayOpacity: number;
  textAlign: 'left' | 'center' | 'right';
  enabled: boolean;
  startDate?: string;
  endDate?: string;
}

interface Banner {
  id: string;
  type: string;
  image: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  position: 'top' | 'middle' | 'bottom';
  startDate?: string;
  endDate?: string;
  enabled: boolean;
}

export default function AdminHeroBanner() {
  const { homeSettings, updateHomeSettings } = useCMS();
  const [formData, setFormData] = useState(homeSettings);
  const [activeTab, setActiveTab] = useState<'slides' | 'banners' | 'preview'>('slides');
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editingBanner, setEditingBanner] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    setFormData(homeSettings);
  }, [homeSettings]);

  const handleSave = () => {
    updateHomeSettings(formData);
    alert('Settings saved successfully!');
  };

  // --- Slides Management ---
  const handleSlideChange = (id: string, field: keyof Slide, value: any) => {
    const updatedSlides = formData.hero.slides.map((slide: Slide) => 
      slide.id === id ? { ...slide, [field]: value } : slide
    );
    setFormData({ ...formData, hero: { ...formData.hero, slides: updatedSlides } });
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      image: '',
      title: 'New Slide',
      subtitle: '',
      description: '',
      button1Text: 'Shop Now',
      button1Link: '/shop',
      button2Text: '',
      button2Link: '',
      overlayOpacity: 40,
      textAlign: 'left',
      enabled: true
    };
    setFormData({ ...formData, hero: { ...formData.hero, slides: [...formData.hero.slides, newSlide] } });
    setEditingSlide(newSlide.id);
  };

  const deleteSlide = (id: string) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setFormData({ 
        ...formData, 
        hero: { ...formData.hero, slides: formData.hero.slides.filter((s: Slide) => s.id !== id) } 
      });
    }
  };

  const onDragStart = (e: DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    
    const items = [...formData.hero.slides];
    const draggedItem = items[draggedItemIndex];
    items.splice(draggedItemIndex, 1);
    items.splice(index, 0, draggedItem);
    
    setDraggedItemIndex(index);
    setFormData({ ...formData, hero: { ...formData.hero, slides: items } });
  };

  const onDragEnd = () => {
    setDraggedItemIndex(null);
  };

  // --- Banners Management ---
  const handleBannerChange = (id: string, field: keyof Banner, value: any) => {
    const updatedBanners = formData.banners.map((banner: Banner) => 
      banner.id === id ? { ...banner, [field]: value } : banner
    );
    setFormData({ ...formData, banners: updatedBanners });
  };

  const addBanner = () => {
    const newBanner: Banner = {
      id: `banner-${Date.now()}`,
      type: 'Flash Sale Banner',
      image: '',
      heading: 'New Promotion',
      description: '',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      position: 'middle',
      enabled: false
    };
    const banners = formData.banners || [];
    setFormData({ ...formData, banners: [...banners, newBanner] });
    setEditingBanner(newBanner.id);
  };

  const deleteBanner = (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setFormData({ 
        ...formData, 
        banners: formData.banners.filter((b: Banner) => b.id !== id)
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Slider & Banner Manager</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your homepage hero slides and promotional banners.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveTab('preview')}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <LayoutTemplate size={18} />
            Live Preview
          </button>
          <button 
            onClick={handleSave}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Save size={18} />
            Save & Publish
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('slides')}
            className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'slides' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Hero Slides
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'banners' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Promotional Banners
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'preview' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Preview
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'slides' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Transition Effect</label>
                    <select
                      value={formData.hero.transitionEffect || 'fade'}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, transitionEffect: e.target.value } })}
                      className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    >
                      <option value="fade">Fade</option>
                      <option value="slide">Slide</option>
                      <option value="zoom">Zoom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Display Duration (ms)</label>
                    <input
                      type="number"
                      value={formData.hero.displayDuration === undefined || Number.isNaN(formData.hero.displayDuration) ? '' : formData.hero.displayDuration}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, displayDuration: e.target.value ? parseInt(e.target.value) : 6000 } })}
                      className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-32"
                    />
                  </div>
                </div>
                <button
                  onClick={addSlide}
                  className="flex items-center gap-2 text-sm bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                >
                  <Plus size={16} />
                  Add Slide
                </button>
              </div>

              <div className="space-y-4">
                {formData.hero.slides.map((slide: Slide, index: number) => (
                  <div 
                    key={slide.id} 
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragOver={(e) => onDragOver(e, index)}
                    onDragEnd={onDragEnd}
                    className="border border-gray-200 rounded-lg bg-white overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="cursor-grab text-gray-400 hover:text-gray-600">
                          <GripVertical size={20} />
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleSlideChange(slide.id, 'enabled', !slide.enabled)}
                            className={`text-sm flex items-center gap-1 ${slide.enabled ? 'text-green-600' : 'text-gray-400'}`}
                          >
                            {slide.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <span className="font-medium text-sm">Slide {index + 1}: {slide.title || 'Untitled'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setEditingSlide(editingSlide === slide.id ? null : slide.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteSlide(slide.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {editingSlide === slide.id && (
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (High-quality luxury product)</label>
                            <input
                              type="text"
                              value={slide.image}
                              onChange={(e) => handleSlideChange(slide.id, 'image', e.target.value)}
                              placeholder="https://images.unsplash.com/photo-..."
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                            {slide.image && (
                              <div className="mt-2 relative w-full h-32 rounded bg-gray-100 overflow-hidden">
                                <img src={slide.image || undefined} alt={slide.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
                            <input
                              type="text"
                              value={slide.subtitle}
                              onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea
                              value={slide.description || ''}
                              onChange={(e) => handleSlideChange(slide.id, 'description', e.target.value)}
                              rows={2}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button</label>
                              <input
                                type="text"
                                value={slide.button1Text || ''}
                                onChange={(e) => handleSlideChange(slide.id, 'button1Text', e.target.value)}
                                placeholder="Text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2"
                              />
                              <input
                                type="text"
                                value={slide.button1Link || ''}
                                onChange={(e) => handleSlideChange(slide.id, 'button1Link', e.target.value)}
                                placeholder="Link URL"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button</label>
                              <input
                                type="text"
                                value={slide.button2Text || ''}
                                onChange={(e) => handleSlideChange(slide.id, 'button2Text', e.target.value)}
                                placeholder="Text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2"
                              />
                              <input
                                type="text"
                                value={slide.button2Link || ''}
                                onChange={(e) => handleSlideChange(slide.id, 'button2Link', e.target.value)}
                                placeholder="Link URL"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Overlay Opacity (%)</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={slide.overlayOpacity === undefined || Number.isNaN(slide.overlayOpacity) ? '' : slide.overlayOpacity}
                                onChange={(e) => handleSlideChange(slide.id, 'overlayOpacity', e.target.value ? parseInt(e.target.value) : 0)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
                              <select
                                value={slide.textAlign || 'left'}
                                onChange={(e) => handleSlideChange(slide.id, 'textAlign', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Start</label>
                              <input
                                type="datetime-local"
                                value={slide.startDate || ''}
                                onChange={(e) => handleSlideChange(slide.id, 'startDate', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule End</label>
                              <input
                                type="datetime-local"
                                value={slide.endDate || ''}
                                onChange={(e) => handleSlideChange(slide.id, 'endDate', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="flex justify-end bg-gray-50 p-4 rounded-md border border-gray-200">
                <button
                  onClick={addBanner}
                  className="flex items-center gap-2 text-sm bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                >
                  <Plus size={16} />
                  Add Promotional Banner
                </button>
              </div>

              <div className="space-y-4">
                {formData.banners?.map((banner: Banner, index: number) => (
                  <div key={banner.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleBannerChange(banner.id, 'enabled', !banner.enabled)}
                            className={`text-sm flex items-center gap-1 ${banner.enabled ? 'text-green-600' : 'text-gray-400'}`}
                          >
                            {banner.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <span className="font-medium text-sm">{banner.type}: {banner.heading || 'Untitled'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setEditingBanner(editingBanner === banner.id ? null : banner.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteBanner(banner.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {editingBanner === banner.id && (
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Type</label>
                            <select
                              value={banner.type}
                              onChange={(e) => handleBannerChange(banner.id, 'type', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                              <option value="Flash Sale Banner">Flash Sale Banner</option>
                              <option value="New Arrival Banner">New Arrival Banner</option>
                              <option value="Seasonal Collection Banner">Seasonal Collection Banner</option>
                              <option value="Limited Edition Banner">Limited Edition Banner</option>
                              <option value="Free Delivery Banner">Free Delivery Banner</option>
                              <option value="Holiday Campaign Banner">Holiday Campaign Banner</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
                            <input
                              type="text"
                              value={banner.image}
                              onChange={(e) => handleBannerChange(banner.id, 'image', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                            {banner.image && (
                              <div className="mt-2 h-24 w-full rounded bg-gray-100 overflow-hidden">
                                <img src={banner.image || undefined} alt="Banner Preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                            <input
                              type="text"
                              value={banner.heading}
                              onChange={(e) => handleBannerChange(banner.id, 'heading', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={banner.description}
                              onChange={(e) => handleBannerChange(banner.id, 'description', e.target.value)}
                              rows={2}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                              <input
                                type="text"
                                value={banner.buttonText}
                                onChange={(e) => handleBannerChange(banner.id, 'buttonText', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Link</label>
                              <input
                                type="text"
                                value={banner.buttonLink}
                                onChange={(e) => handleBannerChange(banner.id, 'buttonLink', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display Position</label>
                            <select
                              value={banner.position}
                              onChange={(e) => handleBannerChange(banner.id, 'position', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                              <option value="top">Top (Above Header)</option>
                              <option value="middle">Middle (Between Sections)</option>
                              <option value="bottom">Bottom (Before Footer)</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                              <input
                                type="datetime-local"
                                value={banner.startDate || ''}
                                onChange={(e) => handleBannerChange(banner.id, 'startDate', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                              <input
                                type="datetime-local"
                                value={banner.endDate || ''}
                                onChange={(e) => handleBannerChange(banner.id, 'endDate', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {(!formData.banners || formData.banners.length === 0) && (
                  <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    No banners configured. Click "Add Promotional Banner" to create one.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-blue-50 text-blue-700 p-4 rounded-md text-sm border border-blue-100 mb-6">
                <strong>Preview Mode:</strong> This is a live preview of how your hero slider and banners will look. It does not reflect on the live site until you click "Save & Publish". Note: Only active slides/banners (based on toggles and schedules) are shown.
              </div>
              
              <div className="border-[8px] border-gray-900 rounded-xl overflow-hidden shadow-2xl relative" style={{ height: '800px' }}>
                <div className="w-full h-full overflow-y-auto bg-white" style={{ zoom: '0.8' }}>
                  <div className="pointer-events-none">
                    {/* Render Hero Preview */}
                    <div className="relative h-screen min-h-[600px] w-full bg-black flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Hero Slider Preview</p>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto">
                           Hero preview uses current form data instead of CMS context context. Check live site for full interactive hero slider.
                        </p>
                      </div>
                      
                      {/* Simple static preview of the first active slide */}
                      {(() => {
                         const now = new Date();
                         const activeSlide = formData.hero.slides.find((s: Slide) => 
                           s.enabled && (!s.startDate || new Date(s.startDate) <= now) && (!s.endDate || new Date(s.endDate) >= now)
                         );
                         
                         if (!activeSlide) return null;
                         
                         const textAlignClass = 
                           activeSlide.textAlign === 'center' ? 'items-center text-center' :
                           activeSlide.textAlign === 'right' ? 'items-end text-right' : 
                           'items-start text-left';

                         return (
                           <div className="absolute inset-0 w-full h-full">
                             <img src={activeSlide.image || undefined} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black" style={{ opacity: (activeSlide.overlayOpacity ?? 40) / 100 }} />
                             
                             <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 z-20">
                              <div className={`flex flex-col max-w-3xl ${textAlignClass} w-full`}>
                                {activeSlide.subtitle && <div className="text-white/80 font-ui text-sm uppercase tracking-[0.2em] mb-4">{activeSlide.subtitle}</div>}
                                <h1 className="font-heading text-4xl sm:text-6xl text-white drop-shadow-md mb-6">{activeSlide.title}</h1>
                                {activeSlide.description && <p className="font-body text-base text-white/90 mb-10 max-w-2xl">{activeSlide.description}</p>}
                                <div className="flex flex-col sm:flex-row gap-4 font-ui text-[13px] uppercase tracking-widest mt-4">
                                  {activeSlide.button1Text && <div className="bg-white text-black px-10 py-4 text-center">{activeSlide.button1Text}</div>}
                                  {activeSlide.button2Text && <div className="border border-white text-white px-10 py-4 text-center">{activeSlide.button2Text}</div>}
                                </div>
                              </div>
                             </div>
                           </div>
                         );
                      })()}
                    </div>
                    
                    {/* Render Banners Preview */}
                    <div className="p-8 bg-gray-100 flex flex-col gap-12">
                      <h3 className="font-heading text-2xl text-center">Banners Preview</h3>
                      
                      {['top', 'middle', 'bottom'].map((pos) => {
                        const now = new Date();
                        const activeBanners = formData.banners.filter((b: Banner) => 
                          b.enabled && b.position === pos && (!b.startDate || new Date(b.startDate) <= now) && (!b.endDate || new Date(b.endDate) >= now)
                        );
                        
                        return activeBanners.map((banner: Banner) => (
                           <section key={banner.id} className="w-full relative bg-gray-900 text-white overflow-hidden py-16">
                            {banner.image && (
                              <div className="absolute inset-0 z-0">
                                <img src={banner.image || undefined} className="w-full h-full object-cover opacity-40" />
                              </div>
                            )}
                            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                              {banner.type && <span className="font-ui text-xs tracking-[0.2em] uppercase text-brand-pink mb-4">{banner.type} (Pos: {pos})</span>}
                              <h2 className="font-heading text-4xl mb-6">{banner.heading}</h2>
                              {banner.description && <p className="font-body text-base text-gray-300 max-w-2xl mb-8">{banner.description}</p>}
                              {banner.buttonText && (
                                <div className="inline-block bg-white text-black px-8 py-4 font-ui text-sm uppercase tracking-widest">{banner.buttonText}</div>
                              )}
                            </div>
                          </section>
                        ));
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
