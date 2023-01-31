import React from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { millisToMinutesAndSeconds } from "../libs/time";

export interface SongProps {
  order: number;
  id: any;
  album: any;
  name: string;
  artists: string;
  duration_ms: number;
  uri: string;
}

export const Song = ({
  order,
  id,
  album,
  name,
  artists,
  duration_ms,
  uri,
}: SongProps) => {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    if (id) {
      setCurrentTrackId(id);
      setIsPlaying(true);
      spotifyApi.play({
        uris: [uri],
      });
    }
  };

  return (
    <div
      className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4 rounded-lg cursor-pointer">
        <p>{order + 1}</p>
        <img className="w-10 h-10" src={album?.images[0].url} alt="" />
        <div>
          <p className="text-white truncate w-36 lg:w-64">{name}</p>
         {artists?.length && <p className="w-40">{artists[0]?.name}</p>}
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden w-40 md:inline">{album?.name}</p>
        <p>{millisToMinutesAndSeconds(duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
