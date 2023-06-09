import sys
import base64

string = sys.argv[1]
from gtts import gTTS

# test : string = "안녕하세요"

tts = gTTS(string, lang="ko")
tts.save('trans.base64')

f = open('trans.base64', 'rb')
file = f.read()
f.close()
result = {"data": file}

print(result, end='')
