// URL: https://observablehq.com/@randomfractals/chicago-crimes-arrow-data-vega-lite-api-viz
// Title: Chicago Crimes Arrow Data Vega-Lite API Viz
// Author: Taras Novak (@randomfractals)
// Version: 68
// Runtime version: 1

const m0 = {
  id: "97a1f9906dcfc7b5@68",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Chicago Crimes Arrow Data Vega-Lite API Viz

Displaying 156+K [Apache Arrow](https://beta.observablehq.com/@randomfractals/apache-arrow) 
data records of [2018 Chicago crimes](https://observablehq.com/@randomfractals/chicagocrimes) 
with [vega-loader-arrow](https://github.com/vega/vega-loader-arrow) data format plugin and
[vega-lite-api](https://github.com/vega/vega-lite-api)`
)})
    },
    {
      name: "chart",
      inputs: ["vl","dataUrl"],
      value: (function(vl,dataUrl){return(
vl.markBar().data({url: dataUrl, format: {type: 'arrow'}}).encode(
  vl.y().fieldO('PrimaryType').sort({encoding: 'x'}).axis({title: 'Crime Type'}),
  vl.x().fieldQ('*').count().axis({title: '# of Records'})
).render()
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Data`
)})
    },
    {
      name: "dataUrl",
      value: (function(){return(
'https://raw.githubusercontent.com/RandomFractals/ChicagoCrimes/master/data/2018/chicago-crimes-2018.arrow'
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      from: "@vega/vega-lite-api",
      name: "vegaLite",
      remote: "vl"
    },
    {
      name: "vl",
      inputs: ["vegaLite","require"],
      value: (async function(vegaLite,require)
{
  // add arrow data vega loader
  vegaLite.vega.formats('arrow', await require('vega-loader-arrow@0.0.6'));
  return vegaLite;
}
)
    }
  ]
};

const m1 = {
  id: "@vega/vega-lite-api",
  variables: [
    {
      name: "vl",
      inputs: ["require"],
      value: (async function(require)
{
  const [vega, vegalite, api, tooltip] = await Promise.all([
    'vega@5',
    'vega-lite@3.2.1',
    'vega-lite-api@0.0.15',
    'vega-tooltip@0.17.0'
  ].map(module => require(module)));

  const options = {
    config: {
      // vega-lite default configuration
      config: {
        view: {width: 400, height: 300},
        mark: {tooltip: null}
      }
    },
    init: view => {
      // initialize tooltip handler
      view.tooltip(new tooltip.Handler().call);
      // enable horizontal scrolling for large plots
      if (view.container()) view.container().style['overflow-x'] = 'auto';
    },
    view: {
      // view constructor options
      loader: vega.loader({baseURL: 'https://vega.github.io/vega-datasets/'}),
      renderer: 'canvas'
    }
  };
  
  return api.register(vega, vegalite, options);
}
)
    }
  ]
};

const notebook = {
  id: "97a1f9906dcfc7b5@68",
  modules: [m0,m1]
};

export default notebook;
