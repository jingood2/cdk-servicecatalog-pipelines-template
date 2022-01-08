const fs = require("fs")
const fg = require('fast-glob');

try {
  const entries = fg.sync(['**/cdk-sc-product/**/*.ts'], { dot: false });

	const entries2=fg.sync('src/cdk-sc-product/**', { onlyFiles: false, deep: 2 });
	const entries3=fg.sync('**', { onlyFiles: false, cwd: 'src/cdk-sc-product',  deep: 2 });

  const temp = entries[0].split('/');

  console.log(entries)
  console.log(temp[2], temp[3])
} catch(e) {
  console.log(e)
}
