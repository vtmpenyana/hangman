import React, {Component} from 'react';
import TextBox from './TextBox';
import ReactPlayer from 'react-player/lazy'
import './App.css';
import ErrorBoundry from './ErrorBoundry';
import {connect} from 'react-redux';
import {guessWord} from './actions';
// Lazy load the YouTube player

const mapStateToProps = state => {
    return {
        usersWord: state.usersWord
    }
}

const mapDispatchToProps = dispatcher => {
    return {
        onInputChange : event => dispatcher(guessWord(event.target.value))
    }
}



class App extends Component {
    constructor(){
        super();
        this.state = {
            currentScore: 0,
            playerLives: 11,
            word: 'something',
            textValue: '',
            words: [],
            incompleteWord: '',
            correctWord: '',
            resetInput: false
        }
    }

    componentDidMount(){
        if(this.state.words.length < 1){
            this.setState({incompleteWord: 'loading words, please wait...'});
        }
        fetch('https://random-word-api.herokuapp.com//word?number=100000')
        .then(response => response.json())
        .then(words => {
            const firstWord = words[0];
            let wordSize = firstWord.length;
            let randomLetterIndex = Math.floor(Math.random() * (wordSize -1 ));
            this.setState({words: words, correctWord: firstWord, incompleteWord: firstWord.replace(firstWord[randomLetterIndex], '_')});
        });
    }

    onSubmitClick = () => {
        //check for correctness and clear input field if correct.
        if(this.state.textValue === this.state.correctWord){
            let input = document.querySelector('#inputField');
            input.value = '';
            let randomNumber = Math.floor(Math.random() * (this.state.words.length -1))
            let wordToShow = this.state.words[randomNumber];

            //removing word from list:        
            let listOfWords = this.state.words;
            if(this.state.correctWord === this.state.words[0]){
                listOfWords.splice(listOfWords[0], 1);
                console.log(`it was the first word: ${listOfWords[0]}, we've removed it`);
            }
            else{
                listOfWords.splice(listOfWords[listOfWords.indexOf(randomNumber)], 1);
                console.log(`it was this word: ${wordToShow}`);
            }

            

            //updating the list:
            this.setState({words: listOfWords ,correctWord: wordToShow, 
                incompleteWord: wordToShow
                .replace(wordToShow[Math.floor(Math.random() * (wordToShow.length -1))], '_'),
            currentScore : this.state.currentScore + 5});

            console.log(`wordToShow: ${wordToShow} || incompleteWord: ${this.state.incompleteWord}`);
        }
        else{
            if(this.state.playerLives > 1){
                this.setState({playerLives: this.state.playerLives - 1});
            }
            else{
                alert("Game Over");
                this.setState({currentScore: 0, playerLives : 5});
                let input = document.querySelector('#inputField');
                input.value = '';
            }
        }

        //cheating answers 
        console.log(this.state.words);
    }

    onSearchChange = (event) => { 
        this.setState({textValue: event.target.value});
    }

    render(){
        return(
            <div className='tc'>
                <h1 className='bg-black-90 lh-copy white tracked'>{`Hangman!`}</h1>
                <ErrorBoundry>

                
                    <div className="flex items-center justify-center pa4 bg-lightest-blue navy">
                        <svg className="w1" data-icon="info" viewBox="0 0 32 32">
                            <title>info icon</title>
                            <path d={"M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"} />
                        </svg>
                        <span className="lh-title f4 ml3">{`Score: ${this.state.currentScore}`}</span>
                        <span className="lh-title f4 ml3">{`Remaining Lives: ${this.state.playerLives}`}</span>
                    </div>
                    <h2 className='pa4 f2'>{this.state.incompleteWord}</h2>

                    <TextBox onSearchChange={this.onSearchChange}/>               
                    <a onClick={this.onSubmitClick} className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib mt2 mid-gray" href="#0">Submit</a>
                </ErrorBoundry>
                <div className='center'>
                    <ReactPlayer controls={true} url='https://www.youtube.com/watch?v=cGOeiQfjYPk' />
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);