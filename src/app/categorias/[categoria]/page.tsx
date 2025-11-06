"use client"
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { useThemeContext } from '../../context/theme';

export default function Categoria() {
  const { pathname } = useThemeContext()
  const categoria = pathname?.split('/').pop()
  console.log('CATEGORIA: ', categoria);

  return (
    <div  className='container-fluid categorias'>
        <Header />
        <div className='cat-entrada'>
          <div className='menu-categorias'>
            <h2 className='text-white'>{categoria && categoria.toUpperCase().split('-').join(' ')}</h2>
          </div>
        </div>
    </div>
  )
}
