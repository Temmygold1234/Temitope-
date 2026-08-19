export const safeJSONParse = (data: string | null, fallback: any) => {
  if (!data) return fallback;
  try {
    const parsed = JSON.parse(data);
    
    // If fallback is an array, ensure the parsed result is also an array
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) ? parsed : fallback;
    }
    
    // If fallback is an object (and not null), ensure the parsed result is also an object
    if (fallback !== null && typeof fallback === 'object' && !Array.isArray(fallback)) {
      return (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : fallback;
    }
    
    return parsed;
  } catch (e) {
    return fallback;
  }
};
