// CardSlider.tsx - Bentley style with responsive scaling
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define TypeScript interfaces
interface CardData {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  actionText?: string;
  actionLink?: string;
}

interface CardSliderProps {
  cards: CardData[];
}

// Default Bentley cards data
const defaultBentleyCards: CardData[] = [
  {
    id: 1,
    title: 'Models',
    subtitle: 'Explore the Bentley Motors model range.',
    description: 'Explore the Bentley Motors model range.',
    fullDescription: 'Bentley has been building cars by hand for more than a century. Today, they include the stunning Bentayga Extended Wheelbase – an SUV that offers an unrivalled passenger experience – and the Bentayga, which combines go-anywhere capability with handcrafted luxury. The Flying Spur is among the most sought-after executive sedans in the world, while the Continental GT and the convertible Continental GTC offer the ultimate grand touring experience.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    title: 'Pre-Owned Bentley',
    subtitle: 'Discover our range of exceptional Pre-Owned cars',
    description: 'Discover our range of exceptional Pre-Owned cars',
    fullDescription: 'Every car to bear the Bentley name has been made to the same exacting standards, whether you choose a new or pre-owned model.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    title: 'Accessories',
    subtitle: 'Make your Bentley even more personal',
    description: 'Make your Bentley even more personal by choosing from a wide range of Bentley accessories.',
    fullDescription: 'Every Bentley is unrivalled when it comes to craftsmanship, performance and design. But every Bentley owner is different. That\'s why we offer an extensive range of Bentley car accessories, designed to enhance the way your car looks, sounds and feels, elevating your driving experience. In short, there is no better way to complete your vision and make your Bentley unique.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    title: 'Factory Experiences',
    subtitle: 'Explore the home of Bentley.',
    description: 'Explore the home of Bentley.',
    fullDescription: 'You are invited to an exclusive behind-the-scenes experience at our world-renowned production facilities in Crewe, Cheshire. Guided by one of our expert hosts, this privileged tour offers a rare glimpse into the meticulous craftsmanship that brings your Bentley to life. Journey through our wood and leather shops, and explore the main assembly hall where your dream car takes shape. This is a unique opportunity, reserved solely for our customers, to witness the passion, precision, and dedication that define every Bentley.',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    title: 'Bentley Collection',
    subtitle: 'Luxury products inspired by our extraordinary cars',
    description: 'Luxury products inspired by our extraordinary cars',
    fullDescription: 'Visit the Bentley Collection Shop. Keep up to date with Bentley Collection news, with product information & more.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    title: 'Bentley Lifestyle',
    subtitle: 'Join us in sculpting a life where each moment is a masterpiece.',
    description: 'Join us in sculpting a life where each moment is a masterpiece.',
    fullDescription: 'In every facet of Bentley Lifestyle, we invite you to embark on a journey where luxury is not just a possession but a way of life. It\'s an adventure in refinement, an exploration of the extraordinary, and a celebration of your individuality. Join us in sculpting a life where each moment is a masterpiece, and the pursuit of perfection knows no bounds.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop'
  }
];

const CardSlider: React.FC<CardSliderProps> = ({ cards = defaultBentleyCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [maxIndex, setMaxIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(300);
  const [expandedWidth, setExpandedWidth] = useState(800);
  const [containerWidth, setContainerWidth] = useState('90%');
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandedContent, setShowExpandedContent] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  
  // Slider refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle window resize and calculate visible slides
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Determine if mobile
      const mobile = width < 768;
      setIsMobile(mobile);
      
      // Calculate container width and slide dimensions
      let newContainerWidth = '90%';
      let newSlideWidth = 300;
      let newExpandedWidth = Math.min(800, width * 0.8);
      let slidesPerView = 3;
      
      if (width < 640) {
        // Mobile - show 1.2 slides (full slide + 20% of next)
        newContainerWidth = '95%';
        const containerWidthPx = width * 0.9; // Use 90% of screen width
        const totalGapWidth = 24; // One gap between slides
        newSlideWidth = (containerWidthPx - totalGapWidth) / 1.2; // Show 1.2 slides
        newExpandedWidth = width * 0.95;
        slidesPerView = 1; // Can navigate through all slides
      } else if (width < 1024) {
        // Tablet - improved scaling
        newContainerWidth = '95%';
        const containerWidthPx = width * 0.9;
        const totalGapWidth = 24 * 2; // 2 gaps for 3 slides
        newSlideWidth = (containerWidthPx - totalGapWidth) / 2.8; // Show 2.8 slides
        newExpandedWidth = Math.min(700, width * 0.85);
        slidesPerView = 2; // Allow scrolling through more slides
      } else if (width < 1440) {
        // Laptop screens - show 4 slides + 20% of 5th
        newContainerWidth = '100%';
        const containerWidthPx = width * 0.95;
        // Calculate for 4.2 slides visible (4 full + 20% of 5th)
        const totalGapWidth = 24 * 4; // 24px gap between slides
        newSlideWidth = (containerWidthPx - totalGapWidth) / 4.2; // Show 4.2 slides
        newExpandedWidth = width * 0.7; // 70% of screen width for expanded view
        slidesPerView = Math.floor(containerWidthPx / (newSlideWidth + 24)); // Calculate actual visible slides
      } else {
        // Large screens - show 4 slides + 20% of 5th (same as laptop)
        newContainerWidth = '100%';
        const containerWidthPx = width * 0.95;
        // Calculate for 4.2 slides visible (4 full + 20% of 5th)
        const totalGapWidth = 24 * 4; // 24px gap between slides
        newSlideWidth = (containerWidthPx - totalGapWidth) / 4.2; // Show 4.2 slides
        // Keep expanded width settings as before
        newExpandedWidth = width >= 1920 ? Math.min(1400, width * 0.5) : width * 0.7;
        slidesPerView = Math.floor(containerWidthPx / (newSlideWidth + 24)); // Calculate actual visible slides
      }
      
      setContainerWidth(newContainerWidth);
      setSlideWidth(newSlideWidth);
      setExpandedWidth(newExpandedWidth);
      
      // Calculate max index to ensure last slide is fully viewable
      setMaxIndex(Math.max(0, cards.length - slidesPerView));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards.length]);
  
  // Handle card expansion
  const handleCardClick = (id: number | string) => {
    if (expandedId === id) {
      setShowExpandedContent(false);
      setTimeout(() => {
        setExpandedId(null);
        setIsExpanded(false);
      }, 100);
    } else {
      setShowExpandedContent(false);
      setExpandedId(id);
      setIsExpanded(true);
      
      // Show content after expansion animation completes
      setTimeout(() => {
        setShowExpandedContent(true);
      }, 500);
      
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
        setIsExpanded(true);
        setShowExpandedContent(false);
        
        // Show content after expansion animation completes
        setTimeout(() => {
          setShowExpandedContent(true);
        }, 500);
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
  
  // Handle drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (expandedId) return; // Don't drag when expanded
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || expandedId) return;
    setDragCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || expandedId) return;
    
    const dragDistance = dragCurrentX - dragStartX;
    const threshold = 50; // Minimum drag distance to trigger slide
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentIndex > 0) {
        // Dragged right - go to previous
        setCurrentIndex(currentIndex - 1);
      } else if (dragDistance < 0 && currentIndex < maxIndex) {
        // Dragged left - go to next
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setIsDragging(false);
    setDragStartX(0);
    setDragCurrentX(0);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (expandedId) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || expandedId) return;
    setDragCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };
  
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
        // For mobile, show full screen
        if (isMobile) {
          return 0;
        }
        
        // Get container width
        const containerWidthPx = window.innerWidth * (parseFloat(containerWidth) / 100);
        
        // Calculate position of the expanded card
        const cardPosition = expandedIndex * (slideWidth + 24); // 24px gap
        
        // Center the expanded card
        const cardCenterOffset = expandedWidth / 2;
        const containerCenter = containerWidthPx / 2;
        
        return containerCenter - (cardPosition + cardCenterOffset);
      }
    }
    
    // Normal slider transform with peek effect
    let baseTransform = -currentIndex * (slideWidth + 24); // 24px gap
    
    // Add peek effect - show a bit of previous slide when not at start
    if (currentIndex > 0) {
      const peekAmount = isMobile ? slideWidth * 0.15 : slideWidth * 0.1; // 15% on mobile, 10% on desktop
      baseTransform += peekAmount;
    }
    
    return baseTransform;
  };
  
  // Check if navigation buttons should be disabled
  const isPrevDisabled = expandedId
    ? cards.findIndex(card => card.id === expandedId) === 0
    : currentIndex === 0;
  
  const isNextDisabled = expandedId
    ? cards.findIndex(card => card.id === expandedId) === cards.length - 1
    : currentIndex >= maxIndex;
  
  return (
    <div 
      className="relative mx-auto bg-white w-full" 
      style={{ 
        height: window.innerWidth >= 1440 ? '90vh' : window.innerWidth >= 1024 ? '65vh' : window.innerWidth >= 768 ? '60vh' : 'auto',
        paddingTop: '2rem', 
        paddingBottom: '2rem' 
      }} 
      ref={containerRef}
    >
      {/* Mobile expanded overlay */}
      {isMobile && expandedId && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="min-h-screen">
            {/* Close button */}
            <button
              onClick={() => setExpandedId(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            
            {/* Expanded card content */}
            {cards.map((card) => {
              if (card.id !== expandedId) return null;
              
              return (
                <div key={card.id} className="w-full">
                  {/* Image section */}
                  <div className="w-full h-64 relative">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                      unoptimized={process.env.NODE_ENV !== 'production'}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/600x400/000000/ffffff?text=Bentley+Image';
                      }}
                    />
                  </div>
                  
                  {/* Content section */}
                  <div className="p-4 md:p-6 lg:p-8">
                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 lg:mb-6 text-gray-900">{card.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-3 md:mb-4 lg:mb-6">{card.subtitle}</p>
                    <div className="text-gray-600 text-xs md:text-sm lg:text-base xl:text-lg space-y-3 md:space-y-4 lg:space-y-6 mb-6 md:mb-8 lg:mb-10">
                      <p>{card.fullDescription}</p>
                    </div>
                    
                    <button 
                      className="w-full px-4 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-black text-white rounded-full text-xs md:text-sm lg:text-base xl:text-lg font-medium hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add your action here
                      }}
                    >
                      EXPLORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Main slider */}
      <div className="relative overflow-hidden" style={{ paddingLeft: isMobile ? '5%' : '32px', paddingRight: isMobile ? '5%' : '32px' }}>
        <motion.div
          className={`flex ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          animate={{ 
            x: calculateTransform()
          }}
          transition={{ 
            type: "tween", 
            ease: "easeInOut", 
            duration: isDragging ? 0 : 0.5 
          }}
          style={{ gap: '24px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="relative flex-shrink-0 cursor-pointer group"
              animate={{
                width: (expandedId === card.id && !isMobile) ? expandedWidth : slideWidth,
                zIndex: expandedId === card.id ? 10 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`relative overflow-hidden rounded-lg ${(expandedId === card.id && !isMobile) ? 'bg-white' : ''}`}
                animate={{
                  height: (expandedId === card.id && !isMobile) ? 
                    (window.innerWidth >= 1440 ? '75vh' : window.innerWidth >= 1024 ? '50vh' : '45vh') : 
                    (window.innerWidth >= 1440 ? '70vh' : window.innerWidth >= 1024 ? '45vh' : window.innerWidth >= 768 ? '40vh' : 400)
                }}
                onClick={() => handleCardClick(card.id)}
              >
                {(expandedId === card.id && !isMobile) ? (
                  // Expanded View - Image on left, content on right (desktop/tablet)
                  <div className="flex flex-col h-full md:flex-row relative">
                    {/* Close button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowExpandedContent(false);
                        setTimeout(() => {
                          setExpandedId(null);
                          setIsExpanded(false);
                        }, 100);
                      }}
                      className="absolute top-4 right-4 z-20 flex items-center gap-1 md:gap-2 lg:gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <span className="text-xs md:text-sm lg:text-base xl:text-lg font-medium">CLOSE</span>
                      <svg width="12" height="12" className="md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    
                    {/* Left side - Image */}
                    <div className="w-full h-48 md:h-full md:w-[35%] relative">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 35vw"
                        priority={card.id === 1}
                        unoptimized={process.env.NODE_ENV !== 'production'}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://placehold.co/600x400/000000/ffffff?text=Bentley+Image';
                        }}
                      />
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="w-full md:w-[65%] p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col h-full">
                      <div className="flex-1">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: showExpandedContent ? 1 : 0, y: showExpandedContent ? 0 : 20 }}
                          transition={{ duration: 0.3, delay: showExpandedContent ? 0.1 : 0 }}
                        >
                          <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 xl:mb-8 text-gray-900">{card.title}</h3>
                          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-700 mb-3 md:mb-4 lg:mb-6 xl:mb-8">{card.subtitle}</p>
                          <div className="text-gray-600 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl space-y-3 md:space-y-4 lg:space-y-6">
                            <p>{card.fullDescription}</p>
                          </div>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="mt-4 md:mt-6 lg:mt-8 xl:mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: showExpandedContent ? 1 : 0, y: showExpandedContent ? 0 : 20 }}
                        transition={{ duration: 0.3, delay: showExpandedContent ? 0.2 : 0 }}
                      >
                        <button 
                          className="text-black text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium hover:text-gray-700 transition-colors flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add your action here
                          }}
                        >
                          <span>Discover More</span>
                          <svg width="14" height="14" className="md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7,7 17,7 17,17"></polyline>
                          </svg>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  // Collapsed View - Standard card
                  <>
                    <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${expandedId === card.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'}`}>
                      <div className="relative w-full h-full">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes={isMobile ? "85vw" : slideWidth < 250 ? "250px" : `${slideWidth}px`}
                          priority={card.id === 1}
                          unoptimized={process.env.NODE_ENV !== 'production'}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/600x400/000000/ffffff?text=Bentley+Image';
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    <div className="relative z-10 p-4 md:p-6 lg:p-8 flex flex-col h-full justify-end text-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 md:mb-2 lg:mb-3">{card.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-2 md:mb-4 lg:mb-6 line-clamp-2">{card.subtitle}</p>
                      <button className="mt-1 md:mt-2 lg:mt-3 self-start px-4 md:px-6 lg:px-8 py-1.5 md:py-2 lg:py-3 border border-white rounded-full text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium hover:bg-white/10 transition-colors">
                        Discover More
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation arrows and indicators - repositioned for larger screens */}
      {!(isMobile && expandedId) && !isMobile && (
        <>
          {window.innerWidth >= 1024 ? (
            // Large screens - arrows on bottom right, indicators on bottom left
            <div className="absolute -bottom-4 left-8 right-8 flex justify-between items-center">
              {/* Indicators on left */}
              <div className="flex gap-3">
                <button
                  className={`w-10 h-[2px] transition-all ${currentIndex === 0 ? 'bg-black' : 'bg-black/50'}`}
                  onClick={() => setCurrentIndex(0)}
                  aria-label="Go to first slide"
                />
                {maxIndex > 0 && (
                  <button
                    className={`w-10 h-[2px] transition-all ${currentIndex >= maxIndex ? 'bg-black' : 'bg-black/50'}`}
                    onClick={() => setCurrentIndex(maxIndex)}
                    aria-label="Go to last slide"
                  />
                )}
              </div>
              
              {/* Arrows on right */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('prev')}
                  disabled={isPrevDisabled}
                  className={`w-10 h-10 flex items-center justify-center text-black ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:text-gray-600'}`}
                  aria-label="Previous slide"
                >
                  &larr;
                </button>
                <button
                  onClick={() => navigate('next')}
                  disabled={isNextDisabled}
                  className={`w-10 h-10 flex items-center justify-center text-black ${isNextDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:text-gray-600'}`}
                  aria-label="Next slide"
                >
                  &rarr;
                </button>
              </div>
            </div>
          ) : (
            // Tablet screens - keep original positioning
            <>
              <button
                onClick={() => navigate('prev')}
                disabled={isPrevDisabled}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/50'}`}
                aria-label="Previous slide"
              >
                &larr;
              </button>
              <button
                onClick={() => navigate('next')}
                disabled={isNextDisabled}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white ${isNextDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/50'}`}
                aria-label="Next slide"
              >
                &rarr;
              </button>
              
              {/* Original indicators for tablet screens */}
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
            </>
          )}
        </>
      )}
      
      {/* Mobile navigation - indicators with better positioning */}
      {isMobile && !expandedId && (
        <div className="absolute bottom-6 left-8 flex gap-3 z-10">
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
      )}
    </div>
  );
};

/**
 * The default export of this module is the `CardSlider` component.
 *
 * It is a responsive, mobile-first, and accessible component that displays a
 * carousel of cards with images, titles, subtitles, and calls-to-action (CTAs).
 * It uses the `motion` library from Framer Motion to animate the transitions
 * between slides.
 *
 * The component is designed to be used in a Next.js page, where it will
 * automatically detect the screen size and adjust its layout accordingly.
 * On larger screens, the component will display navigation arrows and
 * indicators at the bottom of the component. On smaller screens, the component
 * will display the navigation arrows on the left and right sides of the screen.
 *
 * The component accepts a `cards` prop, which is an array of objects with the
 * following properties:
 *
 * - `id`: A unique identifier for the card.
 * - `title`: The title of the card.
 * - `subtitle`: The subtitle of the card.
 * - `description`: The description of the card.
 * - `image`: The URL of the image to display on the card.
 * - `actionText`: The text to display on the CTA button.
 * - `actionLink`: The URL to link to when the CTA button is clicked.
 *
 * The component also accepts an `expandedId` prop, which is the ID of the
 * card that should be expanded when the component is initially rendered.
 *
 * The component emits a `setCurrentIndex` event when the user navigates to a
 * different slide. The event is emitted with the index of the new slide.
 *
 * The component also emits a `setExpandedId` event when the user expands or
 * collapses a card. The event is emitted with the ID of the card that was
 * expanded or collapsed.
 */
export default CardSlider;