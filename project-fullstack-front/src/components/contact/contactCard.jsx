import { useContext } from "react";
import styleList from "../../styles/styleList.module.scss";
import ImgEdit from "../../assets/ButtonEdit.png";
import ImgRemove from "../../assets/ButtonRemove.png";
import { ContactContext } from "../providers/contactContext";

export const ContactCard = ({ id, name, email, telephone, registration_date, contactAll }) => {
  const { cardDelete, setEditingContact } = useContext(ContactContext);
  const formattedDate = new Date(registration_date).toLocaleDateString('pt-BR');

  return (
    <li className={styleList.itensList}>
      <h3 className={styleList.title}>{name}</h3>
      <p className={styleList.textList}>{email}</p>
      <p className={styleList.textList}>{telephone}</p>
      <p className={styleList.textList}>{formattedDate}</p>
      <div className={styleList.buttonsCard}>
        <button
          className={styleList.buttonEdit}
          onClick={() => setEditingContact(contactAll)}
        >
          <img src={ImgEdit} alt="ButtonEdit" />
        </button>
        <button
          className={styleList.buttonRemove}
          onClick={() => cardDelete(id)}
        >
          <img src={ImgRemove} alt="ButtonRemove" />
        </button>
      </div>
    </li>
  );
};
