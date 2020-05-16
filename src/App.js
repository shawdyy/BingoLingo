import React from 'react';
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: [],
            crossed: [],
            hamburgerOpen: false,
        }
        this.generateNumber = this.generateNumber.bind(this);
        this.crossField = this.crossField.bind(this);
        this.toggleHamburger = this.toggleHamburger.bind(this);
        this.newCard = this.newCard.bind(this);
        this.encodeCard = this.encodeCard.bind(this);
    }
    componentDidMount(){
        let c = [];
        for(let i = 0; i < 25; i++){
            c.push(this.generateNumber(c));
        }
        c[12] = "IQ";
        let cr = Array.from({length:25}, () => false);
        this.setState({
            fields: c,
            crossed: cr,
        })
    }
    generateNumber(source){
        let c = Math.floor(Math.random() * 99) + 1;
        while(source.indexOf(c) > -1){
            c = Math.floor(Math.random() * 99) + 1;
        }
        return c;
    }
    crossField(index){
        let x = [...this.state.crossed];
        x[index] = !x[index];
        this.setState({
            crossed: x,
        });
    }
    toggleHamburger(){
        this.setState({
            hamburgerOpen: !this.state.hamburgerOpen,
        })
    }
    newCard(){
        let c = [];
        for(let i = 0; i < 25; i++){
            c.push(this.generateNumber(c));
        }
        c[12] = "IQ";
        let cr = Array.from({length:25}, () => false);
        this.setState({
            fields: c,
            crossed: cr,
            hamburgerOpen: false,
        })
    }
    encodeCard(){
        let c = window.btoa(JSON.stringify(this.state.fields));
        this.toggleHamburger();
        console.log(c);
    }
    render(){
        return (
            <div className="App">
                <Navbar 
                    hamburgerOpen = {this.state.hamburgerOpen} 
                    toggleHamburger = {this.toggleHamburger}
                    newCard = {this.newCard}
                    encodeCard = {this.encodeCard}
                />
                <div id="bingoWrapper" onClick={()=> this.setState({hamburgerOpen: false})}>
                    <Bingo 
                        fields = {this.state.fields}
                        crossed = {this.state.crossed}
                        crossField = {this.crossField}

                    />
                </div>
            </div>
        )
    }
}
class Bingo extends React.Component{
    render(){
        return(
            <div id="bingo">
                { this.props.fields.map((el,ind) =>{
                    return(
                        <BingoField
                            key={ind}
                            index={ind}
                            number={el}
                            crossed = {this.props.crossed}
                            crossField = {this.props.crossField}
                        />
                    )
                })}
            </div>
        )
    }
}
class BingoField extends React.Component{
    constructor(props){
        super(props);
        this.fieldOnClickHandler = this.fieldOnClickHandler.bind(this);
    }
    fieldOnClickHandler(evt){
        this.props.crossField(this.props.index)
    }
    render(){
        if(this.props.crossed[this.props.index]){
            return(
                <div onClick={this.fieldOnClickHandler} className="bingoField crossed">{this.props.number}</div>
            )
        }
        else{
            return(
                <div onClick={this.fieldOnClickHandler} className="bingoField">{this.props.number}</div>
            )
        }
    }
}
class Navbar extends React.Component{
    render(){
        return(
            <header className="App-header">
                <div id="navbarContent"><h1>IQD Bingolingo</h1></div>
                <div id="hamburgerMenu" onClick={this.props.toggleHamburger}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                { this.props.hamburgerOpen &&
                    <div id="menuDrawer">
                        <div className="menuItem" onClick={this.props.newCard}>Neue Karte</div>
                        <div className="menuItem" onClick={this.props.encodeCard}>Abgleich exportieren</div>
                        <div className="menuItem" onClick={this.props.encodeCard}>Abgleich importieren</div>
                    </div>
                }
            </header>
        )
    }
}
export default App;
