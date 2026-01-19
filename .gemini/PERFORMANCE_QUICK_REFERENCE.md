# 🚀 Performance Optimization - Quick Reference Guide

## 📸 Optimized Image Loading

### Use OptimizedImage Component
```javascript
import OptimizedImage from '../common/OptimizedImage';

// Basic usage
<OptimizedImage 
  src="/path/to/image.jpg" 
  alt="Product image" 
  className="w-full h-64"
/>

// With priority (for above-fold images)
<OptimizedImage 
  src="/hero-image.jpg" 
  alt="Hero" 
  className="w-full h-screen"
  priority={true}
/>

// With custom placeholder color
<OptimizedImage 
  src="/product.jpg" 
  alt="Product" 
  className="w-full h-64"
  placeholderColor="#1a1a1a"
/>
```

---

## 🔄 Debounce & Throttle

### Debounce Search Input
```javascript
import { useDebounce } from '../hooks/useOptimization';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // API call only happens 500ms after user stops typing
    if (debouncedSearch) {
      searchAPI(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Debounced Callback
```javascript
import { useDebouncedCallback } from '../hooks/useOptimization';

function Form() {
  const handleSave = useDebouncedCallback((data) => {
    saveToAPI(data);
  }, 1000);

  return (
    <button onClick={() => handleSave(formData)}>
      Save
    </button>
  );
}
```

---

## 👁️ Lazy Loading with Intersection Observer

### Lazy Load Components
```javascript
import { useIntersectionObserver } from '../hooks/useOptimization';

function LazySection() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {isVisible ? (
        <HeavyComponent />
      ) : (
        <div className="h-64 bg-gray-800 animate-pulse" />
      )}
    </div>
  );
}
```

### Infinite Scroll
```javascript
function ProductList() {
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (isVisible && hasMore) {
      loadMoreProducts();
    }
  }, [isVisible]);

  return (
    <div>
      {products.map(product => <ProductCard key={product.id} {...product} />)}
      <div ref={ref} className="h-20" />
    </div>
  );
}
```

---

## 🎯 Preload Critical Resources

### Preload Hero Images
```javascript
import { usePreloadImages } from '../hooks/usePreload';

function HomePage() {
  usePreloadImages([
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/featured-product.jpg',
  ]);

  return <div>...</div>;
}
```

### Prefetch Next Page
```javascript
import { usePrefetchResources } from '../hooks/usePreload';

function ProductCard({ productId }) {
  // Prefetch product detail page on hover
  const handleMouseEnter = () => {
    usePrefetchResources([`/api/products/${productId}`]);
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      ...
    </div>
  );
}
```

---

## 💾 LocalStorage Persistence

### Save User Preferences
```javascript
import { useLocalStorage } from '../hooks/useOptimization';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

---

## 📊 Performance Monitoring (Dev Only)

### Monitor Component Performance
```javascript
import { usePerformanceMonitor } from '../hooks/usePerformance';

function ProductCard() {
  usePerformanceMonitor('ProductCard');
  // Logs warning if component takes >100ms to mount
  
  return <div>...</div>;
}
```

### Track API Calls
```javascript
import { useAPICallTracker } from '../hooks/usePerformance';

function ProductList() {
  const { data, isLoading } = useQuery(['products'], fetchProducts);
  
  useAPICallTracker('fetchProducts', isLoading, data);
  // Logs API call duration in development
  
  return <div>...</div>;
}
```

---

## 🔧 React Query Best Practices

### Configure Query with Caching
```javascript
import { useQuery } from '@tanstack/react-query';

// Good - with caching
const { data } = useQuery({
  queryKey: ['products', category],
  queryFn: () => fetchProducts(category),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});

// Bad - no caching
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  // Uses defaults from main.jsx
});
```

### Prefetch on Hover
```javascript
import { useQueryClient } from '@tanstack/react-query';

function ProductCard({ productId }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', productId],
      queryFn: () => fetchProduct(productId),
    });
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      ...
    </div>
  );
}
```

---

## 📱 Responsive Utilities

### Track Window Size
```javascript
import { useWindowSize } from '../hooks/useOptimization';

function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      {width < 768 ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}
```

---

## ⚡ Code Splitting

### Lazy Load Routes
```javascript
import { lazy, Suspense } from 'react';
import PageLoader from './common/PageLoader';

const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 🎨 CSS Optimization

### Use CSS Variables
```css
/* Good - reusable */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}

.button {
  background: var(--color-primary);
}

/* Bad - hardcoded */
.button {
  background: #3b82f6;
}
```

### Avoid Expensive CSS
```css
/* Good - performant */
.card {
  transform: translateY(0);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

/* Bad - causes reflow */
.card:hover {
  margin-top: -4px;
}
```

---

## 📦 Bundle Size Optimization

### Import Only What You Need
```javascript
// Good - tree-shakeable
import { FaStar, FaHeart } from 'react-icons/fa';

// Bad - imports entire library
import * as Icons from 'react-icons/fa';
```

### Dynamic Imports
```javascript
// Good - loads only when needed
const handleExport = async () => {
  const { exportToPDF } = await import('./utils/export');
  exportToPDF(data);
};

// Bad - always loaded
import { exportToPDF } from './utils/export';
```

---

## ✅ Performance Checklist

### Before Deploying:
- [ ] All images use `OptimizedImage` component
- [ ] Search inputs use `useDebounce`
- [ ] Heavy components are lazy loaded
- [ ] API calls use React Query with caching
- [ ] Critical resources are preloaded
- [ ] Bundle size is optimized (<500KB)
- [ ] Lighthouse score is >85
- [ ] No console errors in production
- [ ] Service worker is configured (optional)
- [ ] Analytics are set up

### Regular Maintenance:
- [ ] Monitor bundle size monthly
- [ ] Update dependencies quarterly
- [ ] Review and remove unused code
- [ ] Optimize new images before upload
- [ ] Check Core Web Vitals monthly
- [ ] Review API response times
- [ ] Test on slow 3G connection
- [ ] Test on low-end devices

---

## 🎯 Common Pitfalls to Avoid

### ❌ Don't:
- Load all images at once
- Make API calls on every render
- Use inline styles for animations
- Import entire icon libraries
- Ignore bundle size warnings
- Skip image optimization
- Use synchronous operations in loops
- Render large lists without virtualization

### ✅ Do:
- Use lazy loading for images
- Cache API responses
- Use CSS transitions
- Import specific icons
- Monitor bundle size
- Compress images
- Use async/await
- Implement virtual scrolling for 100+ items

---

## 📞 Need Help?

If performance issues persist:
1. Run Lighthouse audit in DevTools
2. Check Network tab for slow requests
3. Use Performance tab to find bottlenecks
4. Review console for warnings (dev mode)
5. Test on different devices and connections

**Remember: Premature optimization is the root of all evil. Optimize based on actual metrics!**
