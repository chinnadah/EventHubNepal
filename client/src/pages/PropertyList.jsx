import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;

  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method: "GET"
      });
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, [])

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await fetch(`http://localhost:3001/listings/${listingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Remove the deleted listing from the property list in the Redux store
        const updatedPropertyList = propertyList.filter(
          (property) => property._id !== listingId
        );
        dispatch(setPropertyList(updatedPropertyList));
      } else {
        console.error("Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Your Event List</h1>
      <div className="list">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            Genre,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={_id}
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              Genre={Genre}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
              onDelete={() => handleDeleteListing(_id)} // Pass delete handler function
            />
          )
        )}
      </div>
      <Footer/>
    </>
  );
};

export default PropertyList;
