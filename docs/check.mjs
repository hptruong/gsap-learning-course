#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOCS_CONFIG } from './site.config.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));
const expectedFiles = new Set(DOCS_CONFIG.pages.map((page) => `${page.id}.md`));
const failures = [];

function get(object, key) {
  return key.split('.').reduce((value, segment) => value?.[segment], object);
}

for (const language of DOCS_CONFIG.languages) {
  const sourceDirectory = path.join(directory, language.code);
  const files = new Set((await fs.readdir(sourceDirectory)).filter((file) => file.endsWith('.md')));
  const locale = JSON.parse(await fs.readFile(path.join(directory, 'locale', `${language.code}.json`), 'utf8'));

  for (const file of expectedFiles) {
    if (!files.has(file) && language.required) failures.push(`${language.code}: missing ${file}`);
  }
  for (const file of files) {
    if (!expectedFiles.has(file)) failures.push(`${language.code}: unexpected ${file}`);
  }
  for (const section of DOCS_CONFIG.sections) {
    if (!get(locale, `sections.${section.id}`)) failures.push(`${language.code}: missing sections.${section.id}`);
  }
  for (const page of DOCS_CONFIG.pages) {
    for (const field of ['navTitle', 'description', 'keywords']) {
      if (!get(locale, `pages.${page.id}.${field}`)) failures.push(`${language.code}: missing pages.${page.id}.${field}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Docs schema valid: ${DOCS_CONFIG.pages.length} pages, ${DOCS_CONFIG.languages.length} languages.`);
}
