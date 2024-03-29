import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { BsArrowRepeat } from "react-icons/bs";

import { ToastType } from "@Types/toast.type";
import Pet from "@Components/Pet";
import CancelButton from "@Components/CancelButton";
import VerticalProgressBar from "@Components/VerticalProgressBar";
import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";

import "swiper/css";
import "./FiveToOne.style.scss";

interface IProps {
  currentSlide: number;
  slideElements: number;
  img: string;
  swiper: any;
  isLoading: boolean;
  toast: ToastType;
  setSwiper(swiper: SwiperType): void;
  setToast(toast: ToastType): void;
  handleRepeatButtonClick(): void;
  handleFinishButtonClick(): void;
  onSlideChangeHandler(): void;
  onProceedButtonClick(): void;
}

const FiveToOne: React.FC<IProps> = (props: IProps) => {
  const {
    currentSlide,
    slideElements,
    img,
    swiper,
    toast,
    isLoading,
    setSwiper,
    setToast,
    handleRepeatButtonClick,
    handleFinishButtonClick,
    onSlideChangeHandler,
    onProceedButtonClick,
  } = props;

  const renderHeader = () => {
    if (swiper?.activeIndex === 7) return null;

    return (
      <div className="fiveToOne__header">
        <BackButton />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="fiveToOne__swiper">
        <Swiper
          direction="vertical"
          effect="fade"
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={onSlideChangeHandler}
          height={200}
          spaceBetween={20}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">5-4-3-2-1</h4>
              <p className="swiper-slide__paragraph">
                Ta metoda pomaga zmniejszyć stres i napięcie, również w atakach
                paniki.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Skupiaj się na wypisanych kolejno rzeczach. Daj sobie tyle czasu
                ile chcesz. Oddychaj przy tym powoli.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">5</h4>
              <p className="swiper-slide__paragraph">
                Rozejrzyj się i spróbuj nazwać pięć przedmiotów wokół siebie.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">4</h4>
              <p className="swiper-slide__paragraph">
                Teraz dotknij 4 rzeczy, poczuj ich fakturę, czy są przyjemne w
                dotyku, zimne, szorstkie ...
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">3</h4>
              <p className="swiper-slide__paragraph">
                Wytęż słuch i nazwij trzy rzeczy, które słyszysz.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">2</h4>
              <p className="swiper-slide__paragraph">
                Daj się ponieść zapachom i poczuj dwa różne zapachy.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">1</h4>
              <p className="swiper-slide__paragraph">
                Na koniec, opisz smak, jaki aktualnie czujesz na języku.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Udało się!</h4>
              <p className="swiper-slide__paragraph">
                Jeżeli czujesz potrzebę, powtórz schemat ćwiczenia jeszcze raz.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  const renderProgressBar = () => {
    return (
      <div className="vertical-progress-bar__wrapper">
        <VerticalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderProceedButton = () => {
    if (swiper?.activeIndex === 7) {
      return (
        <div className="fiveToOne__final-buttons">
          <ProceedButton
            title="Powtórz"
            onClick={handleRepeatButtonClick}
            icon={<BsArrowRepeat size={25} />}
          />
          <CancelButton title="Zakończ" onClick={handleFinishButtonClick} />
        </div>
      );
    }

    return (
      <div>
        <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />
      </div>
    );
  };

  const renderImage = () => {
    return (
      <Pet
        src={img}
        alt="Uśmiechnięta ośmiorniczka jpg"
        height="200px"
        paddingTop="20px"
        paddingBottom="20px"
      />
    );
  };

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="fiveToOne__loader"
        isOpen={isLoading}
        message="Zapisywanie, proszę czekać"
      />
    );
  };

  const renderToast = () => {
    const { isOpen, message } = toast;

    return (
      <IonToast
        isOpen={isOpen}
        onDidDismiss={() => setToast({ isOpen: false, message: "" })}
        message={message}
        duration={2500}
        position="top"
      />
    );
  };

  const renderContext = () => {
    return (
      <div className="fiveToOne__wrapper">
        {renderImage()}
        {renderSwiper()}
        {renderProceedButton()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderToast()}
        {renderLoader()}
        {renderHeader()}
        <div className="fiveToOne">
          {renderProgressBar()}
          {renderContext()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(FiveToOne);
