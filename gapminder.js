const lifeTicks = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "Distribution of life expectacy in 2005",
  data: { url: "https://vega.github.io/vega-datasets/data/gapminder.json" },
  transform: [
    { filter: "datum.year === 2005" },
    {
      calculate: "round(datum.life_expect * 100) / 100",
      as: "life expectancy",
    },
  ],
  mark: "tick",
  encoding: {
    x: { field: "life_expect", type: "quantitative", title: "Life Expectancy" },
    tooltip: [
      { field: "country", type: "nominal" },
      { field: "life expectancy", type: "quantitative" },
    ],
  },
  width: "460",
};

/* Create US and China highlights */
const ticksHightlight2005 = JSON.parse(JSON.stringify(lifeTicks));

ticksHightlight2005.mark = { type: "circle", opacity: 1, size: 60 };
ticksHightlight2005.transform.push({
  filter: { field: "country", oneOf: ["United States", "China"] },
});
ticksHightlight2005.encoding.color = {
  field: "country",
  type: "nominal",
  legend: { title: null },
};

/* Create grey circles for other countries */
const ticksGrey2005 = JSON.parse(JSON.stringify(lifeTicks));
ticksGrey2005.mark = "circle";
ticksGrey2005.transform.push({ filter: "datum.country !== 'United States'" });
ticksGrey2005.transform.push({ filter: "datum.country !== 'China'" });
ticksGrey2005.encoding.color = { value: "rgb(0,0,0, 0.2)" };

/* Combine for second figure */
const tickFig2 = {
  layer: [ticksGrey2005, ticksHightlight2005],
  config: { tick: { thickness: 2, bandSize: 10 } },
};

/* Create Y encoding for US and China */
const ticksHighlightTime = JSON.parse(JSON.stringify(ticksHightlight2005));
const ticksGreyTime = JSON.parse(JSON.stringify(ticksGrey2005));

ticksHighlightTime.transform = [
  { filter: "datum.year === 2005 || datum.year === 1955" },
  { filter: "datum.country === 'United States' || datum.country === 'China'" },
  {
    calculate: "round(datum.life_expect * 100) / 100",
    as: "life expectancy",
  },
];

ticksGreyTime.transform = [
  { filter: "datum.year === 2005 || datum.year === 1955" },
  { filter: "datum.country !== 'United States' && datum.country !== 'China'" },
  {
    calculate: "round(datum.life_expect * 100) / 100",
    as: "life expectancy",
  },
];

const timeEncoding = { field: "year", type: "ordinal", title: null };
ticksHighlightTime.encoding.y = timeEncoding;
ticksGreyTime.encoding.y = timeEncoding;

const tickFig3 = {
  layer: [ticksGreyTime, ticksHighlightTime],
};

/* Figure 4. Life expectancy over time */

const othersFig4 = {
  transform: [
    {
      filter: "datum.country !== 'United States' && datum.country !== 'China'",
    },
  ],
  mark: {
    type: "line",
    opacity: "0.15",
    color: "grey",
    interpolate: "monotone",
  },
  encoding: {
    x: {
      field: "year",
      type: "ordinal",
      title: "Year",
      axis: { labelAngle: 0 },
    },
    y: { field: "life_expect", type: "quantitative", title: "Life Expectancy" },
    detail: { field: "country", type: "nominal" },
  },
};

const higlightLineFig4 = {
  transform: [
    {
      filter: "datum.country === 'United States' || datum.country === 'China'",
    },
  ],
  mark: { type: "line", opacity: "1", strokeWidth: 3, interpolate: "monotone" },
  encoding: {
    x: {
      field: "year",
      type: "ordinal",
      title: "Year",
    },
    y: { field: "life_expect", type: "quantitative", title: "Life Expectancy" },
    color: {
      field: "country",
      type: "nominal",
      legend: { title: null },
      sort: ["United States", "China"],
    },
    tooltip: [
      { field: "country", type: "nominal" },
      { field: "life expectancy", type: "quantitative" },
    ],
  },
};

const highlightCircleFig4 = JSON.parse(JSON.stringify(higlightLineFig4));
highlightCircleFig4.mark.type = "circle";

const fig4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "Life expectancy over time",
  data: { url: "https://vega.github.io/vega-datasets/data/gapminder.json" },
  transform: [
    { filter: "datum.year === 1955 || datum.year === 2005" },
    {
      calculate: "round(datum.life_expect * 100) / 100",
      as: "life expectancy",
    },
  ],
  layer: [othersFig4, higlightLineFig4, highlightCircleFig4],
  width: 200,
  height: 300,
};

/* Figure 5 - Time */
const hightlightCircleFig5 = JSON.parse(JSON.stringify(highlightCircleFig4));
hightlightCircleFig5.transform.push({
  filter: "datum.year === 1955 || datum.year === 2005",
});
hightlightCircleFig5.mark.size = 60;
const fig5 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "Life expectancy over time",
  data: { url: "https://vega.github.io/vega-datasets/data/gapminder.json" },
  transform: [
    {
      calculate: "round(datum.life_expect * 100) / 100",
      as: "life expectancy",
    },
  ],
  layer: [othersFig4, higlightLineFig4, hightlightCircleFig5],
  width: 460,
  height: 300,
};

/* Figure 6 - Classic Gapminder Visualization */
const fig6 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "Life expectancy over time",
  data: { url: "https://vega.github.io/vega-datasets/data/gapminder.json" },
  transform: [{ filter: "datum.year === 1955" }],
  mark: { type: "point", filled: true, opacity: 0.5 },
  encoding: {
    x: {
      field: "fertility",
      type: "quantitative",
      title: "Fertility Rate",
      axis: { tickCount: 10 },
      scale: { domain: [0, 9] },
    },
    y: {
      field: "life_expect",
      type: "quantitative",
      title: "Life Expectancy",
      scale: { domain: [0, 90] },
    },
    color: {
      field: "cluster",
      type: "nominal",
      title: "Region",
      legend: { orient: "bottom", titleOrient: "left" },
    },
    size: {
      field: "pop",
      type: "quantitative",
      title: "Population",
      scale: {
        range: [0, 2000],
        domain: [0, 1200000000],
      },
    },
    tooltip: [
      { field: "country", type: "nominal" },
      { field: "fertility", type: "nominal" },
      { field: "life_expect", type: "nominal" },
    ],
    order: { field: "pop", type: "quantitative", sort: "descending" },
  },
  title: "Fertility and Life Expectancy",
  width: 460,
  height: 300,
};

/* Render the charts */
vegaEmbed("#life-ticks", lifeTicks);
vegaEmbed("#life-ticks-2", tickFig2);
vegaEmbed("#life-ticks-3", tickFig3);
vegaEmbed("#fig4", fig4);
vegaEmbed("#fig5", fig5);
vegaEmbed("#fig6", fig6);

document.getElementById("slideYear").addEventListener("input", (event) => {
  document.getElementById("slideOutput").innerHTML = event.target.value;
  const filter = `datum.year === ${event.target.value}`;
  fig6.transform = [{ filter }];
  vegaEmbed("#fig6", fig6);
});
