
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArtistData } from '@/hooks/useArtistData';
import { Play } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VideoPlayer = () => {
  const { videos, isLoading } = useArtistData();
  const [mainVideo, setMainVideo] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (videos && videos.length > 0) {
      setMainVideo(videos[0]);
    }
  }, [videos]);

  const handlePlay = () => {
    toast({
      title: "🚧 This feature isn't implemented yet ! 🚀"
    });
  };

  if (isLoading) {
    return <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">Loading Videos...</div>;
  }
  
  if (!mainVideo) {
    return <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">No videos available for this artist.</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col lg:flex-row gap-4"
    >
      <div className="flex-grow lg:w-2/3">
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden glow-effect">
          <img class="w-full h-full object-cover" alt={mainVideo.title} src="https://images.unsplash.com/photo-1579623003002-841f9dee24d0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={handlePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center"
            >
              <Play size={28} className="ml-1" />
            </motion.button>
          </div>
          <div className="absolute bottom-4 left-4">
            <h3 className="font-bold text-lg">{mainVideo.title}</h3>
            <p className="text-sm text-gray-300">{mainVideo.duration}</p>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 max-h-[50vh] lg:max-h-[calc((9/16)*66.66vw)] overflow-y-auto space-y-2 pr-2">
        {videos.map((video) => (
          <div 
            key={video.id}
            onClick={() => setMainVideo(video)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${mainVideo.id === video.id ? 'bg-purple-900/50' : 'hover:bg-purple-900/20'}`}
          >
            <div className="w-24 h-14 relative rounded-md overflow-hidden flex-shrink-0">
              <img class="w-full h-full object-cover" alt={video.title} src="https://images.unsplash.com/photo-1579623003002-841f9dee24d0" />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </div>
            <p className="text-sm font-medium">{video.title}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
