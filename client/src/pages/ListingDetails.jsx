import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const { listingId } = useParams();
  const navigate = useNavigate();
  const customerId = useSelector((state) => state?.user?._id);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/${listingId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch listing details");
      }

      const data = await response.json();
      setListing(data);

      // Check if the listing is already booked by the current user
      const bookingResponse = await fetch(`http://localhost:3001/bookings/status/${listingId}`);
      if (!bookingResponse.ok) {
        throw new Error("Failed to fetch booking status");
      }

      const bookingData = await bookingResponse.json();
      setIsBooked(bookingData.isBooked && bookingData.customerId === customerId);

      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        totalPrice: listing.price,
      };

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  const isCreator = listing?.creator?._id === customerId;

  return loading ? (
    <Loader />
  ) : listing ? (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing photo"
              key={item}
            />
          ))}
        </div>

        <h2>
          {listing.type} {listing.Genre}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.NormalTicket} Normal Tickets - {listing.VipTicket} Vip Ticket -{" "}
          {listing.SpecialPackage} Special Packages
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="profile"
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />
        <h3>Phone Number</h3>
        <p>{listing.phonenumber}</p>
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>Total price: {listing.price} Per Ticket</h2>
            {customerId ? (
              <button
                className="button"
                type="submit"
                onClick={handleSubmit}
                disabled={isBooked || isCreator}
              >
                {isBooked
                  ? "Already Booked"
                  : isCreator
                  ? "You cannot book your own Event"
                  : "BOOK"}
              </button>
            ) : (
              <p>Please login to book</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div>Failed to load listing details</div>
  );
};

export default ListingDetails;
