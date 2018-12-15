const fs = require('fs')

fs.readFile("../wordlists/english.txt", "utf8", createBinaryWordlistMap)

function createBinaryWordlistMap(err, fileData) {
  const wordlist = fileData.toString().split('\n')
  let output = "{"

  for(let i = 0; i < 2048; i++) {
    const binaryNum = (`00000000000${i.toString(2)}`).substr(-11);
    output += `"${wordlist[i]}":"${binaryNum}",\n`
  }

  output = output.substring(0, output.length-2);
  output += "}"

  console.log(output)

  const data = new Uint8Array(Buffer.from(output));
  fs.writeFile("../wordlists/english-decode.json", data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
}
