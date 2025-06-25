import React, { useState, useEffect } from "react";
import { createContact, updateContact, getContacts } from "../api";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const selectedContact = store.selectedContact;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name || "");
      setEmail(selectedContact.email || "");
      setPhone(selectedContact.phone || "");
      setAddress(selectedContact.address || "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  }, [selectedContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      phone,
      address,
      agenda_slug: "MiguelAgenda"
    };

    try {
      if (selectedContact) {
        await updateContact(selectedContact.id, contactData);
      } else {
        await createContact(contactData);
      }

      // ✅ Re-obtener los contactos actualizados desde el backend
      const updatedContacts = await getContacts();
      dispatch({ type: "set_contacts", payload: updatedContacts });

      dispatch({ type: "select_contact", payload: null });
      navigate("/");
    } catch (error) {
      console.error("❌ Error al guardar contacto:", error);
    }
  };

  return (
    <div className="container">
      <h2>{selectedContact ? "Editar contacto" : "Agregar nuevo contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">
          {selectedContact ? "Guardar cambios" : "Guardar"}
        </button>
      </form>
    </div>
  );
};
