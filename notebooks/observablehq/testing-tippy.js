// URL: https://beta.observablehq.com/@randomfractals/testing-tippy
// Title: Testing Tippy
// Author: Taras Novak (@randomfractals)
// Version: 69
// Runtime version: 1

const m0 = {
  id: "9028e29ba58524fe@69",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Testing Tippy`
)})
    },
    {
      inputs: ["svg"],
      value: (function(svg){return(
svg.node()
)})
    },
    {
      name: "svg",
      inputs: ["d3","DOM"],
      value: (function(d3,DOM)
{
  const r = 50, m = 2, size = 2 * (r + 2*m);
  const svg = d3.select(DOM.svg(size, size));
  svg.append('circle')
    .attr('r', r)
    .attr('cx', r + m)
    .attr('cy', r + m)
    .style('stroke', 'black')
    .style('stroke-width', `${m}px`) // m = margin
    .style('fill', 'red')
    .append('title')
      .text('This is our circle :)');
  return svg;
}
)
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3")
)})
    }
  ]
};

const notebook = {
  id: "9028e29ba58524fe@69",
  modules: [m0]
};

export default notebook;
