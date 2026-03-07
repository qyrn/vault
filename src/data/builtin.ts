import type { Category } from '../types'

export const CAT_MIGRATION: Record<string, string> = {
  'Ressources Cyber': 'Apprentissage',
  'Cyber': 'Apprentissage',
  'Outils & Environnement': 'Outils',
  'CTF & Challenges': 'CTF',
  'Cheat Sheets & Docs': 'Cheatsheets',
  'Veille & News': 'Veille',
  'YouTubeurs FR': 'Veille',
  'YT FR': 'Veille',
  'YouTubeurs EN': 'Veille',
  'YT EN': 'Veille',
  'Podcasts': 'Veille',
  'Certifications & Carrière': 'Certifs',
  'Mes Projets': 'Ma Progression',
  'Projets': 'Ma Progression',
}

export const BUILTIN: Category[] = [
  {
    category: 'Apprentissage', icon: 'graduation-cap', color: '#a78bfa',
    items: [
      { name: 'Acronymes Cybersec', url: '#acronyms', desc: 'Tableau périodique des acronymes cybersécurité (Paul Baird v4)', tag: 'Référence', special: 'acronym', difficulty: null },
      { name: '5 Pillars of Cybersec', url: 'https://github.com/DFIRmadness/5pillars/blob/master/5-Pillars.md#fundamentals-breakdown', desc: 'Les 5 piliers fondamentaux de la cybersécurité', tag: 'Fondamentaux', difficulty: 'Débutant' },
      { name: 'TryHackMe', url: 'https://tryhackme.com/', desc: 'Parcours guidés, rooms pratiques', tag: 'Plateforme', difficulty: 'Débutant' },
      { name: 'Hack The Box', url: 'https://hackthebox.com', desc: 'Labs & challenges pentesting', tag: 'Plateforme', difficulty: 'Intermédiaire' },
      { name: 'HackTheBox Academy', url: 'https://academy.hackthebox.com', desc: 'Modules de formation structurés par HTB', tag: 'Plateforme', difficulty: 'Débutant' },
      { name: 'OverTheWire', url: 'https://overthewire.org/wargames/', desc: 'Wargames Linux & réseau (Bandit, Natas...)', tag: 'Fondamentaux', difficulty: 'Débutant' },
      { name: 'Cybrary', url: 'https://www.cybrary.it', desc: 'Cours vidéo cybersec', tag: 'Cours', difficulty: 'Débutant' },
      { name: 'Professor Messer', url: 'https://www.professormesser.com', desc: 'Vidéos Security+ gratuites', tag: 'Cours', difficulty: 'Débutant' },
    ],
  },
  {
    category: 'Web', icon: 'globe', color: '#f472b6',
    items: [
      { name: 'PortSwigger Academy', url: 'https://portswigger.net/web-security', desc: 'Web security gratuit, labs interactifs', tag: 'Labs', difficulty: 'Intermédiaire' },
      { name: 'PentesterLab', url: 'https://pentesterlab.com', desc: 'Exercices progressifs web hacking', tag: 'Labs', difficulty: 'Intermédiaire' },
      { name: 'Burp Suite', url: 'https://portswigger.net/burp', desc: 'Proxy & scanner web', tag: 'Outil', difficulty: 'Intermédiaire' },
      { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', desc: 'Top vulnérabilités web', tag: 'Référence', difficulty: 'Débutant' },
      { name: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/', desc: 'Guide complet de tests de sécurité web', tag: 'Référence', difficulty: 'Avancé' },
    ],
  },
  {
    category: 'Réseau', icon: 'network', color: '#38bdf8',
    items: [
      { name: 'Wireshark', url: 'https://www.wireshark.org', desc: 'Analyse réseau & paquets', tag: 'Outil', difficulty: 'Intermédiaire' },
      { name: 'Nmap', url: 'https://nmap.org', desc: 'Scanner de ports & services', tag: 'Recon', difficulty: 'Débutant' },
      { name: 'Cisco Packet Tracer', url: 'https://www.netacad.com/courses/packet-tracer', desc: 'Simulateur réseau pour apprendre les fondamentaux', tag: 'Simulateur', difficulty: 'Débutant' },
      { name: 'GNS3', url: 'https://www.gns3.com', desc: 'Émulateur réseau avancé', tag: 'Simulateur', difficulty: 'Intermédiaire' },
      { name: 'TCPDump Cheatsheet', url: 'https://www.andreafortuna.org/2018/07/18/tcpdump-a-simple-cheatsheet/', desc: 'Référence rapide tcpdump pour capture réseau', tag: 'Cheatsheet', difficulty: 'Intermédiaire' },
    ],
  },
  {
    category: 'OSINT', icon: 'search', color: '#22d3ee',
    items: [
      { name: 'OSINT Framework', url: 'https://osintframework.com', desc: "Arborescence d'outils OSINT classés par catégorie", tag: 'Framework', difficulty: 'Débutant' },
      { name: 'Shodan', url: 'https://www.shodan.io', desc: 'Moteur de recherche pour appareils connectés', tag: 'Recon', difficulty: 'Intermédiaire' },
      { name: 'theHarvester', url: 'https://github.com/laramies/theHarvester', desc: "Collecte d'emails, sous-domaines, IPs", tag: 'Outil', difficulty: 'Débutant' },
      { name: 'Maltego CE', url: 'https://www.maltego.com/maltego-community/', desc: 'Analyse de liens et visualisation OSINT', tag: 'Outil', difficulty: 'Intermédiaire' },
      { name: 'IntelTechniques', url: 'https://inteltechniques.com/tools/', desc: 'Outils OSINT par Michael Bazzell', tag: 'Ressource', difficulty: 'Intermédiaire' },
    ],
  },
  {
    category: 'Blue Team', icon: 'shield-check', color: '#60a5fa',
    items: [
      { name: 'LetsDefend', url: 'https://letsdefend.io', desc: 'Plateforme SOC analyst, alertes & incidents', tag: 'Plateforme', difficulty: 'Débutant' },
      { name: 'CyberDefenders', url: 'https://cyberdefenders.org', desc: 'Challenges DFIR et Blue Team', tag: 'Challenges', difficulty: 'Intermédiaire' },
      { name: 'Splunk Free', url: 'https://www.splunk.com/en_us/download/splunk-enterprise.html', desc: 'SIEM de référence, version gratuite 500MB/jour', tag: 'SIEM', difficulty: 'Intermédiaire' },
      { name: 'Wazuh', url: 'https://wazuh.com', desc: 'SIEM/XDR open-source, détection & réponse', tag: 'SIEM', difficulty: 'Intermédiaire' },
      { name: 'Blue Team Labs Online', url: 'https://blueteamlabs.online', desc: 'Challenges défensifs, investigations forensic', tag: 'Challenges', difficulty: 'Intermédiaire' },
      { name: 'Security Onion', url: 'https://securityonionsolutions.com', desc: 'Distribution Linux pour monitoring réseau & DFIR', tag: 'Plateforme', difficulty: 'Avancé' },
      { name: 'Malware Traffic Analysis', url: 'https://www.malware-traffic-analysis.net', desc: 'PCAPs de trafic malveillant pour analyse', tag: 'DFIR', difficulty: 'Avancé' },
    ],
  },
  {
    category: 'Scripting', icon: 'terminal', color: '#a78bfa',
    items: [
      { name: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com', desc: 'Apprendre Python par la pratique', tag: 'Python', difficulty: 'Débutant' },
      { name: 'Python for Pentesters', url: 'https://www.pentesteracademy.com/course?id=1', desc: 'Python appliqué au pentesting', tag: 'Python', difficulty: 'Intermédiaire' },
      { name: 'Bash Scripting Guide', url: 'https://tldp.org/LDP/abs/html/', desc: 'Guide avancé de scripting Bash', tag: 'Bash', difficulty: 'Intermédiaire' },
    ],
  },
  {
    category: 'CTF', icon: 'flag', color: '#ffd93d',
    items: [
      { name: 'CTFtime', url: 'https://ctftime.org', desc: 'Calendrier des CTF mondiaux', tag: 'Events', difficulty: null },
      { name: 'Root Me', url: 'https://www.root-me.org', desc: 'Challenges variés, grande communauté FR', tag: 'FR', difficulty: 'Débutant' },
      { name: 'PicoCTF', url: 'https://picoctf.org', desc: 'CTF éducatif pour débutants', tag: 'Éducatif', difficulty: 'Débutant' },
      { name: 'VulnHub', url: 'https://www.vulnhub.com', desc: 'VMs vulnérables à télécharger', tag: 'Offline', difficulty: 'Intermédiaire' },
      { name: 'Exploit Education', url: 'https://exploit.education', desc: "VMs pour apprendre l'exploitation", tag: 'Exploit', difficulty: 'Intermédiaire' },
      { name: 'CrackMes', url: 'https://crackmes.one', desc: 'Challenges reverse engineering', tag: 'RE', difficulty: 'Avancé' },
    ],
  },
  {
    category: 'Outils', icon: 'wrench', color: '#ff6b6b',
    items: [
      { name: 'Secator', url: 'https://github.com/freelabz/secator', desc: 'Le couteau suisse du pentester — framework CLI unifié', tag: 'Framework', difficulty: 'Intermédiaire' },
      { name: 'Exegol', url: 'https://exegol.readthedocs.io/en/latest/', desc: "L'environnement Docker parfait pour le pentest", tag: 'Env', difficulty: 'Intermédiaire' },
      { name: 'Kali Linux', url: 'https://www.kali.org', desc: 'Distro pentesting de référence', tag: 'OS', difficulty: 'Débutant' },
      { name: 'Metasploit', url: 'https://www.metasploit.com', desc: "Framework d'exploitation", tag: 'Exploit', difficulty: 'Intermédiaire' },
      { name: 'Ghidra', url: 'https://ghidra-sre.org', desc: 'Reverse engineering (NSA)', tag: 'RE', difficulty: 'Avancé' },
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/', desc: 'Encodage, décodage, crypto, analyse de données', tag: 'Utilitaire', difficulty: 'Débutant' },
      { name: 'Hashcat', url: 'https://hashcat.net/hashcat/', desc: 'Cracking de mots de passe GPU', tag: 'Crack', difficulty: 'Avancé' },
    ],
  },
  {
    category: 'Cheatsheets', icon: 'clipboard-list', color: '#a78bfa',
    items: [
      { name: 'HackTricks', url: 'https://book.hacktricks.xyz', desc: 'Bible du pentesting, énorme base de connaissances', tag: 'Must-have', difficulty: null },
      { name: 'PayloadsAllTheThings', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings', desc: 'Payloads & bypass techniques', tag: 'Payloads', difficulty: null },
      { name: 'GTFOBins', url: 'https://gtfobins.github.io', desc: 'Exploiter les binaires Linux pour privesc', tag: 'Privesc', difficulty: 'Intermédiaire' },
      { name: 'LOLBAS', url: 'https://lolbas-project.github.io', desc: 'Living off the land binaries (Windows)', tag: 'Windows', difficulty: 'Intermédiaire' },
      { name: 'Reverse Shell Gen', url: 'https://www.revshells.com', desc: 'Générateur de reverse shells', tag: 'Utilitaire', difficulty: 'Débutant' },
      { name: 'MITRE ATT&CK', url: 'https://attack.mitre.org', desc: 'Framework tactiques & techniques d\'attaque', tag: 'Framework', difficulty: null },
    ],
  },
  {
    category: 'Veille', icon: 'radio', color: '#fb923c',
    items: [
      { name: 'The Hacker News', url: 'https://thehackernews.com', desc: 'Actualités cybersec quotidiennes', tag: 'News', difficulty: null },
      { name: 'Krebs on Security', url: 'https://krebsonsecurity.com', desc: 'Blog sécurité de référence', tag: 'Blog', difficulty: null },
      { name: 'Dark Reading', url: 'https://www.darkreading.com', desc: 'Analyses & tendances sécurité', tag: 'News', difficulty: null },
      { name: 'r/netsec', url: 'https://reddit.com/r/netsec', desc: 'Communauté Reddit sécurité', tag: 'Reddit', difficulty: null },
      { name: 'CVE Details', url: 'https://www.cvedetails.com', desc: 'Base de données CVE', tag: 'Vulns', difficulty: null },
      { name: 'Exploit-DB', url: 'https://www.exploit-db.com', desc: "Archive d'exploits publics", tag: 'Exploits', difficulty: null },
      { name: 'noraj (Rawsec)', url: 'https://www.youtube.com/@noraj_rawsec', desc: 'Pentester & chercheur, outils open-source, sécurité offensive', tag: 'YT FR', difficulty: null },
      { name: 'Fransosiche', url: 'https://www.youtube.com/@Fransosiche', desc: 'Sécurité offensive, recherche technique, partage de connaissances', tag: 'YT FR', difficulty: null },
      { name: 'HacktBack', url: 'https://www.youtube.com/@HacktBack', desc: 'Sécurité offensive, participation communauté technique', tag: 'YT FR', difficulty: null },
      { name: 'TheLaluka', url: 'https://www.youtube.com/@TheLaluka', desc: 'Recherche, offensive security, échanges communautaires', tag: 'YT FR', difficulty: null },
      { name: '0xdf', url: 'https://www.youtube.com/@0xdf/videos', desc: 'Writeups HTB détaillés, méthodologie propre', tag: 'YT EN', difficulty: null },
      { name: 'xct', url: 'https://www.youtube.com/xct_de', desc: "Challenges, techniques d'exploitation avancées", tag: 'YT EN', difficulty: null },
      { name: 'IppSec', url: 'https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA', desc: 'Référence absolue des writeups Hack The Box', tag: 'YT EN', difficulty: null },
      { name: 'John Hammond', url: 'https://www.youtube.com/@_JohnHammond', desc: 'CTF, malware analysis, cybersec éducatif', tag: 'YT EN', difficulty: null },
      { name: "Hack'n Speak", url: 'https://open.spotify.com/show/2lwA1WLVqnYvnlc7WkV3yU', desc: 'Podcast cybersec francophone sur Spotify', tag: 'Podcast', difficulty: null },
      { name: 'CyberTalk (HacktBack)', url: 'https://podcast.ausha.co/cybertalk', desc: 'Les cybertalk de HacktBack', tag: 'Podcast', difficulty: null },
      { name: 'Service Hacktion (noraj)', url: 'https://youtube.com/playlist?list=PLcVXqhw7FTyjT8q_hGriUT206_BftWyp8&si=0QGi3uiWiryPt-FS', desc: 'Playlist podcast sécurité offensive par noraj', tag: 'Podcast', difficulty: null },
      { name: 'Critical Thinking', url: 'https://open.spotify.com/show/4GiJnv8f4a4ZR6Jc6TQJ3k', desc: 'Podcast cybersec anglophone', tag: 'Podcast', difficulty: null },
      { name: 'Playlist cyber (Watch Later)', url: 'https://www.youtube.com/playlist?list=PLrxfhfeDL35nx0RNr2BMHY92QTU4eFcwv', desc: 'Playlist YouTube de vidéos cyber à regarder plus tard', tag: 'Watch Later', difficulty: null },
    ],
  },
  {
    category: 'Certifs', icon: 'award', color: '#fbbf24',
    items: [
      { name: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security', desc: 'Certification d\'entrée reconnue mondialement', tag: 'Certif', difficulty: 'Débutant' },
      { name: 'eJPT (INE)', url: 'https://security.ine.com/certifications/ejpt-certification/', desc: 'Junior Penetration Tester', tag: 'Certif', difficulty: 'Débutant' },
      { name: 'OSCP (OffSec)', url: 'https://www.offsec.com/courses/pen-200/', desc: 'Gold standard du pentesting', tag: 'Objectif', difficulty: 'Avancé' },
      { name: 'LinkedIn Cybersec', url: 'https://www.linkedin.com/jobs/cybersecurity-jobs/', desc: "Offres d'emploi cybersec", tag: 'Jobs', difficulty: null },
    ],
  },
  {
    category: 'Ma Progression', icon: 'compass', color: '#8b5cf6',
    items: [
      { name: 'Échelon', url: 'https://echelon.qyrn.dev', desc: 'Mon outil de veille cybersec hebdomadaire (chaque dimanche)', tag: 'Perso', difficulty: null },
      { name: 'ChatGPT', url: 'https://chatgpt.com', desc: 'Assistant IA — usage perso', tag: 'Outil', difficulty: null, adminOnly: true, isPrivate: true },
      { name: 'Roadmap 2026', url: '/api/roadmap', desc: 'Ma roadmap cybersec personnelle avec objectifs et progression', tag: 'Privé', difficulty: null, adminOnly: true, isPrivate: true },
    ],
  },
]
