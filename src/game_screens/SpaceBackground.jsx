import React, { Component } from "react";
import { connect } from 'react-redux';
import Config from '../Config';

class SpaceBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasStyles = {
      color: Config.COLORS.WHITE,
      backgroundColor: Config.COLORS.BLACK,
      margin: 0,
      padding: 0,
      overflow: "hidden"
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const field = this.canvasRef.current;
    const f = field.getContext('2d');

    var stars = {};
    var starIndex = 0;
    var numStars = 0;
    var acceleration = 0;
    var starsToDraw = (field.width * field.height) / 200;

    function Star() {
        this.X = field.width / 2;
        this.Y = field.height / 2;

        this.SX = Math.random() * 10 - 5;
        this.SY = Math.random() * 10 - 5;

        var start = 0;

        if (field.width > field.height)
            start = field.width;
        else
            start = field.height;

        this.X += this.SX * start / 10;
        this.Y += this.SY * start / 10;

        this.W = 1;
        this.H = 1;

        this.age = 0;
        this.dies = 500;

        starIndex++;
        stars[starIndex] = this;

        this.ID = starIndex;
        this.C = Config.COLORS.WHITE;
    }

    Star.prototype.Draw = function () {
      this.X += this.SX;
      this.Y += this.SY

      this.SX += this.SX / (50 / acceleration);
    	this.SY += this.SY / (50 / acceleration);

      this.age++;

      if (this.age == Math.floor(50 / acceleration) | this.age == Math.floor(150 / acceleration) | this.age == Math.floor(300 / acceleration)) {
        this.W++;
        this.H++;
      }

      if (this.X + this.W < 0 | this.X > field.width | this.Y + this.H < 0 | this.Y > field.height) {
        delete stars[this.ID];
        numStars--;
  		}

      f.fillStyle = this.C;
      f.fillRect(this.X, this.Y, this.W, this.H);
    }

    field.width = window.innerWidth;
    field.height = window.innerHeight;

    function draw() {
    	if (field.width != window.innerWidth){
        field.width = window.innerWidth;
      }
    	if (field.height != window.innerHeight) {
      	field.height = window.innerHeight;
      }

    	// Play with the "a" value to create streams
      f.fillStyle = "rgba(0, 0, 0, 0.8)";
      f.fillRect(0, 0, field.width, field.height);

      for (var i = numStars; i < starsToDraw; i++) {
        new Star();
        numStars++;
      }

      for (var star in stars) {
        stars[star].Draw();
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  render(){
    console.log("render background");
    return (
      <canvas
        ref={this.canvasRef}
        style={this.canvasStyles}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SpaceBackground);
