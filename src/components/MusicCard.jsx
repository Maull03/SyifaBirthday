import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio playback failed: ', err);
        // Toggle state anyway so UI updates if user clicked
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '340px',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '0.85rem 1.15rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
        zIndex: 10,
        margin: '0 auto 1.5rem auto',
      }}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/Someone To Stay (Acoustic) by Vancouver.mp3"
        preload="metadata"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'var(--accent-pink-light)',
            color: 'var(--accent-pink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-pink)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-pink-light)';
            e.currentTarget.style.color = 'var(--accent-pink)';
          }}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
        </button>

        {/* Text Metadata */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            Someone To Stay (Acoustic)
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Vancouver
            {isPlaying && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  marginLeft: '6px',
                }}
              >
                <span className="bar" style={{ width: '2px', height: '8px', backgroundColor: 'var(--accent-pink)', display: 'inline-block', animation: 'music-bar 0.8s ease-in-out infinite alternate' }}></span>
                <span className="bar" style={{ width: '2px', height: '12px', backgroundColor: 'var(--accent-pink)', display: 'inline-block', animation: 'music-bar 0.6s ease-in-out infinite alternate 0.1s' }}></span>
                <span className="bar" style={{ width: '2px', height: '6px', backgroundColor: 'var(--accent-pink)', display: 'inline-block', animation: 'music-bar 0.9s ease-in-out infinite alternate 0.2s' }}></span>
              </span>
            )}
          </p>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          style={{
            border: 'none',
            background: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Progress Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            color: 'var(--text-secondary)',
            width: '28px',
            textAlign: 'left',
          }}
        >
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleProgressChange}
          style={{
            flex: 1,
            height: '4px',
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer',
            accentColor: 'var(--accent-pink)',
            WebkitAppearance: 'none',
            backgroundColor: '#f1e6da',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            color: 'var(--text-secondary)',
            width: '28px',
            textAlign: 'right',
          }}
        >
          {formatTime(duration)}
        </span>
      </div>

      {/* Styles for Music Bar Animation */}
      <style>{`
        @keyframes music-bar {
          0% { height: 3px; }
          100% { height: 12px; }
        }
        input[type="range"]::-webkit-slider-runnable-track {
          background: #f1e6da;
          height: 4px;
          border-radius: 2px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: var(--accent-pink);
          margin-top: -3px;
        }
      `}</style>
    </div>
  );
}
