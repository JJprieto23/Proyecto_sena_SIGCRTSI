import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import "./Pages/auth/portero/InvitadoDetalle.css";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(user){
          const response = await axios.get(
          `http://localhost:4000/Propietarios/${user.id}`
        ); // Actualiza con el ID correcto
        setUser(response.data);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && isRunning && !isPaused) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [countdown, isRunning, isPaused]);

  const handleStartCountdown = () => {
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
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
    setCountdown(hours * 3600 + minutes * 60 + seconds);
    setIsPaused(false);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        handleStartCountdown,
        handlePauseCountdown,
        handleStopCountdown,
        handleResetCountdown,
        formatTime,
        countdown,
        setCountdown,
        isRunning,
        isPaused
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
