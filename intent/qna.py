from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

class QnA:
    def __init__(self, api_key):
        # Configurar o modelo de linguagem
        self.llm = ChatGroq(
            temperature=0.8,
            model_name='llama3-8b-8192',
            api_key=api_key,
            model_kwargs={
                'top_p': 0.9,
            }
        )

        # Inicializar o historico do chat
        self.chat_history = []
        
    def get_answer(self, user_input):
        system_prompt = """
                        Você é um assistente experiente e inteligente, capaz de gerar histórias para uma variedade de temas. A ideia principal é gerar histórias
                        para uma plataforma de digitação. Você pode gerar histórias de ficção, não ficção, fantasia, mistério, romance, comédia, drama, aventura,
                        dependerá do que o usuário deseja. As histórias devem ter de 3 a 5 parágrafos, com um mínimo de 5 frases por parágrafo. Não há restrições,
                        apenas seja criativo e original.
                        """
        
        prompt = ChatPromptTemplate.from_messages([
            ('system', system_prompt),
            ('user', user_input)
        ])
        
        chain = prompt | self.llm

        response = chain.invoke({'input': user_input})

        return response.content