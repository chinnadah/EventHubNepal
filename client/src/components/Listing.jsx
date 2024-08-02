import { useState, useEffect } from "react";
import "../styles/Listings.scss"
import ListingCard from "./ListingCard";
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const listings = useSelector((state) => state.listings);
  
    const getFeedListings = async () => {
      try {
        const response = await fetch("http://localhost:3001/properties", {
          method: "GET",
        });
  
        const data = await response.json();
        dispatch(setListings({ listings: data }));
        setLoading(false);
      } catch (err) {
        console.log("Fetch Listings Failed", err.message);
      }
    };
  
    useEffect(() => {
      getFeedListings();
    }, []);

    console.log(listings)
  
    return (
      <>
        {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              Genre,
              province,
              country,
              price,
              booking=false
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                Genre={Genre}
                province={province}
                country={country}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
      </>
    );
  };
  
export default Listings;
