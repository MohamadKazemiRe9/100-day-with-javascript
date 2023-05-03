// Function to call ChatGPT API
import { apiKey } from "./key.js"

function callChatGPT(question) {
    
    const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions";
  
    return $.ajax({
      url: apiUrl,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        prompt: question,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 1
      })
    });
  }
  
  // Function to add user and bot messages to the chat body
  function addMessage(message, type) {
    const messageElement = `
      <div class="chat-message ${type}-message">
        <div class="message-text">${message}</div>
      </div>
    `;
    $("#chat-body").append(messageElement);
    $("#chat-body").scrollTop($("#chat-body")[0].scrollHeight);
  }
  
  // Event handler for the form submission
  $("#chat-form").on("submit", function(event) {
    event.preventDefault();
  
    const userInput = $("#user-input").val();
    $("#user-input").val(""); // Clear the input field
  
    addMessage(userInput, "user");
  
    callChatGPT(userInput)
      .done(function(response) {
        const generatedText = response.choices[0].text.trim();
        addMessage(generatedText, "bot");
      })
      .fail(function(error) {
        console.error("Error calling ChatGPT API:", error);
        addMessage("Error occurred. Please try again.", "bot");
      });
  });
  