import sys
import base64

encoded_voice = sys.argv[1]


result = { "data" : sys.argv[1] }

# 반환부
# 표준출력으로 반환 됨
print(result, end='')
