"use client"
import { useState, useEffect, useCallback } from 'react';
import { useThemeContext } from '../context/theme'
import Script from 'next/script';

export default function Presentacion() {
  const { pathname } = useThemeContext();
  const nombre = pathname?.split('/').pop();
  const webinarUrlSegment = pathname?.split('/')[pathname.split('/').length - 2];
  const [webinar, setWebinar] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (!nombre) return;
      try {
        const response = await fetch(`/api/getwebinar/${nombre}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setWebinar(data.results && data.results.length > 0 ? data.results[0] : null);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [nombre]);

  const url =  `/webinars/${webinarUrlSegment}/${nombre}.pdf`;

  const initializeFlipbook = useCallback(() => {
    // Wait a bit to ensure both scripts are fully loaded
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn && (window as any).$.fn.flipBook) {
        ((window as any).$("#container") as any).flipBook({
          pdfUrl: url,
          backgroundColor: 'transparent',
          viewMode: '3d',
          singlePageMode: true,
          pages: [
            { title: "Cover" },
            { title: "" },
            { title: "Page 3" },
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "End" },
          ],
          btnToc: { enabled: false },
          btnSelect: { enabled: false },
          btnDownloadPages: { enabled: false },
          btnDownloadPdf: { enabled: false },
          btnPrint: { enabled: false },
          btnShare: { enabled: false },
          btnZoomIn: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnZoomOut: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnSound: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnThumbs: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnBookmark: { enabled: false },
          btnExpand: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnAutoplay: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          currentPage: { hAlign: 'center' },
          btnBackground: 'rgb(35 63 139);'
        });
      } else {
        console.error('jQuery or flipBook not available');
      }
    }, 100);
  }, [url]);

  useEffect(() => {
    initializeFlipbook()
  }, [initializeFlipbook]);

  return (
      <div
        className={`flex min-h-screen bg-[url('https://webinars.webinarsenconcreto.com/images/webinars.jpg')] bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <div style={{'width':'100%','position':'relative', backgroundColor:'rgba(0,0,0,0.5)'}}>
          <div id="container"></div>
        </div>
        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"
          strategy="afterInteractive"
          onLoad={() => {
            // jQuery loaded, now load flipbook
            const flipbookScript = document.createElement('script');
            flipbookScript.src = '/js/flipbook.min.js';
            flipbookScript.onload = initializeFlipbook;
            document.body.appendChild(flipbookScript);
          }}
        />
    </div>
    
  )
}
