const DOCS = window.__DOCS__;
const { defaultLanguage, languages, pages, sections } = DOCS.manifest;
const LANGUAGE_KEY = 'gsap-docs-language';
const PROGRESS_KEY = 'gsap-learning-completed-v1';
const cache = { bundles: new Map(), locales: new Map() };
let currentLanguage = defaultLanguage;
let tocScrollHandler;

const learningPages = pages.filter((page) => page.order >= 0 && page.order < 16);
const trackFor = (page) => page.order <= 4 ? 'foundation' : page.order <= 8 ? 'interaction' : 'advanced';
const trackOrder = ['foundation', 'interaction', 'advanced'];

function text(object, path, fallback = path) {
  return path.split('.').reduce((value, key) => value?.[key], object) ?? fallback;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}
function languageConfig(code) { return languages.find((language) => language.code === code) ?? languages[0]; }
function pageHref(page) { return `/${page.id}.html`; }
function isLesson(page) { return page && page.order >= 0 && page.order < 16; }
function lessonNumber(page) { return String(page.order + 1).padStart(2, '0'); }
function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]')); } catch { return new Set(); }
}
function writeProgress(progress) { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...progress])); }
function progressPercent() { return Math.round((readProgress().size / learningPages.length) * 100); }

async function fetchJson(url, targetCache, key) {
  if (targetCache.has(key)) return targetCache.get(key);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to load ${url}`);
  const data = await response.json();
  targetCache.set(key, data);
  return data;
}
const fetchLocale = (language) => fetchJson(`/locale/${language}.json`, cache.locales, language);
const fetchBundle = (pageId) => fetchJson(`/content/${pageId}.json`, cache.bundles, pageId);

function getPreferredTheme() { return localStorage.getItem('gsap-docs-theme') ?? 'dark'; }
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('gsap-docs-theme', theme);
  const icon = document.querySelector('.theme-toggle i');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function statusText(locale, complete) { return complete ? text(locale, 'learning.done') : text(locale, 'learning.inProgress'); }
function renderProgress(locale) {
  const progress = readProgress();
  const count = progress.size;
  const percentage = progressPercent();
  document.querySelectorAll('[data-course-progress]').forEach((element) => {
    element.innerHTML = `<div class="progress-copy"><span>${escapeHtml(text(locale, 'learning.yourProgress'))}</span><strong>${count}/${learningPages.length}</strong></div><div class="progress-rail"><span style="width:${percentage}%"></span></div><small>${percentage}% ${escapeHtml(text(locale, 'learning.complete'))}</small>`;
  });
}

function renderSidebar(locale) {
  const completed = readProgress();
  const sectionMarkup = sections.map((section) => {
    const sectionPages = pages.filter((page) => page.section === section.id);
    if (!sectionPages.length) return '';
    const pageMarkup = sectionPages.map((page) => {
      const label = text(locale, `pages.${page.id}.navTitle`, page.id);
      const active = page.id === DOCS.pageId ? ' active' : '';
      const done = completed.has(page.id) ? ' is-complete' : '';
      const badge = isLesson(page) ? `<span class="nav-number">${lessonNumber(page)}</span>` : '<span class="nav-dot"></span>';
      return `<a class="sidebar-link${active}${done}" href="${pageHref(page)}">${badge}<span>${escapeHtml(label)}</span>${completed.has(page.id) ? '<i class="fas fa-check"></i>' : ''}</a>`;
    }).join('');
    return `<section class="sidebar-section"><h2 class="sidebar-section-title">${escapeHtml(text(locale, `sections.${section.id}`, section.id))}</h2>${pageMarkup}</section>`;
  }).join('');
  document.getElementById('sidebar-nav').innerHTML = sectionMarkup;
  renderProgress(locale);
}

function renderPageNavigation(locale) {
  const lessonIndex = learningPages.findIndex((page) => page.id === DOCS.pageId);
  if (lessonIndex === -1) return '';
  const previous = learningPages[lessonIndex - 1];
  const next = learningPages[lessonIndex + 1];
  return `<nav class="page-nav" aria-label="${escapeHtml(text(locale, 'nav.lessonNavigation'))}">${previous ? `<a href="${pageHref(previous)}"><span class="page-nav-label">← ${escapeHtml(text(locale, 'nav.previous'))}</span><strong>${escapeHtml(text(locale, `pages.${previous.id}.navTitle`, previous.id))}</strong></a>` : '<span></span>'}${next ? `<a class="next" href="${pageHref(next)}"><span class="page-nav-label">${escapeHtml(text(locale, 'nav.next'))} →</span><strong>${escapeHtml(text(locale, `pages.${next.id}.navTitle`, next.id))}</strong></a>` : ''}</nav>`;
}

function courseCard(page, locale) {
  const entry = text(locale, `pages.${page.id}`, {});
  const complete = readProgress().has(page.id);
  return `<a class="curriculum-item${complete ? ' is-complete' : ''}" href="${pageHref(page)}"><span class="curriculum-number">${lessonNumber(page)}</span><span class="curriculum-copy"><strong>${escapeHtml(entry.navTitle ?? page.id)}</strong><small>${escapeHtml(entry.description ?? '')}</small></span><span class="curriculum-state">${complete ? '<i class="fas fa-check"></i>' : '→'}</span></a>`;
}
function renderCourseGrid(locale) {
  const grid = document.getElementById('course-grid');
  if (!grid) return;
  grid.innerHTML = trackOrder.map((track) => {
    const trackPages = learningPages.filter((page) => trackFor(page) === track);
    const label = text(locale, `learning.tracks.${track}.label`);
    const title = text(locale, `learning.tracks.${track}.title`);
    const description = text(locale, `learning.tracks.${track}.description`);
    return `<section class="track track-${track}"><div class="track-heading"><span>${escapeHtml(label)}</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p><b>${trackPages.length} ${escapeHtml(text(locale, 'learning.lessons'))}</b></div><div class="curriculum-list">${trackPages.map((page) => courseCard(page, locale)).join('')}</div></section>`;
  }).join('');
}

function lessonMeta(page, locale) {
  const track = trackFor(page);
  const time = page.order <= 4 ? 25 : page.order <= 8 ? 40 : 50;
  return `<div class="lesson-context"><a href="/index.html">${escapeHtml(text(locale, 'learning.courseName'))}</a><span>/</span><span>${escapeHtml(text(locale, `learning.tracks.${track}.title`))}</span></div><div class="lesson-kicker"><span class="lesson-index">${lessonNumber(page)}</span><span>${escapeHtml(text(locale, 'learning.lesson'))}</span><span class="lesson-dot">•</span><span>${time} ${escapeHtml(text(locale, 'learning.minutes'))}</span></div>`;
}
function learningCanvas(page) {
  const vi = currentLanguage === 'vi';
  const copy = vi ? { label: 'Motion lab', title: 'Chạm, thay đổi, rồi quan sát', hint: 'Lab nhỏ này giúp bạn nhìn thấy state thay đổi trước khi đọc API.', run: 'Chạy lại', initial: 'State ban đầu', final: 'State sau tween' } : { label: 'Motion lab', title: 'Touch, change, then observe', hint: 'Use this small lab to see a state change before reading the API.', run: 'Run again', initial: 'Initial state', final: 'State after tween' };
  const shell = (body) => `<section class="motion-lab" data-lab="${page.id}"><div class="motion-lab-head"><div><span>${copy.label}</span><h2>${copy.title}</h2></div><p>${copy.hint}</p></div>${body}</section>`;
  if (page.id === '01-basics') return shell(`<div class="lab-controls" role="group" aria-label="Tween method"><button data-method="to" class="is-selected">gsap.to()</button><button data-method="from">gsap.from()</button><button data-method="fromTo">gsap.fromTo()</button><button data-method="set">gsap.set()</button></div><div class="lab-stage"><div class="lab-grid"></div><div class="lab-card">GSAP</div><div class="lab-axis"><span>0px</span><span>160px</span></div></div><div class="lab-caption"><span>${copy.initial}</span><code data-lab-code>gsap.to(&quot;.card&quot;, { x: 160, rotation: 8 })</code><button data-lab-run>${copy.run} ↗</button></div>`);
  if (page.id === '02-easing') return shell(`<div class="ease-lab"><div class="ease-row" data-ease="none"><span>none</span><i><b></b></i></div><div class="ease-row" data-ease="power2.out"><span>power2.out</span><i><b></b></i></div><div class="ease-row" data-ease="power3.inOut"><span>power3.inOut</span><i><b></b></i></div><div class="ease-row" data-ease="back.out(1.5)"><span>back.out</span><i><b></b></i></div></div><div class="lab-caption"><span>${copy.initial}</span><code>duration: 1, ease: &quot;power2.out&quot;</code><button data-lab-run>${copy.run} ↗</button></div>`);
  if (page.id === '04-timeline') return shell(`<div class="timeline-lab"><div class="timeline-preview"><span class="lab-dot dot-one"></span><span class="lab-dot dot-two"></span><span class="lab-dot dot-three"></span></div><div class="timeline-ruler"><i></i><b>intro</b><em>content</em><strong>action</strong></div></div><div class="lab-caption"><span>label → position parameter → playback</span><code>tl.addLabel(&quot;intro&quot;).from(...)</code><button data-lab-run>${copy.run} ↗</button></div>`);
  if (page.id === '05-scroll-trigger') return shell(`<div class="scroll-lab"><div class="scroll-viewport"><span>viewport</span><div class="scroll-trigger-box">trigger</div><i></i><b></b></div><input type="range" min="0" max="100" value="20" aria-label="Scroll progress"><div class="scroll-labels"><span>start: top 80%</span><span>end: bottom 20%</span></div></div><div class="lab-caption"><span>${vi ? 'Kéo thanh để mô phỏng vị trí trigger trong viewport.' : 'Move the slider to simulate the trigger position in the viewport.'}</span><code>start: &quot;top 80%&quot;</code></div>`);
  if (page.id === '08-react') return shell(`<div class="react-lab"><div class="react-flow"><button class="is-selected" data-react-tab="render">1. React render</button><i>→</i><button data-react-tab="scope">2. useGSAP scope</button><i>→</i><button data-react-tab="revert">3. revert on unmount</button></div><div class="react-explanation" data-react-copy>${vi ? 'React tạo DOM trước. GSAP chỉ chạy trong useGSAP sau khi component đã render.' : 'React creates the DOM first. GSAP runs in useGSAP only after the component has rendered.'}</div></div><div class="lab-caption"><span>React + TypeScript</span><code>useGSAP(() =&gt; { ... }, { scope: root })</code></div>`);
  if (page.id === '12-awwwards-patterns') return shell(`<div class="pattern-lab"><div class="pattern-layer layer-image">image / content</div><div class="pattern-layer layer-mask">clip-path mask</div><div class="pattern-layer layer-type">readable type</div><div class="pattern-check"><span>01 content first</span><span>02 motion second</span><span>03 fallback always</span></div></div><div class="lab-caption"><span>${vi ? 'Tắt từng layer: nếu nội dung không còn hiểu được, pattern chưa đủ tốt.' : 'Turn layers off: if the content stops making sense, the pattern is not ready.'}</span><code>progressive enhancement</code></div>`);
  return shell(`<div class="practice-loop"><div><b>01</b><strong>${vi ? 'Quan sát' : 'Observe'}</strong><span>${vi ? 'Chạy ví dụ nguyên vẹn.' : 'Run the example unchanged.'}</span></div><div><b>02</b><strong>${vi ? 'Dự đoán' : 'Predict'}</strong><span>${vi ? 'Đổi một giá trị, rồi kiểm tra.' : 'Change one value, then verify.'}</span></div><div><b>03</b><strong>${vi ? 'Chứng minh' : 'Prove it'}</strong><span>${vi ? 'Hoàn thành checkpoint từ file trống.' : 'Complete the checkpoint from a blank file.'}</span></div></div><label class="lab-check"><input type="checkbox"> <span>${vi ? 'Tôi đã chạy ví dụ, thay một value và kiểm tra fallback.' : 'I ran the example, changed one value, and checked the fallback.'}</span></label>`);
}
function ensureGsap(callback) {
  if (window.gsap) return callback();
  const script = document.createElement('script'); script.src = 'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js'; script.onload = callback; document.head.append(script);
}
function initLearningLabs() {
  const lab = document.querySelector('.motion-lab'); if (!lab) return;
  const run = () => ensureGsap(() => {
    const id = lab.dataset.lab;
    if (id === '01-basics') { const card = lab.querySelector('.lab-card'); const method = lab.querySelector('.lab-controls .is-selected')?.dataset.method || 'to'; gsap.killTweensOf(card); gsap.set(card, { x: 0, rotation: 0, autoAlpha: 1 }); if (method === 'from') gsap.from(card, { x: 160, rotation: 8, duration: .75, ease: 'power2.out' }); else if (method === 'fromTo') gsap.fromTo(card, { x: -100, rotation: -8, autoAlpha: 0 }, { x: 160, rotation: 8, autoAlpha: 1, duration: .75, ease: 'power2.out' }); else if (method === 'set') gsap.set(card, { x: 160, rotation: 8 }); else gsap.to(card, { x: 160, rotation: 8, duration: .75, ease: 'power2.out' }); }
    if (id === '02-easing') { lab.querySelectorAll('.ease-row').forEach((row) => { const dot = row.querySelector('b'); gsap.killTweensOf(dot); gsap.set(dot, { x: 0 }); gsap.to(dot, { x: () => row.querySelector('i').clientWidth - 14, duration: 1.15, ease: row.dataset.ease }); }); }
    if (id === '04-timeline') { const dots = lab.querySelectorAll('.lab-dot'); gsap.killTweensOf(dots); gsap.set(dots, { x: 0, autoAlpha: 0, scale: .4 }); gsap.timeline({ defaults: { ease: 'power2.out' } }).to(dots[0], { autoAlpha: 1, scale: 1, x: 44, duration: .35 }).to(dots[1], { autoAlpha: 1, scale: 1, x: 94, duration: .35 }, '<.12').to(dots[2], { autoAlpha: 1, scale: 1, x: 142, duration: .35 }, '<.12'); }
  });
  lab.querySelector('[data-lab-run]')?.addEventListener('click', run);
  lab.querySelectorAll('[data-method]').forEach((button) => button.addEventListener('click', () => { lab.querySelectorAll('[data-method]').forEach((item) => item.classList.toggle('is-selected', item === button)); lab.querySelector('[data-lab-code]').textContent = `gsap.${button.dataset.method}(".card", { x: 160 })`; run(); }));
  lab.querySelector('.scroll-lab input')?.addEventListener('input', (event) => { const value = event.target.value; lab.querySelector('.scroll-trigger-box').style.transform = `translateY(${value * 1.45}px)`; lab.querySelector('.scroll-viewport i').style.top = `${value}%`; });
  lab.querySelectorAll('[data-react-tab]').forEach((button) => button.addEventListener('click', () => { lab.querySelectorAll('[data-react-tab]').forEach((item) => item.classList.toggle('is-selected', item === button)); const messages = currentLanguage === 'vi' ? { render: 'React tạo DOM trước. GSAP chỉ chạy trong useGSAP sau khi component đã render.', scope: 'scope: root cô lập selector trong component; .card không thể match nhầm nơi khác.', revert: 'useGSAP tự revert tween và ScrollTrigger khi component unmount.' } : { render: 'React creates DOM first. GSAP runs in useGSAP only after the component renders.', scope: 'scope: root keeps selectors inside the component, so .card cannot match elsewhere.', revert: 'useGSAP reverts tweens and ScrollTriggers when the component unmounts.' }; lab.querySelector('[data-react-copy]').textContent = messages[button.dataset.reactTab]; }));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !['05-scroll-trigger', '08-react', '12-awwwards-patterns'].includes(lab.dataset.lab)) run();
}
function decorateLesson(locale, page) {
  const content = document.getElementById('page-content');
  if (!content || !isLesson(page)) return;
  const heading = content.querySelector(':scope > h1');
  if (!heading || content.querySelector('.lesson-header')) return;
  const goal = content.querySelector(':scope > blockquote');
  const complete = readProgress().has(page.id);
  const header = document.createElement('header');
  header.className = 'lesson-header';
  header.innerHTML = `${lessonMeta(page, locale)}<div class="lesson-title-row"></div>${goal ? `<div class="learning-goal"><span class="goal-icon">✦</span><div><small>${escapeHtml(text(locale, 'learning.outcome'))}</small>${goal.innerHTML}</div></div>` : ''}<div class="lesson-actions"><button class="complete-button${complete ? ' is-complete' : ''}" data-complete-lesson="${page.id}" type="button"><i class="fas ${complete ? 'fa-check' : 'fa-circle-check'}"></i> ${escapeHtml(complete ? text(locale, 'learning.completed') : text(locale, 'learning.markComplete'))}</button><span>${escapeHtml(text(locale, 'learning.practiceHint'))}</span></div>`;
  content.insertBefore(header, heading);
  header.querySelector('.lesson-title-row').append(heading);
  header.insertAdjacentHTML('afterend', learningCanvas(page));
  if (goal) goal.remove();
  content.querySelectorAll(':scope > h2').forEach((section) => {
    const label = section.textContent.toLocaleLowerCase(currentLanguage);
    if (/(bài tập|checkpoint|exercise|practice)/.test(label)) section.classList.add('practice-heading');
  });
  bindCompleteButtons(locale);
  initLearningLabs();
}
function bindCompleteButtons(locale) {
  document.querySelectorAll('[data-complete-lesson]').forEach((button) => {
    button.onclick = () => {
      const progress = readProgress();
      const id = button.dataset.completeLesson;
      progress.has(id) ? progress.delete(id) : progress.add(id);
      writeProgress(progress);
      const done = progress.has(id);
      button.classList.toggle('is-complete', done);
      button.innerHTML = `<i class="fas ${done ? 'fa-check' : 'fa-circle-check'}"></i> ${escapeHtml(done ? text(locale, 'learning.completed') : text(locale, 'learning.markComplete'))}`;
      renderSidebar(locale); renderCourseGrid(locale);
    };
  });
}

function applyLocale(locale) {
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = text(locale, element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.placeholder = text(locale, element.dataset.i18nPlaceholder); });
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = languageConfig(currentLanguage).toggleLabel;
  renderSidebar(locale); renderCourseGrid(locale);
}
function bindCopyButtons() {
  document.querySelectorAll('[data-copy-code]').forEach((button) => {
    button.onclick = async () => {
      const code = button.closest('.code-block')?.querySelector('code')?.textContent;
      if (!code) return;
      const label = button.textContent;
      try { await navigator.clipboard.writeText(code); button.textContent = button.dataset.copiedLabel; } catch { button.textContent = button.dataset.copyFailedLabel; }
      setTimeout(() => { button.textContent = label; }, 1600);
    };
  });
}
function initTOC() {
  window.removeEventListener('scroll', tocScrollHandler);
  const links = [...document.querySelectorAll('#page-toc .toc-sidebar a')];
  const headings = links.map((link) => ({ link, element: document.getElementById(link.hash.slice(1)) })).filter(({ element }) => element);
  if (!headings.length) return;
  tocScrollHandler = () => {
    const current = headings.reduce((active, item) => item.element.offsetTop <= scrollY + 120 ? item : active, headings[0]);
    links.forEach((link) => link.classList.toggle('active', link === current.link));
  };
  window.addEventListener('scroll', tocScrollHandler, { passive: true }); tocScrollHandler();
}
function animateIntroduction() {
  if (DOCS.pageId !== '__index__' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap) {
    const script = document.createElement('script'); script.src = 'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js'; script.onload = animateIntroduction; document.head.append(script); return;
  }
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.home-eyebrow, .hero h1, .hero-copy, .hero-actions, .hero-stats', { y: 18, autoAlpha: 0, duration: 0.48, stagger: 0.07, clearProps: 'opacity,visibility,transform' })
    .from('.track', { y: 20, autoAlpha: 0, duration: 0.42, stagger: 0.08, clearProps: 'opacity,visibility,transform' }, '-=0.2');
}
function renderSearch(locale, query = '') {
  const results = document.getElementById('searchResults');
  const needle = query.trim().toLocaleLowerCase(currentLanguage);
  const matches = pages.filter((page) => {
    const entry = text(locale, `pages.${page.id}`, {});
    return !needle || [entry.navTitle, entry.description, entry.keywords].filter(Boolean).join(' ').toLocaleLowerCase(currentLanguage).includes(needle);
  });
  results.innerHTML = matches.length ? matches.map((page) => {
    const entry = text(locale, `pages.${page.id}`, {});
    return `<a class="search-result" href="${pageHref(page)}"><span>${isLesson(page) ? lessonNumber(page) : '↗'}</span><div><strong>${escapeHtml(entry.navTitle ?? page.id)}</strong><small>${escapeHtml(entry.description ?? '')}</small></div></a>`;
  }).join('') : `<p class="search-no-results">${escapeHtml(text(locale, 'nav.searchNoResults'))}</p>`;
}
async function setLanguage(language) {
  if (!languages.some((item) => item.code === language)) language = defaultLanguage;
  currentLanguage = language; localStorage.setItem(LANGUAGE_KEY, language); document.documentElement.lang = language;
  const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url);
  const locale = await fetchLocale(language); applyLocale(locale);
  if (DOCS.pageId === '__index__') return;
  const bundle = await fetchBundle(DOCS.pageId); const content = bundle[language] ?? bundle[defaultLanguage];
  document.getElementById('page-content').innerHTML = `${content.html}${renderPageNavigation(locale)}`;
  document.getElementById('page-toc').innerHTML = content.toc;
  document.title = `${content.title} | GSAP Learning`;
  decorateLesson(locale, pages.find((page) => page.id === DOCS.pageId)); bindCopyButtons(); initTOC();
}
function openSearch() { const overlay = document.getElementById('searchOverlay'); overlay.classList.add('active'); const input = document.getElementById('searchInput'); input.value = ''; input.focus(); fetchLocale(currentLanguage).then((locale) => renderSearch(locale)); }
function closeSearch() { document.getElementById('searchOverlay').classList.remove('active'); }

document.addEventListener('DOMContentLoaded', async () => {
  applyTheme(getPreferredTheme());
  const initialLanguage = new URLSearchParams(location.search).get('lang') ?? localStorage.getItem(LANGUAGE_KEY) ?? navigator.language.slice(0, 2);
  await setLanguage(initialLanguage); animateIntroduction();
  document.querySelector('[data-action="theme"]')?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  document.querySelector('[data-action="language"]')?.addEventListener('click', () => { const index = languages.findIndex((language) => language.code === currentLanguage); setLanguage(languages[(index + 1) % languages.length].code); });
  document.querySelector('[data-action="menu"]')?.addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
  document.querySelector('[data-action="search"]')?.addEventListener('click', openSearch);
  document.getElementById('searchOverlay')?.addEventListener('click', (event) => { if (event.target.id === 'searchOverlay') closeSearch(); });
  document.getElementById('searchInput')?.addEventListener('input', async (event) => renderSearch(await fetchLocale(currentLanguage), event.target.value));
  document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); } if (event.key === 'Escape') closeSearch(); });
});
