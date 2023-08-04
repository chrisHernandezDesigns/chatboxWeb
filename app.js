document.addEventListener("DOMContentLoaded", function(){
    const chatDisplay = document.getElementById("chat-display");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Function to handle sending a message
    function sendMessage() {
        const userMessage = userInput.value;
        if (userMessage.trim() === "") return;

        appendMessage("You", userMessage, true);
        userInput.value = "";

        const chatbotResponse = getChatbotResponse(userMessage);
        const randomDelay = (Math.random() * 500) + 2000;
        setTimeout(function() {
            appendMessage("CustomerService", chatbotResponse, false);
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }, randomDelay);
    }

    // Listen for button click
    sendButton.addEventListener("click", sendMessage);

    // Listen for Enter key press
    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default Enter key behavior (form submission)
            sendMessage();
        }
    });

    function appendMessage(sender, message, isUser) {
        const messageDiv = document.createElement("div");
        messageDiv.className = isUser ? "message user-message" : "message chatbot-message";
        
        const label = document.createElement("strong");
        label.textContent = sender + ":";
        
        const contentSpan = document.createElement("span");
        contentSpan.textContent = message;
    
        messageDiv.appendChild(label);
        messageDiv.appendChild(document.createTextNode(" "));
        messageDiv.appendChild(contentSpan);
    
        chatDisplay.appendChild(messageDiv);
    }
    

    let conversationState = "initial"; // Initial conversation state

    function getChatbotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        let chatbotResponse = "I'm here to assist you. How can I help with your customer service inquiry?";

        switch (conversationState) {
            case "initial":
                if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
                    conversationState = "greeting";
                    chatbotResponse = "Hello! Welcome to our customer service. How can I assist you today?";
                }
                break;
            case "greeting":
                if (lowerCaseMessage.includes("return")) {
                    conversationState = "return";
                    chatbotResponse = "I'm sorry you want to return a product. Please let me know the reason for the return.";
                } else if (lowerCaseMessage.includes("damages")) {
                    conversationState = "damages";
                    chatbotResponse = "I'm sorry your product arrived damaged. Can you provide details and images of the damages?";
                } else if (lowerCaseMessage.includes("delivery") || lowerCaseMessage.includes("shipping")) {
                    conversationState = "delivery";
                    chatbotResponse = "For delivery information, please provide your order number, and I'll be able to give you an update.";
                } else if (lowerCaseMessage.includes("contact")) {
                    conversationState = "contact";
                    chatbotResponse = "Thank you for reaching out to us. How can we help?";
                }
                break;
            case "return":
                // Handle user's response to the return reason
                conversationState = "return-followup";
                chatbotResponse = "Thank you for sharing the reason for the return. Would you like a refund or an exchange?";
                break;
            case "return-followup":
                if (lowerCaseMessage.includes("refund")) {
                    chatbotResponse = "Once we receive the returned product, we'll initiate the refund process. How would you like to return it?";
                } else if (lowerCaseMessage.includes("exchange")) {
                    chatbotResponse = "Certainly, we can process an exchange for the product. What is the reason for the exchange?";
                }
                // Reset conversation state after follow-up
                conversationState = "initial";
                break;
            case "damages":
                // Handle user's response to providing damages details
                chatbotResponse = "Thank you for providing details about the damages. Please upload images of the damaged product for our team to review.";
                // Reset conversation state after follow-up
                conversationState = "initial";
                break;
            case "delivery":
                // Handle user's response to providing order number
                chatbotResponse = "Thank you for providing your order number. Let me check the status of your delivery.";
                // Reset conversation state after follow-up
                conversationState = "initial";
                break;

            // Add cases for other conversation states here

            case "contact":
                //handle user's response to contact
                conversationState = "return-contact";
                chatbotResponse = "How would you like to reach out by Phone or Email?";
                break;
            case "return-contact":
                if (lowerCaseMessage.includes("phone")) {
                    chatbotResponse = "Our direct number is 123.456.7890";
                } else if (lowerCaseMessage.includes("email")) {
                    chatbotResponse = "Our Customer Service email is customerServices@example.com";
                }
                conversationState = "initial";
                break;
        }

        return chatbotResponse;
    }
    
    
});