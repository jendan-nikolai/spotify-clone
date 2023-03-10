import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

import Songs from "../../components/Songs";
import useSpotify from "../../hooks/useSpotify";
import { useTrackSongs } from "../../hooks/useTracks";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-orange-500",
  "from-slate-500",
];

export interface TracksProps {
  tracksId: string;
}

function Tracks() {
  const router = useRouter();
  const spotifyApi = useSpotify();

  const id = router.query.tracksId as string;

  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [trackSongs] = useTrackSongs(id);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [colors]);

  useEffect(() => {
    if (id) {
      spotifyApi
        .getPlaylist(id)
        .then((data) => {
          setTracks(data?.body);
        })
        .catch((err) => console.log(err));
    }
  }, [spotifyApi, id]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full opacity-90 hover:opacity-80 cursor:pointer"
        >
          <img
            className="w-6 h-6 rounded-full"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>
      <section
        className={`flex items-end text-white space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}
      >
        <img
          className="shadow-2xl h-44 w-44"
          src={tracks?.images?.[0].url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {tracks?.name}
          </h1>
        </div>
      </section>
      <div className="">
        <Songs tracks={trackSongs} />
      </div>
    </div>
  );
}

export default Tracks;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
