import React from "react";
import { IonContent, IonPage, IonInput } from "@ionic/react";

import BackButton from "@Components/BackButton";
import SaveButton from "@Components/SaveButton";
import Header from "@Components/Header";

interface IProps {
  onInputChange: (e: any) => void;
  onSaveButtonClick(): Promise<void>;
}

const Anger: React.FC<IProps> = (props: IProps) => {
  const { onInputChange, onSaveButtonClick } = props;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="title">
          <BackButton defaultHref="/home" />
          <Header title="Dlaczego jesteś zły / zła?" subtitle="" />
        </div>
        <div>
          <IonInput
            type="text"
            placeholder="Type here"
            onIonChange={onInputChange}
          />
        </div>
        <div className="ion-text-center">
          <SaveButton text="Zapisz" type="submit" onClick={onSaveButtonClick} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Anger;