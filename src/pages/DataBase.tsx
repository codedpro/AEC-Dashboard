import React, { useState } from "react";
import { NextPage } from "next";
import { AdminLayout } from "@layout";
import DynamicForm from "@components/DynamicForm";
import Card from "@components/Card";
import RigerForm from "@components/RigerForm";

const DataBase: NextPage = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const handleCardClick = (section: string) => {
    setSelectedSection(section);
  };
  const renderSelectedPage = () => {
    switch (selectedSection) {
      case "engineer":
        return <DynamicForm />;
      case "Riger":
        return (
           <RigerForm />
           
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      {selectedSection ? (
        renderSelectedPage()
      ) : (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            title="engineer Level"
            description="DataBase Form For engineer Level"
            imageUrl="/assets/img/engineerlevel.jpg"
            backgroundColor="rgb(0, 122, 204, 0.5)"
            onCardClick={() => handleCardClick("engineer")}
          /> 
          <Card 
            title="Riger Level"
            description="DataBase Form For Riger Level"
            imageUrl="/assets/img/Rigerlevel.jpg"
            backgroundColor="rgb(212, 44, 32, 0.5)"
            onCardClick={() => handleCardClick("Riger")}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default DataBase;
