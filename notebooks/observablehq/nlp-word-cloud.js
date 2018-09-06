// URL: https://beta.observablehq.com/@randomfractals/nlp-word-cloud
// Title: NLP Word Cloud
// Author: Taras Novak (@randomfractals)
// Version: 57
// Runtime version: 1

const m0 = {
  id: "27475421558b3d85@57",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# NLP Word Cloud

Displaying text words with http://compromise.cool NLP library
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
Look, I was gonna go easy on you and not to hurt your feelings
But I'm only going to get this one chance
Something's wrong, I can feel it (Six minutes, Slim Shady, you're on)
Just a feeling I've got, like something's about to happen, but I don't know what
If that means, what I think it means, we're in trouble, big trouble,
And if he is as bananas as you say, I'm not taking any chances
You were just what the doctor ordered

I'm beginning to feel like a Rap God, Rap God
All my people from the front to the back nod, back nod
Now who thinks their arms are long enough to slap box, slap box?
They said I rap like a robot, so call me Rapbot

But for me to rap like a computer must be in my genes
I got a laptop in my back pocket
My pen'll go off when I half-c*** it
Got a fat knot from that rap profit
Made a living and a killing off it
Ever since Bill Clinton was still in office
With Monica Lewinsky feeling on his nut-sack
I'm an MC still as honest
But as rude and indecent as all hell syllables, killaholic (Kill 'em all with)
This slickety, gibbedy, hibbedy hip hop
You don't really wanna get into a pissing match with this rappidy rap
Packing a Mac in the back of the Ac, pack backpack rap, yep, yackidy-yac
The exact same time I attempt these lyrical acrobat stunts while I'm practicing
That I'll still be able to break a motherf***in' table
Over the back of a couple of faggots and crack it in half
Only realized it was ironic I was signed to Aftermath after the fact
How could I not blow? All I do is drop F-bombs, feel my wrath of attack
Rappers are having a rough time period, here's a Maxipad
It's actually disastrously bad
For the wack while I'm masterfully constructing this masterpiece as

I'm beginning to feel like a Rap God, Rap God
All my people from the front to the back nod, back nod
Now who thinks their arms are long enough to slap box, slap box?
Let me show you maintaining this s*** ain't that hard, that hard

Everybody want the key and the secret to rap immortality like I have got
Well, to be truthful the blueprint's simply rage and youthful exuberance
Everybody loves to root for a nuisance
Hit the earth like an asteroid, did nothing but shoot for the moon since
MC's get taken to school with this music
Cause I use it as a vehicle to bust a rhyme
Now I lead a new school full of students
Me? I'm a product of Rakim, Lakim Shabazz, 2Pac N-
-W.A, Cube, hey, Doc, Ren, Yella, Eazy, thank you, they got Slim
Inspired enough to one day grow up, blow up and be in a position
To meet Run DMC and induct them into the motherf***in' Rock n'
Roll Hall of Fame
Even though I walk in the church and burst in a ball of flames
Only Hall of Fame I be inducted in is the alcohol of fame
On the wall of shame
You fags think it's all a game 'til I walk a flock of flames
Off of planking, tell me what in the f*** are you thinking?
Little gay looking boy
So gay I can barely say it with a straight face looking boy
You witnessing a massacre
Like you watching a church gathering take place looking boy
Oy vey, that boy's gay, that's all they say looking boy
You get a thumbs up, pat on the back
And a way to go from your label everyday looking boy
Hey, looking boy, what you say looking boy?
I got a "hell yeah" from Dre looking boy
I'mma work for everything I have
Never ask nobody for s***, get outta my face looking boy
Basically boy you're never gonna be capable
To keep up with the same pace looking boy

'Cause I'm beginning to feel like a Rap God, Rap God
All my people from the front to the back nod, back nod
The way I'm racing around the track, call me Nascar, Nascar
Dale Earnhardt of the trailer park, the White Trash God
Kneel before General Zod this planet's Krypton, no Asgard, Asgard

So you be Thor and I'll be Odin, you rodent, I'm omnipotent
Let off then I'm reloading immediately with these bombs I'm totin'
And I should not be woken
I'm the walking dead, but I'm just a talking head, a zombie floating
But I got your mom deep throating
I'm out my ramen noodle, we have nothing in common, poodle
I'm a doberman, pinch yourself in the arm and pay homage, pupil
It's me, my honesty's brutal
But it's honestly futile if I don't utilize what I do though
For good at least once in a while
So I wanna make sure somewhere in this chicken scratch I scribble and doodle
Enough rhymes to maybe to try and help get some people through tough times
But I gotta keep a few punchlines just in case cause even you unsigned
Rappers are hungry looking at me like it's lunchtime
I know there was a time where once I
Was king of the underground, but I still rap like I'm on my Pharoahe Monch grind
So I crunch rhymes, but sometimes when you combine
Appeal with the skin color of mine
You get too big and here they come trying to,
Censor you like that one line I said on "I'm Back" from the Marshall Mathers LP
One where I tried to say I take seven kids from Columbine
Put 'em all in a line, add an AK-47, a revolver and a nine
See if I get away with it now that I ain't as big as I was, but I've
Morphed into an immortal coming through the portal
You're stuck in a time warp from 2004 though
And I don't know what the f*** that you rhyme for
You're pointless as Rapunzel with f***ing cornrows
You're like normal, f*** being normal
And I just bought a new Raygun from the future
To just come and shoot ya like when Fabolous made Ray J mad
'Cause Fab said he looked like a fag at Maywhether’s pad
Singin' to a man while they played piano
Man, oh man, that was a 24/7 special on the cable channel
So Ray J went straight to the radio station the very next day
"Hey, Fab, I'mma kill you"
Lyrics coming at you at supersonic speed, (JJ Fad)
Uh, sama lamaa duma lamaa you a**uming I'm a human
What I gotta do to get it through to you I'm superhuman
Innovative and I'm made of rubber
So that anything you saying ricocheting off of me and it'll glue to you
I'm never stating, more than never demonstrating
How to give a motherf***in' audience a feeling like it's levitating
Never fading, and I know that the haters are forever waiting
For the day that they can say I fell off, they'd be celebrating
Cause I know the way to get 'em motivated
I make elevating music, you make elevator music
Oh, he's too mainstream
Well, that's what they do when they get jealous, they confuse it
It's not hip hop, it's pop, cause I found a hella way to fuse it
With rock, shock rap with Doc
Throw on Lose Yourself and make 'em lose it
I don't know how to make songs like that
I don't know what words to use
Let me know when it occurs to you
While I’m ripping any one of these verses diverse as you
It’s curtains, I’m inadvertently hurtin' you
How many verses I gotta murder to,
Prove that if you're half as nice at songs you can sacrifice virgins too uh!
School flunkie, pill junky
But look at the accolades the skills brung me
Full of myself, but still hungry
I bully myself cause I make me do what I put my mind to
And I'm a million leagues above you, ill when I speak in tongues
But it's still tongue in cheek, f*** you
I'm drunk so Satan take the f***ing wheel, I'm asleep in the front seat
Bumping Heavy D and the Boys, still chunky, but funky
But in my head there's something I can feel tugging and struggling
Angels fight with devils, here's what they want from me
They asking me to eliminate some of the women hate
But if you take into consideration the bitter hatred that I had
Then you may be a little patient and more sympathetic to the situation
And understand the discrimination
But f*** it, life's handing you lemons, make lemonade then
But if I can't batter the women how the f*** am I supposed to bake them a cake then?
Don't mistake it for Satan
It's a fatal mistake if you think I need to be overseas
And take a vacation to trip a broad
And make her fall on her face and don't be a retard
Be a king? Think not, why be a king when you can be a God?
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
  id: "27475421558b3d85@57",
  modules: [m0,m1]
};

export default notebook;
