import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts, deleteContact } from "../api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContacts();
        dispatch({ type: "set_contacts", payload: contacts });
      } catch (error) {
        console.error("❌ Error al cargar contactos", error);
        dispatch({ type: "set_contacts", payload: [] });
      }
    };

    fetchContacts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      dispatch({ type: "delete_contact", payload: id });
    } catch (error) {
      console.error("❌ Error al eliminar contacto", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Agenda de Contactos</h1>

      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-success"
          onClick={() => {
            dispatch({ type: "select_contact", payload: null });
            navigate("/add");
          }}
        >
          Agregar nuevo contacto
        </button>
      </div>

      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <div
            key={contact.id}
            className="card mb-3 shadow-sm border-0"
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="avatar"
                  width="60"
                  className="rounded-circle me-3"
                />
                <div>
                  <h5 className="mb-1">{contact.name}</h5>
                  <p className="mb-0">
                    <i className="bi bi-geo-alt me-2"></i>{contact.address}
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-telephone me-2"></i>{contact.phone}
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-envelope me-2"></i>{contact.email}
                  </p>
                </div>
              </div>

              <div className="text-end">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => {
                    dispatch({ type: "select_contact", payload: contact });
                    navigate(`/edit/${contact.id}`);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(contact.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay contactos disponibles.</p>
      )}
    </div>
  );
};

export default Home;
