import React from 'react'
import { useContext } from 'react'
import { setContext } from '../setContext'
import styled from 'styled-components';

// 영화 background 포스터
const MovieInfoBackgroundImage =styled.div`
width: 1100px;
margin: 0 auto;
background-size: 1100px 530px;
margin-bottom: 50px;
@media screen and (max-width: 1023px){
width: 100%;
text-align: center;
background-size: 100% 100%;
background-color: red;
margin-bottom: 0px;
}
`

// 영화 background 검은배경
const MovieInfoBackground =styled.div`
background: linear-gradient(to right,#0f0f0f 30%,rgba(0,0,0,0.4) 50%,#0f0f0f 100%);
width: 100%;
height: 100%;
padding-top: 40px;
padding-bottom: 40px;
margin-bottom: -17px;
@media screen and (max-width: 1023px){
padding-top: 0;
background: linear-gradient( to top right,  #150c1c 10% ,rgba(0,0,0,0.3));
}
@media screen and (min-width: 1023px){
  display: flex;
}
`
// 영화 포스터
const MovieInfoPoster =styled.img`
@media screen and (max-width: 1023px){
width: 80%;
height: 100%;
}

`
// 전체 container
const MovieInfoNavContainer = styled.div`
width: 100%;
background: linear-gradient(to right,#0f0f0f 10%,rgba(15,15,15,9) 40%,#0f0f0f 80%);
`

// 제목, 오리지널 제목, 줄거리, 평점 container 
const MovieInfoDetail = styled.div`
margin-left: 50px;
color:white;
width: 100%;
position: relative;
@media screen and (max-width: 1023px){
margin-left: 0;
}
`
// 한국 제목
const MovieInfoDetailTitle = styled.div`
font-size: 42px;
font-weight: bolder;
@media screen and (max-width: 1023px){
font-size: 24px;
margin-top: 20px;
}
`

// 오리지널 제목
const MovieInfoDetailIOriginalTitle = styled.div`
font-size: 24px;
font-weight: bold;
color: #999999;
@media screen and (max-width: 1023px){
font-size: 18px;
margin-top: 15px;
}
`

// 줄거리
const MovieInfoDetailOverview = styled.div`
margin-top: 50px;
text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    line-height: 30px;
    height: 180px;   
    @media screen and (max-width: 1023px){
      display: none;
}
`

// 평점 container
const MovieInfoDetailFotterRight = styled.div`
position: absolute;
bottom: 0;
right: 25%;
`

// 평점
const MovieInfoVoteAverage = styled.div`
 color : #4fc3f7;
 font-size: 24px;
`

// 출시일 container
const MovieInfoDetailFotterLeft =styled.div`
position: absolute;
bottom: 0;
left: 25%;
`

// 출시일
const MovieInfoDetailReleaseDate = styled.div`
color:white;
font-size: 24px;
`

// 상세 페이지 nav
function MovieInfoNav() {
   const { imageUrl, clickImgValue, MovieInfoDetailFotter } = useContext(setContext);
  return (
    <MovieInfoNavContainer>
    <MovieInfoBackgroundImage style={{ backgroundImage: `url(${imageUrl}${clickImgValue.backdrop_path})` }} >
      <MovieInfoBackground>
    <MovieInfoPoster src={imageUrl + clickImgValue.poster_path} alt ='MoviePhoster' width="300px" height= '450px' />
    <MovieInfoDetail>
      <MovieInfoDetailTitle> {clickImgValue.title} </MovieInfoDetailTitle>
      <MovieInfoDetailIOriginalTitle> {clickImgValue.original_title} </MovieInfoDetailIOriginalTitle>
      <MovieInfoDetailOverview> {clickImgValue.overview} </MovieInfoDetailOverview>
      <MovieInfoDetailFotter>
        <MovieInfoDetailFotterLeft>
          <div>출시일</div>
      <MovieInfoDetailReleaseDate> {clickImgValue.release_date} </MovieInfoDetailReleaseDate>
      </MovieInfoDetailFotterLeft>
      <MovieInfoDetailFotterRight>
        <div>평점</div>
      <MovieInfoVoteAverage>{ Math.floor(clickImgValue.vote_average * 10) / 10} </MovieInfoVoteAverage>
      </MovieInfoDetailFotterRight>
      </MovieInfoDetailFotter>
      </MovieInfoDetail>   
    </MovieInfoBackground>    
</MovieInfoBackgroundImage>
</MovieInfoNavContainer>
  )
}

export default MovieInfoNav