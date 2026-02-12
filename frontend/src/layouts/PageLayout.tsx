import { Outlet, NavLink } from "react-router-dom";

function PageLayout() {
  return (
    <div className="App">
      <header className="Header">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "Header_Link Header_Link--active" : "Header_Link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "Header_Link Header_Link--active" : "Header_Link"
          }
        >
          Meals
        </NavLink>
      </header>
      <main className="Content">
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;
