import React, { createContext, useContext, useState } from "react";
import { api } from "../../services/api";
import { UserContext } from "./userContext";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { contactList, setContactList } = useContext(UserContext);
  const [editingContact, setEditingContact] = useState(null);

  const addNewContact = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const existingContact = contactList.find(contact => contact.name === formData.name);
      if (existingContact) {
        alert("Contato já criado");
        return;
      }
      const { data } = await api.post("/contact", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContactList([...contactList, data]);
    } catch (error) {
      alert("Contato vazio");
    }
  };

  const contactUpdate = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.patch(
        `/contact/${editingContact.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newCardList = contactList.map((card) => {
        if (card.id === editingContact.id) {
          return data;
        } else {
          return card;
        }
      });

      setContactList(newCardList);
      setEditingContact(null);
    } catch (error) {
      console.log("Erro ao atualizar os dados do usuário", error);
    }
  };

  const cardDelete = async (delId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/contact/${delId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newCardList = contactList.filter((post) => post.id !== delId);
      setContactList(newCardList);
    } catch (error) {
      console.log("Erro ao excluir o contato:", error);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        setIsOpen,
        isOpen,
        cardDelete,
        addNewContact,
        editingContact,
        setEditingContact,
        contactUpdate,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => useContext(ContactContext);
