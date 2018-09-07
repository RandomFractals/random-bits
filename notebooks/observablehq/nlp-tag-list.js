// URL: https://beta.observablehq.com/@randomfractals/nlp-tag-list
// Title: NLP Tag List
// Author: Taras Novak (@randomfractals)
// Version: 51
// Runtime version: 1

const m0 = {
  id: "3b4d2553a1675229@51",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# NLP Tag List

Listing NLP text tags with http://compromise.cool NLP library
...`
)})
    },
    {
      name: "text",
      inputs: ["html"],
      value: (function(html){return(
html `<textarea rows="10" cols="60">
"Caterpillar"
(feat. Eminem & King Green)

[Gil Scott-Heron:]
You will not be able to stay home, brotha
You will not be able to plug in, turn on and cop out
You will not be able to lose yourself on skag and skip out for beer during commercials
Because the revolution will not be televised

[King Green:]
This right here for the number one
Number ones here with your number one
You ain't number one, just another one
Now everybody sayin' that they number one

[Royce Da 5'9:]
Ring the alarm, the caterpillar keeps firing
Oh, we in the war, where butterflies keep dyin', ah

I'm a product of Parker Lewis and Kubiak
If didn't do this, where in the fuck would you be at?
See there's a difference between us, what I spit hit arenas
You a drip from my penis, I eat lions and sip hyenas
You number one when it come to slaughtering mics
I'm tryna be number one in my son and daughter life
Uhh, all you niggas my little rapper babies
Y'all my children, y'all bit my shit and contracted rabies
Don't you rate me next to these rappers, baby, that's degrading
My style got so many different facets
I switch into so many different passions
I'm skippin' class to be fascinatin'
My pen is like Big Ben, this shit's just a classic waiting
Your favorite rapper come at me, I just decapitate him
Out here congratulating these has-beens who had their highs
These rappers only won their matches because they strategize
I bring etiquette to these patterns, and here's my battle cry

Ring the alarm, the caterpillar is firing
Oh, we in the war, where butterflies keep dyin', ah

[King Green:]
This right here for the number ones
Number ones here with your number one
You ain't number one, just another one
Now everybody sayin' that they number one
Here take your number one, quit
Number one soul, get your number one chip
Number one fly with your number one kicks
When it's all done then your number gon' switch

[Royce Da 5'9:]
Hold up, wait a minute
Guess what I'ma never do
Show so much respect to you
That I feel like we're friends, so now we no longer competitors
That could be the death of you
Never let someone who's not as smart as you gas you up
And tell you somethin' you never knew
Always stay professional
You always gon' make revenue
Don't let people next to you that don't want the best for you
It's completely normal to hold on to a regret or two
I do what I want to do, they do what I let them do
Everything niggas be sayin' is a fuckin' lie
There is nothing I can say to you that is realer
Remember when you raisin' the butterfly
Don't you ever disrespect the fucking caterpillar

[King Green:]
This right here for the number ones
Number ones here with your number one
You ain't number one, just another one
Now everybody sayin' that they number one
Now you think that you number one, quit
Number one soul, get your number one chip
Number one fly with your number one kicks
When it's all done then your number gon' switch

[Eminem:]
You looking at her tell her
The psychopathic killer, the caterpillar
Don't tell me when I'm supposed to rap until
Especially when your favorite rapper ain't even half as ill
A savage still, the track's a banana peel, attack at a silver-back gorilla
You're havin' a little trouble fathomin' this is actually happenin'
Like Anderson Silva back when he snapped his shin in half
And then had the shit hangin' by a flap of skin
After he tried to plant the shit back on the mat again
Pad to pen I'm batty like eyelids when they're blinkin' a lot
You copy me, but you're not
You can't be butterflies
My offsprings are just moths
I see that thing I'ma squash it and rip the wings of it off
So ring the alarm, pull the extinguishers off of the wall, set the sprinklers off
Like Jada Pinkett and Queen Latifah
'Till the shingles come off the roof we'll shout at the ceiling
Slaughterhouse in the building, middle fingers aloft
Say what I think when I rhyme, in ink-pen I talk
And the language I speak is my mind
Kingpin and Penguin combined
Spit like it's King of the Dot
A singular thought I think of will help you distinguish apart
The frauds from the cream of the crop
([Royce Da 5'9:] Wait a minute)
Hold up like a flashcard
Damn dawg, is that copyin' or payin' homage?
It's sad because dad taught you to rap as a damn toddler
My dad is your grandfather
I have to rehatch on ya
Come back as black wasp
Half yellow jacket, you can't swat a
Sasquatch dancing on top of an ant trample it and stomp it
Smash it and stand on it
Dammit, I can't stop it
The rap is a vag' and I'm goin' in like a tampon in this bitch
It's a manslaughter
Stampin' out grasshoppers, you can't be no Rap Gods
In fact you're exact opposites
You make a wack song, and can't hold a candle
But even Daniel-son whacks off
You jack-offs need to come to grips like a hand job
The boom bap is coming back with an axe to mumble rap
Lumberjack with a hacksaw
Number one, but my pencils are number twos 'cause that's all I dos with 'em
Poop is my suit and I'm
On the john like a prostitute when I'm droppin' a deuce
And when I'm producing them lyrical bowel movements
These beats are like my saloons
'Cause these bars always got my stools in 'em
And I don't need Metamucil to loosen 'em
Bitch, shit is real like I pooped Jerusalem
I'm 'bout to go spin another cocoon and I'm cuttin' you from your mother's womb then I'm flushin' you
</textarea>`
)})
    },
    {
      name: "tagTree",
      inputs: ["createTagTree"],
      value: (function(createTagTree){return(
createTagTree()
)})
    },
    {
      name: "docTags",
      inputs: ["doc"],
      value: (function(doc){return(
doc.out('tags')
)})
    },
    {
      name: "normalizedTags",
      inputs: ["getUniqueTags","docTags"],
      value: (function(getUniqueTags,docTags){return(
getUniqueTags(docTags)
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
      name: "createTagTree",
      inputs: ["nlp"],
      value: (function(nlp){return(
function createTagTree () {
  let doc = nlp('');
  let nest = {};
  let tags = doc.world().tags;
  Object.keys(tags).forEach( k => {
    if (tags[k].isA) {
      let isA = tags[k].isA;
      nest[isA] = nest[isA] || [];
      nest[isA][k] = true;
    } else {
      nest[k] = {};
    }
  })

  // tag arrangment fixes  
  nest.Noun.Singular = nest.Singular;
  delete nest.Singular;
  
  nest.Person.FirstName = nest.FirstName;
  delete nest.FirstName;
  
  nest.Noun.Person = nest.Person;
  delete nest.Person;
  
  nest.VerbPhrase.Verb = nest.Verb;
  delete nest.Verb;
    
  return nest;
}
)})
    },
    {
      name: "listStyles",
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
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagTypes",
      remote: "tagTypes"
    },
    {
      from: "@randomfractals/nlp-tag-tree",
      name: "getUniqueTags",
      remote: "getUniqueTags"
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
  id: "@randomfractals/nlp-text-tags",
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
    }
  ]
};

const m3 = {
  id: "@randomfractals/nlp-tag-tree",
  variables: [
    {
      name: "getUniqueTags",
      value: (function(){return(
function getUniqueTags(tags) {
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
)})
    }
  ]
};

const notebook = {
  id: "3b4d2553a1675229@51",
  modules: [m0,m1,m2,m3]
};

export default notebook;
