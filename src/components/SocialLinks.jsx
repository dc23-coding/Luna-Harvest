
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Music, ExternalLink, Send, MessageCircle } from 'lucide-react';

const SocialLinks = ({ links, compact = false }) => {
  const iconMap = {
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    spotify: Music,
    telegram: Send,
    whatsapp: MessageCircle,
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  if (compact) {
    return (
      <div className="flex gap-4 justify-center">
        {links.map((link, index) => {
          const Icon = iconMap[link.platform] || ExternalLink;
          return (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
            >
              <Icon size={20} />
            </motion.a>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-purple-300">Connect</h3>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {links.map((link, index) => {
          const Icon = iconMap[link.platform] || ExternalLink;
          return (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 hover:bg-purple-900/40 transition-colors border border-purple-800/30"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="font-medium capitalize">{link.platform}</p>
                <p className="text-xs text-gray-400">{link.handle}</p>
              </div>
              <ExternalLink size={16} className="text-gray-400" />
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SocialLinks;
