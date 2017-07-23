class Button extends React.Component {

    constructor(props) {
        super(props);
        
        // MUST be named state
        this.state = {
            counter: 0
        }; 

        this.handleClick =  () => {
            // special ASYNCHRONOUS update method provided by React.Component superclass.
            this.setState({
                counter: this.state.counter + 1
            });
        };
    }

    render(){
        return (
            <button onClick={this.handleClick}>
                {this.state.counter}
            </button>
        );
    }

}

ReactDOM.render(<Button />, mountNode);