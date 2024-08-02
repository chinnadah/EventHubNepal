import "../styles/CreateListing.scss";
import { Navbar } from "../components/Navbar";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { IoIosImages } from "react-icons/io"
import { BiTrash } from "react-icons/bi"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

const CreateListing = () => {

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    Venue: "",
    Genre: "",
    province: "",
    country: "",
  });
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [NormalTicket, setNormalTicket] = useState(1);
  const [VipTicket, setVipTicket] = useState(1);
  const [SpecialPackage, setSpecialPackage] = useState(1);

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove));
  };
  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("Venue", formLocation.Venue);
      listingForm.append("Genre", formLocation.Genre);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("NormalTicket", NormalTicket);
      listingForm.append("VipTicket", VipTicket);
      listingForm.append("SpecialPackage", SpecialPackage);
      listingForm.append("title", formDescription.title);
      listingForm.append("phonenumber", formDescription.phonenumber);
      listingForm.append("description", formDescription.description);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
      /* Send a POST request to server */
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm,
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  }
  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Publish Your Event</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Tell us about your Event</h2>
            <hr />
            <h3>Where's your Event located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Venue,Hall etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Venue"
                  name="Venue"
                  value={formLocation.aptoffice}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Genre</p>
                <input
                  type="text"
                  placeholder="Genre"
                  name="Genre"
                  value={formLocation.Genre}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your event</h3>
            <div className="basics">
              <div className="basic">
                <p>Normal Tickets</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => { NormalTicket > 1 && setNormalTicket(NormalTicket - 1); }}
                    sx={{
                      fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{NormalTicket}</p>
                  <AddCircleOutline
                    onClick={() => { setNormalTicket(NormalTicket + 1); }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Vip Tickets</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => { VipTicket > 1 && setVipTicket(VipTicket - 1); }}
                    sx={{
                      fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{VipTicket}</p>
                  <AddCircleOutline
                    onClick={() => { setVipTicket(VipTicket + 1); }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Special Packages </p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      SpecialPackage > 1 && setSpecialPackage(SpecialPackage - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{SpecialPackage}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setSpecialPackage(SpecialPackage + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <h3>Add some photos of your place</h3>
          <DragDropContext onDragEnd={handleDragPhoto}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <div className="photos" ref={provided.innerRef} {...provided.droppableProps}>
                  {photos.length < 1 && (
                    <>
                      <input id="image" type="file" style={{ display: "none" }} accept="image/*" onChange={handleUploadPhotos} multiple />
                      <label htmlFor="image" className="alone">
                        <div className="icon"> <IoIosImages style={{ fontSize: "200px" }} /> </div>
                        <p>Upload from your device</p>
                      </label>
                    </>
                  )}

                  {photos.length >= 1 && (
                    <>
                      {photos.map((photo, index) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      <input
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <label htmlFor="image" className="together">
                        <div className="icon">
                          <IoIosImages />
                        </div>
                        <p>Upload from your device</p>
                      </label>
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <h3 style={{ marginTop: "20px" }}>Your Event Title phonenumber and description of your Event?</h3>
          <div className="description">
            <p>Title</p>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChangeDescription}
              value={formDescription.title}
              required
              style={{
                width: "50%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                height: "30px"
              }}
            />
            <p>Phone number</p>
            <input
              type="tel"
              placeholder="phonenumber"
              name="phonenumber"
              onChange={handleChangeDescription}
              value={formDescription.phonenumber}
              required
              style={{
                width: "30%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                height: "30px"
              }}
            />
            <p>Description</p>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChangeDescription}
              value={formDescription.description}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                height: "100px"
              }}
            />
            <p>Now, set your PRICE</p>
            <span style={{ marginRight: "5px" }}>Rupess</span>
            <input
              type="number"
              placeholder="100"
              name="price"
              className="price"
              onChange={handleChangeDescription}
              value={formDescription.price}
              required
              style={{
                width: "10%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                height: "30px"
              }}
            />
          </div>
          <button className="submit_btn" type="submit">
            Upload Your Event
          </button>
        </form >
      </div >
      <Footer />
    </>
  );
};

export default CreateListing;
