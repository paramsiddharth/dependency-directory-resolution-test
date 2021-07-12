#!/bin/node
const resolvePackagePath = require('resolve-package-path');
const path = require('path');

// console.log(import.meta.url); // Doesn't work for CommonJS
console.log(require.resolve('.')); // Always corresponds to the current script
// console.log(module.path); // Unreliable
console.log(process.argv[1]); // Corresponds to the current script/binary; Depending on execution format, the extension might be stripped off, or the symlink might be pointed to

/* 
// The following is the ESM counterpart:

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
*/
console.log(__dirname); // Always corresponds to the place where the module is installed

console.log(process.cwd()); // Always corresponds to the current working directory
console.log();
for (const mod of [
	'css-spinners',
	'axios',
	'json5',
	'downloadjs',
	'easy-social-share-links'
]) {
	try {
		console.log(require.resolve(mod)); // Unreliable; Returns the default exported script, and if none, throws an error
	} catch(e) {
		console.log(e.message);
	}
	try {
		console.log(path.dirname(resolvePackagePath(mod, __dirname))); // Always works, returns the dependency installation path
	} catch(e) {
		console.log(e.message);
	}
	console.log();
}