/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playTrack = useCallback(
    async (track) => {
      const audio = audioRef.current;
      if (!audio || !track?.audioSrc) return;

      const isSame = currentTrack?.audioSrc === track.audioSrc;
      if (!isSame) {
        audio.src = track.audioSrc;
        audio.currentTime = 0;
        setCurrentTime(0);
        setDuration(0);
        setCurrentTrack(track);
      }

      try {
        await audio.play();
      } catch {
        // Autoplay restrictions or user gesture missing
      }
    },
    [currentTrack],
  );

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  const toggle = useCallback(
    async (track) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (track?.audioSrc) {
        const isSame = currentTrack?.audioSrc === track.audioSrc;
        if (isSame && isPlaying) {
          audio.pause();
          return;
        }
        await playTrack(track);
        return;
      }

      if (!currentTrack) return;
      if (isPlaying) audio.pause();
      else {
        try {
          await audio.play();
        } catch {
          // ignore
        }
      }
    },
    [currentTrack, isPlaying, playTrack],
  );

  const seek = useCallback((timeSec) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(timeSec) || 0;
    setCurrentTime(audio.currentTime || 0);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setCurrentTrack(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, []);

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      playTrack,
      toggle,
      pause,
      seek,
      stop,
    }),
    [
      currentTrack,
      currentTime,
      duration,
      isPlaying,
      pause,
      playTrack,
      seek,
      stop,
      toggle,
    ],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      {/* Hidden audio element managed by the provider */}
      <audio ref={audioRef} preload="metadata" className="hidden" />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return ctx;
}
