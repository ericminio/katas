import fs from 'fs';
import path from 'path';

const content = (file) => fs.readFileSync(file).toString()
export const code = (file, name) => (new Function(`${content(file)}; return ${name};`))()
