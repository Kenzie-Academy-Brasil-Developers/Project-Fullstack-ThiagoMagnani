import styleReg from "../../styles/pagReg.module.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaReg } from "../formSchema/formRegister";
import { useUserContext } from "../providers/userContext";

export const RegisterClientPage = () => {
  const { userRegister } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchemaReg),
  });

  return (
    <>
      <div className={styleReg.pagReg}>
        <form onSubmit={handleSubmit(userRegister)}>
          <div className={styleReg.pagRegAll}>
            <div className={styleReg.headerReg}>
              <h2 className={styleReg.title}>Crie sua conta</h2>
              <Link to="/">
                <button className={styleReg.buttonHeader}>Voltar</button>
              </Link>
            </div>

            <div className={styleReg.RegMain}>
              <p className={styleReg.textTitle}>Nome</p>
              <input
                type="text"
                className={styleReg.input}
                placeholder="Digite aqui seu nome"
                {...register("name")}
              />
              {errors.name ? (
                <p className={styleReg.textError}>{errors.name.message}</p>
              ) : null}

              <p className={styleReg.textTitle}>Email</p>
              <input
                type="email"
                className={styleReg.input}
                placeholder="Digite aqui seu Email"
                {...register("email")}
              />
              {errors.email ? (
                <p className={styleReg.textError}>{errors.email.message}</p>
              ) : null}

              <p className={styleReg.textTitle}>Senha</p>
              <input
                type="password"
                className={styleReg.input}
                placeholder="Digite aqui seu Senha"
                {...register("password")}
              />
              {errors.password ? (
                <p className={styleReg.textError}>{errors.password.message}</p>
              ) : null}

              <p className={styleReg.textTitle}>Confirmar Senha</p>
              <input
                type="password"
                className={styleReg.input}
                placeholder="Digite novamente seu Senha"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className={styleReg.textError}>
                  {errors.confirmPassword.message}
                </p>
              ) : null}

              <p className={styleReg.textTitle}>Telefone</p>
              <input
                type="telephone"
                className={styleReg.input}
                placeholder="Número de contato"
                {...register("telephone")}
              />
              {errors.telephone ? (
                <p className={styleReg.textError}>{errors.telephone.message}</p>
              ) : null}

              <button className={styleReg.buttonReg} type="submit">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
