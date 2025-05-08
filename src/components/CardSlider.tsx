// CardSlider.tsx - Bentley style with in-place expansion
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define TypeScript interfaces
interface CardData {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  actionText?: string;
  actionLink?: string;
}

interface CardSliderProps {
  cards: CardData[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [maxIndex, setMaxIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(300);
  const [expandedWidth, setExpandedWidth] = useState(800);
  
  // Slider refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle window resize and calculate visible slides
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Calculate slide width based on container width
      let newSlideWidth = 300;
      let newExpandedWidth = Math.min(800, width * 0.8);
      
      if (width < 640) {
        newSlideWidth = width * 0.8; // 80% of width on small screens
        newExpandedWidth = width * 0.9;
      } else if (width < 1024) {
        newSlideWidth = 280;
      } else {
        newSlideWidth = 300;
      }
      
      setSlideWidth(newSlideWidth);
      setExpandedWidth(newExpandedWidth);
      
      // Calculate max index
      const containerWidth = width * 0.9; // 90% of viewport
      const gapWidth = 24;
      const slidesPerView = Math.floor(containerWidth / (newSlideWidth + gapWidth));
      setMaxIndex(Math.max(0, cards.length - slidesPerView));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards.length]);
  
  // Handle card expansion
  const handleCardClick = (id: number | string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      
      // Find the index of the clicked card
      const cardIndex = cards.findIndex(card => card.id === id);
      if (cardIndex !== -1) {
        // Center the expanded card
        setCurrentIndex(Math.min(
          Math.max(0, cardIndex),
          maxIndex
        ));
      }
    }
  };
  
  // Navigate to specific index
  const navigate = (direction: 'prev' | 'next') => {
    if (expandedId !== null) {
      // If a card is expanded, navigate between expanded cards
      const currentExpandedIndex = cards.findIndex(card => card.id === expandedId);
      if (currentExpandedIndex !== -1) {
        let nextIndex;
        
        if (direction === 'prev' && currentExpandedIndex > 0) {
          nextIndex = currentExpandedIndex - 1;
        } else if (direction === 'next' && currentExpandedIndex < cards.length - 1) {
          nextIndex = currentExpandedIndex + 1;
        } else {
          // Can't navigate further in this direction while expanded
          return;
        }
        
        // Expand the next card
        setExpandedId(cards[nextIndex].id);
        setCurrentIndex(Math.min(nextIndex, maxIndex));
      }
    } else {
      // Normal navigation when no card is expanded
      if (direction === 'prev' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (direction === 'next' && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };
  
  // Create navigation indicators
  const createIndicators = () => {
    return (
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        <button
          className={`w-10 h-[2px] transition-all ${currentIndex === 0 ? 'bg-white' : 'bg-white/50'}`}
          onClick={() => setCurrentIndex(0)}
          aria-label="Go to first slide"
        />
        {maxIndex > 0 && (
          <button
            className={`w-10 h-[2px] transition-all ${currentIndex >= maxIndex ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setCurrentIndex(maxIndex)}
            aria-label="Go to last slide"
          />
        )}
      </div>
    );
  };
  
  // Calculate transform position for the slider
  const calculateTransform = () => {
    if (expandedId !== null) {
      // When a card is expanded, center it
      const expandedIndex = cards.findIndex(card => card.id === expandedId);
      if (expandedIndex !== -1) {
        // Get container width
        const containerWidth = window.innerWidth * 0.9; // 90% of viewport
        
        // Calculate position of the expanded card
        const cardPosition = expandedIndex * (slideWidth + 24); // 24px gap
        
        // Center the expanded card
        const cardCenterOffset = expandedWidth / 2;
        const containerCenter = containerWidth / 2;
        
        return containerCenter - (cardPosition + cardCenterOffset);
      }
    }
    
    // Normal slider transform
    return -currentIndex * (slideWidth + 24); // 24px gap
  };
  
  // Check if navigation buttons should be disabled
  const isPrevDisabled = expandedId
    ? cards.findIndex(card => card.id === expandedId) === 0
    : currentIndex === 0;
  
  const isNextDisabled = expandedId
    ? cards.findIndex(card => card.id === expandedId) === cards.length - 1
    : currentIndex >= maxIndex;
  
  return (
    <div className="w-[90%] relative mx-auto my-16" ref={containerRef}>
      {/* Main slider */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{ 
            x: calculateTransform()
          }}
          transition={{ 
            type: "tween", 
            ease: "easeInOut", 
            duration: 0.5 
          }}
          style={{ gap: '24px' }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="relative flex-shrink-0 cursor-pointer group"
              animate={{
                width: expandedId === card.id ? expandedWidth : slideWidth,
                zIndex: expandedId === card.id ? 10 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`h-[400px] relative overflow-hidden rounded-lg`}
                animate={{
                  height: expandedId === card.id ? 500 : 400
                }}
                onClick={() => handleCardClick(card.id)}
              >
                {/* Image with gradient overlay for unexpanded card */}
                {expandedId !== card.id && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                    
                    {card.image.startsWith('/') ? (
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-xl">{card.title}</span>
                      </div>
                    )}
                    
                    {/* Card content overlay */}
                    <div className="absolute bottom-0 left-0 p-6 text-white z-20">
                      <h2 className="text-3xl font-light mb-2">{card.title}</h2>
                      <p className="text-sm font-light opacity-90 leading-relaxed">{card.subtitle}</p>
                    </div>
                  </>
                )}
                
                {/* Expanded card view - Bentley style */}
                {expandedId === card.id && (
                  <div className="w-full h-full bg-white text-black flex flex-row">
                    {/* Left side - Image */}
                    <div className="w-2/5 h-full relative">
                      {card.image.startsWith('/') ? (
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-white text-xl">{card.title}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="w-3/5 p-6 flex flex-col relative">
                      <button 
                        className="absolute top-4 right-4 flex items-center text-gray-700 font-light"
                        onClick={() => setExpandedId(null)}
                      >
                        <span className="mr-1">×</span> CLOSE
                      </button>
                      
                      <h2 className="text-2xl font-light mb-4 text-gray-800 mt-6">{card.title}</h2>
                      
                      <div className="mb-8 font-light leading-relaxed text-gray-600 text-sm overflow-y-auto max-h-52">
                        <p>{card.description}</p>
                      </div>
                      
                      {card.actionText && (
                        <a 
                          href={card.actionLink || '#'} 
                          className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 mt-auto uppercase font-light text-xs tracking-wider"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                          {card.actionText}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Navigation indicators */}
        {createIndicators()}
        
        {/* Previous/Next buttons */}
        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white opacity-70 hover:opacity-100 disabled:opacity-30 z-10"
          onClick={() => navigate('prev')}
          disabled={isPrevDisabled}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 text-white opacity-70 hover:opacity-100 disabled:opacity-30 z-10"
          onClick={() => navigate('next')}
          disabled={isNextDisabled}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardSlider;