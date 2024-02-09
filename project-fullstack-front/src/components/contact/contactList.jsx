import { useContext, useEffect } from "react";
import styleList from "../../styles/styleList.module.scss";
import img from "../../assets/ButtonAdd.png";
import { ContactCard } from "./contactCard";
import { UserContext } from "../providers/userContext";
import { CreateContactModal } from "../modal/createContactModal";
import { EditContactModal } from "../modal/editContactModal";
import { ContactContext } from "../providers/contactContext";

export const ContactList = () => {
  const { contactList } = useContext(UserContext);
  const { addNewContact, setIsOpen, editingContact } =
    useContext(ContactContext);

  return (
    <>
      <div className={styleList.headerList}>
        <h3>Contatos</h3>
        <button className={styleList.buttonAdd} onClick={() => setIsOpen(true)}>
          <img src={img} alt="ButtonAdd" />
        </button>
      </div>
      <div className={styleList.boxList}>
        {contactList.length === 0 ? (
          <p className={styleList.textEmpty}>Nenhum contato disponível.</p>
        ) : (
          <ul className={styleList.list}>
            {contactList.map((contact) => (
              <ContactCard
                key={contact.name}
                id={contact.id}
                name={contact.name}
                email={contact.email}
                telephone={contact.telephone}
                registration_date={contact.registration_date}
                contactAll={contact}
              />
            ))}
          </ul>
        )}
      </div>
      <CreateContactModal addNewContact={addNewContact} />
      {editingContact ? (
        <EditContactModal addNewContact={addNewContact} />
      ) : null}
    </>
  );
};
