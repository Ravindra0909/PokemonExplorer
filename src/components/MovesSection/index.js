import React, { Component } from 'react';

class MovesSection extends Component {
  render() {
    const { moves } = this.props;
    const first20Moves = moves.slice(0, 20); 

    return (
      <div className="moves-section">
        <ul className="moves-list">
          {first20Moves.map((moveObj, index) => (
            <li key={index} className="move-item">
              <div className='move'>
                
              {moveObj.move.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MovesSection;
