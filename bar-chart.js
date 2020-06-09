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
    y: { field: "b", type: "quantitative", title: "Values" },
  },
  title: "Bar Chart",
  width: "container",
  height: 300,
};

vegaEmbed("#bar-chart", barChart);

document.getElementById("btnRandomize").addEventListener("click", (event) => {
  data = data.map((d) => {
    d.b = Math.ceil(Math.random() * 100);
    return d;
  });

  barChart.data.values = data;
  vegaEmbed("#bar-chart", barChart);
});
