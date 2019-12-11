import sass from 'node-sass';
import fs from 'fs';
import path from 'path';
import dirname from '../crutches/dirname.cjs';

/* handle paths  */
const buildPath = path.resolve(dirname, '../../../public/vue_test.css');
const tmpPath = path.resolve(dirname, '../../tmp/bootstrap_bundle.min.css');
const sourcePath = path.resolve(dirname, '../../scss/style.scss');

/* prepare config  */
const config = {
    file: sourcePath,
    outputStyle: 'expanded',
    outFile: buildPath,
    //outFile: boostrapTmpPath,
};

const completedCallback = async (error, result) => {
    if(error) {
        console.log(error);
        return;
    }

    fs.writeFile(buildPath,result.css, async (err) => {
        if(err) console.log(err);
        else {
            console.log('css deployment completed successfully to: '+buildPath)
        }
    });
};

console.log('start render');
sass.render(config, completedCallback);
