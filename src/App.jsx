import { useState } from "react";

function App() {
  const [quantia, setQuantia] = useState(100);

  const [deMoeda, setDeMoeda] = useState("BRL");
  const [paraMoeda, setParaMoeda] = useState("USD");
  const [resultado, setResultado] = useState(0);

  async function converterMoeda() {
    if (quantia <= 0 || deMoeda === paraMoeda)
      return console.log("Digite um valor");

    const data = await fetch(
      `https://api.frankfurter.app/latest?amount=${quantia}&from=${deMoeda}&to=${paraMoeda}`
    );
    const res = await data.json();
    setResultado(res.rates[paraMoeda]);
  }

  return (
    <div>
      <label>Quantia:</label>
      <input
        type="number"
        value={quantia}
        onChange={(e) => setQuantia(e.target.value)}
      />
      <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
        <option value="USD">USD</option>
        <option value="BRL"> BRL</option>
        <option value="EUR">EUR</option>
      </select>
      <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
        <option value="USD">USD</option>
        <option value="BRL"> BRL</option>
        <option value="EUR">EUR</option>
      </select>

      <button onClick={() => converterMoeda(resultado)}>Converter</button>
      <div>Resultado:{resultado}</div>
    </div>
  );
}

export default App;
