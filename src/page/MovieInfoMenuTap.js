import React, { useContext } from "react";
import styled from "styled-components";
import { setContext } from "../setContext";
import MovieInfoMenuTapContend from "./MovieInfoMenuTapContend";
import MovieInfoMenuTapScroll from "./MovieInfoMenuTapScroll";

// 상세 페이지 주요 정보 ,스틸컷, 출연진
const MenuTapList = styled.li`
  list-style: none;
  border-bottom: #eee solid 3px;
  border-top: #eee solid 3px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bolder;
  font-size: 24px;
  cursor: pointer;
  :nth-child(1) {
    border-left: #eee solid 3px;
  }
  :nth-child(3) {
    border-right: #eee solid 3px;
  }
  @media screen and (max-width: 1023px) {
    color: white;
    border-bottom: 3px solid #222222;
    border-top: 3px solid #222222;
    font-size: 16px;
    font-weight: bold;
    :nth-child(1) {
      border-left: none;
    }
    :nth-child(3) {
      border-right: none;
    }
  }
`;

//  상세페이지 menutap 헤더
function MovieInfoMenuTap() {
  const { tapClickValue, showContendBtn, MovieInfoMenuTapContainer } = useContext(setContext);
  return (
    <div>
      {/* 스크롤 이벤트 컴포넌트 */}
      <MovieInfoMenuTapScroll/>
      {/* 주요 정보, 스틸컷, 출연진 container */}
      <MovieInfoMenuTapContainer>
        <MenuTapList style={{ borderBottom: tapClickValue === 1 ? "1px solid white" : null }} onClick={() => showContendBtn(1)}>주요 정보</MenuTapList>
        <MenuTapList style={{ borderBottom: tapClickValue === 2 ? "1px solid white" : null }} onClick={() => showContendBtn(2)}>스틸컷 </MenuTapList>
        <MenuTapList style={{ borderBottom: tapClickValue === 3 ? "1px solid white" : null }} onClick={() => showContendBtn(3)}>출연진 </MenuTapList> 
      </MovieInfoMenuTapContainer>
      <MovieInfoMenuTapContend />
    </div>
  );
}
export default MovieInfoMenuTap;
