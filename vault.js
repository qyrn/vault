const BUILTIN = [
  {
    category: "Ressources Cyber", icon: "🛡️", color: "#00ff88",
    items: [
      { name: "Acronymes Cybersec", url: "#acronyms", desc: "Tableau périodique des acronymes cybersécurité (Paul Baird v4)", tag: "Référence", special: "acronym" },
      { name: "5 Pillars of Cybersec", url: "https://github.com/DFIRmadness/5pillars/blob/master/5-Pillars.md#fundamentals-breakdown", desc: "Les 5 piliers fondamentaux de la cybersécurité", tag: "Fondamentaux" },
      { name: "TryHackMe", url: "https://tryhackme.com/", desc: "Parcours guidés, rooms pratiques", tag: "Apprentissage" },
      { name: "Hack The Box", url: "https://hackthebox.com", desc: "Labs & challenges pentesting", tag: "Apprentissage" },
      { name: "PortSwigger Academy", url: "https://portswigger.net/web-security", desc: "Web security gratuit, labs interactifs", tag: "Web" },
      { name: "PentesterLab", url: "https://pentesterlab.com", desc: "Exercices progressifs web hacking", tag: "Web" },
      { name: "OverTheWire", url: "https://overthewire.org/wargames/", desc: "Wargames Linux & réseau (Bandit, Natas...)", tag: "Fondamentaux" },
      { name: "PicoCTF", url: "https://picoctf.org", desc: "CTF éducatif pour débutants", tag: "CTF" },
      { name: "Cybrary", url: "https://www.cybrary.it", desc: "Cours vidéo cybersec", tag: "Cours" },
      { name: "Professor Messer", url: "https://www.professormesser.com", desc: "Vidéos Security+ gratuites", tag: "Certif" },
    ]
  },
  {
    category: "Outils & Environnement", icon: "🛠️", color: "#ff6b6b",
    items: [
      { name: "Secator", url: "https://github.com/freelabz/secator", desc: "Le couteau suisse du pentester — framework CLI unifié", tag: "Framework" },
      { name: "Exegol", url: "https://exegol.readthedocs.io/en/latest/", desc: "L'environnement Docker parfait pour le pentest", tag: "Env" },
      { name: "Kali Linux", url: "https://www.kali.org", desc: "Distro pentesting de référence", tag: "OS" },
      { name: "Burp Suite", url: "https://portswigger.net/burp", desc: "Proxy & scanner web", tag: "Web" },
      { name: "Wireshark", url: "https://www.wireshark.org", desc: "Analyse réseau & paquets", tag: "Réseau" },
      { name: "Nmap", url: "https://nmap.org", desc: "Scanner de ports & services", tag: "Recon" },
      { name: "Metasploit", url: "https://www.metasploit.com", desc: "Framework d'exploitation", tag: "Exploit" },
      { name: "Ghidra", url: "https://ghidra-sre.org", desc: "Reverse engineering (NSA)", tag: "RE" },
      { name: "CyberChef", url: "https://gchq.github.io/CyberChef/", desc: "Encodage, décodage, crypto, analyse de données", tag: "Utilitaire" },
      { name: "Hashcat", url: "https://hashcat.net/hashcat/", desc: "Cracking de mots de passe GPU", tag: "Crack" },
    ]
  },
  {
    category: "CTF & Challenges", icon: "🏴", color: "#ffd93d",
    items: [
      { name: "CTFtime", url: "https://ctftime.org", desc: "Calendrier des CTF mondiaux", tag: "Events" },
      { name: "Root Me", url: "https://www.root-me.org", desc: "Challenges variés, grande communauté FR", tag: "FR" },
      { name: "VulnHub", url: "https://www.vulnhub.com", desc: "VMs vulnérables à télécharger", tag: "Offline" },
      { name: "Exploit Education", url: "https://exploit.education", desc: "VMs pour apprendre l'exploitation", tag: "Exploit" },
      { name: "CrackMes", url: "https://crackmes.one", desc: "Challenges reverse engineering", tag: "RE" },
    ]
  },
  {
    category: "Cheat Sheets & Docs", icon: "📋", color: "#a78bfa",
    items: [
      { name: "HackTricks", url: "https://book.hacktricks.xyz", desc: "Bible du pentesting, énorme base de connaissances", tag: "Must-have" },
      { name: "PayloadsAllTheThings", url: "https://github.com/swisskyrepo/PayloadsAllTheThings", desc: "Payloads & bypass techniques", tag: "Payloads" },
      { name: "GTFOBins", url: "https://gtfobins.github.io", desc: "Exploiter les binaires Linux pour privesc", tag: "Privesc" },
      { name: "LOLBAS", url: "https://lolbas-project.github.io", desc: "Living off the land binaries (Windows)", tag: "Windows" },
      { name: "Reverse Shell Gen", url: "https://www.revshells.com", desc: "Générateur de reverse shells", tag: "Utilitaire" },
      { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", desc: "Top vulnérabilités web", tag: "Référence" },
      { name: "MITRE ATT&CK", url: "https://attack.mitre.org", desc: "Framework tactiques & techniques d'attaque", tag: "Framework" },
    ]
  },
  {
    category: "Veille & News", icon: "📡", color: "#38bdf8",
    items: [
      { name: "The Hacker News", url: "https://thehackernews.com", desc: "Actualités cybersec quotidiennes", tag: "News" },
      { name: "Krebs on Security", url: "https://krebsonsecurity.com", desc: "Blog sécurité de référence", tag: "Blog" },
      { name: "Dark Reading", url: "https://www.darkreading.com", desc: "Analyses & tendances sécurité", tag: "News" },
      { name: "r/netsec", url: "https://reddit.com/r/netsec", desc: "Communauté Reddit sécurité", tag: "Reddit" },
      { name: "CVE Details", url: "https://www.cvedetails.com", desc: "Base de données CVE", tag: "Vulns" },
      { name: "Exploit-DB", url: "https://www.exploit-db.com", desc: "Archive d'exploits publics", tag: "Exploits" },
    ]
  },
  {
    category: "YouTubeurs FR", icon: "🇫🇷", color: "#f472b6",
    items: [
      { name: "noraj (Rawsec)", url: "https://www.youtube.com/@noraj_rawsec", desc: "Pentester & chercheur, outils open-source, sécurité offensive", tag: "Offensive" },
      { name: "Fransosiche", url: "https://www.youtube.com/@Fransosiche", desc: "Sécurité offensive, recherche technique, partage de connaissances", tag: "Offensive" },
      { name: "HacktBack", url: "https://www.youtube.com/@HacktBack", desc: "Sécurité offensive, participation communauté technique", tag: "Offensive" },
      { name: "TheLaluka", url: "https://www.youtube.com/@TheLaluka", desc: "Recherche, offensive security, échanges communautaires", tag: "Recherche" },
    ]
  },
  {
    category: "YouTubeurs EN", icon: "🌍", color: "#22d3ee",
    items: [
      { name: "0xdf", url: "https://www.youtube.com/@0xdf/videos", desc: "Writeups HTB détaillés, méthodologie propre", tag: "Writeups" },
      { name: "xct", url: "https://www.youtube.com/xct_de", desc: "Challenges, techniques d'exploitation avancées", tag: "Exploit" },
      { name: "IppSec", url: "https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA", desc: "Référence absolue des writeups Hack The Box", tag: "HTB" },
      { name: "John Hammond", url: "https://www.youtube.com/@_JohnHammond", desc: "CTF, malware analysis, cybersec éducatif", tag: "Éducatif" },
    ]
  },
  {
    category: "Podcasts", icon: "🎙️", color: "#fb923c",
    items: [
      { name: "Hack'n Speak", url: "https://open.spotify.com/show/2lwA1WLVqnYvnlc7WkV3yU", desc: "Podcast cybersec francophone sur Spotify", tag: "FR" },
      { name: "CyberTalk (HacktBack)", url: "https://podcast.ausha.co/cybertalk", desc: "Les cybertalk de HacktBack", tag: "FR" },
      { name: "Service Hacktion (noraj)", url: "https://youtube.com/playlist?list=PLcVXqhw7FTyjT8q_hGriUT206_BftWyp8&si=0QGi3uiWiryPt-FS", desc: "Playlist podcast sécurité offensive par noraj", tag: "FR" },
      { name: "Critical Thinking", url: "https://open.spotify.com/show/4GiJnv8f4a4ZR6Jc6TQJ3k", desc: "Podcast cybersec anglophone", tag: "EN" },
      { name: "Playlist cyber (Watch Later)", url: "https://www.youtube.com/playlist?list=PLrxfhfeDL35nx0RNr2BMHY92QTU4eFcwv", desc: "Playlist YouTube de vidéos cyber à regarder plus tard", tag: "Watch Later" },
    ]
  },
  {
    category: "Certifications & Carrière", icon: "🎯", color: "#fbbf24",
    items: [
      { name: "CompTIA Security+", url: "https://www.comptia.org/certifications/security", desc: "Certification d'entrée reconnue mondialement", tag: "Certif" },
      { name: "eJPT (INE)", url: "https://security.ine.com/certifications/ejpt-certification/", desc: "Junior Penetration Tester", tag: "Certif" },
      { name: "OSCP (OffSec)", url: "https://www.offsec.com/courses/pen-200/", desc: "Gold standard du pentesting", tag: "Objectif" },
      { name: "LinkedIn Cybersec", url: "https://www.linkedin.com/jobs/cybersecurity-jobs/", desc: "Offres d'emploi cybersec", tag: "Jobs" },
    ]
  },
  {
    category: "Mes Projets", icon: "⚡", color: "#ffd93d",
    items: [
      { name: "Échelon", url: "https://web-beta-roan-27.vercel.app/", desc: "Mon outil de veille cybersec hebdomadaire (chaque dimanche)", tag: "Perso" },
    ]
  },
];
let customItems = [];
let favorites = [];
try { customItems = JSON.parse(localStorage.getItem('vault_custom') || '[]'); } catch(e) {}
try { favorites = JSON.parse(localStorage.getItem('vault_favs') || '[]'); } catch(e) {}
function saveCustom() { try { localStorage.setItem('vault_custom', JSON.stringify(customItems)); } catch(e) {} }
function saveFavs() { try { localStorage.setItem('vault_favs', JSON.stringify(favorites)); } catch(e) {} }
function isFav(name, url) { return favorites.some(f => f.name === name && f.url === url); }
function toggleFav(name, url) {
  if (isFav(name, url)) { favorites = favorites.filter(f => !(f.name === name && f.url === url)); }
  else { favorites.push({ name, url }); }
  saveFavs(); render();
}
function getMergedData() {
  const merged = BUILTIN.map(cat => ({ ...cat, items: cat.items.map(i => ({ ...i })) }));
  customItems.forEach(ci => {
    let section = merged.find(s => s.category === ci.category);
    if (!section) { section = { category: ci.category, icon: "📁", color: "#888", items: [] }; merged.push(section); }
    section.items.push({ ...ci, custom: true });
  });
  return merged;
}
function getFavItems() {
  const all = getMergedData();
  const favs = [];
  all.forEach(cat => {
    cat.items.forEach(item => {
      if (isFav(item.name, item.url)) favs.push({ ...item, catColor: cat.color, catIcon: cat.icon });
    });
  });
  return favs;
}
const filtersEl = document.getElementById('filters');
const contentEl = document.getElementById('content');
const searchEl = document.getElementById('search');
const emptyEl = document.getElementById('empty');
const emptyQueryEl = document.getElementById('emptyQuery');
const addModal = document.getElementById('addModal');
const dataModal = document.getElementById('dataModal');
const imgModal = document.getElementById('imgModal');
const fCategory = document.getElementById('fCategory');
const toastEl = document.getElementById('toast');
let activeFilter = null;
let favOnly = false;
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}
function updateClock() {
  const now = new Date();
  document.getElementById('clockTime').textContent = now.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  document.getElementById('clockDate').textContent = now.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}
updateClock(); setInterval(updateClock, 1000);
function getAllCategories() {
  const cats = BUILTIN.map(c => c.category);
  customItems.forEach(ci => { if (!cats.includes(ci.category)) cats.push(ci.category); });
  return cats;
}
function populateCategorySelect() {
  const cats = getAllCategories();
  fCategory.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('') + '<option value="__new">+ Nouvelle catégorie...</option>';
}
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
function renderFilters() {
  const data = getMergedData();
  let html = `<button class="${!activeFilter?'active':''}" data-cat="">TOUT</button>`;
  data.forEach(s => {
    const a = activeFilter === s.category;
    html += `<button class="${a?'active':''}" data-cat="${escHtml(s.category)}" style="${a?'background:'+s.color+'18;border-color:'+s.color+'55;color:'+s.color:''}">${s.icon} ${escHtml(s.category).toUpperCase()}</button>`;
  });
  filtersEl.innerHTML = html;
  filtersEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => { activeFilter = btn.dataset.cat || null; render(); });
  });
}
function updateStats() {
  const data = getMergedData();
  let total = 0; data.forEach(c => total += c.items.length);
  document.getElementById('totalCount').textContent = total;
  document.getElementById('catCount').textContent = data.length;
  document.getElementById('customCount').textContent = customItems.length;
}
function renderCard(item, color, showDelete) {
  const isAcronym = item.special === 'acronym';
  const href = isAcronym ? 'javascript:void(0)' : escHtml(item.url);
  const target = isAcronym ? '' : 'target="_blank" rel="noopener noreferrer"';
  const onclick = isAcronym ? `onclick="openImgModal()"` : '';
  const displayUrl = item.url.replace('https://','').replace('http://','').replace('#acronyms','Image — cliquer pour agrandir');
  const faved = isFav(item.name, item.url);
  const favStar = faved ? '<span class="fav-star">★</span>' : '';
  const badge = item.custom ? '<span class="card-badge">CUSTOM</span>' : '';
  const eName = escHtml(item.name);
  const eUrl = escHtml(item.url);
  const favBtn = `<button class="btn-fav" onclick="event.preventDefault();event.stopPropagation();toggleFav('${eName.replace(/'/g,"\\'")}','${eUrl.replace(/'/g,"\\'")}')">${faved?'★ unfav':'☆ fav'}</button>`;
  const delBtn = showDelete ? `<button class="btn-del" onclick="event.preventDefault();event.stopPropagation();deleteCustom('${eName.replace(/'/g,"\\'")}')">✕ suppr</button>` : '';
  return `<a href="${href}" ${target} class="card" style="--accent:${color}" ${onclick}>
    ${favStar}${badge}
    <div class="card-top"><span class="card-name">${eName}</span><span class="card-tag" style="background:${color}15;color:${color}">${escHtml(item.tag)}</span></div>
    <div class="card-desc">${escHtml(item.desc)}</div>
    <div class="card-url">${escHtml(displayUrl)}</div>
    <div class="card-actions">${favBtn}${delBtn}</div>
  </a>`;
}
function render() {
  const data = getMergedData();
  const q = searchEl.value.toLowerCase().trim();
  let totalVisible = 0;
  let html = '';
  renderFilters();
  updateStats();
  document.getElementById('btnFavFilter').className = favOnly ? 'active' : '';
  if (!favOnly) {
    const favItems = getFavItems().filter(item =>
      !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)
    );
    if (favItems.length > 0 && !activeFilter) {
      html += `<div class="pinned-section"><div class="section-header"><span style="font-size:18px">★</span><h2 style="color:var(--yellow)">Favoris</h2><span class="count">${favItems.length}</span></div><div class="cards">`;
      favItems.forEach(item => { html += renderCard(item, item.catColor, item.custom); });
      html += '</div></div>';
    }
  }
  data.forEach(section => {
    if (activeFilter && section.category !== activeFilter) return;
    let items = section.items.filter(item =>
      !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)
    );
    if (favOnly) items = items.filter(i => isFav(i.name, i.url));
    if (!items.length) return;
    totalVisible += items.length;
    html += `<div class="section"><div class="section-header"><span style="font-size:18px">${section.icon}</span><h2 style="color:${section.color}">${escHtml(section.category)}</h2><span class="count">${items.length}</span></div><div class="cards">`;
    items.forEach(item => { html += renderCard(item, section.color, item.custom); });
    html += '</div></div>';
  });
  contentEl.innerHTML = html;
  emptyEl.style.display = totalVisible === 0 ? 'block' : 'none';
  if (totalVisible === 0) emptyQueryEl.textContent = q ? `Aucune ressource trouvée pour "${searchEl.value}"` : (favOnly ? 'Aucun favori pour le moment' : 'Aucune ressource');
}
window.deleteCustom = function(name) {
  customItems = customItems.filter(c => c.name !== name);
  saveCustom(); render(); showToast('Ressource supprimée');
};
window.toggleFav = toggleFav;
window.openImgModal = function() { imgModal.classList.add('open'); document.body.style.overflow = 'hidden'; };
document.getElementById('btnAdd').addEventListener('click', () => { populateCategorySelect(); addModal.classList.add('open'); });
document.getElementById('btnCancelAdd').addEventListener('click', closeAddModal);
addModal.addEventListener('click', e => { if (e.target === addModal) closeAddModal(); });
function closeAddModal() {
  addModal.classList.remove('open');
  ['fName','fUrl','fTag','fDesc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fetchStatus').textContent = '';
}
fCategory.addEventListener('change', () => {
  if (fCategory.value === '__new') {
    const name = prompt('Nom de la nouvelle catégorie :');
    if (name) {
      const opt = document.createElement('option'); opt.value = name; opt.textContent = name;
      fCategory.insertBefore(opt, fCategory.lastElementChild); fCategory.value = name;
    } else { fCategory.value = fCategory.options[0].value; }
  }
});
document.getElementById('btnSaveAdd').addEventListener('click', () => {
  const name = document.getElementById('fName').value.trim();
  const url = document.getElementById('fUrl').value.trim();
  const tag = document.getElementById('fTag').value.trim() || 'Autre';
  const desc = document.getElementById('fDesc').value.trim() || 'Pas de description';
  const category = fCategory.value;
  if (!name || !url) { showToast('Nom et URL requis'); return; }
  customItems.push({ name, url, tag, desc, category });
  saveCustom(); closeAddModal(); render(); showToast('Ressource ajoutée !');
});
document.getElementById('btnFetch').addEventListener('click', async () => {
  const url = document.getElementById('fUrl').value.trim();
  const statusEl = document.getElementById('fetchStatus');
  const btn = document.getElementById('btnFetch');
  if (!url) { statusEl.className = 'fetch-status err'; statusEl.textContent = 'URL requise'; return; }
  btn.disabled = true; btn.textContent = '⟳ Analyse IA en cours...';
  statusEl.className = 'fetch-status'; statusEl.textContent = '';
  try {
    const res = await fetch(`/api/extract?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    if (data.title && !document.getElementById('fName').value.trim()) {
      document.getElementById('fName').value = data.title;
    }
    if (data.description) {
      document.getElementById('fDesc').value = data.description;
    }
    if (data.tag) {
      document.getElementById('fTag').value = data.tag;
    }
    statusEl.className = 'fetch-status ok';
    const src = data.source === 'gemini' ? 'Analysé par IA' : 'Récupéré (fallback regex)';
    statusEl.textContent = '✓ ' + src;
  } catch(err) {
    statusEl.className = 'fetch-status err';
    statusEl.textContent = 'Erreur: ' + err.message + '. Essaie manuellement.';
  }
  btn.disabled = false; btn.textContent = '⟳ Analyser avec l\'IA';
});
const jsonArea = document.getElementById('jsonArea');
const importStatus = document.getElementById('importStatus');
document.getElementById('btnData').addEventListener('click', () => {
  jsonArea.value = JSON.stringify({ custom: customItems, favorites }, null, 2);
  importStatus.textContent = '';
  dataModal.classList.add('open');
});
document.getElementById('btnCancelData').addEventListener('click', () => dataModal.classList.remove('open'));
dataModal.addEventListener('click', e => { if (e.target === dataModal) dataModal.classList.remove('open'); });
document.getElementById('btnExport').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ custom: customItems, favorites }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'vault-backup.json'; a.click();
  showToast('Backup téléchargé');
});
document.getElementById('btnCopyJson').addEventListener('click', () => {
  navigator.clipboard.writeText(jsonArea.value).then(() => showToast('JSON copié !')).catch(() => {
    jsonArea.select(); document.execCommand('copy'); showToast('JSON copié !');
  });
});
document.getElementById('btnImport').addEventListener('click', () => {
  try {
    const data = JSON.parse(jsonArea.value);
    if (data.custom && Array.isArray(data.custom)) {
      const newCount = data.custom.filter(nc => !customItems.some(ec => ec.name === nc.name && ec.url === nc.url)).length;
      data.custom.forEach(nc => { if (!customItems.some(ec => ec.name === nc.name && ec.url === nc.url)) customItems.push(nc); });
      saveCustom();
      importStatus.className = 'fetch-status ok'; importStatus.textContent = `✓ ${newCount} nouvelles ressources importées`;
    }
    if (data.favorites && Array.isArray(data.favorites)) {
      data.favorites.forEach(nf => { if (!favorites.some(ef => ef.name === nf.name && ef.url === nf.url)) favorites.push(nf); });
      saveFavs();
    }
    render(); showToast('Import réussi !');
  } catch(e) {
    importStatus.className = 'fetch-status err'; importStatus.textContent = 'JSON invalide: ' + e.message;
  }
});
document.getElementById('btnFavFilter').addEventListener('click', () => { favOnly = !favOnly; render(); });
function closeImgModal() { imgModal.classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('imgClose').addEventListener('click', closeImgModal);
imgModal.addEventListener('click', e => { if (e.target === imgModal) closeImgModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeImgModal(); closeAddModal(); dataModal.classList.remove('open'); }
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'SELECT') {
    e.preventDefault(); searchEl.focus();
  }
});
searchEl.addEventListener('input', render);
render();
