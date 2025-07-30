import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function HomeSectionCarousel({ data, sectionName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 4 },
    1024: { items: 6.5 },
  };

  let carouselRef = React.useRef(null);

  const slidePrev = () => carouselRef.current.slidePrev();
  const slideNext = () => carouselRef.current.slideNext();

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.map((item, index) => (
    <div key={index} className="px-2">
      <HomeSectionCard product={item} />
    </div>
  ));

  // Dynamically adjust max visible items for button logic
  const getVisibleItemsCount = () => {
    const width = window.innerWidth;
    if (width < 720) return 2;
    if (width < 1024) return 4;
    return 6.5;
  };

  return (
    <div className="bg-[#F1D4A9] lg:p-5 p-2 rounded-xl">
      <h2 className="text-2xl font-extrabold text-gray-800 py-2">{sectionName}</h2>
      <div className="relative lg:p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
        />

        {/* Next Button (hidden on mobile) */}
        {activeIndex < data.length - getVisibleItemsCount() && (
          <div className="hidden sm:block">
            <Button
              variant="outlined"
              onClick={slideNext}
              sx={{
                position: "absolute",
                top: "8rem",
                right: "0rem",
                transform: "translateX(50%) rotate(90deg)",
                bgcolor: "transparent",
                borderColor: "#D8A353",
                color: "#D8A353",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 0 10px rgba(216,163,83,0.4)",
                "&:hover": {
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  bgcolor: "#D8A353",
                },
                minWidth: "40px",
                height: "40px",
              }}
              aria-label="next"
            >
              <KeyboardArrowLeftIcon
                sx={{
                  transform: "rotate(90deg)",
                  color: "inherit",
                }}
              />
            </Button>
          </div>
        )}

        {/* Prev Button (hidden on mobile) */}
        {activeIndex > 0 && (
          <div className="hidden sm:block">
            <Button
              variant="outlined"
              onClick={slidePrev}
              sx={{
                position: "absolute",
                top: "8rem",
                left: "0rem",
                transform: "translateX(-50%) rotate(-90deg)",
                bgcolor: "transparent",
                borderColor: "#D8A353",
                color: "#D8A353",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 0 10px rgba(216,163,83,0.4)",
                "&:hover": {
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  bgcolor: "#D8A353",
                },
                minWidth: "40px",
                height: "40px",
              }}
              aria-label="previous"
            >
              <KeyboardArrowLeftIcon
                sx={{
                  transform: "rotate(90deg)",
                  color: "inherit",
                }}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeSectionCarousel;
