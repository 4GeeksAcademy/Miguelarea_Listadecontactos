import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { StoreProvider } from './hooks/useGlobalReducer'; // 👈 Asegúrate que este path es correcto
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Main = () => {
  return (
    <React.StrictMode>
      <StoreProvider> {/* 👈 Aquí está el Provider */}
        <RouterProvider router={router} />
      </StoreProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<Main />);
