
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArtistData } from '@/hooks/useArtistData';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const AudioPlayer = () => {
  const { music, isLoading } = useArtistData();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  }, [music]);
  
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, music]);


  const handleSkip = (direction) => {
    if (!music || music.length === 0) return;
    const newIndex = (currentTrackIndex + direction + music.length) % music.length;
    setCurrentTrackIndex(newIndex);
    setProgress(0);
  };
  
  if (isLoading) {
    return <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">Loading Music...</div>;
  }
  
  if (!music || music.length === 0) {
    return <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">No music available for this artist.</div>;
  }
  
  const currentTrack = music[currentTrackIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-6 flex flex-col justify-between glow-effect"
    >
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
          <img class="w-full h-full object-cover" alt={currentTrack.album} src="https://images.unsplash.com/photo-1617745279938-a1158a91d213" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">{currentTrack.title}</h3>
          <p className="text-md text-gray-300">{currentTrack.artist}</p>
          <p className="text-sm text-gray-400 mt-1">{currentTrack.album}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Slider value={[progress]} max={100} step={1} className="w-full" onValueChange={(value) => setProgress(value[0])} />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{`1:02`}</span>
          <span>{currentTrack.duration}</span>
        </div>
        <div className="flex items-center justify-center gap-6">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleSkip(-1)} className="p-2 rounded-full hover:bg-white/10">
            <SkipBack size={24} />
          </motion.button>
          <motion.button 
            onClick={() => setIsPlaying(!isPlaying)}
            whileTap={{ scale: 0.9 }} 
            className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleSkip(1)} className="p-2 rounded-full hover:bg-white/10">
            <SkipForward size={24} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
