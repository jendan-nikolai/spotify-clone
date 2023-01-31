import { getSession } from "next-auth/react";

import Sidebar from "../components/Sidebar";
import HomePlaylist from "../components/HomePlaylist";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="flex overflow-auto">
        <HomePlaylist />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
