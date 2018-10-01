// URL: https://beta.observablehq.com/@randomfractals/notebooks
// Title: Notebooks Visualizer
// Author: Taras Novak (@randomfractals)
// Version: 873
// Runtime version: 1

const m0 = {
  id: "5c54ccd4ac62f235@873",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Notebooks Visualizer
This notebook uses actual https://api.observablehq.com to display user stats, collections, and notebooks info`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## User Info`
)})
    },
    {
      name: "userNameParam",
      inputs: ["URLSearchParams","html"],
      value: (function(URLSearchParams,html){return(
new URLSearchParams(html`<a href>`.search).get('userName')
)})
    },
    {
      name: "viewof userName",
      inputs: ["text","userNameParam"],
      value: (function(text,userNameParam){return(
text({
  placeholder: 'type observable username and click Get Stats', 
  description: 'enter observable username to get stats',
  value: `${userNameParam ? userNameParam : 'randomfractals'}`,
  submit: 'Get Stats'})
)})
    },
    {
      name: "userName",
      inputs: ["Generators","viewof userName"],
      value: (G, _) => G.input(_)
    },
    {
      name: "shareLink",
      inputs: ["md","userName"],
      value: (function(md,userName){return(
md `*share a link to your user info and notebooks stats: [@${userName}](?userName=${userName})*`
)})
    },
    {
      inputs: ["md","userName"],
      value: (function(md,userName){return(
md `**[@${userName}](https://beta.observablehq.com/@${userName})** *data from* https://api.observablehq.com/user/@${userName}:
`
)})
    },
    {
      name: "userBio",
      inputs: ["getUserBioHtml","userName","user"],
      value: (function(getUserBioHtml,userName,user){return(
getUserBioHtml(userName, user)
)})
    },
    {
      name: "notebooksStats",
      inputs: ["getNotebooksStatsHtml","userName","user","stats","notebooks"],
      value: (function(getNotebooksStatsHtml,userName,user,stats,notebooks){return(
getNotebooksStatsHtml(userName, user, stats, notebooks)
)})
    },
    {
      name: "userStats",
      inputs: ["vegalite","notebooks","width"],
      value: (function(vegalite,notebooks,width){return(
vegalite({
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"values": notebooks },
  "mark": "circle",
  width: Math.min(width - 200, 600),
  height: Math.min(width / 2  -100, 300),
  "encoding": {
    "x": {"field": "update_time", "type": "temporal"},
    "y": {"field": "version", "type": "quantitative", "scale": {"type": "sqrt"} },
    "size": {"field": "likes", "type": "nominal"},
    "fill": {"field": "likes", "type": "nominal"},
  }
})
)})
    },
    {
      name: "user",
      inputs: ["getUserInfo","userName"],
      value: (function(getUserInfo,userName){return(
getUserInfo(userName)
)})
    },
    {
      name: "collections",
      inputs: ["getUserCollections","userName"],
      value: (function(getUserCollections,userName){return(
getUserCollections(userName)
)})
    },
    {
      name: "stats",
      inputs: ["getStats","notebooks"],
      value: (function(getStats,notebooks){return(
getStats(notebooks)
)})
    },
    {
      name: "codesAbout",
      inputs: ["md","getUserBioHtml","userName","user","stats","notebooks"],
      value: (function(md,getUserBioHtml,userName,user,stats,notebooks){return(
md `---
${getUserBioHtml(userName, user, stats, notebooks)}
#### ${user.name} codes about...
`
)})
    },
    {
      name: "wordCloud",
      inputs: ["createWordCloudSvg","notebooksWords"],
      value: (function(createWordCloudSvg,notebooksWords){return(
createWordCloudSvg(notebooksWords)
)})
    },
    {
      inputs: ["md","userName"],
      value: (function(md,userName){return(
md `--- 
## [@${userName} Notebooks](https://beta.observablehq.com/@randomfractals)`
)})
    },
    {
      inputs: ["getUserBioHtml","userName","user"],
      value: (function(getUserBioHtml,userName,user){return(
getUserBioHtml(userName, user)
)})
    },
    {
      name: "viewof orient",
      inputs: ["html"],
      value: (function(html){return(
html`<select>
<option value=LR selected>left-to-right
<option value=RL>right-to-left
<option value=TB>top-to-bottom
<option value=BT>bottom-to-top
</select>`
)})
    },
    {
      name: "orient",
      inputs: ["Generators","viewof orient"],
      value: (G, _) => G.input(_)
    },
    {
      name: "notebooksGraph",
      inputs: ["dot","userName","orient","notebookAuthors","notebooks","forkedNotebooks","notebookMap"],
      value: (function(dot,userName,orient,notebookAuthors,notebooks,forkedNotebooks,notebookMap){return(
dot `
digraph "@${userName}'s notebooks" {
  rankdir = ${orient};
  ${notebookAuthors
    .map(author => 
         `"@${author.login}" [shape = oval, style = filled, fillcolor = "#b3e6cc",
            href = "https://beta.observablehq.com/@${author.login}", target = _blank]`)
    .join('\n')}
  ${notebooks
    .map(notebook => 
         `"/${notebook.slug}" [shape = rectangle, style = filled, fillcolor = "#b3e0ff",
            href = "https://beta.observablehq.com/@${userName}/${notebook.slug}", target = _blank]`)
    .join('\n')}
  ${forkedNotebooks
    .filter(notebook => (notebook.creator.login != userName))
    .map(notebook => 
         `"/${notebook.slug}" [shape = rectangle, style = filled, fillcolor = "#f6f6f6",
            href = "https://beta.observablehq.com/@${notebook.creator.login}/${notebook.slug}", target = _blank]`)
    .join('\n')}
  ${notebooks.filter(notebook => (notebook.fork_of && notebookMap.get(notebook.fork_of.id)))
    .map(notebook => 
         `"/${notebookMap.get(notebook.fork_of.id).slug}" -> "/${notebook.slug}" [color = "black"]`)
    .join('\n')}
  ${notebooks.filter(notebook => !notebook.fork_of)
    .map(notebook => 
         `"@${userName}" -> "/${notebook.slug}" [color = "black"]`)
    .join('\n')}
  ${forkedNotebooks.filter(notebook => (!notebook.fork_of || notebook.creator.login != userName))
    .map(notebook => 
         `"@${notebook.creator.login}" -> "/${notebook.slug}" [color = "black"]`)
    .join('\n')}
}`
)})
    },
    {
      inputs: ["html","DOM","rasterize","notebooksGraph","userName","serialize"],
      value: (async function(html,DOM,rasterize,notebooksGraph,userName,serialize){return(
html`
${DOM.download(await rasterize(notebooksGraph), `${userName}-notebooks.png`, "Download as PNG")}
${DOM.download(await serialize(notebooksGraph), `${userName}-notebooks.svg`, "Download as SVG")}
`
)})
    },
    {
      name: "collectionList",
      inputs: ["md"],
      value: (function(md){return(
md `--- 
## Collections`
)})
    },
    {
      inputs: ["html","getCollectionsHtml","collections"],
      value: (function(html,getCollectionsHtml,collections){return(
html `
<div class="scrollable-container">
  ${getCollectionsHtml(collections)}
</div>`
)})
    },
    {
      name: "notebookList",
      inputs: ["md"],
      value: (function(md){return(
md `--- 
## Notebooks List`
)})
    },
    {
      inputs: ["html","getLinksHtml","notebooks"],
      value: (function(html,getLinksHtml,notebooks){return(
html `
<div class="scrollable-container">
  ${getLinksHtml(notebooks)}
</div>`
)})
    },
    {
      name: "notebooks",
      inputs: ["MAX_DOCS","apiUrl","userName"],
      value: (async function*(MAX_DOCS,apiUrl,userName)
{
  const documents = [];
  let lastDocumentTimestamp = "4096-01-01T00:45:25.493Z"; // infinite future
  let documentsCount = 0;
  do {
    const notebooksDataUrl = `${apiUrl}/documents/@${userName}?before=${lastDocumentTimestamp}`;
    documentsCount = (await fetch(notebooksDataUrl).then(d => d.json()))
      .map(d => {
        documents.push(d);
        lastDocumentTimestamp = d.update_time;
      }).length;
    yield documents.slice(0, MAX_DOCS);
  } while (documentsCount && documents.length < MAX_DOCS)
}
)
    },
    {
      name: "forkedNotebooks",
      value: (function(){return(
[]
)})
    },
    {
      name: "notebookMap",
      inputs: ["notebooks"],
      value: (function(notebooks)
{
  const map = new Map();
  const allNotebooks = notebooks; //.concat(forkedNotebooks);
  allNotebooks.map(notebook => map.set(notebook.id, notebook));
  return map;
}
)
    },
    {
      name: "notebookAuthors",
      inputs: ["forkedNotebooks"],
      value: (function(forkedNotebooks)
{
  const map = new Map();
  forkedNotebooks.map(notebook => map.set(notebook.creator.login, notebook.creator));
  return [...map.values()];
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Notebook Titles & Tags`
)})
    },
    {
      name: "notebookTitles",
      inputs: ["notebooks"],
      value: (function(notebooks){return(
notebooks.map(notebook => notebook.title)
)})
    },
    {
      name: "notebookTitlesDoc",
      inputs: ["notebookTitles"],
      value: (function(notebookTitles){return(
notebookTitles.reduce((doc, title) => doc + '\n' + title, '')
)})
    },
    {
      name: "normalizedTitlesDoc",
      inputs: ["nlp","notebookTitlesDoc"],
      value: (function(nlp,notebookTitlesDoc){return(
nlp(notebookTitlesDoc).normalize({
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
      name: "notebooksTags",
      inputs: ["normalizedTitlesDoc"],
      value: (function(normalizedTitlesDoc){return(
normalizedTitlesDoc.out('tags')
)})
    },
    {
      name: "doc",
      inputs: ["normalizedTitlesDoc"],
      value: (function(normalizedTitlesDoc){return(
normalizedTitlesDoc
)})
    },
    {
      name: "notebooksWords",
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
      name: "MAX_DOCS",
      value: (function(){return(
360
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# User & Notebooks API`
)})
    },
    {
      name: "apiUrl",
      value: (function(){return(
'https://observable-cors.glitch.me/https://api.observablehq.com'
)})
    },
    {
      name: "getUserInfo",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getUserInfo(userName) {
  return fetch(`${apiUrl}/user/@${userName}`).then(d => d.json())
}
)})
    },
    {
      name: "getUserBioHtml",
      inputs: ["html"],
      value: (function(html){return(
function getUserBioHtml(userName, user) {
  return html `
    <div id="avatar">
      <a href="https://beta.observablehq.com/@${userName}" 
        title="@${userName} a.k.a. ${user.name}" target="_blank">
        <img src="${user.avatar_url}"></img>
      </a>
    </div>
    <i>${user.bio || "??"}</i>: <a href="${user.home_url}" target="_blank">${user.home_url}</a>
    <br />`;
}
)})
    },
    {
      name: "getUserCollections",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getUserCollections(userName) {
  return fetch(`${apiUrl}/collections/@${userName}`).then(d => d.json())  
}
)})
    },
    {
      name: "getStats",
      value: (function(){return(
function getStats(notebooks) {
  const stats = {
    original: [],
    forked: [],
    liked: []
  };
  notebooks.map(notebook => {
    if (!notebook.fork_of) {
      stats.original.push(notebook);
    } else {
      stats.forked.push(notebook);
    }
    stats.liked.push(notebook.likes);
  });
  return stats;
}
)})
    },
    {
      name: "getNotebooksStatsHtml",
      inputs: ["html","collections"],
      value: (function(html,collections){return(
function getNotebooksStatsHtml(userName, user, stats, notebooks) {
  return html `
    Notebooks: 
      <a href="https://beta.observablehq.com/@${userName}" 
        title="@${userName} a.k.a. ${user.name} Notebooks" target="_blank">
        ${notebooks.length}
      </a> |
    Original: ${stats.original.length} |
    Forked: ${stats.forked.length} |
    Likes: ${stats.liked.reduce((total, count) => total + count)} |
    Revisions: ${(notebooks.reduce((total, notebook) => total + Number(notebook.version), 0)).toLocaleString()} |
    Collections: 
      <a href="https://beta.observablehq.com/@${userName}?tab=collections" 
        title="@${userName} a.k.a. ${user.name} Collections" target="_blank">
        ${collections.length}      
      </a>
  `;
}
)})
    },
    {
      name: "getLinksMarkdown",
      inputs: ["userName"],
      value: (function(userName){return(
function getLinksMarkdown(notebooks) {
  return notebooks.map(notebook => `[${notebook.title}](https://beta.observablehq.com/@${userName}/${notebook.slug})<br /><br />`)
    .reduce((html, link) => html + link);
}
)})
    },
    {
      name: "getLinksHtml",
      inputs: ["userName"],
      value: (function(userName){return(
function getLinksHtml(notebooks) {
  return notebooks.map(notebook => 
    `<a href="https://beta.observablehq.com/@${userName}/${notebook.slug}" target="_blank">${notebook.title}<br />`)
    .reduce((html, link) => html + link);
}
)})
    },
    {
      name: "getCollectionsHtml",
      inputs: ["userName"],
      value: (function(userName){return(
function getCollectionsHtml(collections) {
  return collections.map(collection => 
    `<a href="https://beta.observablehq.com/collection/@${userName}/${collection.slug}" target="_blank">${collection.title}</a> (${collection.document_count} notebooks)<br />`)
    .reduce((html, link) => html + link);
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `**TODO: add notebooks grid view display with thumbnails for creating custom user notebooks collections**`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `see [Chicago Crimes EDA](https://beta.observablehq.com/@randomfractals/chicagocrimes) 
& [NLP Notebooks](https://beta.observablehq.com/@randomfractals/nlp-notebooks) 
for notebooks search and links api usage example`
)})
    },
    {
      name: "searchNotebooks",
      inputs: ["searchByTitle","notebooks"],
      value: (function(searchByTitle,notebooks){return(
searchByTitle(notebooks, 'chicago crimes')
)})
    },
    {
      name: "searchByTitle",
      value: (function(){return(
function searchByTitle(notebooks, title) {
  const matchingNotebooks = [];
  notebooks.map(notebook => {
    if( notebook.title.toLowerCase().indexOf(title) >= 0) {
      matchingNotebooks.push(notebook); 
    }
  });
  return matchingNotebooks;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Getting Notebook Info`
)})
    },
    {
      name: "notebookHtml",
      inputs: ["getNotebookHtml","notebook"],
      value: (function(getNotebookHtml,notebook){return(
getNotebookHtml(notebook)
)})
    },
    {
      name: "notebook",
      inputs: ["getNotebookInfo","notebooks"],
      value: (function(getNotebookInfo,notebooks){return(
getNotebookInfo(notebooks[0])
)})
    },
    {
      name: "notebookNodes",
      inputs: ["notebook"],
      value: (function(notebook){return(
notebook.nodes
)})
    },
    {
      name: "notebookFunctions",
      inputs: ["getNotebookFunctions","notebook"],
      value: (function(getNotebookFunctions,notebook){return(
getNotebookFunctions(notebook)
)})
    },
    {
      name: "namedNotebookCells",
      inputs: ["getNamedNotebookCells","notebook"],
      value: (function(getNamedNotebookCells,notebook){return(
getNamedNotebookCells(notebook)
)})
    },
    {
      name: "getNotebookInfo",
      inputs: ["apiUrl","userName"],
      value: (function(apiUrl,userName){return(
function getNotebookInfo(notebook) {
  return fetch(`${apiUrl}/document/@${userName}/${notebook.slug}`).then(d => d.json())
}
)})
    },
    {
      name: "getNotebookById",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getNotebookById(notebookId) {
  return fetch(`${apiUrl}/document/${notebookId}`).then(d => d.json())
}
)})
    },
    {
      name: "getNotebookByUrl",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getNotebookByUrl(notebookUrl) {
  return fetch(`${apiUrl}/document/${notebookUrl}`).then(d => d.json())  
}
)})
    },
    {
      name: "getNotebookFunctions",
      value: (function(){return(
function getNotebookFunctions(notebook) {
  return notebook.nodes.filter(node => node.value.startsWith('function'));
}
)})
    },
    {
      name: "getNamedNotebookCells",
      value: (function(){return(
function getNamedNotebookCells(notebook) {
  return notebook.nodes.filter(node => !node.value.startsWith('function') && 
    node.value.indexOf('=') > 0 && 
    (node.value.indexOf('`') < 0 || node.value.indexOf('`') > node.value.indexOf('=')) );
}
)})
    },
    {
      name: "getNotebookImports",
      value: (function(){return(
function getNotebookImports(notebook) {
  const importedFunctions = [];
  const importedNodes = notebook.nodes.filter(node => node.value.startsWith('import'));
  for (let importNode of importedNodes) {
    let importedFromNotebook = importNode.value
      .substring(importNode.value.indexOf(' from ')).replace(' from ', '')
      .replace('"', '').replace("'", '').replace('"', '').replace("'", '');
    let importedMethods = importNode.value
      .substring(importNode.value.indexOf('{') + 1, importNode.value.indexOf('}')).split(',');
    for (let method of importedMethods) {
      importedFunctions.push(({notebook: importedFromNotebook, cell: method.replace(' ', '')})); 
    }
  }
  return importedFunctions;
}
)})
    },
    {
      inputs: ["getNotebookImports","notebook"],
      value: (function(getNotebookImports,notebook){return(
getNotebookImports(notebook)
)})
    },
    {
      name: "getNotebookHtml",
      inputs: ["html"],
      value: (function(html){return(
function getNotebookHtml(notebook) {
  return html `
    <div class="notebook-thumbnail">
      <a href="https://beta.observablehq.com/@${notebook.creator.login}/${notebook.slug}" 
        title="${notebook.title}" target="_blank">
        <img src="https://static.observableusercontent.com/thumbnail/${notebook.thumbnail}.jpg"></img>
      </a>
    </div>
    <b><i>${notebook.title}</i></b>: <a href="https://beta.observablehq.com/@${notebook.creator.login}/${notebook.slug}"" target="_blank">@${notebook.creator.login}/${notebook.slug}</a>
    <br />`;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Displaying Notebook Stats and Cells Code

see: https://beta.observablehq.com/@randomfractals/notebook-info`
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
      name: "userBioStyles",
      inputs: ["html"],
      value: (function(html){return(
html 
`<style>
#avatar {float: left;} 
#avatar img {max-width: 24px; border-radius: 12px; margin-right: 10px;}
</style>
`
)})
    },
    {
      name: "notebookStyles",
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
.notebook-thumbnail {float: left;} 
.notebook-thumbnail img {max-width: 128px; border-radius: 2px; margin-right: 10px;}
</style>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      name: "vegalite",
      inputs: ["require"],
      value: (function(require){return(
require('@observablehq/vega-lite')
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
      from: "@jashkenas/inputs",
      name: "text",
      remote: "text"
    },
    {
      name: "d3cloud",
      inputs: ["require"],
      value: (function(require){return(
require('d3-cloud')
)})
    },
    {
      from: "@randomfractals/nlp-word-cloud",
      name: "createWordCloudSvg",
      remote: "createWordCloudSvg"
    },
    {
      from: "@randomfractals/nlp-word-cloud",
      name: "downloadWordCloud",
      remote: "downloadWordCloud"
    },
    {
      from: "@randomfractals/nlp-word-cloud",
      name: "toWords",
      remote: "toWords"
    },
    {
      from: "@mbostock/graphviz",
      name: "dot",
      remote: "dot"
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
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "text",
      inputs: ["input"],
      value: (function(input){return(
function text(config = {}) {
  const {value, title, description, autocomplete, maxlength, minlength, pattern, placeholder, size, submit} = config;
  if (typeof config == "string") value = config;
  const form = input({
    type: "text", title, description, submit,
    attributes: {value, autocomplete, maxlength, minlength, pattern, placeholder, size}
  });
  form.output.remove();
  form.input.style.fontSize = "1em";
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

const m2 = {
  id: "@randomfractals/nlp-word-cloud",
  variables: [
    {
      name: "createWordCloudSvg",
      inputs: ["d3cloud","width","cloudConfig","cloudScale","rotateWord","baseFont","fontSize","DOM","d3","wordColors"],
      value: (function(d3cloud,width,cloudConfig,cloudScale,rotateWord,baseFont,fontSize,DOM,d3,wordColors){return(
function createWordCloudSvg(words) {
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
      //.transition()
      //.duration(1500)
      //.ease(d3.easeLinear)
      .style('font-size', `${word.size}px`);
    text.append('title').text(`${word.text} (${word.count})`); // toolitp
  }
  
  layout.start();
  return svg;
}
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
      name: "d3cloud",
      inputs: ["require"],
      value: (function(require){return(
require('d3-cloud')
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
      name: "baseFont",
      inputs: ["fontFamilies"],
      value: (function(fontFamilies){return(
function (d) {
  return fontFamilies[~~(Math.random() * fontFamilies.length)]
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
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3')
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
      name: "fontFamilies",
      value: (function(){return(
['Corben', 'Pacifico', 'impact']
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
      name: "nlp",
      inputs: ["require"],
      value: (function(require){return(
require('compromise')
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
    }
  ]
};

const m3 = {
  id: "@mbostock/graphviz",
  variables: [
    {
      name: "dot",
      inputs: ["require"],
      value: (function(require){return(
require("@observablehq/graphviz@0.2")
)})
    }
  ]
};

const m4 = {
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
  id: "5c54ccd4ac62f235@873",
  modules: [m0,m1,m2,m3,m4]
};

export default notebook;
