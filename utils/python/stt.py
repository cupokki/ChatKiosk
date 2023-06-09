import sys
import base64

encoded_voice = sys.argv[1]

# encoded_voice를 Google Cloud Speech API로 string 추출

string = encoded_voice

result = { "string" : string }

# 반환부
# 표준출력으로 반환 됨
print(result, end='')
