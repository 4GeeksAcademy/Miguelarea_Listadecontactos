const AGENDA = "MiguelAgenda"; // asegúrate de que esta agenda existe
const API_BASE = `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`;
const CONTACTS_BASE = "https://playground.4geeks.com/contact/contacts";
const BASE_URL = "https://playground.4geeks.com/contact";

// Obtener todos los contactos de la agenda
export const getContacts = async () => {
  const resp = await fetch(`${API_BASE}`); // 👈 este es el correcto
  if (!resp.ok) throw new Error("Error al obtener contactos");

  const data = await resp.json();
  return Array.isArray(data) ? data : []; // Protege contra errores
};

// Crear un nuevo contacto
export async function createContact(contact) {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...contact,
        agenda_slug: AGENDA // obligatorio
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Backend response:", error);
      throw new Error("Error al crear contacto");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Actualizar contacto existente
export const updateContact = async (id, contact) => {
  const res = await fetch(`${CONTACTS_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...contact,
      agenda_slug: AGENDA
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("❌ Error del backend:", error);
    throw new Error("Error al actualizar contacto");
  }

  return await res.json();
};

// Eliminar contacto
export const deleteContact = async (id) => {
  const res = await fetch(`${CONTACTS_BASE}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Error al eliminar contacto");
  return await res.json();
};

// Estado inicial del store global
export const initialStore = () => {
  return {
    contacts: [],
    selectedContact: null
  };
};
