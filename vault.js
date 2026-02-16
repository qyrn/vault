let isAdmin = false;
let isAuthenticated = false;

const BUILTIN = [
  {
    category: "Apprentissage", icon: "graduation-cap", color: "#00ff88",
    items: [
      { name: "Acronymes Cybersec", url: "#acronyms", desc: "Tableau périodique des acronymes cybersécurité (Paul Baird v4)", tag: "Référence", special: "acronym", difficulty: null },
      { name: "5 Pillars of Cybersec", url: "https://github.com/DFIRmadness/5pillars/blob/master/5-Pillars.md#fundamentals-breakdown", desc: "Les 5 piliers fondamentaux de la cybersécurité", tag: "Fondamentaux", difficulty: "Débutant" },
      { name: "TryHackMe", url: "https://tryhackme.com/", desc: "Parcours guidés, rooms pratiques", tag: "Plateforme", difficulty: "Débutant" },
      { name: "Hack The Box", url: "https://hackthebox.com", desc: "Labs & challenges pentesting", tag: "Plateforme", difficulty: "Intermédiaire" },
      { name: "HackTheBox Academy", url: "https://academy.hackthebox.com", desc: "Modules de formation structurés par HTB", tag: "Plateforme", difficulty: "Débutant" },
      { name: "OverTheWire", url: "https://overthewire.org/wargames/", desc: "Wargames Linux & réseau (Bandit, Natas...)", tag: "Fondamentaux", difficulty: "Débutant" },
      { name: "Cybrary", url: "https://www.cybrary.it", desc: "Cours vidéo cybersec", tag: "Cours", difficulty: "Débutant" },
      { name: "Professor Messer", url: "https://www.professormesser.com", desc: "Vidéos Security+ gratuites", tag: "Cours", difficulty: "Débutant" },
    ]
  },
  {
    category: "Web", icon: "globe", color: "#f472b6",
    items: [
      { name: "PortSwigger Academy", url: "https://portswigger.net/web-security", desc: "Web security gratuit, labs interactifs", tag: "Labs", difficulty: "Intermédiaire" },
      { name: "PentesterLab", url: "https://pentesterlab.com", desc: "Exercices progressifs web hacking", tag: "Labs", difficulty: "Intermédiaire" },
      { name: "Burp Suite", url: "https://portswigger.net/burp", desc: "Proxy & scanner web", tag: "Outil", difficulty: "Intermédiaire" },
      { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", desc: "Top vulnérabilités web", tag: "Référence", difficulty: "Débutant" },
      { name: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", desc: "Guide complet de tests de sécurité web", tag: "Référence", difficulty: "Avancé" },
    ]
  },
  {
    category: "Réseau", icon: "network", color: "#38bdf8",
    items: [
      { name: "Wireshark", url: "https://www.wireshark.org", desc: "Analyse réseau & paquets", tag: "Outil", difficulty: "Intermédiaire" },
      { name: "Nmap", url: "https://nmap.org", desc: "Scanner de ports & services", tag: "Recon", difficulty: "Débutant" },
      { name: "Cisco Packet Tracer", url: "https://www.netacad.com/courses/packet-tracer", desc: "Simulateur réseau pour apprendre les fondamentaux", tag: "Simulateur", difficulty: "Débutant" },
      { name: "GNS3", url: "https://www.gns3.com", desc: "Émulateur réseau avancé", tag: "Simulateur", difficulty: "Intermédiaire" },
      { name: "TCPDump Cheatsheet", url: "https://www.andreafortuna.org/2018/07/18/tcpdump-a-simple-cheatsheet/", desc: "Référence rapide tcpdump pour capture réseau", tag: "Cheatsheet", difficulty: "Intermédiaire" },
    ]
  },
  {
    category: "OSINT", icon: "search", color: "#22d3ee",
    items: [
      { name: "OSINT Framework", url: "https://osintframework.com", desc: "Arborescence d'outils OSINT classés par catégorie", tag: "Framework", difficulty: "Débutant" },
      { name: "Shodan", url: "https://www.shodan.io", desc: "Moteur de recherche pour appareils connectés", tag: "Recon", difficulty: "Intermédiaire" },
      { name: "theHarvester", url: "https://github.com/laramies/theHarvester", desc: "Collecte d'emails, sous-domaines, IPs", tag: "Outil", difficulty: "Débutant" },
      { name: "Maltego CE", url: "https://www.maltego.com/maltego-community/", desc: "Analyse de liens et visualisation OSINT", tag: "Outil", difficulty: "Intermédiaire" },
      { name: "IntelTechniques", url: "https://inteltechniques.com/tools/", desc: "Outils OSINT par Michael Bazzell", tag: "Ressource", difficulty: "Intermédiaire" },
    ]
  },
  {
    category: "Blue Team", icon: "shield-check", color: "#60a5fa",
    items: [
      { name: "LetsDefend", url: "https://letsdefend.io", desc: "Plateforme SOC analyst, alertes & incidents", tag: "Plateforme", difficulty: "Débutant" },
      { name: "CyberDefenders", url: "https://cyberdefenders.org", desc: "Challenges DFIR et Blue Team", tag: "Challenges", difficulty: "Intermédiaire" },
      { name: "Splunk Free", url: "https://www.splunk.com/en_us/download/splunk-enterprise.html", desc: "SIEM de référence, version gratuite 500MB/jour", tag: "SIEM", difficulty: "Intermédiaire" },
      { name: "Wazuh", url: "https://wazuh.com", desc: "SIEM/XDR open-source, détection & réponse", tag: "SIEM", difficulty: "Intermédiaire" },
      { name: "Blue Team Labs Online", url: "https://blueteamlabs.online", desc: "Challenges défensifs, investigations forensic", tag: "Challenges", difficulty: "Intermédiaire" },
      { name: "Security Onion", url: "https://securityonionsolutions.com", desc: "Distribution Linux pour monitoring réseau & DFIR", tag: "Plateforme", difficulty: "Avancé" },
      { name: "Malware Traffic Analysis", url: "https://www.malware-traffic-analysis.net", desc: "PCAPs de trafic malveillant pour analyse", tag: "DFIR", difficulty: "Avancé" },
    ]
  },
  {
    category: "Scripting", icon: "terminal", color: "#a78bfa",
    items: [
      { name: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com", desc: "Apprendre Python par la pratique", tag: "Python", difficulty: "Débutant" },
      { name: "Python for Pentesters", url: "https://www.pentesteracademy.com/course?id=1", desc: "Python appliqué au pentesting", tag: "Python", difficulty: "Intermédiaire" },
      { name: "Bash Scripting Guide", url: "https://tldp.org/LDP/abs/html/", desc: "Guide avancé de scripting Bash", tag: "Bash", difficulty: "Intermédiaire" },
    ]
  },
  {
    category: "CTF", icon: "flag", color: "#ffd93d",
    items: [
      { name: "CTFtime", url: "https://ctftime.org", desc: "Calendrier des CTF mondiaux", tag: "Events", difficulty: null },
      { name: "Root Me", url: "https://www.root-me.org", desc: "Challenges variés, grande communauté FR", tag: "FR", difficulty: "Débutant" },
      { name: "PicoCTF", url: "https://picoctf.org", desc: "CTF éducatif pour débutants", tag: "Éducatif", difficulty: "Débutant" },
      { name: "VulnHub", url: "https://www.vulnhub.com", desc: "VMs vulnérables à télécharger", tag: "Offline", difficulty: "Intermédiaire" },
      { name: "Exploit Education", url: "https://exploit.education", desc: "VMs pour apprendre l'exploitation", tag: "Exploit", difficulty: "Intermédiaire" },
      { name: "CrackMes", url: "https://crackmes.one", desc: "Challenges reverse engineering", tag: "RE", difficulty: "Avancé" },
    ]
  },
  {
    category: "Outils", icon: "wrench", color: "#ff6b6b",
    items: [
      { name: "Secator", url: "https://github.com/freelabz/secator", desc: "Le couteau suisse du pentester — framework CLI unifié", tag: "Framework", difficulty: "Intermédiaire" },
      { name: "Exegol", url: "https://exegol.readthedocs.io/en/latest/", desc: "L'environnement Docker parfait pour le pentest", tag: "Env", difficulty: "Intermédiaire" },
      { name: "Kali Linux", url: "https://www.kali.org", desc: "Distro pentesting de référence", tag: "OS", difficulty: "Débutant" },
      { name: "Metasploit", url: "https://www.metasploit.com", desc: "Framework d'exploitation", tag: "Exploit", difficulty: "Intermédiaire" },
      { name: "Ghidra", url: "https://ghidra-sre.org", desc: "Reverse engineering (NSA)", tag: "RE", difficulty: "Avancé" },
      { name: "CyberChef", url: "https://gchq.github.io/CyberChef/", desc: "Encodage, décodage, crypto, analyse de données", tag: "Utilitaire", difficulty: "Débutant" },
      { name: "Hashcat", url: "https://hashcat.net/hashcat/", desc: "Cracking de mots de passe GPU", tag: "Crack", difficulty: "Avancé" },
    ]
  },
  {
    category: "Cheatsheets", icon: "clipboard-list", color: "#a78bfa",
    items: [
      { name: "HackTricks", url: "https://book.hacktricks.xyz", desc: "Bible du pentesting, énorme base de connaissances", tag: "Must-have", difficulty: null },
      { name: "PayloadsAllTheThings", url: "https://github.com/swisskyrepo/PayloadsAllTheThings", desc: "Payloads & bypass techniques", tag: "Payloads", difficulty: null },
      { name: "GTFOBins", url: "https://gtfobins.github.io", desc: "Exploiter les binaires Linux pour privesc", tag: "Privesc", difficulty: "Intermédiaire" },
      { name: "LOLBAS", url: "https://lolbas-project.github.io", desc: "Living off the land binaries (Windows)", tag: "Windows", difficulty: "Intermédiaire" },
      { name: "Reverse Shell Gen", url: "https://www.revshells.com", desc: "Générateur de reverse shells", tag: "Utilitaire", difficulty: "Débutant" },
      { name: "MITRE ATT&CK", url: "https://attack.mitre.org", desc: "Framework tactiques & techniques d'attaque", tag: "Framework", difficulty: null },
    ]
  },
  {
    category: "Veille", icon: "radio", color: "#fb923c",
    items: [
      { name: "The Hacker News", url: "https://thehackernews.com", desc: "Actualités cybersec quotidiennes", tag: "News", difficulty: null },
      { name: "Krebs on Security", url: "https://krebsonsecurity.com", desc: "Blog sécurité de référence", tag: "Blog", difficulty: null },
      { name: "Dark Reading", url: "https://www.darkreading.com", desc: "Analyses & tendances sécurité", tag: "News", difficulty: null },
      { name: "r/netsec", url: "https://reddit.com/r/netsec", desc: "Communauté Reddit sécurité", tag: "Reddit", difficulty: null },
      { name: "CVE Details", url: "https://www.cvedetails.com", desc: "Base de données CVE", tag: "Vulns", difficulty: null },
      { name: "Exploit-DB", url: "https://www.exploit-db.com", desc: "Archive d'exploits publics", tag: "Exploits", difficulty: null },
      { name: "noraj (Rawsec)", url: "https://www.youtube.com/@noraj_rawsec", desc: "Pentester & chercheur, outils open-source, sécurité offensive", tag: "YT FR", difficulty: null },
      { name: "Fransosiche", url: "https://www.youtube.com/@Fransosiche", desc: "Sécurité offensive, recherche technique, partage de connaissances", tag: "YT FR", difficulty: null },
      { name: "HacktBack", url: "https://www.youtube.com/@HacktBack", desc: "Sécurité offensive, participation communauté technique", tag: "YT FR", difficulty: null },
      { name: "TheLaluka", url: "https://www.youtube.com/@TheLaluka", desc: "Recherche, offensive security, échanges communautaires", tag: "YT FR", difficulty: null },
      { name: "0xdf", url: "https://www.youtube.com/@0xdf/videos", desc: "Writeups HTB détaillés, méthodologie propre", tag: "YT EN", difficulty: null },
      { name: "xct", url: "https://www.youtube.com/xct_de", desc: "Challenges, techniques d'exploitation avancées", tag: "YT EN", difficulty: null },
      { name: "IppSec", url: "https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA", desc: "Référence absolue des writeups Hack The Box", tag: "YT EN", difficulty: null },
      { name: "John Hammond", url: "https://www.youtube.com/@_JohnHammond", desc: "CTF, malware analysis, cybersec éducatif", tag: "YT EN", difficulty: null },
      { name: "Hack'n Speak", url: "https://open.spotify.com/show/2lwA1WLVqnYvnlc7WkV3yU", desc: "Podcast cybersec francophone sur Spotify", tag: "Podcast", difficulty: null },
      { name: "CyberTalk (HacktBack)", url: "https://podcast.ausha.co/cybertalk", desc: "Les cybertalk de HacktBack", tag: "Podcast", difficulty: null },
      { name: "Service Hacktion (noraj)", url: "https://youtube.com/playlist?list=PLcVXqhw7FTyjT8q_hGriUT206_BftWyp8&si=0QGi3uiWiryPt-FS", desc: "Playlist podcast sécurité offensive par noraj", tag: "Podcast", difficulty: null },
      { name: "Critical Thinking", url: "https://open.spotify.com/show/4GiJnv8f4a4ZR6Jc6TQJ3k", desc: "Podcast cybersec anglophone", tag: "Podcast", difficulty: null },
      { name: "Playlist cyber (Watch Later)", url: "https://www.youtube.com/playlist?list=PLrxfhfeDL35nx0RNr2BMHY92QTU4eFcwv", desc: "Playlist YouTube de vidéos cyber à regarder plus tard", tag: "Watch Later", difficulty: null },
    ]
  },
  {
    category: "Certifs", icon: "award", color: "#fbbf24",
    items: [
      { name: "CompTIA Security+", url: "https://www.comptia.org/certifications/security", desc: "Certification d'entrée reconnue mondialement", tag: "Certif", difficulty: "Débutant" },
      { name: "eJPT (INE)", url: "https://security.ine.com/certifications/ejpt-certification/", desc: "Junior Penetration Tester", tag: "Certif", difficulty: "Débutant" },
      { name: "OSCP (OffSec)", url: "https://www.offsec.com/courses/pen-200/", desc: "Gold standard du pentesting", tag: "Objectif", difficulty: "Avancé" },
      { name: "LinkedIn Cybersec", url: "https://www.linkedin.com/jobs/cybersecurity-jobs/", desc: "Offres d'emploi cybersec", tag: "Jobs", difficulty: null },
    ]
  },
  {
    category: "Ma Progression", icon: "compass", color: "#10b981",
    items: [
      { name: "Échelon", url: "https://web-beta-roan-27.vercel.app/", desc: "Mon outil de veille cybersec hebdomadaire (chaque dimanche)", tag: "Perso", difficulty: null },
    ]
  },
];
let customItems = [];
let favorites = [];
let deletedBuiltins = [];
let editedBuiltins = [];
try { customItems = JSON.parse(localStorage.getItem('vault_custom') || '[]'); } catch(e) {}
try { favorites = JSON.parse(localStorage.getItem('vault_favs') || '[]'); } catch(e) {}
try { deletedBuiltins = JSON.parse(localStorage.getItem('vault_deleted_builtins') || '[]'); } catch(e) {}
try { editedBuiltins = JSON.parse(localStorage.getItem('vault_edited_builtins') || '[]'); } catch(e) {}
const CAT_MIGRATION = {"Ressources Cyber":"Apprentissage","Cyber":"Apprentissage","Outils & Environnement":"Outils","CTF & Challenges":"CTF","Cheat Sheets & Docs":"Cheatsheets","Veille & News":"Veille","YouTubeurs FR":"Veille","YT FR":"Veille","YouTubeurs EN":"Veille","YT EN":"Veille","Podcasts":"Veille","Certifications & Carrière":"Certifs","Mes Projets":"Ma Progression","Projets":"Ma Progression"};
let migrated = false;
customItems.forEach(ci => { if (CAT_MIGRATION[ci.category]) { ci.category = CAT_MIGRATION[ci.category]; migrated = true; } });
if (migrated) { try { localStorage.setItem('vault_custom', JSON.stringify(customItems)); } catch(e) {} }
let syncTimer;
function syncToCloud() {
  if (!isAdmin) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ custom: customItems, favorites, deletedBuiltins, editedBuiltins })
      });
    } catch(e) {}
  }, 1500);
}
async function loadFromCloud() {
  try {
    const res = await fetch('/api/sync');
    const data = await res.json();
    if (data.custom && Array.isArray(data.custom)) {
      customItems = data.custom;
      localStorage.setItem('vault_custom', JSON.stringify(customItems));
    }
    if (data.favorites && Array.isArray(data.favorites)) {
      favorites = data.favorites;
      localStorage.setItem('vault_favs', JSON.stringify(favorites));
    }
    if (data.deletedBuiltins && Array.isArray(data.deletedBuiltins)) {
      deletedBuiltins = data.deletedBuiltins;
      localStorage.setItem('vault_deleted_builtins', JSON.stringify(deletedBuiltins));
    }
    if (data.editedBuiltins && Array.isArray(data.editedBuiltins)) {
      editedBuiltins = data.editedBuiltins;
      localStorage.setItem('vault_edited_builtins', JSON.stringify(editedBuiltins));
    }
    render();
  } catch(e) {}
}
function saveCustom() { try { localStorage.setItem('vault_custom', JSON.stringify(customItems)); } catch(e) {} syncToCloud(); }
function saveOverrides() {
  try { localStorage.setItem('vault_deleted_builtins', JSON.stringify(deletedBuiltins)); } catch(e) {}
  try { localStorage.setItem('vault_edited_builtins', JSON.stringify(editedBuiltins)); } catch(e) {}
  syncToCloud();
}
function saveFavs() { try { localStorage.setItem('vault_favs', JSON.stringify(favorites)); } catch(e) {} syncToCloud(); }
function isFav(name, url) { return favorites.some(f => f.name === name && f.url === url); }
function toggleFav(name, url) {
  if (isFav(name, url)) { favorites = favorites.filter(f => !(f.name === name && f.url === url)); }
  else { favorites.push({ name, url }); }
  saveFavs(); render();
}
function isDeletedBuiltin(name, url) {
  return deletedBuiltins.some(d => d.name === name && d.url === url);
}
function getEditedBuiltin(name, url) {
  return editedBuiltins.find(e => e.originalName === name && e.originalUrl === url);
}
function getMergedData() {
  const merged = BUILTIN.map(cat => {
    const items = cat.items
      .filter(i => !isDeletedBuiltin(i.name, i.url))
      .map(i => {
        const edited = getEditedBuiltin(i.name, i.url);
        if (edited) return { ...i, name: edited.name, url: edited.url, tag: edited.tag, desc: edited.desc, difficulty: edited.difficulty !== undefined ? edited.difficulty : i.difficulty, category: edited.category || cat.category, builtinEdited: true };
        return { ...i };
      });
    return { ...cat, items };
  });
  editedBuiltins.forEach(edited => {
    if (edited.category) {
      const originalCat = BUILTIN.find(c => c.items.some(i => i.name === edited.originalName && i.url === edited.originalUrl));
      if (originalCat && edited.category !== originalCat.category) {
        const srcSection = merged.find(s => s.category === originalCat.category);
        if (srcSection) {
          const idx = srcSection.items.findIndex(i => i.name === edited.name && i.url === edited.url);
          if (idx !== -1) {
            const [movedItem] = srcSection.items.splice(idx, 1);
            let destSection = merged.find(s => s.category === edited.category);
            if (!destSection) { destSection = { category: edited.category, icon: "folder", color: "#888", items: [] }; merged.push(destSection); }
            destSection.items.push(movedItem);
          }
        }
      }
    }
  });
  customItems.forEach(ci => {
    let section = merged.find(s => s.category === ci.category);
    if (!section) { section = { category: ci.category, icon: "folder", color: "#888", items: [] }; merged.push(section); }
    section.items.push({ ...ci, custom: true });
  });
  return merged.filter(cat => cat.items.length > 0);
}
function getFavItems() {
  const all = getMergedData();
  const favs = [];
  all.forEach(cat => {
    cat.items.forEach(item => {
      if (isFav(item.name, item.url)) favs.push({ ...item, category: cat.category, catColor: cat.color, catIcon: cat.icon });
    });
  });
  return favs;
}
const contentEl = document.getElementById('content');
const searchEl = document.getElementById('search');
const emptyEl = document.getElementById('empty');
const emptyQueryEl = document.getElementById('emptyQuery');
const addModal = document.getElementById('addModal');
const imgModal = document.getElementById('imgModal');
const fCategory = document.getElementById('fCategory');
const toastEl = document.getElementById('toast');
let activeFilter = null;
let activeDifficulty = null;
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

function renderFilterBar() {
  const data = getMergedData();
  const bar = document.getElementById('filterBar');
  let catHtml = '';
  data.forEach(s => {
    const a = activeFilter === s.category;
    const style = a ? `background:${s.color}12;border-color:${s.color}50;color:${s.color}` : `border-color:${s.color}25;color:${s.color}99`;
    catHtml += `<button class="${a?'active':''}" data-cat="${escHtml(s.category)}" style="${style}"><i data-lucide="${s.icon}"></i> ${escHtml(s.category)}</button>`;
  });
  const diffBtns = [
    { d: 'Débutant', label: 'Débutant' },
    { d: 'Intermédiaire', label: 'Intermédiaire' },
    { d: 'Avancé', label: 'Avancé' }
  ];
  let diffHtml = diffBtns.map(b => `<button class="${activeDifficulty === b.d?'active':''}" data-diff="${b.d}">${b.label}</button>`).join('');
  let favHtml = `<button class="fav-btn${favOnly?' active':''}" id="btnFavFilter2"><i data-lucide="star"></i> Favoris</button>`;
  bar.innerHTML = `
    <div class="filter-row"><span class="filter-label">Catégorie</span><div class="filter-pills" id="catPills">${catHtml}</div></div>
    <div class="filter-row-split"><div class="filter-left"><span class="filter-label">Niveau</span><div class="filter-pills" id="diffPills">${diffHtml}</div></div><div class="filter-right"><div class="filter-pills">${favHtml}</div></div></div>`;
  bar.querySelectorAll('#catPills button').forEach(btn => {
    btn.addEventListener('click', () => { activeFilter = activeFilter === btn.dataset.cat ? null : btn.dataset.cat; render(); });
  });
  bar.querySelectorAll('#diffPills button').forEach(btn => {
    btn.addEventListener('click', () => { activeDifficulty = activeDifficulty === btn.dataset.diff ? null : btn.dataset.diff; render(); });
  });
  bar.querySelector('#btnFavFilter2').addEventListener('click', () => { favOnly = !favOnly; render(); });
}
function updateStats() {
  const data = getMergedData();
  let total = 0; data.forEach(c => total += c.items.length);
  document.getElementById('totalCount').textContent = total;
  document.getElementById('catCount').textContent = data.length;
}
function renderCard(item, color) {
  const isAcronym = item.special === 'acronym';
  const href = isAcronym ? 'javascript:void(0)' : escHtml(item.url);
  const target = isAcronym ? '' : 'target="_blank" rel="noopener noreferrer"';
  const onclick = isAcronym ? `onclick="openImgModal()"` : '';
  const displayUrl = item.url.replace('https://','').replace('http://','').replace('#acronyms','Image — cliquer pour agrandir');
  const faved = isFav(item.name, item.url);
  const favStar = faved ? '<span class="fav-star"><i data-lucide="star"></i></span>' : '';
  const eName = escHtml(item.name);
  const eUrl = escHtml(item.url);
  const favBtn = isAdmin ? `<button class="btn-fav" onclick="event.preventDefault();event.stopPropagation();toggleFav('${eName.replace(/'/g,"\\'")}','${eUrl.replace(/'/g,"\\'")}')">${faved?'<i data-lucide="star" class="lucide-filled"></i> unfav':'<i data-lucide="star"></i> fav'}</button>` : '';
  const origName = item.builtinEdited ? escHtml(editedBuiltins.find(e => e.name === item.name && e.url === item.url)?.originalName || '') : '';
  const origUrl = item.builtinEdited ? escHtml(editedBuiltins.find(e => e.name === item.name && e.url === item.url)?.originalUrl || '') : '';
  const diffColors = { 'Débutant': '#00ff88', 'Intermédiaire': '#fb923c', 'Avancé': '#ff6b6b' };
  const diffBadge = item.difficulty ? `<span class="diff-badge" style="background:${diffColors[item.difficulty]}15;color:${diffColors[item.difficulty]};border-color:${diffColors[item.difficulty]}33">${escHtml(item.difficulty)}</span>` : '';
  return `<a href="${href}" ${target} class="card" style="--accent:${color}" data-name="${eName}" data-url="${eUrl}" data-custom="${item.custom?'1':'0'}" data-tag="${escHtml(item.tag)}" data-desc="${escHtml(item.desc)}" data-category="${escHtml(item.category||'')}" data-difficulty="${escHtml(item.difficulty||'')}" data-original-name="${origName}" data-original-url="${origUrl}" ${onclick}>
    ${favStar}
    <div class="card-top"><div class="card-title-row"><span class="card-name">${eName}</span></div><div class="card-badges">${diffBadge}<span class="card-tag" style="background:${color}15;color:${color}">${escHtml(item.tag)}</span></div></div>
    <div class="card-desc">${escHtml(item.desc)}</div>
    <div class="card-url">${escHtml(displayUrl)}</div>
    <div class="card-actions">${favBtn}</div>
  </a>`;
}
function render() {
  const data = getMergedData();
  const q = searchEl.value.toLowerCase().trim();
  let totalVisible = 0;
  let html = '';
  renderFilterBar();
  updateStats();
  const diffMatch = item => !activeDifficulty || item.difficulty === activeDifficulty;
  const progressionSection = data.find(s => s.category === 'Ma Progression');
  if (progressionSection && (!activeFilter || activeFilter === 'Ma Progression')) {
    let pItems = progressionSection.items.filter(item =>
      (!q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)) && diffMatch(item)
    );
    if (favOnly) pItems = pItems.filter(i => isFav(i.name, i.url));
    if (pItems.length) {
      totalVisible += pItems.length;
      html += `<div class="section progression-section"><div class="section-header"><span style="font-size:18px"><i data-lucide="${progressionSection.icon}"></i></span><h2 style="color:${progressionSection.color}">${escHtml(progressionSection.category)}</h2><span class="count">${pItems.length}</span></div><div class="cards">`;
      pItems.forEach(item => { item.category = progressionSection.category; html += renderCard(item, progressionSection.color); });
      html += '</div></div>';
    }
  }
  if (!favOnly) {
    const favItems = getFavItems().filter(item =>
      (!q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)) && diffMatch(item)
    );
    if (favItems.length > 0 && !activeFilter) {
      html += `<div class="pinned-section"><div class="section-header"><span style="font-size:18px"><i data-lucide="star" class="lucide-filled"></i></span><h2 style="color:var(--yellow)">Favoris</h2><span class="count">${favItems.length}</span></div><div class="cards">`;
      favItems.forEach(item => { html += renderCard(item, item.catColor); });
      html += '</div></div>';
    }
  }
  data.forEach(section => {
    if (section.category === 'Ma Progression') return;
    if (activeFilter && section.category !== activeFilter) return;
    let items = section.items.filter(item =>
      (!q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)) && diffMatch(item)
    );
    if (favOnly) items = items.filter(i => isFav(i.name, i.url));
    if (!items.length) return;
    totalVisible += items.length;
    html += `<div class="section"><div class="section-header"><span style="font-size:18px"><i data-lucide="${section.icon}"></i></span><h2 style="color:${section.color}">${escHtml(section.category)}</h2><span class="count">${items.length}</span></div><div class="cards">`;
    items.forEach(item => { item.category = section.category; html += renderCard(item, section.color); });
    html += '</div></div>';
  });
  contentEl.innerHTML = html;
  emptyEl.style.display = totalVisible === 0 ? 'block' : 'none';
  if (totalVisible === 0) emptyQueryEl.textContent = q ? `Aucune ressource trouvée pour "${searchEl.value}"` : (favOnly ? 'Aucun favori pour le moment' : 'Aucune ressource');
  lucide.createIcons();
}
window.deleteCustom = function(name) {
  customItems = customItems.filter(c => c.name !== name);
  saveCustom(); render(); showToast('Ressource supprimée');
};
window.toggleFav = toggleFav;
window.openImgModal = function() { imgModal.classList.add('open'); document.body.style.overflow = 'hidden'; };
document.getElementById('btnAdd').addEventListener('click', () => { populateCategorySelect(); addModal.classList.add('open'); });
document.getElementById('btnCancelAdd').addEventListener('click', closeAddModal);
function closeAddModal() {
  addModal.classList.remove('open');
  ['fName','fUrl','fTag','fDesc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fDifficulty').value = '';
  document.getElementById('fetchStatus').textContent = '';
  editMode = false;
  editOriginalName = null;
  editOriginalUrl = null;
  editIsCustom = false;
  addModal.querySelector('h3').textContent = '+ Nouvelle ressource';
  addModal.querySelector('.btn-save').textContent = 'Ajouter';
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
  let url = document.getElementById('fUrl').value.trim();
  if (url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('#')) {
    url = 'https://' + url;
  }
  const tag = document.getElementById('fTag').value.trim() || 'Autre';
  const desc = document.getElementById('fDesc').value.trim() || 'Pas de description';
  const category = fCategory.value;
  const difficulty = document.getElementById('fDifficulty').value || null;
  if (!name || !url) { showToast('Nom et URL requis'); return; }
  if (editMode && editOriginalName) {
    if (editIsCustom) {
      const idx = customItems.findIndex(c => c.name === editOriginalName && c.url === editOriginalUrl);
      if (idx !== -1) { customItems[idx] = { name, url, tag, desc, category, difficulty }; }
      saveCustom();
    } else {
      const existingIdx = editedBuiltins.findIndex(e => e.originalName === editOriginalName && e.originalUrl === editOriginalUrl);
      const entry = { originalName: editOriginalName, originalUrl: editOriginalUrl, name, url, tag, desc, category, difficulty };
      if (existingIdx !== -1) { editedBuiltins[existingIdx] = entry; }
      else { editedBuiltins.push(entry); }
      saveOverrides();
    }
    closeAddModal(); render(); showToast('Ressource modifiée');
  } else {
    customItems.push({ name, url, tag, desc, category, difficulty });
    saveCustom(); closeAddModal(); render(); showToast('Ressource ajoutée !');
  }
});
document.getElementById('btnFetch').addEventListener('click', async () => {
  let url = document.getElementById('fUrl').value.trim();
  if (url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('#')) {
    url = 'https://' + url;
    document.getElementById('fUrl').value = url;
  }
  const statusEl = document.getElementById('fetchStatus');
  const btn = document.getElementById('btnFetch');
  if (!url) { statusEl.className = 'fetch-status err'; statusEl.textContent = 'URL requise'; return; }
  btn.disabled = true; btn.innerHTML = '<i data-lucide="loader" class="lucide-spin"></i> Analyse IA en cours...'; lucide.createIcons({attrs:{class:['lucide-inline']}});
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
    statusEl.innerHTML = '<i data-lucide="check" class="lucide-inline"></i> ' + src; lucide.createIcons({attrs:{class:['lucide-inline']}});
  } catch(err) {
    statusEl.className = 'fetch-status err';
    statusEl.textContent = 'Erreur: ' + err.message + '. Essaie manuellement.';
  }
  btn.disabled = false; btn.innerHTML = '<i data-lucide="loader"></i> Analyser avec l\'IA'; lucide.createIcons({attrs:{class:['lucide-inline']}});
});
function closeImgModal() { imgModal.classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('imgClose').addEventListener('click', closeImgModal);
imgModal.addEventListener('click', e => { if (e.target === imgModal) closeImgModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeImgModal(); closeAddModal(); closeConfirmModal(); document.getElementById('randomModal').classList.remove('open'); }
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'SELECT') {
    e.preventDefault(); searchEl.focus();
  }
});
const ctxMenu = document.getElementById('ctxMenu');
let ctxTarget = null;
let editMode = false;
let editOriginalName = null;
let editOriginalUrl = null;
let editIsCustom = false;

document.addEventListener('contextmenu', e => {
  const card = e.target.closest('.card');
  if (!card) { ctxMenu.classList.remove('open'); return; }
  e.preventDefault();
  ctxTarget = card;
  ctxMenu.style.left = Math.min(e.clientX, window.innerWidth - 160) + 'px';
  ctxMenu.style.top = Math.min(e.clientY, window.innerHeight - 120) + 'px';
  ctxMenu.querySelector('[data-action="edit"]').style.display = isAdmin ? '' : 'none';
  ctxMenu.querySelector('[data-action="delete"]').style.display = isAdmin ? '' : 'none';
  ctxMenu.classList.add('open');
});

document.addEventListener('click', () => ctxMenu.classList.remove('open'));

ctxMenu.querySelector('[data-action="copy"]').addEventListener('click', () => {
  if (!ctxTarget) return;
  navigator.clipboard.writeText(ctxTarget.dataset.url).then(() => showToast('URL copiée'));
});

const confirmModal = document.getElementById('confirmModal');
const confirmMsg = document.getElementById('confirmMsg');
let pendingDeleteCallback = null;

function openConfirmModal(name, callback) {
  confirmMsg.textContent = `Supprimer « ${name} » ?`;
  pendingDeleteCallback = callback;
  confirmModal.classList.add('open');
}
function closeConfirmModal() {
  confirmModal.classList.remove('open');
  pendingDeleteCallback = null;
}
document.getElementById('btnCancelConfirm').addEventListener('click', closeConfirmModal);
document.getElementById('btnConfirmDelete').addEventListener('click', () => {
  if (pendingDeleteCallback) pendingDeleteCallback();
  closeConfirmModal();
});

ctxMenu.querySelector('[data-action="delete"]').addEventListener('click', () => {
  if (!ctxTarget) return;
  const name = ctxTarget.dataset.name;
  const url = ctxTarget.dataset.url;
  const isCustom = ctxTarget.dataset.custom === '1';
  openConfirmModal(name, () => {
    if (isCustom) {
      customItems = customItems.filter(c => !(c.name === name && c.url === url));
      saveCustom();
    } else {
      const origName = ctxTarget.dataset.originalName || name;
      const origUrl = ctxTarget.dataset.originalUrl || url;
      deletedBuiltins.push({ name: origName, url: origUrl });
      editedBuiltins = editedBuiltins.filter(e => !(e.originalName === origName && e.originalUrl === origUrl));
      saveOverrides();
    }
    render(); showToast('Ressource supprimée');
  });
});

ctxMenu.querySelector('[data-action="edit"]').addEventListener('click', () => {
  if (!ctxTarget) return;
  editMode = true;
  editIsCustom = ctxTarget.dataset.custom === '1';
  editOriginalName = ctxTarget.dataset.originalName || ctxTarget.dataset.name;
  editOriginalUrl = ctxTarget.dataset.originalUrl || ctxTarget.dataset.url;
  populateCategorySelect();
  document.getElementById('fName').value = ctxTarget.dataset.name;
  document.getElementById('fUrl').value = ctxTarget.dataset.url;
  document.getElementById('fTag').value = ctxTarget.dataset.tag;
  document.getElementById('fDesc').value = ctxTarget.dataset.desc;
  document.getElementById('fDifficulty').value = ctxTarget.dataset.difficulty || '';
  fCategory.value = ctxTarget.dataset.category;
  addModal.querySelector('h3').textContent = 'Éditer la ressource';
  addModal.querySelector('.btn-save').textContent = 'Sauvegarder';
  addModal.classList.add('open');
});

document.getElementById('vaultTitle').addEventListener('click', e => {
  e.preventDefault();
  activeFilter = null; favOnly = false; searchEl.value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' }); render();
});
searchEl.addEventListener('input', render);
const randomModal = document.getElementById('randomModal');
function getAllVisibleItems() {
  const data = getMergedData();
  const items = [];
  data.forEach(section => {
    section.items.forEach(item => {
      items.push({ ...item, category: section.category, catColor: section.color, catIcon: section.icon });
    });
  });
  return items;
}
function showRandomChallenge() {
  const items = getAllVisibleItems().filter(i => i.url !== '#acronyms' && (!activeDifficulty || i.difficulty === activeDifficulty));
  if (!items.length) { showToast('Aucune ressource disponible'); return; }
  const item = items[Math.floor(Math.random() * items.length)];
  const diffColors = { 'Débutant': '#00ff88', 'Intermédiaire': '#fb923c', 'Avancé': '#ff6b6b' };
  const diffHtml = item.difficulty ? `<span class="diff-badge" style="background:${diffColors[item.difficulty]}15;color:${diffColors[item.difficulty]};border-color:${diffColors[item.difficulty]}33">${escHtml(item.difficulty)}</span>` : '';
  document.getElementById('randomContent').innerHTML = `
    <div class="random-card">
      <div class="random-name">${escHtml(item.name)}</div>
      <div class="random-meta"><span class="card-tag" style="background:${item.catColor}15;color:${item.catColor}">${escHtml(item.category)}</span> <span class="card-tag" style="background:${item.catColor}15;color:${item.catColor}">${escHtml(item.tag)}</span> ${diffHtml}</div>
      <div class="random-desc">${escHtml(item.desc)}</div>
    </div>`;
  document.getElementById('btnRandomOpen').href = item.url;
  randomModal.classList.add('open');
  lucide.createIcons();
}
document.getElementById('btnRandom').addEventListener('click', showRandomChallenge);
document.getElementById('btnRandomAgain').addEventListener('click', showRandomChallenge);
document.getElementById('btnRandomClose').addEventListener('click', () => randomModal.classList.remove('open'));
randomModal.addEventListener('click', e => { if (e.target === randomModal) randomModal.classList.remove('open'); });
async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    const data = await res.json();
    isAuthenticated = data.authenticated;
    isAdmin = data.isAdmin;
  } catch(e) {
    isAuthenticated = false;
    isAdmin = false;
  }
  updateAuthUI();
  updateAdminUI();
}

function updateAuthUI() {
  const authZone = document.getElementById('authZone');
  if (!authZone) return;

  if (isAuthenticated) {
    let html = '';
    if (isAdmin) {
      html += '<span class="admin-badge">Admin</span>';
      html += '<a href="/api/backup" class="btn-backup"><i data-lucide="download"></i> Backup</a>';
    }
    html += '<button class="btn-logout" onclick="window.location.href=\'/api/auth/logout\'">Logout</button>';
    authZone.innerHTML = html;
  } else {
    authZone.innerHTML = '<button class="btn-login" onclick="window.location.href=\'/api/auth/login\'"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> Login GitHub</button>';
  }
  lucide.createIcons();
}

function updateAdminUI() {
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });
}

render();
checkAuth();
loadFromCloud();
