// URL: https://beta.observablehq.com/@randomfractals/fin-hypergrid
// Title: fin-hypergrid
// Author: Taras Novak (@randomfractals)
// Version: 59
// Runtime version: 1

const m0 = {
  id: "353a93078bb052a9@59",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# fin-hypergrid

Intro to [fin-hypergrid](https://github.com/fin-hypergrid) - canvas-based super high performant grid renderer.

based on [basic hypergrid demo](https://fin-hypergrid.github.io/core/demo/basic.html)`
)})
    },
    {
      inputs: ["html","width"],
      value: (function(html,width){return(
html `<div id="grid" style="position:relative; width:${Math.min(600, width)}px; height:400px"></div>`
)})
    },
    {
      name: "loadData",
      inputs: ["data"],
      value: (function(data)
{
  const div = document.querySelector('div#grid');
  const grid = new window.fin.Hypergrid(div, {data: data});
}
)
    },
    {
      name: "data",
      inputs: ["d3Fetch"],
      value: (function(d3Fetch){return(
d3Fetch.json('https://fin-hypergrid.github.io/core/demo/data/basic.json')
)})
    },
    {
      name: "Hypergrid",
      inputs: ["require"],
      value: (function(require){return(
require('https://fin-hypergrid.github.io/core/demo/build/fin-hypergrid.js').catch(() => window.fin.Hypergrid)
)})
    },
    {
      name: "d3Fetch",
      inputs: ["require"],
      value: (function(require){return(
require("d3-fetch@1.1.0")
)})
    }
  ]
};

const notebook = {
  id: "353a93078bb052a9@59",
  modules: [m0]
};

export default notebook;
