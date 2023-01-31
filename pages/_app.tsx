import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <div className="flex overflow-hidden bg-black">
          {session?.user && <Sidebar />}
          <Component {...pageProps} />
        </div>
        {session?.user && <div className="sticky bottom-0">
          <Player />
        </div>}
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
