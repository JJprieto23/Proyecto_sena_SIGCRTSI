import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../../Components/Componentes_Portero/navBar";
import './InvitadoDetalle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faRedo } from '@fortawesome/free-solid-svg-icons';

const InvitadoDetalle = () => {
  const { id } = useParams(); // Obtener el ID del invitado desde la URL
  const navigate = useNavigate(); // Hook para navegar
  const [guest, setGuest] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

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

  useEffect(() => {
    let timer;
    if (countdown > 0 && isRunning && !isPaused) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [countdown, isRunning, isPaused]);

  const handleStartCountdown = () => {
    const timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (timeInSeconds > 0) {
      setCountdown(timeInSeconds);
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handlePauseCountdown = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    }
  };

  const handleStopCountdown = () => {
    setCountdown(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleResetCountdown = () => {
    setCountdown((hours * 3600) + (minutes * 60) + seconds);
    setIsPaused(false);
    setIsRunning(false);
  };

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
                  onChange={(e) => setHours(parseInt(e.target.value, 10) || 0)}
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
                  onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
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
                  onChange={(e) => setSeconds(parseInt(e.target.value, 10) || 0)}
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
