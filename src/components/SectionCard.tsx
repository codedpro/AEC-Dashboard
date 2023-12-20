import React from "react";
import { motion } from "framer-motion";

type Subcategory = {
  title: string;
  link: string;
};

type SectionCardProps = {
  title: string;
  image: string;
  link: string;
  subcategories?: Subcategory[];
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  image,
  link,
  subcategories = [],
}: SectionCardProps) => {
  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <a href={link}>
      <motion.div className="relative w-full inherit2">
        <div
          className="relative bg-center bg-cover w-full  h-56 md:h-56 lg:h-64 rounded-lg overflow-hidden shadow-lg"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={overlayStyle}
          />
          <div className="absolute inset-0 flex flex-col items-center text-white text-center p-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl  inherit2 font-semibold mb-2">
              {title}
            </h3>
            {subcategories.length > 0 && (
              <ul className="text-sm md:text-lg lg:text-xl space-y-2">
                {subcategories.map((subcategory, index) => (
                  <li key={index}>
                    <a href={subcategory.link} className="text-white">
                      {subcategory.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </a>
  );
};

export default SectionCard;
