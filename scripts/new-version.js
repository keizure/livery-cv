#!/usr/bin/env node
import prompts from 'prompts';
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
const versionsPath = resolve(dataDir, 'versions.json');

// Read versions.json
let versionsData;
try {
  versionsData = JSON.parse(readFileSync(versionsPath, 'utf-8'));
} catch {
  console.error(`Error: could not read ${versionsPath}`);
  process.exit(1);
}

const existingIds = versionsData.versions.map(v => v.id);

const response = await prompts(
  [
    {
      type: 'text',
      name: 'id',
      message: '版本 ID（ASCII，如 internet）',
      validate: value => {
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) return '只允许 ASCII 字母、数字、连字符或下划线';
        if (existingIds.includes(value)) return `版本 "${value}" 已存在`;
        return true;
      }
    },
    {
      type: 'text',
      name: 'label',
      message: '版本显示名称（如 互联网版）',
      validate: value => value.trim() ? true : '不能为空'
    },
    {
      type: 'select',
      name: 'base',
      message: '基于哪个版本复制',
      choices: versionsData.versions.map(v => ({ title: v.label, value: v.id })),
      initial: 0
    }
  ],
  { onCancel: () => process.exit(0) }
);

const { id, label, base } = response;

// Copy both language files
for (const lang of ['zh', 'en']) {
  const srcFile = base === 'default'
    ? resolve(dataDir, `resume.${lang}.json`)
    : resolve(dataDir, `resume.${lang}.${base}.json`);

  if (!existsSync(srcFile)) {
    console.error(`Error: source file not found: ${srcFile}`);
    process.exit(1);
  }

  copyFileSync(srcFile, resolve(dataDir, `resume.${lang}.${id}.json`));
  console.log(`✓ Created: src/data/resume.${lang}.${id}.json`);
}

// Update versions.json
versionsData.versions.push({ id, label });
writeFileSync(versionsPath, JSON.stringify(versionsData, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated: src/data/versions.json`);
console.log(`\nNext: edit src/data/resume.zh.${id}.json and resume.en.${id}.json`);
