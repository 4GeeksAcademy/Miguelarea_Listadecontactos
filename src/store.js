export const initialStore = () => {
  return {
    contacts: [],
    selectedContact: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: Array.isArray(action.payload) ? action.payload : [], // protección
      };

    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload),
      };

    case 'select_contact':
      return {
        ...store,
        selectedContact: action.payload,
      };

    case 'clear_selected_contact':
      return {
        ...store,
        selectedContact: null,
      };

    default:
      throw Error('Unknown action.');
  }
}
