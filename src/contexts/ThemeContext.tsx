import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Theme, AmbientSound } from '../types';

export const AMBIENT_SOUNDS: AmbientSound[] = [
  { id: 'none', name: 'None', url: '', icon: 'X' },
  { id: 'library', name: 'Ancient Library', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d1c4f9f9f8.mp3', icon: 'Book' },
  { id: 'forest', name: 'Nature Forest', url: 'https://cdn.pixabay.com/download/audio/2022/01/13/audio_3ab42a4a91.mp3', icon: 'Trees' },
  { id: 'beach', name: 'Ocean Beach', url: 'https://cdn.pixabay.com/download/audio/2022/02/15/audio_d8c5d6d5e1.mp3', icon: 'Waves' },
  { id: 'rain', name: 'Rainy Day', url: 'https://cdn.pixabay.com/download/audio/2022/02/24/audio_8f5b6c5e3d.mp3', icon: 'CloudRain' },
];

// Map themes to their default ambient sounds
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
  const [targetVolume, setTargetVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.crossOrigin = 'anonymous';
    }
  }, []);

  // Handle volume changes with fade transition
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const currentVolume = audio.volume;

    // Clear existing fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    // If muting, use quicker fade
    if (ambientVolume === 0 && currentVolume > 0) {
      const steps = 30;
      const stepTime = 300 / steps;
      const volumeStep = -currentVolume / steps;
      let step = 0;

      fadeIntervalRef.current = setInterval(() => {
        step++;
        audio.volume = Math.max(0, currentVolume + volumeStep * step);
        if (step >= steps) {
          audio.volume = 0;
          clearInterval(fadeIntervalRef.current!);
        }
      }, stepTime);
    } else {
      // Normal volume adjustment
      audio.volume = ambientVolume;
    }
  }, [ambientVolume]);

  // Auto-play theme-appropriate audio when theme changes
  useEffect(() => {
    const defaultAudio = THEME_AUDIO_MAP[theme];
    if (defaultAudio !== 'none' && activeAmbient === 'none') {
      // Auto-play the theme's default audio
      playAmbient(defaultAudio);
    }
  }, [theme]);

  const playAmbient = (id: string) => {
    console.log("playAmbient called with id:", id);
    setActiveAmbient(id);
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.crossOrigin = 'anonymous';
    }
    
    const audio = audioRef.current;
    const sound = AMBIENT_SOUNDS.find(s => s.id === id);

    // Define loadNewAudio BEFORE using it
    const loadNewAudio = () => {
      if (!sound || !sound.url) return;
      
      audio.src = sound.url;
      audio.load();
      
      audio.onerror = () => {
        console.error('Error loading audio:', sound.url);
      };
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Now playing:", sound.name);
            // Fade in
            audio.volume = 0;
            const targetVol = ambientVolume;
            const steps = 30;
            const stepTime = 500 / steps;
            const volumeStep = targetVol / steps;
            let step = 0;

            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
            }

            fadeIntervalRef.current = setInterval(() => {
              step++;
              audio.volume = Math.min(targetVol, volumeStep * step);
              if (step >= steps) {
                audio.volume = targetVol;
                clearInterval(fadeIntervalRef.current!);
              }
            }, stepTime);
          })
          .catch(err => {
            console.error('Error playing audio:', err);
          });
      }
    };

    if (sound && sound.url) {
      console.log("Switching ambient to:", sound.name, "URL:", sound.url);
      
      // If it's already playing this source, just ensure it's playing
      if (audio.src === sound.url) {
        if (audio.paused) {
          audio.play().catch(err => console.error('Error playing audio:', err));
        }
        return;
      }
      
      // Fade out current audio before switching
      if (!audio.paused && audio.volume > 0) {
        const currentVolume = audio.volume;
        const steps = 20;
        const stepTime = 200 / steps;
        const volumeStep = -currentVolume / steps;
        let step = 0;

        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }

        fadeIntervalRef.current = setInterval(() => {
          step++;
          audio.volume = Math.max(0, currentVolume + volumeStep * step);
          if (step >= steps) {
            audio.volume = 0;
            audio.pause();
            audio.currentTime = 0;
            loadNewAudio();
            clearInterval(fadeIntervalRef.current!);
          }
        }, stepTime);
      } else {
        loadNewAudio();
      }
    } else if (id === 'none') {
      // Stop playback with fade out
      if (!audio.paused && audio.volume > 0) {
        const currentVolume = audio.volume;
        const steps = 30;
        const stepTime = 300 / steps;
        const volumeStep = -currentVolume / steps;
        let step = 0;

        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }

        fadeIntervalRef.current = setInterval(() => {
          step++;
          audio.volume = Math.max(0, currentVolume + volumeStep * step);
          if (step >= steps) {
            audio.volume = 0;
            audio.pause();
            audio.currentTime = 0;
            console.log("Ambient sound stopped");
            clearInterval(fadeIntervalRef.current!);
          }
        }, stepTime);
      }
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    activeAmbient,
    setActiveAmbient,
    ambientVolume,
    setAmbientVolume,
    playAmbient,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
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