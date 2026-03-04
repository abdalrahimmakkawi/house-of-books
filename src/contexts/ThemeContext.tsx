import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Theme, AmbientSound } from '../types';

export const AMBIENT_SOUNDS: AmbientSound[] = [
  { id: 'none', name: 'None', url: '', icon: 'X' },
  { id: 'library', name: 'Ancient Library', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', icon: 'Book' },
  { id: 'forest', name: 'Nature Forest', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', icon: 'Trees' },
  { id: 'beach', name: 'Ocean Beach', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', icon: 'Waves' },
  { id: 'rain', name: 'Rainy Day', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', icon: 'CloudRain' },
];

const THEME_AUDIO_MAP: Record<Theme, string> = {
  classic: 'library',
  nature: 'forest',
  beach: 'beach',
  dark: 'none',
  light: 'none',
};

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
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audio.volume = ambientVolume;
  }, [ambientVolume]);

  useEffect(() => {
    const defaultAudio = THEME_AUDIO_MAP[theme];
    if (defaultAudio !== 'none') {
      playAmbient(defaultAudio);
    }
  }, [theme]);

  const playAmbient = (id: string) => {
    setActiveAmbient(id);

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;
    const sound = AMBIENT_SOUNDS.find(s => s.id === id);

    const loadNewAudio = () => {
      if (!sound || !sound.url) return;
      audio.src = sound.url;
      audio.load();
      audio.volume = ambientVolume;
      audio.play().catch(err => console.error('Error playing audio:', err));
    };

    if (sound && sound.url) {
      if (audio.src.includes(sound.url)) {
        if (audio.paused) audio.play().catch(err => console.error(err));
        return;
      }
      audio.pause();
      audio.currentTime = 0;
      loadNewAudio();
    } else if (id === 'none') {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      activeAmbient,
      setActiveAmbient,
      ambientVolume,
      setAmbientVolume,
      playAmbient,
    }}>
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