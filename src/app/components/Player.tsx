"use client"
//import './LoaderImcyc.jsx'
import Plyr from 'plyr'
import Script from 'next/script';

type PlayerProps = {
  videoId?: string;
};

export default function Player({ videoId = 'bTqVqk7FSmY' }: PlayerProps) {
  return (
      <div className='player'>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
        <Script
          src="https://cdn.plyr.io/3.7.8/plyr.js" 
          onReady={() => {
            const player = new Plyr('#player');
          }}
          defer
        />
        <div className='p-3 border-[3px] border-ink bg-ink shadow-hard'>
          <div id="player" data-plyr-provider="youtube" data-plyr-embed-id={videoId}></div>
        </div>
      </div>
  )
}
