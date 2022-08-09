import axios from 'axios';
import { useState } from 'react';
import ButtonGroup from './../ButtonGroup';
import Display from './../Display';

const opMap: any = {
  null: null,
  "+": "plus",
  "-": "minus",
  '*': "times",
  "/": "divide",
  "=": "equal",
};

function Calculator() {
  const [result, setResult] = useState<string>('0');
  const [error, setError] = useState<boolean>(false);
  const [op, setOp] = useState<string | null>(null);
  const [second, setSecond] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clear = () => {
    setResult('0');
    setOp(null);
    setSecond(null);
  }

  const handleClick = async(name: string): Promise<void> => {
    setError(false);

    if (name === 'C') {
      clear();
      return;
    }

    if (/[0-9]/.test(name)) {
      setSecond(second === "0" || !second ? name : second + name);
      return;
    }

    if (name === ".") {
      if (second === null) {
        setSecond("0.");
        return;
      }
      if (!second.includes("."))
        setSecond(second + ".");
      return;
    }

    if (name === '+' || name === '-' || name === '*' || name === '/' || name === '=') {
      setLoading(true);
      try {
        let res = await axios.get(`/api/calc/?total=${result}&next=${second}&operation=${op && opMap[op]}`);
        setError(false);
        setResult(res.data);
        setSecond(null);
      } catch(err: any) {
        console.log(err);
        setError(true);
      }
      setLoading(false);
      setOp(name);
    }
};

  return (
    <div className='calc'>
        <Display result={error ? 'Error occured' : String(second || result)} loading={loading}/>
        {/* <Display value={error ? "Error occured" : String(second || result)} /> */}
        <ButtonGroup handleClick={handleClick}/>
    </div>
  );
}

export default Calculator;
