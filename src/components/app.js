import React, {Component} from 'react';
import '../assets/css/app.css';
import '../assets/css/card.css';
import CardData from '../assets/helpers/card_data';
import Card from './card';


class App extends Component{
    constructor(props){
        super(props);

        this.state= {
            cards: CardData
        };
        this.flipCard=this.flipCard.bind(this);
    }
    flipCard(index){
        const newCards= this.state.cards.slice();
        newCards[index].flipped= !newCards[index].flipped;
        this.setState({
            cards: newCards
        });
    }
    render(){
        const cardElements= this.state.cards.map((card,index)=>{
           return <Card flip ={()=>this.flipCard(index)} card={card} key={index}/>

        });
        return(
            <div className="app">
                {cardElements}
            </div>
        )
    }
}
export default App;