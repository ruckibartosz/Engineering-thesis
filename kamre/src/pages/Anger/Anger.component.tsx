import React from "react";
import {
  IonContent,
  IonPage,
  IonLoading,
  IonToast,
  CreateAnimation,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { IoMdAdd } from "react-icons/io";

import { ToastType } from "@Types/toast.type";
import { swiperDefaultOptions } from "@Constants/swiper.constants";
import { fadeIn } from "@Constants/animations.constants";
import Input from "@Components/Input";
import CancelButton from "@Components/CancelButton";
import BackButton from "@Components/BackButton";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import Pet from "@Components/Pet";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import PetHappy from "@Assets/happy.png";

import "swiper/css";
import "./Anger.style.scss";

interface IProps {
  isLoading: boolean;
  currentSlide: number;
  slideElements: number;
  img: string;
  toast: ToastType;
  isAddingDisabled: boolean;
  swiper: any;
  slides: React.ReactElement[];
  slidesInputsValue: string[];
  pageController: {
    isMainContextVisible: boolean;
    isAngerListVisible: boolean;
    isFinalVisible: boolean;
  };
  setSwiper(swiper: SwiperType): void;
  setToast(toast: ToastType): void;
  onCreateActivityWithContent(): void;
  onCreateActivityWithNoContent(): Promise<void>;
  onProceedButtonClick(): void;
  onAddSlide(): void;
  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onContinueButtonClick(): void;
  onDestroyButtonClick(): void;
  onSlideChangeHandler(): void;
}

const Anger: React.FC<IProps> = (props: IProps) => {
  const {
    currentSlide,
    slideElements,
    pageController,
    img,
    slides,
    isAddingDisabled,
    swiper,
    slidesInputsValue,
    isLoading,
    toast,
    onProceedButtonClick,
    onAddSlide,
    onContinueButtonClick,
    onInputChange,
    onDestroyButtonClick,
    setToast,
    onCreateActivityWithContent,
    onCreateActivityWithNoContent,
    setSwiper,
    onSlideChangeHandler,
  } = props;

  const renderHeader = () => {
    const { isFinalVisible } = pageController;
    if (swiper?.activeIndex >= 3 || isFinalVisible)
      return <div className="anger__header" />;

    return (
      <div className="anger__header">
        <BackButton />
      </div>
    );
  };

  const renderGeneratedSlides = () => {
    return slides.map((slide) => {
      return slide;
    });
  };

  const renderSwiper = () => {
    return (
      <div className="anger__swiper">
        <Swiper
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={onSlideChangeHandler}
          height={190}
          {...swiperDefaultOptions}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Złość</h4>
              <p className="swiper-slide__paragraph">
                To ćwiczenie pozwoli Ci świadomie zarządzać swoją złością.
                Poprzez złość możemy uświadomić sobie swoje granice, pokazać na
                co się zgadzamy, a na co nie.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Grrr! Rozładuj swoją złość! Ale nie tak jak myślisz, tylko nie
                rzucaj telefonem! Wypisz tutaj wszystko co powoduje u Ciebie
                frustrację, nerwowość lub po prostu co Cię wkurza!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Co Cię złości?</h4>
              <p className="swiper-slide__paragraph">
                <Input
                  type="text"
                  placeholder="Wpisz tutaj..."
                  onChange={onInputChange}
                />
              </p>
            </div>
          </SwiperSlide>
          {renderGeneratedSlides()}
        </Swiper>
      </div>
    );
  };

  const renderProgressBar = () => {
    return (
      <div>
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderButton = () => {
    if (swiper?.activeIndex >= 3)
      return (
        <div className="anger__continue-buttons">
          <CancelButton onClick={onContinueButtonClick} title="Zakończ" />
          <ProceedButton
            title="Dodaj"
            onClick={onAddSlide}
            disabled={isAddingDisabled}
            icon={<IoMdAdd size={25} />}
          />
        </div>
      );

    if (swiper?.activeIndex === 2)
      return (
        <ProceedButton
          title="Dodaj"
          onClick={onAddSlide}
          disabled={isAddingDisabled}
          icon={<IoMdAdd size={25} />}
        />
      );

    return <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />;
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

  const renderAngerDataList = () => {
    return slidesInputsValue.map((val) => {
      const index = `anger-item_${new Date().getTime()}`;
      return <li key={index}>{val} </li>;
    });
  };

  const renderAngerList = () => {
    const { isAngerListVisible } = pageController;

    return (
      isAngerListVisible && (
        <CreateAnimation play={isAngerListVisible} {...fadeIn}>
          <div className="anger__list">
            <Pet
              src={img}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <h4>Wkurza mnie:</h4>
            <ul>{renderAngerDataList()}</ul>
            <p>
              To czas, żeby dokonać analizy, a następnie wyrzucić złość za
              siebie. Dlaczego się tak czujesz? Jak Twoim zdaniem te sytuacje
              powinny być rozwiązane?
            </p>
            <ProceedButton
              title="Wyrzucam z siebie"
              onClick={onDestroyButtonClick}
            />
          </div>
        </CreateAnimation>
      )
    );
  };

  const renderContext = () => {
    const { isMainContextVisible } = pageController;

    return (
      isMainContextVisible && (
        <div className="anger__wrapper">
          {renderImage()}
          {renderProgressBar()}
          {renderSwiper()}
          {renderButton()}
        </div>
      )
    );
  };

  const renderFinalStep = () => {
    const { isFinalVisible } = pageController;
    return (
      isFinalVisible && (
        <CreateAnimation
          play={isFinalVisible}
          duration={2000}
          fromTo={{
            property: "opacity",
            fromValue: "0",
            toValue: "1",
          }}
        >
          <div className="anger__wrapper">
            <Pet
              src={PetHappy}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <h4>Gratulacje!</h4>
            <p>
              Uświadamiajmy sobie swoją złość, pozwalajmy się jej ujawniać, ale
              nie bądźmy agresywni. Pilnujmy, by złość wyrażała nas i nasz
              wewnętrzny stan w sposób bezpieczny dla nas samych i dla innych.
            </p>
            <div className="anger__final-buttons">
              <CancelButton
                onClick={onCreateActivityWithNoContent}
                title="Zakończ"
              />
              <SaveActivityButton
                title="Zapisz"
                onClick={onCreateActivityWithContent}
              />
            </div>
          </div>
        </CreateAnimation>
      )
    );
  };

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="anger__loader"
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

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderHeader()}
        <div className="anger">
          {renderLoader()}
          {renderToast()}
          {renderContext()}
          {renderAngerList()}
          {renderFinalStep()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Anger);
