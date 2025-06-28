const AGENDA = "MiguelAgenda";
const BASE_URL = "https://playground.4geeks.com/contact";

const CONTACTS_BASE = "https://playground.4geeks.com/contact/agendas/MiguelAgenda/contacts";
const AGENDA_URL = `${BASE_URL}/agendas/${AGENDA}/contacts`; // Correcto para GET

// Obtener todos los contactos de la agenda
export const getContacts = async () => {
  try {
    const resp = await fetch(AGENDA_URL);
    if (!resp.ok) throw new Error("Error al obtener contactos");

    const data = await resp.json();
    console.log("📥 getContacts:", data);
    return Array.isArray(data.contacts) ? data.contacts : [];
  } catch (error) {
    console.error("❌ getContacts error:", error);
    throw error;
  }
};

// Crear un nuevo contacto
export const createContact = async (contact) => {
  try {
    const response = await fetch(CONTACTS_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...contact,
        agenda_slug: AGENDA
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Backend response (create):", error);
      throw new Error("Error al crear contacto");
    }

    const result = await response.json();
    console.log("✅ Contacto creado:", result);
    return result;
  } catch (error) {
    console.error("❌ createContact error:", error);
    throw error;
  }
};

// Actualizar contacto existente
export const updateContact = async (id, contact) => {
  try {
    const res = await fetch(`${CONTACTS_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...contact,
        agenda_slug: AGENDA
      })
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("❌ Backend response (update):", error);
      throw new Error("Error al actualizar contacto");
    }

    const result = await res.json();
    console.log("✅ Contacto actualizado:", result);
    return result;
  } catch (error) {
    console.error("❌ updateContact error:", error);
    throw error;
  }
};

// Eliminar contacto
export const deleteContact = async (id) => {
  try {
    const res = await fetch(`${CONTACTS_BASE}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Error al eliminar contacto");

    const result = await res.json();
    console.log("🗑️ Contacto eliminado:", result);
    return result;
  } catch (error) {
    console.error("❌ deleteContact error:", error);
    throw error;
  }
};

// Estado inicial del store global
export const initialStore = () => ({
  contacts: [],
  selectedContact: null
});
