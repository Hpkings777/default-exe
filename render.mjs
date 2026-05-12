import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';
import fs from 'fs';

const entry = path.join(process.cwd(), 'src/index.tsx');
const compositionId = 'OHMS_LAW';
const outputDir = path.join(process.cwd(), 'Outputs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const output = path.join(outputDir, 'ohms-law-animation.mp4');

(async () => {
  console.log('🎬 Kivora - Ohm\'s Law Animation Renderer');
  console.log('==========================================');
  console.log('');

  console.log('Bundling...');
  const bundleUrl = await bundle({entry});

  console.log('Selecting composition...');
  const composition = await selectComposition({
    serveUrl: bundleUrl,
    id: compositionId,
  });

  if (!composition) {
    console.error('❌ Composition not found:', compositionId);
    console.log('Available compositions: OHMS_LAW');
    process.exit(1);
  }

  console.log('');
  console.log('📊 Composition Details:');
  console.log(`   Duration: ${composition.durationInFrames} frames`);
  console.log(`   FPS: ${composition.fps}`);
  console.log(`   Resolution: ${composition.width}x${composition.height}`);
  console.log(`   Total Time: ${(composition.durationInFrames / composition.fps).toFixed(1)} seconds`);
  console.log('');

  console.log('🎥 Rendering video...');
  console.log('   Output:', output);
  console.log('');

  await renderMedia({
    composition,
    serveUrl: bundleUrl,
    outputLocation: output,
  });

  console.log('');
  console.log('✅ Done! Video saved to:', output);
})();
