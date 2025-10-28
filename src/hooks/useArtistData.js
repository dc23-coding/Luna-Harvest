
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const allArtistsData = [
  {
    id: 'harvest-union',
    artistData: {
      name: 'Harvest Union',
      genre: 'Indie Folk',
      currentShow: 'Echoes of the Valley Tour',
      description: 'Join us for a journey through sound, story, and soul.',
      followers: '890K',
      location: 'Nashville, TN',
      bio: 'An eclectic group of musicians weaving tales of life, love, and the land. Known for rich harmonies and heartfelt lyrics.',
      socialLinks: [
        { platform: 'instagram', handle: '@harvestunion', url: 'https://instagram.com' },
        { platform: 'twitter', handle: '@harvestunion', url: 'https://twitter.com' },
        { platform: 'youtube', handle: 'Harvest Union', url: 'https://youtube.com' },
        { platform: 'spotify', handle: 'Harvest Union', url: 'https://spotify.com' },
        { platform: 'whatsapp', handle: 'Fan Updates', url: 'https://whatsapp.com' },
      ]
    },
    concerts: [
      { venue: 'Ryman Auditorium', date: 'Nov 15, 2025', time: '8:00 PM', location: 'Nashville, TN' },
      { venue: 'The Fillmore', date: 'Nov 22, 2025', time: '7:30 PM', location: 'San Francisco, CA' },
    ],
    videos: [
      { id: 1, title: 'Official Music Video - "Riverstone"', duration: '4:12' },
      { id: 2, title: 'Live at The Bluebird Cafe', duration: '28:45' },
    ],
    music: [
      { id: 1, title: 'Riverstone', artist: 'Harvest Union', album: 'Sun-Kissed Dirt', duration: '4:12' },
      { id: 2, title: 'Golden Hour', artist: 'Harvest Union', album: 'Sun-Kissed Dirt', duration: '3:58' },
    ],
    socialFeed: [
      { id: 1, caption: 'Soundcheck vibes in Nashville!', likes: '12.1k', comments: '402' },
      { id: 2, caption: 'On the road again!', likes: '10.4k', comments: '315' },
    ]
  },
  {
    id: 'nova-pulse',
    artistData: {
      name: 'Nova Pulse',
      genre: 'Synthwave Pop',
      currentShow: 'Neon Dreams Tour',
      description: 'Experience the retro-futuristic soundscape of Nova Pulse.',
      followers: '1.2M',
      location: 'Los Angeles, CA',
      bio: 'A solo artist blending 80s nostalgia with modern electronic beats, creating a sound that is both timeless and futuristic.',
      socialLinks: [
        { platform: 'instagram', handle: '@novapulse', url: 'https://instagram.com' },
        { platform: 'twitter', handle: '@novapulse', url: 'https://twitter.com' },
        { platform: 'youtube', handle: 'Nova Pulse', url: 'https://youtube.com' },
        { platform: 'telegram', handle: 'Nova Pulse Updates', url: 'https://telegram.org' },
      ]
    },
    concerts: [
      { venue: 'The Wiltern', date: 'Dec 1, 2025', time: '9:00 PM', location: 'Los Angeles, CA' },
      { venue: 'Brooklyn Steel', date: 'Dec 10, 2025', time: '8:30 PM', location: 'Brooklyn, NY' },
    ],
    videos: [
      { id: 1, title: 'Cybernetic Love - Official Video', duration: '3:45' },
      { id: 2, title: 'Live from Neon Dreams', duration: '45:10' },
    ],
    music: [
      { id: 1, title: 'Starlight Drive', artist: 'Nova Pulse', album: 'Digital Sunsets', duration: '4:30' },
      { id: 2, title: 'Grid Runner', artist: 'Nova Pulse', album: 'Digital Sunsets', duration: '3:55' },
    ],
    socialFeed: [
      { id: 1, caption: 'New synth arrived!', likes: '25.3k', comments: '1.2k' },
      { id: 2, caption: 'LA, you were electric!', likes: '18.9k', comments: '856' },
    ]
  }
];

export const useArtistData = () => {
  const { artistId } = useParams();
  
  const [data, setData] = useState({
    artists: allArtistsData.map(a => ({...a.artistData, id: a.id})),
    artistData: {},
    concerts: [],
    videos: [],
    music: [],
    socialFeed: [],
    isLoading: true,
  });

  useEffect(() => {
    try {
      if (artistId) {
        const artist = allArtistsData.find(a => a.id === artistId);
        if (artist) {
          setData({
            artists: allArtistsData.map(a => ({...a.artistData, id: a.id})),
            artistData: artist.artistData,
            concerts: artist.concerts,
            videos: artist.videos,
            music: artist.music,
            socialFeed: artist.socialFeed,
            isLoading: false
          });
        } else {
           setData(prev => ({ ...prev, isLoading: false }));
        }
      } else {
         setData(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error("Failed to load artist data", error);
      setData(prev => ({ ...prev, isLoading: false }));
    }
  }, [artistId]);

  return data;
};
