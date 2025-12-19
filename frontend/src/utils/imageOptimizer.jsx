// Optimize images for faster loading
export const getOptimizedImageUrl = (url, width = 300) => {
  if (!url) return null;
  
  // If it's a TMDB image, use smaller size
  if (url.includes('image.tmdb.org')) {
    return url.replace('/w500/', `/w${width}/`);
  }
  
  return url;
};

// Preload critical images
export const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

// Lazy load images with intersection observer
export const useLazyImage = (ref, src) => {
  if (!ref.current || !src) return;
  
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = src;
        img.onload = () => img.classList.add('loaded');
        observer.unobserve(img);
      }
    },
    { threshold: 0.1 }
  );
  
  observer.observe(ref.current);
  return () => observer.disconnect();
};