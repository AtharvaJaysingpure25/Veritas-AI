from ollama import chat

class LLMClient:

    def generate(self, prompt):

        response = chat(
            model="qwen2.5:7b",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response["message"]["content"]