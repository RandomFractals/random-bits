// URL: https://beta.observablehq.com/@randomfractals/charter-schools-in-los-angeles-county
// Title: Charter schools in Los Angeles County
// Author: Taras Novak (@randomfractals)
// Version: 209
// Runtime version: 1

const m0 = {
  id: "fbd075a745b0a607@209",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Charter schools in Los Angeles County

LeafletJS map with a heatmap and clustered markers example.

<small>Data Sources: California Department of Education, [Los Angeles Times analysis](https://github.com/datadesk/california-k12-notebooks)</small>`
)})
    },
    {
      name: "schools",
      value: (async function()
{
  let response = await fetch('https://cdn.rawgit.com/datadesk/california-k12-notebooks/master/output/charter_schools_in_la_county.geojson');
  let json = await response.json();
  return json
}
)
    },
    {
      name: "map",
      inputs: ["DOM","width","L","schools","heatLayer","markerCluster","fullScreen"],
      value: (function*(DOM,width,L,schools,heatLayer,markerCluster,fullScreen)
{
  // create map container
  let mapContainer = DOM.element('div', { style: `width:${width}px;height:${width/1.6}px` });
  yield mapContainer;
  
  // create leaflet map with attributions
  let map = L.map(mapContainer).setView([34.1, -118.25], 10);
  let osmLayer = L.tileLayer( // 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png')
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>',
    detectRetina: false,
    maxZoom: 18,
    minZoom: 10,
    noWrap: false,
    subdomains: 'abc'
  }).addTo(map);

  // create school points for the heatmap layer
  let schoolPoints = schools.features.map(feature =>
    feature.geometry.coordinates.slice().reverse().concat([0.1])); // intensity
  
  // add heatmap layer
  let schoolsHeatLayer = heatLayer(schoolPoints, {
    minOpacity: 0.5,
    maxZoom: 18,
    max: 1.0,
    radius: 8,
    blur: 5,
    gradient: null
  }).addTo(map);
  
  // add school markers
  let markers = markerCluster({});
  let schoolsLayer = L.geoJson(schools, {
    onEachFeature: function (feature, layer) {
      const school = feature.properties;
      const html = `<div class="popup"><h2>${school.name}</h2>` + 
            `<p>${school.district} District</p><p>grades: ${school.grades_served}</p></div>`
      layer.bindPopup(html);
      layer.bindTooltip(`${school.name}, ${school.grades_served}`, {sticky: true});
    }
  });  
  markers.addLayer(schoolsLayer);
  map.addLayer(markers);
  // map.fitBounds(markers.getBounds());
  
  // add fullscreen toggle
  fullScreen({
    position: 'topright',
    title: 'full screen',
    titleCancel: 'exit full screen',
    forceSeparateButton: true,
  }).addTo(map);
 
  map.on('enterFullscreen', function(){
    console.log('entered fullscreen');
  });  
}
)
    },
    {
      name: "popUpCss",
      inputs: ["html"],
      value: (function(html){return(
html`<style type="text/css">
  div.popup p { margin: 4px 0; }
</style>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Leaflet JS, CSS, and Plugins Imports`
)})
    },
    {
      name: "L",
      inputs: ["require"],
      value: (function(require){return(
require('leaflet@1.2.0')
)})
    },
    {
      name: "leafletCSS",
      inputs: ["html","resolve"],
      value: (function(html,resolve){return(
html`<link href='${resolve('leaflet@1.2.0/dist/leaflet.css')}' rel='stylesheet' />`
)})
    },
    {
      name: "heatLayer",
      inputs: ["L","require"],
      value: (function(L,require){return(
L, require('leaflet.heat').catch(() =>  L.heatLayer)
)})
    },
    {
      name: "markerCluster",
      inputs: ["L","require"],
      value: (function(L,require){return(
L, require('leaflet.markercluster@1.1.0').catch(() => L.markerClusterGroup)
)})
    },
    {
      name: "markerClusterCSS",
      inputs: ["html","resolve"],
      value: (function(html,resolve){return(
html`<link href='${resolve('leaflet.markercluster@1.1.0/dist/MarkerCluster.Default.css')}' rel='stylesheet' />`
)})
    },
    {
      name: "fullScreen",
      inputs: ["L","require"],
      value: (function(L,require){return(
L, require('leaflet.fullscreen@1.4.5').catch(() => L.control.fullscreen)
)})
    },
    {
      name: "fullScreenCSS",
      inputs: ["html","resolve"],
      value: (function(html,resolve){return(
html`<link href='${resolve('leaflet.fullscreen@1.4.5/Control.FullScreen.css')}' rel='stylesheet' />`
)})
    }
  ]
};

const notebook = {
  id: "fbd075a745b0a607@209",
  modules: [m0]
};

export default notebook;
