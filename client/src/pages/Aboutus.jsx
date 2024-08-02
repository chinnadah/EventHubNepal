import React from 'react';
import "../styles/Aboutus.scss"
import {Navbar} from "../components/Navbar"
import Footer from "../components/Footer"

function AboutUs() {
  return (
    <>
    <Navbar/>
    <div className="container">
      <h1>About Event Hub Nepal</h1>
      <p>Welcome to Event Hub Nepal, your premier destination for finding the perfect venue for any occasion in the heart of the Himalayas.</p>
      <p>At Event Hub Nepal, we understand the significance of selecting the ideal space for your event, whether it's a wedding, corporate meeting, birthday party, or any other special gathering. Our platform is designed to simplify the venue selection process, offering an extensive database of event spaces, banquet halls, conference rooms, and unique locations across Nepal.</p>
      <h2>Our Mission</h2>
      <p>Our mission is to connect event organizers with venue owners, providing a seamless experience for both parties. We aim to empower individuals to find the perfect event space that meets their needs and budget, while also helping venue owners efficiently reach potential clients.</p>
      <h2>What Sets Us Apart</h2>
      <ul>
        <li><strong>Extensive Listings:</strong> Our wide range of listings includes spaces suitable for various types of events, catering to diverse requirements.</li>
        <li><strong>User-Friendly Interface:</strong> Our intuitive platform ensures a smooth browsing experience, allowing users to easily filter their search results based on location, capacity, and type of event.</li>
        <li><strong>Dedicated Support:</strong> Our team of professionals is committed to providing exceptional customer support, assisting users throughout their journey of finding the perfect venue.</li>
      </ul>
      <p>Whether you're looking for an elegant banquet hall in Kathmandu, a scenic outdoor space in Pokhara, or a modern conference room in any major city, Event Hub Nepal is here to meet your event planning needs. Join our community today and embark on a seamless journey towards organizing unforgettable events in the breathtaking landscapes of Nepal.</p>
      <p>Thank you for choosing Event Hub Nepal as your trusted partner in your quest for the perfect event venue. Happy event planning!</p>
    </div>
    <Footer/>
    </>
  );
}

export default AboutUs;
