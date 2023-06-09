import sys
import base64

string = sys.argv[1]

# string을 Google Cloud Speech API로 소리파일을 얻어냄
# 소리파일을 base64로 디코딩

encoded_voice = string


result = { "data" : encoded_voice }

# 반환부
# 표준출력으로 반환 됨
print(result, end='')
