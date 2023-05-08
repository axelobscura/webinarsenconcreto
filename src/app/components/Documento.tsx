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
        <Head>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
          <link rel="stylesheet" type="text/css" href="/css/flipbook.style.css" />
        </Head>
        <Script 
          // @ts-ignore
          src="/js/flipbook.min.js" 
          onReady={() => {
            ($("#containePDF") as any).flipBook({
              pages:[
                  {src:"http://localhost:3000/images/book2/page1.jpg", thumb:"/images/book2/thumb1.jpg", title:"Cover"},
                  {src:"http://localhost:3000/images/book2/page2.jpg", thumb:"/images/book2/thumb2.jpg", title:"Page two"},
                  {src:"http://localhost:3000/images/book2/page3.jpg", thumb:"/images/book2/thumb3.jpg", title:"Page three"},
                  {src:"http://localhost:3000/images/book2/page4.jpg", thumb:"/images/book2/thumb4.jpg", title:""},
                  {src:"http://localhost:3000/images/book2/page5.jpg", thumb:"/images/book2/thumb5.jpg", title:"Page five"},
                  {src:"http://localhost:3000/images/book2/page6.jpg", thumb:"/images/book2/thumb6.jpg", title:"Page six"},
                  {src:"http://localhost:3000/images/book2/page7.jpg", thumb:"/images/book2/thumb7.jpg", title:"Page seven"},
                  {src:"http://localhost:3000/images/book2/page8.jpg", thumb:"/images/book2/thumb8.jpg", title:"Last"}
              ],
              viewMode:"2d",
              layout:2
            });
          }}
        />
        <div id="containePDF"></div>
      </div>
  )
}
