import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader'
import { setContext } from "./setContext";
import Header from "./Header";
import { BrowserRouter, HashRouter , Route, Routes } from "react-router-dom";
import Upcoming from "./page/Upcoming";
import NowPlaying from "./page/NowPlaying";
import TopRated from "./page/TopRated";
import Error from "./page/Error";
import MovieInfoContainer from "./page/MovieInfoContainer";
import ScrollFix from "./ScrollFix";
import Search from "./page/Search";
import styled from "styled-components";

// 검색창 background
const SearchContainer = styled.div`
background-color:rgba(0, 0, 0, 0.97);
z-index: 2;
position: fixed;
width: 100%;
height: 100%;
display: none;
`


//현재 상영중, 상영 예정작, 인기 영화 article 디자인

// 전체 container 
const PosterContainer = styled.div`
width: 1100px;
text-align: center;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin: 0 auto;
@media screen and (max-width: 1023px){
  display: block;
  width: 90%;
  }`;

// img 영역 container
const MovieBackground = styled.div`
    background-color:rgba(0, 0, 0, 0.7);
    position: absolute;
    width: 250px;
    height: 375px;
    opacity: 0;
    transition: all .3s;
    @media screen and (max-width: 1023px){
      display: none;
}`;

// img 영역 평점
const MovieVoteAverage = styled.div`
    position: absolute;
    bottom: 150%;
    display: block;
    z-index: 2;
    transition: all .3s;
    font-size: 24px;
    left: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 1023px){
    display: none;
}
`

// img 영역 줄거리
const MovieoverView = styled.div`
    position: absolute;
    top: 150%;
    margin: 25px;
    z-index: 2;
    transition: all .3s;
    height: 450px;
    color:white;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    line-height: 20px;
    height: 200px;
    @media screen and (max-width: 1023px){
      display: none;
}`;

// text 영역 container
const MovieFotter = styled.div`
color:black;
border-bottom: 3px solid #eee;
border-right: 3px solid #eee;
border-left: 3px solid #eee;
font-size: 12px;
> div:nth-child(1) {
    color:black;
    font-weight: bolder;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
@media screen and (max-width: 1023px){
  border: none;
  margin-left: 10px;
  text-align: left;a
  >div {
    font-size: 13px;
    color: #999999
  }
  > div:nth-child(1) {
    color:black;
    font-weight: bolder;
    padding-bottom: 70px;
    font-size: 18px;
  }
}
`

// container의 background
const MovieContainer = styled.div`
text-align: center;
position: relative;
overflow: hidden;
color: white;
margin-bottom: 30px;
z-index: 0;
width: 250px;

 :hover ${MovieBackground} {
    opacity : 1;
  }
  :hover ${MovieoverView} {
    top : 0;
  }
  :hover ${MovieVoteAverage} {
    bottom: 15%;
  }
  @media screen and (max-width: 1023px){
    display: flex;
    border-bottom: 2px solid #eee;
    width: 100%;
    margin-bottom: 0;
    margin-top: 15px;
    padding-bottom: 15px;
    > img{
      width: 108px;
      max-height: 162px;
    }
}`
//현재 상영중, 상영 예정작, 인기 영화 article 끝


// 상세 페이지
//menu tap 
const MovieInfoMenuTapContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0px;
  z-index: 1;
`;

// 상세페이지 출시일, 평점 영역
const MovieInfoDetailFotter = styled.div`
display: flex;
color: #ccc;
text-align: center;
@media screen and (max-width: 1023px){
margin-top: 40px;
padding-top: 40px;
font-size: 12px;
}
`
// 상세페이지 스타일 영역 끝




function App() {
  
  // img url
  const imageUrl = "https://image.tmdb.org/t/p/w1280/";

  // 상영중, 예정, 인기영화 array
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [topratedData, setTopratedData] = useState([]);
  // 상영중, 예정, 인기영화 array 끝


  // 검색한 영화
    // input e.target.value 값 
    const [getSearchValue, setGetSearchValue] = useState('');
  // 검색한 영화 array
  const [searchData, getSearchData] = useState([]);
   // 검색한 영화 끝


   //상세 페이지
   // 스틸컷 array
  const [stillPhoto, setStillPhoto] = useState([]);

  // 출연진 array
  const [castInfo, setCastInfo] = useState([]);

  // 주요정보 array
  const [movieDetail, setMovieDetail] = useState([]);

  // 추천영화 array
  const [RecommendMovieValue, setSimilarMovieData] = useState([]);

  // 상세페이지의 탭메뉴중에서 이동
  const [tapClickValue, setTapClickValue ] = useState(1);

  // 상세 페이지 끝

  // 클릭한 영화 api
  // 클릭한 영화 array
  const [clickImgValue, setClickImgValue] = useState(JSON.parse(window.sessionStorage.getItem("clickImgValue")) || '' );
  // 클릭한 영화 id 값
  const [MovieId, setMovieId] = useState(JSON.parse(window.sessionStorage.getItem("MovieId")) || '' );
  // 클릭한 영화 끝



  // 메인페이지 로딩중
  const [movieImgLoading, setMovieImgLoading] = useState(true);

  // 상세페이지 추천영화 로딩중
   const [slideImgLoading, setSlideImgLoading] = useState(true);

   // 검색창 , 상세페이지 스틸컷 클릭시 검은 배경 toggle
  const [backgroundToggle, setBackgroundToggle] = useState(true);
  const [showImage, setShowImage] = useState('');

  // input에 focus
  const searchFocus = useRef(null);

  // 검색창 클릭시
  const searchAnimation = () => {
    document.querySelector(SearchContainer).style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';
    searchFocus.current.focus();
  }

  // tap menu 그에 맞는 컨텐츠 보여주고 그 위치로 스크롤
  const showContendBtn = (e) => {
    setTapClickValue(e);
    const clickScrollValue = document.querySelector(MovieInfoMenuTapContainer).getBoundingClientRect().top + window.pageYOffset ;
    window.scrollTo(0, clickScrollValue);
  }

  // 새로고침해도 클릭한 영화의 array 받기
  useEffect(() => {
    window.sessionStorage.setItem("clickImgValue", JSON.stringify(clickImgValue));

  }, [clickImgValue]);


  useEffect(() => {
    // 현재 상영중  array 받기
      axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&page=1&region=KR`)
      .then((response) => { setNowPlayingData(response.data); setMovieImgLoading(false);}) 

    // 상영 예정작  array 받기
      axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&page=1&region=KR`)
      .then((response) => { setUpcomingData(response.data) }) 

    // 인기 영화 array 받기
      axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&page=1&region=KR`)
      .then((response) => { setTopratedData(response.data) }) 

  }, [] );

  // 첫 마운트 때, 검색 input값 바뀔 때 
  useEffect( () => {
     axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&query=${getSearchValue}&page=1&include_adult=false&region=KO`)
            .then((response) => getSearchData(response.data) ) 
  }, [getSearchValue] )

  // 첫 마운트 때, 클릭한 영화의 id값이 변경됐을 때 실행
  useEffect(() => {
      // 새로고침해도 클릭한 영화의 id 값 받기
    window.sessionStorage.setItem("MovieId", JSON.stringify(MovieId));
     // 추천영화 array 받기
      axios.get(`https://api.themoviedb.org/3/movie/${MovieId}/similar?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&page=1`)
          .then((response) => { setSimilarMovieData(response.data); setSlideImgLoading(false)} ) 
      // 스틸컷 array 받기
          axios.get(`https://api.themoviedb.org/3/movie/${MovieId}/images?api_key=c4e59022826dc465ea5620d6adaa6813&language=en-US&include_image_language=en`)
          .then((response) => setStillPhoto(response.data) )
      // 출연진 array 받기
          axios.get(`https://api.themoviedb.org/3/movie/${MovieId}/credits?api_key=c4e59022826dc465ea5620d6adaa6813&language=KO`)
          .then((response) => setCastInfo(response.data) )
      // 주요정보 array 받기
          axios.get(`https://api.themoviedb.org/3/movie/${MovieId}?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko`)
          .then((response) => setMovieDetail(response.data) )
  },[MovieId] )

  return (
    <setContext.Provider
      value={{
        imageUrl,
        nowPlayingData,
        setNowPlayingData,
        upcomingData,
        setUpcomingData,
        topratedData,
        setTopratedData,
        RecommendMovieValue,
        setSimilarMovieData,
        MovieId,
        setMovieId,
        clickImgValue,
        setClickImgValue,
        movieImgLoading,
        ClipLoader,
        slideImgLoading,
        getSearchValue,
         setGetSearchValue,
         searchData, 
         getSearchData,
         SearchContainer,
         searchFocus,
         stillPhoto,
         tapClickValue,
         setTapClickValue,
         castInfo,
         MovieBackground,
         MovieContainer,
         MovieoverView,
         MovieVoteAverage,
         PosterContainer,
         MovieFotter,
         movieDetail,
         setShowImage,
         showImage,
         backgroundToggle,
        setBackgroundToggle,
        searchAnimation,
        MovieInfoMenuTapContainer,
        showContendBtn,
        MovieInfoDetailFotter
      }}
    >

      <HashRouter>
        <ScrollFix/>
        <Search/>
        <header><Header/></header>
        <Routes >
          <Route path="/" element={<NowPlaying />}/>
          <Route path="/portfolioMovie" element={<NowPlaying />}/>
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/movieinfo/*" element={<MovieInfoContainer />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </HashRouter>
    </setContext.Provider>
  );
}

export default App;
