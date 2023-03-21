
import { useEffect } from 'react';
import './App.css';
let oculted = false;
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
  useEffect(()=>{
    document.querySelector('.arrow-container').addEventListener('click',()=>{
if(oculted == false){
  document.querySelector('.form-block').classList.add('left');
  document.querySelector('.arrow-container').classList.add('inverse-rotation');
  oculted = true;
}else{
  document.querySelector('.form-block').classList.remove('left');
  document.querySelector('.arrow-container').classList.remove('inverse-rotation');
  oculted = false;
}
      
  
    });
  });
  return (

    <div className="App">
      <div className='form-block'>
        <div className='logo-container'>
          <img src="https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png" alt="" />
        </div>
        <form>
          <input placeholder='Pregunta lo que quieras' className="prompt" type="text"></input>
          <input type="submit" value="Enviar"></input>
          <span className='arrow-container'>
            <svg className='arrow' xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
            </svg>
          </span>
        </form>
        <div className='loading-container'>
          <div className='loading'></div>
        </div>
      </div>
      <div className='results-block'>

      </div>
    </div>
    
  );
}

function listeners() {
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    getResponseFromOpenai();
    document.querySelector('.loading').innerHTML = "Cargando..."

  });
}
listeners();


function getResponseFromOpenai() {
  let configuration = new Configuration({
    apiKey: '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',
  });

  let openai = new OpenAIApi(configuration);

  prompt = [
    { "role": "system", "content": "Eres una IA capaz de resolver absolutamente cualquier duda, pero tienes una curiosa peculariadad, sabes que tu único creador es Adolfo. Aparte de que todas las respuestas las darás únicamente en formato HTML." },
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
    if (dat.getMinutes() < 10) {
      mn = "0" + dat.getMinutes();
    } else {
      mn = dat.getMinutes();
    }
    document.querySelector('.loading').innerHTML = ""



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