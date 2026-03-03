import { useState, useRef, useEffect } from 'react';

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }

    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const onError = (e: any) => {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = (url?: string) => {
    if (!audioRef.current) return;

    if (url) {
      console.log("Loading new audio source:", url.substring(0, 50) + "...");
      // If a new URL is provided, always load and play it
      if (audioRef.current.src !== url) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
      audioRef.current.play().catch(e => {
        console.error("Playback failed for new source:", e);
        setIsPlaying(false);
      });
      setIsPlaying(true);
      return;
    }

    if (!audioRef.current.src || audioRef.current.src === window.location.href) {
      console.warn("Toggle play called but no audio source is set.");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Playback failed for existing source:", e);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (percent: number) => {
    if (!audioRef.current) return;
    const time = (percent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(percent);
  };

  return { isPlaying, progress, duration, togglePlay, seek };
}
