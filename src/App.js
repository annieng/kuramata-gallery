import React, { Component } from 'react';
import {TweenLite, CSSPlugin, Ease, TimelineLite} from 'gsap'


import './App2.css';


const cardsArray = [
    {
      "id": 1,
      "name": "alchetron",
      "description": "Sofa with Arms | PC/17 by Shiro Kuramata for Cappellini 1982",
      "link": "./images/alchetron.jpg"
    },
    {
      "id": 2,
      "name": "apple honey chair",
      "description": "Chromium-plated tubular metal, painted metal, leather | Shiro Kuramata 1986",
      "link": "./images/apple-honey.jpg"
    },
    {
      "id": 3,
      "name": "glass dining table ",
      "description": "Glass and steel | Shiro Kuramata for Tamotsu Yagi 1987",
      "link": "./images/broken-glass.jpg"
    },
    {
      "id": 4,
      "name": "flower vase #3 ",
      "description": "Acrylic Flower Vase | Shiro Kuramata 1989",
      "link": "./images/flower-vase1.jpg"
    },
    {
      "id": 5,
      "name": "glass chair ",
      "description": "Shiro Kuramata 1976",
      "link": "./images/glass-chair.jpeg"
    },
    {
      "id": 6,
      "name": "cabinet de curiosité ",
      "description": "Acrylic Edition of 40 | Shiro Kuramata 1989",
      "link": "./images/hiroshi-collab.jpg"
    },
    {
      "id": 7,
      "name": "hal 3 ",
      "description": "A High Chair of Steel Meshwork | Shiro Kuramata 1987",
      "link": "./images/stool.jpg"
    }
]

class App extends Component {

  constructor() {
    super()

    this.state= {
      cards: [],
      selected: 0,
      imageTotal: 0,
    }
  }
    componentDidMount(){
      // set the initial card size
      TweenLite.set(this.state.cards[this.state.selected], {
        minWidth: 200, height: 1000
      });
    }

    componentDidUpdate(prevProps, prevState){

      const { selected: preSel } = prevState;
      const { selected } = this.state;
      if (preSel !== selected) {
        let groupX, currentX, resetX;
        // catching edge case to restart loop and reset positions for all
        if (selected === 0) {
          groupX = resetX = 0;
          currentX = "+=200";
        } else {
          groupX = currentX = "+=150"; 
          // take off screen 
          resetX = (300 * preSel) - 2000
        }
        const _cards = this.state.cards;
        const tl = new TimelineLite({ paused: true });
        tl
          .to(_cards[selected], 0.5, { minWidth: 220, height: 750 }, 0)
          .to(_cards, 0.5, { x: groupX }, 0)
          .to(_cards[preSel], 0.5, { minWidth: 100, height: 300, x: currentX }, 0)
          .set(_cards[preSel], { x: resetX })
          .play();
      }
    }

    nextClickHandler = () => {
      const { selected } = this.state;
      this.setState({
        selected: (selected < (cardsArray.length - 1)) ? (selected + 1) : 0
      });
    }

    onClickImageHandler = () => {
      const { selected } = this.state;
      console.log(selected)
      this.setState({
        selected: selected
      })
    }

    render(){
      console.log(this.state.cards);
      return <div className="wrapper d-flex flex-row">

        {/* cards */}
        <div className="cards-wrap">
          <div className='header-wrap'>
            <h1 id='title'> kuromata shiro</h1>
          </div>
          <div className="card-indicator">
            {`${this.state.selected + 1} / ${cardsArray.length}`}
          </div>

          {cardsArray.map((e, i) => <div key={e.id} data-target={i}
            ref={card => this.state.cards.push(card)}
            className="card-el"
          >
            <img key={e.id}
            data-target={i} 
            ref={card => this.state.cards} 
            className='card-img'
            onClick={this.onClickImageHandler} 
            src={e.link} 
            alt={e.description}>
        </img>
          </div>)}
        </div>

        {/* info */}
        <div className="card-info">

          <div className="card-info-data">
          {console.log(this.state.cards)}
          {console.log(this.state.selected)}
          {console.log(cardsArray)}
            <h1 id='item-name'> {cardsArray[this.state.selected].name} </h1> 
            <h5 id='item-description'> {cardsArray[this.state.selected].description}</h5>
          </div>
      
          <div className="card-info-nav">
            <button className="btn btn-secondary" onClick={this.nextClickHandler}> > </button>
          </div>

        </div>

      </div>;
    }
  
  }


export default App

// class App extends Component {
//   constructor() {
//     super()
//     // idea is to display only a certain number of components at a time
//     // after determining how many components total will need to be displayed
//     // will loop through the array

//     this.state = {
//       cards: [],
//       imageIndex: 0,
//       imageTotal: 0,
//       isLoading: true,
//     }
//   }

//   componentDidMount() {
//     this.fetchCards()
//   }

//   // fetch data 
//   async fetchCards() {
//     let res = await fetch('https://api.myjson.com/bins/t38k2')
//     let data = await res.json()
//     console.log(data)
//     this.setState({
//       cards: data.data,
//       isLoading: true,
//       imageTotal: data.data.length 
//     }),
//       this.setState({
//         isLoading: false
//       })
//     console.log(this.state.cards)
//     console.log(this.state.imageIndex)
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // set up variables needed
//     TweenLite.set( this.state.cards[this.state.imageIndex], {
//       minWidth: 200, height: 2000
//     })

//     const { imageIndex: preSel } = prevState;
//     const { imageIndex } = this.state;
//     if (preSel !== imageIndex) {
//       let groupX, currentX, resetX;
//       if (imageIndex === 0) {
//         groupX = resetX = 0;
//         currentX = "+=160";
//       } else {
//         groupX = currentX = "+=110";
//         resetX = (110 * preSel) - 490
//       }
//       const cards = this.state.cards;

//       let selectedCard = '#card-el-'
//       selectedCard += imageIndex

    

//       console.log(selectedCard)

//       const tl = new TimelineLite({ paused: true });
//       tl
        
//         //.to('#card-el-1', 0.5, { minWidth: 150, height: 1000 }, 0)

//         .to({selectedCard}, 0.5, { minWidth: 250, height: 1000 }, 0) // needs to target 
//         .to(selectedCard, 0.5, { minWidth: 150, height: 450 }, 0)
//         .to(cards, 0.5, { x: groupX }, 0)
//         .to(cards[preSel], 0.5, { minWidth: 100, height: 125, x: currentX }, 0)
//         .set(cards[preSel], { x: resetX })

//         .to(cards[imageIndex], 0.5, { minWidth: 150, height: 450 }, 0)
//         .to(cards, 0.5, { x: groupX }, 0)
//         .to(cards[preSel], 0.5, { minWidth: 100, height: 125, x: currentX }, 0)
//         .set(cards[preSel], { x: resetX })
//         .play();
//     }
//   }


//   //   const { imageIndex: previous } = prevState;
//   //   const { imageIndex } = this.state

//   //   if (previous !== imageIndex) {
//   //     let galleryX, selectedX, resetX;

//   //     if (imageIndex === 0) {
//   //       galleryX = resetX = 0
//   //       selectedX = '+-450'
//   //     } else {
//   //       galleryX = selectedX = '+=400'
//   //       resetX = (110 * previous) - 500
//   //     }

//   //     const { cards } = this.state
//   //     const tl = new TimelineLite( { paused: true })

//   //     tl
//   //       .to(cards[imageIndex], 0.5, { minWidth: 200, height: 1000 }, 0)
//   //       .to(cards, 0.5, { x: galleryX }, 0)
//   //       //.to('#selected', 0.5, { height: 3000})
//   //       .to(cards[previous], 0.5, { minWidth: 185, height: 500, x: selectedX }, 0)
//   //       .set(cards[previous], { x: resetX })
//   //       .play();
//   //   }
//   // }

//   nextImageHandler = () => {
//     const { imageIndex } = this.state
//     // ensures that we don't pass the array limit
//     this.setState({
//       imageIndex: (imageIndex < (this.state.cards.length -1) ? (imageIndex +1) : 0)
//     })
//   }

//   clickImageHandler = () => {
//     const { imageIndex } = this.state
//     this.setState({
//       imageIndex: imageIndex
//     })
//   }

//   render() {

//      let imageGallery = this.state.cards.map ( (e,i) => 
//        <img key={e.id} 
//             data-target={i} 
//             ref={card => this.state.cards} 
//             className='card-wrap'
//             id={'card-el-' + e.id}
//             onClick={this.clickImageHandler} 
//             src={e.link} 
//             alt={e.description}>
//         </img>
      
//      )

//     return (
//       <div className='wrapper'>
//         <div className='index-wrap'>
//           <h5 id='index'> {this.state.imageIndex +1} / {this.state.imageTotal}</h5>
//         </div>
//         <div className='header-wrap'>
//           <div id='title'>
//             <h1> SHIRO KURAMATA </h1>
//           </div>
//         </div>

//         <div className='gallery-wrap'>

//           {/* { this.state.cards.map( (e,i) => <div key={e.id} data-target={i}
//             ref={ card => this.state.cards }
//             id='card-el'>
//             {i+1} 
//             </div>)} */}
//             {console.log(imageGallery)}
//             {/* {imageGallery} */}
           
            
//             <div>
//               {imageGallery[this.state.imageIndex+3]}
//             </div>
//             <div>
//               {imageGallery[this.state.imageIndex+2]}
//             </div>
//             <div>
//               {imageGallery[this.state.imageIndex+1]}
//             </div>
//             <div>
//               {imageGallery[this.state.imageIndex]}             
//             </div>

          
//         </div>

//         <div className='info-wrap'>
        
//           <p id='name-info'> {this.state.cards[this.state.imageIndex].name} </p>
//           <p id='description-info'>  </p>
//         </div>

//         <div className='button-wrap'>
//           <button className="btn btn-secondary" onClick={this.nextImageHandler}>Next</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
