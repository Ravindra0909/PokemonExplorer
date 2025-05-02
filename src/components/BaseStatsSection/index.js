import React, { Component } from 'react';
import './index.css'
class BaseStatsSection extends Component {
  render() {
    const { stats } = this.props;

    return (
      <div className="stats-section">
        {stats.map((statObj, index) => (
          <div key={index} className="stat-row">
            <span className="stat-name">{statObj.stat.name}</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${statObj.base_stat > 100 ? 100 : statObj.base_stat}%` }}
              ></div>
            </div>
            <span className="stat-value">{statObj.base_stat}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default BaseStatsSection;
