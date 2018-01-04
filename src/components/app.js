import React, {Component} from 'react';
import '../assets/css/app.css';
import '../assets/css/card.css';
import CardData from '../assets/helpers/card_data';
import Card from './card';
import { doubleArray, shuffleArray } from '../assets/helpers/'


class App extends Component{
    constructor(props){
        super(props);

        this.state= {
            firstCardIndex: null,
            cards: [],
            matches: 0,
            attempts: 0,
            gameState: 'ready'

        };
        this.flipCard=this.flipCard.bind(this);
        //if it affects what will be rendered on the screen then it has to go in state
        //since this will be purely mechanical we can set a new property
        //if we were to set this as a set, it would run asynchronously and the flag wouldn't apply appropriately.
        this.blockClick= false;
    }
    componentDidMount(){
        this.setState({
            cards: shuffleArray(doubleArray(CardData))
        })
    }
    handleCardClick(index){
        if (this.blockClick) return;
        const{firstCardIndex, cards}= this.state;
        let matches= this.state.matches;
        let attempts= this.state.attempts;
        let cardIndex= null;
        let gameState= this.state.gameState;

        if(firstCardIndex===null){
            console.log('first card clicked');

            cardIndex=index;
            this.flipCard(index);
        }else{
            this.blockClick= true;
            attempts++;
            console.log('second card clicked');
            const card1= cards[firstCardIndex].front;
            const card2= cards[index].front;
            this.flipCard(index);
            if(card1===card2){
                matches++;
                console.log('found a match!!!');
                if(matches ===cards.length/2){
                    console.log('YOU WINNNNNN!');
                    gameState='won';
                }
                this.blockClick=false;
            }else{
                console.log('the two cards are different :{ ');
                setTimeout(()=>{
                    this.flipCard(firstCardIndex);
                    this.flipCard(index);
                    this.blockClick=false;
                },500);
            }
        }
        this.setState({
            firstCardIndex: cardIndex,
            matches: matches,
            attempts: attempts,
            gameState: gameState
        });

    }
    flipCard(index){
        const newCards= this.state.cards.slice();
        newCards[index].flipped= !newCards[index].flipped;
        this.setState({
            cards: newCards
        });
    }
    render(){
        const {cards, attempts, matches, gameState}= this.state;

        const cardElements= cards.map((card,index)=>{
           return <Card flip ={()=>this.handleCardClick(index)} card={card} key={index}/>

        });
        return(
            <div className="app">
                <h1>Memory Match with Scott-demy</h1>
                <h1>{gameState=== 'won' ? 'You won!!!': ''}</h1>
                <h3>Accuracy: {attempts? ((matches/attempts) * 100).toFixed(2): 0}%</h3>
                <div className='game-board'>
                    {cardElements}
                </div>
            </div>
        )
    }
}
export default App;