import React from "react";

interface MiniCardProps {
  title: string;
  description: string;
  imageUrl: string;
  backgroundColor: string;
  onCardClick: () => void;
}

const MiniCard: React.FC<MiniCardProps> = ({
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
    paddingBottom: "50%", 
    position: "relative", 
  };

  return (
    <div
      className="w-48 h-16 rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
      onClick={onCardClick}
      style={cardStyle}
    >
      <div
        className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center p-2"
        style={{ backgroundColor: backgroundColor, opacity: 0.85 }}
      >
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-white">{description}</p>
      </div>
    </div>
  );
};

export default MiniCard;
