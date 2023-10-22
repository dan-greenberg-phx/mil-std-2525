import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">File Loader - Third Party</Link>
          </li>
          <li>
            <Link to="/fileloaderproprietary">File Loader - Internal</Link>
          </li>
          <li>
            <Link to="/selectionsthirdparty">Selections - Third Party</Link>
          </li>
          <li>
            <Link to="/selectionsproprietary">Selections - Internal</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
