// URL: https://beta.observablehq.com/@randomfractals/nlp-word-cloud
// Title: NLP Word Cloud
// Author: Taras Novak (@randomfractals)
// Version: 55
// Runtime version: 1

const m0 = {
  id: "27475421558b3d85@55",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# NLP Word Cloud

Notebook for displaying word cloud with http://compromise.cool NLP library
and [d3 Word Cloud Layout](https://www.jasondavies.com/wordcloud/)`
)})
    },
    {
      name: "wordCloud",
      inputs: ["d3cloud","width","words","cloudConfig","cloudScale","rotateWord","baseFont","fontSize","DOM","d3","wordColors"],
      value: (function*(d3cloud,width,words,cloudConfig,cloudScale,rotateWord,baseFont,fontSize,DOM,d3,wordColors)
{
  var layout = d3cloud()
    .size([width, width * 9/16]) 
    .words(words)
    .padding(cloudConfig.padding * cloudScale)
    .rotate(rotateWord)
    .font(baseFont)
    .fontSize(fontSize)
    .on('word', addWord);

  const svg = DOM.svg(layout.size()[0], layout.size()[1]); // width, height
  const group = d3.select(svg).append('g')
    //.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  
  function addWord (word) {
    const text = group.append('text');
    text.style('font-size', '2px')
      .style('font-family', word.font)
      .style('fill', wordColors(Math.random()))
      .style('cursor', 'pointer')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${[word.x, word.y]})rotate(${word.rotate})`)
      .text(word.text)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .style('font-size', `${word.size}px`);
    text.append('title').text(`${word.text} (${word.count})`); // toolitp
  }
  
  layout.start();
  yield svg;
}
)
    },
    {
      name: "downloadWordCloud",
      inputs: ["html","DOM","rasterize","wordCloud","serialize"],
      value: (async function(html,DOM,rasterize,wordCloud,serialize){return(
html `
${DOM.download(await rasterize(wordCloud), `tag-cloud.png`, "Download as PNG")}
${DOM.download(await serialize(wordCloud), `tag-cloud.svg`, "Download as SVG")}
`
)})
    },
    {
      name: "text",
      inputs: ["html"],
      value: (function(html){return(
html `<textarea rows="10" cols="60">
[Verse 1: Killer Mike]
Hear what I say, we are the business today
Fuck shit is finished today (what)
RT and J—we the new PB & J
We dropped a classic today (what)
We did a tablet of acid today
Lit joints with the matches and ashes away
SKRRRT! We dash away
Donner and Dixon, the pistol is blasting away

[Verse 2: El-P]
Doctors of death
Curing our patients of breath
We are the pain you can trust
Crooked at work
Cookin' up curses and slurs
Smokin' my brain into mush
I became famous for flamin' you fucks
Maimin' my way through the brush
There is no training or taming of me and my bruh
Look like a man, but I'm animal raw

[Verse 3: Killer Mike]
We are the murderous pair
That went to jail and we murdered the murderers there
Then went to Hell and discovered the devil
Delivered some hurt and despair
Used to have powder to push
Now I smoke pounds of the kush
Holy, I'm burnin' a bush
Now I give a fuck about none of this shit
Jewel runner over and out of this bitch

[Hook]
Woo!
Woo!
Step into the spotlight, woo!
Woo!

[Verse 4: El-P]
Copping of uppers and downers get done
I'm in a rush to be numb
Droppin' a thousand ain't much
Come from the clouds
On a missile to turn this whole town into dust
Don't make a sound, baby, hush
I am the living swipe right, on the mic I'm a slut
I don't know how to not spit like a lout
I'll spill a pound of my kids on your couch

[Verse 5: Killer Mike]
Half of a mongrel and mythical team
Villainous treacherous things
Legend says El is a spawn out of Hell
The myth is my mama's a murderous queen
Your life can end like in Godfather 1
You get the gun as I christen my son
If I die today and it's Hell I should pay
Tell the Lord Mikey said, "Fuck, it was fun"

[Verse 6: El-P]
Every new record's my dick in a box
We get a doozy, the moola's a lock
You're getting used to me doing no wrong
I don't play chicken, you prick, I'm a fox
You wanna kick it, I'll give you the rocks
You kiss the wood chipper blade if you bark
I'm fuckin' magic, in fact I'm a warlock of talk
I got a unicorn horn for a (stop)

[Hook]
Woo!
Woo!
Step into the spotlight, woo!
Woo!

[Interlude]
And the crowd goes RTJ!
And the crowd goes RTJ!
And the crowd goes RTJ!
And the crowd goes RTJ!
RTJ!
RTJ!
RTJ!
RTJ!

[Verse 7: Killer Mike]
Mike Pentangeli won't snitch
I'll rent a room at the Ritz
I'll sip a fifth of the whisk
I'll smoke a dub in the tub
Then I will split both my wrists

[Verse 8: El-P]
I'll pull a sword on you simps
Just with a flick of the wrist
Get your neck giving up mist
Me and Mike skip away whistlin' and grin
Every day's golden when you only win

[Verse 9: Killer Mike & El-P]
Bullyin' bastards and beatin' on beats
Sounds like a day at the beach, preach
I keep it middle school, step on your feet
Before you can speak, blaow! to the teeth

[Verse 10: El-P]
We move among the ones you think are meek
You think I'm lion, you right, see my teeth
Don't be a bore when I'm roaring vamoose
Hunting's no fun when your prey doesn't move
I'll put a gun to a bunny like choose
Say somethin' funny or bunny go boom
You got a bevy of shit you could groove
We'd like to thank you for choosing our crew

[Verse 11: Killer Mike]
And that's from the crew you can trust
Warranty plus for fuckin' shit up
We are the no-gooders, do-gooders
Known to the dancers and dealers and doers of dust
</textarea>`
)})
    },
    {
      name: "words",
      inputs: ["toWords","doc"],
      value: (function(toWords,doc){return(
toWords(doc.nouns().out('topk')) // sort by frequency
  .concat(toWords(doc.verbs().out('topk')))
  .concat(toWords(doc.adverbs().out('topk')))
  .concat(toWords(doc.adjectives().out('topk')))
  .sort((a,b) => b.freq - a.freq)
)})
    },
    {
      name: "doc",
      inputs: ["nlp","text"],
      value: (function(nlp,text){return(
nlp(text.value).normalize({
  whitespace: true, // remove hyphens, newlines, and force one space between words
  punctuation: true, // remove commas, semicolons - but keep sentence-ending punctuation
  case: true, // keep only first-word, and 'entity' titlecasing
  numbers: true, // 'one'  →  '1'
  plurals: true, // 'eyes'  →  'eye'  
  verbs: true, // 'swtiched' → 'switch'
})
)})
    },
    {
      name: "wordColors",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleSequential(d3.interpolateRainbow)
)})
    },
    {
      name: "toWords",
      value: (function(){return(
function toWords (terms) {
  return terms.map(term => ({
    text: term.normal,
    count: term.count,
    freq: term.percent/100
  }));
}
)})
    },
    {
      name: "cloudConfig",
      inputs: ["width"],
      value: (function(width){return(
{
  minFontSize: 10,
  maxFontSize: 80,
  height: width/2,
  padding: 1,
}
)})
    },
    {
      name: "initial cloudScale",
      value: (function(){return(
1
)})
    },
    {
      name: "mutable cloudScale",
      inputs: ["Mutable","initial cloudScale"],
      value: (M, _) => new M(_)
    },
    {
      name: "cloudScale",
      inputs: ["mutable cloudScale"],
      value: _ => _.generator
    },
    {
      name: "rotateWord",
      value: (function(){return(
function () { 
  return ~~(Math.random() * 4) * 45 - 45; 
}
)})
    },
    {
      name: "fontFamilies",
      value: (function(){return(
['Corben', 'Pacifico', 'impact']
)})
    },
    {
      name: "baseFont",
      inputs: ["fontFamilies"],
      value: (function(fontFamilies){return(
function (d) {
  return fontFamilies[~~(Math.random() * fontFamilies.length)]
}
)})
    },
    {
      name: "frequencyToSize",
      value: (function(){return(
function (frequency) {
  return Math.sqrt(frequency);
}
)})
    },
    {
      name: "fontSize",
      inputs: ["frequencyToSize","words","cloudConfig","width","mutable cloudScale"],
      value: (function(frequencyToSize,words,cloudConfig,width,$0)
{
  let totalArea = 0;
  let minSize = frequencyToSize(words[words.length-1].freq);
  let maxSize = frequencyToSize(words[0].freq);
  for (let w of words) {
    let size = frequencyToSize(w.freq);
    let fontSize = cloudConfig.minFontSize + 
      (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((size-minSize) / (maxSize-minSize));
    totalArea += (w.text.length * 0.6 + cloudConfig.padding * 2) * fontSize * (fontSize + cloudConfig.padding * 2);
  }
  let s = Math.sqrt(width * cloudConfig.height/totalArea);
  $0.value = s;
  return function (w) {
    return s * (cloudConfig.minFontSize + 
        (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((frequencyToSize(w.freq) - minSize) / (maxSize - minSize))
      );
  }
}
)
    },
    {
      name: "styles",
      inputs: ["html"],
      value: (function(html){return(
html `<h2>Styles</h2>
<link href="https://fonts.googleapis.com/css?family=Pacifico|Corben" rel="stylesheet">
<br />
<p style="font-family:Pacifico;">Pacifico</p>
<p style="font-family:Corben;">Corben</p>
`
)})
    },
    {
      name: "imports",
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      name: "nlp",
      inputs: ["require"],
      value: (function(require){return(
require('compromise')
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3')
)})
    },
    {
      name: "d3cloud",
      inputs: ["require"],
      value: (function(require){return(
require('d3-cloud')
)})
    },
    {
      from: "@mbostock/saving-svg",
      name: "rasterize",
      remote: "rasterize"
    },
    {
      from: "@mbostock/saving-svg",
      name: "serialize",
      remote: "serialize"
    }
  ]
};

const m1 = {
  id: "@mbostock/saving-svg",
  variables: [
    {
      name: "rasterize",
      inputs: ["DOM","serialize"],
      value: (function(DOM,serialize){return(
function rasterize(svg) {
  let resolve, reject;
  const promise = new Promise((y, n) => (resolve = y, reject = n));
  const image = new Image;
  image.onerror = reject;
  image.onload = () => {
    const rect = svg.getBoundingClientRect();
    const context = DOM.context2d(rect.width, rect.height);
    context.drawImage(image, 0, 0, rect.width, rect.height);
    context.canvas.toBlob(resolve);
  };
  image.src = URL.createObjectURL(serialize(svg));
  return promise;
}
)})
    },
    {
      name: "serialize",
      value: (function()
{
  const xmlns = "http://www.w3.org/2000/xmlns/";
  const xlinkns = "http://www.w3.org/1999/xlink";
  const svgns = "http://www.w3.org/2000/svg";
  return function serialize(svg) {
    svg = svg.cloneNode(true);
    svg.setAttributeNS(xmlns, "xmlns", svgns);
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
    const serializer = new window.XMLSerializer;
    const string = serializer.serializeToString(svg);
    return new Blob([string], {type: "image/svg+xml"});
  };
}
)
    }
  ]
};

const notebook = {
  id: "27475421558b3d85@55",
  modules: [m0,m1]
};

export default notebook;
