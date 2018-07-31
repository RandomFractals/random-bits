// URL: https://beta.observablehq.com/@randomfractals/latex-slider
// Title: LaTeX Power Slider
// Author: Taras Novak (@randomfractals)
// Version: 39
// Runtime version: 1

const m0 = {
  id: "6a221a5328d83858@39",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# LaTeX Power Slider`
)})
    },
    {
      name: "x",
      value: (function(){return(
5
)})
    },
    {
      name: "viewof y",
      inputs: ["slider"],
      value: (function(slider){return(
slider({min: 0, max: 100, step: 1, value: 3})
)})
    },
    {
      name: "y",
      inputs: ["Generators","viewof y"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["tex","y","x"],
      value: (function(tex,y,x){return(
tex `x^{${y}} = ${Math.pow(x, y)}`
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `see this [${tex`\KaTeX`}/${tex`\LaTeX`} intro notebook](https://beta.observablehq.com/@roblabs/tex-katex-on-observable)
on 
[${tex`\KaTeX`}](https://khan.github.io/KaTeX/)/
[${tex`\LaTeX`}](https://www.latex-project.org/) for more info`
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {value, min = 0, max = 1, step = "any", precision = 2, title, description, format, submit} = config;
  if (typeof config == "number") value = config;
  if (value == null) value = (max + min) / 2;
  precision = Math.pow(10, precision);
  return input({
    type: "range", title, description, submit, format,
    attributes: {min, max, step, value},
    getValue: input => Math.round(input.valueAsNumber * precision) / precision
  });
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

const notebook = {
  id: "6a221a5328d83858@39",
  modules: [m0,m1]
};

export default notebook;
