import { useEffect, useRef } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import ValentineCard from '@/components/ValentineCard';

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      // Attempt autoplay (may be blocked by browser)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked - will play on first user interaction
          const handleInteraction = () => {
            audio.play();
            document.removeEventListener('click', handleInteraction);
          };
          document.addEventListener('click', handleInteraction);
        });
      }
    }
  }, []);

  return (
    <div className="valentine-bg">
      <audio ref={audioRef} src="/audio/background-music.mp3" loop />
      <FloatingHearts />
      <ValentineCard />
    </div>
  );
};

export default Index;
