# # from client import LLMClient

# # llm = LLMClient()

# # response = llm.generate(
# #     "Return a JSON array containing Earth revolves around the Sun."
# # )

# # print(response)
# from ollama import chat

# response = chat(
#     model="qwen2.5:7b",
#     messages=[
#         {
#             "role": "user",
#             "content": "Say hello"
#         }
#     ]
# )

# print(response["message"]["content"])
from ollama import chat

response = chat(
    model="qwen2.5:7b",
    messages=[
        {
            "role": "user",
            "content": "Return only the word SUCCESS"
        }
    ]
)

print(response["message"]["content"])