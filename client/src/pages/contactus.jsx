import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Phone } from '@mui/icons-material';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/contactus.scss";

const ContactUs = () => {
  return (
    <>
      <Navbar/>
      <div className="contact-us-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, feel free to reach out:</p>
        <ul>
          <li>
            <EmailIcon /> <a href="mailto:ro1subedi@gmail.com">ro1subedi@gmail.com</a>
          </li>
          <li>
            <Phone /> +977-9821376023
          </li>
          <li>Address: Kathmandu, Nepal</li>
          <li>
            <FacebookIcon /> <a href="https://www.facebook.com/narbu.tamang.37">Aarohan Subedi</a>
          </li>
          <li>
            <InstagramIcon /> <a href="https://www.instagram.com/a.a.r.o.h.a.n/">Aarohan Subedi</a>
          </li>
        </ul>
        <p>We are here to assist you with any inquiries you may have. We strive to provide the best possible support to our customers.</p>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUs;
