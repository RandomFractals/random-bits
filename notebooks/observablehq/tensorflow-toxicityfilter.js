// URL: https://observablehq.com/@randomfractals/tensorflow-toxicityfilter
// Title: TensorFlow ToxicityFilter
// Author: Taras Novak (@randomfractals)
// Version: 282
// Runtime version: 1

const m0 = {
  id: "5557e901f2146b59@282",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# TensorFlow ToxicityFilter

Using [TensorFlow Toxicity Classifier](https://medium.com/tensorflow/text-classification-using-tensorflow-js-an-example-of-detecting-offensive-language-in-browser-e2b94e3565ce) for analyzing rap lyrics.

See my [compromise.cool NLP collection](https://observablehq.com/collection/@randomfractals/nlp) for the prior work I've done in this space.
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
      name: "headers",
      value: (function(){return(
['line', 'identity attack', 'insult', 'obscene', 'severe toxicity', 'sexual explicit', 'threat', 'toxicity']
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Toxicity Ranking`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `*NOTE*: toxicity model is ~28 Mbytes and takes ~10 seconds to load on a decent laptop or workstation. Once loaded it takes only ~30-50 msecs to rank each text line.`
)})
    },
    {
      name: "labels",
      inputs: ["headers"],
      value: (function(headers){return(
headers.slice(1).map(header => header.replace(' ', '_'))
)})
    },
    {
      name: "viewof threshold",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 0.5, 
  max: 0.9, 
  step: 0.05,
  value: 0.85,
  format: ".0%",
  description: "Prediction confidence level"
})
)})
    },
    {
      name: "threshold",
      inputs: ["Generators","viewof threshold"],
      value: (G, _) => G.input(_)
    },
    {
      name: "toxicityModel",
      inputs: ["toxicity","threshold","labels"],
      value: (async function(toxicity,threshold,labels){return(
await toxicity.load(threshold, labels).then(model => model)
)})
    },
    {
      inputs: ["md","printTable","headers","lines"],
      value: (async function(md,printTable,headers,lines){return(
md `${await printTable(headers, lines)}`
)})
    },
    {
      name: "printTable",
      inputs: ["toxicityModel","labels"],
      value: (function(toxicityModel,labels){return(
async function printTable(headers, lines) {
  // header row
  let markdown = `| ${headers.join(' | ')} |\n|`;
  headers.forEach(header => { markdown += ' --- |'});
  // run text lines through toxicity model classifier
  const table = toxicityModel.classify(lines).then(predictions => {
    for (let i=0; i<lines.length; i++) {
      markdown += '\n| ' + lines[i] + ' |';
      for (let k=0; k < labels.length; k++) {
        // convert toxicity classifier predictions to md cells with ✔️
        markdown += predictions[k].results[i].match ? ' ✔️ |': ' . |'; 
      }
    }
    console.log(predictions);
    return Promise.resolve(markdown);
  });
  return table;
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
      name: "printHtml",
      remote: "printHtml"
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
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
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {value, min = 0, max = 1, step = "any", precision = 2, title, description, getValue, format, display, submit} = config;
  if (typeof config == "number") value = config;
  if (value == null) value = (max + min) / 2;
  precision = Math.pow(10, precision);
  if (!getValue) getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range", title, description, submit, format, display,
    attributes: {min, max, step, value},
    getValue
  });
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(form.input) : form.input.value;
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format@1")
)})
    }
  ]
};

const notebook = {
  id: "5557e901f2146b59@282",
  modules: [m0,m1,m2]
};

export default notebook;
