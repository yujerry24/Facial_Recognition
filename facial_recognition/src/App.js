import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './componets/FaceRecognition/FaceRecognition';
import Navigation from './componets/Navigation/Navigation';
import Logo from './componets/Logo/Logo';
import ImageLinkForm from './componets/ImageLinkForm/ImageLinkForm';
import Rank from './componets/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'd13bd6f3623944e98e3f9bfbfd6f5437'
});

const particlesOptions = 
               {
                particles: {
                  number: {
                    value: 300,
                    density:  {
                      enable: true,
                      value_area: 800
                    }
                  }
                }
              }
              
class App extends Component {
  constructor() {
    super();
    this.state= {
      input: ' ',
      imageUrl: ' ',
      box: {},

    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width =Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width- clarifaiFace.right_col*width,
      bottomRow: height- (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox=(box)=> {
    console.log(box);
    this.setState({box: box});
  }
  onInputChange= (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err=> console.log(err));
    
    
  }
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation/>

         <Logo/>
          <Rank/>
         <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        
         
         <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        
      </div>
    );
  }
}

export default App;
