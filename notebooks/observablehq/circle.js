// URL: https://beta.observablehq.com/@randomfractals/circle
// Title: circle
// Author: Taras Novak (@randomfractals)
// Version: 188
// Runtime version: 1

const m0 = {
  id: "2b83597a324f1ee2@188",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# circle`
)})
    },
    {
      name: "circle",
      inputs: ["html"],
      value: (function(html){return(
html`
<style>
div.circle {
  border: 3px solid #f00;
  border-radius: 50%;
  width: 12px; 
  height: 12px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fcc;
}
</style>
<div class="circle">
</div>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## π, τ, and rad` 
)})
    },
    {
      name: "π",
      value: (function(){return(
Math.PI
)})
    },
    {
      name: "τ",
      inputs: ["π"],
      value: (function(π){return(
2 * π
)})
    },
    {
      name: "rad",
      inputs: ["π"],
      value: (function(π){return(
180 / π
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`see https://www.mathsisfun.com/geometry/radians.html`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## canvas circle`
)})
    },
    {
      name: "radius",
      value: (function(){return(
3
)})
    },
    {
      name: "lineWidth",
      value: (function(){return(
3
)})
    },
    {
      name: "lineColor",
      value: (function(){return(
'#000'
)})
    },
    {
      name: "dot",
      inputs: ["radius","lineWidth","DOM","lineColor","τ"],
      value: (function(radius,lineWidth,DOM,lineColor,τ)
{
  const boxSize = 2*(radius + lineWidth);
  const canvas = DOM.canvas(boxSize, boxSize);
  const context = canvas.getContext('2d');
  context.fillStyle = '#333';
  context.strokeStyle = lineColor;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.arc(radius + lineWidth/2, radius + lineWidth/2, radius, 
    0, τ, true); // startAngle, endAngle, counterclockwise
  context.stroke();
  return canvas;
}
)
    },
    {
      name: "viewof download",
      inputs: ["button"],
      value: (function(button){return(
button({value: 'download', 
  description: 'save this dot in .png format'})
)})
    },
    {
      name: "download",
      inputs: ["Generators","viewof download"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["download","save","dot"],
      value: (function(download,save,dot)
{
  download;
  return save(dot, 'dot.png');
}
)
    },
    {
      name: "save",
      value: (function(){return(
function save(canvas, fileName) {
  const mimeType = 'image/png';
  const imgUrl = canvas.toDataURL(mimeType);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = imgUrl;
  link.dataset.downloadurl = [mimeType, link.download, link.href].join(':');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return imgUrl;
}
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "button",
      remote: "button"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`---
## svg circle
...`
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "button",
      inputs: ["input"],
      value: (function(input){return(
function button(config = {}) {
  let {value, title, description, disabled} = config;
  if (typeof config == "string") value = config;
  if (!value) value = "Ok";
  const form = input({
    type: "button", title, description,
    attributes: {disabled, value}
  });
  form.output.remove();
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

const notebook = {
  id: "2b83597a324f1ee2@188",
  modules: [m0,m1]
};

export default notebook;
