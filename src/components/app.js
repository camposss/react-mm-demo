import React, {Component} from 'react';
import '../assets/css/app.css';
import '../assets/css/card.css';
import CardData from '../assets/helpers/card_data';
import Card from './card';


class App extends Component{
    constructor(props){
        super(props);

        this.state= {
            firstCardIndex: null,
            cards: CardData,
            matches: 0,
            attempts: 0,

        };
        this.flipCard=this.flipCard.bind(this);
    }
    handleCardClick(index){
        const{firstCardIndex, cards}= this.state;
        let matches= this.state.matches;
        let attempts= this.state.attempts;

        if(firstCardIndex===null){
            console.log('first card clicked');

            this.setState({
                firstCardIndex: index
            });
            this.flipCard(index);
        }else{
            attempts++;
            console.log('second card clicked');
            const card1= cards[firstCardIndex].front;
            const card2= cards[index].front;
            this.flipCard(index);
            if(card1===card2){
                matches++;
                console.log('found a match!!!');
                this.setState({
                    firstCardIndex: null,
                    matches: matches,
                    attempts: attempts
                });
                if(matches ===cards.length/2){
                    console.log('YOU WINNNNNN!');
                }
            }else{
                console.log('the two cards are different :{ ');
                setTimeout(()=>{
                    this.flipCard(firstCardIndex);
                    this.flipCard(index);
                },500);
                this.setState({
                    firstCardIndex: null,
                    attempts: attempts
                })
            }
        }

    }
    flipCard(index){
        const newCards= this.state.cards.slice();
        newCards[index].flipped= !newCards[index].flipped;
        this.setState({
            cards: newCards
        });
    }
    render(){
        const {cards, attempts, matches}= this.state;


        const cardElements= cards.map((card,index)=>{
           return <Card flip ={()=>this.handleCardClick(index)} card={card} key={index}/>

        });
        return(
            <div className="app">
                <h1>Memory Match with Scott-demy</h1>
                <h3>Accuracy: {attempts? ((matches/attempts) * 100).toFixed(2): 0}%</h3>
                <div className='game-board'>
                    {cardElements}
                </div>
            </div>
        )
    }
}
export default App;