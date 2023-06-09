import sys
import base64
import io
import os
from google.cloud import speech

TESTFILE = "recordFile.base64"

def stt() :

    client = speech.SpeechClient()

    encoded_voice = sys.argv[1] #테스트시 주석

    string = encoded_voice #테스트시 주석

    #f = open(TESTFILE, 'rb') TestCode
    #string = f.read()
    #f.close()

    content = string
    audio = speech.RecognitionAudio(content=content)


    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="ko-KR",
    )

    response = client.recognize(config = config, audio = audio)

    for trans in response.results:
        result = {"string": trans.alternatives[0].transcript}
        print(result, end='')


if __name__ == "__main__":
    stt()