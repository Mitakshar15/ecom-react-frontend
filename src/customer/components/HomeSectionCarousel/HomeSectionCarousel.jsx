import  { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { mens_kurta } from "../../../Data/Mens_kurta";


const HomeSectionCarousel = ({data_items,section_name}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1},
    720: { items: 3 },
    1024: { items: 5.5 },
  };
  const slidePrev = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      carouselRef.current.slideTo(newIndex);
    }
  }

  const slideNext = () => {
    if (activeIndex < 30) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      carouselRef.current.slideTo(newIndex);
    }
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const items = data_items
    .slice(0, 30)
    .map((item) => 
           <HomeSectionCard product={item} />

      );

  return (
    <div className="border">
       <h2 className="text-2xl font-extrabold text-gray-800 py-5">{section_name}</h2>
      <div className="relative p-5 ">
        <AliceCarousel
        responsive={responsive}
          items={items}
          disableButtonsControls
          disableDotsControls
          activeIndex={activeIndex}
          onSlideChanged={syncActiveIndex}
          ref={carouselRef}
        />

        { activeIndex!==items.length-5 && 
          <Button
            variant="contained"
            className="z-50 bg-[]"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(-90deg)",
            }}
            color="white"
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(-90deg)", color: "black" }}
            />
          </Button>
        }
        
        {activeIndex!== 0 && <Button
          onClick={slidePrev}
          variant="contained"
          className="z-50 bg-[]"
          sx={{
            position: "absolute",
            top: "8rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(-90deg)",
          }}
          color="white"
          aria-label="next"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>}
        
      </div>
    </div>
  );
};

export default HomeSectionCarousel;

