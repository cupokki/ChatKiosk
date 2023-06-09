const { readSync } = require('fs');

const spawn = require('child_process').spawn;

exports.stt = (req, res) => {
    //디렉터리 위치가 index기준임
    //TODO: temp
    const encoded_voice = req.body.encoded_voice
    const child = spawn('python3', ['./utils/python/stt.py', encoded_voice]);
    let string = ''
    child.stdout.on('data', (chunk) => {
        string += chunk.toString();

    })
    child.on('close', (code) => {
        if (code === 0) { // 0 : 정상
            string = string.replace(/'/g, '"')
            res.json(JSON.parse(string));
        } else {
            res.status(500).json({
                message: 'Internal Server Error',
                code : code
            })
        }
    })
}
exports.tts = (req, res) => {
    //디렉터리 위치가 index기준임
    const string = req.body.string
    const child = spawn('python3', ['./utils/python/tts.py', string]);
    let encoded_voice = ''
    child.stdout.on('data', (chunk) => {
        encoded_voice += chunk.toString();
    })
    child.on('close', (code) => {
        if (code === 0) { // 0 : 정상
            encoded_voice = encoded_voice.replace(/'/g, '"')
            res.json(JSON.parse(encoded_voice)); 
        } else {
            res.status(500).json({
                message: 'Internal Server Error',
                code : code
            })
        }
    })
}