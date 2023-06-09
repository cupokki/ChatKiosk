import sys
import base64

#string = sys.argv[1] #테스트 시 주석

def tts() :

    from gtts import gTTS

    # Test Code
    string = "안녕하세요"

    tts = gTTS(string, lang="ko")
    tts.save('trans.base64')

    f = open('trans.base64', 'rb')
    file = f.read()
    data = base64.b64encode(file)
    f.close()
    result = {"data": data}

    print(result, end='')

if __name__ == "__main__" :
    tts()