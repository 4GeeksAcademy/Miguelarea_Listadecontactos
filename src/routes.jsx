// Import necessary components and functions from react-router-dom.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home.jsx";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Página principal */}
      <Route index element={<Home />} />

      {/* Vista de contacto individual */}
      <Route path="single/:theId" element={<Single />} />

      {/* Formulario para agregar */}
      <Route path="add" element={<Demo />} />

      {/* Formulario para editar */}
      <Route path="edit/:id" element={<Demo />} />
    </Route>
  )
);
