import React, { Component } from 'react';
import Chess from './Chess'
import './Playground.css';

class Playground extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pieces: Chess.getDefaultLineUp()
		}
	}

	handleMovePiece(piece, fromSquare, toSquare) {
    const newPieces = this.state.pieces
      .map((curr, index) => {
        if (piece.index === index) {
          return `${piece.name}@${toSquare}`
        } else if (curr.indexOf(toSquare) === 2) {
          return false // To be removed from the board
        }
        return curr
      })
      .filter(Boolean)

    this.setState({pieces: newPieces})
  }

	render() {
    const {pieces} = this.state
    return (
      <div className="demo">
        <Chess pieces={pieces} onMovePiece={this.handleMovePiece} />
      </div>
    )
  }
}

export default Playground;
