import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Theme, AmbientSound } from '../types';

export const AMBIENT_SOUNDS: AmbientSound[] = [
  { id: 'none', name: 'None', url: '', icon: 'X' },
  { id: 'library', name: 'Ancient Library', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', icon: 'Book' },
  { id: 'forest', name: 'Nature Forest', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', icon: 'Trees' },
  { id: 'beach', name: 'Ocean Beach', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', icon: 'Waves' },
  { id: 'rain', name: 'Rainy Day', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', icon: 'CloudRain' },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  activeAmbient: string;
  setActiveAmbient: (id: string) => void;
  ambientVolume: number;
  setAmbientVolume: (vol: number) => void;
  playAmbient: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'light';
  });

  const [activeAmbient, setActiveAmbient] = useState('none');
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'classic', 'nature', 'beach');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    
    const audio = audioRef.current;
    audio.volume = ambientVolume;
  }, [ambientVolume]);

  const playAmbient = (id: string) => {
    console.log("playAmbient called with id:", id);
    setActiveAmbient(id);
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    
    const audio = audioRef.current;
    const sound = AMBIENT_SOUNDS.find(s => s.id === id);

    const safePlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          // Ignore AbortError (interrupted by pause) and NotAllowedError (autoplay policy)
          if (e.name !== 'NotAllowedError' && e.name !== 'AbortError') {
            console.error("Ambient playback failed:", e.message);
          }
        });
      }
    };

    if (sound && sound.url) {
      console.log("Switching ambient to:", sound.name, "URL:", sound.url);
      
      // If it's already playing this source, just ensure it's playing
      if (audio.src === sound.url) {
        if (audio.paused) {
          safePlay();
        }
        return;
      }

      // Stop current
      audio.pause();
      
      // Set new source
      audio.src = sound.url;
      audio.load();
      audio.volume = ambientVolume;

      // Play with a slight delay to ensure the source is loaded
      setTimeout(() => {
        if (audio.src === sound.url) {
          safePlay();
        }
      }, 100);
    } else {
      console.log("Pausing ambient audio");
      audio.pause();
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeAmbient, setActiveAmbient, ambientVolume, setAmbientVolume, playAmbient }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}