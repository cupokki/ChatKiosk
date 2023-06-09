import sys
import base64

def tts() :
    string = sys.argv[1] #테스트 시 주석
    from gtts import gTTS

    # string = "안녕하세요"

    tts = gTTS(string, lang="ko")
    tts.save('trans.base64')

    f = open('trans.base64', 'rb')
    file = f.read()
    f.close()
    result = {"data": file}

    print(result, end='')

if __name__ == "__main__" :
    tts()