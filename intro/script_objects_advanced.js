// https://jscomplete.com/repl
// components must be uppercase
// use bubble.js to support JSX
// Stateful component (Object) in:(props,state) => out:JSX (looks like HTML)

class Button extends React.Component {
  
  handleClick = () => {
  	this.props.onClickFunction(this.props.incrementValue);
  };
  
  render() {
  	return (
    	<button onClick={this.handleClick}>
            {this.props.incrementValue} x 👍
        </button>
    );
  }
}


const Result = (props) => {
	return (
  	<div> {props.counter} </div>
  );
};

class App extends React.Component {
  
    // this is the state of the Component (syntax allowed by bubble.js)
    state = { counter: 0 };		

    // whenever state is updated based  on the previous state
	incrementCounter = (incrementValue) => {
        this.setState((prevState) => {
            return {
                counter: prevState.counter + incrementValue
            };
        });
    };

	render(){
        return (
            <div>
                <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
                <Button incrementValue={4} onClickFunction={this.incrementCounter}/>
                <Result counter={this.state.counter}/>
            </div>
        );
    }
}

// mount component to target
ReactDOM.render(<App />, mountNode);