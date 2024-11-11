const fs = require("fs");
const { parse } = require("csv-parse");
const { Transform } = require('stream');

const DATA_START_LINE = 2;
const DELIMIER = ',';

let data = [];
// Create a stream to remove BOM (if any) which is 
// an invisible marker that some editors or systems 
// add to the beginning of UTF-8 encoded files to signify their encoding
const removeBOM = new Transform({
  transform(chunk, encoding, callback) {
    let data = chunk.toString('utf8');
    
    // Remove BOM if it exists at the beginning of the file
    if (data.charCodeAt(0) === 0xFEFF) {
      data = data.slice(1); // Remove BOM
    }
    
    this.push(data);
    callback();
  }
});

const fetchData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream("../chuyen_khoan.csv")
      .pipe(removeBOM)
      .pipe(parse({ delimiter: DELIMIER, from_line: DATA_START_LINE }))
      .on("data", (row) => {
        data.push(
          {
            "data_time" : row[0],
            "trans_no" : parseInt(row[1]),
            "credit" : parseInt(row[2]),
            "debit" : parseInt(row[3]),
            "detail" : row[4]
          }
        )
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (err) => {
        reject(err);
      });
  })
}

module.exports = { fetchData };

