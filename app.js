/* ========================================
   CINEMADEANNY - Aplicação principal
   Com painel Admin para adicionar títulos
   ======================================== */

// Estado global
let currentSection = 'home';
let isAdmin = false;
let currentFilter = { filmes: 'all', series: 'all', docs: 'all' };
let editingReviewId = null;
let editingTitleId = null;
let editingTitleType = null;

// Chaves do localStorage
const STORAGE = {
  reviews: 'cda_reviews',
  comments: 'cda_comments',
  admin: 'cda_admin_session',
  customTitles: 'cda_custom_titles'
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFilters();
  loadAllData();
  checkAdminSession();
  renderHomeReviews();
  renderFilmes();
  renderSeries();
  renderDocs();
  renderCuriosidades();
  renderResenhas();
});

// ========== NAVEGAÇÃO ==========
function initNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(section);
      mainNav.classList.remove('open');
    });
  });

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById(id);
  if (section) {
    section.classList.add('active');
    currentSection = id;
  }

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === id);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'admin' && isAdmin) {
    updateAdminPanel();
  }
}

// ========== FILTROS ==========
function initFilters() {
  ['filmeFilters', 'serieFilters', 'docFilters'].forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = id.replace('Filters', '');
        const key = type === 'filme' ? 'filmes' : type === 'serie' ? 'series' : 'docs';
        currentFilter[key] = btn.dataset.filter;
        if (key === 'filmes') renderFilmes();
        if (key === 'series') renderSeries();
        if (key === 'docs') renderDocs();
      });
    });
  });
}

// ========== DADOS / LOCALSTORAGE ==========
function loadAllData() {
  if (!localStorage.getItem(STORAGE.reviews)) {
    localStorage.setItem(STORAGE.reviews, JSON.stringify(SAMPLE_RESENHAS));
  }
  if (!localStorage.getItem(STORAGE.comments)) {
    localStorage.setItem(STORAGE.comments, JSON.stringify({}));
  }
  if (!localStorage.getItem(STORAGE.customTitles)) {
    localStorage.setItem(STORAGE.customTitles, JSON.stringify({ filmes: [], series: [], docs: [] }));
  }
}

function getReviews() {
  return JSON.parse(localStorage.getItem(STORAGE.reviews) || '[]');
}

function saveReviews(reviews) {
  localStorage.setItem(STORAGE.reviews, JSON.stringify(reviews));
}

function getComments() {
  return JSON.parse(localStorage.getItem(STORAGE.comments) || '{}');
}

function saveComments(comments) {
  localStorage.setItem(STORAGE.comments, JSON.stringify(comments));
}

function getCustomTitles() {
  return JSON.parse(localStorage.getItem(STORAGE.customTitles) || '{"filmes":[],"series":[],"docs":[]}');
}

function saveCustomTitles(data) {
  localStorage.setItem(STORAGE.customTitles, JSON.stringify(data));
}

// Combina dados de exemplo + títulos criados pelo admin
function getAllFilmes() {
  const custom = getCustomTitles().filmes || [];
  return [...SAMPLE_FILMES, ...custom];
}

function getAllSeries() {
  const custom = getCustomTitles().series || [];
  return [...SAMPLE_SERIES, ...custom];
}

function getAllDocs() {
  const custom = getCustomTitles().docs || [];
  return [...SAMPLE_DOCS, ...custom];
}

// ========== RENDER CARDS ==========
function createCard(item) {
  const genres = (item.genero || []).slice(0, 2).map(g => `<span class="card-genre">${g}</span>`).join('');
  const rating = item.notaAnny ? `<div class="card-rating">★ ${item.notaAnny}</div>` : '';
  const year = item.ano || '';
  const meta = item.tipo === 'serie' 
    ? `${year} · ${item.temporadas || '?'} temp.` 
    : year;

  return `
    <div class="card" onclick="openDetail('${item.id}', '${item.tipo}')">
      <div class="card-poster">
  ${
    item.posterUrl
      ? `<img src="${item.posterUrl}" alt="Pôster de ${item.titulo}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" onerror="this.style.display='none';">`
      : '<div class="card-poster-placeholder">🎬</div>'
  }
  ${rating}
  ${item.classificacao ? `<div class="card-badge">${item.classificacao}</div>` : ''}
</div>
      <div class="card-body">
        <h3 class="card-title">${item.titulo}</h3>
        <div class="card-meta">${meta}</div>
        <div>${genres}</div>
        <p class="card-synopsis">${item.sinopse || ''}</p>
      </div>
    </div>
  `;
}

function renderFilmes() {
  const grid = document.getElementById('filmesGrid');
  let items = getAllFilmes();
  const filter = currentFilter.filmes;
  if (filter !== 'all') {
    items = items.filter(f => (f.genero || []).some(g => 
      g.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(g.toLowerCase())
    ));
  }
  grid.innerHTML = items.map(createCard).join('') || '<div class="empty-state"><div class="icon">🎞️</div><h3>Nenhum filme encontrado</h3></div>';
}

function renderSeries() {
  const grid = document.getElementById('seriesGrid');
  let items = getAllSeries();
  const filter = currentFilter.series;
  if (filter !== 'all') {
    items = items.filter(s => (s.genero || []).some(g => g.toLowerCase().includes(filter.toLowerCase())));
  }
  grid.innerHTML = items.map(createCard).join('') || '<div class="empty-state"><div class="icon">📺</div><h3>Nenhuma série encontrada</h3></div>';
}

function renderDocs() {
  const grid = document.getElementById('docsGrid');
  let items = getAllDocs();
  const filter = currentFilter.docs;
  if (filter !== 'all') {
    items = items.filter(d => 
      (d.genero || []).some(g => g.toLowerCase().includes(filter.toLowerCase())) || 
      (d.tema || '').toLowerCase().includes(filter.toLowerCase())
    );
  }
  grid.innerHTML = items.map(createCard).join('') || '<div class="empty-state"><div class="icon">🎥</div><h3>Nenhum documentário encontrado</h3></div>';
}

function renderCuriosidades() {
  const grid = document.getElementById('curiosidadesGrid');
  grid.innerHTML = SAMPLE_CURIOSIDADES.map(c => `
    <div class="curiosity-card">
      <h3>${c.titulo}</h3>
      <p>${c.texto}</p>
      <span class="curiosity-tag">${c.tag}</span>
    </div>
  `).join('');
}

// ========== DETALHE ==========
function openDetail(id, tipo) {
  let item = null;
  if (tipo === 'filme') item = getAllFilmes().find(f => f.id === id);
  else if (tipo === 'serie') item = getAllSeries().find(s => s.id === id);
  else if (tipo === 'doc') item = getAllDocs().find(d => d.id === id);

  if (!item) return;

  const reviews = getReviews().filter(r => r.filme === item.titulo && r.status === 'publicado');
  const comments = getComments()[id] || [];
  const avgPublic = comments.length 
    ? (comments.reduce((s, c) => s + (c.nota || 0), 0) / comments.length).toFixed(1) 
    : null;

  const content = document.getElementById('detailContent');
  content.innerHTML = `
    <div class="detail-hero">
      <div class="detail-poster">
  ${
    item.posterUrl
      ? `<img src="${item.posterUrl}" alt="Pôster de ${item.titulo}" style="display:block;width:100%;max-width:100%;height:auto;min-height:200px;object-fit:cover;" onerror="this.alt='Erro ao carregar o pôster';this.style.display='block';">`
      : '<div class="detail-poster-placeholder">🎬</div>'
  }
</div>
      <div class="detail-info">
        <h1>${item.titulo}</h1>
        <div class="detail-meta">
          <span>${item.ano || ''}</span>
          ${item.classificacao ? `<span>· ${item.classificacao}</span>` : ''}
          ${item.temporadas ? `<span>· ${item.temporadas} temporada(s)</span>` : ''}
          ${item.status ? `<span>· ${item.status}</span>` : ''}
        </div>
        <div class="detail-rating">
          ${item.notaAnny ? `<div class="rating-score">${item.notaAnny}</div><div class="rating-stars">${'★'.repeat(Math.round(item.notaAnny/2))}${'☆'.repeat(5-Math.round(item.notaAnny/2))}</div><span style="color:var(--gray);font-size:0.85rem;">Nota da Anny</span>` : ''}
          ${avgPublic ? `<div style="margin-left:1.5rem;"><span style="color:var(--gold);font-weight:600;">${avgPublic}</span> <span style="color:var(--gray);font-size:0.85rem;">Público (${comments.length})</span></div>` : ''}
        </div>
        <div>${(item.genero||[]).map(g => `<span class="card-genre">${g}</span>`).join('')}</div>
        <p class="detail-synopsis">${item.sinopse || ''}</p>
        ${item.elenco ? `<p style="font-size:0.9rem;color:var(--gray);margin-bottom:0.4rem;"><strong>Elenco:</strong> ${item.elenco}</p>` : ''}
        ${item.direcao ? `<p style="font-size:0.9rem;color:var(--gray);"><strong>Direção:</strong> ${item.direcao}</p>` : ''}
      </div>
    </div>

    <div class="detail-tabs">
      <button class="detail-tab active" onclick="switchTab(this, 'tab-resenha')">Resenha da Anny</button>
      <button class="detail-tab" onclick="switchTab(this, 'tab-comentarios')">Opinião do Público (${comments.length})</button>
    </div>

    <div id="tab-resenha" class="tab-content active">
      ${reviews.length ? reviews.map(r => `
        <div class="review-card">
          <div class="review-header">
            <div>
              <div class="review-title">${r.titulo}</div>
              <div class="review-meta">${r.data || ''} · ${r.genero || ''}</div>
            </div>
            <div class="review-score">${r.nota}</div>
          </div>
          <div class="review-body">${r.corpo.split('\\n').map(p => `<p>${p}</p>`).join('')}</div>
        </div>
      `).join('') : '<div class="empty-state"><div class="icon">✍️</div><h3>Ainda não há resenha da Anny para este título</h3><p>Volte em breve!</p></div>'}
    </div>

    <div id="tab-comentarios" class="tab-content">
      <div class="comment-form">
        <h4 style="margin-bottom:1rem;color:var(--primary-light);">Deixe sua opinião</h4>
        <div class="form-row">
          <div class="form-group">
            <label>Seu nome ou apelido</label>
            <input type="text" id="commentName" placeholder="Como quer ser chamado" maxlength="40">
          </div>
          <div class="form-group">
            <label>Sua nota (0 a 10)</label>
            <input type="number" id="commentScore" min="0" max="10" step="0.5" placeholder="8.0">
          </div>
        </div>
        <div class="form-group">
          <label>Comentário</label>
          <textarea id="commentText" placeholder="O que achou desta obra?" rows="4"></textarea>
        </div>
        <button class="btn btn-gold" onclick="submitComment('${id}')">Publicar opinião</button>
      </div>
      <div class="comment-list" id="commentList">
        ${comments.length ? comments.slice().reverse().map(c => `
          <div class="comment-item">
            <div>
              <span class="comment-author">${escapeHtml(c.nome)}</span>
              <span class="comment-date">${c.data}</span>
            </div>
            <div class="comment-rating">★ ${c.nota}/10</div>
            <div class="comment-text">${escapeHtml(c.texto)}</div>
          </div>
        `).join('') : '<div class="empty-state"><div class="icon">💬</div><h3>Nenhum comentário ainda</h3><p>Seja o primeiro a opinar!</p></div>'}
      </div>
    </div>
  `;

  showSection('detail');
}

function closeDetail() {
  showSection('filmes');
}

function switchTab(btn, tabId) {
  document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ========== COMENTÁRIOS ==========
function submitComment(itemId) {
  const nome = document.getElementById('commentName').value.trim();
  const nota = parseFloat(document.getElementById('commentScore').value);
  const texto = document.getElementById('commentText').value.trim();

  if (!nome || nome.length < 2) {
    showToast('Por favor, digite um nome ou apelido.');
    return;
  }
  if (isNaN(nota) || nota < 0 || nota > 10) {
    showToast('A nota deve ser entre 0 e 10.');
    return;
  }
  if (!texto || texto.length < 5) {
    showToast('Escreva um comentário um pouco mais longo.');
    return;
  }

  const comments = getComments();
  if (!comments[itemId]) comments[itemId] = [];

  comments[itemId].push({
    nome,
    nota,
    texto,
    data: new Date().toLocaleDateString('pt-BR')
  });

  saveComments(comments);
  showToast('Opinião publicada com sucesso! 🎬');
  
  const item = [...getAllFilmes(), ...getAllSeries(), ...getAllDocs()].find(i => i.id === itemId);
  if (item) openDetail(itemId, item.tipo);
}

// ========== RESENHAS ==========
function renderResenhas() {
  const list = document.getElementById('resenhasList');
  const reviews = getReviews().filter(r => r.status === 'publicado').sort((a,b) => (b.data||'').localeCompare(a.data||''));

  if (!reviews.length) {
    list.innerHTML = '<div class="empty-state"><div class="icon">✍️</div><h3>Nenhuma resenha publicada ainda</h3><p>Em breve a Anny compartilha suas opiniões aqui.</p></div>';
    return;
  }

  list.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div>
          <div class="review-title">${escapeHtml(r.titulo)}</div>
          <div class="review-meta">${escapeHtml(r.filme)} · ${r.genero || ''} · ${r.data || ''}</div>
        </div>
        <div class="review-score">${r.nota}</div>
      </div>
      <div class="review-body">${r.corpo.split('\\n').map(p => `<p>${escapeHtml(p)}</p>`).join('')}</div>
    </div>
  `).join('');
}

function renderHomeReviews() {
  const container = document.getElementById('homeReviews');
  const reviews = getReviews().filter(r => r.status === 'publicado').slice(0, 4);

  if (!reviews.length) {
    container.innerHTML = '<div class="empty-state"><p>As primeiras resenhas aparecerão aqui.</p></div>';
    return;
  }

  container.innerHTML = reviews.map(r => `
    <div class="card" onclick="showSection('resenhas')">
      <div class="card-poster">
        <div class="card-poster-placeholder">✍️</div>
        <div class="card-rating">★ ${r.nota}</div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(r.titulo)}</h3>
        <div class="card-meta">${escapeHtml(r.filme)} · ${r.data || ''}</div>
        <p class="card-synopsis">${escapeHtml(r.corpo.substring(0, 120))}...</p>
      </div>
    </div>
  `).join('');
}

// ========== ADMIN ==========
function checkAdminSession() {
  auth.onAuthStateChanged(async (user) => {
    if (user && user.uid === "fKpUgGscF2gDj7KyAEMf1gmSFCI3") {
      isAdmin = true;
      showAdminUI();
      updateAdminPanel();
    } else {
      isAdmin = false;
      document.getElementById('adminLogin').style.display = 'block';
      document.getElementById('adminPanel').classList.remove('active');
      document.getElementById('btnNovaResenha').style.display = 'none';
    }
  });
}

async function loginAdmin() {
  const email = document.getElementById('adminEmail').value.trim();
  const pass = document.getElementById('adminPassword').value;

  if (!email || !pass) {
    showToast('Digite seu e-mail e sua senha.');
    return;
  }

  try {
    const resultado = await auth.signInWithEmailAndPassword(email, pass);

    if (resultado.user.uid !== "fKpUgGscF2gDj7KyAEMf1gmSFCI3") {
      await auth.signOut();
      showToast('Esta conta não tem permissão administrativa.');
      return;
    }

    isAdmin = true;
    showAdminUI();
    updateAdminPanel();
    showToast('Bem-vinda, Anny! 🎬');

  } catch (erro) {
    console.error(erro);
    showToast('E-mail ou senha incorretos.');
  }
}

async function logoutAdmin() {
  try {
    await auth.signOut();
    isAdmin = false;

    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('btnNovaResenha').style.display = 'none';

    showToast('Você saiu da área administrativa.');
  } catch (erro) {
    console.error(erro);
    showToast('Não foi possível sair da conta.');
  }
}

function showAdminUI() {
  document.getElementById('adminLogin').style.display = 'none';
  document.getElementById('adminPanel').classList.add('active');
  document.getElementById('btnNovaResenha').style.display = 'inline-flex';
}

function updateAdminPanel() {
  const reviews = getReviews();
  const comments = getComments();
  let totalComments = 0;
  Object.values(comments).forEach(arr => totalComments += arr.length);

  const custom = getCustomTitles();
  const totalFilmes = SAMPLE_FILMES.length + (custom.filmes || []).length;
  const totalSeries = SAMPLE_SERIES.length + (custom.series || []).length;

  document.getElementById('statResenhas').textContent = reviews.length;
  document.getElementById('statComentarios').textContent = totalComments;
  document.getElementById('statFilmes').textContent = totalFilmes;
  document.getElementById('statSeries').textContent = totalSeries;

  // Lista de resenhas
  const list = document.getElementById('adminResenhasList');
  let html = '';

  // Seção de adicionar títulos
  html += `
    <div style="margin-bottom:2.5rem;">
      <h3 style="margin-bottom:1rem;color:var(--gold);">➕ Adicionar Títulos</h3>
      <div style="display:flex;gap:0.6rem;flex-wrap:wrap;margin-bottom:1.5rem;">
        <button class="btn btn-gold btn-sm" onclick="openTitleModal('filme')">+ Filme</button>
        <button class="btn btn-gold btn-sm" onclick="openTitleModal('serie')">+ Série</button>
        <button class="btn btn-gold btn-sm" onclick="openTitleModal('doc')">+ Documentário</button>
      </div>

      <h4 style="margin-bottom:0.8rem;color:var(--primary-light);">Filmes adicionados por você</h4>
      <div id="adminCustomFilmes">${renderCustomTitlesList('filmes')}</div>

      <h4 style="margin:1.5rem 0 0.8rem;color:var(--primary-light);">Séries adicionadas por você</h4>
      <div id="adminCustomSeries">${renderCustomTitlesList('series')}</div>

      <h4 style="margin:1.5rem 0 0.8rem;color:var(--primary-light);">Documentários adicionados por você</h4>
      <div id="adminCustomDocs">${renderCustomTitlesList('docs')}</div>
    </div>

    <h3 style="margin-bottom:1rem;color:var(--gold);">Resenhas publicadas</h3>
  `;

  if (!reviews.length) {
    html += '<p style="color:var(--gray);">Nenhuma resenha ainda.</p>';
  } else {
    html += reviews.map(r => `
      <div class="review-card" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
        <div>
          <div class="review-title" style="font-size:1.05rem;">${escapeHtml(r.titulo)}</div>
          <div class="review-meta">${escapeHtml(r.filme)} · ${r.status} · Nota ${r.nota}</div>
        </div>
        <div style="display:flex;gap:0.5rem;flex-shrink:0;">
          <button class="btn btn-outline btn-sm" onclick="editReview('${r.id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteReview('${r.id}')">Excluir</button>
        </div>
      </div>
    `).join('');
  }

  list.innerHTML = html;
}

function renderCustomTitlesList(type) {
  const custom = getCustomTitles();
  const items = custom[type] || [];
  if (!items.length) {
    return '<p style="color:var(--gray);font-size:0.85rem;">Nenhum adicionado ainda.</p>';
  }
  return items.map(item => `
    <div class="review-card" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem;">
      <div>
        <div style="font-weight:600;">${escapeHtml(item.titulo)}</div>
        <div class="review-meta">${item.ano || ''} · Nota ${item.notaAnny || '-'}</div>
      </div>
      <div style="display:flex;gap:0.4rem;flex-shrink:0;">
        <button class="btn btn-outline btn-sm" onclick="editTitle('${item.id}', '${type}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTitle('${item.id}', '${type}')">Excluir</button>
      </div>
    </div>
  `).join('');
}

// ========== MODAL DE TÍTULOS (FILME / SÉRIE / DOC) ==========
function openTitleModal(tipo, id = null) {
  if (!isAdmin) {
    showToast('Faça login na área Admin.');
    showSection('admin');
    return;
  }

  editingTitleId = id;
  editingTitleType = tipo;

  // Cria modal dinamicamente se não existir
  let modal = document.getElementById('titleModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'titleModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 id="titleModalTitle">Novo Título</h3>
          <button class="modal-close" onclick="closeTitleModal()">×</button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="titleId">
          <div class="form-group">
            <label>Título</label>
            <input type="text" id="titleNome" placeholder="Nome do filme, série ou documentário">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Ano</label>
              <input type="number" id="titleAno" placeholder="2024" min="1900" max="2030">
            </div>
            <div class="form-group">
              <label>Nota da Anny (0 a 10)</label>
              <input type="number" id="titleNota" min="0" max="10" step="0.5" placeholder="8.5">
            </div>
          </div>
          <div class="form-group">
            <label>Gêneros (separados por vírgula)</label>
            <input type="text" id="titleGeneros" placeholder="Drama, Romance, Suspense">
          </div>
          <div class="form-group" id="titleTemporadasGroup" style="display:none;">
            <label>Número de temporadas</label>
            <input type="number" id="titleTemporadas" min="1" placeholder="1">
          </div>
          <div class="form-group" id="titleStatusGroup" style="display:none;">
            <label>Status</label>
            <select id="titleStatus">
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div class="form-group">
            <label>Sinopse</label>
            <textarea id="titleSinopse" placeholder="Breve descrição da obra..." rows="4"></textarea>
          </div>
          <div class="form-group">
  <label>Link do pôster</label>
  <input
    type="url"
    id="titlePoster"
    placeholder="https://exemplo.com/poster.jpg"
  >
  <small style="color:var(--gray);">
    Cole o endereço direto da imagem do pôster.
  </small>
</div>
          <div class="form-group">
            <label>Classificação indicativa (opcional)</label>
            <input type="text" id="titleClassificacao" placeholder="Livre, 12 anos, 16 anos...">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeTitleModal()">Cancelar</button>
          <button class="btn btn-gold" onclick="saveTitle()">Salvar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const tipoNome = tipo === 'filme' ? 'Filme' : tipo === 'serie' ? 'Série' : 'Documentário';
  document.getElementById('titleModalTitle').textContent = id ? `Editar ${tipoNome}` : `Novo ${tipoNome}`;

  // Mostra campos extras para séries
  document.getElementById('titleTemporadasGroup').style.display = tipo === 'serie' ? 'block' : 'none';
  document.getElementById('titleStatusGroup').style.display = tipo === 'serie' ? 'block' : 'none';

  // Preenche se estiver editando
  if (id) {
    const custom = getCustomTitles();
    const item = (custom[tipo === 'filme' ? 'filmes' : tipo === 'serie' ? 'series' : 'docs'] || []).find(t => t.id === id);
    if (item) {
      document.getElementById('titleId').value = item.id;
      document.getElementById('titleNome').value = item.titulo || '';
      document.getElementById('titleAno').value = item.ano || '';
      document.getElementById('titleNota').value = item.notaAnny || '';
      document.getElementById('titleGeneros').value = (item.genero || []).join(', ');
      document.getElementById('titleSinopse').value = item.sinopse || '';
      document.getElementById('titleClassificacao').value = item.classificacao || '';
      if (tipo === 'serie') {
        document.getElementById('titleTemporadas').value = item.temporadas || '';
        document.getElementById('titleStatus').value = item.status || 'Em andamento';
      }
    }
  } else {
    document.getElementById('titleId').value = '';
    document.getElementById('titleNome').value = '';
    document.getElementById('titleAno').value = '';
    document.getElementById('titleNota').value = '';
    document.getElementById('titleGeneros').value = '';
    document.getElementById('titleSinopse').value = '';
    document.getElementById('titleClassificacao').value = '';
    document.getElementById('titleTemporadas').value = '';
  }

  modal.classList.add('active');
}

function closeTitleModal() {
  const modal = document.getElementById('titleModal');
  if (modal) modal.classList.remove('active');
  editingTitleId = null;
  editingTitleType = null;
}

function saveTitle() {
  const nome = document.getElementById('titleNome').value.trim();
  const ano = parseInt(document.getElementById('titleAno').value) || null;
  const nota = parseFloat(document.getElementById('titleNota').value);
  const generosStr = document.getElementById('titleGeneros').value.trim();
  const sinopse = document.getElementById('titleSinopse').value.trim();
  const posterUrl = document.getElementById('titlePoster').value.trim();
  const classificacao = document.getElementById('titleClassificacao').value.trim();
  const id = document.getElementById('titleId').value || (editingTitleType.charAt(0) + Date.now());

  if (!nome) {
    showToast('Digite o título da obra.');
    return;
  }

  const genero = generosStr ? generosStr.split(',').map(g => g.trim()).filter(Boolean) : [];

  const item = {
  id,
  titulo: nome,
  ano,
  genero,
  sinopse,
  posterUrl,
  classificacao: classificacao || null,
  notaAnny: isNaN(nota) ? null : nota,
  tipo: editingTitleType
};

  if (editingTitleType === 'serie') {
    item.temporadas = parseInt(document.getElementById('titleTemporadas').value) || 1;
    item.status = document.getElementById('titleStatus').value;
  }

  if (editingTitleType === 'doc') {
    item.tema = genero[0] || 'Geral';
  }

  const custom = getCustomTitles();
  const key = editingTitleType === 'filme' ? 'filmes' : editingTitleType === 'serie' ? 'series' : 'docs';
  
  const existingIdx = (custom[key] || []).findIndex(t => t.id === id);
  if (existingIdx >= 0) {
    custom[key][existingIdx] = item;
  } else {
    if (!custom[key]) custom[key] = [];
    custom[key].unshift(item);
  }

  saveCustomTitles(custom);
  closeTitleModal();
  updateAdminPanel();
  renderFilmes();
  renderSeries();
  renderDocs();
  showToast('Título salvo com sucesso! 🎬');
}

function editTitle(id, type) {
  const tipo = type === 'filmes' ? 'filme' : type === 'series' ? 'serie' : 'doc';
  openTitleModal(tipo, id);
}

function deleteTitle(id, type) {
  if (!confirm('Tem certeza que deseja excluir este título?')) return;
  const custom = getCustomTitles();
  custom[type] = (custom[type] || []).filter(t => t.id !== id);
  saveCustomTitles(custom);
  updateAdminPanel();
  renderFilmes();
  renderSeries();
  renderDocs();
  showToast('Título excluído.');
}

// ========== MODAL RESENHA ==========
function openReviewModal(id = null) {
  if (!isAdmin) {
    showToast('Faça login na área Admin para criar resenhas.');
    showSection('admin');
    return;
  }

  editingReviewId = id;
  const modal = document.getElementById('reviewModal');
  document.getElementById('modalTitle').textContent = id ? 'Editar Resenha' : 'Nova Resenha';

  if (id) {
    const review = getReviews().find(r => r.id === id);
    if (review) {
      document.getElementById('reviewId').value = review.id;
      document.getElementById('reviewTitle').value = review.titulo;
      document.getElementById('reviewMovie').value = review.filme;
      document.getElementById('reviewType').value = review.tipo || 'filme';
      document.getElementById('reviewGenre').value = review.genero || '';
      document.getElementById('reviewScore').value = review.nota;
      document.getElementById('reviewBody').value = review.corpo;
      document.getElementById('reviewStatus').value = review.status;
    }
  } else {
    document.getElementById('reviewId').value = '';
    document.getElementById('reviewTitle').value = '';
    document.getElementById('reviewMovie').value = '';
    document.getElementById('reviewType').value = 'filme';
    document.getElementById('reviewGenre').value = '';
    document.getElementById('reviewScore').value = '';
    document.getElementById('reviewBody').value = '';
    document.getElementById('reviewStatus').value = 'publicado';
  }

  modal.classList.add('active');
}

function closeReviewModal() {
  document.getElementById('reviewModal').classList.remove('active');
  editingReviewId = null;
}

function saveReview() {
  const titulo = document.getElementById('reviewTitle').value.trim();
  const filme = document.getElementById('reviewMovie').value.trim();
  const tipo = document.getElementById('reviewType').value;
  const genero = document.getElementById('reviewGenre').value.trim();
  const nota = parseFloat(document.getElementById('reviewScore').value);
  const corpo = document.getElementById('reviewBody').value.trim();
  const status = document.getElementById('reviewStatus').value;
  const id = document.getElementById('reviewId').value || ('r' + Date.now());

  if (!titulo || !filme || !corpo) {
    showToast('Preencha título, nome da obra e o texto da resenha.');
    return;
  }
  if (isNaN(nota) || nota < 0 || nota > 10) {
    showToast('A nota deve ser entre 0 e 10.');
    return;
  }

  let reviews = getReviews();
  const existing = reviews.findIndex(r => r.id === id);

  const reviewData = {
    id,
    titulo,
    filme,
    tipo,
    genero,
    nota,
    corpo,
    status,
    data: existing >= 0 ? reviews[existing].data : new Date().toLocaleDateString('pt-BR')
  };

  if (existing >= 0) {
    reviews[existing] = reviewData;
  } else {
    reviews.unshift(reviewData);
  }

  saveReviews(reviews);
  closeReviewModal();
  renderResenhas();
  renderHomeReviews();
  if (isAdmin) updateAdminPanel();
  showToast(status === 'publicado' ? 'Resenha publicada! 🎬' : 'Rascunho salvo.');
}

function editReview(id) {
  openReviewModal(id);
}

function deleteReview(id) {
  if (!confirm('Tem certeza que deseja excluir esta resenha?')) return;
  let reviews = getReviews().filter(r => r.id !== id);
  saveReviews(reviews);
  renderResenhas();
  renderHomeReviews();
  updateAdminPanel();
  showToast('Resenha excluída.');
}

// ========== BUSCA ==========
function handleSearch(query) {
  query = query.trim().toLowerCase();
  if (!query) {
    if (currentSection === 'filmes') renderFilmes();
    if (currentSection === 'series') renderSeries();
    if (currentSection === 'docs') renderDocs();
    return;
  }

  if (currentSection === 'filmes' || currentSection === 'home') {
    const filtered = getAllFilmes().filter(f => 
      f.titulo.toLowerCase().includes(query) || 
      (f.sinopse||'').toLowerCase().includes(query) ||
      (f.genero||[]).some(g => g.toLowerCase().includes(query))
    );
    document.getElementById('filmesGrid').innerHTML = filtered.map(createCard).join('') || 
      '<div class="empty-state"><h3>Nenhum resultado</h3></div>';
    if (currentSection === 'home') showSection('filmes');
  }
}

// ========== UTILITÁRIOS ==========
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
