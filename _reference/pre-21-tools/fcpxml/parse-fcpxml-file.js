const xml2js = require('xml2js');
const parser = new xml2js.Parser({attrkey: "_attr"})
const fs = require('fs');

module.exports = async function (xmlPath){
  try {
    console.log("launching parser");
    var xmlString = fs.readFileSync(xmlPath, 'utf-8');
    var xmlObject = await parseString(xmlString);
    console.log(JSON.stringify(xmlObject, null, 4));
    fs.writeFileSync((process.env.TESTS_FOLDER + '/test.json'), JSON.stringify(xmlObject, null, 4))
    return xmlObject;
  } catch (e) {
    console.log(e);
  }
}

function parseString(xmlString){
  return new Promise(function(resolve, reject){
    parser.parseString(xmlString, (err, data)=> {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}
