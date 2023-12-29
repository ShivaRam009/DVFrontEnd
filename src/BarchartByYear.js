import React, { useEffect } from "react";
import * as d3 from "d3";

const BarchartByYear = ({ data }) => {
    const yearData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].end_year != "") {
        if (data[i].end_year in yearData) {
          yearData[data[i].end_year] += 1;
        } else {
          yearData[data[i].end_year] = 1;
        }
      }
    }
    const yearArray = Object.entries(yearData);
  
    const margin = { top: 60, right: 30, bottom: 60, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
  
    useEffect(() => {
      const svg = d3.select("#year")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
  
      const chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(yearArray.map((s) => s[0]))
        .padding(0.4);
  
      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(yearArray, (d) => d[1])]);
  
      chart.selectAll(".bar")
        .data(yearArray)
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
    }, [data, height, yearArray, margin.left, margin.top, width]);
  
    return (
      <div>
        <h1>Year</h1>
        <svg id="year"></svg>
      </div>
    );
  }

export default BarchartByYear;