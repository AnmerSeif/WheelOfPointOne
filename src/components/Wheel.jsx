import * as React from 'react';
import './Wheel.scss';

import Confetti from '../components/Confetti';
import Ribbon from '../components/Ribbon';


import * as d3 from "d3";
import * as gsap from 'gsap';

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

  const winners = [
      require('../assets/img/foredragsholdere/Pierre-highres.png'),
      require('../assets/img/foredragsholdere/Nora-highres.png'),
      require('../assets/img/foredragsholdere/Maria-highres.png'),
      require('../assets/img/foredragsholdere/Kuda-highres.png'),
      require('../assets/img/foredragsholdere/Knut-highres.png'),
      require('../assets/img/foredragsholdere/Jonas-highres.png'),
      require('../assets/img/foredragsholdere/Johan-highres.png'),
      require('../assets/img/foredragsholdere/Ida-highres.png'),
      require('../assets/img/foredragsholdere/Even-highres.png'),
      require('../assets/img/foredragsholdere/Camilla-highres.png'),
      require('../assets/img/foredragsholdere/Andrea-highres.png'),
      require('../assets/img/foredragsholdere/Stian-highres.png'),
      require('../assets/img/foredragsholdere/Steinar-highres.png'),
      require('../assets/img/foredragsholdere/Shahrukh-highres.png'),
  ]

  const winnersName = [
    'Pierre',
    'Nora',
    'Maria',
    'Kuda',
    'Knut',
    'Jonas',
    'Johan',
    'Ida',
    'Even',
    'Camilla',
    'Andrea',
    'Stian',
    'Steinar',
    'Shahrukh',
]



export default class Header_Desktop extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            rotate: 0,
            winnerName: ''
        }
    }
    
    componentWillMount() {
        this.images = [];
        this.preload([
            require('../assets/img/foredragsholdere/Pierre-highres.png'),
            require('../assets/img/foredragsholdere/Nora-highres.png'),
            require('../assets/img/foredragsholdere/Maria-highres.png'),
            require('../assets/img/foredragsholdere/Kuda-highres.png'),
            require('../assets/img/foredragsholdere/Knut-highres.png'),
            require('../assets/img/foredragsholdere/Jonas-highres.png'),
            require('../assets/img/foredragsholdere/Johan-highres.png'),
            require('../assets/img/foredragsholdere/Ida-highres.png'),
            require('../assets/img/foredragsholdere/Even-highres.png'),
            require('../assets/img/foredragsholdere/Camilla-highres.png'),
            require('../assets/img/foredragsholdere/Andrea-highres.png'),
            require('../assets/img/foredragsholdere/Stian-highres.png'),
            require('../assets/img/foredragsholdere/Steinar-highres.png'),
            require('../assets/img/foredragsholdere/Shahrukh-highres.png')])
    }
    componentDidMount() {
        this.createWheel();
    }

    createWheel() {
        const size = 860;
        // set the dimensions and margins of the graph
        const width = size, height = size, margin = 0

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        const radius = Math.min(size, size) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        const svg = d3.select(".wheel")
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Create dummy data
        const data = {
            Andrea: 'Andrea',
            Camilla: 'Camilla',
            Even: 'Even',
            Ida: 'Ida',
            Johan: 'Johan',
            Jonas: 'Jonas',
            Knut: 'Knut',
            Kuda: 'Kuda',
            Maria: 'Maria',
            Nora: 'Nora',
            Pierre: 'Pierre',
            Shahrukh: 'Shahrukh',
            Steinar: 'Steinar',
            Stian: 'Stian',
        }

        // set the color scale
        const color = d3.scaleOrdinal()
        .domain(data)
        .range([
            '#5AA4A2', // tuqoise
            '#0D3C55', // dark blue
            '#0D3C55', // dark blue
            '#0D3C55', // dark blue
            '#0D3C55', // dark blue
            '#0D3C55', // dark blue
            '#377599', // blue
            '#377599', // blue
            '#A4D5EB', // light blue
            '#CD5000', // dark orange
            '#CD5000', // dark orange
            '#CD5000', // dark orange
            '#FBBD2D', // yellow
            '#D4E262', // green
        ])

        // Compute the position of each group on the pie:
        const pie = d3.pie()
        .value( (d) => { return 1 })
        const data_ready = pie(d3.entries(data))

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(300)
            .outerRadius(radius)
        )
        .attr('fill', (d) => { return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "3px")
        .style("opacity", 1)
    }

    rotate() {
        let transform = {deg: 0}
        gsap.TweenMax.to(transform, 30, {
            deg: 36000 + Math.random() * 360,
            onUpdate: () => {
                this.setState({rotate: transform.deg%360});
            },
            onComplete: () => {
                this.findWinner();
            }
        })
    }

    findWinner() {
        const sizeOfSliceInDegrees  = 360/imgs.length;
        const winner = this.state.rotate / sizeOfSliceInDegrees;
        const presenters = this.presenters;
        
        gsap.TweenMax.to(presenters, 0.5, {
            opacity: 0,
            delay: 1,
            onComplete: () => {
                presenters.style.display = "none";
                this.announceWinner(Math.floor(winner));
            }
        })
    }

    announceWinner(winner) {
        this.setState({winner: winners[winner], winnerName: winnersName[winner]})
        this.winner.style.display = "flex";
        this.winner.style.opacity = 1;
        gsap.TweenMax.to(this.winner, 0.5, {
            opacity: 1,
            onComplete: () => {
                this.pulseWinner();
                this.confetti.start();
            }
        })
    }

    pulseWinner() {
        d3.selectAll("path").each(function(d, i) {
            setTimeout(() => {
                d3.select(this).transition(2000).style('fill', '#f1c40f');
            }, 100*i)
        })
        
        let transform = { scale: 1 } 
        gsap.TweenMax.to(transform, 1, {
            scale: 0.9,
            yoyo: true,
            repeat: -1,
            onUpdate: () => {
                this.winner.style.transform = `scale(${transform.scale}) `;
            }
        })

        this.animateTrophies();
    }

    animateTrophies() {
        let moveObject = { left1: 0, left2: 50,  rotate: 0 }
        gsap.TweenMax.to(moveObject, 1, {
            left1: -10,
            left2: 60,
            rotate: 20,
            onUpdate: () => {
                this.trophy1.style.left = `${moveObject.left1}%`;
                this.trophy2.style.left = `${moveObject.left2}%`;
                this.trophy1.style.transform = `rotate(${-moveObject.rotate}deg)`
                this.trophy2.style.transform = `rotateY(180deg) rotate(${-moveObject.rotate}deg)`
            }
        })


    }

    preload(images) {
        for (let i = 0; i < images.length; i++) {
            this.images[i] = new Image()
            this.images[i].src = images[i]
        }
    }


    render(){
        return(
            <section ref={ (wheelContianer)=> { this. wheelContianer = wheelContianer; }} className={"wheel-container"}>
                <div className="trophies">
                    <img ref={ (trophy) => { this.trophy1 = trophy } } src={require('../assets/img/trophy-compressed.png')} />
                    <img ref={ (trophy) => { this.trophy2 = trophy } } src={require('../assets/img/trophy-compressed.png')} />
                </div>
                <Confetti ref={ (confetti) => { this.confetti = confetti; } } />
                <div ref={ (arrow) => { this.arrow = arrow; } } className="arrow"></div>
                <div ref={ (winner) => {this.winner = winner} } className="winner" style={{display: 'none', opacity: 0}}>
                    <div className="winner-inner">
                        <img src={this.state.winner} />
                        
                        <div className="winner-name"><span className="">{this.state.winnerName}</span></div>
                    </div>
                </div>
                <div style={{ transform: `rotate(${this.state.rotate}deg)` }} className="wheel" ref={ (wheel) => { this.wheel = wheel; } }>
                    
                    <div className="presenters" ref={ (presenters) => { this.presenters = presenters; } } >
                    {
                        imgs.map(v => (
                            <div className="presenter">
                                <img style={{transform: `rotate(${-this.state.rotate}deg)`}} key={v} src={v} />
                            </div>
                        ))
                    }
                    </div>
                </div>
            </section>
        ) 
    }
} 