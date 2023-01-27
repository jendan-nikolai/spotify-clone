import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom'
import Song from '../components/Song'
import useSpotify from '../hooks/useSpotify';

function Songs() {
    const spotifyApi = useSpotify();

    const playlist = useRecoilValue(playlistState);

    useEffect(() => {
        console.log('Centerplaylist', playlist)

        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                // console.log('data', data);
            });
        }
    }, [playlist, spotifyApi]);
    return (
        <div className='px-8 space-y-1 text-white flex-flex-col pb-28'>
            {
                playlist?.tracks?.items?.map((track, i) => {
                    return (
                            <Song
                                key={track.track.id}
                                track={track}
                                order={i}
                            />
                    )
                })
            }
        </div >
    )
}

export default Songs
