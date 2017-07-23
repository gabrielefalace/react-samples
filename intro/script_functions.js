// https://jscomplete.com/repl
// Function stateless component in:props => out:JSX (looks like HTML)
// properties are immutable (as they are passed from outside)

const Button = (props) => {
    return (
        // React.createElement("button", null, "Go");
        <button>{props.label}</button>
    );
}

// button is without "" and mountNode is the target node
ReactDOM.render(<Button label="Do" />, mountNode);