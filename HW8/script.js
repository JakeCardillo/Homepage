//Jake Cardillo

var draggables = ["draggable1", "draggable2", "draggable3", "draggable4", "draggable5", "draggable6", "draggable7"]
var alphabet = [
  {"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":5},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1},
	{"letter":"_", "value":0, "amount":2}
];

//array that holds the current values of the board squares
var squares = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];

//array that holds ids for images for the letters, used by clearBoard()
var images = ["image1", "image2", "image3", "image4", "image5", "image6", "image7"];

var score = 0;
var highScore = 0;

//indices for bonus squares
var doubleLetter = [1,8,15];
var doubleWord = [4,12];

//Updates the values for word and score
function updateWord(letter, index) {
  currentWord = "";
  //nothing to update
  if (squares[index - 1] == letter[0])
    return;

  //check for bonus squares
  var bonus = 1;
  if (index == doubleLetter[0] || index == doubleLetter[1] || index == doubleLetter[2])
    bonus = 2;

  var prev = squares[index - 1];
  squares[index - 1] = letter;
  var alphID = 0; //index of letter in alphabet array

  //iterate through the alphabet to find match, update alphID
  //when match is found score is updated according to piece
  if (letter == "_") {
    for(var i = 0; i < 27; i++)
    {
      if (alphabet[i]["letter"] == prev)
        alphID = i;
    }
    updateScore(bonus * (0 - alphabet[alphID]["value"]));
  }
  else {
    for(var i = 0; i < 27; i++)
    {
      if (alphabet[i]["letter"] == letter)
        alphID = i;
    }
    updateScore(bonus * (alphabet[alphID]["value"]));
  }

  //create a word from all tiles on board and push to html
  for (var j = 0; j < 15; j++) {
    if (squares[j] != "_")
      currentWord += squares[j];
  }
  var wordText = document.getElementById("word");
  wordText.innerText = currentWord;
}

//used by updateWord to update score
function updateScore(num) {
  score = score + num;
  document.getElementById("score").innerText = score;
}

//runs when the player clicks "Submit Word", calculates score and updates highscore, and clears the board
function submitWord() {
  //check for bonus word squares
  var bonus = 1;
  if (squares[doubleWord[0] - 1] != "_" || squares[doubleWord[1] - 1] != "_")
    bonus = 2;

  //calculate final score and adjust high score if necessary
  var finalScore;
  if (currentWord.length > 2) {
    finalScore = score * bonus;

    //push to html
    if (finalScore > highScore) {
      highScore = finalScore;
      document.getElementById("highscore").innerText = finalScore;
    }
    clearBoard();
  }
}

//clears the board
function clearBoard() {
  //reset the squares array
  for (var i = 0; i < 15; i++)
    squares[i] = "_";

  //reset the player rack
  for (var i = 0; i < 7; i++) {
    var img = document.getElementById(images[i]);
    var letter = imgToLetter(img);

    var newLet = randomLetter();
    if(newLet[0] == "_")
      tile = "graphics_data/Scrabble_Tile_Blank.jpg";
    else
      tile = "graphics_data/Scrabble_Tile_" + newLet + ".jpg";

    img.src = tile;
  }

  //reset word and score
  document.getElementById("word").innerText = "";
  score = 0;
  document.getElementById("score").innerText = 0;

  //reset positions for all the tiles
  var top = "70px";
  var left = "0px";
  for(var i = 0; i < 7; i++){
    var div = document.getElementById(draggables[i]);
    div.style.postion = "absolute";
    div.style.left = left;
    div.style.top = top;
  }
}

//generates a random letter from the alphabet and checks it against a running total of used tiles
var used = new Array(27).fill(0);
function randomLetter(){
  while(1){
    var number = Math.floor(Math.random() * 27);
    if(used[number] < alphabet[number]["amount"]){
      used[number] += 1;
      return alphabet[number]["letter"];
    }
  }
}

//converts source image to corresponding letter
function imgToLetter(img){
  var letter = "";
  switch (img) {
    case "graphics_data/Scrabble_Tile_A.jpg":
      letter = "A";
      break;
    case "graphics_data/Scrabble_Tile_B.jpg":
      letter = "B";
      break;
    case "graphics_data/Scrabble_Tile_Blank.jpg":
      letter = " ";
      break;
    case "graphics_data/Scrabble_Tile_C.jpg":
      letter = "C";
      break;
    case "graphics_data/Scrabble_Tile_D.jpg":
      letter = "D";
      break;
    case "graphics_data/Scrabble_Tile_E.jpg":
      letter = "E";
      break;
    case "graphics_data/Scrabble_Tile_F.jpg":
      letter = "F";
      break;
    case "graphics_data/Scrabble_Tile_G.jpg":
      letter = "G";
      break;
    case "graphics_data/Scrabble_Tile_H.jpg":
      letter = "H";
      break;
    case "graphics_data/Scrabble_Tile_I.jpg":
      letter = "I";
      break;
    case "graphics_data/Scrabble_Tile_J.jpg":
      letter = "J";
      break;
    case "graphics_data/Scrabble_Tile_K.jpg":
      letter = "K";
      break;
    case "graphics_data/Scrabble_Tile_L.jpg":
      letter = "L";
      break;
    case "graphics_data/Scrabble_Tile_M.jpg":
      letter = "M";
      break;
    case "graphics_data/Scrabble_Tile_N.jpg":
      letter = "N";
      break;
    case "graphics_data/Scrabble_Tile_O.jpg":
      letter = "O";
      break;
    case "graphics_data/Scrabble_Tile_P.jpg":
      letter = "P";
      break;
    case "graphics_data/Scrabble_Tile_Q.jpg":
      letter = "Q";
      break;
    case "graphics_data/Scrabble_Tile_R.jpg":
      letter = "R";
      break;
    case "graphics_data/Scrabble_Tile_S.jpg":
      letter = "S";
      break;
    case "graphics_data/Scrabble_Tile_T.jpg":
      letter = "T";
      break;
    case "graphics_data/Scrabble_Tile_U.jpg":
      letter = "U";
      break;
    case "graphics_data/Scrabble_Tile_V.jpg":
      letter = "V";
      break;
    case "graphics_data/Scrabble_Tile_W.jpg":
      letter = "W";
      break;
    case "graphics_data/Scrabble_Tile_X.jpg":
      letter = "X";
      break;
    case "graphics_data/Scrabble_Tile_Y.jpg":
      letter = "Y";
      break;
    case "graphics_data/Scrabble_Tile_Z.jpg":
      letter = "Z";
      break;
    default:
      letter = "_";
    }
  return letter;
}
