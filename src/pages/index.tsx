import Image from 'next/image'
import { Inter } from 'next/font/google'
import { signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  console.log("🚀 useSession", data);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm flex flex-col">
        <h1 className=" left-0 top-0 flex w-full justify-center from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:p-4 lg:dark:bg-zinc-800/30 text-5xl">
          I have logined
        </h1>
        <div className=" bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none border-solid border-2 rounded-md">
          <a
            className="cursor-pointer border-solid border-gray-400 border-1 p-3 w-28 text-center rounded-md"
            onClick={() => signOut()}
          >
            Logout
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>
    </main>
  );
}
