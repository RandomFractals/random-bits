// URL: https://beta.observablehq.com/@randomfractals/nlp-text-tags
// Title: NLP Text Tags
// Author: Taras Novak (@randomfractals)
// Version: 27
// Runtime version: 1

const m0 = {
  id: "633ce5bdf8e4c178@27",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# NLP Text Tags

Tagging text with http://compromise.cool NLP library`
)})
    },
    {
      name: "text",
      inputs: ["html"],
      value: (function(html){return(
html `<textarea rows="10" cols="60">
[Intro]
My love is, working hard yadadamean?
My love is, working hard yadadamean?

[Verse 1]
I've been sitting on the charts like a beach chair
My last album spent 52 weeks there
Almost finished with the second, you should be scared
Storms coming you should go inside and prepare
No shortcuts there ain't no cheats there
I brought the whole city out like a street fair, yeah
And fuck it I'm the coldest white rapper in the game
Since the one with the bleached hair
Yeah, you love it when I talk shit
I get around, yeah I'm on my 2Pac shit
I kinda feel there's no girl I could not get
I'm not found at the function if it's not lit
Yeah, it's nothing that no one can tell me
I made it here dolo, nobody to help me
From the Bay, the birthplace of the hyphy
So bitch, come and say to my face you don't like me

[Hook]
My love is, working hard yadadamean?
My love is, working hard yadadamean?
My love is, working hard yadadamean?
My love is, working hard yadadamean?

[Verse 2]
It's like I'm always found where the troubles at
Drinking brown shit now I'm off cup of that
Your girl's on me, what's up with that?
If I like her, all this shit will really take is a double tap
Having visions of fucking an A-list singer, Kardashian, or a Jenner
But Ye's got Kim, Tyga swooped up Kylie
So there's one left watch me go get her
Yeah, they tell me calm down
Fuck that I'm too lit can't calm down
I'm so drunk right now I might fall down
And I don't give a fuck how boring do y'all sound
Up and down on a Wednesday
Then we do the same shit the next day
The next star out the Bay is Eazy
Yadadamean? For sho'
Yadadamean? For sheezy

[Hook]
My love is, working hard yadadamean?
My love is, working hard yadadamean?
My love is, working hard yadadamean?
My love is, working hard yadadamean?

[Outro]
My love is, working hard yadadamean?
My love is, working hard yadadamean?   
</textarea>`
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
  id: "633ce5bdf8e4c178@27",
  modules: [m0,m1]
};

export default notebook;
