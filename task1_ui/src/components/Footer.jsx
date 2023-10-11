export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copy">&copy; DUGIMAIL. All rights reserved.</p>
        <p className="footer__contact">
          If you have any questions please contact us{' '}
          <a href="mailto:sabrihakuli@outlook.com">sabrihakuli@outlook.com</a>
        </p>
        <ul className="footer__networks">
          <li className="footer__network">
            <a href="/" className="footer__network-link">
              <img
                src="img/social_networks/facebook.svg"
                alt="facebook"
                className="footer__network-icon"
              />
            </a>
          </li>
          <li className="footer__network">
            <a href="/" className="footer__network-link">
              <img
                src="img/social_networks/dribble.svg"
                alt="dribble"
                className="footer__network-icon"
              />
            </a>
          </li>
          <li className="footer__network">
            <a href="/" className="footer__network-link">
              <img
                src="img/social_networks/linkedin.svg"
                alt="linkedin"
                className="footer__network-icon"
              />
            </a>
          </li>
          <li className="footer__network">
            <a href="/" className="footer__network-link">
              <img
                src="img/social_networks/instagram.svg"
                alt="instagram"
                className="footer__network-icon"
              />
            </a>
          </li>
          <li className="footer__network">
            <a href="/" className="footer__network-link">
              <img
                src="img/social_networks/twitter.svg"
                alt="twitter"
                className="footer__network-icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
