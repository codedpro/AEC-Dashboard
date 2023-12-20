import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

interface CongratsPageProps {
  text: string;
  backgroundColor: string;
  textColor: string;
  confettiColors: string[];
  numberOfConfetti: number;
  redirectTo: string;
}

const ConfettiRain: React.FC = () => {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={200}
    />
  );
};

const CongratsPage: React.FC<CongratsPageProps> = ({
  text,
  backgroundColor,
  textColor,
  confettiColors,
  numberOfConfetti,
  redirectTo,
}) => {
  const router = useRouter();

  const pageStyle = {
    backgroundColor,
  };

  const textStyle = {
    color: textColor,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.reload();
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [router, redirectTo]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={pageStyle}
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl text-center mx-4 sm:mx-8 lg:mx-16 xl:mx-32"
        style={textStyle}
      >
        {text}
      </motion.div>
      <ConfettiRain />
    </div>
  );
};

export default CongratsPage;
