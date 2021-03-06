import React from "react";
import './App.css';

const GUESSES=6;
var currGuess=0;
var counter=0;
var correctWord=prompt("Enter the word to be played", "grasp").toLowerCase();
const LETTERS= correctWord.length;
class App extends React.Component
{
    
    renderWords()
    {
        return <Word/>;
    }
    render() 
    {
        var wordList=[];
        wordList.push(<Word/>);
        wordList.push(<br/>);
        for(var i=1; i<GUESSES; i++)
        {
            wordList.push(<div className="wordBox" id={"guess"+i} hidden="true"> <Word/> </div>);
        }
        
        return wordList;
    } 
}
class Word extends React.Component
{
    renderLetter()
    {
        return <Letter text=" " id={counter++} className="Letter"/>;
    }
    render()
    {
        var letterList= [];
        for(var i=0; i<LETTERS; i++)
        {
            letterList.push(this.renderLetter());
        }
        return letterList;
    }
}
class Letter extends React.Component
{
    
    render() {
        return <textarea maxLength={1} id={this.props.id} type="text" className={this.props.className}></textarea>;
    }

}
function getGuess()
{
   let tileColl= document.getElementsByTagName('textarea');
   var tiles = [].slice.call(tileColl);
   tiles=tiles.slice(currGuess*LETTERS);
   var text="";
   for(var i=0; i<tiles.length; i++)
    text+=tiles[i].value;
    return text;
}
window.addEventListener('keydown', function (e) {
    if(e.key=== "Enter")
    {
        processGuess();
    }
   

  }, false);
   

  function processGuess()
  {
        var guess= getGuess();
        if(guess.length===LETTERS)
        {
            isWord(guess.toLowerCase());
        }

  }
  function isWord(word)
  {
        const url= "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
        
        fetch(url).then(response => processResponse(response,word)); 
  }

  function processResponse(response,word)
  {
      if(response.ok)
        {
            changeTiles(word);
            
                
        }
  }
  function changeTiles(word)
  {
      
      let tileColl = document.getElementsByTagName("textarea");
      var tiles = [].slice.call(tileColl);
      tiles= tiles.slice(currGuess*LETTERS);
      if(word===correctWord)
      {
          tiles.forEach(element => {
              element.className="Letter-correct";
              element.disabled=true;
          });
          setTimeout(()=> alert('You win!'),1000);
        
        return;
      }
      for(var i=0; i<LETTERS; i++)
      {
          tiles[i].disabled=true;
          if(word[i]===correctWord[i]) //if correct letter
          {
            tiles[i].className="Letter-correct"; //change the tile to green
            for(let j=0; j<i; j++)
            {
                if(word[i]===word[j] && tiles[j].className!=="Letter-correct")
                {
                    tiles[j].className="Letter";
                }
            }
          }
          else if(correctWord.includes(word[i]))
          {
              tiles[i].className="Letter-almost";
              for(let j=0; j<i; j++)
            {
                if(word[i]===word[j] && tiles[j].className==="Letter-correct")
                {
                    tiles[i].className="Letter";
                }
            }
          }
          else
          {
              tiles[i].className="Letter";
          }
          
      }
      currGuess++;
      if(currGuess===GUESSES)
      {
          alert("You lose!");
          return;
      }
      document.getElementById("guess"+currGuess).hidden=false;
  }




export default App;