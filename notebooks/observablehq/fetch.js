// URL: https://beta.observablehq.com/@randomfractals/fetch
// Title: Fetch
// Author: Taras Novak (@randomfractals)
// Version: 139
// Runtime version: 1

const m0 = {
  id: "b4b4d8b0cd47e57c@139",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Fetch

fetch js sandbox`
)})
    },
    {
      name: "viewof url",
      inputs: ["text"],
      value: (function(text){return(
text({
  placeholder: 'type url and click fetch', 
  description: 'enter data url to fetch',
  value: 'https://api.observablehq.com/user/@randomfractals',
  submit: 'fetch'})
)})
    },
    {
      name: "url",
      inputs: ["Generators","viewof url"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["url"],
      value: (function(url){return(
url
)})
    },
    {
      name: "viewof proxy",
      inputs: ["select"],
      value: (function(select){return(
select({
  title: 'proxy',
  description: 'select CORS proxy if fetch fails',
  options: ['',
    'https://observable-cors.glitch.me/',
    'https://cors-proxy.htmldriven.com/?url=',
    'https://cors-anywhere.herokuapp.com/',            
  ],
  value: ''
})
)})
    },
    {
      name: "proxy",
      inputs: ["Generators","viewof proxy"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["proxy","url"],
      value: (function(proxy,url){return(
fetch(proxy + url, {
  headers: {
    Accept: '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    Referer: 'https://beta.observablehq.com/@randomfractals/fetch',
  },
  //credentials: 'include',
  cache: 'no-store',
  mode: 'cors',
  redirect: 'follow',
}).then(response => {
  if (!response.ok) throw new Error(response.status);
  return response.json();
}).catch(error => {return error;})
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "text",
      remote: "text"
    },
    {
      from: "@jashkenas/inputs",
      name: "select",
      remote: "select"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Fetch & CORS Docs

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

https://fetch.spec.whatwg.org/

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Other Fetch Notebooks

[@tmcw/Spec Reads #1: fetch](https://beta.observablehq.com/@tmcw/spec-reads-1-fetch)

[@mbostock/Fetch with Basic Auth](https://beta.observablehq.com/@mbostock/fetch-with-basic-auth)

[@mbostock/Posting with Fetch](https://beta.observablehq.com/@mbostock/posting-with-fetch)

[@mbostock/Fetch Error Handling](https://beta.observablehq.com/@mbostock/fetch-error-handling)

[@bumbeishvili/Fetcher](https://beta.observablehq.com/@bumbeishvili/fetcher)

[@alecglassford/so fetch!](https://beta.observablehq.com/@alecglassford/so-fetch)
`
)})
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

const notebook = {
  id: "b4b4d8b0cd47e57c@139",
  modules: [m0,m1]
};

export default notebook;
