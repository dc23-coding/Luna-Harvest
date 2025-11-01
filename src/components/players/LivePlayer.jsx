
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

const LivePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  // Listen for exit from fullscreen (e.g., by pressing Esc)
  React.useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <motion.div
      ref={playerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl overflow-hidden glow-effect"
    >
      {/* Video Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img class="w-full h-full object-cover" alt="Live concert performance on stage with dramatic lighting" src="https://images.unsplash.com/photo-1523525930602-e1239a31310b" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center hover:bg-purple-500 transition-colors"
            >
              <Play size={28} className="ml-1" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMute}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFullscreen}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Live Badge */}
      <div className="absolute top-4 left-4">
        <motion.div
          animate={{ opacity: isPlaying ? [1, 0.5, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1 bg-red-600 rounded-full text-xs font-bold flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-white rounded-full" />
          LIVE
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LivePlayer;
