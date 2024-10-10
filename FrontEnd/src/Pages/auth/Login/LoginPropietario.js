import { useState } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Logins.css";
import myImg from "../../../img/logo2.png";
import { useUser } from "../../../userContext";
import Fondo1 from "../../../img/fondo1.png"; /* Importación de la imagen de fondo */

const LoginPropietario = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const { setUser: setContextUser } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();

    try {
      // Solicitud GET para obtener los datos del usuario
      const response = await axios.get(
        `http://localhost:4000/Propietarios?User=${Username}`
      );

      if (response.data.length > 0) {
        const usuario = response.data[0];

        if (usuario.Pass === Password) {
          setContextUser(usuario); // Actualizar el contexto con el usuario
          navigate("/MainPropietario");
        } else {
          toast.danger("Contraseña incorrecta");
        }
      } else {
        toast.warning("Usuario no encontrado");
      }
    } catch (error) {
      console.error(error);
      toast.error("Contraseña incorrecta. Intentelo Nuevamente.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="login-page"
        style={{
          backgroundImage: `url(${Fondo1})`, // Imagen de fondo importada
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Ajustar a la altura completa de la ventana
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "brightness(90%)", // Oscurecer la imagen de fondo
        }}
      >
        {showAlert === "pass" ? (
          <div
            className="alert alert-warning alert-dismissible fade show w-25 text-center"
            role="alert"
            style={{ marginInlineEnd: "35%" }}
          >
            Contraseña incorrecta
          </div>
        ) : showAlert === "user" ? (
          <div
            className="alert alert-warning alert-dismissible fade show w-25 text-center"
            role="alert"
            style={{ marginInlineEnd: "35%" }}
          >
            Usuario no encontrado
          </div>
        ) : null}
        <div className="login-box rounded-4 p-5 bg-white w-50">
          <div className="login-logo d-flex flex-column align-items-center">
            <Link
              to="/"
              className="text-decoration-none link-body-emphasis w-25 link-opacity-25-hover"
            >
              <div>
                <img src={myImg} alt="Logo" className="logo" />
              </div>
              <div className="fs-5">Volver al inicio</div>
            </Link>
          </div>
          <p className="login-box-msg p-0 text-center mb-2 fs-2">
            Ingrese como propietario
          </p>
          <div className="card-body login-card-body">
            <form onSubmit={enviar}>
              {/* Nombre y Apellido */}
              <div className="d-flex flex-row">
                <div className="me-4 w-50">
                <label className="text-start w-100 fw-normal" for="username">
                    Nombre de usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    name="Username"
                    required
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="w-50">
                <label className="text-start w-100 fw-normal" for="pass">
                    Contraseña
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="form-control"
                    name="Pass"
                    required
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-success btn-block p-2 mt-2"
                  >
                    Ingresar
                  </button>
                </div>
              </div>
            </form>
            <hr className="hr-line" />
            <p className="mb-0">
              ¿No tiene una cuenta?{" "}
              <Link
                to="/RegisterPropietario"
                className="text-center text-decoration-none fw-bold"
              >
                Enviar solicitud para creación de cuenta
              </Link>
            </p>
            <p className="mb-0">
              ¿Desea ingresar como{" "}
              <Link to="/LoginPortero" className="text-decoration-none fw-bold">
                Portero
              </Link>{" "}
              o{" "}
              <Link
                to="/LoginAdministrador"
                className="text-decoration-none fw-bold"
              >
                Administrador
              </Link>
              ?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPropietario;
