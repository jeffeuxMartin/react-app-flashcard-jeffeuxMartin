import logo from "../logo.svg";
import "../App.css";
import React from "react";
// import { useState } from "react";

// TODO: 三聯加、state done!

function CalculatorMain(button, { screen, buffer, op_state }) {
  // console.log(
  //   `button = ${button}, ` +
  //   `screen = ${screen}, ` +
  //   `buffer = ${buffer}, ` +
  //   `op_state = ${op_state}, `
  // );
  function check_state(button) {
    if (
      [
        "num0",
        "num1",
        "num2",
        "num3",
        "num4",
        "num5",
        "num6",
        "num7",
        "num8",
        "num9",
      ].includes(button)
    )
      return "number";
    else if (["operadd", "opersub", "opermul", "operdiv"].includes(button))
      return "operator";
    else throw new Error("Weird?");
  }
  if (button === "equal") {
    return {
      screen: String(SafeEval(op_state, buffer, screen)),
      op_state: "",
      buffer: "",
    };
  } else if (button === "ACbt") {
    return {
      screen: "",
      op_state: "",
      buffer: "",
    };
  } else if (check_state(button) === "operator") {
    return {
      // how about 重複按？
      screen: screen,
      op_state: button,
      buffer: buffer,
    };
  } else if (check_state(button) === "number") {
    let button_val = button[3]; // TODO: bad! 寫死
    if (op_state !== "" && buffer === "") {
      // 三階段運算？
      return {
        screen: button_val,
        op_state: op_state,
        buffer: screen,
      };
    } else {
      return {
        screen: screen + button_val,
        op_state: op_state,
        buffer: buffer,
      };
    }
  } else {
    throw new Error("Weird!");
  }
}

function SafeEval(operator, noperand1, noperand2) {
  let operand1 = parseInt(noperand1);
  let operand2 = parseInt(noperand2);
  // console.log(
  //   `operator = ${operator}, ` +
  //   `operand1 = ${operand1}, ` +
  //   `operand2 = ${operand2}, `
  // );

  switch (operator) {
    case "operadd": // "plus":
      return operand1 + operand2;
    case "opersub": // "minus":
      return operand1 - operand2;
    case "opermul": // "multiply":
      return operand1 * operand2;
    case "operdiv": // "divide":
      return operand1 / operand2;
    default:
      throw new Error("Not Implemented Error!");
  }
}

class InApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wholescreenvalue: { screen: "", buffer: "", op_state: "" },
      expression: "",
    };
  }

  bad = () => {
    console.log(logo);
  };
  // 計算機邏輯獨立出來寫 TODO: (screen, button(op/num/=), buffer(op)) --> newscreen)
  // NO eval!
  display = (event) => {
    // console.log(event);
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.innerText);
    let original = this.state.wholescreenvalue;
    let outputval = CalculatorMain(event.currentTarget.id, original);
    // console.log({
    //   before: JSON.stringify(original),
    //   button: JSON.stringify(event.currentTarget.id),
    //   after_: JSON.stringify(outputval),
    // });

    this.setState({
      // screenvalue: this.state.screenvalue + "" + event.currentTarget.innerText,
      // expression: this.state.expression + "" + event.currentTarget.innerText,
      wholescreenvalue: outputval,
    });
    // alert(item);
  };
  countit = (event) => {
    console.log(event);
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.innerText);
    this.setState({
      screenvalue: 0, // eval(this.state.expression),
      expression: 0, // eval(this.state.expression),
    });
    // alert(item);
  };
  render(props) {
    // console.clear();
    return (
      <div id="calculator">
        <div id="screen-wrapper">
          <div id="screen">
            {this.state.wholescreenvalue.screen === ""
              ? "0"
              : this.state.wholescreenvalue.screen}
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="button" id="num7" onClick={this.display}>
                <button>7</button>
              </td>
              <td className="button" id="num8" onClick={this.display}>
                <button>8</button>
              </td>
              <td className="button" id="num9" onClick={this.display}>
                <button>9</button>
              </td>
              <td className="button" id="operdiv" onClick={this.display}>
                <button>/</button>
              </td>
            </tr>
            <tr>
              <td className="button" id="num4" onClick={this.display}>
                <button>4</button>
              </td>
              <td className="button" id="num5" onClick={this.display}>
                <button>5</button>
              </td>
              <td className="button" id="num6" onClick={this.display}>
                <button>6</button>
              </td>
              <td className="button" id="opermul" onClick={this.display}>
                <button>*</button>
              </td>
            </tr>
            <tr>
              <td className="button" id="num1" onClick={this.display}>
                <button>1</button>
              </td>
              <td className="button" id="num2" onClick={this.display}>
                <button>2</button>
              </td>
              <td className="button" id="num3" onClick={this.display}>
                <button>3</button>
              </td>
              <td className="button" id="opersub" onClick={this.display}>
                <button>-</button>
              </td>
            </tr>
            <tr>
              <td className="button" id="num0" onClick={this.display}>
                <button>0</button>
              </td>
              <td className="button ac" id="ACbt" onClick={this.display}>
                <button>AC</button>
              </td>
              <td className="button" id="equal" onClick={this.display}>
                <button>=</button>
              </td>
              <td className="button" id="operadd" onClick={this.display}>
                <button>+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <>
    <header>My (Too) Simple Calculator</header>
    <InApp />
    </>;
  }
}

export default App;

/*      screen buffer op_state   -->   screen buffer  op_state 
 *     |      |      |        |  -->  |      |       |        |
 * 1   |   24 |      |      + |  -->  | 1    |    24 |     +  |

 * 2   |      |      |        |  -->  | 2    |       |        |
 * 4   |    2 |      |        |  -->  | 24   |       |        |
 * 6   |    1 |   24 |      + |  -->  | 16   |    24 |     +  |
  
 * +   |   24 |      |        |  -->  | 24   |       |     +  |
 * =   |   16 |   24 |      + |  -->  | 40   |       |        |
 *     |      |      |        |  -->  |      |       |        |
 *     |      |      |        |  -->  |      |       |        |
 *     |      |      |        |  -->  |      |       |        |
 */

