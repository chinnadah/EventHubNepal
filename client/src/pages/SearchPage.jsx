import { useParams } from "react-router-dom";
import "../styles/List.scss"
import { useSelector,useDispatch  } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import {Navbar} from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { Search } from "@mui/icons-material";

const SearchPage = () => {
  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)

  const dispatch = useDispatch()

  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/search/${Search}`, {
        method: "GET"
      })

      const data = await response.json()
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
    }
  }

  useEffect(() => {
    getSearchListings()
  }, ['Search'])
  
  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>

      <div className="list">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            Genre,
            province,
            country,
            price,
            booking = false,
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
    </>
  );
}

export default SearchPage