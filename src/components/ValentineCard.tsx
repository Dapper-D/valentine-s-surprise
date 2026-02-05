import { useState, useRef, useEffect, useCallback } from 'react';
import valentineImage from '@/assets/valentine-love.png';
import HeartExplosion from './HeartExplosion';
import { useIsMobile } from '@/hooks/use-mobile';

const ValentineCard = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isBouncing, setIsBouncing] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 20;
    const maxY = 100;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPosition({ x: newX, y: newY });
  }, []);

  useEffect(() => {
    if (isMobile && !accepted) {
      setIsBouncing(true);
    }
  }, [isMobile, accepted]);

  const handleNoHover = () => {
    if (!isMobile) {
      moveNoButton();
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen p-4"
    >
      {accepted && <HeartExplosion />}
      
      <div className="valentine-card p-8 md:p-12 max-w-md w-full text-center pulse-glow">
        <div className="mb-6 overflow-hidden rounded-2xl">
          <img 
            src={valentineImage} 
            alt="Valentine's Love" 
            className="w-full h-auto object-cover"
          />
        </div>

        {!accepted ? (
          <>
            <h2 className="valentine-title text-2xl md:text-3xl lg:text-4xl mb-8">
            Patricia Pena Ponce de Leon
            </h2>
            <h3 className="valentine-title text-xl md:text-3xl lg:text-3xl mb-8">
              Will you be my Valentine?
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-[120px]">
              <button 
                onClick={handleYesClick}
                className="btn-yes z-10"
              >
                Yes! 💕
              </button>

              <button
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
                onClick={isMobile ? undefined : handleNoHover}
                onTouchStart={isMobile ? undefined : handleNoHover}
                className={`btn-no ${isBouncing ? 'bounce-animation' : ''}`}
                style={{
                  position: 'relative',
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  transition: isMobile ? 'none' : 'transform 0.2s ease-out',
                }}
              >
                No 😢
              </button>
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            <h1 className="celebration-text text-4xl md:text-5xl lg:text-6xl mb-4">
              Yay! 🎉💖
            </h1>
            <p className="valentine-title text-2xl md:text-3xl mt-6">
              Dinner at 10 PM
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mt-2 font-medium">
              Dress Fancy ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineCard;
