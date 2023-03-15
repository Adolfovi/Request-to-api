
import './App.css';
let prompt = [];
let result;
let request;
let blockOfResponse;
let blockOfRequest;
let blockOfResult;
let dat;
let hr;
let mn;
let hour;
let blockOfDate;
let requestAndDate;


const { Configuration, OpenAIApi } = require('openai');

function App() {
  return (

    <div className="App">
      <div>
        <form>
          <input placeholder='Pregunta lo que quieras' className="prompt" type="text"></input>
          <input type="submit" value="Enviar"></input>
        </form>
      </div>
      <div className='results-block'>

      </div>
    </div>

  );
}

function prevent() {
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    getResponseFromOpenai();
  });
}
prevent();

function getResponseFromOpenai() {
  let configuration = new Configuration({
    apiKey: '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',
  });

  let openai = new OpenAIApi(configuration);

  prompt = [
    { "role": "system", "content": "Eres una IA capaz de resolver absolutamente cualquier duda" },
  ]

  let completion = {
    model: 'gpt-3.5-turbo',
    messages: prompt,
    temperature: 0.3,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }
  prompt.push({ "role": "user", "content": document.querySelector('.prompt').value });
  const response = openai.createChatCompletion(completion).then((response) => {
    dat = new Date();
    hr = dat.getHours();
    if(dat.getMinutes() < 10){
      mn = "0" + dat.getMinutes();
    }else{
      mn = dat.getMinutes();
    }
    
    
    
    
    hour = hr + ":" + mn;
    blockOfDate = document.createElement("span");
    blockOfDate.innerHTML = hour;
    blockOfDate.classList.add("date-block")
    
    request = document.querySelector(".prompt").value;
    result = response.data.choices[0].message.content
    
    requestAndDate = document.createElement("div");
    blockOfResult = document.createElement("div");
    blockOfRequest = document.createElement("span");
    blockOfResponse = document.createElement("span");
    
    blockOfRequest.classList.add("request-block");
    blockOfResponse.classList.add("response-block");
    blockOfResult.classList.add("result-block");
    blockOfDate.classList.add("date-block");
    requestAndDate.classList.add("requestDate-block");

    blockOfResponse.innerHTML = result;
    blockOfRequest.innerHTML = request;
    
    requestAndDate.append(blockOfRequest);
    requestAndDate.append(blockOfDate);

    blockOfResult.append(requestAndDate);
    blockOfResult.append(blockOfResponse);
    document.querySelector('.results-block').append(blockOfResult);

    prompt.push({ "role": "assistant", "content": result });

  });
}

export default App;