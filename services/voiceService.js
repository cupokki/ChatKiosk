const spawn = require('child_process').spawn;

exports.stt = (req, res) =>{
    spawn('python', ['./speech.py']);
    spawn.stdout.on('data', (data) => {
        console.log(data.toString());
        res.send(data.toString());
    })
}
exports.tts = (req, res) =>{

}
