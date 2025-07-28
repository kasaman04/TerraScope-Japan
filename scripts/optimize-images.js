import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const IMAGES_DIR = './public/assets/images';
const FORMATS = ['webp', 'avif'];
const SIZES = [1, 2]; // 1x and 2x

async function optimizeImages() {
  console.log('🖼️  画像最適化を開始します...');
  
  try {
    // 画像ディレクトリを再帰的に処理
    await processDirectory(IMAGES_DIR);
    console.log('✅ 画像最適化が完了しました！');
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      await optimizeImage(fullPath);
    }
  }
}

async function optimizeImage(imagePath) {
  const { dir, name, ext } = parse(imagePath);
  console.log(`  処理中: ${name}${ext}`);
  
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  
  // 各フォーマットに変換
  for (const format of FORMATS) {
    // 1x サイズ
    const outputPath1x = join(dir, `${name}.${format}`);
    
    if (!existsSync(outputPath1x)) {
      await image
        .clone()
        [format]({
          quality: format === 'webp' ? 85 : 80,
          effort: format === 'avif' ? 4 : undefined
        })
        .toFile(outputPath1x);
      console.log(`    ✓ ${format} (1x) 作成`);
    }
    
    // 2x サイズ（元画像が十分大きい場合のみ）
    if (metadata.width >= 800) {
      const outputPath2x = join(dir, `${name}@2x.${format}`);
      
      if (!existsSync(outputPath2x)) {
        await image
          .clone()
          .resize(metadata.width * 2, metadata.height * 2, {
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: true
          })
          [format]({
            quality: format === 'webp' ? 85 : 80,
            effort: format === 'avif' ? 4 : undefined
          })
          .toFile(outputPath2x);
        console.log(`    ✓ ${format} (2x) 作成`);
      }
    }
  }
  
  // 元画像の2xバージョンも作成
  if (metadata.width >= 800) {
    const outputPath2x = join(dir, `${name}@2x${ext}`);
    
    if (!existsSync(outputPath2x)) {
      await image
        .clone()
        .resize(metadata.width * 2, metadata.height * 2, {
          kernel: sharp.kernel.lanczos3,
          withoutEnlargement: true
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath2x);
      console.log(`    ✓ ${ext} (2x) 作成`);
    }
  }
}

// スクリプト実行
optimizeImages();