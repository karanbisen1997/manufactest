import React from 'react'

const GenerateStatRow = ({winestat, property, stats}) => {
    return (
      <tr>
        <td>
          {winestat} {property}
        </td>
        {Object.keys(stats).map((className,index) => (
          <td key={index}>
            {property === "mode"
              ? stats[className][property].join(", ")
              : stats[className][property]}
          </td>
        ))}
      </tr>
    );
  };

export default GenerateStatRow;
