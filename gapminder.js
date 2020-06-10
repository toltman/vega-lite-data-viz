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

/* Create grey ticks for other countries */
const ticksGrey2005 = JSON.parse(JSON.stringify(lifeTicks));
ticksGrey2005.mark = "circle";
ticksGrey2005.transform.push({ filter: "datum.country !== 'United States'" });
ticksGrey2005.transform.push({ filter: "datum.country !== 'China'" });
ticksGrey2005.encoding.color = { value: "rgb(0,0,0, 0.2)" };

/* Combine for second tick figure */
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
  config: { tick: { thickness: 2, bandSize: 10 } },
};

/* Render the charts */
vegaEmbed("#life-ticks", lifeTicks);
vegaEmbed("#life-ticks-2", tickFig2);
vegaEmbed("#life-ticks-3", tickFig3);
