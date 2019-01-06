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
      imageUrl: ' '
    }
  }

  onInputChange= (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
    );
  }
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation/>

         <Logo/>
          <Rank/>
         <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        
         
         <FaceRecognition imageUrl={this.state.imageUrl}/>
        
      </div>
    );
  }
}

export default App;
