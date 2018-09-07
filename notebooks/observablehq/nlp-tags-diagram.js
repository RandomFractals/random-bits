// URL: https://beta.observablehq.com/@randomfractals/nlp-tags-diagram
// Title: NLP Tags Diagram
// Author: Taras Novak (@randomfractals)
// Version: 93
// Runtime version: 1

const m0 = {
  id: "e92eff14ab092b9d@93",
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
md `# TODO: 
add tags diagram using this code bit: 
https://beta.observablehq.com/@randomfractals/notebooks#notebooksGraph
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## [RTJ!](https://www.youtube.com/watch?v=PkGwI7nGehA) :)`
)})
    },
    {
      name: "text",
      inputs: ["html"],
      value: (function(html){return(
html `<textarea rows="10" cols="60">
"Close Your Eyes (And Count To Fuck)"
(feat. Zack De La Rocha)

[Zack De La Rocha:]
Run them jewels fast, run them, run them jewels fast
Run them, run them, r-run them, run them, fuck the slow mo

[Killer Mike (El-P):]
Fashion slave, you protestin' to get in a fuckin' look book
Everything I scribble's like The Anarchist Cookbook
(Look good, posing in a centerfold of Crook Book)
Black on black on black with a ski mask, that is my crook look
How you like my stylin', bruh? Ain't nobody stylin', bruh
'Bout to turn this mothafucka up like Riker's Island, bruh
Where my thuggers and my cripples and my bloodles and my brothers?
When you niggas gon' unite and kill the police, mothafuckas?
Or take over a jail, give those COs hell
The burnin' of the sulfur, God damn I love the smell
Like it's a pillow torchin', where the fuck the warden?
And when you find him, we don't kill him, we just waterboard him
We killin' 'em for freedom cause they tortured us for boredom
And even if some good ones die, fuck it, the Lord'll sort 'em

[El-P (Killer Mike):]
We out of order, your honor, you're out of order
This whole court is unimportant, you fuckers are walkin' corpses
I'm a flip wig synonym, livin' within distortion
I'll bite into a cyanide molar before you whores win
I'm a New Yorkian, I fuck for the jump
I wear my Yankee so tilted I actually walk with a hunch
Look at Mikey, I think he likey, we are sinister sons
(Aye, we the type to beat the preacher with a grin and a gun)

[Hook - Zack De La Rocha:]
Run them jewels fast, run them, run them jewels fast
Run them, run them, r-run them, r-run them, run them, r-run them
Run them jewels fast, run them, run them jewels fast
Run them, run them, r-run them, r-run them, run them, r-run them

[El-P (Killer Mike):]
A wise man once said, ("We all dead, fuck it")
Just spit it disgusting youngin', and hold your nuts while you're gunnin'
I listened, tatted a sentence on my dick last summer
Now I'll never get that phrase off my brain, it's no wonder
I'm here to buy hearts, I got hundreds, honey
The cheaper the parts, the better buy for the money
I'm trained in vagina whisperin', glistenin'
Waitin' for their christenin', I know the neighbors can't help but listen in
A dirty boy who come down on a side of dissonance
I can't even relax without sirens off in the distances
Not shittin' you, little buddy, this fuckin' island's a prison
The only silence I have is an act of conjugal visitin'

[Killer Mike (El-P):]
My solitary condition's preventin' conjugal visits
Go mane and missin' my misses, they keepin' me from my children
Conditions create a villain, the villain is givin' vision
The vision becomes a vow to seek vengeance on all the vicious
Liars and politicians, profiteers of the prisons
The forehead engravers, enslavers of men and women
Includin' members of clergy that rule on you through religion
(So strippin' kids to the nude and then tell 'em God'll forgive 'em)

[Hook]

[Zack De La Rocha:]
It's De La on the cut, liftin' 6 on your stitchy crew
I'm miles ahead of you, you can sip my bitches brew
My battle status is burnin' mansions from Dallas to Malibu
Check my résumé, your residence is residue
Call her a skin job and my honey dip'll backflip for you
You playin', God your eye sockets, she gon' rip in two
We sick of bleedin' out a trace, spray a victim, you
Done dyin', Phillip AK Dickin' you
With clips in the bottom, we dippin' from Gotham
Yes eclipsed by the shadows, a dark dance to the coffin
I'm a fellow with melanin, suspect of a felony
Ripped like Rakim Allah, feds is checkin' my melody
Yes aggressively tested we'll bump stretchers and penalties
Dump cases with face and the cop pleas when we seizing a pump
With reason to dump on you global grand dragons
Still pilin' fast, plus Afghani toe taggin'
Now they trackin' me and we bustin' back, see
The only thing that close quicker than our caskets be the factories

[Hook]
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
      inputs: ["tagLegends"],
      value: (function(tagLegends){return(
tagLegends
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
      name: "tags",
      inputs: ["normalizedDoc"],
      value: (function(normalizedDoc){return(
normalizedDoc.out('tags')
)})
    },
    {
      name: "uniqueTags",
      inputs: ["tags"],
      value: (function(tags)
{
  const map = new Map();
  for (const tag of tags) {
    let group = map.get(tag.normal);
    if (!group) {
      group = {name: tag.normal, children: []};
      map.set(tag.normal, group);
    }
    group.children.push(tag);
    tag.targets = [];
  }
  return {name: 'tags', children: [...map.values()]};
}
)
    },
    {
      name: "tagTree",
      inputs: ["tagTypes","uniqueTags","tagColors"],
      value: (function(tagTypes,uniqueTags,tagColors)
{
  const map = new Map();
  for (const tagType of tagTypes) {
    map.set(tagType, {name: tagType, children: []});
  }
  for (const tag of uniqueTags.children) {
    const tagTypes = tag.children[0].tags;
    for (const tagType of tagTypes) {
      const type = map.get(tagType);
      if (type) {
        type.children.push({name: tag.name, count: tag.children.length, color: tagColors[tagType]});
        type.color = tagColors[tagType];
        break;
      }
    }
  }
  return {name: 'term', children: [...map.values()]};
}
)
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
      name: "toWords",
      remote: "toWords"
    },
    {
      from: "@randomfractals/hello-nlp",
      name: "toShortList",
      remote: "toShortList"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagLegends",
      remote: "tagLegends"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagTypes",
      remote: "tagTypes"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagColors",
      remote: "tagColors"
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
      from: "@randomfractals/nlp-word-cloud",
      name: "toWords",
      remote: "toWords"
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
  id: "@randomfractals/nlp-word-cloud",
  variables: [
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
    }
  ]
};

const m4 = {
  id: "@randomfractals/nlp-text-tags",
  variables: [
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
    }
  ]
};

const m5 = {
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
  id: "e92eff14ab092b9d@93",
  modules: [m0,m1,m2,m3,m4,m5]
};

export default notebook;
