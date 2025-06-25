import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { updateContact, getContacts } from "../api";

export const Single = () => {
  const { store, dispatch } = useGlobalReducer();
  const { theId } = useParams(); // ← aquí usamos el ID del contacto
  const navigate = useNavigate();

  const contactToEdit = store.contacts.find(c => c.id === parseInt(theId));

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (contactToEdit) {
      setForm({
        full_name: contactToEdit.full_name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address
      });
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateContact(theId, form);
      const updated = await getContacts();
      dispatch({ type: "set_contacts", payload: updated });
      navigate("/");
    } catch (err) {
      console.error("❌ Error al actualizar contacto", err);
    }
  };

  if (!contactToEdit) return <div className="text-center mt-5">Cargando contacto...</div>;

  return (
    <div className="container mt-5">
      <h2>Editar contacto</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="full_name" value={form.full_name} onChange={handleChange} required />
        <input className="form-control mb-2" name="email" type="email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-2" name="phone" value={form.phone} onChange={handleChange} required />
        <input className="form-control mb-2" name="address" value={form.address} onChange={handleChange} required />
        <button className="btn btn-primary w-100">Guardar cambios</button>
      </form>
    </div>
  );
};
