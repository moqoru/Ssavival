import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import gameReducer from "./../../redux/reducers/game";

function ImagePlayer() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const intervalRef = useRef(null);

  const imageUrls = useSelector((state) => state.gameReducer.imageList);

  useEffect(() => {
    setCurrentImageUrl(imageUrls[0]);
  }, [imageUrls]);

  useEffect(() => {
    setCurrentImageUrl(imageUrls[currentImageIndex]);
  }, [currentImageIndex, imageUrls]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % imageUrls.length);
    }, 1000 / 20); // 20fps
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [imageUrls]);

  return (
    <img
      src={currentImageUrl}
      alt="image-player"
      style={{ width: "800px", height: "auto" }}
    />
  );
}

export default ImagePlayer;
