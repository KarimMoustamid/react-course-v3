import React from 'react'
import './App.css'
/*import Button from './components/ClassComponent/ClassComponentDemo'; */
import ParentComponent from './components/ParentChildComunication';

class App extends React.Component {
  render() {
     return (
     /* <Button text="click me" /> */
     <ParentComponent/>
     ); 
  }
}

export default App
