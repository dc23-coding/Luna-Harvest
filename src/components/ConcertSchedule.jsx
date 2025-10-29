import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ConcertSchedule = ({ concerts }) => {
  const { toast } = useToast();

  const handleTickets = () => {
    toast({
      title: "🚧 This feature isn't implemented yet! 🚀"
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-purple-300">Upcoming Shows</h3>
      <div className="space-y-3">
        {concerts.map((concert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-800/30 hover:border-purple-600/50 transition-colors"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">{concert.venue}</h4>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={14} className="text-purple-400" />
                <span>{concert.date}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock size={14} className="text-purple-400" />
                <span>{concert.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={14} className="text-purple-400" />
                <span>{concert.location}</span>
              </div>

              <Button 
                onClick={handleTickets}
                className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              >
                Get Tickets
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConcertSchedule;