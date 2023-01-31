import { useSession } from 'next-auth/react';
import React,{ useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify';

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [songInfo, setSongInfo] = useState({} as any);
    const { data: session, status } = useSession();

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
                setSongInfo(data?.body?.item)
            })
        }
    }, [spotifyApi, session]);

    return songInfo;
}
export default useSongInfo
