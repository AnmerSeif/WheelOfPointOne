import * as React from 'react';
import './Confetti.scss';

export default class Header_Desktop extends React.Component{

    componentDidMount() {
      var utils = {
        norm: function(value, min, max) {
          return (value - min) / (max - min);
        },
      
        lerp: function(norm, min, max) {
          return (max - min) * norm + min;
        },
      
        map: function(value, sourceMin, sourceMax, destMin, destMax) {
          return utils.lerp(
            utils.norm(value, sourceMin, sourceMax),
            destMin,
            destMax
          );
        },
      
        clamp: function(value, min, max) {
          return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
        },
      
        distance: function(p0, p1) {
          var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
          return Math.sqrt(dx * dx + dy * dy);
        },
      
        distanceXY: function(x0, y0, x1, y1) {
          var dx = x1 - x0,
            dy = y1 - y0;
          return Math.sqrt(dx * dx + dy * dy);
        },
      
        circleCollision: function(c0, c1) {
          return utils.distance(c0, c1) <= c0.radius + c1.radius;
        },
      
        circlePointCollision: function(x, y, circle) {
          return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
        },
      
        pointInRect: function(x, y, rect) {
          return (
            utils.inRange(x, rect.x, rect.x + rect.width) &&
            utils.inRange(y, rect.y, rect.y + rect.height)
          );
        },
      
        inRange: function(value, min, max) {
          return value >= Math.min(min, max) && value <= Math.max(min, max);
        },
      
        rangeIntersect: function(min0, max0, min1, max1) {
          return (
            Math.max(min0, max0) >= Math.min(min1, max1) &&
            Math.min(min0, max0) <= Math.max(min1, max1)
          );
        },
      
        rectIntersect: function(r0, r1) {
          return (
            utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
            utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
          );
        },
      
        degreesToRads: function(degrees) {
          return degrees / 180 * Math.PI;
        },
      
        radsToDegrees: function(radians) {
          return radians * 180 / Math.PI;
        },
      
        randomRange: function(min, max) {
          return min + Math.random() * (max - min);
        },
      
        randomInt: function(min, max) {
          return Math.floor(min + Math.random() * (max - min + 1));
        }
      };
      
      var element1 = 75; // # of particles
      var element2 = 0.1; //gravity
      var element3 = 0.99; //friction
      var element4 = 0; //wind
      var canvas = document.getElementById("canvas");
      
      var context = canvas.getContext("2d");
      //W = canvas.width = window.innerWidth;
      //H = canvas.height = window.innerHeight;
      var W = canvas.width = 1920;
      var H = canvas.height = 1080;
      var generatorStock = [];
      
      var gravity = parseFloat(element2.value);
      
      var friction = element3;
      var wind = element4;
      var colors = ["#7c55fb", "#6fefb0", "#fed650", "#fdaa4c", "#488dfb", "#fc4482"];
      
      //
      // Add the Generator Here :)
      //
      
      var generator1 = new particleGenerator(0, 0, W, 0, element1);
      
      var mouse = {
        x: 0,
        y: 0
      };
      canvas.addEventListener(
        "mousemove",
        function(e) {
          mouse.x = e.pageX - this.offsetLeft;
          mouse.y = e.pageY - this.offsetTop;
        },
        false
      );
      
      function randomInt(min, max) {
        return min + Math.random() * (max - min);
      }
      
      function clamp(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
      }
      
      function particle(x, y) {
        this.radius = randomInt(0.1, 1);
        this.x = x;
        this.y = y;
        this.vx = randomInt(-4, 4);
        this.vy = randomInt(-10, -0);
        this.type = utils.randomInt(0, 1);
      
        this.w = utils.randomRange(5, 20);
        this.h = utils.randomRange(5, 20);
      
        this.r = utils.randomRange(5, 10);
      
        this.angle = utils.degreesToRads(randomInt(0, 360));
        this.anglespin = randomInt(-0.2, 0.2);
        this.color = colors[Math.floor(Math.random() * colors.length)];
      
        this.rotateY = randomInt(0, 1);
      }
      
      particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += gravity;
        this.vx += wind;
        this.vx *= friction;
        this.vy *= friction;
        this.radius -= 0.02;
      
        if (this.rotateY < 1) {
          this.rotateY += 0.1;
        } else {
          this.rotateY = -1;
        }
        this.angle += this.anglespin;
      
        context.save();
      
        context.translate(this.x, this.y);
      
        //context.rotate(this.angle);
        //context.scale(1, this.rotateY);
        //context.rotate(this.angle);
      
        context.beginPath();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.lineCap = "round";
        context.lineWidth = 2;
      
        //context.restore();
      
        if (this.type === 0) {
          //context.beginPath();
          //context.arc(0, 0, this.r, 0, 2 * Math.PI);
          context.translate(21, 21);
          context.rotate(this.angle);
          context.scale(1, this.rotateY);
          context.translate(-21, -21);
      
          context.moveTo(23.5, 1.3);
          context.lineTo(26.2, 6.3);
          context.bezierCurveTo(26.6, 7.3, 27.8, 7.9, 28.9, 7.5);
          context.lineTo(34.2, 5.8);
          context.bezierCurveTo(35.2, 5.5, 36.0, 5.8, 36.6, 6.4);
          context.bezierCurveTo(37.2, 7.1, 37.4, 8.0, 37.2, 8.8);
          context.lineTo(35.5, 14.2);
          context.bezierCurveTo(35.2, 15.2, 35.5, 16.4, 36.5, 17.0);
          context.lineTo(41.5, 19.6);
          context.bezierCurveTo(42.5, 20.0, 42.8, 20.8, 42.8, 21.6);
          context.bezierCurveTo(42.8, 22.6, 42.3, 23.3, 41.6, 23.8);
          context.lineTo(36.6, 26.4);
          context.bezierCurveTo(35.6, 26.9, 35.1, 28.1, 35.6, 29.2);
          context.lineTo(37.2, 34.6);
          context.bezierCurveTo(37.5, 35.4, 37.2, 36.3, 36.6, 36.9);
          context.bezierCurveTo(36.0, 37.5, 35.1, 37.7, 34.3, 37.5);
          context.lineTo(29.0, 35.9);
          context.bezierCurveTo(28.0, 35.6, 26.8, 35.9, 26.2, 36.9);
          context.lineTo(23.5, 41.9);
          context.bezierCurveTo(23.1, 42.9, 22.3, 43.2, 21.5, 43.2);
          context.bezierCurveTo(20.5, 43.2, 19.8, 42.7, 19.3, 42.0);
          context.lineTo(16.8, 37.0);
          context.bezierCurveTo(16.3, 36.0, 15.1, 35.5, 14.0, 36.0);
          context.lineTo(8.5, 37.3);
          context.bezierCurveTo(7.7, 37.7, 6.8, 37.5, 6.2, 36.8);
          context.bezierCurveTo(5.6, 36.2, 5.4, 35.3, 5.6, 34.5);
          context.lineTo(7.2, 29.1);
          context.bezierCurveTo(7.6, 28.1, 7.2, 26.9, 6.2, 26.3);
          context.lineTo(1.2, 23.7);
          context.bezierCurveTo(0.4, 23.3, 0.0, 22.5, 0.0, 21.7);
          context.bezierCurveTo(0.0, 20.7, 0.5, 20.0, 1.2, 19.5);
          context.lineTo(6.2, 16.9);
          context.bezierCurveTo(7.2, 16.4, 7.7, 15.2, 7.2, 14.1);
          context.lineTo(5.7, 8.7);
          context.bezierCurveTo(5.2, 7.9, 5.6, 7.0, 6.2, 6.3);
          context.bezierCurveTo(6.8, 5.8, 7.7, 5.6, 8.5, 5.8);
          context.lineTo(13.9, 7.5);
          context.bezierCurveTo(14.9, 7.8, 16.1, 7.5, 16.7, 6.5);
          context.lineTo(19.2, 1.3);
          context.bezierCurveTo(19.7, 0.3, 20.5, 0.0, 21.4, 0.0);
          context.bezierCurveTo(22.4, -0.2, 23.1, 0.3, 23.4, 1.0);
          context.lineTo(23.5, 1.3);
          /*
            //Star
            var rot = Math.PI / 2 * 3;
            var x, y;
            var outerRadius = 18;
            var innerRadius = 14;
            var spikes = 8;
            var step = Math.PI / spikes;
            
            for (i = 0; i < spikes; i++) {
              x = 0 + Math.cos(rot) * outerRadius;
              y = 0 + Math.sin(rot) * outerRadius;
              context.lineTo(x, y);
              rot += step;
              x = 0 + Math.cos(rot) * innerRadius;
              y = 0 + Math.sin(rot) * innerRadius;
              context.lineTo(x, y);
              rot += step;
            }*/
      
          context.fill();
        } else if (this.type === 2) {
          context.beginPath();
          for (let i = 0; i < 22; i++) {
            let angle = 0.5 * i;
            let x = (0.2 + 1.5 * angle) * Math.cos(angle);
            let y = (0.2 + 1.5 * angle) * Math.sin(angle);
      
            context.lineTo(x, y);
          }
          context.stroke();
        } else if (this.type === 1) {
          //context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
          //Wave
      
          context.translate(23, 9);
          context.rotate(this.angle);
          context.scale(1, this.rotateY);
          context.translate(-23, -9);
      
          context.moveTo(0.1, 16.3);
          context.lineTo(0.1, 5.6);
          context.bezierCurveTo(0.1, 5.0, 0.3, 4.6, 0.6, 4.3);
          context.bezierCurveTo(15.6, -8.5, 30.3, 12.5, 45.2, 1.3);
          context.bezierCurveTo(45.6, 1.1, 46.0, 1.1, 46.2, 1.3);
          context.bezierCurveTo(46.6, 1.7, 46.8, 2.1, 46.8, 2.6);
          context.lineTo(46.8, 13.4);
          context.bezierCurveTo(46.8, 13.9, 46.5, 14.4, 46.2, 14.6);
          context.bezierCurveTo(31.2, 27.4, 16.5, 6.4, 1.6, 17.6);
          context.bezierCurveTo(1.2, 17.8, 0.8, 17.8, 0.6, 17.6);
          context.bezierCurveTo(0.2, 17.3, 0.0, 16.8, 0.0, 16.3);
          context.lineTo(0.1, 16.3);
          context.fill();
        }
      
        context.closePath();
        context.restore();
      };
      
      function particleGenerator(x, y, w, h, number, text) {
        // particle will spawn in this aera
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.number = number;
        this.particles = [];
        this.text = text;
        this.recycle = true;
        this.paused = false;
      
        this.type = 1;
      }
      particleGenerator.prototype.animate = function() {
        if (this.paused) {
          return false;
        }
      
        context.fillStyle = "grey";
      
        context.beginPath();
        context.strokeRect(this.x, this.y, this.w, this.h);
      
        context.font = "13px arial";
        context.textAlign = "center";
      
        context.closePath();
        //	   for (var i = 0; i < 100; i++) {
      
        if (this.particles.length < this.number) {
          this.particles.push(
            new particle(
              clamp(randomInt(this.x, this.w + this.x), this.x, this.w + this.x),
      
              clamp(randomInt(this.y, this.h + this.y), this.y, this.h + this.y),
              this.text
            )
          );
        }
      
        if (this.particles.length > this.number) {
          this.particles.length = this.number;
        }
      
        for (var i = 0; i < this.particles.length; i++) {
          let p = this.particles[i];
          p.update();
          if (
            p.y > H ||
            p.y < -100 ||
            p.x > W + 100 ||
            (p.x < -100 && this.recycle)
          ) {
            //a brand new particle replacing the dead one
            this.particles[i] = new particle(
              clamp(randomInt(this.x, this.w + this.x), this.x, this.w + this.x),
      
              clamp(randomInt(this.y, this.h + this.y), this.y, this.h + this.y),
              this.text
            );
          }
        }
      };
      toggleEngine();
      
      function toggleEngine() {
        if (generator1.type === 0) {
          generator1.type = 1;
          generator1.x = W / 2;
          generator1.y = H / 2;
          generator1.w = 0;
        } else {
          generator1.type = 0;
          generator1.x = 0;
          generator1.w = W;
          generator1.y = -50;
        }
      }
      
      update();
      
      function update() {
        gravity = parseFloat(element2);
        generator1.number = element1;
        friction = element3;
        wind = parseFloat(element4);
      
        // context.globalAlpha=.5;
        context.fillStyle = "white";
        context.clearRect(0, 0, W, H);
        generator1.animate();
      
        requestAnimationFrame(update);
      }
      
      //Control here:
      generator1.paused = true;

      this.generator1 = generator1;

    }

    start() {
      this.generator1.paused = false;
    }

    render(){
        return(
            <canvas id="canvas"></canvas>
        ) 
    }
} 