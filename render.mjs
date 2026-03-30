import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';

const entry = path.join(process.cwd(), 'src/index.tsx');
const compositionId = 'DEFAULT_EXE';
const output = path.join(process.cwd(), 'out.mp4');

(async () => {
  console.log('Bundling...');
  const bundleUrl = await bundle({entry});

  console.log('Selecting composition...');
  const composition = await selectComposition({
    serveUrl: bundleUrl,
    id: compositionId,
  });

  console.log('Rendering...');
  await renderMedia({
    composition,
    serveUrl: bundleUrl,
    outputLocation: output,
  });

  console.log('Done:', output);
})();
