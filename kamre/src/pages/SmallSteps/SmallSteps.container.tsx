import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Input from "@Components/Input";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import GoodWord from "./SmallSteps.component";

const SmallStepsContainer: React.FC = () => {
  const [canSwipe, setCanSwipe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);
  const [slideInputValue, setSlideInputValue] = useState("");
  const [slidesInputsValue, setSlidesInputsValue] = useState<string[]>([]);
  const [isAddingDisabled, setIsAddingDisabled] = useState(true);
  const [pageController, setPageController] = useState({
    isMainContextVisible: true,
    isFinalVisible: false,
  });
  const history = useHistory();
  const slideElements = 3;

  const generateKey = () => {
    return `slide_${new Date().getTime()}`;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setSlideInputValue(value);
    setIsAddingDisabled(true);
    if (value.length > 0) setIsAddingDisabled(false);
  };

  const renderSlide = (): React.ReactElement => {
    return (
      <SwiperSlide key={generateKey()}>
        <div className="swiper-slide__wrapper">
          <h4 className="swiper-slide__header">Jestem z siebie dumny, bo:</h4>
          <p className="swiper-slide__paragraph">
            <Input
              type="text"
              placeholder="Wpisz coś miłego..."
              onChange={onInputChange}
            />
          </p>
        </div>
      </SwiperSlide>
    );
  };

  const onAddSlide = () => {
    setCanSwipe(false);
    swiper?.slideNext();
    setIsAddingDisabled(true);
    setSlidesInputsValue((prevState) => [...prevState, slideInputValue]);
    setSlides((prevState) => [...prevState, renderSlide()]);
  };

  const onContinueButtonClick = () =>
    setPageController({ isMainContextVisible: false, isFinalVisible: true });

  const onSaveActivityWithContent = async () => {
    if (slideInputValue.length > 0) {
      setSlidesInputsValue((prevState) => [...prevState, slideInputValue]);
    }
    const currentDate = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithContent(currentDate, slidesInputsValue, "Małe kroki")
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

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    if (swiper?.activeIndex < 2) setCurrentSlide(swiper?.activeIndex);

    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  const onSwipeHandle = () => {
    if (swiper?.activeIndex === 1) setImg(quote);
    if (swiper?.activeIndex <= 2) setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex > 1) swiper.allowTouchMove = false;
  };

  useEffect(() => {
    setSlides((prevState) => [...prevState, renderSlide()]);
  }, []);

  return (
    <GoodWord
      pageController={pageController}
      canSwipe={canSwipe}
      isLoading={isLoading}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      slides={slides}
      swiper={swiper}
      toast={toast}
      isAddingDisabled={isAddingDisabled}
      setSwiper={setSwiper}
      setToast={setToast}
      onProceedButtonClick={onProceedButtonClick}
      onAddSlide={onAddSlide}
      onInputChange={onInputChange}
      onSwipeHandle={onSwipeHandle}
      onSaveActivityWithContent={onSaveActivityWithContent}
      onContinueButtonClick={onContinueButtonClick}
    />
  );
};

export default SmallStepsContainer;