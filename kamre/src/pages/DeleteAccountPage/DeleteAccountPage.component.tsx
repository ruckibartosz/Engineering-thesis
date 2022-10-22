import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  useIonAlert,
  IonCard,
  IonCardHeader,
} from "@ionic/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./DeleteAccountPage.style.scss";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import ResignDeleteAccountButton from "@Components/ResignDeleteAccountButton";
import FinalDeleteAccountButton from "@Components/FinalDeleteAccountButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(activityContent: String): Promise<void>;
}

const DeleteAccountPage: React.FC<IProps> = (props: IProps) => {
  const { onCreateActivityWithNoContent, onCreateActivityWithContent } = props;
  const [img, setImg] = useState("");
  const [presentAlert] = useIonAlert();
  const [showDeleteAccountButton, setShowDeleteAccountButton] = useState(true);
  const [showMigrateAccountButton, setShowMigrateAccountButton] =
    useState(true);

  useEffect(() => {
    setImg(MainImg);
  }, []);

  const onAlertButtonClick = (alertData: String) => {
    onCreateActivityWithContent(alertData);
  };

  const onProceedButtonClickWithContent = () => {
    presentAlert({
      header: "Dodaj swoje przemyślenia",
      buttons: [
        {
          text: "OK",
          handler: (alertData) => {
            onAlertButtonClick(alertData.content);
          },
        },
      ],
      inputs: [
        {
          name: "content",
          placeholder: "Wpisz je tutaj...",
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="deleteaccountpage">
          <BackButton defaultHref="/settings" />
          <div className="deleteaccountpage__wrapper">
            <div className="deleteaccountpage__wrapper_image">
              <Pet
                src={img}
                alt="Uśmiechnięta ośmiorniczka jpg"
                height="200px"
                paddingTop="20px"
                paddingBottom="20px"
              />
            </div>
            <div className="deleteaccountpage__wrapper_content">
              <IonCard>
                <div className="deleteaccountpage__wrapper_content__header">
                  <IonCardHeader>
                    <h2>Potwierdź usunięcie konta</h2>
                    <div className="deleteaccountpage__wrapper_content__header-description">
                      <span>Czy na pewno chcesz usunąć konto?</span>
                    </div>
                  </IonCardHeader>
                </div>
                <div className="deleteaccountpage__wrapper_content__buttons">
                  {showMigrateAccountButton && (
                    <ResignDeleteAccountButton
                      defaultHref="/settings"
                      title="Zrezygnuj"
                    />
                  )}
                  {showDeleteAccountButton && (
                    <FinalDeleteAccountButton
                      defaultHref="/home"
                      title="Usuń konto"
                    />
                  )}
                </div>
              </IonCard>
            </div>

            <CSSTransition
              in={!showDeleteAccountButton}
              timeout={300}
              classNames="swiper__delete-account-buttons"
              unmountOnExit
              onEnter={() => setShowDeleteAccountButton(false)}
              onExited={() => setShowDeleteAccountButton(true)}
            />

            <div className="final-buttons">
              <CancelButton
                title="Anuluj"
                onClick={onCreateActivityWithNoContent}
              />
              <SaveActivityButton
                title="Zapisz"
                onClick={onProceedButtonClickWithContent}
              />
            </div>
            <CSSTransition
              in={!showMigrateAccountButton}
              timeout={300}
              classNames="swiper__migrate-account-buttons"
              unmountOnExit
              onEnter={() => setShowMigrateAccountButton(false)}
              onExited={() => setShowMigrateAccountButton(true)}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DeleteAccountPage;
