import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import SearchPage from "./pages/SearchPage";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./pages/contactus";
import UpdateProfilePage from "./pages/profile"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/:userId/profile" element={< UpdateProfilePage />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
