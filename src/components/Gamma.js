import React from "react";
import { dataSet as data } from "../utils/Constants";
import {
  calculateMean,
  calculateMedian,
  calculateMode
} from "../utils/Function";
import GenerateStatRow from "./GenerateStatRow";

// Function to calculate "Gamma" property for each data point and class-wise mean, median, and mode of "Gamma"
const calculateGammaStats = () => {
  data.forEach((item) => {
    const ash = parseFloat(item.Ash);
    const hue = parseFloat(item.Hue);
    const magnesium = parseFloat(item.Magnesium);

    if (!isNaN(ash) && !isNaN(hue) && !isNaN(magnesium)) {
      item.Gamma = (ash * hue) / magnesium;
    }
  });

  const classWiseGamma = {};
  data.forEach((item) => {
    const className = item.Alcohol;
    const gamma = item.Gamma;
    if (!isNaN(gamma)) {
      if (!classWiseGamma[className]) {
        classWiseGamma[className] = [];
      }
      classWiseGamma[className].push(gamma);
    }
  });

  const stats = {};
  for (const className in classWiseGamma) {
    const gammaData = classWiseGamma[className];
    stats[className] = {
      mean: calculateMean(gammaData),
      median: calculateMedian(gammaData),
      mode: calculateMode(gammaData),
    };
  }

  return stats;
};

const gammaStats = calculateGammaStats();

// React component to display the statistics in a tabular format
const GammaStatsComponent = () => {
    return (
        <table>
          <thead>
            <tr>
              <th>Measure</th>
              {Object.keys(gammaStats).map((className) => (
                <th>Class {className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          <GenerateStatRow winestat="Gamma" property="mean" stats={gammaStats}/>
        <GenerateStatRow winestat="Gamma" property="median" stats={gammaStats}/>
        <GenerateStatRow winestat="Gamma" property="mode" stats={gammaStats}/>
          
          </tbody>
        </table>
      );
};

export default GammaStatsComponent;
