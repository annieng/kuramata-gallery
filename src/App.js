import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    // idea is to display only a certain number of components at a time
    // after determining how many components total will need to be displayed
    // will loop through the array

    this.state = {
      cards: [],
      imageIndex: 1,
      imageTotal: 0,
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchCards()
  }
  // fetch data 
  async fetchCards() {
    let res = await fetch('https://api.myjson.com/bins/vz2ze')
    let data = await res.json()
    console.log(data)
    this.setState({
      cards: data.data,
      isLoading: true,
      imageTotal: data.data.length 
    }),
      this.setState({
        isLoading: false
      })
    console.log(this.state.cards)
    console.log(this.state.imageIndex)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.imageIndex !== prevState.imageIndex) {
      console.log(this.state.imageIndex + 'component update to this imageIndex')
    }
  }
  render() {
    return (
      <div className='wrapper'>
        <div className='index-wrap'>
          <h5 id='index'> {this.state.imageIndex} / {this.state.imageTotal}</h5>
        </div>
        <div className='header-wrap'>
          <div id='title'>
            <h1> SHIRO KURAMATA </h1>
          </div>
        </div>

        <div className='gallery-wrap'>

          { this.state.cards.map( (e,i) => <div key={e.id} data-target={i}
            ref={ card => this.state.cards.push(card) }
            id='card-el'>
            {i+1}
            </div>)}

          
        </div>

        <div className='info-wrap'>
        </div>

        <div className='button-wrap'>
        </div>
      </div>
    );
  }
}

export default App;
