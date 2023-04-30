import styled from 'styled-components';
import MovieInfoNav from './MovieInfoNav';
import MovieInfoMenuTap from './MovieInfoMenuTap';
import MovieInfoSlide from './MovieInfoSlide';

// menu tap, footer 이미지 슬라이드 container
const MenutapFooterContainer = styled.div`
width: 1100px;
margin: 0 auto;
text-align: center;
@media screen and (max-width: 1023px){
  width: 100%;
  color:white;
  background-color: #150c1c;
}
`

function MovieInfoContainer() {
  return (
    <div>
      {/* 상세페이지 nav */}
   <nav><MovieInfoNav/></nav>
   {/* 상세페이지 footer 영역 container */}
  <MenutapFooterContainer>
    {/* 상세페이지 menu tap */}
   <section><MovieInfoMenuTap/></section>
   {/* 상세페이지 이미지 슬라이드 */}
   <footer><MovieInfoSlide/></footer>
  </MenutapFooterContainer>
    </div>
  )
}

export default MovieInfoContainer