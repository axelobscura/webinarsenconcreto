"use client"
// @ts-ignore
import React, { useEffect } from 'react';
import Head from 'next/head'
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
              pages:[
                  {src:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva1.JPG", thumb:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva1.JPG", title:"Cover"},
                  {src:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva2.JPG", thumb:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva2.JPG", title:"Page two"},
                  {src:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva3.JPG", thumb:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva3.JPG", title:"Page three"},
                  {src:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva4.JPG", thumb:"https://www.webinarsenconcreto.com/images/grado/ASTM-C-31/Diapositiva4.JPG", title:""},
              ],
              viewMode:"2d",
              layout:1
            });
          }}
          defer
        />
        <div id="containePDF" style={{'position':'absolute','width':'73%','height':'75%'}}></div>
      </div>
  )
}
