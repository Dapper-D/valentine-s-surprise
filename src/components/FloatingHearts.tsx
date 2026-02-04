import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generatedHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      size: 16 + Math.random() * 24,
      duration: 12 + Math.random() * 8,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="floating-heart fill-current"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            width: heart.size,
            height: heart.size,
          }}
        />
      ))}
    </>
  );
};

export default FloatingHearts;
