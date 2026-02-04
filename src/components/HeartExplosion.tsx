import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  tx: number;
  ty: number;
  rotation: number;
  color: string;
  delay: number;
}

const HeartExplosion = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(350, 80%, 60%)',
      'hsl(350, 70%, 70%)',
      'hsl(340, 75%, 55%)',
      'hsl(40, 80%, 55%)',
      'hsl(350, 85%, 75%)',
    ];

    const generateParticles = () => {
      const newParticles: HeartParticle[] = [];
      
      for (let wave = 0; wave < 3; wave++) {
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2;
          const distance = 200 + Math.random() * 300;
          
          newParticles.push({
            id: wave * 30 + i,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            size: 16 + Math.random() * 32,
            tx: Math.cos(angle) * distance,
            ty: Math.sin(angle) * distance - 100,
            rotation: Math.random() * 720 - 360,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: wave * 0.3,
          });
        }
      }
      
      setParticles(newParticles);
    };

    generateParticles();
    
    const interval = setInterval(generateParticles, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <Heart
          key={particle.id}
          className="heart-particle fill-current"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            color: particle.color,
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
            '--rotation': `${particle.rotation}deg`,
            animationDelay: `${particle.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default HeartExplosion;
