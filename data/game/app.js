const Stars = (props) => { 
    return (
        <div className="col-5">
            { _.range(props.numberOfStars).map(iter => <i key={iter} className="fa fa-star"></i>) }
        </div>
    );
};

const Button = (props) => {
    let button;
    switch (props.isAnswerCorrect) {
        case true:
            button = <button className="btn btn-success"> <i className="fa fa-check"></i> </button>;
            break;
        case false:
            button = <button className="btn btn-danger"> <i className="fa fa-times"></i> </button>;
            break;
        default:
            button = <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}> = </button>;
            break;
    }
    return (
        <div className="col-2"> {button} </div>
    );
};

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map( (number, i) =>
                <span key={i} onClick={ () => props.undoSelection(number) }> 
                    {number} 
                </span>
            )}
        </div>
    );
};


const Numbers = (props) => {
    const getClassName = (number) => {
        if(props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    }
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => 
                    <span key={i} className={getClassName(number)}
                          onClick={ () => props.selectNumber(number) }>
                        {number}
                    </span>
                )}
            </div>
        </div>
    );
};

Numbers.list =  _.range(1, 10);

class Game extends React.Component {
    state = {
        selectedNumbers: new Array(),
        randomNumberOfStars: 1 + Math.floor(Math.random()*9),
        isAnswerCorrect: null
    };

    selectNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }
        this.setState(prevState => ({
            isAnswerCorrect: null,
            selectedNumbers: prevState.selectedNumbers.push(clickedNumber)
        }));
    };
    undoSelection = (clickedNumber) => {
        this.setState(prevState => ({
            isAnswerCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };
    checkAnswer = () => {
        this.setState(prevState => ({
            isAnswerCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc+n, 0)
        }));
    };
    render() {
        return (
            <div className="container">
                <h3> Play Nine </h3> 
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.randomNumberOfStars}/>
                    <Button selectedNumbers={this.state.selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            isAnswerCorrect={this.state.isAnswerCorrect}/>
                    <Answer selectedNumbers={this.state.selectedNumbers} 
                            undoSelection={this.undoSelection}/>
                </div>
                <br />
                <Numbers selectedNumbers={this.state.selectedNumbers} 
                         selectNumber={this.selectNumber}/>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}


ReactDOM.render(<App />, mountNode);