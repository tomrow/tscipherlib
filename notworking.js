//import * as math from 'math';
//import * as random from 'random';
var a;

function cencode(text, key) {
  var i, output;
  output = [];
  //random.seed(key);

  for (var h = 0, _pj_a = text.length; h < _pj_a; h += 1) {
    i = h + 1;
    output.push((text.charCodeAt(h) + cscramble(i, key)) % 255);
  }

  return output;
}

function cencodeh(text, key) {
  var chara, i, output;
  output = "";
  //random.seed(key);

  for (var h = 0, _pj_a = text.length; h < _pj_a; h += 1) {
    i = h + 1;
    chara = ((text.charCodeAt(h) + cscramble(i, key)) % 255).toString(16);
    chara = chara.slice(2);

    while (chara.length < 2) {
      chara = "0" + chara;
    }

    output = output + chara;
  }

  return output;
}
function radians(multiplier)
{
  return 0.017453292519943295 * multiplier
}
function cscramblem(iterate, key) {
  var interim;
  interim = (iterate + key % 10 * iterate + Math.floor(iterate / 3) + iterate * 2 + Math.floor(9 * Math.sin(radians(iterate * 2))) + random.randint(0, 200)) % 255;
  return interim + 255;
}

function cscramble(iterate, key) {
  console.log("iterate");
  console.log(iterate);
  console.log("Key");
  console.log(key);
  var interim, interimb, interimc, interimd, interime;
  interim = iterate;
  console.log("Step 1");console.log(interim);
  interim += (key % 10) * iterate;
  console.log("Step 2");console.log(interim);
  interim += Math.floor(iterate / 3);
  console.log("Step 3");console.log(interim);
  interim += iterate * 2;
  console.log("Step 4");console.log(interim);
  interim += Math.floor(9 * Math.sin(radians(iterate * 2)));
  console.log("Step 5");console.log(interim);
  console.log("Steps 6 through 12:");
  for (var i = 0; i < 6; i += 1) {
    interimb = Math.sin(radians(key * 2)) * Math.pow(2, 30);
    console.log("interimb 1");console.log(interimb);
    interimb = Math.floor(interimb);
    console.log("interimb 2");console.log(interimb);
    interimb = interimb * 3 ^ iterate * 7;
    console.log("interimb 3");console.log(interimb);
    interimc = interimb >> 5;
    console.log("interimc 1");console.log(interimc);
    interimc = interimc << 5;
    console.log("interimc 1");console.log(interimc);
    interimd = (interimc << 3)>>>0;
  
    console.log("interimd");console.log(interimd);
    interime = interimb ^ interimc;
    console.log("interime 1");console.log(interime);
    interime += interimd;
    console.log("interime 2");console.log(interime);
    interim -= interime;
    console.log("final");console.log(interim);
  }

  interim = interim % 255;
  return interim + 255;
}

function cdecode(array, key) {
  var i, maths, output;
  output = "";
  //random.seed(key);

  for (var h = 0, _pj_a = array.length; h < _pj_a; h += 1) {
    i = h + 1;
    maths = array[h] - cscramble(i, key);
    output += String.fromCharCode(maths % 255);
  }

  return output;
}

function cdecodeh(stringin, key) {
  var array, hexdigits, i, maths, output, ptr, stredit;
  stredit = stringin.toLowerCase();

  if (stringin.length % 2 === 1) {
    stredit = "0" + stringin;
  }

  hexdigits = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 10,
    "b": 11,
    "c": 12,
    "d": 13,
    "e": 14,
    "f": 15
  };
  array = [];

  for (var c = 0, _pj_a = Math.floor(stredit.length / 2); c < _pj_a; c += 1) {
    ptr = c * 2;
    array.push(hexdigits[stredit[ptr]] * 16 + hexdigits[stredit[ptr + 1]]);
  }

  output = "";
  //random.seed(key);

  for (var h = 0, _pj_a = array.length; h < _pj_a; h += 1) {
    i = h + 1;
    maths = array[h] - cscramble(i, key);
    output = output + String.fromCharCode(maths % 255);
  }

  return output;
}

if (true) {
  //console.log(cdecode(cencode("hello", 1), 1));
  //console.log(cdecodeh(cencodeh("aaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzz", 1), 1));
  //a = cencode("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 1);

  //for (var j = 0; j<100; j += 1) {
    //console.log(" " * Math.floor(a[j] / 2) + "#");
    console.log(cscramble(1,1)%255);
  //}
}
