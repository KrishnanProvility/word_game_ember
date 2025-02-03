import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const WORDS = [
  "AGENT", "WORLD", "ABOUT", "HEART", "WATER", "SIXTY", "BOARD", "MONTH",
  "MUSIC", "PARTY", "PIANO", "MOUTH", "WOMAN", "SUGAR", "AMBER", "DREAM",
  "LAUGH", "TIGER", "EARTH", "MONEY", "WORDS", "SMILE", "LEMON", "SOUTH",
  "AFTER", "STONE", "THING", "LIGHT", "STORY", "POWER", "TODAY", "RANGE",
  "PEARL", "VENOM", "PROXY", "ROUND", "HOVER", "CANDY", "ABOVE", "PHONE",
  "OTHER", "SMART", "BLACK", "MAGIC", "FRUIT", "RADIO", "ROYAL", "HONEY",
  "FLAKE", "SOUND"
];

export default class WordGameComponent extends Component {
  @tracked currentRow = 0;
  @tracked randomWord = "";
  @tracked inputWord = "";
  @tracked tableData = Array(5).fill(Array(5).fill(""));

  @action
  startGame() {
    this.randomWord = this.randomWordGen();
    this.currentRow = 0;
    this.tableData = Array(5).fill(Array(5).fill(""));
  }

  @action
  updateInput(event) {
    this.inputWord = event.target.value.toUpperCase();
  }

  @action
  wordGame() {
    if (this.inputWord.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }

    if (!this.randomWord) {
      alert("Press Start to begin the game!");
      return;
    }

    this.checkWord(this.randomWord, this.inputWord);
    this.inputWord = "";
  }

  randomWordGen() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  checkWord(randomword, inputWord) {
    this.addWord(randomword, inputWord);

    if (randomword === inputWord) {
      setTimeout(() => alert("Congratulations! You guessed it!"), 500);
      return;
    }

    if (this.currentRow >= 4) {
      setTimeout(() => {
        alert(`Game Over! The word was: ${randomword}`);
        this.startGame();
      }, 1000);
    }
  }

  addWord(randomword, inputWord) {
    const colors = this.matchColor(randomword, inputWord);

    let newTableData = [...this.tableData];
    newTableData[this.currentRow] = inputWord.split("").map((char, index) => ({
      letter: char,
      color: colors[index],
    }));

    this.tableData = newTableData;
    this.currentRow++;
  }

  matchColor(randomWord, inputWord) {
    let colors = new Array(5).fill("grey");
    let usedLetters = new Array(5).fill(false);

    for (let i = 0; i < 5; i++) {
      if (inputWord[i] === randomWord[i]) {
        colors[i] = "green";
        usedLetters[i] = true;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (colors[i] === "green") continue;

      let foundIndex = randomWord.indexOf(inputWord[i]);
      while (foundIndex !== -1) {
        if (!usedLetters[foundIndex]) {
          colors[i] = "yellow";
          usedLetters[foundIndex] = true;
          break;
        }
        foundIndex = randomWord.indexOf(inputWord[i], foundIndex + 1);
      }
    }

    return colors;
  }
}
