const axeSource = require('axe-core').source;
const fse = require('fs-extra');

let output = [];

const vue_axe_accessibility_test_page = async()=>{
    await browser.execute(axeSource);
    let results = await browser.executeAsync(function (done){
 
        axe.run(function (err, results){
            if (err) done (err)
            done (results)
        });
    });
    output.push(results);
     return results;
}

const vue_axe_accessibility_save_test = async()=>{
    await fse.ensureDir('reports/data/');
    await fse.writeJSONSync('reports/data/output.json',output);
}

module.exports = {vue_axe_accessibility_test_page, vue_axe_accessibility_save_test}