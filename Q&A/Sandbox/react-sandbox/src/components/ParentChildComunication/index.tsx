import React, { useState } from 'react';
import ChildComponent from './ChildComponent'; // Import the child component
import './index.css'; // Import the stylesheet

//================================================
// PARENT COMPONENT
//================================================

const ParentComponent = () => {
  // State for the message that will be passed down to the child
  const [messageForChild, setMessageForChild] = useState("Hello Child, this is a message from your parent!");

  // State to hold the message received from the child
  const [messageFromChild, setMessageFromChild] = useState("");

  // This function will be passed down to the child. 
  // The child can call it to update the parent's state.
  const handleMessageFromChild = (message: string) => {
    setMessageFromChild(message);
  };

  return (
    <div className="parent-container">
      <h2>Parent Component</h2>
      
      {/* Input to change the message sent to the child */}
      <div>
        <label>
          <strong>Edit message for child: </strong>
          <input 
            type="text" 
            value={messageForChild} 
            onChange={(e) => setMessageForChild(e.target.value)}
          />
        </label>
      </div>

      {/* Display the message received from the child */}
      {messageFromChild && (
        <p style={{ color: 'green' }}>
          <strong>Message from Child:</strong> "{messageFromChild}"
        </p>
      )}

      {/* Render the ChildComponent */}
      <ChildComponent 
        // a) Parent-to-Child: Pass data down as a prop
        messageFromParent={messageForChild}
        
        // b) Child-to-Parent: Pass a function down as a prop
        sendMessageToParent={handleMessageFromChild} 
      />
    </div>
  );
};

export default ParentComponent;