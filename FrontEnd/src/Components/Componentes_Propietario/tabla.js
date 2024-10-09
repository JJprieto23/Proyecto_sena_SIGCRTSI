import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../userContext";
import Calendario from "./calendario"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";


const Tabla = ({ apiS }) => {
  const [currentPageMoto, setCurrentPageMoto] = useState(1);
  const [currentPageCarro, setCurrentPageCarro] = useState(1);
  const { user, setUser } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [searchTermMoto, setSearchTermMoto] = useState("");
  
  const [searchTermCarro, setSearchTermCarro] = useState("");// Estado para el término de búsqueda

  const recordsPerPage = 12;

  const [dataMoto, setDataMoto] = useState([]);
  const [dataCarro, setDataCarro] = useState([]);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const [responseMoto, responseCarro] = await Promise.all([
          axios.get(`http://localhost:4000/${apiS}?TipoEspacio=Moto`),
          axios.get(`http://localhost:4000/${apiS}?TipoEspacio=Carro`),
        ]);

        setDataMoto(responseMoto.data);
        setDataCarro(responseCarro.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchEspacios();
  }, [apiS]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const indexOfLastRecordMoto = currentPageMoto * recordsPerPage;
  const indexOfFirstRecordMoto = indexOfLastRecordMoto - recordsPerPage;

  const indexOfLastRecordCarro = currentPageCarro * recordsPerPage;
  const indexOfFirstRecordCarro = indexOfLastRecordCarro - recordsPerPage;

  const currentRecordsMoto = dataMoto
    .filter((record) => record.Estado === "Disponible")
    .slice(indexOfFirstRecordMoto, indexOfLastRecordMoto);

  const totalPagesMoto = Math.ceil(
    dataMoto.filter((record) => record.Estado === "Disponible").length /
      recordsPerPage
  );

  const currentRecordsCarro = dataCarro
    .filter((record) => record.Estado === "Disponible")
    .slice(indexOfFirstRecordCarro, indexOfLastRecordCarro);
  const totalPagesCarro = Math.ceil(
    dataCarro.filter((record) => record.Estado === "Disponible").length /
      recordsPerPage
  );

  const handlePageChangeMoto = (pageNumber) => {
    setCurrentPageMoto(pageNumber);
  };

  const handlePageChangeCarro = (pageNumber) => {
    setCurrentPageCarro(pageNumber);
  };

  const rentSpace = async (spaceId, EspacioParqueadero, espacioNumero) => {
    if (!user) {
      setAlertMessage("Error: Usuario no autenticado.");
      setShowAlert(true);
      return;
    }

    const espacioMoto = user.espacioMoto || null;
    const espacioCarro = user.espacioCarro || null;

    if (
      (EspacioParqueadero === "Moto" && espacioMoto) ||
      (EspacioParqueadero === "Carro" && espacioCarro)
    ) {
      setAlertMessage(
        "Error: Solo puedes rentar un espacio de moto y un espacio de carro."
      );
      setShowAlert(true);
      return;
    }

    try {
      await axios.patch(`http://localhost:4000/${apiS}/${spaceId}`, {
        Estado: "Ocupado",
      });

      if (EspacioParqueadero === "Moto") {
        setDataMoto((prevData) =>
          prevData.map((item) =>
            item.id === spaceId ? { ...item, Estado: "Ocupado" } : item
          )
        );
      } else {
        setDataCarro((prevData) =>
          prevData.map((item) =>
            item.id === spaceId ? { ...item, Estado: "Ocupado" } : item
          )
        );
      }

      const updatedUser = {
        ...user,
        espacioMoto:
          EspacioParqueadero === "Moto" ? espacioNumero : espacioMoto,
        espacioCarro:
          EspacioParqueadero === "Carro" ? espacioNumero : espacioCarro,
      };

      await axios.patch(
        `http://localhost:4000/Propietarios/${user.id}`,
        updatedUser
      );

      setUser(updatedUser);

      setAlertMessage("Usted rentó un espacio de parqueadero exitosamente");
      setShowAlert(true);
    } catch (error) {
      console.error("Error al rentar el espacio:", error);
      setAlertMessage("Error al rentar el espacio");
      setShowAlert(true);
    }
  };

  const handleSearchMoto = (e) => {
    e.preventDefault();
    fetchFilteredRecordsMoto(searchTermMoto);
  };

  const handleSearchCarro = (e) => {
    e.preventDefault();
    fetchFilteredRecordsCarro(searchTermCarro);
  };

  const fetchFilteredRecordsMoto = async (term) => {
    try {
      if (term) {
        const response = await axios.get(
          `http://localhost:4000/${apiS}?NumeroEspacio=${term}`
        );
        if (response.status === 200) {
          if (response.data[0].TipoEspacio === "Moto") {
            setDataMoto(response.data);
          } else {
            setDataMoto([]);
          }
        }
      } else {
        setDataMoto(dataMoto);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al filtrar los registros");
    }
  };

  const fetchFilteredRecordsCarro = async (term) => {
    try {
      if (term) {
        const response = await axios.get(
          `http://localhost:4000/${apiS}?NumeroEspacio=${term}`
        );
        if (response.status === 200) {
          if (response.data[0].TipoEspacio === "Carro") {
            setDataCarro(response.data);
          } else {
            setDataCarro([]);
          }
        }
      } else {
        setDataCarro(dataMoto);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al filtrar los registros");
    }
  };

  return (
    <div className="w-100 h-100">
      {showAlert && (
        <div
          className={`alert ${
            alertMessage.includes("exitosamente")
              ? "alert-success"
              : "alert-danger"
          } alert-dismissible fade show`}
          role="alert"
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          {alertMessage}
        </div>
      )}

      <div className="card m-0 h-100">
        {apiS === "Parqueadero" ? (
          <div className="d-flex flex-row">
            {/* Moto Section */}
            <div className="px-3 w-50">
              <form className="d-flex" onSubmit={handleSearchMoto}>
                <input
                  className="form-control me-2"
                  type="search"
                  aria-label="Buscar"
                  required
                  value={searchTermMoto}
                  onChange={(e) => setSearchTermMoto(e.target.value)}
                />
                <button className="btn btn-success py-1" type="submit">
                <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              <h2 className="text-center">Moto</h2>
              <div className="d-flex flex-wrap mt-3">
                {currentRecordsMoto.map((record, index) => (
                  <div
                    key={index}
                    className="d-flex flex-column border border-primary rounded-4 w-25 p-2"
                  >
                    <span className="fs-3 fw-bolder">
                      {record.NumeroEspacio}
                    </span>
                    <button
                      type="button"
                      className="btn bg-success btn-sm p-1"
                      onClick={() =>
                        rentSpace(record.id, "Moto", record.NumeroEspacio)
                      }
                    >
                      Rentar
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-body">
                <div className="dataTables_wrapper dt-bootstrap4">
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
                        role="status"
                        aria-live="polite"
                      >
                        Mostrando {indexOfFirstRecordMoto + 1} a{" "}
                        {indexOfLastRecordMoto > dataMoto.length
                          ? dataMoto.length
                          : indexOfLastRecordMoto}{" "}
                        de {dataMoto.length} registros
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <div className="dataTables_paginate paging_simple_numbers">
                        <ul className="pagination">
                          <li
                            className={`paginate_button page-item previous ${
                              currentPageMoto === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              onClick={() =>
                                handlePageChangeMoto(currentPageMoto - 1)
                              }
                              to="#"
                              className="page-link"
                            >
                              Anterior
                            </Link>
                          </li>
                          {[...Array(totalPagesMoto)].map((_, index) => (
                            <li
                              key={index}
                              className={`paginate_button page-item ${
                                currentPageMoto === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                onClick={() => handlePageChangeMoto(index + 1)}
                                className="page-link"
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`paginate_button page-item next ${
                              currentPageMoto === totalPagesMoto
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              onClick={() =>
                                handlePageChangeMoto(currentPageMoto + 1)
                              }
                              to="#"
                              className="page-link"
                            >
                              Siguiente
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carro Section */}
            <div className="px-3 w-50">
              <form className="d-flex" onSubmit={handleSearchCarro}>
                <input
                  className="form-control me-2"
                  type="search"

                  aria-label="Buscar"
                  required
                  value={searchTermCarro}
                  onChange={(e) => setSearchTermCarro(e.target.value)}
                />
                <button className="btn btn-success py-1" type="submit">
                <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              <h2 className="text-center">Carro</h2>
              <div className="d-flex flex-wrap mt-3">
                {currentRecordsCarro.map((record, index) => (
                  <div
                    key={index}
                    className="d-flex flex-column border border-primary rounded-4 w-25 p-2"
                  >
                    <span className="fs-3 fw-bolder">
                      {record.NumeroEspacio}
                    </span>
                    <button
                      type="button"
                      className="btn bg-success btn-sm p-1"
                      onClick={() =>
                        rentSpace(record.id, "Carro", record.NumeroEspacio)
                      }
                    >
                      Rentar
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-body">
                <div className="dataTables_wrapper dt-bootstrap4">
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
                        role="status"
                        aria-live="polite"
                      >
                        Mostrando {indexOfFirstRecordCarro + 1} a{" "}
                        {indexOfLastRecordCarro > dataCarro.length
                          ? dataCarro.length
                          : indexOfLastRecordCarro}{" "}
                        de {dataCarro.length} registros
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <div className="dataTables_paginate paging_simple_numbers">
                        <ul className="pagination">
                          <li
                            className={`paginate_button page-item previous ${
                              currentPageCarro === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              onClick={() =>
                                handlePageChangeCarro(currentPageCarro - 1)
                              }
                              to="#"
                              className="page-link"
                            >
                              Anterior
                            </Link>
                          </li>
                          {[...Array(totalPagesCarro)].map((_, index) => (
                            <li
                              key={index}
                              className={`paginate_button page-item ${
                                currentPageCarro === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                onClick={() => handlePageChangeCarro(index + 1)}
                                className="page-link"
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`paginate_button page-item next ${
                              currentPageCarro === totalPagesCarro
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              onClick={() =>
                                handlePageChangeCarro(currentPageCarro + 1)
                              }
                              to="#"
                              className="page-link"
                            >
                              Siguiente
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Calendario />
        )}
      </div>
    </div>
  );
};

export default Tabla;
