import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Wheel from './components/Wheel';
import * as gsap from 'gsap';

class App extends React.Component{

  constructor(props){
    super(props);

    this.mouseStep = 0;
    this.mouseHasEntered = false;
    this.lastMousePosition = { x: 0, y: 0 };
    this.rAFIndex = 0;
    this.maxX = 1;
    this.maxY = 1;
    this.textEffectStrength = this.props.textEffectStrength;
    this.nameEffectStrength = this.props.nameEffectStrength;

    this.mouseEntered = this.mouseEntered.bind(this);
    this.mouseLeft = this.mouseLeft.bind(this);
    this.mouseMoved = this.mouseMoved.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      wheelX: 0,
      wheelY: 0,
      boxX: 0,
      boxY: 0
    }
}

  mouseEntered(e){
      this.mouseHasEntered = true;
      // cancel the existing rAF
      cancelAnimationFrame(this.rAFIndex);
      this.rAFIndex = requestAnimationFrame(this.update.bind(this));
      
  }

  mouseLeft(e){
      this.mouseHasEntered = false;
      let innerWidth = window.innerWidth;
      let innerHeight = window.innerHeight
      let xConverter = (innerWidth/2)/this.maxX;
      let yConverter = (innerHeight/2)/this.maxY;
      let x = (this.lastMousePosition.x - window.innerWidth/2)/xConverter;
      let y = (this.lastMousePosition.y - window.innerHeight/2)/yConverter;

      let transform = {x: x, y: y}
      // gsap.TweenLite.to(transform, 0.5, {
      //     x: 0, y: 0,
      //     onUpdate: () => {
      //         this.wheel.style.transform = "rotateX("+-transform.y+"deg) rotateY("+transform.x+"deg)";
      //     }
      // })
  }

  mouseMoved(e){
      this.lastMousePosition.x = e.clientX;
      this.lastMousePosition.y = e.clientY;
  }

  update(){
      if(this.mouseHasEntered) {
          this.rAFIndex = requestAnimationFrame(this.update.bind(this));
          let innerWidth = window.innerWidth;
          let innerHeight = window.innerHeight
          let xConverter = (innerWidth/2)/this.maxX;
          let yConverter = (innerHeight/2)/this.maxY;
          let x = (this.lastMousePosition.x - window.innerWidth/2)/xConverter;
          let y = (this.lastMousePosition.y - window.innerHeight/2)/yConverter;
          this.setState({wheelY: y, wheelX: x, boxY: y, boxX: x});
      }
  }

  onClick(e) {
    gsap.TweenMax.to(this.box, 0.5, {
      opacity: 0,
      onComplete: () => {
        this.wheel.rotate();
      }
    })
  }

  componentDidMount(){
      if ( this.isInternetExplorer() ) 
          this.translateZAndScale = "translateZ(0em) scale(1.4)";
      else 
          this.translateZAndScale = "translateZ(6.5em) scale(1)";

    this.curtains.playbackRate = 2;
    this.curtains.autoplay=true;
    this.curtains.addEventListener('ended', () => {
      this.curtains.style.zIndex = "-1";
    })
  }

  isInternetExplorer(){
      let ms_ie = false;
      let ua = window.navigator.userAgent;
      let old_ie = ua.indexOf('MSIE ');
      let new_ie = ua.indexOf('Trident/');

      if ((old_ie > -1) || (new_ie > -1)) {
          ms_ie = true;
      }

      return ms_ie;
  }

  render() {
    return (
      <div className="App" >
        <video ref={(video)=> {this.curtains = video}} className="curtains">
          <source src={require('./assets/videos/output.webm')} type="video/webm" />
        </video>
        <div>
          <Wheel ref={ (wheel) => {this.wheel = wheel} }  />
          <div className="box" ref={ (box) => {this.box = box} }>
            <div className="first-line"><img className="bouvet-logo" src={require('./assets/img/logo-orange-cropped.png')}/><span>PointOne</span></div>
            <p>Foredragsvinner<span>.</span></p>
            <button onClick={this.onClick}><span>SPIN</span></button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
