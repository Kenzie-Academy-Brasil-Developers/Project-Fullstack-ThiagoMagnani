import styleDash from "../../styles/dashboard.module.scss";
import { useUserContext } from "../providers/userContext";
import { ContactList } from "../contact/contactList";

export const DashBoard = () => {
  const { user, userLogout } = useUserContext();

  return (
    <>
      <div className={styleDash.screen}>
        <div className={styleDash.screenBorder}>
          <div className={styleDash.screenContainner}>
            <div className={styleDash.subHeader}>
              <div className={styleDash.header}>
              <h3>Olá, {user?.name} </h3>
              <button className={styleDash.buttonHeader} onClick={userLogout}>
                Sair
              </button>
            </div>
            </div>
          </div>
          <hr className={styleDash.border} />
          <div className={styleDash.screenContainner}>
            <div>
              <ContactList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
