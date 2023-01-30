import React from 'react'
import Sidebar from "../components/Sidebar";
import HomePlaylist from "../components/HomePlaylist";
import Center from '../components/Center';
import Player from "../components/Player";

function playlists () {
  return (
    <div>
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
      
    </div>
  )
}

export default playlists
