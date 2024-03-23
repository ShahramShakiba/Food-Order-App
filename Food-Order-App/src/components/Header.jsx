import logo from '../assets/logo.jpg';

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
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
