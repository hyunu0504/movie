import React, { useContext } from 'react'
import { setContext } from '../setContext'
import MovieComponent from "./MovieComponent";

// 상영 예정작 페이지
function Upcoming() {
   const { upcomingData } = useContext(setContext)
  return (
 <MovieComponent ApiData = { upcomingData } />
  )
}

export default Upcoming