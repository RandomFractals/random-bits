// URL: https://observablehq.com/@randomfractals/data-inspector
// Title: Data Inspector 🕵️‍
// Author: Taras Novak (@randomfractals)
// Version: 97
// Runtime version: 1

const m0 = {
  id: "08772c01decd03fb@97",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Data Inspector 🕵️‍

Simple csv data utility notebook for viewing, slicing, dicing, and graphing data with [perspectiveJS](https://github.com/jpmorganchase/perspective) for exploratory data analysis (EDA)
`
)})
    },
    {
      name: "viewof dataFile",
      inputs: ["file"],
      value: (function(file){return(
file({
  title: 'CSV Data File',
  description: 'Upload csv data file. Note: all data is processed on the client.',
  accept: '.csv',
  multiple: false,
})
)})
    },
    {
      name: "dataFile",
      inputs: ["Generators","viewof dataFile"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","dataFile"],
      value: (function(md,dataFile){return(
md `file size: ${Math.round(dataFile.size/1024)} KB`
)})
    },
    {
      name: "viewer",
      inputs: ["html"],
      value: (function(html){return(
html `
<div style="height: 600px">
  <perspective-viewer view="grid">                
  </perspective-viewer>
</div>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Perspective Viewer Setup`
)})
    },
    {
      name: "viewerLoad",
      inputs: ["loadPerspectiveViewerPlugins"],
      value: (function(loadPerspectiveViewerPlugins){return(
window.addEventListener('WebComponentsReady', function() {
  console.log('WebComponentsReady: loading plugins...');
  loadPerspectiveViewerPlugins();
})
)})
    },
    {
      name: "loadPerspectiveViewerPlugins",
      inputs: ["require"],
      value: (function(require){return(
async function loadPerspectiveViewerPlugins() {
  console.log('loadPerspectiveViewerPlugins: loading plugins...');
  const hyperGrid = await require('@finos/perspective-viewer-hypergrid@0.3.0-rc.1/build/hypergrid.plugin.js');
  const highCharts = await require('@finos/perspective-viewer-highcharts@0.3.0-rc.1/build/highcharts.plugin.js');    
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Data Load`
)})
    },
    {
      inputs: ["loadData","dataFile"],
      value: (function(loadData,dataFile){return(
loadData(dataFile)
)})
    },
    {
      name: "loadData",
      value: (function(){return(
function loadData(file) {
  let reader = new FileReader();
  reader.onload = function(fileLoadedEvent) {
    console.log('loadData: loading file:', file.name);
    let txt = fileLoadedEvent.target.result;
    const viewer = document.getElementsByTagName('perspective-viewer')[0];
    viewer.reset();
    viewer.load(txt);
    viewer.update(txt);
    viewer.toggleConfig();
  };        
  // read csv data as text, triggering the onload when finished
  reader.readAsText(file);
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
      from: "@jashkenas/inputs",
      name: "file",
      remote: "file"
    },
    {
      name: "perspective",
      inputs: ["require"],
      value: (function(require){return(
require('@finos/perspective@0.3.0-rc.1/build/perspective.js')
)})
    },
    {
      name: "perspectiveViewer",
      inputs: ["require"],
      value: (function(require){return(
require('@finos/perspective-viewer@0.3.0-rc.1/build/perspective.view.js')
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Styles`
)})
    },
    {
      name: "viewerStyle",
      inputs: ["html"],
      value: (function(html){return(
html`
<link rel='stylesheet' href="https://unpkg.com/@finos/perspective-viewer@0.3.0-rc.1/build/material.css" is="custom-style" />
<style>
perspective-viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Dev Log

see [#dataInspector 🕵️‍♀️ on Twitter](https://twitter.com/hashtag/dataInspector?src=hash)`
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "file",
      inputs: ["input"],
      value: (function(input){return(
function file(config = {}) {
  let {multiple, accept, title, description} = config;
  const form = input({
    type: "file", title, description,
    attributes: {multiple, accept},
    action: form => {
      form.input.onchange = () => {
        form.value = multiple ? form.input.files : form.input.files[0];
        form.dispatchEvent(new CustomEvent("input"));
      };
    }
  });
  form.output.remove();
  form.input.onchange();
  return form;
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
  id: "08772c01decd03fb@97",
  modules: [m0,m1]
};

export default notebook;
