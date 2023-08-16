import { useEffect, useState } from "react";

// const API = `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`;

function App() {
  const [firstCountry, setFirstCountry] = useState("USD");
  const [secondCountry, setSecondCountry] = useState("EUR");
  const [value, setValue] = useState(1);
  const [rate, setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log(value, firstCountry, secondCountry);
  useEffect(() => {
    const controller = new AbortController();
    const fetching = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${value}&from=${firstCountry}&to=${secondCountry}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setRate(data.rates[`${secondCountry}`]);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (firstCountry === secondCountry) return setRate(value);
    // calling
    fetching();
    return () => controller.abort();
  }, [value, firstCountry, secondCountry]);
  return (
    <div className="container">
      <h1 className="h1 text-center mt-5">
        Currency <span className="text-danger">Converter</span>
      </h1>
      <div className="mt-3">
        <label className="form-label">Enter Your Currency : </label>
        <input
          value={isNaN(value) ? "" : +value}
          onChange={(e) => setValue(Number.parseInt(e.target.value))}
          type="text"
          className="form-control"
          placeholder="enter your currency"
        />
        <div className="form-floating">
          <select
            disabled={isLoading}
            className="form-select"
            value={firstCountry}
            onChange={(e) => setFirstCountry(e.target.value)}
          >
            <option selected value="USD">
              USD
            </option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAN</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <div className="form-floating">
          <select
            disabled={isLoading}
            className="form-select"
            value={secondCountry}
            onChange={(e) => setSecondCountry(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>

      {/* result */}
      <h3 className="text-center mt-5">
        Result : <span className="text-danger"> {rate}</span>
      </h3>
    </div>
  );
}

export default App;
