import React from "react";
import "../styles/Footer.css"; // Import CSS for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2025 Site Name | <a href="/contact">Contact Us</a></p>
      </div>
      
      <div className="footer-right">
        <p className="footer-message">Stay in touch! Join our actualities:</p>
        <div className="newsletter">
          <input type="email" placeholder="Email" className="newsletter-input" />
          <button className="btn-subscribe">Subscribe</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
