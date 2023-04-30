import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import { useContext } from "react";
import { setContext } from "../setContext";
import styled from "styled-components";

// 추천 영화 text
const RecommendMovie = styled.div`
  font-size: 24px;
  margin-bottom: 50px;
  margin-top: 50px;
  font-weight: bolder;
  background-color: #f8f8fa;
  @media screen and (max-width: 1023px) {
    background-color: #1b1120;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

// 슬라이드 이미지
const SlideImg = styled.img`
  width: 300px;
  height: 450px;
  margin-top: 50px;
  cursor: pointer;
  @media screen and (max-width: 1023px) {
    width: 180px;
    height: 270px;
    margin-top: 30px;
  }
  @media screen and (max-width: 600px) {
    width: 110px;
    height: 165px;
  }
`;


// 상세 페이지 슬라이드
function MovieInfoSlide() {
  const {ClipLoader, slideImgLoading, RecommendMovieValue, setMovieId, setClickImgValue, setTapClickValue, imageUrl} = useContext(setContext);
  return (
    <div>
      <RecommendMovie>추천 영화</RecommendMovie>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        slidesPerView={3}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {slideImgLoading ? (
          <ClipLoader color="#36d7b7" size={50} />
        ) : (
          RecommendMovieValue.results.map((e, index) => {
            if(e.poster_path != null){
              return (
                <SwiperSlide key={index}>
                  <SlideImg
                    onClick={() => {
                      setMovieId(e.id);
                      setClickImgValue(e);
                      setTapClickValue(1);
                      window.scrollTo(0, 0);
                    }}
                    src={imageUrl + e.poster_path}
                    alt = '추천영화'
                  />
                  <div style={{ marginBottom: "50px" }}> {e.title} </div>
                </SwiperSlide>
              );
            }
            
          })
        )}
      </Swiper>
    </div>
  );
}

export default MovieInfoSlide;
