import fs from 'fs';

const content = (file) => fs.readFileSync(file).toString()
export const code = (file, name) => (new Function(`${content(file)}; return ${name};`))()
