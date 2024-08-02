import "../styles/Footer.scss"
import { LocalPhone, Email } from "@mui/icons-material"
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/"><img src="/assets/logo.jpg" alt="logo"  className="round-logo" /></a>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+977 9821376023</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>ro1subedi@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Footer