import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "../api";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (store.selectedContact) {
      setForm({
        name: store.selectedContact.name || "",
        email: store.selectedContact.email || "",
        phone: store.selectedContact.phone || "",
        address: store.selectedContact.address || ""
      });
    }
  }, [store.selectedContact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (store.selectedContact) {
        const updated = await updateContact(store.selectedContact.id, {
          ...form,
          agenda_slug: "MiguelAgenda"
        });
        dispatch({ type: "update_contact", payload: updated });
      } else {
        const added = await createContact({
          ...form,
          agenda_slug: "MiguelAgenda"
        });
        dispatch({ type: "add_contact", payload: added });
      }

      dispatch({ type: "select_contact", payload: null });
      navigate("/");
    } catch (err) {
      console.error("❌ Error al guardar contacto", err);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">
          {store.selectedContact ? "Edit Contact" : "Add a New Contact"}
        </h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Enter phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            id="address"
            name="address"
            className="form-control"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          {store.selectedContact ? "Update" : "Save"}
        </button>

        <div className="text-start mt-3">
          <a href="/" className="text-decoration-underline">
            or get back to contacts
          </a>
        </div>
      </form>
    </div>
  );
};
