import React, { useEffect } from "react";
import * as d3 from "d3";

const BarchartByCountry = ({ data }) => {
  const countryData = {};
  for (let i = 0; i < data.length; i++) {
    if (data[i].country !== "") {
      if (data[i].country in countryData) {
        countryData[data[i].country] += 1;
      } else {
        countryData[data[i].country] = 1;
      }
    }
  }
  const countryArray = Object.entries(countryData);

  const margin = { top: 60, right: 30, bottom: 120, left: 60 }; // Increased bottom margin
  const width = 1500 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select("#country")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(countryArray.map((s) => s[0]))
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(countryArray, (d) => d[1])]);

    chart.selectAll(".bar")
      .data(countryArray)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d[1]));

    chart.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    chart.append("g")
      .call(d3.axisLeft(yScale));
  }, [data, height, countryArray, margin.left, margin.top, width]);

  return (
    <div>
      <h1>Country</h1>
      <svg id="country"></svg>
    </div>
  );
}

export default BarchartByCountry;
