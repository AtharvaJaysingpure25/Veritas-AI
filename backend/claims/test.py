from sentence_splitter import SentenceSplitter
ob=SentenceSplitter()
text = """
TCP is a connection-oriented protocol.
UDP establishes a connection before transmission.India is my country.
www.google.com
"""
ans=ob.split(text)
print(ans)