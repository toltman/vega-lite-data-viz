var data = [
  { a: "A", b: 28 },
  { a: "B", b: 55 },
  { a: "C", b: 43 },
  { a: "D", b: 91 },
  { a: "E", b: 81 },
  { a: "F", b: 53 },
  { a: "G", b: 19 },
  { a: "H", b: 87 },
  { a: "I", b: 52 },
];

var barChart = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "A simple bar chart with embedded data.",
  data: { values: data },
  mark: "bar",
  encoding: {
    x: {
      field: "a",
      type: "ordinal",
      axis: { labelAngle: 0 },
      title: "Letters",
    },
    y: {
      field: "b",
      type: "quantitative",
      title: "Values",
      scale: {
        domain: [0, 100],
      },
    },
  },
  title: "Bar Chart",
  height: 250,
  width: "container",
};

vegaEmbed("#bar-chart", barChart);

document.querySelector(".chartButtons").addEventListener("click", (e) => {
  if (e.target.id === "btnUniform") {
    data = data.map((d) => {
      d.b = generateUniform();
      return d;
    });
  }
  if (e.target.id === "btnNormal") {
    data = data.map((d) => {
      d.b = generateNormal();
      return d;
    });
  }

  barChart.data.values = data;
  vegaEmbed("#bar-chart", barChart);
});

function generateUniform() {
  return Math.ceil(Math.random() * 100);
}

function generateNormal() {
  var sample = new Array(5);
  for (let i = 0; i < sample.length; i++) {
    sample[i] = Math.random();
  }
  const mean = (sample.reduce((a, b) => a + b) / sample.length) * 100;
  return mean;
}
