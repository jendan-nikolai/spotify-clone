import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { debounce } from "lodash";
import {
    HeartIcon,
    VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
    PlayIcon,
    PauseIcon,
    ReplyIcon,
    RewindIcon,
    VolumeUpIcon,
    FastForwardIcon,
    SwitchHorizontalIcon,
} from '@heroicons/react/solid'

import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';


function Player() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentIdTrack(data.body?.item?.id);
                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false)
            } else {
                spotifyApi.play();
                setIsPlaying(true)
            }
        });
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }

    }, [currentTrackIdState, spotifyApi, session])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {});
        }, 500),
        []
    );

    return (
        <div className="grid h-24 grid-cols-3 px-2 text-xs text-white bg-gradient-to-b from-black to-gray-900 md:text-base md:px-8">
            {/* Left */}
            <div className="flex items-center space-x-4">
                <img
                    className="hidden w-10 h-10 md:inline"
                    src={songInfo?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    // onClick={() => spotifyApi.skipToPrevious()} -- The API is not working
                    className="button"
                />

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="w-10 h-10 button" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="w-10 h-10 button" />
                )}

                <FastForwardIcon
                    // onClick={() => spotifyApi.skipToNext()} -- The API is not working
                    className="button"
                />
                <ReplyIcon className="button" />
            </div>

            {/* Right */}
            <div className="flex items-center justify-end pr-5 space-x-3 md:space-x-4">
                <VolumeDownIcon
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className="button"
                />
                <input
                    className="w-14 md:w-28"
                    type="range"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    min={0}
                    max={100}
                />
                <VolumeUpIcon
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className="button"
                />
            </div>
        </div>
    )
}

export default Player
