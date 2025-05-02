import React, { Component } from 'react';

class AboutSection extends Component {
  render() {
    const { height, weight, abilities, imageUrl } = this.props;

    return (
      <div className="about-section">
        <img src={imageUrl} alt="pokemon" className="about-image" />
        <div className="about-info">
          <p><strong>Height:</strong> {height} m</p>
          <p><strong>Weight:</strong> {weight} kg</p>
          <p><strong>Abilities:</strong> {abilities.join(', ')}</p>
        </div>
      </div>
    );
  }
}

export default AboutSection;
