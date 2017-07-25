/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'

//import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
//import PropTypes from 'prop-types'

import React3 from 'react-three-renderer';
import * as THREE from 'three';

//require('./three.min.js')

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

const logger = createLogger()

//-----------------------------------
// Action creators (Actionを返す)
//-----------------------------------

// 現段階では Action creators は使わないのでコメントアウトしておく
//const anAction = () => {
//  return {
//    type: '',
//  }
//}

//-----------------------------------
// Reducer
//-----------------------------------

const aState = (state = null/*, action*/) => {
  return state
}

//-----------------------------------
// Component
//-----------------------------------

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  render() {
    const width = window.innerWidth/2; // canvas width
    const height = window.innerHeight/2; // canvas height

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={30}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}

Simple.propTypes = {
};

//-----------------------------------
// Container
//-----------------------------------

const SimpleContainer = (() => {

  const mapStateToProps = (/*state, ownProps*/) => {
    return {};
  }

  const mapDispatchToProps = (/*dispatch*/) => {
    return {}
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Simple);

})();

//-----------------------------------
// Store
//-----------------------------------

const store = (process.env.NODE_ENV === 'development')
  ? createStore(aState, applyMiddleware(logger))
  : createStore(aState);

//-----------------------------------
// 画面に表示する
//-----------------------------------

render(
  <Provider store={store}>
    <SimpleContainer />
  </Provider>,
  document.getElementById('root1')
)

