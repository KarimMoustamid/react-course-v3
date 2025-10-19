import React from 'react'
import './ClassComponentDemo.css'

interface ButtonProps {
  text : string;
}

interface State {
  counter : number;
}

class Button extends React.Component<ButtonProps, State> {
state: State = {
  counter: 0,
}

handleClick = () => {
  if (this.state.counter >= 10){
  this.setState({counter : 0});
  } else {
    this.setState({counter : this.state.counter + 1});
  }
}


  render() {
     return (
    <div className="container">
      <button className="my-button"  onClick={this.handleClick}>
      {this.props.text} {this.state.counter}
      </button>
    </div>
     ); 
  }
}

export default Button;