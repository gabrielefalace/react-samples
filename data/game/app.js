//copied from https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };

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
            button = <button className="btn btn-success" onClick={props.acceptAnswer}> 
                <i className="fa fa-check"></i> </button>;
            break;
        case false:
            button = <button className="btn btn-danger"> <i className="fa fa-times"></i> </button>;
            break;
        default:
            button = <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}> = </button>;
            break;
    }
    return (
        <div className="col-2 text-center"> 
            {button}
            <br /> <br />
            <button className="btn btn-warning btn-sm" onClick={props.redraw} disabled={props.redraws === 0}>
                <i className="fa fa-refresh"></i> {props.redraws}
            </button> 
        </div>
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
        if(props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if(props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    };
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

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play again</button>
        </div>
    );
}

class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random()*9);
    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        usedNumbers: [],
        redraws: 5,
        isAnswerCorrect: null, 
        doneStatus: null,
    });
    state = Game.initialState();
    resetGame = () => this.setState(Game.initialState());
    selectNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
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
    // second argument is a callback called when react ends to update the state
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.push(prevState.selectedNumbers),
            selectedNumbers: [],
            isAnswerCorrect:  null, 
            randomNumberOfStars: Game.randomNumber(),
        }), this.updateDoneStatus);
    };
    // second argument is a callback called when react ends to update the state
    redraw = () => {
        if (this.state.redraws === 0) { return; }
        this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(),            
            isAnswerCorrect: null,            
            selectedNumbers: [],
            redraws: prevState.redraws - 1,
        }), this.updateDoneStatus);
    };
    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter(number => usedNumbers.indexOf(number) === -1);
        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    };
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game over!' };
            }
        });
    };
    render() {
        const {randomNumberOfStars, selectedNumbers, isAnswerCorrect, usedNumbers, redraws, doneStatus} = this.state;
        return (
            <div className="container">
                <h3> Play Nine </h3> 
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            isAnswerCorrect={isAnswerCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={redraws}/>
                    
                    <Answer selectedNumbers={selectedNumbers} 
                            undoSelection={this.undoSelection}/>
                </div>
                <br />
                {doneStatus ?  
                    <DoneFrame resetGame={this.resetGame} 
                            doneStatus={doneStatus}/> :
                
                    <Numbers selectedNumbers={selectedNumbers} 
                            selectNumber={this.selectNumber}
                            usedNumbers={usedNumbers}/>
                }
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