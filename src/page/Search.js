import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { setContext } from '../setContext'


// 검색 input
const SearchInput = styled.input`
width: 40%;
display: block;
margin: 0 auto;
border: none;
border-bottom:  3px solid white;
background-color:rgba(0, 0, 0, 0.1);
font-size: 32px;
margin-top: 100px;
margin-bottom: 100px;
color:white;
text-align: center;
outline: none;
padding-bottom: 15px;
::placeholder{
  color:white;
}
@media screen and (max-width: 1023px){
    width: 80%;
    font-size: 24px;
    margin-top: 50px;
    margin-bottom: 50px;
}
`

// 스틸컷 container
const MoviePosterContainer = styled.img`
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    color:white;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 1023px){
      width: 400px;
      height: 600px;
}
`

// 검색한 영화 section
const SearchMovieSection = styled.div`
max-width: 1480px;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
text-align: center;
color: white;
margin: 0 auto;
`

// 검색한 영화 article
const SearchMovieArticle = styled.div`
width: 240px;
height: 320px;
transition: all 0.3s;

:hover{
  scale: 1.1;
}
@media screen and (max-width: 1480px){
  width: 200px;
  height: 250px;
    > img {
      width: 150px;
    }
}
@media screen and (max-width: 1023px){
  width: 150px;
  height: 200px;
    > img {
      width: 108px;
    }
}
@media screen and (max-width: 600px){
  width: 120px;
  height: 200px;
    > img {
      width: 108px;
    }
}
@media screen and (max-width: 480px){
  width: 100px;
  height: 150px;
    > img {
      width: 80px;
    }
}
`
// 검색한 영화 제목
const SearchMovieTitle = styled.div`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
color:white;
font-weight: bold;
`

// 검색창
function Search() {
  const {SearchContainer, getSearchValue, setGetSearchValue, searchData, showImage, imageUrl, searchFocus, setMovieId, setClickImgValue, setBackgroundToggle, backgroundToggle, setTapClickValue} =  useContext(setContext);
  const searchHiddenBtn = (e) => {
    e.stopPropagation(); document.querySelector(SearchContainer).style.display = 'none';document.querySelector('body').style.overflowY = 'visible'; setGetSearchValue('');setBackgroundToggle(true)
  }

  return (
    <SearchContainer onClick={searchHiddenBtn} >
      {/* 검색 toggle */}
     { backgroundToggle  ?  <SearchInput value={getSearchValue} ref={searchFocus} onChange={(e) => {setGetSearchValue(e.target.value)}} onClick ={(e) => { e.stopPropagation() }}  placeholder='영화를 검색하세요'/> : null }
     {/* 스틸컷 toggle */}
     { backgroundToggle === false ? <MoviePosterContainer src = {imageUrl + showImage} alt = '스틸컷' /> : null }
        <SearchMovieSection>
        {
           searchData.results && searchData.results.map((e, index) => {
                return(
                    <Link to = {`/movieinfo/${e.title}`}  onClick={() => {setMovieId(e.id); setClickImgValue(e); window.scrollTo(0,0); setTapClickValue(1);}} key={index} style={{ textDecoration: 'none'}}  >
                     { e.poster_path && index < 18 && getSearchValue != ''  ? <SearchMovieArticle>             
                       <img src = { imageUrl + e.poster_path } width = '180px'  alt='영화 포스터' />
                   <SearchMovieTitle> { e.title} </SearchMovieTitle>
                        </SearchMovieArticle> : null}
                        </Link>                    
                )
            })
        }
        </SearchMovieSection>
    </SearchContainer>
  )
}

export default Search