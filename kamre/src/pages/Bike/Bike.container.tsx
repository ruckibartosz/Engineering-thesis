import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper } from "swiper/types";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import Bike from "./Bike.component";

const BikeContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = 5;
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createBikeWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Jazda na rowerze")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
      })
      .finally(() => {
        setIsLoading(false);
        history.replace("/home");
      })
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  const createBikeWithContent = () => {
    dispatch(
      createNote({
        contentName: "Jazda na rowerze",
        title: "Jazda na rowerze",
        description: "Co zaobserwowałeś_aś po aktywności? Jak się czułeś_aś?",
        hiddenDescription: "",
      }),
    );

    history.replace("/note");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 4) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1 || slide?.activeIndex === 2) {
      setImg(quote);
    }
    if (slide?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <Bike
      onCreateActivityWithNoContent={createBikeWithNoContent}
      onCreateActivityWithContent={createBikeWithContent}
      onProceedButtonClick={onProceedButtonClick}
      setToast={setToast}
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default BikeContainer;