import Sidebar from "../components/Sidebar";
import HomePlaylist from "../components/HomePlaylist";
import Player from "../components/Player";
import Center from "../components/Center";
import { getSession } from "next-auth/react"
import HomePage from "../components/HomePage";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <HomePlaylist />
        {/* <Center /> */}
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}

