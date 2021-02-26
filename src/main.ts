#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { promises as fsPromises } from 'fs';
import * as nodepath from 'path';
import fg from 'fast-glob';
import fileType from 'file-type';
import normalizePath from 'normalize-path';

try {
  const args = process.argv.slice(2);
  if (args.length !== 4) {
    throw new Error(
      'Usage: <source directory> <glob> <comma separated types> <destination directory>',
    );
  }

  const sourceDir = nodepath.resolve(args[0]!);
  const glob = normalizePath(nodepath.join(sourceDir, args[1]!));
  const types = new Set<string>(args[2]!.split(','));
  const destDir = args[3]!;

  console.log(`Searching with glob: ${glob}\nTypes: ${[...types]}`);
  const files = await fg(glob, { absolute: true });
  console.log(`${files.length} file(s) found by glob`);

  let extracted = 0;
  await Promise.all(
    files.map(async (file) => {
      const type = await fileType.fromFile(file);
      if (!type) {
        return;
      }
      const { ext } = type;
      console.log(`Detected type "${ext}": ${file}`);
      if (!types.has(ext)) {
        return;
      }
      const actualExt = nodepath.extname(file);
      const appendExt = actualExt !== `.${ext}`;

      const relPath = nodepath.relative(sourceDir, file);
      const destPath = nodepath.resolve(destDir, relPath);

      await fsPromises.mkdir(nodepath.dirname(destPath), { recursive: true });
      await fsPromises.copyFile(file, destPath + (appendExt ? `.auto.${ext}` : ''));
      extracted++;
    }),
  );

  console.log(`${extracted} file(s) extracted`);
} catch (err) {
  console.error(err.message);
}
