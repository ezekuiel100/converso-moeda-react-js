import { useState } from "react";
import "./style.css";

function App() {
  const [quantia, setQuantia] = useState(0);

  const [deMoeda, setDeMoeda] = useState("BRL");
  const [paraMoeda, setParaMoeda] = useState("USD");
  const [resultado, setResultado] = useState(0);

  async function converterMoeda() {
    if (quantia <= 0 || deMoeda === paraMoeda) return setResultado(quantia);

    const data = await fetch(
      `https://api.frankfurter.app/latest?amount=${quantia}&from=${deMoeda}&to=${paraMoeda}`
    );
    const res = await data.json();
    setResultado(res.rates[paraMoeda]);
  }

  return (
    <div className="container">
      <div>
        <label>Quantia:</label>
        <input
          type="number"
          value={quantia}
          onChange={(e) => setQuantia(e.target.value)}
        />
      </div>

      <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
        <option value="USD">DOLAR</option>
        <option value="BRL"> REAL</option>
        <option value="EUR">EURO</option>
      </select>

      <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
        <option value="USD">DOLAR</option>
        <option value="BRL"> REAL</option>
        <option value="EUR">EURO</option>
      </select>

      <button onClick={() => converterMoeda(resultado)}>Converter</button>
      <div className="resultado">{resultado ? resultado.toFixed(2) : ""}</div>
    </div>
  );
}

export default App;
