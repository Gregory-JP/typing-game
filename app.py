from routes.qna_route import qna_function
from flask import Flask, render_template
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

PORT = os.getenv('PORT')

app = Flask(__name__)

CORS(app)

@app.route('/qna', methods=['POST'])
def qna():
    return qna_function()

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    port = int(PORT) if PORT else 5000
    app.run(host='0.0.0.0', port=port)