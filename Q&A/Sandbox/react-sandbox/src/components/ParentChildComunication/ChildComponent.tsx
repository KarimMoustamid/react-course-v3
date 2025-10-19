import React from 'react';

// Define the props the ChildComponent will accept
export interface ChildProps {
  // Data passed from parent to child
  messageFromParent: string;
  // Function passed from parent to child, which allows the child to send data back up
  sendMessageToParent: (message: string) => void;
}

const ChildComponent: React.FC<ChildProps> = ({ messageFromParent, sendMessageToParent }) => {
  
  const handleSendReply = () => {
    const replyMessage = "Hello Parent! I received your message.";
    sendMessageToParent(replyMessage);
  };

  return (
    <div className="child-container">
      <h3>Child Component</h3>
      <p><strong>Message from Parent:</strong> "{messageFromParent}"</p>
      <button onClick={handleSendReply}>
        Send Message to Parent
      </button>
    </div>
  );
};

export default ChildComponent;
