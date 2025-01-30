import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const clients = [
  { src: '/products/sub/deal/img1.png', name: 'Client 1' },
  { src: '/products/sub/deal/img2.png', name: 'Client 2' },
  { src: '/products/sub/deal/img3.png', name: 'Client 3' },
  { src: '/products/sub/deal/img4.png', name: 'Client 4' },
  { src: '/products/sub/deal/img5.svg', name: 'Client 5' },
  { src: '/products/sub/deal/img6.png', name: 'Client 6' },
  { src: '/products/sub/deal/img7.svg', name: 'Client 7' },
  { src: '/products/sub/deal/img8.png', name: 'Client 8' },
  { src: '/products/sub/deal/img9.svg', name: 'Client 9' },
  { src: '/products/sub/deal/img10.png', name: 'Client 10' },
  { src: '/products/sub/deal/img11.svg', name: 'Client 11' },
  { src: '/products/sub/deal/img12.svg', name: 'Client 12' },
  { src: '/products/sub/deal/img13.png', name: 'Client 13' },
  { src: '/products/sub/deal/img14.png', name: 'Client 14' },
  { src: '/products/sub/deal/img15.png', name: 'Client 15' },
  { src: '/products/sub/deal/img16.png', name: 'Client 16' },
  { src: '/products/sub/deal/img17.png', name: 'Client 17' },
];

export default function DealingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);


  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(clients.length / itemsPerSlide));
    }, 3000);

    return () => clearInterval(timer);
  }, [isMounted, itemsPerSlide]);

  if (!isMounted) {
    return null;
  }

  const getVisibleClients = () => {
    const visibleClients = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (currentIndex * itemsPerSlide + i) % clients.length;
      visibleClients.push(clients[index]);
    }
    return visibleClients;
  };

  const handlePrevClick = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? clients.length - itemsPerSlide : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => 
      (prev + 1) % (clients.length - itemsPerSlide + 1)
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      <div className="relative overflow-hidden">

      <button
          onClick={handlePrevClick}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 -ml-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 -mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <motion.div
          className="flex gap-4 transition-all"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${(0 / itemsPerSlide) * currentIndex}%)`,
          }}
        >
          {getVisibleClients().map((client, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center mx-auto"
              style={{
                width: `calc(${100 / itemsPerSlide}% - 1rem)`,
                maxWidth: '300px',
                aspectRatio: '1/1', // Maintain aspect ratio
              }}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={350}
                height={350}
                className="object-contain p-2"
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto' 
                }} // Ensure images don't overflow their container
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(clients.length / itemsPerSlide) }).map(
          (_, index) => (
            <button
              key={index}
              className={`lg:w-3 lg:h-3 h-2 w-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-[#BD7500]' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          )
        )}
      </div>
    </div>
  );
}