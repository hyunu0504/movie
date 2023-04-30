import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import serachIcon from './image/search.png'
import { setContext } from './setContext'

const HeaderMenu = styled.div`
width: 1100px;
margin: 0 auto;
display: flex;
justify-content: space-between;
font-weight: bolder;
text-align: center;
margin-bottom: 10px;
border-bottom: 3px solid #eee;
@media screen and (max-width: 1023px){
    width: 100%;
    margin-bottom: 0;
    justify-content: space-around;
  }
`
const Header_style = styled.div`
  border-radius: 5px;
  flex: 1;
  transition: background-color .3s;
  font-size: 22px;
  padding-bottom: 10px;
padding-top: 10px;
  :nth-child(4){
    cursor: pointer;
  }
  :hover {
    background-color: #cfd8dc;
  }
  @media screen and (max-width: 1023px){
    font-size: 15px;
    flex: none;
    :hover {
      background-color: white;
    }
    > img {
    height: 15px;
  }
  }
`


// 헤더 영역
function Header() {
  const {searchAnimation} = useContext(setContext)
  return (
    <div>
    <HeaderMenu>
       <Header_style> <Link to='/' style={{ textDecoration : 'none', color: 'black' }} >현재 상영중</Link></Header_style>
        <Header_style><Link to='/upcoming' style={{ textDecoration : 'none', color: 'black' }} >상영 예정작</Link></Header_style>
        <Header_style><Link to='/toprated' style={{ textDecoration : 'none', color: 'black' }} >인기 영화</Link></Header_style>
        <Header_style onClick={ searchAnimation } >검색 <img src= {serachIcon} height = '24px' alt='icon' /></Header_style>
    </HeaderMenu>
    </div>
  )
}
export default Header