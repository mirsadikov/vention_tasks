import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo of website" />
    </header>
  );
}
