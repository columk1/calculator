import { useState } from 'react'
import './App.css'

function App() {
    let [calc, setCalc] = useState({
      sign: "",
      num: 0,
      res: 0,
      numMem: 0,
    });

    const [lastClicked, setLastClicked] = useState(null);

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
        //Operator logic
      } else if (e.target.classList.contains("operator")) {
        //If the user clicks "-" after clicking an operator
        if(lastClicked.classList.contains("operator") && value === "-") {
          setCalc({
            ...calc,
            numMem: calc.num,
            num: value,
          })
        } else {
          if (lastClicked.classList.contains("operator")) {
            //If a third operator was clicked after clicking "-", reverse the previous state change.
            if (lastClicked.value === "-") {
              setCalc({
                ...calc, 
                sign: value,
                num: calc.numMem,
              })} else {
                //Otherwise set the sign to the clicked operator.
            setCalc({
              ...calc, 
              sign: value,
            })}
           } else {
            //If lastClicked isn't an operator, run the regular logic for a clicked operator. If there is a result and a number equate them using the operator. If lastClicked was "=" don't change result.
            setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : lastClicked.value === "=" ? calc.res : math(Number(calc.res), Number(calc.num), calc.sign),
            num: 0,
          });
        }
      }
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
      setLastClicked(e.target);
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
