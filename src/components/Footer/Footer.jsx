import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* MAIN CONTENT */}
        <div className="footer-content">
          
          {/* COLUMN 1: LOGO & ABOUT */}
          <div className="footer-column">
            <div className="footer-logo">
              <span className="footer-logo-emoji">🎮</span>
              <h3 className="footer-logo-text">HaxGames</h3>
            </div>
            <p className="footer-description">
              Your ultimate destination for downloading and discovering the latest games across all platforms. Explore thousands of titles and find your next favorite game.
            </p>
            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"></path>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a6 6 0 00-6 6v4h-2v4h2v6h4v-6h3l1-4h-4V8a2 2 0 012-2h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <circle cx="17.5" cy="6.5" r="1.5"></circle>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Youtube" aria-label="Youtube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Github" aria-label="Github">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.186.092-.921.35-1.545.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: PLATFORMS */}
          <div className="footer-column">
            <h4 className="footer-column-title">Platforms</h4>
            <ul className="footer-links">
              <li><Link to="/nsp">NSP Games</Link></li>
              <li><Link to="/switch">Nintendo Switch</Link></li>
              <li><Link to="/pc">PC Games</Link></li>
              <li><Link to="/mac">Mac Games</Link></li>
              <li><Link to="/android">Android Games</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: CATEGORIES */}
          <div className="footer-column">
            <h4 className="footer-column-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/nsp/action">Action</Link></li>
              <li><Link to="/nsp/rpg">RPG</Link></li>
              <li><Link to="/nsp/adventure">Adventure</Link></li>
              <li><Link to="/pc/strategy">Strategy</Link></li>
              <li><Link to="/nsp/puzzle">Puzzle</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: COMPANY */}
          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/news">News & Updates</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* COLUMN 5: LEGAL */}
          <div className="footer-column">
            <h4 className="footer-column-title">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/dmca">DMCA</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        {/* CONTACT CTA */}
        <div className="footer-contact-cta">
          <div className="contact-cta-text">
            <h3 className="contact-cta-title">Need Help?</h3>
            <p className="contact-cta-description">
              Have questions or need support? We're here to help!
            </p>
          </div>
          <Link to="/contact" className="contact-cta-button">
            Contact Us
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="footer-divider" />

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} HaxGames. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/sitemap">Sitemap</Link>
            <span>•</span>
            <Link to="/accessibility">Accessibility</Link>
            <span>•</span>
            <Link to="/support">Support</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}