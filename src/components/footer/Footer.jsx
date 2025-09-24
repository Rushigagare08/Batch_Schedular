import "./Footer.css";

const Footer=()=> {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-col">
          <img src="/linklogo.png" alt="Linkcode Logo" className="footer-logo" />
          <p>
            Linkcode Technologies is Pune’s No.1 IT training and placement
            institute, committed to shaping careers and bridging the gap between
            talent and opportunity.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Technical Training</a></li>
            <li><a href="#">LSDP Program</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Gallery/Events</a></li>
            <li><a href="#">Placements</a></li>
          </ul>
        </div>

        {/* Courses */}
        <div className="footer-col">
          <h3>Courses</h3>
          <ul>
            <li><a href="#">Java Full Stack</a></li>
            <li><a href="#">Python Full Stack</a></li>
            <li><a href="#">MEAN / MERN Stack</a></li>
            <li><a href="#">Mobile App Development</a></li>
            <li><a href="#">DevOps Development</a></li>
            <li><a href="#">Explore More</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p>
            OFFICE NO.12, 3RD FLOOR, BARVE MEMORIAL COMPLEX, OPPOSITE TO
            PANCHALI HOTEL, JM ROAD, SHIVAJINAGAR, PUNE, 411005.
          </p>
          <p>📞 +91 9604430489 | +91 7057336919</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>Copyright © 2025 LinkCode. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;
