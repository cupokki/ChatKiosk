const spawn = require('child_process').spawn;

exports.stt = (req, res) => {
    //디렉터리 위치가 index기준임
    //TODO: temp
    if(!req.files){
        res.status(400).json({
            message : 'No files were uploaded'
        })
    }
    console.log(req.files.file)
    
    const child = spawn('python3', ['./utils/python/stt.py']);
    let result = ''
    child.stdout.on('data', (chunk) => {
        result += chunk.toString();

    })
    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      console.log(1)
    child.stdin.write(req.files.file.data);
    // child.stdin.write("test");
    child.stdin.end();
    console.log(2)
    child.on('close', (code) => {
        console.log(3)
        console.log(result)
        if (code === 0) { // 0 : 정상
            result = result.replace(/'/g, '"')
            
            res.json({
                string : result
            });
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
    let result = ''
    child.stdout.on('data', (chunk) => {
        result += chunk.toString();
    })
    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    child.on('close', (code) => {
        if (code === 0) { // 0 : 정상
            result = result.replace(/'/g, '"')
            res.json({
                file_name : result
            }); 
        } else {
            res.status(500).json({
                message: 'Internal Server Error',
                code : code
            })
        }
    })
}