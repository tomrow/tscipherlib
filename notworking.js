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

function cscramble(i,k)
{
    var a,b,c,d,e,f,r,j,expn;
    expn=16;
    a = i;
    //console.log(a);
    a += ((k%10)*i);
    //console.log(a);
    a += Math.floor(i/3);
    //console.log(a);
    a += (i*2);
    //console.log(a);
    r = Math.sin(radians(i*2));
    r = r*9;
    a += Math.floor(r);
    //console.log(a);
    for(j=0;j<6;j+=1)
    {
        //console.log("for");
        b=Math.sin(radians(k*2));
        //console.log("b", b);
        b=b*Math.pow(2,expn);
        //console.log("b", b);
        b=Math.floor(b);
        //console.log("b", b);
        b=(b*3)^(i*7);
        b=b>>>0;
        //console.log("b", b);
        c=(b>>5)>>>0;
        //console.log("c", c);
        c=(c<<5)>>>0;
        //console.log("c", c);
        d=(c<<3)>>>0;
        //console.log("d", d);
        e=(b^c)>>>0;
        //console.log("e", e);
        e+=d;
        //console.log("e", e);
        i-=e;
        //console.log("i", i);
    }
    i=i%255;
    return i+255;

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
