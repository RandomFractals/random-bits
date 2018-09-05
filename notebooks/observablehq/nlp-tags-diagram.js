// URL: https://beta.observablehq.com/@randomfractals/nlp-tags-diagram
// Title: NLP Tags Diagram
// Author: Taras Novak (@randomfractals)
// Version: 64
// Runtime version: 1

const m0 = {
  id: "e92eff14ab092b9d@64",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# NLP Tags Diagram`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Notebook for displaying NLP tags from 
[Compromise Tags](https://beta.observablehq.com/@spencermountain/compromise-tags)

...`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## [RTJ!](https://www.youtube.com/watch?v=vWaljXUiCaE&index=3&list=RDBEOximWoFd0) :)`
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
      name: "normalizedText",
      inputs: ["html","printHtml","normalizedDoc"],
      value: (function(html,printHtml,normalizedDoc){return(
html `<div class="scrollable-container">
${printHtml(normalizedDoc)}
</div>`
)})
    },
    {
      inputs: ["legends"],
      value: (function(legends){return(
legends
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# TODO: 
add tags diagram, using this code bit: 
https://beta.observablehq.com/@randomfractals/notebooks#notebooksGraph
`
)})
    },
    {
      inputs: ["tagTypes"],
      value: (function(tagTypes){return(
tagTypes
)})
    },
    {
      inputs: ["tagColors"],
      value: (function(tagColors){return(
tagColors
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
      from: "@randomfractals/hello-nlp",
      name: "tagTypes",
      remote: "tagTypes"
    },
    {
      from: "@randomfractals/hello-nlp",
      name: "tagColors",
      remote: "tagColors"
    },
    {
      from: "@randomfractals/hello-nlp",
      name: "legends",
      remote: "legends"
    },
    {
      from: "@randomfractals/hello-nlp",
      name: "toWords",
      remote: "toWords"
    },
    {
      from: "@randomfractals/hello-nlp",
      name: "toShortList",
      remote: "toShortList"
    },
    {
      from: "@jashkenas/inputs",
      name: "textarea",
      remote: "textarea"
    },
    {
      name: "styles",
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
      name: "references",
      inputs: ["md"],
      value: (function(md){return(
md `## References

- [Compromise NLP Intro](https://beta.observablehq.com/@spencermountain/nlp-compromise)
- [Compromise NLP Normalize](https://beta.observablehq.com/@spencermountain/compromise-normalization)
- [Compromise NLP Topics](https://beta.observablehq.com/@spencermountain/topics-named-entity-recognition)
- [Compromise Tags](https://beta.observablehq.com/@spencermountain/compromise-tags)
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

const m2 = {
  id: "@randomfractals/hello-nlp",
  variables: [
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
      name: "legends",
      inputs: ["html","tagTypes"],
      value: (function(html,tagTypes){return(
html `<p class="term">
  ${tagTypes.map(type => `<span class="nl-${type}" title="${type}">${type}</span> `)
    .reduce((html, tag) => html + tag)}
</p>`
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
      name: "toShortList",
      inputs: ["html"],
      value: (function(html){return(
function toShortList(list) {
  return html `<div class="scrollable-container short-list">${list}</div>`;
}
)})
    }
  ]
};

const m3 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "textarea",
      inputs: ["input","html"],
      value: (function(input,html){return(
function textarea(config = {}) {
  let {value, title, description, autocomplete, cols = 45, rows = 3, maxlength, placeholder, spellcheck, wrap, submit} = config;
  if (typeof config == "string") value = config;
  if (value == null) value = "";
  const form = input({
    form: html`<form><textarea style="display: block; font-size: 0.8em;" name=input>${value}</textarea></form>`, 
    title, description, submit,
    attributes: {autocomplete, cols, rows, maxlength, placeholder, spellcheck, wrap}
  });
  form.output.remove();
  if (submit) form.submit.style.margin = "0";
  if (title || description) form.input.style.margin = "3px 0";
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {form, type = "text", attributes = {}, action, getValue, title, description, format, submit, options} = config;
  if (!form) form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit) form.append(html`<input name=submit type=submit style="margin: 0 0.75em" value="${typeof submit == 'string' ? submit : 'Submit'}" />`);
  form.append(html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`);
  if (title) form.prepend(html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`);
  if (description) form.append(html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`);
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit ? "onsubmit" : type == "button" ? "onclick" : type == "checkbox" || type == "radio" ? "onchange" : "oninput";
    form[verb] = (e) => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output) form.output.value = format ? format(value) : value;
      form.value = value;
      if (verb !== "oninput") form.dispatchEvent(new CustomEvent("input"));
    };
    if (verb !== "oninput") input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = (e) => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    }
  ]
};

const notebook = {
  id: "e92eff14ab092b9d@64",
  modules: [m0,m1,m2,m3]
};

export default notebook;
