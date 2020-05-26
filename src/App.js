import React from 'react';
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: [],
            crossed: [],
            hamburgerOpen: false,
            modalOpen: false,
            modalType: undefined,
        }
        this.generateNumber = this.generateNumber.bind(this);
        this.crossField = this.crossField.bind(this);
        this.toggleHamburger = this.toggleHamburger.bind(this);
        this.newCard = this.newCard.bind(this);
        this.exportCard = this.exportCard.bind(this);
        this.importCard = this.importCard.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount(){
        let c = [];
        for(let i = 0; i < 5; i++){
            for (let j = 0; j < 5; j++){
                c.push(this.generateNumber(c,j));
            }
        }
        c[12] = "IQ";
        let cr = Array.from({length:25}, () => false);
        this.setState({
            fields: c,
            crossed: cr,
        })
    }
    generateNumber(source, col){
        let min = col*15 + 1;
        let max = (col+1)*15;
        let c = Math.floor(Math.random() * (max-min)) + min ;
        while(source.indexOf(c) > -1){
            c = Math.floor(Math.random() * (max-min)) + min ;
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
        for(let i = 0; i < 5; i++){
            for (let j = 0; j < 5; j++){
                c.push(this.generateNumber(c,j));
            }
        }
        c[12] = "IQ";
        let cr = Array.from({length:25}, () => false);
        this.setState({
            fields: c,
            crossed: cr,
            hamburgerOpen: false,
        })
    }
    exportCard(){
        this.toggleModal("export");
        this.toggleHamburger();
    }
    importCard(){
        this.toggleModal("import");
        this.toggleHamburger();
    }
    toggleModal(modalType = undefined){
        this.setState({
            modalOpen: !this.state.modalOpen,
            modalType: modalType,
        })
    }
    render(){
        return (
            <div className="App">
                { this.state.modalOpen &&
                    <Modal 
                        toggleModal = {this.toggleModal} 
                        modalType = {this.state.modalType}
                        fields = {this.state.fields}
                    /> 
                }
                <Navbar 
                    hamburgerOpen = {this.state.hamburgerOpen} 
                    toggleHamburger = {this.toggleHamburger}
                    newCard = {this.newCard}
                    exportCard = {this.exportCard}
                    importCard = {this.importCard}
                />
                <div id="bingoWrapper" onClick={()=> this.setState({hamburgerOpen: false})}>
                    <Bingo 
                        fields = {this.state.fields}
                        crossed = {this.state.crossed}
                        crossField = {this.crossField}
                        mode = {1}
                    />
                </div>
            </div>
        )
    }
}
class Bingo extends React.Component{
    render(){
        return(
            <div id="bingo" className={(this.props.mode === 1) ? "" : "bingoMode"}>
                <div className={(this.props.mode === 1) ? "bingoChars" : "bingoChars bingoCharsMode"}>B</div>
                <div className={(this.props.mode === 1) ? "bingoChars" : "bingoChars bingoCharsMode"}>I</div>
                <div className={(this.props.mode === 1) ? "bingoChars" : "bingoChars bingoCharsMode"}>N</div>
                <div className={(this.props.mode === 1) ? "bingoChars" : "bingoChars bingoCharsMode"}>G</div>
                <div className={(this.props.mode === 1) ? "bingoChars" : "bingoChars bingoCharsMode"}>O</div>
                { (this.props.mode === 1) && this.props.fields.map((el,ind) =>{
                    return(
                        <BingoField
                            key={ind}
                            index={ind}
                            number={el}
                            crossed = {this.props.crossed}
                            crossField = {this.props.crossField}
                            mode = {this.props.mode}
                        />
                    )
                })}
                { (this.props.mode === 2) && this.props.fields.map((el,ind) =>{
                    return(
                        <BingoField
                            key={ind}
                            index={ind}
                            number={el}
                            mode = {2}
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
        if(this.props.mode === 1){
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
        else{
            return(
                <div className="bingoField bingoFieldMode">{this.props.number}</div>
            )
        }
    }
}
class Navbar extends React.Component{
    render(){
        return(
            <header className="App-header">
                <div id="navbarContent"><h1>iqd Bingolingo</h1></div>
                <div id="hamburgerMenu" onClick={this.props.toggleHamburger}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                { this.props.hamburgerOpen &&
                    <div id="menuDrawer">
                        <div className="menuItem" onClick={this.props.newCard}>Neue Karte</div>
                        <div className="menuItem" onClick={this.props.exportCard}>Abgleich exportieren</div>
                        <div className="menuItem" onClick={this.props.importCard}>Abgleich importieren</div>
                    </div>
                }
            </header>
        )
    }
}
class Modal extends React.Component{
    render(){
        let headline = (this.props.modalType === "export") ? "Karte exportieren" : "Karte importieren";
        return(
            <div id="modalWrapper">
                <div id="modal" style={(this.props.modalType === "import") ? {height: 700} : {}}>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-start", width: "95%"}}>
                        <div onClick={this.props.toggleModal} id="modalClose">x</div>
                    </div>
                    <h2>{headline}</h2>
                    {this.props.modalType === "export" &&
                        <Export 
                            fields = {this.props.fields}
                            toggleModal = {this.props.toggleModal}
                        />
                    }
                    {this.props.modalType === "import" &&
                        <Import 
                            fields = {this.props.fields}
                        />
                    }
                </div>
            </div>
        )
    }
}
class Export extends React.Component{
    constructor(props){
        super(props);
        this.state={
            textarea: window.btoa(JSON.stringify(this.props.fields)),
        }
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }
    copyToClipboard(){
        let textarea = window.document.querySelector("textarea");
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        this.props.toggleModal();
    }
    render(){
        return(
            <div>
                <div>
                    <textarea value={this.state.textarea}></textarea>
                </div>
                <button onClick={this.copyToClipboard}>Kopieren</button>
            </div>
        )
    }
}
class Import extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            textarea: "",
            fields: [],
        }
        this.textAreaOnChange = this.textAreaOnChange.bind(this);
        this.generateCard = this.generateCard.bind(this);
    }
    textAreaOnChange(evt){
        this.setState({
            textarea: evt.target.value,
        })
    }
    generateCard(){
        this.setState({
            fields: JSON.parse(atob(this.state.textarea)),
        })
    }
    render(){
        return(
            <div>
                <div>
                    <textarea onChange={this.textAreaOnChange} value={this.state.textarea}></textarea>
                </div>
                <div>
                    <button onClick={this.generateCard}>Karte generieren</button>
                </div>
                {(this.state.fields.length === 25) &&
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30}}>
                    <Bingo
                        fields = {this.state.fields}
                        mode = {2}
                    />
                </div>
                }
            </div>
        )
    }
}
export default App;