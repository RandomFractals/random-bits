// URL: https://observablehq.com/@randomfractals/observing-vega-signals
// Title: Observing Vega Signals
// Author: Taras Novak (@randomfractals)
// Version: 154
// Runtime version: 1

const m0 = {
  id: "7e43ecc8ac69c8f1@154",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Observing Vega Signals

Use [*view*.addSignalListener](https://vega.github.io/vega/docs/api/view/#view_addSignalListener) 

Read more about it at [Interactive Plots with Selections](https://vega.github.io/vega-lite/docs/selection.html)

See [vega-template](https://github.com/RandomFractals/vega-template) for this example on other platforms.

*UX tip*: use Shift key with bar click for multiple selections.`
)})
    },
    {
      name: "viewof theme",
      inputs: ["dropdown"],
      value: (function(dropdown){return(
dropdown([undefined, 'dark', 'excel', 'ggplot2', 'quartz', 'vox', 'fivethirtyeight', 'latimes'])
)})
    },
    {
      name: "theme",
      inputs: ["Generators","viewof theme"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof chart",
      inputs: ["vegaEmbed","theme"],
      value: (function(vegaEmbed,theme){return(
vegaEmbed({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "title": "Interactive Vega Bar Chart",
  "description": "bar chart with highlighting on hover and multi-bar selection on click",
  "width": 240, "height": 240,
  "data": {"values": [{"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}]},
  "selection": {
    "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
    "select": {"type": "multi"},
    "barSelection": {"fields": ["a"], "on": "click", "type": "multi"}
  },  
  "mark": {"type": "bar", "fill": "#4C78A8", "stroke": "black", "cursor": "pointer"},
  "encoding": {
    "x": {"field": "a", "type": "ordinal"}, 
    "y": {"field": "b", "type": "quantitative"},
    "fillOpacity": {"condition": {"selection": "select", "value": 1}, "value": 0.8},
    "strokeWidth": {"condition": {"selection": "highlight", "value": 1}, "value": 0.5}
  },
  "config": {
    "scale": {"bandPaddingInner": 0.2}, 
    "axis": {"labelColor": "#333", "labelFontSize": 12, "labelFontWeight": "bold"},
    "axisBottom": {"labelColor": "#666"}
  }
}, {theme: theme})
)})
    },
    {
      name: "chart",
      inputs: ["Generators","viewof chart"],
      value: (G, _) => G.input(_)
    },
    {
      name: "barSelection",
      inputs: ["Generators","chart"],
      value: (function(Generators,chart){return(
Generators.observe(notify => {
  const barSelection = (name, value) => notify(value);
  chart.addSignalListener("barSelection", barSelection);
  notify(chart.signal("barSelection"));
  return () => chart.removeSignalListener("barSelection", barSelection);
})
)})
    },
    {
      name: "vegaEmbed",
      inputs: ["require"],
      value: (function(require){return(
require("vega-embed@4")
)})
    },
    {
      from: "@jgrunik/inputs",
      name: "dropdown",
      remote: "dropdown"
    }
  ]
};

const m1 = {
  id: "@jgrunik/inputs",
  variables: [
    {
      name: "dropdown",
      inputs: ["html"],
      value: (function(html){return(
function dropdown(options) {
  let dd = html `<select>`
  
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];
    dd.appendChild(option);
  }
  
  return dd; 
}
)})
    }
  ]
};

const notebook = {
  id: "7e43ecc8ac69c8f1@154",
  modules: [m0,m1]
};

export default notebook;
