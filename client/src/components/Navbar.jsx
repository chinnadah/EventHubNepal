import React from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import "../styles/Navbar.scss";

export const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.jpg" alt="logo" className="round-logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => navigate(`/properties/search/${search}`)}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            {" "}
            Upload your Event
          </a>
        ) : (
          <a href="/login" className="host">
            {" "}
            Upload your Event{" "}
          </a>
        )}

        <a href="/aboutus" className="navbar_right_about">
          About Us
        </a>

        <a href="/contactus" className="navbar_right_contact">
          Contact Us
        </a>

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Booking List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Event List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to={`/${user._id}/profile`}>Change Profile</Link>
            <Link to="/create-listing">Upload Your Event</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
