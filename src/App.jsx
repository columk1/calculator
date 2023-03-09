import { useState } from 'react'
import './App.css'

function App() {
    let [calc, setCalc] = useState({
      sign: "",
      num: 1000000000000,
      res: 0,
    });

    const clear = () => {
      setCalc({
        ...calc,
        sign:"",
        num:0,
        res:0,
      });
    }

    const math = (a, b, sign) =>
    sign === "+"
      ? a + b
      : sign === "-"
      ? a - b
      : sign === "*"
      ? a * b
      : a / b;

    const clickHandler = (e) => {
      const value = e.target.value;
      console.log(calc.num + " and " + calc.res)
      if (e.target.classList.contains("number")) {
        setCalc({
          ...calc,
          num:
          calc.num === 0 && value === "0"
          ? "0"
          : calc.num % 1 === 0 && !calc.num.toString().includes(".")
          ? Number(calc.num + value)
          : calc.num + value,
          res: !calc.sign ? 0 : calc.res,
        });
      } else if (e.target.classList.contains("operator")) {
          setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
            num: 0,
          });
      } else {
        switch(value) {
          case "%":
            setCalc({
              num: calc.num ? calc.num / 100 : 0,
              res: calc.res ? calc.res / 100 : 0
            })
            break;
          case "invert":
            setCalc({
              ...calc,
              num: calc.num ? calc.num * -1 : 0,
              res: calc.res ? calc.res * -1 : 0
            })
            break;
          case ".":
            setCalc({
              ...calc,
              num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
            })
            break;
          case "=":
            if (calc.sign && calc.num) {
              //Could swap num and res to imporve function here (See Test 14).
              setCalc({
                ...calc,
                res:
                  calc.num === "0" && calc.sign === "/"
                    ? "Can't divide with 0"
                    : math(Number(calc.res), Number(calc.num), calc.sign),
                sign: "",
                num: 0,
              });
            }
        }
      }
    }


  return (
    <div className="App">
      <div id="calculator">
        <div className="display">
          <div id="display">{calc.num ? calc.num.toString() : calc.res}</div>
        </div>
        <div className="buttons">
          <button id="clear" value="clear" className="btn row1" onClick={clear}>
            AC
          </button>
          <button value="invert" className="btn row1" onClick={clickHandler}>
              +/-
          </button>
          <button value="%" className="btn row1" onClick={clickHandler}>
            %
          </button>
          <button id="divide" value="/" className="btn row1 operator" onClick={clickHandler}>
            /
          </button>
          <button id="seven" value="7" className="btn number" onClick={clickHandler}>
            7
          </button>
          <button id="eight" value="8" className="btn number" onClick={clickHandler}>
            8
          </button>
          <button id="nine" value="9" className="btn number" onClick={clickHandler}>
            9
          </button>
          <button id="multiply" value="*" className="btn operator" onClick={clickHandler}>
            x
          </button>
          <button id="four" value="4" className="btn number" onClick={clickHandler}>
            4
          </button>
          <button id="five" value="5" className="btn number" onClick={clickHandler}>
            5
          </button>
          <button id="six" value="6" className="btn number" onClick={clickHandler}>
            6
          </button>
          <button id="subtract" value="-" className="btn operator" onClick={clickHandler}>
            -
          </button>
          <button id="one" value="1" className="btn number" onClick={clickHandler}>
            1
          </button>
          <button id="two" value="2" className="btn number" onClick={clickHandler}>
            2
          </button>
          <button id="three" value="3" className="btn number" onClick={clickHandler}>
            3
          </button>
          <button id="add" value="+" className="btn operator" onClick={clickHandler}>
            +
          </button>
          <button id="zero"  value="0" className="btn btn-xl number" onClick={clickHandler}>
            0
          </button>
          <button id="decimal" value="." className="btn" onClick={clickHandler}>
            .
          </button>
          <button id="equals" value="=" className="btn" onClick={clickHandler}>
            =
          </button>
        </div>
       </div>
       <div className="footer">
        <h2>Javascript Calculator</h2>
      </div>
    </div>
  )
}

export default App
