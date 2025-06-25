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
        dispatch({ type: "set_contacts", payload: [] }); // fallback para evitar errores de tipo
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
      <h1>Agenda de Contactos</h1>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          dispatch({ type: "select_contact", payload: null });
          navigate("/add");
        }}
      >
        Agregar nuevo contacto
      </button>

      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <div key={contact.id} className="card mb-3 p-3">
            <p><strong>📌</strong> {contact.address}</p>
            <p><strong>📞</strong> {contact.phone}</p>
            <p><strong>📧</strong> {contact.email}</p>

            <button
              className="btn btn-warning me-2"
              onClick={() => {
                dispatch({ type: "select_contact", payload: contact });
                navigate(`/edit/${contact.id}`);
              }}
            >
              Editar
            </button>

            <button
              className="btn btn-danger"
              onClick={() => handleDelete(contact.id)}
            >
              Eliminar
            </button>
          </div>
        ))
      ) : (
        <p>No hay contactos disponibles.</p>
      )}
    </div>
  );
};

export default Home;
