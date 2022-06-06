import './style.scss';

import logo from 'src/assets/logo.png';

const NotFound = () => (
  <div className="not-found txt-uppercase">
    <h2 className="not-found__title">Cette page n'éxiste pas !</h2>
    <p className="not-found__content">
      4
      <img src={logo} className="not-found__logo" alt="Logo vinyle" />
      4
    </p>
  </div>
);

export default NotFound;
