import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { setContext } from "../setContext";
import profile from "../image/profile.png";

// 주요정보 section
const MenuTapLeft = styled.div`
  text-align: start;
  > div:nth-child(1) {
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
  }
  > div:nth-child(2) {
    margin-top: 30px;
    margin-bottom: 50px;
    line-height: 2;
    color: #999999;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }

  @media screen and (max-width: 1023px) {
    padding-right: 15px;
    padding-left: 15px;
    > div:nth-child(1) {
      font-size: 22px;
      font-weight: bolder;
      margin-top: 20px;
    }
    > div:nth-child(2) {
      margin-top: 30px;
      margin-bottom: 50px;
      line-height: 2;
      font-size: 14px;
    }
    ul {
      border-bottom: 1px solid #222222;
      border-top: 1px solid #222222;
    }
    ul > li {
      color: #999999;
    }
    li > span {
      color: white;
    }
  }
`;

// 스틸컷 section
const MenuTapMiddle = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

// 출연진 section
const MenuTapRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

// 출연진 article
const CastInfo = styled.div`
  height: 300px;
  overflow: hidden;
  padding-right: 10px;
  padding-left: 10px;
  width: 150px;
  > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media screen and (max-width: 1023px) {
    height: 250px;
    > div {
      font-size: 12px;
    }
    > img {
      width: 100px;
      height: 150px;
    }
  }
  @media screen and (max-width: 600px) {
    width: 80px;
    height: 200px;
    > img{
    width: 80px;
    height: 120px;
    }
  }
`;

// 스틸컷 article
const PosterInfo = styled.img`
  cursor: pointer;
  display: block;
  width: 300px;
  box-sizing: border-box;
  margin-bottom: 10px;
  :hover {
    box-shadow: 10px 10px 10px #e0e0e0;
  }
  @media screen and (max-width: 1023px) {
    margin-right: 10px;
    margin-left: 10px;
    width: 150px;
    height: 250px;
    :hover {
      box-shadow: none;
    }
  }
  @media screen and (max-width: 600px) {
    width: 80px;
    height: 120px;
  }
`;

// 상세페이지 menu tap 콘텐츠
function MovieInfoMenuTapContend() {
  const {
    stillPhoto,
    tapClickValue,
    imageUrl,
    castInfo,
    movieDetail,
    SearchContainer,
    setShowImage,
    setBackgroundToggle,
  } = useContext(setContext);

      // menu tap 주요정보
  if (tapClickValue === 1) {
    return (
      <MenuTapLeft>
        <div> {movieDetail.tagline} </div>
        <div> {movieDetail.overview} </div>
        <div style={{ lineHeight: "2" }}>
          <ul>
            <li>
              {" "}
              감독 :{" "}
              {castInfo.crew &&
                castInfo.crew.map((e, index) => {
                  return (
                    <span key={index}>
                      {e.job === "Director" ? e.name : null}
                    </span>
                  );
                })}{" "}
            </li>
            <li>
              {" "}
              장르 :{" "}
              {movieDetail.genres &&
                movieDetail.genres.map((e, index) => {
                  return <span key={index}> {e.name} </span>;
                })}
              <span>/ {movieDetail.runtime} 분 </span>
            </li>
            <li>
              {" "}
              개봉일 : <span>{movieDetail.release_date} </span>{" "}
            </li>
            <li>
              평점 :{" "}
              <span>{Math.floor(movieDetail.vote_average * 10) / 10} </span>{" "}
            </li>
          </ul>
        </div>
      </MenuTapLeft>
    );
    
    // menu tap 스틸컷
  } else if (tapClickValue === 2) {
    return (
      <MenuTapMiddle>
        {stillPhoto.logos &&
          stillPhoto.posters.map((e, index) => {
            return (
              <PosterInfo
                key={index}
                src={imageUrl + e.file_path}
                alt="스틸컷"
                onClick={() => {
                  setShowImage(e.file_path);
                  document.querySelector(SearchContainer).style.display =
                    "block";
                  document.querySelector("body").style.overflowY = "hidden";
                  setBackgroundToggle(false);
                }}
              />
            );
          })}
      </MenuTapMiddle>
    );

        // menu tap 출연진
  } else if (tapClickValue === 3) {
    return (
      <MenuTapRight>
        {castInfo.cast.map((e, index) => {
          return (
            <CastInfo key={index}>
              <img
                src={e.profile_path ? imageUrl + e.profile_path : profile}
                alt="프로필 사진"
                width="150px"
                height="225px"
              />
              <div> {e.original_name} </div>
              <div> {e.character} </div>
            </CastInfo>
          );
        })}
      </MenuTapRight>
    );
  }
}

export default MovieInfoMenuTapContend;
