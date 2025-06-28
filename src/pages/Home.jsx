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
    <div className="container mt-5">
      <h1 className="mb-4">Agenda de Contactos</h1>

      <button
        className="btn btn-success mb-4"
        onClick={() => {
          dispatch({ type: "select_contact", payload: null });
          navigate("/add");
        }}
      >
        Agregar nuevo contacto
      </button>

      console.log("✅ CONTACTOS EN RENDER:", store.contacts);

      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <div
            key={contact.id}
            className="card mb-3 p-3 shadow-sm border-0"
            style={{
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="d-flex align-items-center flex-column flex-md-row text-center text-md-start">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Avatar"
                className="rounded-circle me-md-3 mb-3 mb-md-0"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />

              <div className="flex-grow-1">
                <h5 className="mb-1">{contact.name}</h5>
                <p className="mb-1">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  {contact.address}
                </p>
                <p className="mb-1">
                  <i className="bi bi-telephone-fill me-2"></i>
                  {contact.phone}
                </p>
                <p className="mb-0">
                  <i className="bi bi-envelope-fill me-2"></i>
                  {contact.email}
                </p>
              </div>

              <div className="d-flex flex-row flex-md-column justify-content-center mt-3 mt-md-0 ms-md-3">
                <button
                  className="btn btn-outline-secondary btn-sm me-2 me-md-0 mb-md-2"
                  onClick={() => {
                    dispatch({ type: "select_contact", payload: contact });
                    navigate(`/edit/${contact.id}`);
                  }}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(contact.id)}
                >
                  <i className="bi bi-trash-fill"></i>
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
