import React, { Component } from 'react';

import OpenAIUtil from "./utils/OpenAIUtil";

import $ from "jquery";

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatHistoryList: []
    };
  }
  
  send() {
    const questionText = $("#questionText").val();
    if (questionText == "") {
      return alert("请写入问题");
    }
    $("#sendBtn").attr('disabled', true);
    $("#clearBtn").attr('disabled', true);

    OpenAIUtil(this).sendMessage(
      questionText,
      function(_props, responseData) {
        // 送信成功
        _props.state.chatHistoryList.push({
          question: questionText,
          answer: responseData.choices[0].message.content.trim()
        })
        _props.setState({
          chatHistoryList: _props.state.chatHistoryList
        })
        $("#questionText").val("");
        $("#sendBtn").attr('disabled', false);
        $("#clearBtn").attr('disabled', false);
      },
      function() {
        $("#sendBtn").attr('disabled', false);
        $("#clearBtn").attr('disabled', false);
      },
    )
  }
  
  clear() {
    this.setState({
      chatHistoryList: []
    })
  }

  render() {
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