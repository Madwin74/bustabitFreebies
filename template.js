//
//        This Bustabit script template was created by theSaladMan/DTrump
//
//        REAADME:       <---- Read this really its helpful
//        It does not do any betting for you
//        If you have enableBetting set to false it will never make a bet
//
//        To make bets call:
//          makeBet( baseBetInBits, cashOutInX, autoCashOut );
//                  where baseBetInBits is bits like 1 +
//                  cahsOutInX is the actual cashout like 1.97x
//                  autoCashOut is auto cashOut at cashOutInX
//
//        To Cash out call cashOut(); at any time regardless of if your bet
//                  was manual or script initiated
//
//        Please do not distribute this template for sale, and I appreciated
//            suggestions/feedback from anybody who wants to contribute / improve
//            this script or if you just found it useful



// ================================================================
var enableBetting = false;              // used to enable/disable script generated betting
var baseBet = 0;                        // baseBet in Bits

// running variables
// ================================================================
var round = 0;                          // The Session Round
var last;                               // The Last Bust

// Betting Variables
// ================================================================
var cashedOut = true; // Are you cashed out of this round? true means you are not currently in
                      // the round but that you are out of it if you even entered it at all

// Accounts / Performance variables
// ================================================================
var lastGamePlay = engine.lastGamePlay(); // Last Game Played Variable
var startBR = engine.getBalance();      // Starting Bank Roll
var maxBR = startBR;                    // Max Bank Roll
var minBR = startBR;                    // Min Bank Roll
var curBR = startBR;                    // Current Bank Roll
var userName = engine.getUsername();    // Current Users username
var gamesWon = 0;                       // Number of games Won
var gamesLost = 0;                      // Number of games Lost
var unplayed = 0;                       // Number of games un-played
var net = 0;

// Session Variables
// ================================================================
var busts = new Array();
var cashOutBustRounds = new Array();

// Game about to start
// ================================================================
engine.on('game_starting', function( data ) {

});


// Game started
// ================================================================
engine.on('game_started', function( data ){

});

// Game Crashed
// ================================================================
engine.on('game_crash', function( data ){
  // handle session
  round += 1;                     // Increment Round
  last = data.game_crash/100;     // Last Bust
  busts.unshift( last );          // Add it to the running session bust data

  // handle accounts
  curBR = engine.getBalance();            // Cur BR
  if ( curBR < minBR ) {
    minBR = curBR;                        // Min BR
  } else if ( curBR > maxBR ) {
    maxBR = curBR;                        // Max BR
  }
  net = curBR - startBR;                  // Net BR


  // If you won, lost, or did not play the previous game
  if ( lastGamePlay == "WON") {
    gamesWon += 1;                        // Last Game Won
  } else if ( lastGamePlay == "LOST" ) {
    gamesLost += 1;                       // Last Game Lost
  } else {
    unplayed += 1;                        // Last Game not played
  }

  logRound();   // Log the data
});


// Player Cashed Out
// ================================================================
engine.on('cashed_out', function( data ) {
  // If the user that cashed out is me
  if ( data.username == userName ) {
    cashedOut = true;
  } else {
    // The user that cashed out is not me
  }
});


// Player Bet
// ================================================================
engine.on('player_bet', function( data ) {
  // If the player that made a bet is me
  if ( data.username == userName ) {
    cashedOut = false;
  } else {
    // The player that made the bet is not me
  }
});

// On Message
// ================================================================
engine.on('msg', function( data ) {

});

// On Connect
// ================================================================
engine.on('connect', function( data ) {

});

// On Disconnect
// ================================================================
engine.on('disconnect', function( data ) {

});

// Cash Out
// ================================================================
function cashOut() {
  if ( !cashedOut ) {
    engine.cashOut();
    cashedOut = true;
  }
}

// place a bet
// ================================================================
function placeBet( bet, cash, autoCash ) {
  // NO bet has been placed
  if ( bet ) {
    if ( bet > 0 ) {
      if ( cash ) {
        if ( cash >= 1 ) {
          if ( enableBetting ) {
            cashedOut = false;
            engine.placeBet( bet * 100, cash * 100, autoCash );
          }
        }
      }
    }
  }
}


// Log the game Data
// Youll notice the strings for each variable are created
// and printed in the SAME ORDER as declared initially
// ================================================================
function logRound() {

  // Bot Title:
  var botTitleStr = "\ntheSaladMan Script Template\n";

  // bot settings:
  var enableBettingStr = "\nEnable Betting: " + enableBetting;
  var baseBetStr = "\nBase Bet: " + baseBet;

  // Running Variables
  var roundStr = "\nRound: " + round;
  var lastStr = "\nLast Bust: " + last;

  // Accounts / Performance variables
  // ================================================================
  var cashedOutStr = "\nCashed Out: " + cashedOut;
  var lastGamePlayStr = "\nLast Game: " + lastGamePlay;
  var startBRStr = "\nStarting BR: " + startBR;
  var maxBRStr = "\nMax BR: " + maxBR;
  var minBRStr = "\nMin BR: " + minBR;
  var curBRStr = "\nCur BR: " + curBR;
  var userNameStr = "\nUsername: " + userName;
  var gamesWonStr = "\nGames Won: " + gamesWon;
  var gamesLostStr = "\nGames Lost: " + gamesLost;
  var unplayedStr = "\nUn-Played: " + unplayed;
  var netStr = "\nNet: " + net;

  // Log the variables
  console.log( "\n\n" +
      botTitleStr +
      enableBettingStr +
      baseBetStr +
      roundStr +
      lastStr +
      cashedOutStr +
      lastGamePlayStr +
      startBRStr +
      maxBRStr +
      minBRStr +
      curBRStr +
      userNameStr +
      gamesWonStr +
      gamesLostStr +
      unplayedStr +
      netStr +
      "\n" +
      busts
  );
}

// Math Functions Below this line
// ================================================================
// ================================================================

// Use to sort an array
// ================================================================
numberSort = function (a,b) {
    return a - b;
};

// Mean gets the average of an array of numbers
// Returns -1 if the passed variable is not an array
// ================================================================
function mean( arr ) {
  if ( arr ) {
    if ( arr.constructor  === Array ) {
      if ( arr.length >= 1 ) {
        var sum = 0;
        for ( var i = 0; i < arr.length; i++ ) {
          sum += arr[i];
        }
        return ( sum / arr.length );
      }
    }
  }
  return -1;
}

// Median gets the middle most value of the passed array
// Returns -1 if the variable passed isn't an array
// =======================================================
function median( arr ) {
  if ( arr ) {
    if ( arr.constructor === Array ) {
      if ( arr.length >= 1 ) {
        arr = arr.sort( numberSort );
        if ((arr.length % 2) == 0 ) {
          // Even
          return (((arr[arr.length/2] + arr[(arr.length/2)-1]))/2);
        } else {
          // Odd
          return ( arr[Math.floor(arr.length/2)])
        }
      }
    }
  }
  return -1;
}

// mode gets the most occuring element in the passed array
// Returns -1 if most occuring found occurs only once
// =======================================================
function mode( arr ) {
  if ( arr ) {
    if ( arr.constructor === Array ) {
      if ( arr.length < 1 ) {
        return -1;
      } else {
        var modeMap = {};
        var maxEl = arr[0], maxCount = 1;
        for ( var i = 0; i < arr.length; i++ ) {
        	var el = arr[i];
          if ( modeMap[el] == null ) {
        		modeMap[el] = 1;
          } else {
        		modeMap[el]++;
          }
        	if( modeMap[el] > maxCount ) {
        		maxEl = el;
        		maxCount = modeMap[el];
        	}
        }
        if ( maxCount == 1 ) {
          return -1;
        }
        return maxEl;
      }
    }
  }
  return -1;
}
