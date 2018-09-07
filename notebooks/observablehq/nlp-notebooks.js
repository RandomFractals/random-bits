// URL: https://beta.observablehq.com/@randomfractals/nlp-notebooks
// Title: NLP Notebooks
// Author: Taras Novak (@randomfractals)
// Version: 13
// Runtime version: 1

const m0 = {
  id: "dc45f3febaf85857@13",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# NLP Notebooks

NLP Notebooks for text analysis with http://compromise.cool NLP library
`
)})
    },
    {
      name: "nlp",
      inputs: ["html"],
      value: (function(html){return(
html `<a href="https://beta.observablehq.com/search?query=NLP">
  <img src="https://raw.githubusercontent.com/RandomFractals/random-bits/master/notebooks/observablehq/nlp-notebooks-2.png" alt="Search NLP" />
</a>
`
)})
    },
    {
      name: "nlpNotebooks",
      inputs: ["md","getLinksMarkdown","searchByTitle","notebooks"],
      value: (function(md,getLinksMarkdown,searchByTitle,notebooks){return(
md `${getLinksMarkdown(searchByTitle(notebooks, 'nlp'))}`
)})
    },
    {
      from: "@randomfractals/notebooks",
      name: "notebooks",
      remote: "notebooks"
    },
    {
      from: "@randomfractals/notebooks",
      name: "searchByTitle",
      remote: "searchByTitle"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getLinksMarkdown",
      remote: "getLinksMarkdown"
    }
  ]
};

const m1 = {
  id: "@randomfractals/notebooks",
  variables: [
    {
      name: "notebooks",
      inputs: ["MAX_DOCS","apiUrl","userName"],
      value: (async function*(MAX_DOCS,apiUrl,userName)
{
  const documents = [];
  let lastDocumentTimestamp = "4096-01-01T00:45:25.493Z"; // infinite future
  let documentsCount = 0;
  do {
    const notebooksDataUrl = `${apiUrl}/documents/@${userName}?before=${lastDocumentTimestamp}`;
    documentsCount = (await fetch(notebooksDataUrl).then(d => d.json()))
      .map(d => {
        documents.push(d);
        lastDocumentTimestamp = d.update_time;
      }).length;
    yield documents.slice(0, MAX_DOCS);
  } while (documentsCount && documents.length < MAX_DOCS)
}
)
    },
    {
      name: "searchByTitle",
      value: (function(){return(
function searchByTitle(notebooks, title) {
  const matchingNotebooks = [];
  notebooks.map(notebook => {
    if( notebook.title.toLowerCase().indexOf(title) >= 0) {
      matchingNotebooks.push(notebook); 
    }
  });
  return matchingNotebooks;
}
)})
    },
    {
      name: "getLinksMarkdown",
      inputs: ["userName"],
      value: (function(userName){return(
function getLinksMarkdown(notebooks) {
  return notebooks.map(notebook => `[${notebook.title}](https://beta.observablehq.com/@${userName}/${notebook.slug})<br /><br />`)
    .reduce((html, link) => html + link);
}
)})
    },
    {
      name: "MAX_DOCS",
      value: (function(){return(
360
)})
    },
    {
      name: "apiUrl",
      value: (function(){return(
'https://cors-anywhere.herokuapp.com/https://api.observablehq.com'
)})
    },
    {
      name: "viewof userName",
      inputs: ["md","userNameParam"],
      value: (function(md,userNameParam){return(
md `<input value="${userNameParam ? userNameParam : 'randomfractals'}">`
)})
    },
    {
      name: "userName",
      inputs: ["Generators","viewof userName"],
      value: (G, _) => G.input(_)
    },
    {
      name: "userNameParam",
      inputs: ["URLSearchParams","html"],
      value: (function(URLSearchParams,html){return(
new URLSearchParams(html`<a href>`.search).get('userName')
)})
    }
  ]
};

const notebook = {
  id: "dc45f3febaf85857@13",
  modules: [m0,m1]
};

export default notebook;
