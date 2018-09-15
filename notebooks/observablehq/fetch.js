// URL: https://beta.observablehq.com/@randomfractals/fetch
// Title: Fetch
// Author: Taras Novak (@randomfractals)
// Version: 25
// Runtime version: 1

const m0 = {
  id: "b4b4d8b0cd47e57c@25",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Fetch

fetch js playground TBD...`
)})
    },
    {
      name: "viewof url",
      inputs: ["getData"],
      value: (function(getData){return(
getData({value: ''})
)})
    },
    {
      name: "url",
      inputs: ["Generators","viewof url"],
      value: (G, _) => G.input(_)
    },
    {
      name: "getData",
      inputs: ["html"],
      value: (function(html){return(
function getData({value = '', placeholder = 'type url and click fetch'} = {}) {
  const form = html `<form>
    <input name="text">
    <button type=submit>fetch</button>
  </form>`;
  form.text.value = form.value = value;
  form.text.placeholder = placeholder;
  form.text.addEventListener('input', event => event.stopPropagation());
  form.addEventListener('submit', event => {
    form.value = form.text.value;
    form.dispatchEvent(new CustomEvent('input'));
    event.preventDefault();
  });
  return form;
}
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

const notebook = {
  id: "b4b4d8b0cd47e57c@25",
  modules: [m0]
};

export default notebook;
