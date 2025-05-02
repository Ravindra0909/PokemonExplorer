import React, { Component } from 'react';
import './index.css'

class EvolutionSection extends Component {
  render() {
    const { evolutionData } = this.props;

    return (
      <div className="evolution-section">
        {evolutionData && evolutionData.length > 0 ? (
          <div className="evolution-chain">
            {evolutionData.map((evo, index) => (
              <div key={index} className="evolution-stage">
                <img src={evo.image} alt={evo.name} />
                <p>{evo.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No evolution data available.</p>
        )}
      </div>
    );
  }
}

export default EvolutionSection;
