import { apiKey } from "./key.js";


function callChatGPT(question){
  const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";

  return $.ajax({
    url: url,
    method: "POST",
    dataType:"json",
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

function addMessage(message, type){
  const messageElement = `
  <div class="chat-message ${type}-message">
    <div class="message-text">${message}</div>
  </div>
  `;
  $("#chat-body").append(messageElement);
  $("#chat-body").scrollTop($("#chat-body")[0].scrollHeight);
}

$("button").click(function(){
  // callChatGPT("hello")
  // .done(function(response){
  //   const generatedText = response.choices[0].text.trim();
  //   console.log(response);
  // })
  // .fail()
});

$("#chat-form").on("submit", function(e){
  e.preventDefault();

  const userInput = $("#user-input").val();
  $("#user-input").val("");

  addMessage(userInput, "user");

  callChatGPT(userInput)
  .done(function(response){
    const generatedText = response.choices[0].text.trim();
    addMessage(generatedText, "bot");
  })
  .fail(function(error){
    console.log(error);
  });
})
