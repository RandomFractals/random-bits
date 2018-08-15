// URL: https://beta.observablehq.com/@randomfractals/vega-fold-transform-fix
// Title: Vega Fold Transform Fix
// Author: Taras Novak (@randomfractals)
// Version: 44
// Runtime version: 1

const m0 = {
  id: "a2653df9122ff173@44",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Vega Fold Transform Fix

Solution: use the latest stable vega libs. see vegaLite cell below.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## [Fold does not work on Vega-lite](https://talk.observablehq.com/t/vega-fold-transformation-does-not-work-in-observable/1093)

The fold transform does not work in ObservableHQ, but it does work in the [vega editor](https://vega.github.io/editor/#/url/vega-lite/N4KABGBEAkDODGALApgWwIaQFxUQFzwAdYsB6UgN2QHN0A6agSz0QFcAjOxge1IRQyUa6ALQAbZskoAmOgCtY3AHaQANOCgATdHkw5QECJAroxrZLGxgA2hsNhgkAGaMAHsk1WAzKqgmATozo7GLIVgCMAAy+kLB43P7o1GE40pEAvur2EI4u7p44ABwxAUEhKWAA7DFxCUkV0gBs6XZgALoamRqQeIlKsE4JqFbWudxiBTbG6IHBoWpQeR6QbTHoljjWkADWyACeC9NmYW3pq90Y-ttWkBJKYVlQyErw3JqMStRWBoaQrt-ORjICY3WqJZKHPB7QgVSAAR1Y6CUeGYOkYVEgXXskAO+kBwMmR3MkOhsIRSJRuhRGKxv1eYgSAJcBJuuwOMShMJuSm4qA+pkxnUekFeShcX30LXSQA)
`
)})
    },
    {
      inputs: ["vegaEmbed","plot"],
      value: (function(vegaEmbed,plot){return(
vegaEmbed(plot)
)})
    },
    {
      inputs: ["vegaLite","plot"],
      value: (function(vegaLite,plot){return(
vegaLite(plot)
)})
    },
    {
      name: "plot",
      value: (function(){return(
Object({
  "data": {
    "values": [
      {"fixed": 3, "variable": 10, "storage": 20},
      {"fixed": 8, "variable": 7, "storage": 26}
    ]
  },
  "transform": [{"fold": ["variable", "fixed"], "as": ["key", "value"]}],
  "mark": "line",
  "encoding": {
    "x": {"field": "storage", "type": "quantitative"},
    "y": {"field": "value", "type": "quantitative"},
    "color": {"field": "key", "type": "nominal"}
  }
})
)})
    },
    {
      name: "vegaEmbed",
      inputs: ["require"],
      value: (function(require){return(
require("vega-embed@3.18.2/build/vega-embed.min.js")
)})
    },
    {
      name: "vegaLite",
      inputs: ["require"],
      value: (async function(require)
{
  const [Vega, VegaLite] = await Promise.all([
    require("vega@4.2.0/build/vega.min.js"),
    require("vega-lite@3.0.0-rc3/build/vega-lite.min.js")
  ]);
  return async spec => {
    const div = document.createElement("div");
    const view = new Vega.View(Vega.parse(VegaLite.compile(spec).spec));
    await view.initialize(div).runAsync();
    return div;
  };
}
)
    }
  ]
};

const notebook = {
  id: "a2653df9122ff173@44",
  modules: [m0]
};

export default notebook;
