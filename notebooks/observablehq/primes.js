// URL: https://beta.observablehq.com/@randomfractals/primes
// Title: Primes
// Author: Taras Novak (@randomfractals)
// Version: 63
// Runtime version: 1

const m0 = {
  id: "fc0e0d93a22da263@63",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Primes`
)})
    },
    {
      name: "viewof number",
      inputs: ["html"],
      value: (function(html){return(
html`<input type="range">`
)})
    },
    {
      name: "number",
      inputs: ["Generators","viewof number"],
      value: (G, _) => G.input(_)
    },
    {
      name: "tip",
      inputs: ["html"],
      value: (function(html){return(
html`<p style="font-size: 14px;">use <-/-> to iterate...</p>`
)})
    },
    {
      inputs: ["md","number"],
      value: (function(md,number){return(
md`**isPrime(${number}):**`
)})
    },
    {
      inputs: ["isPrime","number"],
      value: (function(isPrime,number){return(
isPrime(number)
)})
    },
    {
      inputs: ["md","number"],
      value: (function(md,number){return(
md`**getPrimes(${number})** // to number:`
)})
    },
    {
      name: "primes",
      inputs: ["getPrimes","number"],
      value: (function(getPrimes,number){return(
getPrimes(number)
)})
    },
    {
      name: "isPrime",
      value: (function(){return(
function isPrime (n) {
  if (n < 2) return false;
  // number is prime if it is not divisible 
  // by any number less than or equal to its square root
  const sqrtN = Math.sqrt(n);
  for (let i = 2; i <= sqrtN; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}
)})
    },
    {
      name: "getPrimes",
      inputs: ["isPrime"],
      value: (function(isPrime){return(
function getPrimes(limit) {
  let primes = [];
  for(let n = 0; n < limit; n++) {
    if( isPrime(n)) {
      primes.push(n);
    }
  }
  return primes;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**sure, you can get fancy w/yield and do this:**

iterate to infinity... :)

https://beta.observablehq.com/@retroverse/prime-numbers`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**Good Primer on Primes**

I found this stellar primer on primes, but it's way over my simpleton JS dev head:

https://beta.observablehq.com/@liuyao12/prime-progression
`

)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`**Visualizing Primes**

As for visualizing primes, I like this black circles ticker the most:

https://beta.observablehq.com/@mbostock/prime-factors
`
)})
    }
  ]
};

const notebook = {
  id: "fc0e0d93a22da263@63",
  modules: [m0]
};

export default notebook;
