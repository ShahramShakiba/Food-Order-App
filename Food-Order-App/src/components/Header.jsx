import logo from '../assets/logo.jpg';
import Button from './UI/Button';

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="" />

        <h1>Food Ordering</h1>
      </div>

      <nav id="menu">
        <div>
          <ul className="navItems">
            <li>
              <a href="#"> Home </a>
            </li>
            <li>
              <a href="#" className="active">
                Menu
              </a>
            </li>
          </ul>
        </div>

        <Button textOnly> Cart (0) </Button>
      </nav>
    </header>
  );
}
