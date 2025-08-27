import { useState } from 'react';

interface CarouselProps {
  images?: string[];
  captions?: string[];
}


export default function Carousel({ images = [] }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const captions = [
    "Add, edit, toggle, and delete feature flags", 
    "Create a new flag", 
    "Add rules and edit variants for a flag", 
    "View observability metrics for a single flag grouped by variant", 
    // "View flag specific metrics to see the impact of different variants",
    "Full page view for a single flag",
    "View backend observability metrics for your application grouped by flag",
    "View frontend observability metrics for your application grouped by flag",
    "Full page view of metrics for your application"
  ];

  const nextSlide = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getCurrentCaption = () => {
    return captions[currentIndex] || '';
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        LightFoot Features
      </h2>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 max-h-[40rem]">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <div key={index} className="w-full flex-shrink-0 flex justify-center items-center h-full">
                <img
                  src={src}
                  alt={captions[index] || `Slide ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg max-h-[40rem]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/80 text-gray-700 dark:text-black p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg border border-gray-200 dark:border-transparent z-10"
                aria-label="Previous image"
              >
                <span className="block w-6 h-6 relative">
                  <span className="absolute top-1/2 left-1/2 w-3 h-3 border-l-2 border-t-2 border-current -translate-x-1/3 -translate-y-1/2 rotate-[-45deg]"></span>
                </span>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/80 text-gray-700 dark:text-black p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg border border-gray-200 dark:border-transparent z-10"
                aria-label="Next image"
              >
                <span className="block w-6 h-6 relative">
                  <span className="absolute top-1/2 left-1/2 w-3 h-3 border-r-2 border-t-2 border-current -translate-x-2/3 -translate-y-1/2 rotate-45"></span>
                </span>
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 text-gray-700 dark:text-white px-2 py-1 rounded text-sm shadow-lg border border-gray-200 dark:border-transparent z-10">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {getCurrentCaption() && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 pt-8 z-10">
              <p className="text-white text-sm md:text-base text-center font-medium drop-shadow-lg">
                {getCurrentCaption()}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}