import React from 'react';
import './css/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>PollBag</h3>
          <p>Contact: +91 98915 03557</p>
          <p>Email: <a href="mailto:manoj@claim-bridge.com">manoj@claim-bridge.com</a></p>
          <p>Address: H-87, Second Floor, Block H, Sector 63, Noida, UP</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/security">Security</a></li>
            <li><a href="/who-use-pollbag">Who Uses PollBag?</a></li>
            <li><a href="/sitemap">Sitemap</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Help & Support</h3>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
          </ul>
          <p>For technical assistance regarding voting, please call: <strong>+91 8311283734</strong></p>
          <p>Availability: Mon-Fri, 10:30 AM to 7:00 PM</p>
          <p>For weekend assistance, please email: <a href="mailto:care@claim-bridge.com">care@claim-bridge.com</a></p>
        </div>
        <div className="footer-section">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Join our subscription to receive updates and news from our team.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="example@gmail.com" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p className="copyright">&copy; 2024 PollBag. All rights reserved.</p>
    </footer>
  );
}

export default Footer;