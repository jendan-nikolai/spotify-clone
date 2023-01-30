import React from "react";

import Tracks from "./[tracksId]";
import Sidebar from "../../components/Sidebar";
import Player from "../../components/Player";

function TrackPlaylist() {
  return (
    <div>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          <Sidebar />
          <Tracks />
        </main>

        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </div>
  );
}

export default TrackPlaylist;
