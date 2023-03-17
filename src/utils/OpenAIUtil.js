
function OpenAIUtil(_props) {

    return {
        /**
         * OpenAIへメッセージを送信する
         * 
         * @param {String}   message      送信メッセージ
         * @param {Function} callbackFunc 成功した時に実行する処理
         * @param {Function} errorFunc    失敗した時に実行する処理
         */
        sendMessage: function(message, callbackFunc = null, errorFunc = null) {

            /** チャットAPIのURL */
            const CHAT_API_URL = "https://api.openai.com/v1/chat/completions";
        
            const API_KEY = "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";

            fetch(CHAT_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": message}]
                })
            }).then(async (response) => {
                console.debug(response)
                
                if (response.status == 200 && callbackFunc != null) {
                    const responseData = await response.json();
                    console.debug(responseData);
                    callbackFunc(_props, responseData);
                    return;
                }
    
                if (response.status != 200) {
                    console.error("エラー発生!!" );
                    console.error("status:" + response.status);
                    if (errorFunc != null) {
                        errorFunc();
                    }
                }
            }).catch((error) => {
                console.error("エラー発生!!" );
                console.error(error);
                if (errorFunc != null) {
                    errorFunc();
                }
    
            }).finally(() => {
            });
        }
    }
}

export default OpenAIUtil;
