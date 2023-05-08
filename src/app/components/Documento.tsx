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
                  {src:"/images/book2/page1.jpg", thumb:"/images/book2/thumb1.jpg", title:"Cover"},
                  {src:"/images/book2/page2.jpg", thumb:"/images/book2/thumb2.jpg", title:"Page two"},
                  {src:"/images/book2/page3.jpg", thumb:"/images/book2/thumb3.jpg", title:"Page three"},
                  {src:"/images/book2/page4.jpg", thumb:"/images/book2/thumb4.jpg", title:""},
                  {src:"/images/book2/page5.jpg", thumb:"/images/book2/thumb5.jpg", title:"Page five"},
                  {src:"/images/book2/page6.jpg", thumb:"/images/book2/thumb6.jpg", title:"Page six"},
                  {src:"/images/book2/page7.jpg", thumb:"/images/book2/thumb7.jpg", title:"Page seven"},
                  {src:"/images/book2/page8.jpg", thumb:"/images/book2/thumb8.jpg", title:"Last"}
              ],
              viewMode:"2d",
              layout:2
            });
          }}
          defer
        />
        <div id="containePDF"></div>
      </div>
  )
}
