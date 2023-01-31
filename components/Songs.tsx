import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import { playlistState } from "../atoms/playlistAtom";
import Song, { SongProps } from "../components/Song";
import useSpotify from "../hooks/useSpotify";
import { useTrackSongs } from "../hooks/useTracks";

export interface SongsProps {
  tracks: SongProps[];
}

export const Songs = ({ tracks }: SongsProps) => {
  const [songs, setSongs] = useState([]);
  // const songTracks = tracks.map((track: any) => track.tracks)

  useEffect(() => {
    console.log('tracks======', tracks)
    const songTracks = tracks.map((track) => track.track);
    console.log("songTracks", songTracks);
    setSongs(songTracks);
  }, [tracks]);

  return (
    <div className="px-8 space-y-1 text-white flex-flex-col pb-28">
      {songs?.map((track: SongProps, i) => {
        return (
          <Song
            // key={track.track.id}
            order={i}
            id={track?.id}
            album={track?.album}
            name={track?.name}
            artists={track?.artists}
            duration_ms={track?.duration_ms}
            uri={track?.uri}
          />
        );
      })}
    </div>
  );
};

export default Songs;
