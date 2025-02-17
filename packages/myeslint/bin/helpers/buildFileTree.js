import {promises as fs} from 'fs';
import path from 'path';

/**
 * Builds a file tree structure recursively, excluding specified names.
 *
 * @param {string} rootDir Absolute path to the project root.
 * @param {string[]} excludeNames Array of file/directory names to exclude.
 * @returns {Promise<any[]>} A promise that resolves to the file tree structure.
 */
export async function buildFileTree(rootDir, excludeNames = []) {
	const results = [];

	try {
		const files = await fs.readdir(rootDir);

		for (const file of files) {
			if (excludeNames.includes(file)) {
				continue; // Skip excluded files/directories
			}

			const absolutePath = path.join(rootDir, file);
			const relativePath = path.relative(rootDir, absolutePath).replace(/\\/g, '/'); // Normalize to Unix-style paths
			try {
				const stats = await fs.stat(absolutePath);

				if (stats.isDirectory()) {
					const children = await buildFileTree(absolutePath, excludeNames);
					results.push({
						name: file,
						type: 'directory',
						path: `/${relativePath}/`, // Ensure leading and trailing slash for directories
						children: children,
					});
				} else {
					results.push({
						name: file,
						type: 'file',
						path: `/${relativePath}`, // Ensure leading slash for files
					});
				}
			} catch (statErr) {
				console.error(`Error stating file/directory ${absolutePath}:`, statErr);
			}
		}
	} catch (readdirErr) {
		console.error(`Error reading directory ${rootDir}:`, readdirErr);
		return [];
	}

	return results;
}