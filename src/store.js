// Estado inicial del store global
export const initialStore = () => ({
  contacts: [],
  selectedContact: null
});

// Reducer para manejar acciones del store global
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: Array.isArray(action.payload) ? action.payload : []
      };

    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload)
      };

    case 'select_contact':
      return {
        ...store,
        selectedContact: action.payload
      };

    case 'clear_selected_contact':
      return {
        ...store,
        selectedContact: null
      };

    default:
      console.warn("⚠️ Acción no reconocida:", action.type);
      return store;
  }
}
