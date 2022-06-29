import React, { memo, useEffect } from "react";
import { Autoplay } from "swiper";
import { LoadItems } from "../../../Redux/action/actionFetch";
import { useWeb3React } from "@web3-react/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListMap,
  ImageFeatured,
  FooterFeatured,
  FooterCreator,
  FooterPrice,
  FooterTitle,
  Price,
  FooterName,
} from "../../Market/Market";
import "swiper/css";
import "swiper/less";
import "swiper/css/grid";
import styled from "styled-components";
import FBStoken from "../../Nav/components/Icon/FBStoken";
import Skeletons from "../../Market/components/Skeletons";

const SliderHome = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchs.data);
  const isLoadding = useSelector((state) => state.fetchs.requesting);
  const { chainId } = useWeb3React();

  const swiper = {
    slidesPerView: 6,
    spaceBetween: 10,
    modules: [Autoplay],
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    pagination: {
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      631: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1153: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1748: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      2000: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      2269: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      2300: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  };

  const isSkeletons = () => {
    return (
      <SwiperSlide>
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
      </SwiperSlide>
    );
  };
  const mapItem = () => {
    return isLoadding
      ? isSkeletons()
      : data &&
          data.map((res, index) => {
            return (
              <SwiperSlide key={index}>
                <ListMap>
                  <FeaturedImage>
                    <FeaturedContainer>
                      <ImageFeatured src={res.uri}></ImageFeatured>
                    </FeaturedContainer>
                    <FooterFeatured>
                      <FooterTitle>
                        <FooterName>{`${res.name} #${res.id}`}</FooterName>
                        <FooterCreator>Type Items: {res.type}</FooterCreator>
                      </FooterTitle>
                      <FooterPrice>
                        <Price>
                          <FBStoken width={25} height={25} />
                          {res.price}
                        </Price>
                      </FooterPrice>
                    </FooterFeatured>
                  </FeaturedImage>
                </ListMap>
              </SwiperSlide>
            );
          });
  };
  useEffect(() => {
    if (!chainId) return;
    dispatch(LoadItems(chainId));
  }, [chainId]);

  return (
    <SlickSlider className="swiper">
      <Swiper {...swiper}>{mapItem()}</Swiper>
    </SlickSlider>
  );
};
const SlickSlider = styled.div`
  width: 100%;
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-container {
    width: 480px;
  }
  .swiper-slide {
    width: 100%;
    font-size: 18px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    @media only screen and (max-width: 600px) {
      height: calc((100% - 30px) / 2) !important;
    }
    @media only screen and (max-width: 1945px) {
      max-width: 300px;
    }
    @media only screen and (max-width: 2000px) {
      max-width: 300px;
    }
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const FeaturedContainer = styled.div`
  overflow: hidden;
  align-items: center;
  display: flex;
  position: relative;
  border-radius: inherit;
  height: 280px;
  transition: all 0.5s ease-out;
  @media only screen and (max-width: 2000px) {
    height: 260px;
  }
  @media only screen and (max-width: 500px) {
    height: 230px;
  }
`;
const FeaturedImage = styled.div`
  width: 280px;
  color: white;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 8px 8px 24px 0px #3b817dcf;
  cursor: pointer;
  margin: 15px;
  position: relative;
  transition: all 0.5s ease-out;
  &:hover {
    box-shadow: 10px 10px 30px 0px #3b817dcf;
  }
  @media only screen and (max-width: 2000px) {
    width: 260px;
  }
  @media only screen and (max-width: 500px) {
    width: 230px;
  }
`;

export default memo(SliderHome);
