from routes.qna_route import qna_function
from flask import Flask, render_template
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

@app.route('/qna', methods=['POST'])
def qna():
    return qna_function()

@app.route('/')
def home():
    return render_template('index.html')