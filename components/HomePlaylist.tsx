import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRecoilValue, useRecoilState } from 'recoil';
import { ChevronDownIcon, VariableIcon } from '@heroicons/react/outline';

import Category from './Category';
import CategoryCards from './CategoryCards';
import NavigationBar from './NavigationBar';
import useSpotify from '../hooks/useSpotify';
import useRecentlyPlayed from '../hooks/useRecentlyPlayed';
import useFeaturedPlaylist from '../hooks/useFeaturedPlaylist';
import {
  playlistIdState,
  playlistState,
  playlistIdHomeState,
} from '../atoms/playlistAtom';

function HomePlaylist() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      });
    }

    console.log('playli2222222222222222222stId', playlistId)
  }, [spotifyApi])

  return (
    <div className="flex-grow h-screen p-2 px-4 overflow-y-scroll scrollbar-hide" >
      <header className="absolute top-5 right-8">
        <div className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full opacity-90 hover:opacity-80 cursor:pointer"
        >
          <img
            className="w-6 h-6 rounded-full"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>
      <div>
        <h1 className='pt-8 pl-4 mb-4 text-3xl text-white'><strong>Good morning</strong></h1>
        <div className='grid gap-4 sm:grid-cols-3 grid-col-1 '>
          {playlists?.slice(0, 6).map(playlist =>
            <div>
              <Link href="/playlist" onClick={() => setPlaylistId(playlist.id)}>
                <CategoryCards
                  key={playlist.id}
                  imageUrl={playlist.images?.[0]?.url}
                  name={playlist.name}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-[0.1px] border-gray-900 mt-1" />

      <div className="flex flex-col space-x-1 ">
        <h2 className='pt-8 pl-4 mb-4 text-3xl text-white text-bold'>Made For Z</h2>
        <ul className='grid grid-flow-col gap-6' >
          {playlists?.map((item) => (
            <Link href={`/playlist`} onClick={() => setPlaylistId(item.id)}>
              <Category
                key={item.id}
                imageUrl={item?.images?.[0].url}
                label={item?.name}
                subLabel={item.description}
              />
            </Link>
          ))}
        </ul>
      </div>

      <hr className="border-t-[0.1px] border-gray-900 my-8" />
    </div>
  )
}

export default HomePlaylist

