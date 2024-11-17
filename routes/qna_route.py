from intent.qna import QnA
from dotenv import load_dotenv
import os
from flask import request, jsonify


load_dotenv()

api_key = os.getenv('API_KEY')

qna = QnA(
    api_key=api_key
)

def qna_function():
    try:
        user_input = request.json.get('query', '')

        # Verificar se a entrada do usuário é válida
        if not user_input:
            return jsonify({'error': 'Invalid input'}), 400
        
        # Obter a resposta
        answer = qna.get_answer(user_input)

        return jsonify({'answer': answer}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    