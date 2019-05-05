// URL: https://observablehq.com/@randomfractals/vega-datasets
// Title: Vega Datasets
// Author: Taras Novak (@randomfractals)
// Version: 144
// Runtime version: 1

const m0 = {
  id: "746209ee3f3ea6d2@144",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Vega Datasets

List of [vega-datasets](https://github.com/vega/vega-datasets) for preview in 
[Vega](https://github.com/vega/vega/tree/master/docs/examples) and 
[Vega-Lite](https://github.com/vega/vega-lite/tree/master/examples/specs) examples.

This notebook uses [d3-fetch](https://github.com/d3/d3-fetch) for fetching selected dataset and
[fin-hypergrid](https://github.com/fin-hypergrid/core) high performance canvas-based grid renderer 
for fast data display and scrolling.

**Note**: this data preview utility notebook can be used to preview any public online csv or json data. just paste your data url to fetch it ;)
`
)})
    },
    {
      name: "viewof dataSet",
      inputs: ["select","dataSets"],
      value: (function(select,dataSets){return(
select({
  title: 'dataset',
  description: 'select dataset to fetch',
  options: dataSets
})
)})
    },
    {
      name: "dataSet",
      inputs: ["Generators","viewof dataSet"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof dataUrl",
      inputs: ["text","baseUrl","dataSet"],
      value: (function(text,baseUrl,dataSet){return(
text({
  placeholder: 'type data url and click fetch', 
  description: 'data url to fetch',
  value: `${baseUrl}/${dataSet}`,
  submit: 'fetchData'})
)})
    },
    {
      name: "dataUrl",
      inputs: ["Generators","viewof dataUrl"],
      value: (G, _) => G.input(_)
    },
    {
      name: "data",
      inputs: ["fetchData","dataUrl"],
      value: (function(fetchData,dataUrl){return(
fetchData(dataUrl)
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html `<div id="grid"></div>`
)})
    },
    {
      name: "dataGrid",
      inputs: ["Hypergrid"],
      value: (function(Hypergrid){return(
new Hypergrid(document.querySelector('div#grid'), {data: []})
)})
    },
    {
      inputs: ["showData","data","dataGrid"],
      value: (function(showData,data,dataGrid){return(
showData(data, dataGrid)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Styles`
)})
    },
    {
      name: "styles",
      inputs: ["html"],
      value: (function(html){return(
html`
<style>
input[type="text"] {
  width: 700px;
}
#grid {
  position: relative;
  width: 100%;
  height: 600px;
  border: 1px solid #666;
}
<style>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Data`
)})
    },
    {
      name: "baseUrl",
      value: (function(){return(
'https://raw.githubusercontent.com/vega/vega-datasets/master/data'
)})
    },
    {
      name: "dataSets",
      value: (function(){return(
['airports.csv', 'co2-concentration.csv', 'disasters.csv', 'flights-3m.csv', 'flights-airport.csv',
           'gapminder-health-income.csv', 'github.csv', 'iowa-electricity.csv', 'la-riots.csv', 'lookup_groups.csv',
           'lookup_people.csv', 'population_engineers_hurricanes.csv', 'seattle-temps.csv', 'seattle-weather.csv',
           'sf-temps.csv', 'sp500.csv', 'stocks.csv', 'us-employment.csv', 'weather.csv', 'windvectors.csv', 'zipcodes.csv',
           'barley.json', 'birdstrikes.json', 'budget.json', 'budgets.json', 'burtin.json', 'cars.json', 'climate.json',
           'countries.json', 'crimea.json', 'driving.json', 'flare-dependencies.json', 'flare.json', 
           'flights-2k.json', 'flights-5k.json', 'flights-10k.json', 'flights-20k.json', 'flights-200k.json',
           'gapminder.json', 'income.json', 'iris.json', 'jobs.json', 'londonCentroids.json',
           'monarchs.json', 'movies.json', 'normal-2d.json', 'points.json',
           'udistrict.json', 'unemployment-across-industries.json', 'us-state-capitals.json',
           'weball26.json', 'wheat.json']
)})
    },
    {
      name: "fetchData",
      inputs: ["d3Fetch"],
      value: (function(d3Fetch){return(
async function fetchData(dataUrl) {
  let data = [];
  console.log('fetchData:dataUrl:', dataUrl);
  if (dataUrl.endsWith('.csv')) {
    data = await d3Fetch.csv(dataUrl);
  } 
  else if (dataUrl.endsWith('.json')) {
    data = await d3Fetch.json(dataUrl);
  }
  // TODO: add arrow data support too
  return data;
}
)})
    },
    {
      name: "showData",
      value: (function(){return(
function showData(data, grid) {
  grid.reset();
  grid.setData({data: data});
  grid.behaviorChanged();
  grid.repaint();
  return grid;
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
      name: "select",
      remote: "select"
    },
    {
      from: "@jashkenas/inputs",
      name: "text",
      remote: "text"
    },
    {
      name: "d3Fetch",
      inputs: ["require"],
      value: (function(require){return(
require("d3-fetch@1.1.2")
)})
    },
    {
      name: "Hypergrid",
      inputs: ["require"],
      value: (function(require){return(
require('https://fin-hypergrid.github.io/core/3.2.0/build/fin-hypergrid.js').catch(() => window.fin.Hypergrid)
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "select",
      inputs: ["input","html"],
      value: (function(input,html){return(
function select(config = {}) {
  let {
    value: formValue,
    title,
    description,
    submit,
    multiple,
    size,
    options
  } = config;
  if (Array.isArray(config)) options = config;
  options = options.map(
    o => (typeof o === "object" ? o : { value: o, label: o })
  );
  const form = input({
    type: "select",
    title,
    description,
    submit,
    getValue: input => {
      const selected = Array.prototype.filter
        .call(input.options, i => i.selected)
        .map(i => i.value);
      return multiple ? selected : selected[0];
    },
    form: html`
      <form>
        <select name="input" ${
          multiple ? `multiple size="${size || options.length}"` : ""
        }>
          ${options.map(({ value, label }) => Object.assign(html`<option>`, {
              value,
              selected: Array.isArray(formValue)
                ? formValue.includes(value)
                : formValue === value,
              textContent: label
            }))}
        </select>
      </form>
    `
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "text",
      inputs: ["input"],
      value: (function(input){return(
function text(config = {}) {
  const {
    value,
    title,
    description,
    autocomplete = "off",
    maxlength,
    minlength,
    pattern,
    placeholder,
    size,
    submit
  } = config;
  if (typeof config == "string") value = config;
  const form = input({
    type: "text",
    title,
    description,
    submit,
    attributes: {
      value,
      autocomplete,
      maxlength,
      minlength,
      pattern,
      placeholder,
      size
    }
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
  id: "746209ee3f3ea6d2@144",
  modules: [m0,m1]
};

export default notebook;
