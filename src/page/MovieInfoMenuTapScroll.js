import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { setContext } from '../setContext';

// 스크롤 container
const ScrollContainer = styled.div`
position: fixed;
top: 0;
right: 0;
width: 100%;
text-align: left;
`

// 상영 중, 예정작, 인기 
const ScrollHeader = styled.ul`
width: 1100px;
display: flex;
background-color: #444444;
margin: 0 auto;
padding-left: 0;
> li{
    list-style: none;
    margin-right: 20px;
    margin-bottom: 15px;
    margin-top: 15px;
    font-size: 14px;
    color:white;
    cursor: pointer;
}
   li :hover{
    border-bottom: 1px solid white;
 }
 @media screen and (max-width: 1023px){
    > li{
        margin-left: 15px;
        margin-right: 15px;
        font-size: 12px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
}
`
// 상영 중, 예정작, 인기 background
const ScrollHeaderBackground = styled.div`
width: 100%;
background-color: #444444;
display: none;
transition: all 0.3s;
`

// 영화 제목
const ScrollTitle = styled.div`
width: 1100px;
background: linear-gradient(to right,#0f0f0f 10%,rgba(15,15,15,9) 40%,#0f0f0f 80%);
margin: 0 auto;
display: flex;
`

// 영화 제목 background
const ScrollTitleBackground = styled.div`
width: 100%;
background: linear-gradient(to right,#0f0f0f 10%,rgba(15,15,15,9) 40%,#0f0f0f 80%);
color:white;
display: none;
font-size: 32px;
padding-top: 15px;
padding-bottom: 15px;
font-weight: bold;
transition: all 0.3s;
@media screen and (max-width: 1023px){
      font-size: 24px;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 15px;
}
`

// 주요 정보, 스틸컷, 출연진
const ScrollMenuTap = styled.ul`
display: flex;
width: 1100px;
margin: 0 auto;
padding-left: 0px;
background-color: rgba(255,255,255,.9);
color: black;
> li{
    margin-right: 25px;
    margin-top: 8px;
    padding-bottom: 3px;
    margin-bottom: 5px;
    cursor: pointer;
    list-style: none;
    font-size: 18px;
}
@media screen and (max-width: 1023px){
    > li{
        margin-left: 15px;
        margin-right: 15px;
        font-size: 12px;
    }
}
`
// 주요 정보, 스틸컷, 출연진 background
const ScrollMenuTapBackground = styled.div`
width: 100%;
box-shadow: 0 0 20px 0 rgb(0 0 0 / 12%);
display: none;
transition: all 0.3s;
`

// 상세페이지 스크롤
function MovieInfoMenuTapScroll() {
  const  { tapClickValue, clickImgValue, searchAnimation, showContendBtn, MovieInfoDetailFotter }  =  useContext(setContext);

  {/* 스크롤 이벤트 */}
      window.addEventListener('scroll', () => { 
        {/* MovieInfoDetailFotter == 상세페이지 출시일, 평점 기준 */}
        const scrollValue = document.querySelector(MovieInfoDetailFotter).getBoundingClientRect().top + window.pageYOffset;
        const scrollValueAdd = scrollValue + 400;
        
        {/* 상영 중, 예정작, 인기, 제목 스크롤 */}
        if(window.scrollY > scrollValue){
            document.querySelector(ScrollHeaderBackground).style.display = 'block'
            document.querySelector(ScrollTitleBackground).style.display = 'block'  
        }
        else{
            document.querySelector(ScrollHeaderBackground).style.display = 'none'
            document.querySelector(ScrollTitleBackground).style.display = 'none'  
        }

        {/* 주요 정보, 스틸컷, 출연진 스크롤 */}
        if(window.scrollY > scrollValueAdd){
            document.querySelector(ScrollMenuTapBackground).style.display = 'block'
        }
        else{
            document.querySelector(ScrollMenuTapBackground).style.display = 'none'
        }
    });

  return (
    <ScrollContainer>
        {/* 현재 상영 중, 상영 예정작, 인기 영화 */}
        <ScrollHeaderBackground>
        <ScrollHeader>
            <li><Link to = '/' style={{ textDecoration : 'none', color: 'white' }} >현재 상영 중</Link> </li>
            <li><Link to = '/upcoming' style={{ textDecoration : 'none', color: 'white' }} >상영 예정작</Link></li>
            <li><Link to = '/toprated' style={{ textDecoration : 'none', color: 'white' }} >인기 영화 </Link></li>
            <li onClick={searchAnimation} ><span>검색</span></li>
        </ScrollHeader>
        </ScrollHeaderBackground>
       {/* 영화 제목 */}
        <ScrollTitleBackground><ScrollTitle>{clickImgValue.title}</ScrollTitle></ScrollTitleBackground>

    {/* 주요 정보, 스틸컷, 출연진 */}
    <ScrollMenuTapBackground>
    <ScrollMenuTap>
    <li onClick={() => { showContendBtn(1) }} style = {{ borderBottom : tapClickValue == 1 ? 'solid 3px #503396' : null, color : tapClickValue == 1 ? '#503396': null }} >주요 정보</li>
    <li onClick={() => { showContendBtn(2) }} style = {{ borderBottom : tapClickValue == 2 ? 'solid 3px #503396' : null, color : tapClickValue == 2 ? '#503396': null }} >스틸컷</li>
    <li onClick={() => { showContendBtn(3) }} style = {{ borderBottom : tapClickValue == 3 ? 'solid 3px #503396' : null, color : tapClickValue == 3 ? '#503396': null }} >출연진</li>
    </ScrollMenuTap>
    </ScrollMenuTapBackground>
  </ScrollContainer>
  )
}

export default MovieInfoMenuTapScroll