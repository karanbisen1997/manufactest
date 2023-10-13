import { dataSet as data } from "../utils/Constants";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
} from "../utils/Function";
import React from "react";
import './component.css'
import GenerateStatRow from "./GenerateStatRow";

// Function to calculate class-wise mean, median, and mode of "Flavanoids"
const calculateFlavanoidsStats = () => {
  const classWiseFlavanoids = {};
  data.forEach((item) => {
    const className = item.Alcohol;
    const flavanoids = parseFloat(item.Flavanoids);
    if (!isNaN(flavanoids)) {
      if (!classWiseFlavanoids[className]) {
        classWiseFlavanoids[className] = [];
      }
      classWiseFlavanoids[className].push(flavanoids);
    }
  });

  const stats = {};
  for (const className in classWiseFlavanoids) {
    const flavanoidsData = classWiseFlavanoids[className];
    stats[className] = {
      mean: calculateMean(flavanoidsData),
      median: calculateMedian(flavanoidsData),
      mode: calculateMode(flavanoidsData),
    };
  }

  return stats;
};

const flavanoidsStats = calculateFlavanoidsStats();

// React component to display the statistics in a tabular format
const FlavanoidsStatsComponent = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {Object.keys(flavanoidsStats).map((className) => (
            <th>Class {className}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <GenerateStatRow winestat="Flavanoids" property="mean" stats={flavanoidsStats}/>
        <GenerateStatRow winestat="Flavanoids" property="median" stats={flavanoidsStats}/>
        <GenerateStatRow winestat="Flavanoids" property="mode" stats={flavanoidsStats}/>
      </tbody>
    </table>
  );
};

export default FlavanoidsStatsComponent;
