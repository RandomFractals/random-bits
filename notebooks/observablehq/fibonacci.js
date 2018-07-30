// URL: https://beta.observablehq.com/@randomfractals/fibonacci
// Title: Fibonacci
// Author: Taras Novak (@randomfractals)
// Version: 243
// Runtime version: 1

const m0 = {
  id: "b3ab1904388b2974@243",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Fibonacci`
)})
    },
    {
      name: "intro",
      inputs: ["html"],
      value: (function(html){return(
html`
<p>
In the Fibonacci numbers sequence every number after the first two is the sum of the two preceding numbers:
</p>
<p>
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 80, 144, ...
</p>
`
)})
    },
    {
      name: "formula",
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`${tex`F_{n} = F_{n-1} + F_{n-2}`}

with seed values:

${tex`F_0 = 0, F_1 = 1`}`
)})
    },
    {
      name: "wiki",
      inputs: ["md"],
      value: (function(md){return(
md`You can read more about Fibonacci numbers here:

https://en.wikipedia.org/wiki/Fibonacci_number`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`<h2>Generate Fiboncacci Numbers</h2>`
)})
    },
    {
      name: "viewof iterations",
      inputs: ["html"],
      value: (function(html){return(
html`<input type="range" min="2" value="9">`
)})
    },
    {
      name: "iterations",
      inputs: ["Generators","viewof iterations"],
      value: (G, _) => G.input(_)
    },
    {
      name: "fibs",
      value: (function(){return(
function fibs(count) {
  let f = [0, 1];
  for (let i=2; i < count; i++) {
    f[i] = f[i-1] + f[i-2];
  }
  return f;
}
)})
    },
    {
      inputs: ["md","iterations"],
      value: (function(md,iterations){return(
md`fibs(${iterations}):`
)})
    },
    {
      name: "numbers",
      inputs: ["fibs","iterations"],
      value: (function(fibs,iterations){return(
fibs(iterations)
)})
    },
    {
      name: "stroke",
      value: (function(){return(
"steelblue"
)})
    },
    {
      name: "height",
      value: (function(){return(
360
)})
    },
    {
      name: "steps",
      inputs: ["DOM","width","height","iterations","numbers","stroke"],
      value: (function(DOM,width,height,iterations,numbers,stroke)
{
  const context = DOM.context2d(width, height);
  const marginY = 2;
  context.beginPath();
  context.moveTo(0, height-marginY);
  const stepX = width / iterations;
  const stepY = height / numbers[iterations-1];
  for (let i = 1; i < iterations; ++i) {
    context.lineTo(i * stepX, height - numbers[i-1] * stepY - marginY);
    context.lineTo(i * stepX, height - numbers[i] * stepY - marginY);
  }
  context.lineJoin = context.lineCap = "round";
  context.strokeStyle = stroke;
  context.stroke();
  return context.canvas;
}
)
    },
    {
      name: "fibsAstro",
      inputs: ["html"],
      value: (function(html){return(
html`<h2>Fibonacci Numbers on Astronomical Scale</h2>
<p>
To put it in perspective here is a fun math problem:
</p>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**How many Fibonacci Numbers would it take to get us to the Moon?**`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/225px-FullMoon2010.jpg" 
  alt="~1au" width="240" height="240" />
<p>
If SpaceX developed Fibonacci numbers propulsion engine, how many Fib jumps would it take to reach the Moon?
</p>
<p>
At its closest point, known as perigee, the Moon is only <i>363,104 km (225,622 miles)</i> away.
At its most distant point, apogee, the Moon is <i>406,696 km (252,088 miles)</i> away from the Earth.
</p>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**Answer (in km):**`
)})
    },
    {
      name: "fibsToMoon",
      inputs: ["fibsToNumber"],
      value: (function(fibsToNumber){return(
fibsToNumber(363104)
)})
    },
    {
      name: "fibsToNumber",
      value: (function(){return(
function fibsToNumber(limit) {
  let f = [0, 1];
  let last = 1;
  let i = 0;
  while (last < limit) {
    last = f[i+2] = f[i] + f[++i];
  }
  return f;
}
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`
<img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Astronomical_unit.png" 
  alt="~1au" width="240" height="240" />
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**to Mars? Range: 54.6 - 225 million km**`
)})
    },
    {
      name: "fibsToMars",
      inputs: ["fibsToNumber"],
      value: (function(fibsToNumber){return(
fibsToNumber(54.6 * 1000000)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**to Venus? ~ 108 million km**`
)})
    },
    {
      name: "fibsToVenus",
      inputs: ["fibsToNumber"],
      value: (function(fibsToNumber){return(
fibsToNumber(108 * 1000000)
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Kuiper_belt_plot_objects_of_outer_solar_system.png/450px-Kuiper_belt_plot_objects_of_outer_solar_system.png" 
  alt="Kuiper belt" width="240" height="240" />
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**to [Kuiper belt](https://en.wikipedia.org/wiki/Kuiper_belt)?** 

Kuiper belt range: **30 - 50 AU** (astronomical units) from the Sun

**1 AU = 150 million km**, avg distance from the Sun to Earth`
)})
    },
    {
      name: "fibsToKuiperBelt",
      inputs: ["fibsToNumber"],
      value: (function(fibsToNumber){return(
fibsToNumber(30 * 150 * 1000000)
)})
    },
    {
      name: "fibsNotebooks",
      inputs: ["html"],
      value: (function(html){return(
html`<h2>Other Fibonacci Numbers Notebooks</h2>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Fibonacci generators: https://beta.observablehq.com/@anglee/fibonacci-generator

Golden ratio: https://beta.observablehq.com/@aaizemberg/golden-ratio`
)})
    }
  ]
};

const notebook = {
  id: "b3ab1904388b2974@243",
  modules: [m0]
};

export default notebook;
