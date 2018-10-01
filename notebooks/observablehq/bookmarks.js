// URL: https://beta.observablehq.com/@randomfractals/bookmarks
// Title: Bookmarks
// Author: Taras Novak (@randomfractals)
// Version: 46
// Runtime version: 1

const m0 = {
  id: "a6509fe4c567a490@46",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Bookmarks

Liked notebooks bookmarker.

### Basic UX design Idea:

- show liked notebook list or create personal user bookmarks collection
- allow to select a notebook from the liked/bookmarked collection
- load selected notebook code on notebook list item click
- add 🔖 toggle to the notebook cell to bookmark it (named cells and functions only? or all???)
- use local storage for 📚's with 🔖's save and display ... 🤗`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## 🔖 📚 Bookmark Collections`
)})
    },
    {
      name: "viewof addCollection",
      inputs: ["text"],
      value: (function(text){return(
text({
  title: 'Create Bookmark Collection',
  placeholder: 'bookmark collection name', 
  description: 'enter collection name', 
  submit: 'Add Collection',
})
)})
    },
    {
      name: "addCollection",
      inputs: ["Generators","viewof addCollection"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof bookmarkCollections",
      inputs: ["select"],
      value: (function(select){return(
select({
  title: 'Collections',
  description: 'your bookmark collections',
  options: [],
})
)})
    },
    {
      name: "bookmarkCollections",
      inputs: ["Generators","viewof bookmarkCollections"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## 📚 Notebooks`
)})
    },
    {
      name: "viewof addNotebook",
      inputs: ["text"],
      value: (function(text){return(
text({
  title: 'Add Notebook to Collection',
  placeholder: 'notebook url', 
  description: 'enter observable notebook url', 
  submit: 'Add Notebook',
})
)})
    },
    {
      name: "addNotebook",
      inputs: ["Generators","viewof addNotebook"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `
todo: show notebooks in the selected bookmarks collection
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Notebook Code

todo: show selected notebook code cells with 🔖 toggle here for bookmarking
`
)})
    },
    {
      name: "allBookmarks",
      inputs: ["md"],
      value: (function(md){return(
md `## 🔖 Bookmarks

todo: show all bookmarked cells across all notebooks and bookmark collections
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Imports`
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
  id: "a6509fe4c567a490@46",
  modules: [m0,m1]
};

export default notebook;
