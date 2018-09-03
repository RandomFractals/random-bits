// URL: https://beta.observablehq.com/@randomfractals/notebooks
// Title: Notebooks
// Author: Taras Novak (@randomfractals)
// Version: 531
// Runtime version: 1

const m0 = {
  id: "5c54ccd4ac62f235@531",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Notebooks
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
      name: "userNameParam",
      inputs: ["URLSearchParams","html"],
      value: (function(URLSearchParams,html){return(
new URLSearchParams(html`<a href>`.search).get('userName')
)})
    },
    {
      name: "viewof userName",
      inputs: ["md","userNameParam"],
      value: (function(md,userNameParam){return(
md `<input value="${userNameParam ? userNameParam : 'randomfractals'}">`
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
md `Share a link to your user info and notebooks stats: [@${userName}](?userName=${userName})`
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
      inputs: ["html","userName","user","notebooks","stats"],
      value: (function(html,userName,user,notebooks,stats){return(
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
<br />
Total Notebooks: ${notebooks.length} |
Original Notebooks: ${stats.original.length} |
Forked Notebooks: ${stats.forked.length} |
Total Likes: ${stats.liked.reduce((total, count) => total + count)}
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
md `--- 
## [@${userName} Notebooks](https://beta.observablehq.com/@randomfractals)`
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
      name: "includeForks",
      value: (function(){return(
true
)})
    },
    {
      name: "notebooksGraph",
      inputs: ["dot","userName","orient","notebooks"],
      value: (function(dot,userName,orient,notebooks){return(
dot `
digraph "${userName}" {
  rankdir = ${orient};
  ${notebooks.map(notebook => 
    `"/${notebook.slug}" [shape = rectangle, style = filled, fillcolor = "#b3e0ff",
        href = "https://beta.observablehq.com/@${userName}/${notebook.slug}", target = _blank]`
  ).join('\n')}
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
      name: "notebookList",
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
      inputs: ["notebooks","getNotebookById"],
      value: (function(notebooks,getNotebookById){return(
Promise.all(
  notebooks.filter(notebook => notebook.fork_of)
    .map(notebook => getNotebookById(notebook.fork_of.id))
)
)})
    },
    {
      name: "MAX_DOCS",
      value: (function(){return(
360
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
      name: "searchNotebooks",
      inputs: ["searchByTitle","notebooks"],
      value: (function(searchByTitle,notebooks){return(
searchByTitle(notebooks, 'chicago crimes')
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
      name: "getLinksHtml",
      inputs: ["userName"],
      value: (function(userName){return(
function getLinksHtml(notebooks) {
  return notebooks.map(notebook => 
    `<a href="https://beta.observablehq.com/@${userName}/${notebook.slug}">${notebook.title}<br />`)
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
      name: "getNotebookById",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getNotebookById(notebookId) {
  return fetch(`${apiUrl}/document/${notebookId}`).then(d => d.json())
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
</style>
`
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
  id: "@mbostock/graphviz",
  variables: [
    {
      name: "dot",
      inputs: ["require"],
      value: (function(require){return(
require("@observablehq/graphviz@0.0.2/dist/graphviz.min.js")
)})
    }
  ]
};

const m2 = {
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
  id: "5c54ccd4ac62f235@531",
  modules: [m0,m1,m2]
};

export default notebook;
