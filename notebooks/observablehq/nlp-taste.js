// URL: https://beta.observablehq.com/@randomfractals/nlp-taste
// Title: NLP Taste ;)
// Author: Taras Novak (@randomfractals)
// Version: 578
// Runtime version: 1

const m0 = {
  id: "8bb41180f1927ba6@578",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# NLP Taste ;)

Visualizing music lyrics, names, numbers, and places with http://compromise.cool natural language processing (NLP) library
and [#other dataViz libs](https://beta.observablehq.com/@randomfractals/nlp-taste#imports)
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Tyga - [Taste (explicit video) ft. Offset](https://www.youtube.com/watch?v=LjxulQ1bEWg)

... b/c Tyga is huge on [#names](https://beta.observablehq.com/@randomfractals/nlp-taste#people), 
[#places](https://beta.observablehq.com/@randomfractals/nlp-taste#places), and numbers drops :) 
see [#lingo parts tree](https://beta.observablehq.com/@randomfractals/nlp-taste#legends) ...`
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
    .on('word', addWord);

  const svg = DOM.svg(layout.size()[0], layout.size()[1]); // width, height
  const group = d3.select(svg).append('g')
    //.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  
  function addWord (word) {
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
      inputs: ["md"],
      value: (function(md){return(
md `## Lyrics`
)})
    },
    {
      name: "lyrics",
      value: (function(){return(
`
[Intro:]
D.A.

[Tyga:]
Slide on a pimp game with my pinky rang
Lotta gang, lotta bitches, and a icy chain
Why you claim that you rich? That's a false claim
I be straight to the whip, no baggage claim
Whole lotta styles, can't even pronounce the name
You don't even got no style, see you on my Instagram
I be rockin' it like it's fresh out the pan
Only when I'm takin' pics, I'm the middleman
Walk, talk it like a boss, I just lift the hand
3 million cash, call me rain man
Money like a shower, that's my rain dance
And we all in black, like it's gangland
Say the wrong word, you be hangman
Watch me stick to your bitch like a spray tan
Aw, Mr. 'What Kind Of Car You In?'
In the city love my name, nigga I ain't gotta say it

Taste, taste, she can get a taste
Taste, taste, she can get a taste
Taste, taste, fuck what a nigga say
It's all the same, like Mary-Kate
Taste, taste, she can get a taste
Taste, taste, let you get a taste
Taste, taste, do you love the taste?
Yeah that's cool but he ain't like me

Lotta girls like me, niggas wanna fight me
Nigga get yo ass checked like a fuckin' Nike
Me not icey, that's unlikely
And she gon' suck me like a fuckin' Hi-C
Aw, chains on the neck for the whole team
And I feel like Gucci with the ice cream
And my bitch want the Fenty, not the Maybelline
I'm the black JB the way these bitches scream
Make these bitches scream
Pretty little thing
Like my nigga A.E, say, yadadamean

Taste, taste, she can get a taste
Taste, taste, she can get a taste
Taste, taste, fuck what a nigga say
It's all the same, like Mary-Kate
Taste, taste, she can get a taste
Taste, taste, let you get a taste
Taste, taste, do you love the taste?
Yeah that's cool

[Offset:]
(Offset)
Yeah, I'ma put the drip on the plate (drip, drip)
Diamond ice-glazed, niggas imitate (ice, ice)
Aye, aye feed me grapes Maybach with the drac' (grape)
Slow pace in the Wraith, got this shit from bae
Diamonds up to par, the cookie hittin' hard (hard)
The Rari sit in park, I'm at it, on Mars (Mars)
Shotgun shells, we gon' always hit the target (blaow)
Popcorn bitch shell poppin' out the cartridge (pop it)
3400 Nawfside, Charles Barkley
4-8-8, Ferrari
Make her get on top of me and ride me like a Harley
She wanna keep me company and never want depart me (no)
(Depart me) Yeah, fishtail in the parking lot (skrt, skrt)
I don't kick it with these niggas 'cause they talk about cha
And I got the fire, don't make me spark it out cha
Keep it in my back pocket like it's a wallet
Like the way she suck it, suck it like a Jolly (whoa)
Stack it up and put it with the whole project (racks)
And she got the Patek on water moccasin
I'm rich in real life, I get that profit, copy

[Tyga:]
Taste, taste, she can get a taste
Taste, taste, let you get a taste
Taste, taste, do you love the taste?
Yeah, that's cool, but he ain't like me

Taste, taste, LA you can get a taste
Taste, taste, Miami you can get a taste
Taste, taste, Oakland you can get a taste
Taste, taste, New York do you love the taste?
Taste, taste, Chi-Town you can get a taste
Taste, taste, Houston you can get a taste
Taste, taste, Portland you can get a taste
Taste, taste, overseas let them bitches taste
Taste, taste, she can get a taste
Taste, taste, she can get a taste
Taste, taste, do you love the taste?
Taste, taste, worldwide they gon' get a taste
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Tagged NLP Lyrics`
)})
    },
    {
      name: "normalizedLyrics",
      inputs: ["html","printHtml","normalizedDoc"],
      value: (function(html,printHtml,normalizedDoc){return(
html `<div class="scrollable-container">
${printHtml(normalizedDoc)}
</div>`
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
      name: "lingoParts",
      inputs: ["md"],
      value: (function(md){return(
md `## Lingo Parts`
)})
    },
    {
      name: "lingoTree",
      inputs: ["tree","lingo","d3","DOM","width"],
      value: (function(tree,lingo,d3,DOM,width)
{
  const root = tree(lingo);
  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });
  const svg = d3.select(DOM.svg(width, x1 - x0 + root.dx * 2))
    .style("width", "100%")
    .style("height", "auto");
  
  const g = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);
    
  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .enter().append("path")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));
  
  const node = g.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants().reverse())
    .enter().append("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
    .attr("fill", d => d.children ? "#555" : d.data.color) //"#999")
    .attr("r", 2.5);

  node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -6 : 6)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .attr("fill", d => d.data.color)
    .text(d => d.data.count ? `${d.data.count} ${d.data.name}`: `${d.data.children.length} ${d.data.name}s`)
    .clone(true).lower()
    .attr("stroke", "white");
  
  return svg.node();
}
)
    },
    {
      name: "lingo",
      inputs: ["tagTree"],
      value: (function(tagTree){return(
tagTree
)})
    },
    {
      name: "tree",
      inputs: ["d3","lingo","width"],
      value: (function(d3,lingo,width){return(
data => {
  const root = d3.hierarchy(lingo);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Boring Code Parts`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Word Cloud`
)})
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
      inputs: ["toWords","nounsInfo","verbsInfo","adverbsInfo","adjectivesInfo"],
      value: (function(toWords,nounsInfo,verbsInfo,adverbsInfo,adjectivesInfo){return(
toWords(nounsInfo)
  .concat(toWords(verbsInfo))
  .concat(toWords(adverbsInfo))
  .concat(toWords(adjectivesInfo))
  .sort((a,b) => b.freq - a.freq)
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
      inputs: ["words"],
      value: (function(words){return(
words.length
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
  return function (w) {
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
md `## NLP`
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
      name: "normalizedDoc",
      inputs: ["nlp","lyrics"],
      value: (function(nlp,lyrics){return(
nlp(lyrics).normalize({
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
      name: "sentences",
      inputs: ["doc"],
      value: (function(doc){return(
doc.sentences().data()
)})
    },
    {
      name: "terms",
      inputs: ["doc"],
      value: (function(doc){return(
doc.terms().data()
)})
    },
    {
      name: "ngrams",
      inputs: ["doc"],
      value: (function(doc){return(
doc.ngrams().data()
)})
    },
    {
      name: "contractions",
      inputs: ["doc"],
      value: (function(doc){return(
doc.contractions().data()
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
      name: "tags",
      inputs: ["doc"],
      value: (function(doc){return(
doc.out('tags')
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
      inputs: ["md"],
      value: (function(md){return(
md `### Adjectives`
)})
    },
    {
      name: "adjectives",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adjectives().data()
)})
    },
    {
      name: "adjectivesInfo",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adjectives().out('topk')
)})
    },
    {
      name: "adjectiveList",
      inputs: ["toShortList","printList","adjectivesInfo"],
      value: (function(toShortList,printList,adjectivesInfo){return(
toShortList(printList(adjectivesInfo))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Adverbs`
)})
    },
    {
      name: "adverbs",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adverbs().data()
)})
    },
    {
      name: "adverbsInfo",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adverbs().out('topk')
)})
    },
    {
      name: "adverbList",
      inputs: ["toShortList","printList","adverbsInfo"],
      value: (function(toShortList,printList,adverbsInfo){return(
toShortList(printList(adverbsInfo))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Nouns`
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
      name: "nounsInfo",
      inputs: ["normalizedDoc"],
      value: (function(normalizedDoc){return(
normalizedDoc.nouns().out('topk')
)})
    },
    {
      name: "nounList",
      inputs: ["toShortList","printList","nounsInfo"],
      value: (function(toShortList,printList,nounsInfo){return(
toShortList(printList(nounsInfo))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Verbs`
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
      name: "verbsInfo",
      inputs: ["normalizedDoc"],
      value: (function(normalizedDoc){return(
normalizedDoc.verbs().out('topk')
)})
    },
    {
      name: "verbList",
      inputs: ["toShortList","printList","verbsInfo"],
      value: (function(toShortList,printList,verbsInfo){return(
toShortList(printList(verbsInfo))
)})
    },
    {
      name: "people",
      inputs: ["md"],
      value: (function(md){return(
md `### People`
)})
    },
    {
      name: "peopleList",
      inputs: ["toShortList","printList","doc"],
      value: (function(toShortList,printList,doc){return(
toShortList(printList(doc.people().out('topk')))
)})
    },
    {
      name: "places",
      inputs: ["md"],
      value: (function(md){return(
md `### Places`
)})
    },
    {
      name: "placeList",
      inputs: ["toShortList","printList","doc"],
      value: (function(toShortList,printList,doc){return(
toShortList(printList(doc.places().out('topk')))
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
    },
    {
      name: "imports",
      inputs: ["md"],
      value: (function(md){return(
md `
---
## Imports`
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
md `## References

- [Compromise NLP Intro](https://beta.observablehq.com/@spencermountain/nlp-compromise)
- [Compromise NLP Normalize](https://beta.observablehq.com/@spencermountain/compromise-normalization)
- [Compromise NLP Topics](https://beta.observablehq.com/@spencermountain/topics-named-entity-recognition)
- [d3 Word Cloud Layout](https://github.com/jasondavies/d3-cloud)
- [d3 Tidy Tree](https://beta.observablehq.com/@mbostock/d3-tidy-tree)
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
  id: "8bb41180f1927ba6@578",
  modules: [m0,m1]
};

export default notebook;
