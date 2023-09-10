import headerLogo from '../images/Vector_1.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Россия"
      />
      {children}
    </header>
  )
}

export default Header;