// https://www.googleapis.com/books/v1/volumes?q=query
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
};

export const searchCurrentBook = (bookId) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
}

// search based on category + newst 
export const searchRealatedBooks = (category, author) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${author}+subject:${category}&orderBy=newest`);
}

export const searchByCategories = (category) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=+subject:${category}&orderBy=newest&maxResults=12`);
}

// === Google Vision API logic ===
import React, { Component } from 'react';
// move these imports to correct component file
import Camera from './scan';
import config from '../assets/config.json';

class CameraContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          camera: false,
          cameraResult: false,
          result: null,
          visionResponse: '',
          loading: false,
          googleVisionDetection: undefined
      };
  }

  takePicture = async (value) => {
      if (value) {
          const options = { quality: 0.5, base64: true };
          const data = await value.takePictureAsync(options);
          console.log(data);
          this.setState({
              cameraResult: true,
              result: data.base64,
              camera: false
          }, () =>
                  this.callGoogleVIsionApi(this.state.result))
          this.setState({ loading: true });
      }
  };
  callGoogleVIsionApi = async (base64) => {
      let googleVisionRes = await fetch(config.googleCloud.api + config.googleCloud.apiKey, {
          method: 'POST',
          body: JSON.stringify({
              "requests": [
                  {
                      "image": {
                          "content": base64
                      },
                      features: [
                          { type: "TEXT_DETECTION", maxResults: 5 },
                          { type: "IMAGE_PROPERTIES", maxResults: 5 }
                      ],
                  }
              ]
          })
      });

      await googleVisionRes.json()
          .then(googleVisionRes => {
              console.log(googleVisionRes)
              if (googleVisionRes) {
                  this.setState(
                      {
                          loading: false,
                          googleVisionDetection: googleVisionRes.responses[0]
                      }
                  )
                  console.log('this.is response', this.state.googleVisionDetection);
              }
          }).catch((error) => { console.log(error) })
  }
  activeCamera = () => {
      this.setState({
          camera: true
      })
  }
  clickAgain = () => {
      this.setState({
          camera: true,
          googleVisionDetection: false,
          loading: false
      })
  }
  render() {
      const { camera, cameraResult, result, googleVisionDetection, loading } = this.state
      return (
          <Camera
              camera={camera}
              cameraResult={cameraResult}
              result={result}
              clickAgain={this.clickAgain}
              takePicture={(value) => this.takePicture(value)}
              activeCamera={this.activeCamera}
              googleVisionDetection={googleVisionDetection}
              loading={loading}
          />
      );
  }
}

export default CameraContainer