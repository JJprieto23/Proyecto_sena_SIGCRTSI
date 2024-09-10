import axios from "axios";
import { useState, useEffect } from "react";

const Parqueadero = ({ item, currentRecords, apiS }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredRecords, setFilteredRecords] = useState(currentRecords);
  const [filteredAtt, setFilteredAtt] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    // Actualizar la lista filtrada cada vez que se cambia el filtro
    const applyFilters = () => {
      let records = currentRecords;

      if (filterAvailable) {
        records = records.filter(record => record.Estado === "Disponible");
      }

      if (filterType) {
        records = records.filter(record => record.TipoEspacio === filterType);
      }

      setFilteredRecords(records);
    };

    applyFilters();
  }, [filterAvailable, filterType, currentRecords]);

  const fetchFilteredRecords = async (term, att) => {
    try {
      if (term) {
        const response = await axios.get(
          `http://localhost:4000/${apiS}?${att}=${term}`
        );
        if (response.status === 200) {
          setFilteredRecords(response.data);
        }
      } else {
        setFilteredRecords(currentRecords);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al filtrar los registros");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFilteredRecords(searchTerm, filteredAtt);
  };

  return (
    <>
      



      {/* Formulario de búsqueda */}
      <form className="d-flex mb-3" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setFilteredAtt("NumeroEspacio");
          }}
        />
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setFilteredAtt("TipoEspacio");
          }}
        >
          <option selected>Open this select menu</option>
          <option value={"Moto"}>Moto</option>
          <option value={"Carro"}>Carro</option>
        </select>
        <button className="btn btn-success ms-2 py-1" type="submit">
          Search
        </button>
      </form>

          {/* Botones de filtrado */}
      <div className="mb-3 mt-5">
        <button
          className={`btn me-2 ${filterAvailable ? "btn btn-primary" : " btn btn-dark"}`}
          onClick={() => setFilterAvailable(!filterAvailable)}
        >
          {filterAvailable ? "Ver Todos" : "Disponibles"}
        </button>
        <button
          type="button"
          className={`btn me-2 ${filterType === "Carro" ? "btn btn-primary" : " btn btn-dark"}`}
          onClick={() => setFilterType(filterType === "Carro" ? "" : "Carro")}
        >
          {filterType === "Carro" ? "Ver Todos" : "Carros"}
        </button>
        <button
          className={`btn ${filterType === "Moto" ? "btn btn-primary" : " btn btn-dark"}`}
          onClick={() => setFilterType(filterType === "Moto" ? "" : "Moto")}
        >
          {filterType === "Moto" ? "Ver Todos" : "Motos"}
        </button>
      </div>

      {/* Tabla de resultados */}
      <table
        id="example2"
        className="table table-bordered table-hover table-sm"
        aria-describedby="example2_info"
      >
        <thead>
          <tr>
            {item.map((item, index) => (
              <th
                className="sorting sorting text-light bg-dark"
                tabIndex="0"
                aria-controls="example2"
                rowSpan="1"
                colSpan="1"
                aria-label="Rendering engine: activate to sort column ascending"
                key={index}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.NumeroEspacio}</td>
              <td>{record.TipoEspacio}</td>
              <td>{record.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación u otras funcionalidades de la parte inferior de la tabla */}
      {/* Aquí podrías implementar la paginación si ya está soportada */}
    </>
  );
};

export default Parqueadero;
