import {promises as fs} from 'fs';
import path from 'path';


export async function buildFileTree(dir) {
	const results = []
	const files = await fs.readdir(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stats = await fs.stat(filePath);

		if (stats.isDirectory()) {
			const children = await buildFileTree(filePath);
			results.push({
				name: file,
				type: 'directory',
				path: filePath,
				children: children
			})
		} else {
			results.push({
				name: file,
				type: 'file',
				path: filePath
			})
		}
	}

	return results;
}