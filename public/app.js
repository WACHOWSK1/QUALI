/* JavaScript sem dependências. Todos os dados e imagens são locais. */
(() => {
  'use strict';
  const data = window.TORNEIO_CONTENT;
  if (!data) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = value => new Intl.NumberFormat('pt-BR', {maximumFractionDigits:0}).format(value);
  const decimal = value => new Intl.NumberFormat('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2}).format(value);
  const lines = value => escape(value).replace(/\n/g, '<br>');
  const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionOff = motionMedia.matches;
  try { motionOff = motionOff || localStorage.getItem('torneio-motion') === 'off'; } catch (_) { /* leitura em modo restrito */ }
  const motionButton = $('.motion-control');
  function setMotion(off) {
    motionOff = off;
    document.documentElement.dataset.motion = off ? 'off' : 'on';
    motionButton.setAttribute('aria-pressed', String(off));
    const label = off ? 'Ativar animações' : 'Pausar animações';
    motionButton.setAttribute('aria-label', label);
    motionButton.title = label;
    motionButton.innerHTML = off ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 8 6-8 6Z"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10"/></svg>';
    if (off) $$('.reveal').forEach(el => el.classList.add('visible'));
  }
  setMotion(motionOff);
  motionButton.addEventListener('click', () => {
    setMotion(!motionOff);
    try { localStorage.setItem('torneio-motion', motionOff ? 'off' : 'on'); } catch (_) { /* preferência opcional */ }
  });
  motionMedia.addEventListener('change', event => { if (event.matches) setMotion(true); });

  const menuButton = $('.menu-button');
  const mobileNav = $('#mobile-nav');
  function closeMenu(restoreFocus = false) {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Abrir menu');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('a', mobileNav).forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
  document.addEventListener('click', e => { if (!mobileNav.hidden && !mobileNav.contains(e.target) && !menuButton.contains(e.target)) closeMenu(); });
  window.matchMedia('(min-width:851px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        reveals.unobserve(entry.target);
      });
    }, {threshold:0.08, rootMargin:'0px 0px -20px 0px'});
    $$('.reveal').forEach(el => reveals.observe(el));
    const counters = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counters.unobserve(entry.target);
      const target = Number(entry.target.dataset.count);
      if (motionOff) return;
      const start = performance.now();
      const animate = now => {
        const progress = Math.min((now-start)/1050,1);
        entry.target.textContent = String(Math.round(target * (1 - Math.pow(1-progress,3))));
        if (progress < 1 && !motionOff) requestAnimationFrame(animate);
        else entry.target.textContent = String(target);
      };
      requestAnimationFrame(animate);
    }),{threshold:0.8});
    $$('[data-count]').forEach(el => counters.observe(el));
  }

  let scrollScheduled = false;
  const navSections = $$('.desktop-nav a').map(link => ({link, section:$(link.getAttribute('href'))}));
  function updateScroll() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    $('#reading-progress').style.width = `${total > 0 ? window.scrollY / total * 100 : 0}%`;
    let active = null;
    for (const item of navSections) if (item.section.getBoundingClientRect().top <= 180) active = item;
    navSections.forEach(item => {
      item.link.classList.toggle('active', item === active);
      if (item === active) item.link.setAttribute('aria-current','location');
      else item.link.removeAttribute('aria-current');
    });
    scrollScheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); }
  }, {passive:true});
  window.addEventListener('resize',updateScroll);
  updateScroll();

  const phaseTabs = $$('.phase-tab');
  const phasePanel = $('#phase-panel');
  function setPhase(index, focus = false) {
    const phase = data.phases[index];
    if (!phase) return;
    phaseTabs.forEach((tab,i) => {
      tab.classList.toggle('active',i === index);
      tab.setAttribute('aria-selected',String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    phasePanel.setAttribute('aria-labelledby',phaseTabs[index].id);
    phasePanel.dataset.stage = index + 1;
    $('#phase-kicker').textContent = phase.kicker;
    $('#phase-title').innerHTML = lines(phase.title);
    $('#phase-description').textContent = phase.description;
    $('#phase-points').innerHTML = phase.points.map(point => `<li>${escape(point)}</li>`).join('');
    $('#phase-note').textContent = phase.note;
    $('#phase-visual-number').textContent = `0${index+1}`;
    $('#phase-visual-diagram').innerHTML = `<span>${lines(phase.visual[0])}</span><b aria-hidden="true">✦</b><span>${lines(phase.visual[1])}</span>`;
    $('#phase-visual-caption').textContent = phase.caption;
    phasePanel.classList.remove('changing');
    requestAnimationFrame(() => phasePanel.classList.add('changing'));
    if (focus) phaseTabs[index].focus();
  }
  phaseTabs.forEach((tab,index) => {
    tab.addEventListener('click',() => setPhase(index));
    tab.addEventListener('keydown',event => {
      const map = {ArrowRight:(index+1)%3,ArrowLeft:(index+2)%3,Home:0,End:2};
      if (!(event.key in map)) return;
      event.preventDefault();
      setPhase(map[event.key],true);
    });
  });

  const rolls = $('#rolls');
  function updateMission() {
    const count = Number(rolls.value);
    const useful = Math.round(0.9 * (900 + 300 * count));
    const difference = useful - 3780;
    $('#roll-count').textContent = count;
    $('#useful-length').innerHTML = `${number(useful)} <small>m</small>`;
    $('#formula').textContent = `0,9 × (900 + 300 × ${count})`;
    $('#goal-fill').style.width = `${Math.min(useful / 4725 * 100,100)}%`;
    $('#goal-fill').style.background = difference >= 0 ? '#6f8c50' : '#a38426';
    const feedback = $('#lab-feedback');
    feedback.classList.toggle('success',difference >= 0);
    feedback.textContent = difference === 0 ? 'Exatamente 3.780 m. A estrada e a reserva são atendidas com 11 rolos maiores.' : difference < 0 ? `Faltam ${number(-difference)} m para cobrir os dois lados e a reserva.` : `Sobram ${number(difference)} m além da estrada e da reserva. São rolos a mais que o necessário.`;
    rolls.setAttribute('aria-valuetext',`${count} rolos maiores; ${number(useful)} metros úteis`);
  }
  rolls.addEventListener('input',updateMission);
  updateMission();
  $$('input[name="statement"]').forEach(radio => radio.addEventListener('change',() => {
    $('#answer-feedback').textContent = radio.value === 'opinion' ? 'Isso mesmo. “É um excesso” apresenta um julgamento de Borin, não um dado do decreto.' : 'Observe a avaliação “é um excesso”: ela expressa a opinião de Borin. A reserva de 180 m, por sua vez, é uma exigência do decreto.';
  }));

  const spellImages = data.images.filter(image => image.category === 'spells');
  $('#magic-cards').innerHTML = spellImages.map((item,index) => `<article class="magic-item"><button data-gallery="spells" data-image="${index}" aria-label="Ampliar carta ${escape(item.title)}"><img src="${item.src}" alt="${escape(item.title)}" width="700" height="994" loading="lazy"><span class="zoom-badge" aria-hidden="true">↗</span></button><div class="magic-caption"><h3>${escape(item.title)}</h3><span class="mana-tag">✧ ${item.mana} MANA</span></div></article>`).join('');
  $('#spells-table').innerHTML = data.spells.map(item => `<tr><td>${escape(item.name)}</td><td>${item.mana}</td><td>${escape(item.effect)}${item.note ? `<span class="version-note">${escape(item.note)}</span>` : ''}</td></tr>`).join('');

  const collection = $('#collection-grid');
  collection.innerHTML = data.images.map(item => `<article class="collection-item" data-category="${item.category}"><button class="collection-image" data-gallery="all" data-image-id="${item.id}" aria-label="Abrir ${escape(item.title)}"><img src="${item.src}" alt="${escape(item.title)}" loading="lazy"><span class="collection-arrow" aria-hidden="true">↗</span></button><div class="collection-meta"><span>${escape(item.label)}</span><h3>${escape(item.title)}</h3></div></article>`).join('');
  let activeFilter = 'all';
  $$('[data-filter]').forEach(button => button.addEventListener('click',() => {
    activeFilter = button.dataset.filter;
    $$('[data-filter]').forEach(other => {
      const active = other === button;
      other.classList.toggle('active',active);
      other.setAttribute('aria-pressed',String(active));
    });
    let count = 0;
    $$('.collection-item',collection).forEach(item => {
      item.hidden = activeFilter !== 'all' && item.dataset.category !== activeFilter;
      if (!item.hidden) count++;
    });
    $('#collection-status').textContent = `${count} materiais exibidos`;
  }));

  function openDialog(dialog) {
    closeMenu();
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  $$('[data-open]').forEach(button => button.addEventListener('click',() => {
    const dialog = document.getElementById(button.dataset.open);
    if (dialog) openDialog(dialog);
  }));
  $$('dialog').forEach(dialog => {
    $('.close-dialog',dialog).addEventListener('click',() => dialog.close());
    dialog.addEventListener('close',() => {
      if (!$('dialog[open]')) document.body.classList.remove('dialog-open');
    });
    dialog.addEventListener('click',event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  let galleryItems = [];
  let galleryIndex = 0;
  const galleryDialog = $('#gallery-dialog');
  function renderGallery() {
    const item = galleryItems[galleryIndex];
    if (!item) return;
    $('#gallery-title').textContent = item.title;
    $('#gallery-category').textContent = item.label;
    $('#gallery-image').src = item.full;
    $('#gallery-image').alt = `${item.title}. ${item.description}`;
    $('#gallery-description').textContent = item.description;
    $('#gallery-download').href = item.full;
    $('#gallery-download').download = `${item.id}.webp`;
    $('#gallery-counter').textContent = `${galleryIndex+1} / ${galleryItems.length}`;
    $('#gallery-image-area').classList.remove('zoomed');
    $('#gallery-image-area').scrollTo(0,0);
    $('#gallery-zoom').setAttribute('aria-pressed','false');
    $('#gallery-zoom').textContent = 'Ampliar';
  }
  document.addEventListener('click',event => {
    const button = event.target.closest('[data-gallery]');
    if (!button) return;
    const group = button.dataset.gallery === 'all' ? activeFilter : button.dataset.gallery;
    galleryItems = group === 'all' ? data.images : data.images.filter(item => item.category === group);
    galleryIndex = button.dataset.imageId ? galleryItems.findIndex(item => item.id === button.dataset.imageId) : Number(button.dataset.image || 0);
    if (galleryIndex < 0) galleryIndex = 0;
    renderGallery();
    openDialog(galleryDialog);
  });
  function moveGallery(direction) { galleryIndex = (galleryIndex + direction + galleryItems.length) % galleryItems.length; renderGallery(); }
  $('#gallery-prev').addEventListener('click',() => moveGallery(-1));
  $('#gallery-next').addEventListener('click',() => moveGallery(1));
  galleryDialog.addEventListener('keydown',event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if ($('#gallery-image-area').classList.contains('zoomed')) return;
    event.preventDefault();
    moveGallery(event.key === 'ArrowRight' ? 1 : -1);
  });
  $('#gallery-zoom').addEventListener('click',() => {
    const zoomed = $('#gallery-image-area').classList.toggle('zoomed');
    $('#gallery-zoom').setAttribute('aria-pressed',String(zoomed));
    $('#gallery-zoom').textContent = zoomed ? 'Ajustar' : 'Ampliar';
  });

  const descriptorBody = $('#descriptor-body');
  if (descriptorBody) {
    function renderDescriptors() {
      const component = $('#descriptor-component').value;
      const range = $('#descriptor-range').value;
      const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
      const search = normalize($('#descriptor-search').value.trim());
      const filtered = data.descriptors.filter(item => (!component || item.component === component) && (!range || item.range === range) && (!search || normalize(`${item.code} ${item.description} ${item.component}`).includes(search)));
      descriptorBody.innerHTML = filtered.length ? filtered.map(item => `<tr><td>${escape(item.code)}<small style="display:block;font-size:8px;font-weight:500">${item.component === 'Matemática' ? 'MAT' : 'LP'}</small></td><td>${escape(item.description)}</td><td class="score-bar"><b>${decimal(item.percent)}%</b><i aria-hidden="true"><span style="width:${item.percent}%"></span></i></td><td><span class="range-${item.range === 'critico' ? 'critical' : 'attention'}">${item.range === 'critico' ? 'Crítico' : 'Atenção'}</span></td></tr>`).join('') : '<tr><td colspan="4" class="no-descriptors">Nenhum descritor corresponde aos filtros.</td></tr>';
      $('#descriptor-count').textContent = `${filtered.length} de 41 descritores selecionados`;
    }
    $$('.descriptor-controls input,.descriptor-controls select').forEach(control => control.addEventListener('input',renderDescriptors));
    renderDescriptors();
  }
  $('#print-button')?.addEventListener('click',() => window.print());
})();
