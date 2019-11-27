import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: [],
      math: '',
      mathIndex: 0,
      mathOptions: ["sum", "average", "mode"],
      submitted: false,
      answer: ''
    }
  }

  handleMath = (event) => {
    console.log("math type selected")
    this.setState({
      math: event.target.value
    })
  }

  handleUserInput = (event) => {
    console.log("that's some spicy input!")
    this.setState({
      userInput: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.allFieldsValid()) {
      console.log("form submitted")
      this.handleCalculate();
      this.setState({
        submitted: true
      })
    }
  }

  allFieldsValid = () => {
    return (
      this.state.userInput &&
      this.state.math 
    )
  }

  handleCalculate = (event) => {
    let select = this.state
    let numbers = select.userInput.trim();
    for (let i = 0; i < numbers.length; i += 2) {
      if (isNaN(parseInt(numbers[i]))) {
        this.setState({
          answer: "Whoa! I'm not some sort of math genius. Numbers only please!"
        })
        return
      }
    }

    if (select.math === "sum") {
      console.log("sum selected!")
      let numbers = select.userInput.trim();
      let sum = 0
      for (let i = 0; i < numbers.length; i += 2) {
        sum += parseInt(numbers[i])
      }
      this.setState({
        answer: sum
      })
    } else if (select.math === "average") {
      console.log("average selected!")
      let numbers = select.userInput.trim();
      let average = 0
      let counter = 0
      for (let i = 0; i < numbers.length; i += 2) {
        average += parseInt(numbers[i])
        counter += 1
      }
      this.setState({
        answer: average / counter
      })
    } else if (select.math === "mode") {
      let numbers = select.userInput.trim();
      let numMap = {}
      let greatestFreq = 0
      let mode
      for (let i = 0; i < numbers.length; i += 2) {
        if (numMap[numbers[i]] === undefined) {
          numMap[numbers[i]] = 0
        }
        numMap[numbers[i]] += 1
      }
      for (let element in numMap) {
        if (numMap[element] > greatestFreq) {
          greatestFreq = numMap[element]
          mode = element
        }
      }
      this.setState({
        answer: mode
      })
    }
  }

  render() {

    const { 
      userInput, 
      submitted,  
      math,
      mathIndex,
      mathOptions,
      answer } = this.state;

    let color = mathOptions[mathIndex % 3]

    if (submitted) {
      return (
        <div className="App">
          <div className="header">
            <h1>Sum, Average, Mode</h1>
            <h3>Enter numbers separated by commas and select how you would like your numbers crunched!</h3>
          </div>
          <form className="form" onSubmit={this.handleFormSubmit}>
          <input 
            type="text" 
            placeholder="Enter numbers separated by commas!"
            value={userInput}
            onChange={this.handleUserInput}
          />
          <select
            id="math" 
            onChange={this.handleMath}
            value={math}
          >
            <option value="none"></option>
            <option value="sum">SUM</option>
            <option value="average">AVERAGE</option>
            <option value="mode">MODE</option>
          </select>
          <button>CALCULATE</button>
          </form>
          <div className={color}>
            <p>{answer}</p>
          </div>
        </div>
      ); 
    }
    return (
      <div className="App">
        <div className="header">
          <h1>Sum, Average, Mode</h1>
          <h3>Enter numbers separated by commas and select how you would like your numbers crunched!</h3>
        </div>
        <form className="form" onSubmit={this.handleFormSubmit}>
        <input 
          type="text" 
          placeholder="Enter numbers separated by commas!"
          value={userInput}
          onChange={this.handleUserInput}
        />
        <select
          id="math" 
          onChange={this.handleMath}
          value={math}
        >
          <option value="none"></option>
          <option value="sum">SUM</option>
          <option value="average">AVERAGE</option>
          <option value="mode">MODE</option>
        </select>
        <button>CALCULATE</button>
        </form>
      </div>
    );
  }
}

export default App;
