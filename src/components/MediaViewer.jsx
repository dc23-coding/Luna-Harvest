
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LivePlayer from '@/components/players/LivePlayer';
import VideoPlayer from '@/components/players/VideoPlayer';
import AudioPlayer from '@/components/players/AudioPlayer';
import SocialFeedPlayer from '@/components/players/SocialFeedPlayer';
import { Radio, Clapperboard, Music, AtSign } from 'lucide-react';

const MediaViewer = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-900/20 border border-purple-800/30">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Radio size={16} /> Live
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Clapperboard size={16} /> Videos
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center gap-2">
            <Music size={16} /> Music
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <AtSign size={16} /> Social
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="live">
            <LivePlayer />
          </TabsContent>
          <TabsContent value="videos">
            <VideoPlayer />
          </TabsContent>
          <TabsContent value="music">
            <AudioPlayer />
          </TabsContent>
          <TabsContent value="social">
            <SocialFeedPlayer />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MediaViewer;
