import React, { useEffect } from "react";
import * as d3 from "d3";

const BarchartByTopic = ({ data }) => {
    const topicData = {};
  
    // Filter out empty topic values and count occurrences
    data.forEach((item) => {
      const topic = item.topic;
      if (topic !== "") {
        if (topic in topicData) {
          topicData[topic] += 1;
        } else {
          topicData[topic] = 1;
        }
      }
    });
  
    // Convert object to array
    const topicArray = Object.entries(topicData);
  
    const margin = { top: 60, right: 30, bottom: 60, left: 60 };
    const width = 1500 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
  
    useEffect(() => {
      const svg = d3.select("#topic")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
  
      const chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(topicArray.map((s, index) => index + 1)) // Assuming topics are unique, use index + 1 as the x-axis values
        .padding(0.4);
  
      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(topicArray, (d) => d[1])]);
  
      // Create bars
      chart.selectAll(".bar")
        .data(topicArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d, index) => xScale(index + 1))
        .attr("y", (d) => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d[1]));
  
      // Add x-axis with numeric labels
      chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))); // Use d3.format("d") to format as integers
  
      // Add y-axis
      chart.append("g")
        .call(d3.axisLeft(yScale));
    }, [data, height, topicArray, margin.left, margin.top, width]);
  
    return (
      <div>
        <h1>Topic</h1>
        <svg id="topic"></svg>
      </div>
    );
  };

export default BarchartByTopic;