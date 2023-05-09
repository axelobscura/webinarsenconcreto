"use client"
import './loader.js'
import Plyr from 'plyr'
import Script from 'next/script';

export default function Player() {

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
        <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="WXkTowQXnq0"></div>
      </div>
  )
}
