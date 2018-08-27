// URL: https://beta.observablehq.com/@randomfractals/notebooks
// Title: Notebooks
// Author: Taras Novak (@randomfractals)
// Version: 365
// Runtime version: 1

const m0 = {
  id: "5c54ccd4ac62f235@365",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Notebooks
This notebook uses actual https://api.observablehq.com to display user stats and notebooks info`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## User Info`
)})
    },
    {
      name: "viewof userName",
      inputs: ["md"],
      value: (function(md){return(
md `<input value=randomfractals>`
)})
    },
    {
      name: "userName",
      inputs: ["Generators","viewof userName"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","userName"],
      value: (function(md,userName){return(
md `### [@${userName}](https://beta.observablehq.com/@${userName}) data from https://api.observablehq.com/user/@${userName}:
`
)})
    },
    {
      name: "userBio",
      inputs: ["html","userName","user","notebooks"],
      value: (function(html,userName,user,notebooks){return(
html `
<style>
#avatar {float: left;} 
#avatar img {max-width: 24px; border-radius: 12px; margin-right: 10px;}
</style>
<div id="avatar">
  <a href="https://beta.observablehq.com/@${userName}" 
    title="@${userName} a.k.a. ${user.name}" target="_blank"><img src="${user.avatar_url}"></img></a>
</div>
<i>${user.bio || "??"}</i>:
<a href="${user.home_url}">${user.home_url}</a>
Notebooks: ${notebooks.length}
`
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
      name: "apiUrl",
      value: (function(){return(
'https://cors-anywhere.herokuapp.com/https://api.observablehq.com'
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
      name: "getUserInfo",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getUserInfo(userName) {
  return fetch(`${apiUrl}/user/@${userName}`).then(d => d.json())
}
)})
    },
    {
      inputs: ["md","userName"],
      value: (function(md,userName){return(
md `## [@${userName} Notebooks](https://beta.observablehq.com/@randomfractals)`
)})
    },
    {
      name: "notebooks",
      inputs: ["MAXDOCS","apiUrl","userName"],
      value: (async function*(MAXDOCS,apiUrl,userName)
{
  const documents = [];
  var last = "4096-01-01T00:45:25.493Z"; // infinite future
  var seen = false;
  do {
    seen = (await fetch(`${apiUrl}/documents/@${userName}?before=${last}`).then(d => d.json()))
    .map(d => {
      documents.push(d);
      last = d.update_time;
    }).length;
    yield documents.slice(0, MAXDOCS);
  } while (seen && documents.length < MAXDOCS)
}
)
    },
    {
      name: "MAXDOCS",
      value: (function(){return(
360
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
      inputs: ["md"],
      value: (function(md){return(
md `**TODO: add notebooks grid view display with thumbnails for creating custom user notebooks collections**`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `see [Chicago Crimes EDA](https://beta.observablehq.com/@randomfractals/chicagocrimes) for search and links markdown api usage example.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Getting Notebook Info`
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
      name: "getNotebookInfo",
      inputs: ["apiUrl","userName"],
      value: (function(apiUrl,userName){return(
function getNotebookInfo(notebook) {
  return fetch(`${apiUrl}/document/@${userName}/${notebook.slug}`).then(d => d.json())
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Displaying Notebook Cells Code`
)})
    },
    {
      inputs: ["html","notebook","color"],
      value: (function(html,notebook,color){return(
html`${
  notebook.nodes
    .map((d,i) => `<pre style="font-size:14px; color:${color(i)}">${d.value.replace(/</g, "&lt;")}</pre>`)
    .join("<hr style='margin:0;padding:0'>")
}`
)})
    },
    {
      name: "color",
      value: (function(){return(
function color(i) {
  return "#" + ("4b9ec1-b5a636-495e1d-e55934-fa7921".split("-")[i%5])
}
)})
    },
    {
      name: "vegalite",
      inputs: ["require"],
      value: (function(require){return(
require('@observablehq/vega-lite')
)})
    }
  ]
};

const notebook = {
  id: "5c54ccd4ac62f235@365",
  modules: [m0]
};

export default notebook;
