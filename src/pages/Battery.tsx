import React, { useState } from "react";
import { NextPage } from "next";
import { AdminLayout } from "@layout";
import MiniCard from "@components/minicard";
import BatteryForm from "@components/BatteryForm";
import NianForm from "@components/NianForm";
import MiniShelterForm from "@components/MiniShelterForm";
import APM30Form from "@components/APM30Form";

interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  backgroundColor: string;
  onClick: () => void;
}

const Battery: NextPage = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleCardClick = (section: string) => {
    setSelectedSection(section);
  };

  const cards: CardData[] = [
    {
      title: "Eltek",
      description: "Form for Eltek",
      imageUrl: "/assets/img/Eltek.jpg",
      backgroundColor: "rgba(0, 122, 204, 0.7)",
      onClick: () => handleCardClick("Eltec"),
    },
    {
      title: "Nian",
      description: "Form For Nian",
      imageUrl: "/assets/img/Nian.jpeg",
      backgroundColor: "rgba(212, 44, 32, 0.7)",
      onClick: () => handleCardClick("Nian"),
    },
    {
      title: "Mini shelter",
      description: "Form for Mini Shelter",
      imageUrl: "/assets/img/Minishelter.jpeg",
      backgroundColor: "rgba(255, 165, 0, 0.7)", 
      onClick: () => handleCardClick("MiniShelter"),
    },
    {
      title: "APM 30",
      description: "Form for APM 30",
      imageUrl: "/assets/img/APM30.jpeg",
      backgroundColor: "rgba(128, 0, 128, 0.7)", 
      onClick: () => handleCardClick("APM30"),
    },
  ];

  const renderSelectedPage = () => {
    switch (selectedSection) {
      case "Eltec":
        return <BatteryForm />;
      case "Nian":
        return <NianForm />;
      case "MiniShelter":
        return <MiniShelterForm />;
      case "APM30":
        return <APM30Form />;
      default:
        return null;
    }
  };
  return (
    <AdminLayout>
      {selectedSection ? (
        renderSelectedPage()
      ) : (
        <div className="flex flex-col items-center md:flex-row justify-between mt-2">
          {cards.map((card, index) => (
            <MiniCard
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              backgroundColor={card.backgroundColor}
              onCardClick={card.onClick}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default Battery;
