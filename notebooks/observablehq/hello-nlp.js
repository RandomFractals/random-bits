// URL: https://beta.observablehq.com/@randomfractals/hello-nlp
// Title: Hello, NLP!
// Author: Taras Novak (@randomfractals)
// Version: 245
// Runtime version: 1

const m0 = {
  id: "c2ff228e09d0a4ae@245",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Hello, NLP!

Visualizing music lyrics with http://compromise.cool natural language processing (NLP) library
and [d3 Word Cloud Layout](https://github.com/jasondavies/d3-cloud)
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Mac Miller - [Self Care (video)](https://www.youtube.com/watch?v=SsKT0s5J8ko)`
)})
    },
    {
      name: "lyrics",
      value: (function(){return(
`
Yeah, yeah, yeah, yeah
Yeah, yeah, yeah

I switched the time zone, but what do I know?
Spending nights hitchhikin', where will I go?
I could fly home with my eyes closed
But it be kinda hard to see, that's no surprise though
You can find me, I ain't hiding
I don't move my feet when I be gliding
I just slide in and then I roll out

Yeah, well, climbing over that wall
I remember, yes, I remember, yes, I remember it all
Swear the height be too tall so like September I fall
Down below, now I know that the medicine be on call, yeah
It's feeling like you hot enough to melt, yeah
Can't trust no one, can't even trust yourself yeah
And I love you, I don't love nobody else, yeah
Tell them they can take that bullshit elsewhere
Self care, I'm treatin' me right
Hell yea, we're gonna be alright
(We gon' be alright)

I switched the time zone, but what do I know?
Spending nights hitchhikin', where will I go?
I could fly home with my eyes closed
But it be kinda hard to see, that's no surprise though
You can find me, I ain't hiding
I don't move my feet when I be gliding
I just slide in and then I roll out

Been on the road
I don't see it
Out on the road
I don't see it

Yeah, I been reading them signs
I been losin' my, I been losin' my, I been losin' my mind, yeah
Get the fuck out the way, must be this high to play
It must be nice up above the lights, and what a lovely life that I made
I know that feelin' like it's in my family tree, yeah
That Mercedes drove me crazy, I was speedin'
Somebody save me from myself, yeah
Tell them they can take that bullshit elsewhere
Self care, we gonna be good
Hell yeah, they lettin' me go

I switched the time zone, but what do I know?
Spending nights hitchhikin', where will I go?
I could fly home with my eyes closed
But it be kinda hard to see, that's no surprise though
You can find me, I ain't hiding
I don't move my feet when I be gliding
I just slide in and then I roll out

And I didn't know, I didn't know
I didn't know, I didn't know, hey
Well, didn't know what I was missing, now it see a lil' different
I was thinking too much
Got stuck in oblivion, yeah, yeah
Oblivion, yeah, yeah
Oblivion, yeah, yeah
I got all the time in the world so for now, I'm just chilling
Plus I know it's a, it's a beautiful feeling
In oblivion, yeah, yeah
Oblivion, yeah, yeah
Oblivion, yeah, yeah
Yeah, ok I ride around my city when I come home
The sun set quickly then get up slow
My disc connect and upload
Watch it spin around, we just spinnin' round
Let's go and travel through the unknown
We play it cool we know we fucked up, yeah
You keep on sayin' you in love, so
Tell me are you really down?
Are you really down? Yeah
Let's go back to my crib and play some 45's
It's safer there, I know there's still a war outside
We spend our nights all liquored up, our mornings high
Can you feel it now?

Oblivion, yeah, yeah
Oblivion, yeah, yeah, yeah, yeah, yeah, yeah, yeah, yeah
Oblivion, yeah, yeah
I got all the time in the world, so for now I'm just chilling
Plus, I know it's a
It's a beautiful feeling
In oblivion, yeah, yeah
Oblivion yeah, yeah
Oblivion, yeah, yeah
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Lyrics Word Cloud`
)})
    },
    {
      name: "cloud",
      inputs: ["d3cloud","width","words","cloudConfig","scale","rotation","baseFont","fontSize","DOM","d3","color"],
      value: (function*(d3cloud,width,words,cloudConfig,scale,rotation,baseFont,fontSize,DOM,d3,color)
{
  var layout = d3cloud()
    .size([width, width * 9/16]) 
    .words(words)
    .padding(cloudConfig.padding * scale)
    .rotate(rotation)
    .font(baseFont)
    .fontSize(fontSize)
    .on('word', draw);

  const svg = DOM.svg(layout.size()[0], layout.size()[1]);
  const group = d3.select(svg).append('g')
    //.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  
  function draw(word) {
    const text = group.append('text');
    text.style('font-size', '2px')
      .style('font-family', word.font)
      .style('fill', color(Math.random()))
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
      name: "color",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleSequential(d3.interpolateRainbow)
)})
    },
    {
      name: "words",
      inputs: ["toWords","normalVerbs","normalNouns"],
      value: (function(toWords,normalVerbs,normalNouns){return(
toWords(normalVerbs).concat(toWords(normalNouns)).sort((a,b) => b.freq - a.freq)
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
      name: "nwords",
      inputs: ["normalVerbs","normalNouns"],
      value: (function(normalVerbs,normalNouns){return(
normalVerbs.length + normalNouns.length
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
      name: "initial scale",
      value: (function(){return(
1
)})
    },
    {
      name: "mutable scale",
      inputs: ["Mutable","initial scale"],
      value: (M, _) => new M(_)
    },
    {
      name: "scale",
      inputs: ["mutable scale"],
      value: _ => _.generator
    },
    {
      name: "rotation",
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
      inputs: ["frequencyToSize","words","cloudConfig","width","mutable scale"],
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
  return function(w) {
    return s * (cloudConfig.minFontSize + 
        (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((frequencyToSize(w.freq) - minSize) / (maxSize - minSize))
      );
  }
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Lyrics NLP`
)})
    },
    {
      name: "doc",
      inputs: ["nlp","lyrics"],
      value: (function(nlp,lyrics){return(
nlp(lyrics)
)})
    },
    {
      name: "tags",
      inputs: ["doc"],
      value: (function(doc){return(
doc.out('tags')
)})
    },
    {
      name: "verbs",
      inputs: ["doc"],
      value: (function(doc){return(
doc.verbs().out('array')
)})
    },
    {
      name: "normalVerbs",
      inputs: ["normalDoc"],
      value: (function(normalDoc){return(
normalDoc.verbs().out('topk')
)})
    },
    {
      name: "nouns",
      inputs: ["doc"],
      value: (function(doc){return(
doc.nouns().out('array')
)})
    },
    {
      name: "normalNouns",
      inputs: ["normalDoc"],
      value: (function(normalDoc){return(
normalDoc.nouns().out('topk')
)})
    },
    {
      name: "normalNounsList",
      inputs: ["printList","normalNouns"],
      value: (function(printList,normalNouns){return(
printList(normalNouns)
)})
    },
    {
      name: "normalVerbsList",
      inputs: ["printList","normalVerbs"],
      value: (function(printList,normalVerbs){return(
printList(normalVerbs)
)})
    },
    {
      name: "normalDoc",
      inputs: ["doc"],
      value: (function(doc){return(
doc.normalize({
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
      inputs: ["printHtml","normalDoc"],
      value: (function(printHtml,normalDoc){return(
printHtml(normalDoc)
)})
    },
    {
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
      from: "@spencermountain/nlp-compromise",
      name: "printList",
      remote: "printList"
    },
    {
      from: "@spencermountain/nlp-compromise",
      name: "printHtml",
      remote: "printHtml"
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
      inputs: ["md"],
      value: (function(md){return(
md `## Styles`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html `
<link href="https://fonts.googleapis.com/css?family=Pacifico|Corben" rel="stylesheet">
<p style="font-family:Pacifico;">Pacifico</p>
<p style="font-family:Corben;">Corben</p>
`
)})
    },
    {
      name: "nlpStyles",
      inputs: ["html"],
      value: (function(html){return(
html `
<style>
.big{
  font-size:1.5rem;
  color:cornflowerblue;
}
.small{
  color:grey;
  margin-top:30px;
}

.term { color:grey; cursor:pointer;}
.nl-Person { border-bottom:2px solid #6393b9; }
.nl-Pronoun { border-bottom:2px solid #81acce; }
.nl-Plural { border-bottom:2px solid steelblue; }
.nl-Singular { border-bottom:2px solid lightsteelblue; }
.nl-Verb { border-bottom:2px solid palevioletred; }
.nl-Adverb { border-bottom:2px solid #f39c73; }
.nl-Adjective { border-bottom:2px solid #b3d3c6; }
.nl-Determiner { border-bottom:2px solid #d3c0b3; }
.nl-Preposition { border-bottom:2px solid #9794a8; }
.nl-Conjunction { border-bottom:2px solid #c8c9cf; }
.nl-Value { border-bottom:2px solid palegoldenrod; }
.nl-QuestionWord { border-bottom:2px solid lavender; }
.nl-Acronym { border-bottom:2px solid violet; }
.nl-Possessive { border-bottom:2px solid #7990d6; }
.nl-Noun { border-bottom:2px solid #7990d6; }
.nl-Expression { border-bottom:2px solid #b3d3c6; }
.nl-Negative { border-bottom:2px solid #b4adad; }
</style>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## References

- [Compromise NLP](https://beta.observablehq.com/@spencermountain/nlp-compromise)
- [Compromise NLP Normalize](https://beta.observablehq.com/@spencermountain/compromise-normalization)
- [Wordle Like Clouds](https://beta.observablehq.com/@esperanc/wordle-like-clouds)
`
)})
    }
  ]
};

const m1 = {
  id: "@spencermountain/nlp-compromise",
  variables: [
    {
      name: "printList",
      value: (function()
{ 
  const max = 35
  return (list) => {
     let len=list.length
     list=list.slice(0, max)
     let el = document.createElement("table");
     el.innerHTML = list.reduce((str, o)=>{
       str += '<tr>'
       str += `<td style="color:#46468B;">${o.normal || o.text || ''}</td>`
       str += `<td style="color:#7A7A8B;">${o.count || ''}</td>`
       str += `<td style="color:#B7B7D1;">${o.percent+ '%'}</td>`
        str += '</tr>'
       return str
     },'')
     if(len>list.length){
       el.innerHTML+='<b>(of '+len+' results)<b>'
     }
     return el
   } 
}
)
    },
    {
      name: "printHtml",
      inputs: ["DOM"],
      value: (function(DOM){return(
function printHtml(doc){
  let el = DOM.element()
  let html = doc.out('html')
  el.innerHTML = html
  //add a hover 'title'
  let sentences= el.children[0].children
  for (var i = 0; i < sentences.length; i++) {
    sentences[i].style='display:block;'
    for (var o = 0; o < sentences[i].children.length; o++) {
      let e=sentences[i].children[o]
      var tags = e.getAttribute('class').split(' ').map(c=>c.replace(/^nl-/,' '))
      e.classList.add('term')
      e.setAttribute('title', tags)
    }
  }
  return el
}
)})
    }
  ]
};

const notebook = {
  id: "c2ff228e09d0a4ae@245",
  modules: [m0,m1]
};

export default notebook;
