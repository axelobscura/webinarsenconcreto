"use client"
// @ts-ignore
import React, { useEffect } from 'react';
import './loader.js'
import $ from "jquery"
import Script from 'next/script';

export default function Documento() {

  return (
      <div>
        <Script
          src="/js/flipbook.min.js" 
          onReady={() => {
            ($("#containePDF") as any).flipBook({
              pdfUrl:"/normas/ASTM_C_31.pdf",
              skin:"dark",
              singlePageMode:true,
              layout:4,
              btnDownloadPdf: {
                enabled: false
              },
              btnShare: {
                enabled: false
              },
              btnPrint: {
                enabled: false
              },
              btnDownloadPages: {
                enabled: false
              },
            });
          }}
          defer
        />
        <div id="containePDF" style={{'position':'absolute','width':'73%','height':'75%'}}></div>
      </div>
  )
}
