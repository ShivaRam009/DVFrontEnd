import React from 'react';
import * as d3 from 'd3';
import { useEffect } from 'react';

const BarchartIntensity = ({ data }) => {
  const intensityData = {};

  data.forEach((item) => {
    if (item.end_year in intensityData) {
      intensityData[item.end_year] += item.intensity;
    } else {
      intensityData[item.end_year] = item.intensity;
    }
  });

  delete intensityData[""];
  const intensityArray = Object.entries(intensityData);

  const margin = { top: 60, right: 30, bottom: 60, left: 60 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select("#intensity");

    // Remove any existing elements before drawing new ones
    svg.selectAll("*").remove();

    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Handle single data point in xScale
    const xDomain = intensityArray.length === 1 ? [intensityArray[0][0], intensityArray[0][0]] : intensityArray.map((s) => s[0]);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(xDomain)
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(intensityArray, (d) => d[1])]);

    chart.selectAll(".bar")
      .data(intensityArray)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d[1]));

    chart.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append("g")
      .call(d3.axisLeft(yScale));
  }, [data, height, intensityArray, margin.left, margin.top, width]);

  return (
    <div>
      <h1>Intensity</h1>
      <svg id="intensity"></svg>
    </div>
  );
};

export default BarchartIntensity;
