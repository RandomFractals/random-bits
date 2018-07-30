// URL: https://beta.observablehq.com/@randomfractals/line-bar-chart-cases
// Title: Line/Bar Chart Cases
// Author: Taras Novak (@randomfractals)
// Version: 126
// Runtime version: 1

const m0 = {
  id: "4dde53867b3adf5f@126",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Line/Bar Chart Cases`
)})
    },
    {
      name: "cases",
      inputs: ["c3","x","y","y2"],
      value: (function(c3,x,y,y2){return(
c3({
  data: {x: 'x',
    columns: [x, y, y2],
    axes: {'complex cases': 'y2'},
    groups: [['new cases']],
    types: {'new cases': 'bar'}
  },
  axis: {
    x: {type: 'category', tick: {rotate: -45, multiline: false}, height: 40},
    y: {label: {text: y[0], position: 'outer-middle'}},
    y2: {show: true, min: 0, padding: {top: 0, bottom: 0},
      label: {text: y2[0], position: 'outer-middle'}
    }
  },
  legend: {position: 'inset'},  
})
)})
    },
    {
      name: "x",
      value: (function(){return(
['x', 'FY00', 'FY01', 'FY02', 'FY03', 'FY04', 'FY05']
)})
    },
    {
      name: "y",
      value: (function(){return(
['new cases', 0, 7, 3, 10, 9, 17]
)})
    },
    {
      name: "y2",
      value: (function(){return(
['complex cases', 0, 6, 7, 7, 8, 11]
)})
    },
    {
      name: "c3",
      inputs: ["require","html"],
      value: (async function(require,html)
{
  window.d3 = await require("d3@5");
  const c3 = await require("c3@0.6/c3.min.js");
  const link = html`<link rel=stylesheet href=${await require.resolve("c3@0.6/c3.min.css")}>`;
  if (c3._link) c3._link.remove();
  document.body.append(c3._link = link);
  return function(spec) {
    const div = html`<div>`;
    document.body.appendChild(div);
    c3.generate(Object.assign({bindto: div}, spec));
    document.body.removeChild(div);
    return div;
  };
}
)
    }
  ]
};

const notebook = {
  id: "4dde53867b3adf5f@126",
  modules: [m0]
};

export default notebook;
