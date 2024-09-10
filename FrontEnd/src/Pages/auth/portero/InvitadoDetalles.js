import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../../Components/Componentes_Portero/navBar";
import './InvitadoDetalle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faRedo } from '@fortawesome/free-solid-svg-icons';
import { useUser } from "../../../userContext";

const InvitadoDetalle = () => {
  const { id } = useParams(); // Obtener el ID del invitado desde la URL
  const navigate = useNavigate(); // Hook para navegar
  const [guest, setGuest] = useState(null);
  
  const {
    hours,
    setHours: setContextHours,
    minutes,
    setMinutes: setContextMinutes,
    seconds,
    setSeconds: setContextSeconds,
    handleStartCountdown,
    handlePauseCountdown,
    handleStopCountdown,
    handleResetCountdown,
    formatTime,
    countdown,
    isRunning,
    isPaused
  } = useUser();

  useEffect(() => {
    const fetchGuestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Invitados/${id}`);
        setGuest(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del invitado:", error);
      }
    };

    fetchGuestDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  if (!guest) {
    return <div className="loading">Cargando detalles del invitado...</div>;
  }

  return (
    <>
      <div className="container">
        <NavBar />
        <div className="details-container">
          <div className="headerr">
            <h2>Detalles del Invitado</h2>
            <button className="btn btn-secondary" onClick={handleGoBack}>
              Volver
            </button>
          </div>
          <div className="countdown-section">
            <h3>Cuenta Regresiva</h3>
            <div className="input-group-container">
              <div className="input-group">
                <label htmlFor="hours">Horas</label>
                <input
                  id="hours"
                  type="number"
                  value={hours}
                  onChange={(e) => setContextHours(parseInt(e.target.value, 10))}
                  className="time-input"
                  placeholder="Horas"
                />
              </div>
              <div className="input-group">
                <label htmlFor="minutes">Minutos</label>
                <input
                  id="minutes"
                  type="number"
                  value={minutes}
                  onChange={(e) => setContextMinutes(parseInt(e.target.value, 10))}
                  className="time-input"
                  placeholder="Minutos"
                />
              </div>
              <div className="input-group">
                <label htmlFor="seconds">Segundos</label>
                <input
                  id="seconds"
                  type="number"
                  value={seconds}
                  onChange={(e) => setContextSeconds(parseInt(e.target.value, 10))}
                  className="time-input"
                  placeholder="Segundos"
                />
              </div>
            </div>
            
            <div className="countdown-display">
              <h4>Tiempo Restante:</h4>
              <p className="countdown-time">{formatTime(countdown)}</p>
            </div>
            <div className="countdown-controls">
              <FontAwesomeIcon
                icon={faRedo}
                className="control-icon reset-icon"
                onClick={handleResetCountdown}
                title="Reiniciar"
              />
              <FontAwesomeIcon
                icon={faPlay}
                className={`control-icon start-icon ${isRunning ? 'd-none' : ''}`}
                onClick={handleStartCountdown}
                title="Iniciar"
              />
              <FontAwesomeIcon
                icon={faPause}
                className={`control-icon pause-icon ${!isRunning ? 'd-none' : ''} ${isPaused ? 'paused' : ''}`}
                onClick={handlePauseCountdown}
                title={isPaused ? "Reanudar" : "Pausar"}
              />
              <FontAwesomeIcon
                icon={faStop}
                className="control-icon stop-icon"
                onClick={handleStopCountdown}
                title="Detener"
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{guest.Nombre}</h5>
              <p className="card-text"><strong>Documento:</strong> {guest.NumeroDocumento}</p>
              <p className="card-text"><strong>Teléfono:</strong> {guest.Teléfono}</p>
              <p className="card-text"><strong>Correo:</strong> {guest.Correo}</p>
              <p className="card-text"><strong>Parqueadero Asignado:</strong> {guest.NumeroParqueadero}</p>
              <p className="card-text"><strong>Costo:</strong> {guest.Costo}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvitadoDetalle;
