import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { shuffle } from 'lodash';

// data needed:
// -album title
// -artist
// songs, duration

function PlaylistCover() {
    return (
        <div className={`flex flex-col sm:flex-row justify-left items-end h-full text-white text-left space-x-7`}>
            <img aria-hidden="false" draggable="false" loading="lazy" src="https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1" alt="SOS" class="mMx2LUixlnN_Fu45JpFB CmkY1Ag0tJDfnFXbGgju _EShSNaBK1wUIaZQFJJQ Yn2Ei5QZn19gria6LjZj" srcset="https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1 150w, https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1 300w, https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1 320w, https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1 640w" sizes="(min-width: 1280px) 232px, 192px"
                className="w-48 h-48" />
            <div className='flex flex-col place-items-baseline font-family: var(--font-family,CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));'>
                <div>
                    <h2 class="font-semibold">Album</h2>
                    <h1 className="mt-2 mb-3 font-bold text-8xl">SOS</h1>
                </div>
                <div className="flex flex-row items-center">
                    <div className="flex flex-row space-x-1">
                        <img
                            className='object-cover rounded-full'
                        />
                        <p className='font-bold'>SZA</p>
                        <span class="Type__TypeElement-sc-goli3j-0 hGXzYa RANLXG3qKB61Bh33I0r2" data-encore-id="type" aria-expanded="false">• 2022</span>
                        <span class="Type__TypeElement-sc-goli3j-0 hGXzYa RANLXG3qKB61Bh33I0r2" data-encore-id="type">• 23 songs, <span class="UyzJidwrGk3awngSGIwv">1 hr 8 min</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistCover
