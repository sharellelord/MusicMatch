import React, { createContext, useState, ReactNode, useContext } from 'react';

interface FormData {
  playlistName: string;
  image: File | null;
  songs: string;
  tags: string;
}

interface PlaylistContextType {
  playlists: FormData[];
  addPlaylist: (playlist: FormData) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<FormData[]>([]);

  const addPlaylist = (playlist: FormData) => {
    setPlaylists((prev) => [...prev, playlist]);
  };

  return (
    <PlaylistContext.Provider value={{ playlists, addPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return context;
};
