import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

export const useTracks = () => {
  return [];
};

export const useTrackSongs = (id: string) => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [trackSongs, setTrackSongs] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (id) {
        spotifyApi.getPlaylistTracks(id).then((data: any) => {
          setTrackSongs(data.body.items);
        });
      }
    }
  }, [id, spotifyApi, session]);

  return [trackSongs];
};
