import { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  Genre,
  province,
  country,
  price,
  totalPrice,
  booking,
}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the previous slide
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  // Move to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  // Function to add or remove the listing from the user's wishlist
  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else {

      alert("You cannot add your own listing to the wishlist.");
    }
  };

  return (
    <div className="listing-card" onClick={() => navigate(`/properties/${listingId}`)}>
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>
        {Genre}, {province}, {country}
      </h3>
      {!booking ? (
        <>
          <p>
            <span>Rs{price}</span> per Ticket
          </p>
        </>
      ) : (
        <>
          <p>
            <span>Rs{totalPrice}</span> total
          </p>
        </>
      )}
      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;