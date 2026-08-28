#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { DOCS_CONFIG } from './site.config.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.join(directory, '_site');
const localeDirectory = path.join(directory, 'locale');
const manifest = DOCS_CONFIG;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}
function slugify(value) { return value.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

const renderer = new marked.Renderer();
renderer.heading = ({ text, depth }) => `<h${depth} id="${slugify(text)}">${marked.parseInline(text)}</h${depth}>`;
renderer.code = ({ text, lang }) => {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  const code = language === 'plaintext' ? escapeHtml(text) : hljs.highlight(text, { language }).value;
  return `<div class="code-block"><div class="code-block-header"><span><i></i>${escapeHtml(language)}</span><button class="copy-btn" type="button" data-copy-code data-copied-label="Copied" data-copy-failed-label="Copy failed">Copy</button></div><pre><code class="hljs language-${escapeHtml(language)}">${code}</code></pre></div>`;
};
marked.use({ gfm: true, renderer });

function toc(markdown) {
  const headings = [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)];
  if (!headings.length) return '';
  return `<nav class="toc-sidebar" aria-label="On this page"><p>ON THIS PAGE</p><ul>${headings.map(([, hashes, raw]) => {
    const label = raw.replace(/[*`]/g, '');
    return `<li class="toc-level-${hashes.length}"><a href="#${slugify(label)}">${escapeHtml(label)}</a></li>`;
  }).join('')}</ul></nav>`;
}
async function readPage(page, language) {
  for (const candidate of manifest.languages.find((item) => item.code === language).fallback) {
    try {
      const markdown = await fs.readFile(path.join(directory, candidate, `${page.id}.md`), 'utf8');
      return { markdown, fallback: candidate !== language ? candidate : null };
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  throw new Error(`Missing document: ${language}/${page.id}.md`);
}
function sidebarShell() {
  return `<div class="sidebar-brand"><a class="sidebar-logo" href="/index.html"><span class="logo-mark"><i></i><i></i><i></i></span><span>GSAP <span>Studio</span></span></a><button class="sidebar-close" type="button" data-action="menu" aria-label="Close navigation">×</button></div><div class="course-progress" data-course-progress></div><nav class="sidebar-nav" id="sidebar-nav" aria-label="Course navigation"></nav><div class="sidebar-footer"><a href="/roadmap.html">✦ Learning roadmap</a><a href="/glossary.html">◌ GSAP glossary</a></div>`;
}
function headerShell() {
  return `<header class="header"><div class="header-left"><button class="mobile-menu-btn" type="button" data-action="menu" aria-label="Open navigation"><i class="fas fa-bars"></i></button><a class="header-home" href="/index.html">GSAP Learning Path</a></div><div class="header-center"><button class="search-trigger" type="button" data-action="search"><i class="fas fa-search"></i><span data-i18n="nav.searchPlaceholder"></span><kbd>⌘ K</kbd></button></div><div class="header-right"><a href="https://gsap.com/docs/v3/" target="_blank" rel="noreferrer" class="docs-link" data-i18n="nav.gsapDocs"></a><button class="lang-toggle" type="button" data-action="language" id="lang-toggle" aria-label="Switch language"></button><button class="theme-toggle" type="button" data-action="theme" aria-label="Toggle theme"><i class="fas fa-sun"></i></button></div></header>`;
}
function dialogShell() {
  return `<div class="search-overlay" id="searchOverlay"><section class="search-modal" role="dialog" aria-modal="true" aria-label="Search"><div class="search-input-wrapper"><i class="fas fa-search"></i><input class="search-input" type="search" id="searchInput" autocomplete="off" data-i18n-placeholder="nav.searchPlaceholder"><kbd>ESC</kbd></div><div class="search-results" id="searchResults"></div></section></div>`;
}
function documentHead(title, description) {
  return `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)} | GSAP Learning</title><meta name="description" content="${escapeHtml(description)}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><link rel="stylesheet" href="/theme.css"></head>`;
}
function shell({ pageId, main, title = 'GSAP Learning Course' }) {
  const docs = JSON.stringify({ pageId, manifest });
  return `<!doctype html><html lang="${manifest.defaultLanguage}" data-theme="dark">${documentHead(title, 'A hands-on, bilingual GSAP course from first tween to production motion.')}<body><div class="layout"><aside class="sidebar" id="sidebar">${sidebarShell()}</aside><div class="main-wrapper">${headerShell()}${main}</div></div>${dialogShell()}<script>window.__DOCS__=${docs};</script><script src="/app.js"></script></body></html>`;
}
function pageShell(page, source) {
  return shell({ pageId: page.id, title: source.title, main: `<main class="content lesson-content" id="page-content">${source.html}</main><aside id="page-toc"></aside>` });
}
function indexShell() {
  const main = `<main class="home-content"><section class="hero"><div class="hero-orbit orbit-a"></div><div class="hero-orbit orbit-b"></div><div class="hero-content"><p class="home-eyebrow"><span></span><span data-i18n="hero.badge"></span></p><h1>Build motion<br>that <em>means</em> something.</h1><p class="hero-copy" data-i18n="hero.description"></p><div class="hero-actions"><a class="button-primary" href="/00-introduction.html" data-i18n="hero.startLearning"></a><a class="button-text" href="/roadmap.html"><span data-i18n="hero.roadmap"></span> <i>↗</i></a></div><div class="hero-stats"><div><strong>16</strong><span data-i18n="learning.lessons"></span></div><div><strong>3</strong><span data-i18n="learning.tracksLabel"></span></div><div><strong>0 → ∞</strong><span data-i18n="learning.levels"></span></div></div></div><div class="hero-visual" aria-hidden="true"><div class="visual-window"><div class="visual-top"><i></i><i></i><i></i><span>intro-animation.js</span></div><div class="visual-stage"><span class="stage-label">playhead</span><div class="stage-line"><i></i></div><div class="motion-shape shape-square"></div><div class="motion-shape shape-circle"></div><div class="motion-shape shape-diamond"></div></div><div class="visual-timeline"><span></span><i></i><b></b><em></em></div></div><p>Make the browser feel alive<br><span>without losing control.</span></p></div></section><section class="path-intro"><div><p class="section-eyebrow" data-i18n="learning.curriculumLabel"></p><h2 data-i18n="toc.courseContent"></h2></div><p data-i18n="learning.curriculumDescription"></p></section><section class="course-overview" id="course-grid"></section></main>`;
  return shell({ pageId: '__index__', main });
}
async function build() {
  await fs.rm(siteDirectory, { recursive: true, force: true });
  await fs.mkdir(path.join(siteDirectory, 'content'), { recursive: true });
  await fs.mkdir(path.join(siteDirectory, 'locale'), { recursive: true });
  for (const page of manifest.pages) {
    const bundle = {};
    for (const language of manifest.languages) {
      const document = await readPage(page, language.code);
      const title = document.markdown.match(/^#\s+(.+)$/m)?.[1] ?? page.id;
      bundle[language.code] = { title, html: marked.parse(document.markdown), toc: toc(document.markdown), fallback: document.fallback };
    }
    await fs.writeFile(path.join(siteDirectory, 'content', `${page.id}.json`), JSON.stringify(bundle), 'utf8');
    await fs.writeFile(path.join(siteDirectory, `${page.id}.html`), pageShell(page, bundle[manifest.defaultLanguage]), 'utf8');
  }
  await fs.writeFile(path.join(siteDirectory, 'index.html'), indexShell(), 'utf8');
  await fs.writeFile(path.join(siteDirectory, 'site-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  await Promise.all(['app.js', 'theme.css'].map((file) => fs.copyFile(path.join(directory, file), path.join(siteDirectory, file))));
  await Promise.all(manifest.languages.map((language) => fs.copyFile(path.join(localeDirectory, `${language.code}.json`), path.join(siteDirectory, 'locale', `${language.code}.json`))));
  console.log(`Built ${manifest.pages.length} pages for ${manifest.languages.length} languages.`);
}
build().catch((error) => { console.error(error); process.exitCode = 1; });
