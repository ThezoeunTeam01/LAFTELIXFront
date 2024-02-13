import React, { useEffect, useState } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// sass 파일
import "../style/custom.scss";

const TopButton = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  if (!showButton) return null;

  return (
    <div className="scroll_container text-end m-4">
      <button id="top" className="topBtn" onClick={scrollToTop} type="button">
        <FontAwesomeIcon icon={faChevronUp} style={{color:`#fff`, fontSize: `20px`}} />
      </button>
    </div>
  );
};

export default TopButton;