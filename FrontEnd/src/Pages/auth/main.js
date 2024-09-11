import React from "react";
import { Link } from "react-router-dom";
import myImg from "../../img/logo2.png"; /* Importación logo del conjunto */
import Fondo1 from "../../img/fondo1.png"; /* Importación de la imagen de fondo */
import Perfil from "../../img/Usuario.png"
import "../../styles/main.css";

/* Creación del componente Main */
const Main = () => {
  return (
    <div className="home">
      <header className="header">
        <div className="header-logo">
          <img src={myImg} alt="Logo del conjunto residencial" className="logo-img" />
          <h1>Conjunto Torres de Santa Isabel</h1>
        </div>
      </header>

      <div
        className="welcome-background"
        style={{
          backgroundImage: `url(${Fondo1})`, // Imagen de fondo importada
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh', // Ajustar a la altura completa de la ventana
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          filter: 'brightness(90%)' // Oscurecer la imagen de fondo
        }}
      >
        <div
          className="welcome-content"
          style={{
            textAlign: 'center',
            color: '#fff',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
            borderRadius: '10px'
          }}
        >
          <h2>Bienvenid@</h2>
          <p>Antes de ingresar desea ingresar como:</p>
          <div
            className="welcome-buttons"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px'
            }}
          >
            <Link to="/LoginPropietario" className="btn btn-owner" style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Propietario</Link>
            <Link to="/LoginAdministrador" className="btn btn-admin" style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Administrador</Link>
            <Link to="/LoginPortero" className="btn btn-porter" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Portero</Link>
          </div>
        </div>
      </div>

      <div className="welcome-section">
        <div className="welcome-text">
          <h2>Conjunto Residencial Torres de Santa Isabel</h2>
          <p>
            Te damos la bienvenida a nuestra plataforma diseñada para facilitar tu trabajo. Aquí encontrarás herramientas para gestionar eficientemente las operaciones diarias y garantizar la comodidad de los residentes. Explora nuestras funcionalidades y contáctanos si necesitas ayuda. ¡Gracias por ser parte de nuestro equipo!
          </p>
          <a href="https://maps.app.goo.gl/3cEXQRnnLgatSydR8" className="contact-btn" target="_blank" rel="noopener noreferrer">Contáctanos</a>
        </div>
        <div className="welcome-collage">
          <img src={myImg} alt="Imagen de bienvenida" className="collage-img" />
        </div>
      </div>

      <div className="cards-container">
        <div className="card-perfil">
          <img src={Perfil} alt="Foto de la Cara" />
          <h1>Mario Alfonso Guerra</h1>
          <p>Cargo: Administrador</p>
          <h2>Hola, soy el administrador de este conjunto residencial y los quiero invitar a comprartir con nosotros</h2>
        </div>
        <div className="card-perfil">
          <img src={Perfil} alt="Foto de la Cara" />
          <h1>Ana María Araque</h1>
          <p>Cargo: Secretaria</p>
          <h2>Estoy aquí para ayudarte con cualquier duda o inquietud que tengas</h2>
        </div>
        <div className="card-perfil">
          <img src={Perfil} alt="Foto de la Cara" />
          <h1>Julian Andrés López</h1>
          <p>Cargo: Coordinador de eventos</p>
          <h2>Conmigo podras organizar diferentes eventos privados y publicos haciendo uso de nuestras instalaciones</h2>
          <p>Telefono: 3138345761</p>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="footer-contact">
                <h3>Contacto</h3>
                <ul className="list-unstyled links">
                  <li>Calle Ejemplo 123, Ciudad</li>
                  <li><a href="tel://11234567890">601 747 9393</a></li>
                  <li><a href="mailto:uralitasigloxxi@gmail.com">uralitasigloxxi@gmail.com</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="footer-contact">
                <h3>Nosotros</h3>
                <ul className="list-unstyled float-start links">
                  <li><a href="#">Acerca de</a></li>
                  <li><a href="#">Servicios</a></li>
                  <li><a href="#">Visión</a></li>
                  <li><a href="#">Misión</a></li>
                  <li><a href="#">Terminos</a></li>
                  <li><a href="#">Privacidad</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-map">
            <h3>Ubicación</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.745002814836!2d-122.41941808468157!3d37.7749292797591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808ef7e8a469%3A0x35dfd48918480f3d!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1612764172152!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa de ubicación"
            ></iframe>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Main;
