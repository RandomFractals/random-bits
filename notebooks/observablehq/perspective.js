// URL: https://observablehq.com/@randomfractals/perspective
// Title: Perspective
// Author: Taras Novak (@randomfractals)
// Version: 352
// Runtime version: 1

const m0 = {
  id: "056c564660a4ccc1@352",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Perspective

[Perspective](https://github.com/jpmorganchase/perspective) is a streaming data visualization engine for Javascript.

Perspective makes it simple to build real-time user configurable analytics entirely in the browser utilizing 
[Apache Arrow](https://beta.observablehq.com/@randomfractals/apache-arrow) columnar data format and display it
via [Highcharts](https://github.com/highcharts/highcharts) 
and [Hypergrid](https://github.com/fin-hypergrid/core) web assembly plugin modules.

This notebook is based on [Superstore Arrow demo](https://unpkg.com/@jpmorganchase/perspective-examples/build/superstore-arrow.html)
`
)})
    },
    {
      name: "viewer",
      inputs: ["html","width"],
      value: (function(html,width){return(
html `
<div style="height:${width*.6}px">
  <perspective-viewer
    view="treemap"
    row-pivots='["Sub-Category","Region","Segment"]'
    sort='[["Profit","desc"]]'
    columns='["Sales", "Profit"]'>                
  </perspective-viewer>
</div>
`
)})
    },
    {
      name: "viewerLoad",
      inputs: ["loadPerspectiveViewerPlugins","dataUrl","loadData"],
      value: (function(loadPerspectiveViewerPlugins,dataUrl,loadData){return(
window.addEventListener('WebComponentsReady', function() {
  console.log('WebComponentsReady: loading plugins...');
  const hyperGrid = loadPerspectiveViewerPlugins();  
  const viewer = document.getElementsByTagName('perspective-viewer')[0];
  console.log('WebComponentsReady: loading data:', dataUrl);
  loadData(dataUrl).then(buffer => {
    console.log('Loading view data...');
    viewer.load(buffer);
    viewer.toggleConfig();
  });
})
)})
    },
    {
      name: "loadPerspectiveViewerPlugins",
      inputs: ["require"],
      value: (function(require){return(
async function loadPerspectiveViewerPlugins() {
  console.log('loadPerspectiveViewerPlugins: loading plugins...');
  const hyperGrid = await require('@finos/perspective-viewer-hypergrid@0.3.0-rc.1/build/hypergrid.plugin.js');
  const highCharts = await require('@finos/perspective-viewer-highcharts@0.3.0-rc.1/build/highcharts.plugin.js');
  return hyperGrid;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Styles`
)})
    },
    {
      name: "viewerStyle",
      inputs: ["html"],
      value: (function(html){return(
html`
<link rel='stylesheet' href="https://unpkg.com/@finos/perspective-viewer@0.3.0-rc.1/build/material.css" is="custom-style" />
<style>
perspective-viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
`
)})
    },
    {
      name: "sampleData",
      inputs: ["md"],
      value: (function(md){return(
md `## Superstore Arrow Data`
)})
    },
    {
      name: "dataUrl",
      value: (function(){return(
'https://raw.githubusercontent.com/jpmorganchase/perspective/master/examples/simple/superstore.arrow'
)})
    },
    {
      name: "dataTable",
      inputs: ["loadData","dataUrl","arrow"],
      value: (function(loadData,dataUrl,arrow){return(
loadData(dataUrl).then(buffer => arrow.Table.from(new Uint8Array(buffer)))
)})
    },
    {
      name: "fields",
      inputs: ["dataTable"],
      value: (function(dataTable){return(
dataTable.schema.fields.map(f => f.name)
)})
    },
    {
      name: "every2KRecord",
      inputs: ["range","dataTable"],
      value: (function(range,dataTable){return(
range(dataTable, 0, dataTable.count(), 2000)
)})
    },
    {
      name: "dataSample",
      inputs: ["md","getMarkdown","every2KRecord","fields"],
      value: (function(md,getMarkdown,every2KRecord,fields){return(
md`${getMarkdown(every2KRecord, fields, ['Order Date', 'Ship Date'])}`
)})
    },
    {
      name: "arrow",
      inputs: ["require"],
      value: (function(require){return(
require('apache-arrow@0.3.1')
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "loadData",
      remote: "loadData"
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "range",
      remote: "range"
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "getMarkdown",
      remote: "getMarkdown"
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "toDate",
      remote: "toDate"
    },
    {
      name: "perspective",
      inputs: ["require"],
      value: (function(require){return(
require('@finos/perspective@0.3.0-rc.1/build/perspective.js')
)})
    },
    {
      name: "perspectiveViewer",
      inputs: ["require"],
      value: (function(require){return(
require('@finos/perspective-viewer@0.3.0-rc.1/build/perspective.view.js')
)})
    }
  ]
};

const m1 = {
  id: "@randomfractals/apache-arrow",
  variables: [
    {
      name: "loadData",
      value: (function(){return(
async function loadData(dataUrl){
  const response = await fetch(dataUrl);
  return await response.arrayBuffer();
}
)})
    },
    {
      name: "range",
      value: (function(){return(
function range(data, start, end, step) {
  const slice = [];
  const rowCount = data.count();
  for (let i=start; i<end && i <rowCount; i+= step) {
    slice.push(data.get(i).toArray());
  }
  return slice;  
}
)})
    },
    {
      name: "getMarkdown",
      inputs: ["toDate"],
      value: (function(toDate){return(
function getMarkdown (dataFrame, fields, dateFields = []) {
  let markdown = `${fields.join(' | ')}\n --- | --- | ---`; // header row
  let i=0;
  for (let row of dataFrame) {
    markdown += '\n ';
    let td = '';
    let k = 0;
    for (let cell of row) {
      if ( Array.isArray(cell) ) {
        td = '[' + cell.map((value) => value == null ? 'null' : value).join(', ') + ']';
      } else if (fields[k] === 'Date' || dateFields.indexOf(fields[k]) >= 0)  { 
        td = toDate(cell).toLocaleString(); // convert Apache arrow Timestamp to Date and format
      } else {
        td = cell.toString();
      }
      markdown += ` ${td} |`;
      k++;
    }
  }
  return markdown;
}
)})
    },
    {
      name: "toDate",
      value: (function(){return(
function toDate(timestamp) {
  // Appache Arrow Timestamp is a 64-bit int of milliseconds since the epoch,
  // represented as two 32-bit ints in JS to preserve precision.
  // The fist number is the "low" int and the second number is the "high" int.
  return new Date((timestamp[1] * Math.pow(2, 32) + timestamp[0])/1000);
}
)})
    }
  ]
};

const notebook = {
  id: "056c564660a4ccc1@352",
  modules: [m0,m1]
};

export default notebook;
