// URL: https://beta.observablehq.com/@randomfractals/bookmarks
// Title: Bookmarks
// Author: Taras Novak (@randomfractals)
// Version: 138
// Runtime version: 1

const m0 = {
  id: "a6509fe4c567a490@138",
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
- use local storage for 📚's with 🔖's save and display ... 🤗
---
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## 🔖 📚 Bookmark Collections`
)})
    },
    {
      name: "viewof bookmarkCollections",
      inputs: ["select","collectionNames"],
      value: (function(select,collectionNames){return(
select({
  title: 'Bookmark Collections',
  description: 'your bookmark collections',
  options: collectionNames,
})
)})
    },
    {
      name: "bookmarkCollections",
      inputs: ["Generators","viewof bookmarkCollections"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof addCollectionName",
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
      name: "addCollectionName",
      inputs: ["Generators","viewof addCollectionName"],
      value: (G, _) => G.input(_)
    },
    {
      name: "newCollection",
      inputs: ["addCollection","addCollectionName"],
      value: (function(addCollection,addCollectionName){return(
addCollection(addCollectionName)
)})
    },
    {
      name: "viewof removeCollectionName",
      inputs: ["text"],
      value: (function(text){return(
text({
  title: 'Remove Bookmark Collection',
  placeholder: 'bookmark collection name', 
  description: 'enter collection name', 
  submit: 'Remove Collection',
})
)})
    },
    {
      name: "removeCollectionName",
      inputs: ["Generators","viewof removeCollectionName"],
      value: (G, _) => G.input(_)
    },
    {
      name: "removedCollection",
      inputs: ["removeCollection","removeCollectionName"],
      value: (function(removeCollection,removeCollectionName){return(
removeCollection(removeCollectionName)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `---
## 📚 Notebooks`
)})
    },
    {
      name: "viewof notebookUrl",
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
      name: "notebookUrl",
      inputs: ["Generators","viewof notebookUrl"],
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
md `---
## Notebook Code

todo: show selected notebook code cells with 🔖 toggle here for bookmarking
`
)})
    },
    {
      name: "allBookmarks",
      inputs: ["md"],
      value: (function(md){return(
md `---
## 🔖 Bookmarks

todo: show all bookmarked cells across all notebooks and bookmark collections with links to the original notebook cell and options to copy cell code.
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `---
### Bookmark Collections API`
)})
    },
    {
      name: "localStorage",
      value: (function(){return(
window.localStorage
)})
    },
    {
      name: "BookmarksPath",
      value: (function(){return(
'bookmarks'
)})
    },
    {
      name: "bookmarks",
      inputs: ["getBookmarks"],
      value: (function(getBookmarks){return(
getBookmarks()
)})
    },
    {
      name: "collections",
      inputs: ["getCollections"],
      value: (function(getCollections){return(
getCollections()
)})
    },
    {
      name: "collectionNames",
      inputs: ["bookmarks"],
      value: (function(bookmarks){return(
bookmarks.collections.map(collection => collection.name)
)})
    },
    {
      name: "getBookmarks",
      inputs: ["localStorage","BookmarksPath"],
      value: (function(localStorage,BookmarksPath){return(
async function getBookmarks() {
  let data = await localStorage[BookmarksPath];
  if (data) return JSON.parse(data);
  return {collections: []};
}
)})
    },
    {
      name: "saveBookmarks",
      inputs: ["localStorage","BookmarksPath"],
      value: (function(localStorage,BookmarksPath){return(
async function saveBookmarks(bookmarks) {
  if (!bookmarks.collections) {
    bookmarks.collections = [];
  }
  return localStorage[BookmarksPath] = JSON.stringify(bookmarks);
}
)})
    },
    {
      name: "getCollections",
      inputs: ["bookmarks"],
      value: (function(bookmarks){return(
function getCollections() {
  return bookmarks.collections; 
}
)})
    },
    {
      name: "addCollection",
      inputs: ["bookmarks","saveBookmarks"],
      value: (function(bookmarks,saveBookmarks){return(
function addCollection(collectionName) {
  if (!collectionName || collectionName === undefined)
    return null;
  const collection = {name: collectionName.trim(), bookmarks: []};
  bookmarks.collections.push(collection);
  saveBookmarks(bookmarks);
  return collection;
}
)})
    },
    {
      name: "removeCollection",
      inputs: ["collections","saveBookmarks","bookmarks"],
      value: (function(collections,saveBookmarks,bookmarks){return(
function removeCollection(collectionName) {
  let collection = null;
  for (let i=0; i<collections.length; i++) {
    let collection = collections[i];
    if (collection.name === collectionName) {
      collections.splice(i, 1);
      saveBookmarks(bookmarks);
      break;
    }
  }
  return collection;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `---
### Imports`
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
  id: "a6509fe4c567a490@138",
  modules: [m0,m1]
};

export default notebook;
