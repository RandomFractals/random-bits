// URL: https://observablehq.com/@randomfractals/chicago-crimes-arrow-data-vega-viz
// Title: Chicago Crimes Arrow Data Vega Viz
// Author: Taras Novak (@randomfractals)
// Version: 30
// Runtime version: 1

const m0 = {
  id: "4c1f5a569df97215@30",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Chicago Crimes Arrow Data Vega Viz

Displaying 156+K [Apache Arrow](https://beta.observablehq.com/@randomfractals/apache-arrow) 
data records of [2018 Chicago crimes](https://observablehq.com/@randomfractals/chicagocrimes) 
with [vega-loader-arrow](https://github.com/vega/vega-loader-arrow) data format plugin`
)})
    },
    {
      name: "chart",
      inputs: ["vegaEmbed","dataUrl"],
      value: (function(vegaEmbed,dataUrl){return(
vegaEmbed({
  width: 500,
  data: {url: dataUrl, format: {type: 'arrow'}},
  mark: 'bar',
  encoding: {
    y: {field: 'PrimaryType', type: 'ordinal', sort: {encoding: 'x'}, axis: {title: 'Crime Type'}},
    x: {aggregate: 'count', field: '*', type: 'quantitative', axis: {title: '# of Records'}} 
  }
})
)})
    },
    {
      name: "dataUrl",
      value: (function(){return(
'https://raw.githubusercontent.com/RandomFractals/ChicagoCrimes/master/data/2018/chicago-crimes-2018.arrow'
)})
    },
    {
      name: "vegaEmbed",
      inputs: ["require"],
      value: (async function(require)
{
  const vegaEmbed = await require('vega-embed@4');
  // add arrow data vega loader
  vegaEmbed.vega.formats('arrow', await require('vega-loader-arrow@0.0.6'));
  return vegaEmbed;
}
)
    }
  ]
};

const notebook = {
  id: "4c1f5a569df97215@30",
  modules: [m0]
};

export default notebook;
