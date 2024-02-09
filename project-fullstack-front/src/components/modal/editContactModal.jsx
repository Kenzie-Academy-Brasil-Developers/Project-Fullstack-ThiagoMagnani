import styleModal from "../../styles/styleModal.module.scss";
import { useContext } from "react";
import { ContactContext } from "../providers/contactContext";
import { useForm } from "react-hook-form";

export const EditContactModal = () => {
  const { setEditingContact, editingContact, contactUpdate } =
    useContext(ContactContext);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: editingContact?.name || "",
      email: editingContact?.email || "",
      telephone: editingContact?.telephone || "",
    },
  });

  const handleFormSubmit = (formData) => {
    const data = {
      name: formData.name,
      email: [`${formData.email}`],
      telephone: [`${formData.telephone}`],
      registration_date: new Date().toString()
    }
    contactUpdate(data);
  };

  return (
    <>
      <div className={styleModal.modal}>
        <div className={styleModal.modalBox}>
          <div className={styleModal.headerModal}>
            <h3 className={styleModal.titleHeader}>Detalhes do Contato</h3>
            <button
              className={styleModal.closeButton}
              onClick={() => setEditingContact(null)}
            >
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
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
