/* =============================================
   ASVALTCLAN — Main JavaScript
   ============================================= */

/* =============================================
   PAGE NAVIGATION
   ============================================= */
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(pageName);
  if (target) {
    target.classList.add('active');
  }

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navEl = document.getElementById('nav-' + pageName);
  if (navEl) navEl.classList.add('active');

  // Close all dropdowns
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('open'));

  // Close mobile menu
  closeMobileMenu();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Handle URL hash for bookmarking
  if (history.pushState) {
    history.pushState(null, null, '#' + pageName);
  }
}

/* =============================================
   TAB NAVIGATION
   ============================================= */
function showTab(groupId, tabId) {
  // Hide all contents for this group
  document.querySelectorAll('[id^="content-' + groupId + '-"]').forEach(el => el.classList.remove('active'));
  // Remove active from all tab buttons for this group
  document.querySelectorAll('[id^="' + groupId + '-"]').forEach(btn => btn.classList.remove('active'));

  // Show target tab content
  const content = document.getElementById('content-' + groupId + '-' + tabId);
  if (content) content.classList.add('active');

  // Activate tab button
  const btn = document.getElementById(groupId + '-' + tabId);
  if (btn) btn.classList.add('active');
}

/* =============================================
   DROPDOWN TOGGLE
   ============================================= */
function toggleDropdown(name) {
  const item = document.getElementById('dropdown-' + name);
  if (!item) return;

  const isOpen = item.classList.contains('open');

  // Close all dropdowns
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('open'));

  // Open if was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}

// Close dropdown on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('open'));
  }
});

/* =============================================
   MOBILE MENU
   ============================================= */
function toggleMobileMenu() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

function closeMobileMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.remove('open');
}

function toggleMobileSubmenu(id) {
  const sub = document.getElementById(id);
  if (!sub) return;
  sub.classList.toggle('open');
}

/* =============================================
   UTILITIES
   ============================================= */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

/* =============================================
   GECE / GÜNDÜZ MOD (THEME TOGGLE)
   ============================================= */
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  const isDark = body.classList.toggle('dark-theme');
  if (icon) {
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }
  localStorage.setItem('redmarian-theme', isDark ? 'dark' : 'light');
}

// Sayfa yüklenirken temayı uygula — varsayılan KOYU TEMA
(function() {
  const saved = localStorage.getItem('redmarian-theme');
  // Eğer kullanıcı açıkça 'light' seçmediyse dark theme zorla
  if (saved !== 'light') {
    document.body.classList.add('dark-theme');
    if (saved !== 'dark') localStorage.setItem('redmarian-theme','dark');
  }
  document.addEventListener('DOMContentLoaded', function() {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    const isDark = document.body.classList.contains('dark-theme');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  });
})();




/* =============================================
   CONNECT TO CS 1.6 SERVER
   ============================================= */
function connectCS() {
  window.location.href = 'steam://connect/95.173.173.172:27015';
}

function routeFromHash() {
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'hakkimizda', 'fiyatlar', 'yonetim', 'medya', 'yonlendirme', 'server'];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  }
}

/* =============================================
   SLOT PURCHASE — redirect to TS3
   ============================================= */
function buySlot(num) {
  window.location.href = 'ts3server://RedMarianJB';
}

/* =============================================
   SUNUCUM DETAIL MODAL
   ============================================= */
function openSunucumDetail() {
  document.getElementById('sunucumModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSunucumModal(event) {
  if (event && event.target !== document.getElementById('sunucumModal')) return;
  document.getElementById('sunucumModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   MEMBER DETAIL MODAL
   ============================================= */
const memberData = {
  'xPantik': {
    adSoyad: 'Umut',
    hesapAdi: 'xPantik',
    durum: 'Onaylandı',
    yetki: 'Sunucu Sahibi',
    bakiye: '1.500,00 ₺',
    seviye: '100 Seviye'
  },
  'Buğra': {
    adSoyad: 'Buğra',
    hesapAdi: 'Buğra',
    durum: 'Onaylandı',
    yetki: 'Sunucu Sahibi',
    bakiye: '1.500,00 ₺',
    seviye: '100 Seviye'
  },
  'Keskin': {
    adSoyad: '?',
    hesapAdi: 'Keskin',
    durum: 'Onaylandı',
    yetki: 'Sunucu Yöneticisi',
    bakiye: '0,00 ₺',
    seviye: '80 Seviye'
  },
  'Karahanlı': {
    adSoyad: 'Efe',
    hesapAdi: 'Karahanlı',
    durum: 'Onaylandı',
    yetki: 'Sunucu Sorumlusu',
    bakiye: '0,00 ₺',
    seviye: '60 Seviye'
  },
  'İzmitli': {
    adSoyad: '?',
    hesapAdi: 'İzmitli',
    durum: 'Onaylandı',
    yetki: 'Sunucu Sorumlusu',
    bakiye: '0,00 ₺',
    seviye: '60 Seviye'
  },
  'Selfish': {
    adSoyad: '?',
    hesapAdi: 'Selfish',
    durum: 'Onaylandı',
    yetki: 'Sunucu Yetkilisi',
    bakiye: '0,00 ₺',
    seviye: '40 Seviye'
  },
  'Sahmaran': {
    adSoyad: '?',
    hesapAdi: 'Sahmaran',
    durum: 'Onaylandı',
    yetki: 'Sunucu Yetkilisi',
    bakiye: '0,00 ₺',
    seviye: '40 Seviye'
  }
};

function showMemberDetail(name) {
  const data = memberData[name];
  if (!data) return;

  document.getElementById('modal-name').textContent = name;
  document.getElementById('modal-role').textContent = data.yetki;
  document.getElementById('modal-adsoyad').textContent = data.adSoyad;
  document.getElementById('modal-hesapadi').textContent = data.hesapAdi;

  const durumEl = document.getElementById('modal-durum');
  durumEl.textContent = data.durum;
  durumEl.className = 'modal-val ' + (data.durum === 'Onaylandı' ? 'onaylandi' : 'onaylanmadi');

  document.getElementById('modal-yetki').textContent = data.yetki;
  document.getElementById('modal-bakiye').textContent = data.bakiye;
  document.getElementById('modal-seviye').textContent = data.seviye;

  document.getElementById('memberModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMemberModal(event) {
  if (event && event.target !== document.getElementById('memberModal')) return;
  document.getElementById('memberModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   ANIMATED COUNTER
   ============================================= */
function animateCounter(el, target, duration = 1200) {
  const start = 0;
  const step = (target / duration) * 16;
  let current = start;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', function() {
  // Route from hash on page load
  routeFromHash();

  // Scroll animations with IntersectionObserver
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards
  function observeElements() {
    document.querySelectorAll('.info-card, .rule-card, .pricing-card, .member-card').forEach(el => {
      if (el.style.opacity === '') {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
      }
    });
  }

  observeElements();

  // Re-observe after page changes
  const pageObserver = new MutationObserver(() => {
    observeElements();
  });

  pageObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
});

// Handle hash changes
window.addEventListener('hashchange', routeFromHash);

/* =============================================
   HARİTA FILTRE & ARAMA
   ============================================= */
let currentMapFilter = 'all';
let currentPluginFilter = 'all';

function filterMaps() {
  const query = document.getElementById('map-search-input').value.toLowerCase();
  const cards = document.querySelectorAll('#maps-card-grid .map-card');
  let visible = 0;
  cards.forEach(card => {
    const name = card.dataset.name || '';
    const type = card.dataset.type || '';
    const matchSearch = name.includes(query);
    const matchFilter = currentMapFilter === 'all' || type === currentMapFilter;
    if (matchSearch && matchFilter) { card.style.display = ''; visible++; }
    else { card.style.display = 'none'; }
  });
  const emptyEl = document.getElementById('maps-empty-msg');
  if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
}

function setMapFilter(filter, btn) {
  currentMapFilter = filter;
  document.querySelectorAll('.maps-filter-btns .map-filter-btn:not(.plugin-filter-btn)').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterMaps();
}

function filterPlugins() {
  const query = document.getElementById('plugin-search-input').value.toLowerCase();
  const cards = document.querySelectorAll('#plugin-card-list .plugin-card');
  let visible = 0;
  cards.forEach(card => {
    const name = card.dataset.name || '';
    const type = card.dataset.type || '';
    const matchSearch = name.includes(query);
    const matchFilter = currentPluginFilter === 'all' || type === currentPluginFilter;
    if (matchSearch && matchFilter) { card.style.display = ''; visible++; }
    else { card.style.display = 'none'; }
  });
  const emptyEl = document.getElementById('plugins-empty-msg');
  if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
}

function setPluginFilter(filter, btn) {
  currentPluginFilter = filter;
  document.querySelectorAll('.plugin-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterPlugins();
}

/* =============================================
   ETKİNLİK & MAÇ GERİ SAYIM
   ============================================= */
function getNextWeekday(dayOfWeek, hour, minute) {
  // dayOfWeek: 0=Sun,1=Mon,...,6=Sat
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  let diff = dayOfWeek - now.getDay();
  if (diff < 0) diff += 7;
  else if (diff === 0 && now >= target) diff = 7; // already passed today
  target.setDate(now.getDate() + diff);
  return target;
}

function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return (days > 0 ? days + 'g ' : '') +
    String(hours).padStart(2,'0') + ':' +
    String(mins).padStart(2,'0') + ':' +
    String(secs).padStart(2,'0');
}

function updateCountdowns() {
  // Etkinlik: Her Pazar 21:00
  const etkinlikEl = document.getElementById('etkinlik-timer');
  if (etkinlikEl) {
    const next = getNextWeekday(0, 21, 0);
    etkinlikEl.textContent = formatCountdown(next - new Date());
  }
  // Maç Pazar: 22:00
  const macPazarEl = document.getElementById('mac-pazar-timer');
  if (macPazarEl) {
    const next = getNextWeekday(0, 22, 0);
    macPazarEl.textContent = formatCountdown(next - new Date());
  }
  // Maç Cumartesi: 21:00
  const macCumEl = document.getElementById('mac-cumartesi-timer');
  if (macCumEl) {
    const next = getNextWeekday(6, 21, 0);
    macCumEl.textContent = formatCountdown(next - new Date());
  }
}

setInterval(updateCountdowns, 1000);
updateCountdowns();

// ESC key closes all modals
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('memberModal').classList.remove('open');
    document.getElementById('sunucumModal').classList.remove('open');
    const panelOverlay = document.getElementById('panelModalOverlay');
    if (panelOverlay && panelOverlay.classList.contains('open')) {
      closePanelModal();
    }
    document.body.style.overflow = '';
  }
});

/* =============================================
   YOUTUBE IFRAME API CONTROLS
   ============================================= */
// Track play state per video
const ytPlaying = {};

function getYTFrame(id) {
  return document.getElementById(id);
}

function ytSendCmd(frameId, func, args) {
  const frame = getYTFrame(frameId);
  if (!frame) return;
  const msg = JSON.stringify({ event: 'command', func: func, args: args || [] });
  frame.contentWindow.postMessage(msg, '*');
}

function ytPlayPause(frameId) {
  const iconId = frameId.replace('ytVideo', 'ytPlayIcon');
  const icon = document.getElementById(iconId);
  if (ytPlaying[frameId]) {
    ytSendCmd(frameId, 'pauseVideo');
    ytPlaying[frameId] = false;
    if (icon) { icon.className = 'fas fa-play'; }
  } else {
    ytSendCmd(frameId, 'playVideo');
    ytPlaying[frameId] = true;
    if (icon) { icon.className = 'fas fa-pause'; }
  }
}

function ytMuteToggle(frameId, iconId) {
  const icon = document.getElementById(iconId);
  const slider = document.getElementById(frameId.replace('ytVideo', 'ytVol'));
  if (icon && icon.className.includes('mute')) {
    ytSendCmd(frameId, 'unMute');
    icon.className = 'fas fa-volume-up';
    if (slider) slider.value = 100;
  } else {
    ytSendCmd(frameId, 'mute');
    if (icon) icon.className = 'fas fa-volume-mute';
    if (slider) slider.value = 0;
  }
}

function ytSetVolume(frameId, val, iconId) {
  ytSendCmd(frameId, 'setVolume', [parseInt(val)]);
  const icon = document.getElementById(iconId);
  if (!icon) return;
  if (val == 0) icon.className = 'fas fa-volume-mute';
  else if (val < 50) icon.className = 'fas fa-volume-down';
  else icon.className = 'fas fa-volume-up';
}

/* =============================================
   ANAHTAR MODU — PANEL SİSTEMİ
   ============================================= */

// Panel verileri (güvenli saklama)
const PANEL_DATA = {
  xpantik: {
    name: 'xPantik',
    role: 'Yönetici Hesap',
    adminPass: '990031',
    panelPass: 'ferostgamingjb@gmail.com',
    features: [
      'Tam yönetim — tüm yetkiler mevcut',
      'Yetki bölümü (ekleme, silme, düzenleme)',
      'Harita bölümü (harita değiştirme, yönetim)',
      'Eklenti bölümü (eklenti yönetimi)',
      'Ana RCON bölümü (sunucu komutları)'
    ]
  },
  bugra: {
    name: 'Buğra',
    role: 'Yönetici Hesap',
    adminPass: '4214131342dsasax',
    panelPass: 'buyukdoganbugra1@gmail.com',
    features: [
      'Tam yönetim — tüm yetkiler mevcut',
      'Yetki bölümü (ekleme, silme, düzenleme)',
      'Harita bölümü (harita değiştirme, yönetim)',
      'Eklenti bölümü (eklenti yönetimi)',
      'Ana RCON bölümü (sunucu komutları)'
    ]
  },
  xmemo: {
    name: 'xMemo',
    role: 'Yetkili',
    adminPass: 'qwert1234',
    panelPass: '718598',
    features: [
      'Yetki yazma',
      'Yetki silme',
      'Yetki düzenleme'
    ]
  },
  karahanli: {
    name: 'Karahanli',
    role: 'Yetkili',
    adminPass: 'steam1',
    panelPass: '446743',
    features: [
      'Yetki yazma'
    ]
  },
  albayim: {
    name: 'Albayım',
    role: 'Yetkili',
    adminPass: 'kaya61',
    panelPass: '193480',
    features: [
      'Yetki yazma'
    ]
  }
};

let currentPanelUser = null;   // hangi kullanıcı açık
let panelUnlocked = false;     // bu oturumda açık mı

function openPanelModal(userId) {
  currentPanelUser = userId;
  panelUnlocked = false;

  // Reset to step 1
  document.getElementById('panelStep1').style.display = '';
  document.getElementById('panelStep2').style.display = 'none';

  const user = PANEL_DATA[userId];
  document.getElementById('panelModalUserTitle').textContent = user.name + ' — Giriş';

  // Reset input & hints
  const input = document.getElementById('panelPasswordInput');
  input.value = '';
  input.className = 'panel-modal-input';
  document.getElementById('panelHint').textContent = '';
  document.getElementById('panelHint').className = 'panel-modal-hint';

  const iconWrapEl = document.getElementById('panelModalIconWrap');
  const iconEl = document.getElementById('panelModalIcon');
  if (iconWrapEl) iconWrapEl.className = 'panel-modal-icon';
  if (iconEl) iconEl.className = 'fas fa-lock';

  // Open overlay
  document.getElementById('panelModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => input.focus(), 200);
}

function closePanelModalOutside(e) {
  if (e.target === document.getElementById('panelModalOverlay')) {
    closePanelModal();
  }
}

function closePanelModal() {
  document.getElementById('panelModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentPanelUser = null;
  panelUnlocked = false;
}

function checkPanelPassword() {
  const input = document.getElementById('panelPasswordInput');
  const hint = document.getElementById('panelHint');
  const iconWrap = document.getElementById('panelModalIconWrap');
  const iconEl = document.getElementById('panelModalIcon');
  const val = input.value.trim();
  const user = PANEL_DATA[currentPanelUser];

  if (!user) return;

  if (val === user.adminPass) {
    // Doğru şifre — adım 2'ye geç
    iconWrap.className = 'panel-modal-icon unlocked';
    iconEl.className = 'fas fa-unlock-alt';
    hint.textContent = '✓ Doğru şifre!';
    hint.className = 'panel-modal-hint hint-ok';
    panelUnlocked = true;

    setTimeout(() => {
      // Step 2 doldur
      document.getElementById('panelInfoName').textContent = user.name;
      document.getElementById('panelInfoRole').textContent = user.role;
      document.getElementById('panelSecretVal').textContent = user.panelPass;
      document.getElementById('panelCopyHint').textContent = '';

      // Özellikleri listele
      const ul = document.getElementById('panelFeaturesList');
      ul.innerHTML = '';
      user.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        ul.appendChild(li);
      });

      // Step geçişi
      document.getElementById('panelStep1').style.display = 'none';
      document.getElementById('panelStep2').style.display = '';
    }, 500);

  } else {
    // Yanlış şifre
    hint.textContent = '✗ Hatalı şifre! Tekrar deneyin.';
    hint.className = 'panel-modal-hint';
    input.className = 'panel-modal-input input-wrong';
    iconWrap.className = 'panel-modal-icon wrong';
    iconEl.className = 'fas fa-times';
    input.value = '';
    setTimeout(() => {
      input.className = 'panel-modal-input';
      iconWrap.className = 'panel-modal-icon';
      iconEl.className = 'fas fa-lock';
    }, 1000);
    setTimeout(() => input.focus(), 100);
  }
}

/* ─────────────────────────────────────────────
   T HOOK ACCORDION
───────────────────────────────────────────── */
function toggleThookAcc(btn) {
  const item = btn.closest('.thook-acc-item');
  const body = item.querySelector('.thook-acc-body');
  const arrow = btn.querySelector('.thook-acc-arrow');
  const isOpen = item.classList.contains('thook-acc-open');

  // Close all
  document.querySelectorAll('.thook-acc-item').forEach(i => {
    i.classList.remove('thook-acc-open');
    i.querySelector('.thook-acc-body').style.display = 'none';
    const a = i.querySelector('.thook-acc-arrow');
    if (a) { a.classList.remove('fa-chevron-up'); a.classList.add('fa-chevron-down'); }
  });

  // Open clicked (if it was closed)
  if (!isOpen) {
    item.classList.add('thook-acc-open');
    body.style.display = '';
    if (arrow) { arrow.classList.remove('fa-chevron-down'); arrow.classList.add('fa-chevron-up'); }
  }
}

function copyPanelSecret() {
  const val = document.getElementById('panelSecretVal').textContent;
  const hint = document.getElementById('panelCopyHint');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(val).then(() => {
      hint.textContent = '✓ Kopyalandı!';
      setTimeout(() => { hint.textContent = ''; }, 2000);
    });
  } else {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = val; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
    hint.textContent = '✓ Kopyalandı!';
    setTimeout(() => { hint.textContent = ''; }, 2000);
  }
}

// Anahtar Modu kaldırıldı

/* =============================================
   NAVBAR PROFILE DROPDOWN
   ============================================= */
function toggleNavProfile() {
  const wrap = document.getElementById('navProfileWrap');
  if (wrap) wrap.classList.toggle('open');
}

// Close on outside click
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('navProfileWrap');
  if (wrap && !wrap.contains(e.target)) wrap.classList.remove('open');
});

/* =============================================
   BİZ KİMİZ? ACCORDION — toggleBkAcc
   (multiple open allowed)
   ============================================= */
function toggleBkAcc(id) {
  const item = document.getElementById(id);
  if (!item) return;
  item.classList.toggle('bk-open');
}

/* =============================================
   ARALONE AI BOT
   ============================================= */
/* =============================================
   ARALONECLAN AI — GENİŞLETİLMİŞ BİLGİ TABANI
   ============================================= */
const AI_KB = [
  // --- Kuruluş & Genel ---
  { q: ['redmarian ne zaman kuruldu','aralone ne zaman kuruldu','ne zaman kuruldu','kuruluş tarihi','kuruluş yılı','2025'], a: 'RedMarian, <strong>2025 yılında</strong> xPantik (Umut Altın) tarafından kurulmuştur. Kuruluştan itibaren kaliteli, güvenilir ve eğlenceli bir oyuncu ortamı oluşturma hedefiyle yola çıkılmıştır.' },
  { q: ['redmarian nedir','redmarian ne','aralone gaming nedir','aralone nedir'], a: 'RedMarian; Counter-Strike 1.6 başta olmak üzere oyunculara kaliteli, güvenilir ve eğlenceli bir ortam sunan profesyonel bir oyuncu topluluğu ve klan organizasyonudur. Sıradan bir klandan çok, güçlü bir aile olma anlayışıyla hareket eder.' },
  { q: ['amacınız nedir','misyon','hedef','topluluğun amacı','aralone gaming hedefi'], a: 'RedMarian\'in temel amacı Türkiye\'nin saygın ve uzun ömürlü oyuncu topluluklarından biri olmaktır. Bunun için kaliteli oyun deneyimi sunmak, saygılı bir topluluk oluşturmak ve oyuncular arasında güçlü bağlar kurmak hedeflenmektedir.' },
  { q: ['aralone büyük mü','kaç üye','üye sayısı','toplulukta kaç kişi','kaç kişi'], a: 'RedMarian, kuruluşundan bu yana sürekli büyüyen bir topluluktur. Şu an 10+ aktif üyeyle faaliyet göstermekte olup topluluğumuz her geçen gün büyümektedir. Güncel istatistikler anasayfa istatistik bölümünde yer alıyor.' },
  { q: ['nerede aktif','hangi oyun','hangi platform'], a: 'RedMarian öncelikli olarak <strong>Counter-Strike 1.6</strong> ve <strong>TeamSpeak3</strong> platformlarında aktiftir.' },
  { q: ['aralone gaming neden kuruldu','neden kuruldu','kuruluş nedeni'], a: 'Oyuncuların kaliteli ve güvenilir bir ortamda vakit geçirebileceği, yeni dostluklar kurabileceği profesyonel bir topluluk oluşturmak amacıyla kurulmuştur. Sıradan, dağınık topluluklara alternatif olarak doğmuştur.' },
  { q: ['aralone ailesi','aralone gaming ailesi'], a: 'RedMarian ailesi; birbirine saygı duyan, destek olan ve birlikte gelişen oyunculardan oluşan güçlü bir topluluğu ifade eder. Burada herkes değerlidir.' },
  { q: ['aralone güvenilir mi','güvenilir mi'], a: 'Evet, RedMarian güven, saygı ve adalet ilkeleri üzerine inşa edilmiştir. Yönetimden üyelere kadar herkes bu değerlere bağlı kalmaktadır.' },
  { q: ['aralone ücretli mi','ücretsiz mi','ücretli katılım','katılım ücreti','para ödemek'], a: 'Hayır! Topluluğa katılım tamamen ücretsizdir. Bazı özel yetkiler ve sunucu paketleri için ayrı fiyatlandırma mevcuttur, ancak genel üyelik tamamen özgürdür.' },
  { q: ['topluluğun değerleri','en önemli değer','temel değerler'], a: 'RedMarian\'in temel değerleri; <strong>saygı, güven, dostluk ve ekip ruhu</strong>dur. Bu değerler topluluğun günlük işleyişinde belirleyici rol oynar.' },
  { q: ['neden redmarian','neden redmarian gaming','tercih sebebi'], a: 'Aktif topluluk, profesyonel yönetim, güvenli ortam ve samimi oyuncu kitlesiyle kaliteli bir deneyim sunuyoruz. Burada sadece oyun oynamazsın — gerçek dostluklar kurarsın. 🎮' },
  { q: ['aralone gaming planları','gelecek planları','gelecekte neler','neler planlıyorsunuz'], a: 'Daha fazla etkinlik düzenlemek, gelişmiş sistemler kurmak ve daha büyük bir oyuncu topluluğu oluşturmak en önemli hedeflerimiz arasında. Sürekli gelişmeyi temel ilke olarak benimsedik.' },
  { q: ['aralone gaming adı','aralone adı neden','aralone ismi'], a: 'Aralone, topluluğun kimliğini ve uzun vadeli vizyonunu temsil eden özel bir isimdir. Klanın karakter ve kişiliğini yansıtmak amacıyla seçilmiştir.' },

  // --- xPantik ---
  { q: ['xpantik kimdir','xpantik kim','kurucu kim','yönetici kim','başkan kim','topluluğun sahibi'], a: 'xPantik, gerçek adıyla <strong>Umut Altın</strong>, RedMarian\'in kurucusu ve baş yöneticisidir. Topluluğun tüm stratejik kararlarını yönetir, etkinlikler ve geliştirme süreçlerinden birinci derecede sorumludur.' },
  { q: ['xpantik gerçek adı','umut altın'], a: 'xPantik\'in gerçek adı <strong>Umut Altın</strong>\'dır.' },
  { q: ['xpantik youtube','xpantik instagram','xpantik sosyal medya'], a: 'xPantik\'e YouTube\'dan <strong>@xpantikx</strong>, Instagram\'dan <strong>@xpantikbey</strong> üzerinden ulaşabilirsiniz.' },
  { q: ['xpantik ne yapıyor','xpantik görevi','xpantik rolü'], a: 'xPantik; organizasyon geliştirme, yönetim, etkinlik planlama, topluluk büyütme ve altyapı yönetimi başta olmak üzere topluluğun tüm kritik faaliyetlerini yürütmektedir.' },

  // --- Klana Katılım ---
  { q: ['klana nasıl katılabilirim','nasıl katılırım','üye olmak istiyorum','başvuru','aralone gaming nasıl katılabilirim','aralone katılım'], a: 'RedMarian\'e katılmak için TeamSpeak3 sunucumuza (<strong>RedMarianJB</strong>) bağlanarak yönetimle iletişime geçebilirsin. Kurallara uyan ve topluluk kültürüne saygı gösteren herkes aramıza katılabilir.' },
  { q: ['yetkili başvurusu','admin olmak','yetkili olmak','yetkili başvuru','yetkili nasıl olunur','yetkili olma'], a: 'Yetkili olabilmek için öncelikle toplulukta aktif olman, kurallara uyum sağlaman ve örnek bir davranış sergilemen beklenir. Başvuru için TeamSpeak3 üzerinden <strong>xPantik</strong> veya yönetimle iletişime geç. Tüm başvurular dikkatlice değerlendirilir.' },
  { q: ['başvuru şartları','üyelik şartları','gereksinimleri','yeni oyuncular kabul'], a: 'Evet, yeni oyuncular her zaman aramıza katılabilir! Temel şartlar: kurallara uymak, saygılı olmak ve aktif katılım sağlamak. Seninle aynı değerleri paylaşıyorsan kapılar açık! 🚪' },

  // --- CS 1.6 Sunucu ---
  { q: ['cs 1.6 sunucu adresi','sunucu ip','server ip','ip adresi','sunucu adresi nedir','sunucu bilgileri'], a: 'CS 1.6 Sunucu Adresi: <strong>95.173.173.172:27015</strong> — Sunucu Bilgileri sayfasından da güncel adrese ulaşabilirsin.' },
  { q: ['cs 1.6 portu','sunucu portu'], a: 'CS 1.6 sunucu portu: <strong>27015</strong>' },
  { q: ['kaç kişilik','oyuncu kapasitesi','sunucu kapasitesi'], a: 'CS 1.6 sunucumuz <strong>32 oyuncu</strong> kapasitesine sahiptir.' },
  { q: ['sunucular aktif mi','sunucu aktif','aktif sunucu'], a: 'Evet! Sunucularımız düzenli olarak kontrol edilmekte ve oyuncularımıza kesintisiz hizmet sunmak için aktif tutulmaktadır.' },
  { q: ['harita türü','oyun modu','jailbreak','jail break'], a: 'Sunucumuzda <strong>JailBreak</strong> harita modu oynanmaktadır.' },
  { q: ['anti-hile','anti cheat','vac','hile koruması'], a: 'Sunucumuzda aktif Anti-Cheat sistemi mevcuttur. Hile kullanımı tespit edildiğinde <strong>kalıcı ban</strong> uygulanır — bu konuda sıfır tolerans anlayışımız var.' },
  { q: ['cs 1.6 ne zaman açılıyor','sunucu açılışı','cs açılış tarihi'], a: 'CS 1.6 sunucumuzun yakında aktif hale gelmesi planlanmaktadır. Güncel duyurular için Haberler sayfasını ve Instagram hesabımızı takip edebilirsin.' },
  { q: ['cs bağlan','nasıl bağlanırım','sunucuya katıl'], a: 'Sunucuya katılmak için Steam konsoluna <code>connect 95.173.173.172:27015</code> yazabilirsin. Sunucu Adresi sayfasında daha fazla detay mevcut.' },
  { q: ['maç sunucusu','maç sunucu','maç organizasyonu'], a: 'Evet! Maç organizasyonları için özel sunucu desteğimiz bulunmaktadır. 5v5 rekabetçi formatında hafta içi ve hafta sonu düzenli maçlar yapılmaktadır. Maç Saatleri sayfasından detaylara ulaşabilirsin.' },

  // --- TeamSpeak3 ---
  { q: ['teamspeak adresi','ts3 adresi','ts adres','teamspeak3','teamspeak 3 adresi'], a: 'TeamSpeak3 sunucu adresi: <strong>RedMarianJB</strong> — TS3 istemcini aç, sunucu adresine yaz ve bağlan. Şifre yok, tamamen ücretsiz! 🎧' },
  { q: ['ts3 şifresi','teamspeak şifre'], a: 'TeamSpeak3 sunucumuz şifresizdir. Direkt <strong>RedMarianJB</strong> adresine bağlanabilirsin, hiçbir ek işlem gerekmez.' },
  { q: ['ts3 portu','teamspeak portu'], a: 'TeamSpeak3 varsayılan port olan <strong>9987</strong> kullanılmaktadır.' },

  // --- Kurallar ---
  { q: ['kurallar nelerdir','sunucu kuralları','genel kurallar','kurallar'], a: 'Temel kurallarımız:<br>① Küfür ve hakaret kesinlikle yasaktır<br>② Her türlü hile yasaktır<br>③ Teamkill yasaktır<br>④ AFK kalmak yasaktır<br>⑤ Diğer oyunculara saygılı davranmak zorunludur<br><br>Tüm detaylar için Hakkımızda › Sunucu Kuralları sayfasını ziyaret edebilirsin.' },
  { q: ['hile kullanmak','aimbot','wallhack','speedhack','cheat'], a: 'Her türlü hile (aimbot, wallhack, speedhack vb.) kesinlikle yasaktır. Tespit edildiğinde <strong>kalıcı ban</strong> uygulanır. Adil oyun anlayışımız için bu kurala sıfır toleransımız var.' },
  { q: ['küfür','hakaret','ırkçılık'], a: 'Sunucumuzda küfür, hakaret ve ırkçı ifadeler kesinlikle yasaktır. Saygılı iletişim topluluğumuzun temelidir. Kural ihlali yaptırımlarla sonuçlanır.' },
  { q: ['ceza sistemi','ban sistemi','yaptırım','ban kaldırma','ban itiraz'], a: 'Yaptırım sistemi şu şekilde işler: 1.İhlal → Uyarı • 2.İhlal → Slap • 3.İhlal → Kick • 4.İhlal → 1 Saat Ban • 5.İhlal+ → Kalıcı Ban. Ağır ihlallerde doğrudan kalıcı ban uygulanabilir. Ban kaldırma talepleri duruma göre yönetim tarafından değerlendirilir.' },
  { q: ['teamkill','takım arkadaşı vurma'], a: 'Takım arkadaşlarını kasıtlı vurmak (teamkill) yasaktır ve yaptırımla sonuçlanır.' },
  { q: ['yetkili kuralları','admin kuralları'], a: 'Yetkili kuralları; hakaret etmemek, yetkiyi kötüye kullanmamak, oyunculara adil davranmak ve tüm klan kurallarına uymaktan oluşur. Detaylar için Hakkımızda › Yetkili Kuralları sayfasına bakabilirsin.' },
  { q: ['küfür serbest mi'], a: 'Hayır, kesinlikle değil. 😊 Saygılı iletişim topluluğumuzun en temel kuralıdır. Küfür ve hakaret her koşulda yasaktır.' },

  // --- Fiyatlar & Paketler ---
  { q: ['fiyatlar','paketler','ücretler','ne kadar','kaça','fiyat'], a: 'Fiyat paketlerimiz: <strong>Server Query</strong> 750₺, <strong>RedMarian.Com</strong> 650₺, <strong>95.173.173.11X</strong> 550₺, <strong>Legandary</strong> 375₺, <strong>Sunucu Sahibi</strong> 275₺, <strong>Komutcu Sorumlusu</strong> 500₺, <strong>Komutcu Başkanı</strong> 400₺/ay. Tüm detaylar için Fiyatlar sayfasını ziyaret et!' },
  { q: ['thook nedir','t-hook','thook fiyatı','thook'], a: 'Thook yetkisi, kafes içinde hook kullanma hakkı sağlar. Aylık paketler 200₺\'den başlamaktadır. Fiyatlar › Thook Fiyatları sayfasından detaylı inceleme yapabilirsin.' },
  { q: ['ortaklık','ortak olmak','ortaklık paketleri'], a: 'Ortaklık paketleri 275₺\'den başlamaktadır. Admin Server Query, Server Query, RedMarian.Com ve daha birçok paket mevcuttur. Fiyatlar sayfasından detaylı inceleme yapabilir, yönetimle iletişime geçebilirsin.' },

  // --- Panel & Hesap ---
  { q: ['hesap nasıl açılır','kayıt','hesap oluşturma','nasıl kayıt'], a: 'Hesap oluşturmak için sağ üst köşedeki <strong>"Hesabım"</strong> butonuna tıklayarak kayıt formuna ulaşabilirsin.' },
  { q: ['panel nedir','yönetim paneli','hesap paneli'], a: 'Kullanıcı panelinizde: Dashboard, bakiye yükleme, ürün satın alma, sunucu bağlantısı ve hesap ayarları gibi birçok özellik bulunmaktadır.' },
  { q: ['şifremi unuttum','şifre sıfırlama'], a: 'Şifrenizi unuttuysanız yönetimle iletişime geçebilirsiniz. Hesap sıfırlama işlemi manuel olarak gerçekleştirilmektedir.' },

  // --- Etkinlikler ---
  { q: ['etkinlik','etkinlikler','organizasyon','tournuva','turnuva'], a: 'Evet! Zaman zaman çeşitli etkinlikler, oyun organizasyonları ve topluluk aktiviteleri düzenlenmektedir. En son etkinlik duyuruları için Haberler sayfasını ve Instagram hesabımızı takip edebilirsin.' },
  { q: ['aktiflik neden önemli','aktiflik'], a: 'Aktif üyeler topluluğun gelişimine katkı sağlar, etkinliklerden daha fazla yararlanır ve zamanla daha fazla sorumluluk alma fırsatı yakalayabilir. Aktif olmak, klanın büyümesine ortak olmak demektir.' },

  // --- Şikayet & Öneri ---
  { q: ['şikayet','şikayetimi nereye','bildirim','sorun bildirme'], a: 'Şikayetini veya sorununu yönetim ekibine TeamSpeak3 (RedMarianJB) üzerinden iletebilirsin. Her bildirim ciddiye alınarak değerlendirilir.' },
  { q: ['öneri','öneri verebilir miyim','önerim var'], a: 'Elbette! Topluluğumuz üyelerin önerilerine büyük önem verir. Fikirlerini TeamSpeak3 üzerinden yönetimle paylaşabilirsin. Doğru öneriler hızla hayata geçirilebilir. 💡' },

  // --- İletişim ---
  { q: ['iletişim','nasıl ulaşabilirim','discord','ts3 iletişim'], a: 'Bize TeamSpeak3 (RedMarianJB) üzerinden, Instagram (@RedMarian veya @xPantikBey) ya da YouTube üzerinden ulaşabilirsin.' },
  { q: ['destek','sorun','yardım','destek talebi'], a: 'Destek talebi için TeamSpeak3 sunucumuza (<strong>RedMarianJB</strong>) bağlanarak yönetimden yardım isteyebilirsin. Yönetim ekibi en kısa sürede dönüş yapacaktır.' },
  { q: ['discord','discord sunucusu'], a: 'Güncel iletişim platformlarımız için Instagram hesabımızı (@RedMarian) takip edebilirsin. Discord dahil tüm iletişim bilgilerine oradan ulaşabilirsin.' },

  // --- Medya ---
  { q: ['youtube','kanal','video','youtube kanalı'], a: 'YouTube kanalı: <strong>@RedMarian</strong> — Klana ait içerikler, etkinlik videoları ve duyurular bu kanalda yayınlanmaktadır.' },
  { q: ['instagram','instagram hesabı','instagram takip'], a: 'Instagram hesabımız: <strong>@RedMarian</strong> — En güncel haberler, etkinlik duyuruları ve topluluk paylaşımları için takip et!' },

  // --- AI Hakkında ---
  { q: ['siz gerçek yapay zeka mısınız','yapay zeka mısın','bot musun','kim sin','sen kimsin'], a: 'Ben <strong>RedMarian AI</strong>\'yım — RedMarian topluluğu için geliştirilmiş bir yapay zeka asistanıyım. Topluluk, sunucular, kurallar, yönetim ve xPantik hakkında sorularına cevap vermek için buradayım. 🤖' },
  { q: ['ne tür sorular sorabilirim','ne sorabilirim','neleri biliyorsun'], a: 'RedMarian, xPantik, CS 1.6 sunucusu, TeamSpeak 3, kurallar, yönetim, etkinlikler, fiyatlar ve topluluk hakkında her türlü soruyu sorabilirsin. Yardımcı olmak için buradayım!' },
  { q: ['yardımcı olabilir misin','yardım edebilir misin'], a: 'Elbette! RedMarian hakkında merak ettiğin her konuda elimden geldiğince yardımcı olmaya çalışırım. Ne öğrenmek istiyorsun? 😊' },

  // --- Yönetim ---
  { q: ['yönetim kadrosu','yönetimde kimler','kimler yönetiyor','yönetim ekibi'], a: 'Güncel yönetim bilgileri için Yönetim Kadrosu sayfasını ziyaret edebilirsin. Şu an <strong>xPantik</strong> baş yönetici olarak görev yapmaktadır.' },
  { q: ['arkadaş edinebilir miyim','arkadaş'], a: 'Tabii ki! Topluluğumuzun en temel amaçlarından biri yeni dostluklar kurabilmektir. RedMarian\'de birçok oyuncuyla tanışma fırsatı bulacaksın. 🤝' },
];

/* ACAI JS fonksiyonları tamamen kaldırıldı — HTML ve CSS ile birlikte temizlendi */

/* =============================================
   YASAKLILAR — ARAMA & FİLTRE (Haritalar sistemi)
   ============================================= */
let currentBanFilter = 'all';

function filterBans() {
  const query = (document.getElementById('ban-search-input')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('#ban-cards-grid .map-card');
  let visible = 0;
  cards.forEach(card => {
    const name = (card.dataset.name || '').toLowerCase();
    const type = (card.dataset.type || '').toLowerCase();
    const matchSearch = !query || name.includes(query);
    const matchFilter = currentBanFilter === 'all' || type === currentBanFilter;
    if (matchSearch && matchFilter) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  // Boş sonuç mesajı
  const empty = document.getElementById('ban-empty');
  if (empty) empty.style.display = visible === 0 ? 'flex' : 'none';
}

function setBanFilter(filter, btn) {
  currentBanFilter = filter;
  document.querySelectorAll('[data-ban-filter]').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterBans();
}

/* ============================================================
   ESKİ AI FONKSİYONLARI (Biz Kimiz? bölümü için — uyumluluk)
   ============================================================ */
function aiGetAnswer(question) {
  return acaiGetAnswer(question);
}

function aiAppendMsg(text, type, isHTML = false) {
  const msgs = document.getElementById('aiMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `ai-msg ${type}`;
  const avatarIcon = type === 'bot' ? 'fa-robot' : 'fa-user';
  const avatarHtml = `<div class="ai-msg-avatar"><i class="fas ${avatarIcon}"></i></div>`;
  const bubble = document.createElement('div');
  bubble.className = 'ai-msg-bubble';
  if (isHTML) bubble.innerHTML = text;
  else bubble.textContent = text;
  div.innerHTML = avatarHtml;
  div.appendChild(bubble);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function aiShowTyping() {
  const msgs = document.getElementById('aiMessages');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.className = 'ai-msg bot ai-typing';
  div.id = 'aiTypingIndicator';
  div.innerHTML = `<div class="ai-msg-avatar"><i class="fas fa-robot"></i></div><div class="ai-msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function aiSend() {
  const input = document.getElementById('aiInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  aiAsk(text);
}

function aiAsk(question) {
  aiAppendMsg(question, 'user');
  const typing = aiShowTyping();
  setTimeout(() => {
    if (typing) typing.remove();
    const answer = aiGetAnswer(question);
    if (answer) {
      aiAppendMsg(answer, 'bot', true);
    } else {
      aiAppendMsg('Bu konuda bilgim yok, ama RedMarian, sunucular veya kurallar hakkında sormak istediğin her şeyi yanıtlayabilirim!', 'bot');
    }
  }, 800 + Math.random() * 400);
}




function ytQuality(frameId, quality) {
  ytSendCmd(frameId, 'setPlaybackQuality', [quality]);
}

// Handle click outside mobile menu
document.addEventListener('click', function(e) {
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.getElementById('hamburger');
  if (mobileNav && mobileNav.classList.contains('open')) {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});
