from flask import Flask, request, jsonify 
from flask_cors import CORS
import pandas as pd #讀檔跟寫入
import os #找檔案

app = Flask(__name__) #固定用法
CORS(app)
'''為了讓程式碼改動時網站可以即時更新，我網頁都是用live server，所以port會跟fetch的不太一樣，
因此特別引用CORS以允許不同來源的前端請求後段的API'''

EXCEL_FILE = "orders.xlsx"

@app.route ("/submit-order", methods=["POST"])
#指定這個route只接受HTTP POST的請求，而POST通常負責將資料(E.g.表單、訂單)傳到後端
def submit_order():
    data = request.get_json()#從flask中import request以接收前端傳來的資料(格式為JSON)
    if not data:
        return jsonify({"message": "沒有收到訂單"})#做確認點
    
    if os.path.exists(EXCEL_FILE):#先確認指定路徑的檔案是否存在
        df = pd.read_excel(EXCEL_FILE) #先讀取excel檔
        df= pd.concat([df, pd.DataFrame(data)], ignore_index=True)#利用concat合併新舊資料
    else:
        df = pd.DataFrame(data)

    df.to_excel(EXCEL_FILE, index=False) #再寫回excel
    return jsonify({"message":"訂單已存入excel"})
    #對應到scripts中的(Content-Type: application/json)，設定正確的HTTP header會傳給前端的fetch

if __name__ == "__main__": #固定用法
    app.run(debug=True)