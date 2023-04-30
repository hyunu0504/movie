import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { setContext } from "../setContext";


// 상영중, 예정작, 인기 영화 component 
function MovieComponent(props) {
  const {imageUrl,  setMovieId, setClickImgValue, movieImgLoading, ClipLoader, setTapClickValue, MovieBackground, MovieContainer, MovieoverView, MovieVoteAverage, PosterContainer, MovieFotter } = useContext(setContext);

  return (
    // 현재 상영중, 상영 예정작, 인기 영화 container 
    <PosterContainer>
      {/* movimgLoading == 로딩확인, 상영중, 예정작, 인기 영화 array 만큼 반복문 
      클릭시 (setMovieId == 클릭한 영화 id 값) (setMovieId == 클릭한 영화 id 값) 
      (setClickImgValue == 클릭한 영화 array )
      (setTapClickValue == 상세 페이지 menu tap 주요정보 1번으로 )
      */}
        {  movieImgLoading ? 
<ClipLoader color="#36d7b7" size={50}/> : props.ApiData.results &&
          props.ApiData.results.map((e, index) => {
            return (
           <Link style={{ textDecoration : 'none' }} to = {`/movieinfo/${e.title}`}  key={index} >  <MovieContainer onClick={ () => { setMovieId(e.id); setClickImgValue(e); setTapClickValue(1)} } >          
             <MovieBackground/>
           <MovieoverView> {e.overview} </MovieoverView> 
              <MovieVoteAverage> 평점 <span style={{ fontSize : '24px' , color : '#4fc3f7'  }} > {e.vote_average} </span> </MovieVoteAverage>
               <img  src={imageUrl + e.poster_path} alt ='영화 포스터' width="250px" height='375px' />         
              <MovieFotter>
              <div> {e.title} </div>
              <div>개봉일 : {e.release_date} </div>
              <div>평점 : {e.vote_average} </div>
              </MovieFotter>
            </MovieContainer> </Link>
            );
          })}
    </PosterContainer>
    )
}

export default MovieComponent