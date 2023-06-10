import sys
import base64
import os
import time

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google-cloud-sdk/tts-key.json"
string = sys.argv[1] #테스트 시 주석

def tts() :

    from gtts import gTTS

    # Test Code
    #string = "안녕하세요"

    tts = gTTS(string, lang="ko")
    tts.save('{0}'.format(time.strftime('../temp/%Y-%m-%d-%H%M%S.mp3', time.localtime(time.time()))))

if __name__ == "__main__" :
    tts()