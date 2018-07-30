import React, { Component } from 'react';
import {TweenLite, CSSPlugin, Ease, TimelineLite} from 'gsap'


import './App.css';

class App extends Component {
  constructor() {
    super()
    // idea is to display only a certain number of components at a time
    // after determining how many components total will need to be displayed
    // will loop through the array

    this.state = {
      cards: [],
      imageIndex: 0,
      imageTotal: 0,
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchCards()
  }

  // fetch data 
  async fetchCards() {
    let res = await fetch('https://api.myjson.com/bins/t38k2')
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
    // set up variables needed

    const { imageIndex: previous } = prevState;
    const { imageIndex } = this.state

    if (previous !== imageIndex) {
      let galleryX, selectedX, resetX;

      if (imageIndex === 0) {
        galleryX = resetX = 0
        selectedX = '+-150'
      } else {
        galleryX = selectedX = '+=100'
        resetX = (110 * previous) - 500
      }

      const currentCards = this.state.cards
      const tl = new TimelineLite( { paused: true })

      tl
        .to(currentCards[imageIndex], 0.5, { minWidth: 150, height: 450 }, 0)
        .to(currentCards, 0.5, { x: galleryX }, 0)
        .to(currentCards[previous], 0.5, { minWidth: 100, height: 125, x: selectedX }, 0)
        .set(currentCards[previous], { x: resetX })
        .play();
    }

    if (this.state.imageIndex !== prevState.imageIndex) {
      console.log(this.state.imageIndex + 'component update to this imageIndex')
    }
  }

  nextImageHandler = () => {
    const {imageIndex } = this.state
    // ensures that we don't pass the array limit
    this.setState({
      imageIndex: (imageIndex < (this.state.cards.length -1) ? (imageIndex +1) : 0)
    })
  }
  render() {
     let imageGallery = this.state.cards.map ( (e,i) => 
      <div key={e.id} data-target={i} ref ={card => this.state.cards} id='kurobataCard'> 
        <img className='card-image' src={e.link} alt={e.description}>
        </img>
      </div>)

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

          {/* { this.state.cards.map( (e,i) => <div key={e.id} data-target={i}
            ref={ card => this.state.cards }
            id='card-el'>
            {i+1} 
            </div>)} */}
            <div className='card-wrap'>
              {imageGallery[this.state.imageIndex+3]}
            </div>
            <div className='card-wrap'>
              {imageGallery[this.state.imageIndex+2]}
            </div>
            <div className='card-wrap'>
              {imageGallery[this.state.imageIndex+1]}
            </div>
            <div className='card-wrap' id='imageIndex'>
              {imageGallery[this.state.imageIndex]}
            </div>

          
        </div>

        <div className='info-wrap'>
        </div>

        <div className='button-wrap'>
          <button className="btn btn-secondary" onClick={this.nextImageHandler}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
