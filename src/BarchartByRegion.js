import React, { useEffect } from "react";
import * as d3 from "d3";

const BarchartByRegion = ({ data }) => {
  const regionData = {};
  
  data.forEach((item) => {
    const region = item.region;
    if (region !== "") {
      if (region in regionData) {
        regionData[region] += 1;
      } else {
        regionData[region] = 1;
      }
    }
  });
  
  const regionArray = Object.entries(regionData);
  
  const margin = { top: 60, right: 30, bottom: 120, left: 60 }; // Increased bottom margin
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  
  useEffect(() => {
    const svg = d3.select("#region")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(regionArray.map((d) => d[0]))
      .padding(0.4);
  
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(regionArray, (d) => d[1])]);
  
    chart.selectAll(".bar")
      .data(regionArray)
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
  }, [data, height, regionArray, margin.left, margin.top, width]);
  
  return (
    <div>
      <h1>Region</h1>
      <svg id="region"></svg>
    </div>
  );
};

export default BarchartByRegion;
