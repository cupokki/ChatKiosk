import sys
import base64
import io
import os
from google.cloud import speech

client = speech.SpeechClient()

encoded_voice = sys.argv[1]

string = encoded_voice

content = string
audio = speech.RecognitionAudio(content=content)


config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code="ko-KR",
)

response = client.recognize(config = config, audio = audio)

for trans in response.results:
    result = {trans.alternatives[0].transcript: string}
    print(result, end='')
