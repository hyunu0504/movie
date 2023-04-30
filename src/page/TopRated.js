import React, { useContext } from 'react'
import { setContext } from '../setContext'
import MovieComponent from "./MovieComponent";

// 인기 영화 페이지
function TopRated() {
   const { topratedData } = useContext(setContext)
  return (
 <MovieComponent ApiData = { topratedData } />
  )
}

export default TopRated