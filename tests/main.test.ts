import * as assert from 'assert';
import { exec } from 'child_process';
import { promisify } from 'util';
import dirTreeObj from 'dir-tree-obj';

const execAsync = promisify(exec);

async function t(args: string[]) {
  await execAsync(`node "./dist/main.js" ${args.map((s) => `"${s}"`).join(' ')}`);
}

// Returns a source file path.
function sf(name: string): string {
  return `./tests/data/${name}`;
}

// Returns a dest file path.
function df(name: string): string {
  return `./tests/tmp/${name}`;
}

it('One type', async () => {
  const dest = df(`${Date.now().toString()}`);
  await t([sf(''), '**/*', 'png', dest]);
  assert.deepStrictEqual(await dirTreeObj(dest), {
    '.': ['a.auto.png', 'a.png'],
    dir: { '.': ['a.auto.png', 'a.png'] },
  });
});
