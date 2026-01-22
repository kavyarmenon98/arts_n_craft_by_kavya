import { useState } from "react";
import { useRef } from "react";

/**
 * OptimizedImage Component
 * Uses native lazy loading with a blur-up effect/placeholder
 */
function OptimizedImage({
    src,
    alt,
    className = "",
    style = {},
    placeholderColor = "#1a1a1a",
    priority = false, // If true, eager load
    onLoad,
    onError
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef(null);

    // We can use framer-motion's useInView or just rely on native loading="lazy"
    // Native is better for performance usually.

    const handleLoad = (e) => {
        setIsLoaded(true);
        if (onLoad) onLoad(e);
    };

    const handleError = (e) => {
        setHasError(true);
        setIsLoaded(true); // Stop loading animation
        if (onError) onError(e);
    };

    if (!src) {
        return (
            <div
                className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
                style={style}
            >
                <div className="text-center p-4">
                    <p className="text-xs text-gray-500">No Image</p>
                </div>
            </div>
        );
    }

    if (hasError) {
        return (
            <div
                className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
                style={style}
            >
                <div className="text-center p-4">
                    <svg
                        className="w-12 h-12 mx-auto mb-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-xs text-gray-500">Image unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={style}>
            {/* Placeholder / Loader */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 z-10 animate-pulse"
                    style={{ backgroundColor: placeholderColor }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    {/* Loading spinner */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={style}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
}

export default OptimizedImage;
