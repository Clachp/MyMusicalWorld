import './style.scss';

import { NavLink } from 'react-router-dom';

const Footer = () => {
  const getActiveClassname = ({ isActive }) => (isActive ? 'txt-underlined' : 'footer-link');

  return (
    <div className="footer">
      <NavLink to="/about" className={getActiveClassname}>A propos</NavLink>
      <p>2022 | My Musical World</p>
      <NavLink to="/legal" className={getActiveClassname}>Mentions légales</NavLink>
    </div>
  );
};

export default Footer;
