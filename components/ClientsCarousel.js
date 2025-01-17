import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const clients = [
  { src: '/home/client/c1.png', name: 'Client 1' },
  { src: '/home/client/c2.png', name: 'Client 2' },
  { src: '/home/client/c3.png', name: 'Client 3' },
  { src: '/home/client/c4.png', name: 'Client 4' },
  { src: '/home/client/c5.png', name: 'Client 5' },
  { src: '/home/client/c6.png', name: 'Client 6' },
  { src: '/home/client/c7.png', name: 'Client 7' },
  { src: '/home/client/c8.png', name: 'Client 8' },
  { src: '/home/client/c9.png', name: 'Client 9' },
  { src: '/home/client/c10.png', name: 'Client 10' },
  { src: '/home/client/c11.png', name: 'Client 11' },
  { src: '/home/client/c12.png', name: 'Client 12' },
  { src: '/home/client/c13.png', name: 'Client 13' },
  { src: '/home/client/c14.png', name: 'Client 14' },
  { src: '/home/client/c15.png', name: 'Client 15' },



];

export default function ClientsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(4); // Default to desktop

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

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === Math.ceil(clients.length / itemsPerSlide) - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [isMounted, itemsPerSlide]);

  if (!isMounted) {
    return null; // Return null on server-side
  }

  return (
    <div className="w-full max-w-[95vw] mx-auto py-12 px-4">
      <div className="relative overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            className="flex justify-center gap-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {clients
              .slice(
                currentSlide * itemsPerSlide,
                (currentSlide + 1) * itemsPerSlide
              )
              .map((client, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg shadow-lg p-4 flex items-center justify-center"
                  style={{ 
                    width: `calc(${100 / itemsPerSlide}% - 1rem)`,
                    maxWidth: '300px'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={client.src}
                      alt={client.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(clients.length / itemsPerSlide) }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-[#BD7500]' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
} 