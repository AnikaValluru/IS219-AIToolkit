import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export function buildTimestampedFilename(input: string): string {
  const safeInput = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const name = safeInput.length > 0 ? safeInput : 'output';
  return `${timestamp}-${name}.md`;
}

export function buildTimestampedFilenameWithExt(
  input: string,
  extension: string
): string {
  const safeInput = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const name = safeInput.length > 0 ? safeInput : 'output';
  const ext = extension.startsWith('.') ? extension : `.${extension}`;
  return `${timestamp}-${name}${ext}`;
}

export function getReferencesDir(subdir?: string): string {
  return subdir
    ? path.resolve(process.cwd(), 'references', subdir)
    : path.resolve(process.cwd(), 'references');
}

export function getImagesDir(): string {
  return path.resolve(process.cwd(), 'images');
}

export async function writeReferenceFile(
  input: string,
  content: string,
  subdir?: string
): Promise<string> {
  const referencesDir = getReferencesDir(subdir);
  await mkdir(referencesDir, { recursive: true });
  const filename = buildTimestampedFilename(input);
  const filePath = path.join(referencesDir, filename);
  await writeFile(filePath, content, 'utf8');
  return filePath;
}

export async function writeImageFile(
  input: string,
  data: Buffer,
  extension = 'png'
): Promise<string> {
  const imagesDir = getImagesDir();
  await mkdir(imagesDir, { recursive: true });
  const filename = buildTimestampedFilenameWithExt(input, extension);
  const filePath = path.join(imagesDir, filename);
  await writeFile(filePath, data);
  return filePath;
}
