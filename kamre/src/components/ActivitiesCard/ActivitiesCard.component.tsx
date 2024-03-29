import { forwardRef } from "react";
import { useIonRouter } from "@ionic/react";

import ActivityCard from "@Components/ActivityCard";

import "./ActivitiesCard.style.scss";

const ActivitiesCard = forwardRef((_props, ref: any) => {
  const cardVariant = "small";
  const router = useIonRouter();

  const renderHolder = () => {
    return <div className="activities-card__holder" />;
  };

  const onCardClick = (route: string) => router.push(`/${route}`, "forward");

  const renderContext = () => {
    return (
      <div className="activities-card__wrapper">
        <ActivityCard
          variant={cardVariant}
          title="Małe kroki"
          onClick={() => onCardClick("smallsteps")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Oddychanie"
          onClick={() => onCardClick("breathing")}
        />
        <ActivityCard
          variant={cardVariant}
          title="5-4-3-2-1"
          onClick={() => onCardClick("fivetoone")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Wdzięczność"
          onClick={() => onCardClick("gratitude")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Film edukacyjny"
          onClick={() => onCardClick("eduvideo")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Przyjaciel stres"
          onClick={() => onCardClick("ytpage")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Złość"
          onClick={() => onCardClick("anger")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Świadomy prysznic"
          onClick={() => onCardClick("shower")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Stopy"
          onClick={() => onCardClick("feet")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Rower"
          onClick={() => onCardClick("bike")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Poprzedni dzień"
          onClick={() => onCardClick("previousday")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Przygotuj coś pysznego"
          onClick={() => onCardClick("preparemeal")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Dobre słowo"
          onClick={() => onCardClick("goodword")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Muzyka klasyczna"
          onClick={() => onCardClick("music")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Ciężary"
          onClick={() => onCardClick("weights")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Wizualizacja"
          onClick={() => onCardClick("visualization")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Ostudzenie napięcia"
          onClick={() => onCardClick("coldwater")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Co w duszy gra?"
          onClick={() => onCardClick("sounds")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Spacer"
          onClick={() => onCardClick("walking")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Trening Schultza"
          onClick={() => onCardClick("schultztraining")}
        />
        <ActivityCard
          variant={cardVariant}
          title="Mięsień kreatywności"
          onClick={() => onCardClick("creativity")}
        />
      </div>
    );
  };

  return (
    <div ref={ref} className="activities-card">
      {renderHolder()}
      {renderContext()}
    </div>
  );
});

export default ActivitiesCard;
