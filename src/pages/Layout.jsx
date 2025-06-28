import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Aquí podrías agregar tu Navbar si lo tienes */}
      <header className="bg-light py-3 shadow-sm">
        <div className="container">
          <h2 className="mb-0">Mi Agenda</h2>
        </div>
      </header>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <small>© {new Date().getFullYear()} Mi Agenda</small>
      </footer>
    </div>
  );
};

export default Layout;
