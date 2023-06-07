import { useState } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import Filter from '../Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import ContactList from '../ContactList/ContactList';
import useLocalStorage from '../hooks/useLocalStorage';
const key = 'contacts';

export function App() {
  const [contacts, setContacts] = useLocalStorage(key, []);
  const [filter, setFilter] = useState('');

  const handlerSubmit = data => {
    const { name, number } = data;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts(contacts => {
      if (
        contacts.find(
          contact =>
            contact.name === newContact.name ||
            contact.number === newContact.number
        )
      ) {
        alert(
          `${newContact.name} or ${newContact.number} is already in contacts`
        );
        return contacts;
      }
      return [newContact, ...contacts];
    });
  };
  const onFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={handlerSubmit} />
      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onFilter={onFilter} />
      <ContactList deleteContact={deleteContact} contacts={filteredContacts} />
    </Container>
  );
}
