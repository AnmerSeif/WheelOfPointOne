import * as React from 'react';
import './Presenters.scss';


const imgs = [
    require('../assets/img/foredragsholdere/Andrea.png'),
    require('../assets/img/foredragsholdere/Camilla.png'),
    require('../assets/img/foredragsholdere/Even.png'),
    require('../assets/img/foredragsholdere/Ida.png'),
    require('../assets/img/foredragsholdere/Johan.png'),
    require('../assets/img/foredragsholdere/Jonas.png'),
    require('../assets/img/foredragsholdere/Knut.png'),
    require('../assets/img/foredragsholdere/Kuda.png'),
    require('../assets/img/foredragsholdere/Maria.png'),
    require('../assets/img/foredragsholdere/Nora.png'),
    require('../assets/img/foredragsholdere/Pierre.png'),
    require('../assets/img/foredragsholdere/Shahrukh.png'),
    require('../assets/img/foredragsholdere/Steinar.png'),
    require('../assets/img/foredragsholdere/Stian.png'),
  ]

export default class Presenters extends React.Component{

    render(){
        return(
            <div className="presenters" >
              {
                imgs.map(v => (
                    <div className="presenter" >
                        <img style={{transform: `rotate(${this.props.rotate}deg)`}} key={v} src={v} />
                    </div>
                ))
              }
            </div>
        ) 
    }
} 