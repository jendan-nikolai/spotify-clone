import React from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

interface NavigationBarProps {
    children: React.ReactNode
}
function NavigationBar({ children }) {
    const { data: session, status } = useSession();

    return (
        <div className="flex flex-row justify-between w-full p-4 h-14">
            <div className="flex flex-row w-1/2 h-7">
                <Link href="/">
                    <div className="items-center w-8 h-8 p-2 m-1 bg-gray-800 rounded-full">
                        <svg role="img" height="16" width="16" aria-hidden="true" fill="white" class="Svg-sc-ytk21e-0 kcBZLg IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16" data-encore-id="icon">
                            <path d="M11.03.47a.75.75 0 010 1.06L4.56 8l6.47 6.47a.75.75 0 11-1.06 1.06L2.44 8 9.97.47a.75.75 0 011.06 0z"></path>
                        </svg>
                    </div>
                </Link>
                <button>
                    <Link href="/playlist">
                        <div className='w-8 h-8 p-2 m-1 bg-gray-800 rounded-full '>
                            <svg role="img" height="16" width="16" aria-hidden="true" fill="white" class="Svg-sc-ytk21e-0 kcBZLg IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16" data-encore-id="icon">
                                <path d="M4.97.47a.75.75 0 000 1.06L11.44 8l-6.47 6.47a.75.75 0 101.06 1.06L13.56 8 6.03.47a.75.75 0 00-1.06 0z"></path>
                            </svg>
                        </div>
                    </Link>
                </button>

            </div>
            <div className="flex flex-row-reverse items-center w-1/2 p-2 m-1 h-7">
                <div className="flex flex-row p-1 pr-2 space-x-3 bg-gray-800 rounded-full cursor-pointer opacity-90 hover:opacity-80">
                    <img
                        className="w-6 h-6 rounded-full"
                        src={session?.user?.image}
                        alt=""
                    />
                    <h2><strong>{session?.user.name}</strong></h2>
                    <ChevronDownIcon className="w-5 h-5" />
                </div>
            </div>
            <div>{children}</div>
        </div>
    )
}

export default NavigationBar
