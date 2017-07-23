const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width="75" src={props.avatar} />
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}> {props.name} </div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card {...card}/>)}
        </div>
    );
};


class Form extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: from Submit', this.userNameInput.value);
    };
    
    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                       placeholder="Github username" 
                       ref={(input) => this.userNameInput= input}
                       required />
                <button type="submit" >Add card</button>
            </form>
        );
    }
}

// Parent component to hanlde the connection between CardList and Form
class App extends React.Component {
    state = {
        cards: [
            {name: "Gabriele Falace",
            company:  "AAS Bad-ideas Over-engineering",
            avatar: "https://avatars2.githubusercontent.com/u/5612058?v=4" },
            {name: "Daniela Martino",
            company:  "Outfittery",
            avatar: "https://avatars1.githubusercontent.com/u/8245043?v=4" },
        ]
    };
    
    render () {
        return (
            <div>
                <Form />
                <CardList cards={this.state.cards}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);