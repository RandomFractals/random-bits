// URL: https://observablehq.com/@randomfractals/tensorflow-toxicityfilter
// Title: TensorFlow ToxicityFilter
// Author: Taras Novak (@randomfractals)
// Version: 128
// Runtime version: 1

const m0 = {
  id: "5557e901f2146b59@128",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# TensorFlow ToxicityFilter

Using [TensorFlow Toxicity Classifier](https://medium.com/tensorflow/text-classification-using-tensorflow-js-an-example-of-detecting-offensive-language-in-browser-e2b94e3565ce) for analyzing rap lyrics.

See my [compromise.cool NLP collection](https://observablehq.com/collection/@randomfractals/nlp) for prior work I've done in this space.
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Text Input

We'll test toxicity classifier with Nipsey Hussle [Hussle & Motivate](https://www.bing.com/search?q=hussle+and+motivate+lyrics) rap layrics as default :)`
)})
    },
    {
      name: "text",
      inputs: ["html"],
      value: (function(html){return(
html `<textarea rows="10" cols="60">
Pull up in motorcades, I got a show today
It's all I'm tryna do, hustle and motivate
Choppers a throwaway, hustle the Hova way
That's why they follow me, huh, they think I know the way
'Cause I took control of things, balling the solo way
And if you counter my trend, I make you my protege
Slauson Ave soldier race, niggas don't know them days
Take you in back of the buildings, make you expose your age
Take you across the tracks, make you explode a face
Now you official now, but you got a soul to save
I just been cooking that new, I'm 'bout to drop in a few
Think if I call it the great, the people gon' call it the truth
Ain't really trip on the credit, I just payed all of my dues
I disrespected the game, now my name all in the news
Tripping on all of my moves, quote me on this, got a lot more to prove
Remember I came in this bitch, fresh out the county with nothing to lose

Nigga I don't do this for nothing, no
From the ground up, yeah
Well, I don't do this shit for nothing, no
Not at all, yeah
My money real, money real
So I don't do this shit for nothing, no, not at all
I told her I got it, yeah
So I don't do this shit for nothing, not at all
Where the green now?
Hustle and motivate

Back in this bitch like I never left
Stand for some shit that you never rep
Passing through stages in life, through the ups and downs, like it's all just another test
Live by the rules like a fucking ref
I got respect in a hundred sets
Too many chains, need another chest
Playing no games if it wasn't chess
Cut from that cloth that you couldn't stretch
Cut from that serpent you couldn't test
Heavily pressured and under stressed
Even though niggas ain't show up, it was a mess
Honest and template to the left
Judge a young nigga by they address
Left us no option, what they expect?
Only thing we knew for sure was to bang the set
Fuck living basic, I'm taking risks
Fuck what they saying, I'm saying this
Don't waste your time, it don't make you rich, it don't mean nothing
Fuck 'em so let's make a grip
Double up, triple up, make assist
Balling so hard, you could play your bitch
Lead to the lake, if they wanna fish
Make sure them niggas around you stick to the script
This should be written in stone
You should come visit my zone
Don't take my word, double check all of my flows
Ask 'em how Hussle got on, but fuck what you heard
This is for everybody who walked down that road
Sold everything but they soul
Straight off the curb, real niggas rich as you nerds
Addressed to whom it may concern

Nigga I don't do this for nothing, no
From the ground up, yeah
Well, I don't do this shit for nothing, no
Not at all, yeah
My money real, money real
So I don't do this shit for nothing, no, not at all
I told her I got it, yeah
So I don't do this shit for nothing, not at all
Where the green now?
Hustle and motivate

Hustle and motivate (Cut the bass off)
Hustle and mo'
Hustle and mo'
Hustle and motivate
All Money In
Hustle and mo'
Hustle and mo'
Hustle and mo'
Hustle and motivate
(Victory Lap)
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Normalized Text`
)})
    },
    {
      name: "normalizedText",
      inputs: ["html","printHtml","normalizedDoc"],
      value: (function(html,printHtml,normalizedDoc){return(
html `<div class="scrollable-container">
${printHtml(normalizedDoc)}
</div>`
)})
    },
    {
      name: "tagLegends",
      inputs: ["html","tagTypes"],
      value: (function(html,tagTypes){return(
html `<p class="term">
  ${tagTypes.map(type => `<span class="nl-${type}" title="${type}">${type}</span> `)
    .reduce((html, tag) => html + tag)}
</p>`
)})
    },
    {
      name: "tagTypes",
      value: (function(){return(
[
  'Expression',
  'Pronoun',
  'Noun',
  'Verb',
  'Adjective',
  'Adverb',
  'Conjunction',
  'Preposition',
  'Determiner',
  'QuestionWord',
  'Value',  
]
)})
    },
    {
      name: "tagColors",
      value: (function(){return(
{
  Pronoun: '#81acce',
  Verb: 'palevioletred',
  Adverb: '#f39c73',
  Adjective: '#b3d3c6',
  Determiner: '#d3c0b3',
  Preposition: '#9794a8',
  Conjunction: '#c8c9cf',
  QuestionWord: 'lavender',
  Noun: '#7990d6',
  Expression: '#b3d3c6',
  Value: 'palegoldenrod',  
}
)})
    },
    {
      name: "normalizedDoc",
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
      name: "lines",
      inputs: ["text"],
      value: (function(text){return(
text.value.split('\n')
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Toxicity Ranking

TODO: add prose/text lines rows with ✔️ marks for the 'toxicity' flags per imported toxicity model...

| prose | identity attack | insult | obscene | servere toxicity | sexual explicit | threat | toxicity |
| --- | --- | --- | --- | --- | --- | --- | --- |
...`
)})
    },
    {
      name: "headers",
      value: (function(){return(
['prose', 'identity attack', 'insult', 'obscene', 'servere', 'toxicity', 'sexual explicit', 'threat', 'toxicity']
)})
    },
    {
      inputs: ["md","printTable","headers","lines"],
      value: (function(md,printTable,headers,lines){return(
md `${printTable(headers, lines)}`
)})
    },
    {
      name: "printTable",
      value: (function(){return(
function printTable(headers, lines) {
  // header row
  let markdown = `| ${headers.join(' | ')} |
    |`;
  headers.map(header => { markdown += ' --- |'});
  // TODO: rank text lines with toxicity classifier
  return markdown;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      name: "tf",
      inputs: ["require"],
      value: (function(require){return(
require('@tensorflow/tfjs@1.0')
)})
    },
    {
      name: "toxicity",
      inputs: ["require"],
      value: (function(require){return(
require('https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity')
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
      inputs: ["md"],
      value: (function(md){return(
md `## Styles`
)})
    },
    {
      name: "nlpStyles",
      inputs: ["html"],
      value: (function(html){return(
html `
<style>
.scrollable-container {
  max-height: 400px;
  overflow: auto;
}
.short-list {
  max-height: 200px;
}
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
md `## Dev Log

see [#toxicityFilter on Twitter](https://twitter.com/hashtag/toxicityFilter?src=hash)`
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
  id: "5557e901f2146b59@128",
  modules: [m0,m1]
};

export default notebook;
