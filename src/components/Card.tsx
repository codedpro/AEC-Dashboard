import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  backgroundColor: string;
  onCardClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  backgroundColor,
  onCardClick,
}) => {
  const cardStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    paddingBottom: "75%",
    position: "relative",
  };

  return (
    <div
      className="w-full rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 mb-6"
      onClick={onCardClick}
      style={cardStyle}
    >
      <div
        className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center "
        style={{ backgroundColor: backgroundColor, opacity: 0.85 }}
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white">{description}</p>
      </div>
    </div>
  );
};

export default Card;
