import styleModal from "../../styles/styleModal.module.scss";
import { useContext } from "react";
import { ContactContext } from "../providers/contactContext";
import { useForm } from "react-hook-form";

export const CreateContactModal = () => {
  const { isOpen, setIsOpen, addNewContact } = useContext(ContactContext);
  const { register, handleSubmit } = useForm();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    const data = {
      name: formData.name,
      email: [formData.email],
      telephone: [formData.telephone],
      registration_date: new Date().toString()
    }
    addNewContact(data);
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className={styleModal.modal}>
          <div className={styleModal.modalBox}>
            <div className={styleModal.headerModal}>
              <h3 className={styleModal.titleHeader}>Adicionar Contato</h3>
              <button className={styleModal.closeButton} onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className={styleModal.modalFormBox}>
              <form
                className={styleModal.formModal}
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <div>
                  <p className={styleModal.titleInputModal}>Nome</p>
                  <input
                    type="text"
                    className={styleModal.inputName}
                    placeholder="Nome"
                    name="name"
                    {...register("name")}
                  />
                </div>
                <div>
                  <p className={styleModal.titleInputModal}>E-mail</p>
                  <input
                    type="email"
                    className={styleModal.inputName}
                    placeholder="E-mail"
                    name="email"
                    {...register("email")}
                  />
                </div>
                <div>
                  <p className={styleModal.titleInputModal}>Telefone</p>
                  <input
                    type="tel"
                    className={styleModal.inputName}
                    placeholder="Telefone"
                    name="telephone"
                    {...register("telephone")}
                  />
                </div>
                <button className={styleModal.buttonAdd} type="submit">
                  Adicionar Contato
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
