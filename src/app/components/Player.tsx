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
        <video id="player" controls>
          <source src="https://webinarimcyc.com/videos/ASTM_C_31.mp4" type="video/mp4" />
        </video>
      </div>
  )
}
