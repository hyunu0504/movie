import React, { useContext } from "react";
import { setContext } from "../setContext";
import MovieComponent from "./MovieComponent";

// 현재 상영중 페이지
function NowPlaying() {
  const {nowPlayingData} = useContext(setContext);
  return (
 <MovieComponent ApiData = { nowPlayingData } />
  );
}

export default NowPlaying;
