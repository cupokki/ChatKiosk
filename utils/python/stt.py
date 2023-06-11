import sys
import base64
import io
import os
from google.cloud import speech

RECORDFILE = "../temp/recordFile.mp3"

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google-cloud-sdk/stts-key.json"

def stt() :

    client = speech.SpeechClient()

    file_name = os.path.join(os.path.dirname(__file__), ".", RECORDFILE)

    with io.open(file_name, "rb") as audio_file:
        content = audio_file.read()
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

if __name__ == "__main__" :
    stt()