// URL: https://beta.observablehq.com/@randomfractals/venn-diagram-generator
// Title: Venn Diagram Generator
// Author: Taras Novak (@randomfractals)
// Version: 89
// Runtime version: 1

const m0 = {
  id: "822cdc79cde80ab2@89",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Venn Diagram Generator

Plain JS/SVG Venn Diagram generator.

*see https://github.com/RandomFractals/venn-diagram-generator for Angular and Vue.js v's* `
)})
    },
    {
      name: "viewof title",
      inputs: ["text"],
      value: (function(text){return(
text({
  title: 'Title', 
  placeholder: 'enter diagram title',
  value: 'Data Science',
  description: 'diagram title'
})
)})
    },
    {
      name: "title",
      inputs: ["Generators","viewof title"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof topicsText",
      inputs: ["textarea"],
      value: (function(textarea){return(
textarea({
  title: 'Topics', 
  placeholder: 'add topics, one topic per line', 
  spellcheck: true, 
  value: 'Math & Stats\nHacking Skills\nDomain Expertise',
  submit: 'Generate'
})
)})
    },
    {
      name: "topicsText",
      inputs: ["Generators","viewof topicsText"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof shape",
      inputs: ["select"],
      value: (function(select){return(
select({
  title: 'shape',
  description: 'segment shape',
  options: ['circle', 'ellipses'],
  value: 'circle'
})
)})
    },
    {
      name: "shape",
      inputs: ["Generators","viewof shape"],
      value: (G, _) => G.input(_)
    },
    {
      name: "diagramSvg",
      inputs: ["svg","width","title","segments"],
      value: (function(svg,width,title,segments){return(
svg `
  <svg xmlns="http://www.w3.org/2000/svg" ref="figure"
     width="${width}" height="${width}" viewBox="0 0 ${width} ${width}">
    <text id="svg-diagram-title" 
      x="50%" y="20" 
      fontSize="40"
      font-weight="bold"
      fill="#000"
      text-anchor="middle">${title} Venn Diagram</text>
    <g id="segments-group">
      ${segments.map(topic =>
        `<ellipse cx="${topic.cx}" cy="${topic.cy}"
          rx="${topic.rx}" ry="${topic.ry}"
          transform="${topic.transform}"
          fill="${topic.fillColor}" fill-opacity=".6"
          stroke="#333" stroke-width="2">
        </ellipse>`              
      )}
    </g>
    <g id="segment-labels-group">
      <!-- main diagram topic label -->
      <text id="intersection-label" 
        x="50%" y="50%" 
        font-size="18" 
        font-weight="bold"
        text-anchor="middle">${title}</text>
      ${segments.map(topic =>
        `<text x="${topic.textX}" y="${topic.textY}"
          transform="${topic.transform}"
          font-size="16"
          text-anchor="middle">
          ${topic.title}
        </text>`              
      )}
      <g>
      </g>
    </g>
  </svg>
`
)})
    },
    {
      inputs: ["html","DOM","rasterize","diagramSvg","title","serialize"],
      value: (async function(html,DOM,rasterize,diagramSvg,title,serialize){return(
html`
${DOM.download(await rasterize(diagramSvg), `${title}-venn-diagram.png`, 'Save as PNG')}
${DOM.download(await serialize(diagramSvg), `${title}-venn-diagram.svg`, 'Save as SVG')}
`
)})
    },
    {
      name: "topics",
      inputs: ["topicsText"],
      value: (function(topicsText){return(
topicsText.split('\n')
)})
    },
    {
      name: "colors",
      value: (function(){return(
[
  '#a6cee3',
  '#b2df8a',
  '#fb9a99',
  '#fdbf6f',
  '#a6e3d4',
  '#ffff99',
]
)})
    },
    {
      name: "segments",
      inputs: ["createSegments","topics","width","shape"],
      value: (function(createSegments,topics,width,shape){return(
createSegments(topics, width, width/4 - 40, shape)
)})
    },
    {
      name: "createSegments",
      inputs: ["colors"],
      value: (function(colors){return(
function createSegments(topics, width, radius = 100, layout = 'circles') {
  // loop through diagram topics and create svg view segments for display
  let segments = [];
  for (let i = 0; i < topics.length; i++) {
    // create new topic segment
    const topic = ({title: topics[i], 
                    strokeColor: '#333', 
                    fillColor: colors[segments.length % colors.length],
                   });
    segments.push(topic);

    // calculate segment element placement angle
    // note: for semi-circle use (i/diagram.topics.length)
    const angle = (i / (topics.length / 2)) * Math.PI - Math.PI / 2; // start at 90

    // calculate x and y position of the segment element
    topic.cx = (radius * Math.cos(angle)) + (width / 2);
    topic.cy = (radius * Math.sin(angle)) + (width / 2);

    // calculate segment text label position offset
    topic.textX = ((radius + 70) * Math.cos(angle)) + (width / 2);
    topic.textY = ((radius + 70) * Math.sin(angle)) + (width / 2);

    // adjust segment radius for diagram intersection overlap
    topic.rx = radius + 40;
    switch (layout) {
      case 'ellipses':
        // adjust segment Y radius
        topic.ry = radius - 40;
        // rotate label/ellipse angle
        topic.rotateAngle = (360 / topics.length * i - 90) % 180;
        break;
      case 'random':
        // random placement, sizing, and rotation just for fun
        topic.cx = radius/2 + (Math.random() * (width - radius - 40));
        topic.cy = radius/2 + (Math.random() * (width - radius - 40));
        topic.rx = radius - (Math.random() * 40);
        topic.ry = radius - (Math.random() * (radius / 4 * 3));
        topic.rotateAngle = (i % 4) * 45 - 90; // 0 to 180 in 45 degrees increments
        topic.textX = topic.cx;
        topic.textY = topic.cy;
        break;
      default: // circles
        topic.ry = radius + 40;
        topic.rotateAngle = 0;
        break;
    }
    topic.transform = 'rotate(' + topic.rotateAngle + ' ' + topic.cx + ' ' + topic.cy + ')'
  } // end of for loop
  
  return segments;
}
)})
    },
    {
      name: "getRandomColor",
      value: (function(){return(
function getRandomColor(colorPalette) {
  return colorPalette[Math.round(Math.random() * colorPalette.length)];
}
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "text",
      remote: "text"
    },
    {
      from: "@jashkenas/inputs",
      name: "textarea",
      remote: "textarea"
    },
    {
      from: "@jashkenas/inputs",
      name: "select",
      remote: "select"
    },
    {
      from: "@mbostock/saving-svg",
      name: "rasterize",
      remote: "rasterize"
    },
    {
      from: "@mbostock/saving-svg",
      name: "serialize",
      remote: "serialize"
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "text",
      inputs: ["input"],
      value: (function(input){return(
function text(config = {}) {
  const {value, title, description, autocomplete, maxlength, minlength, pattern, placeholder, size, submit} = config;
  if (typeof config == "string") value = config;
  const form = input({
    type: "text", title, description, submit,
    attributes: {value, autocomplete, maxlength, minlength, pattern, placeholder, size}
  });
  form.output.remove();
  form.input.style.fontSize = "1em";
  return form;
}
)})
    },
    {
      name: "textarea",
      inputs: ["input","html"],
      value: (function(input,html){return(
function textarea(config = {}) {
  let {value, title, description, autocomplete, cols = 45, rows = 3, maxlength, placeholder, spellcheck, wrap, submit} = config;
  if (typeof config == "string") value = config;
  if (value == null) value = "";
  const form = input({
    form: html`<form><textarea style="display: block; font-size: 0.8em;" name=input>${value}</textarea></form>`, 
    title, description, submit,
    attributes: {autocomplete, cols, rows, maxlength, placeholder, spellcheck, wrap}
  });
  form.output.remove();
  if (submit) form.submit.style.margin = "0";
  if (title || description) form.input.style.margin = "3px 0";
  return form;
}
)})
    },
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
          ${options.map(
            ({ value, label }) => `
            <option value="${value}" ${
              value === formValue ? "selected" : ""
            }>${label}</option>
          `
          )}
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

const m2 = {
  id: "@mbostock/saving-svg",
  variables: [
    {
      name: "rasterize",
      inputs: ["DOM","serialize"],
      value: (function(DOM,serialize){return(
function rasterize(svg) {
  let resolve, reject;
  const promise = new Promise((y, n) => (resolve = y, reject = n));
  const image = new Image;
  image.onerror = reject;
  image.onload = () => {
    const rect = svg.getBoundingClientRect();
    const context = DOM.context2d(rect.width, rect.height);
    context.drawImage(image, 0, 0, rect.width, rect.height);
    context.canvas.toBlob(resolve);
  };
  image.src = URL.createObjectURL(serialize(svg));
  return promise;
}
)})
    },
    {
      name: "serialize",
      value: (function()
{
  const xmlns = "http://www.w3.org/2000/xmlns/";
  const xlinkns = "http://www.w3.org/1999/xlink";
  const svgns = "http://www.w3.org/2000/svg";
  return function serialize(svg) {
    svg = svg.cloneNode(true);
    svg.setAttributeNS(xmlns, "xmlns", svgns);
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
    const serializer = new window.XMLSerializer;
    const string = serializer.serializeToString(svg);
    return new Blob([string], {type: "image/svg+xml"});
  };
}
)
    }
  ]
};

const notebook = {
  id: "822cdc79cde80ab2@89",
  modules: [m0,m1,m2]
};

export default notebook;
