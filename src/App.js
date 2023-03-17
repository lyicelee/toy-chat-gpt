import React, { Component } from 'react';
import $ from "jquery";
import { openai } from 'openai';
import './App.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      chatHistoryList: []
    };
    // const apiKey = ;
    // this.configuration = new Configuration({
    //   apiKey: apiKey,
    // });
    // this.openai = new OpenAIApi(this.configuration);
  }
  
  send() {
    const questionText = $("#questionText").val();
    if (questionText == "") {
      return alert("请写入问题");
    }

    $("#sendBtn").attr('disabled', true);
    $("#clearBtn").attr('disabled', true);



    // openai.api_key = "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";
    // openai.Completion.create({
    //   engine: "davinci",
    //   prompt: questionText,
    //   temperature: 0.5,
    //   max_tokens: 100,
    // }).
    fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: questionText,
        max_tokens: 500,
        temperature: 0.5,
        n: 1,
        stop: null,
      })
    }).then(async (response) => {
      console.info(response);
      if (response.status == 200) {

        const responseData = await response.json();
        console.log(responseData);

        // 送信成功
        this.state.chatHistoryList.push({
          question: questionText,
          answer: responseData.choices[0].text.trim()
        })
        this.setState({
          chatHistoryList: this.state.chatHistoryList
        })
        $("#questionText").val("");
      } else {
        alert("送信失败！！");
      }

    }).catch((error) => {
      console.error("エラー発生!!" );
      console.error(error);

    }).finally(() => {
      console.log("finally");
      $("#sendBtn").attr('disabled', false);
      $("#clearBtn").attr('disabled', false);
    });
  }
  
  clear() {
    this.setState({
      chatHistoryList: []
    })
  }

  render() {
    // debugger;
    return (
      <div className="App">
        <header className="App-header">
          {
            this.state.chatHistoryList.length > 0 ? 
            null:
            <div className="title-bar">
              <p>请开始你的发问</p>
            </div>
          }
          <div className="chat-history-container">
            {this.state.chatHistoryList.map((item, index) => (
            <table key={"history-" + index} className="chat-history-data">
              <tbody>
                <tr>
                  <th>YOU：</th>
                  <td>{item.question}</td>
                </tr>
                <tr>
                  <th>OpenAI：</th>
                  <td>{item.answer}</td>
                </tr>
              </tbody>
            </table>
            ))}
          </div>
          <div className="typing-box">
            <textarea id="questionText"></textarea>
          </div>
          <div className="button-box">
            <button id="sendBtn" onClick={() => {this.send(); return false;}}>发送</button>
            <button id="clearBtn" onClick={() => {this.clear(); return false;}}>清空</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;