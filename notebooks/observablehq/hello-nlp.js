// URL: https://beta.observablehq.com/@randomfractals/hello-nlp
// Title: Hello, NLP!
// Author: Taras Novak (@randomfractals)
// Version: 128
// Runtime version: 1

const m0 = {
  id: "c2ff228e09d0a4ae@128",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Hello, NLP!

modest natural-language processing in javascript http://compromise.cool
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
  id: "c2ff228e09d0a4ae@128",
  modules: [m0,m1]
};

export default notebook;
