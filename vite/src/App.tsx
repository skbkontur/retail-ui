import { useState } from "react";
import { Button } from "@skbkontur/react-ui/components/Button";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Button size="medium" onClick={() => setCounter(counter - 1)}>
        −
      </Button>
      <div className="App_counter">{counter}</div>
      <Button size="medium" onClick={() => setCounter(counter + 1)}>
        +
      </Button>
    </div>
  );
}

export default App;
