import React, { useState } from 'react';
import Modal from '../Componentes_Main/modal'; // Asumiendo que tienes un componente Modal

const Footer = () => {
    const [modalContent, setModalContent] = useState({ show: false, title: '', content: '' });
    
    const openModal = (title, content) => {
      setModalContent({ show: true, title, content });
    };
  
    const closeModal = () => {
      setModalContent({ show: false, title: '', content: '' });
    };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="footer-contact">
              <h3>Contacto</h3>
              <ul className="list-unstyled links">
                <li>Cl. 9 Sur #26-32, Bogotá</li>
                <li><a href="tel://11234567890">601 747 9393</a></li>
                <li><a href="mailto:uralitasigloxxi@gmail.com">uralitasigloxxi@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="footer-contact">
              <h3>Nosotros</h3>
              <ul className="list-unstyled float-start links">
                <li><a href="#" onClick={() => openModal('Acerca de', 'Información sobre nosotros')}>Acerca de</a></li>
                <li><a href="#" onClick={() => openModal('Servicios', 'Estos son nuestros servicios...')}>Servicios</a></li>
                <li><a href="#" onClick={() => openModal('Visión', 'Nuestra visión para el futuro')}>Visión</a></li>
                <li><a href="#" onClick={() => openModal('Misión', 'Esta es nuestra misión')}>Misión</a></li>
                <li><a href="#" onClick={() => openModal('Términos', 'Estos son los términos y condiciones')}>Términos</a></li>
                <li><a href="#" onClick={() => openModal('Privacidad', 'Política de privacidad...')}>Privacidad</a></li>
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
        <Modal
          show={modalContent.show}
          handleClose={closeModal}
          title={modalContent.title}
          content={modalContent.content}
        />
      </div>   
    </footer>
  );
};

export default Footer;