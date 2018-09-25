// URL: https://beta.observablehq.com/@randomfractals/notebook-info
// Title: Notebook Info Visualizer
// Author: Taras Novak (@randomfractals)
// Version: 149
// Runtime version: 1

const m0 = {
  id: "33e49de92e6a98bc@149",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Notebook Info Visualizer

Simple Observable JS Notebook Info Visualizer. 

*see [Notebooks Visualizer](https://beta.observablehq.com/@randomfractals/notebooks) for user bio, original and forked notebooks stats, etc.*
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Input Notebook Url`
)})
    },
    {
      name: "notebookUrlParam",
      inputs: ["URLSearchParams","html"],
      value: (function(URLSearchParams,html){return(
new URLSearchParams(html`<a href>`.search).get('notebook')
)})
    },
    {
      name: "viewof notebookUrl",
      inputs: ["text","notebookUrlParam"],
      value: (function(text,notebookUrlParam){return(
text({
  placeholder: 'type observable notebook url and click Get Stats', 
  description: 'enter observable notebook url to get more notebook cells info',
  value: `${notebookUrlParam ? notebookUrlParam : '@randomfractals/notebook-info'}`,
  submit: 'Get Info'})
)})
    },
    {
      name: "notebookUrl",
      inputs: ["Generators","viewof notebookUrl"],
      value: (G, _) => G.input(_)
    },
    {
      name: "shareLink",
      inputs: ["md","notebookUrl"],
      value: (function(md,notebookUrl){return(
md `*share a link to your notebook info: [${notebookUrl}](?notebook=${notebookUrl})*`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## User Info and Notebook Cells Graph (todo)`
)})
    },
    {
      name: "userBio",
      inputs: ["getUserBioHtml","userName","userInfo"],
      value: (function(getUserBioHtml,userName,userInfo){return(
getUserBioHtml(userName, userInfo)
)})
    },
    {
      name: "notebookGraph",
      inputs: ["dot","notebookUrl","userInfo","notebook"],
      value: (function(dot,notebookUrl,userInfo,notebook){return(
dot `
digraph "${notebookUrl}" {
  "@${userInfo.login}" [shape = oval, style = filled, fillcolor = "#b3e6cc",
    href = "https://beta.observablehq.com/@${userInfo.login}", target = _blank]
  "/${notebook.slug}" [shape = rectangle, style = filled, fillcolor = "#b3e0ff",
    href = "https://beta.observablehq.com/${notebookUrl}", target = _blank]
}`
)})
    },
    {
      inputs: ["html","DOM","rasterize","notebookGraph","notebookUrl","serialize"],
      value: (async function(html,DOM,rasterize,notebookGraph,notebookUrl,serialize){return(
html`
${DOM.download(await rasterize(notebookGraph), `${notebookUrl}-graph.png`, "Save as PNG")}
${DOM.download(await serialize(notebookGraph), `${notebookUrl}-graph.svg`, "Save as SVG")}
`
)})
    },
    {
      name: "userName",
      inputs: ["notebookUrl"],
      value: (function(notebookUrl){return(
notebookUrl.substring(1, notebookUrl.indexOf('/'))
)})
    },
    {
      name: "userInfo",
      inputs: ["getUserInfo","userName"],
      value: (function(getUserInfo,userName){return(
getUserInfo(userName)
)})
    },
    {
      name: "apiUrl",
      value: (function(){return(
'https://observable-cors.glitch.me/https://api.observablehq.com'
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Notebook Info`
)})
    },
    {
      name: "notebook",
      inputs: ["getNotebookByUrl","notebookUrl"],
      value: (function(getNotebookByUrl,notebookUrl){return(
getNotebookByUrl(notebookUrl)
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
      name: "notebookFunctionNames",
      inputs: ["notebookFunctions"],
      value: (function(notebookFunctions){return(
notebookFunctions.map(funct => funct.value.substring(0, funct.value.indexOf('(')).replace('function', '').replace(' ', ''))
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
      name: "htmlCells",
      inputs: ["notebook"],
      value: (function(notebook){return(
notebook.nodes.filter(node => node.value.substring(0, 6).replace(' ', '').startsWith('html`'))
)})
    },
    {
      name: "mdCells",
      inputs: ["notebook"],
      value: (function(notebook){return(
notebook.nodes.filter(node => node.value.substring(0, 4).replace(' ', '').startsWith('md`'))
)})
    },
    {
      name: "svgCells",
      inputs: ["notebook"],
      value: (function(notebook){return(
notebook.nodes.filter(node => node.value.substring(0, 5).replace(' ', '').startsWith('svg`'))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Notebook Cells Code View`
)})
    },
    {
      name: "notebookCells",
      inputs: ["html","notebook","cellCodeColor"],
      value: (function(html,notebook,cellCodeColor){return(
html `${
  notebook.nodes
    .map((d,i) => `<pre style="font-size:14px; color:${cellCodeColor(i)}">${d.value.replace(/</g, "&lt;")}</pre>`)
    .join("<hr style='margin:0;padding:0'>")
}`
)})
    },
    {
      name: "cellCodeColor",
      value: (function(){return(
function cellCodeColor(i) {
  return '#' + ('4b9ec1-b5a636-495e1d-e55934-fa7921'.split('-')[i % 5]);
}
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
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "text",
      remote: "text"
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
    },
    {
      from: "@randomfractals/notebooks",
      name: "getUserInfo",
      remote: "getUserInfo"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getUserBioHtml",
      remote: "getUserBioHtml"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNotebookByUrl",
      remote: "getNotebookByUrl"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNotebookFunctions",
      remote: "getNotebookFunctions"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNamedNotebookCells",
      remote: "getNamedNotebookCells"
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
  id: "@mbostock/graphviz",
  variables: [
    {
      name: "dot",
      inputs: ["require"],
      value: (function(require){return(
require("@observablehq/graphviz@0.1")
)})
    }
  ]
};

const m3 = {
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

const m4 = {
  id: "@randomfractals/notebooks",
  variables: [
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
  return notebook.nodes.filter(node => !node.value.startsWith('function') && node.value.indexOf('=') > 0)  
}
)})
    },
    {
      name: "apiUrl",
      value: (function(){return(
'https://observable-cors.glitch.me/https://api.observablehq.com'
)})
    }
  ]
};

const notebook = {
  id: "33e49de92e6a98bc@149",
  modules: [m0,m1,m2,m3,m4]
};

export default notebook;
