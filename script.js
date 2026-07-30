// ============================================================
// Mandir Guesser
// A picture-guessing game: name the BAPS mandir (or match the
// murtis to their local mandir, in the expert round) before your
// three strikes run out.
//
// Built from a Claude Design mockup ("Mandir Guesser.dc.html").
// This file is plain, dependency-free JavaScript — no frameworks,
// no build step — so it runs straight in the browser off GitHub
// Pages. Team: feel free to tweak CONFIG, add more mandirs to the
// MANDIRS list below, or restyle things in style.css.
// ============================================================

(function () {
  'use strict';

  // ---------- gameplay settings — tweak these freely ----------
  const CONFIG = {
    timerOn: true,
    timerSeconds: 20,        // seconds per question, Guess the Mandir round
    murtiTimerSeconds: 40,   // seconds per question, Match the Murti round
    hintsPerGame: 3,
    strikesAllowed: 3,
    pointsPerQuestion: 10,
    soundOn: true,
  };

  // ---------- content: mandirs, murtis, and their hints ----------
  // IMPORTANT: the hint facts below are DRAFTS carried over from the
  // design mockup. Per the project README, every date, name, and detail
  // here must be checked against a real source (the printed book,
  // Anirdesh, or a sadhu) before this is used at the gala — do not trust
  // an AI tool to have gotten these right, and do not add new facts from
  // one either.
  const MANDIRS = [
    { id: 'robbinsville', name: 'Robbinsville Akshardham', city: 'New Jersey, USA', group: 'na', region: 'us-east', ne: true, neRegion: 'ne-nj',
      hints: { location: "In central New Jersey, about an hour from both New York City and Philadelphia.",
      fact: "Its full Akshardham was inaugurated on 8 October 2023 — the largest Hindu mandir in the Western Hemisphere, built by over 12,500 volunteers across 12 years. The first mandir phase opened back in 2014.",
      guru: "Built to fulfil Pramukh Swami Maharaj's vision; Mahant Swami Maharaj dedicated it around his 90th birthday." } },
    { id: 'edison', name: 'Edison', city: 'New Jersey, USA', group: 'na', region: 'us-east', ne: true, neRegion: 'ne-nj',
      hints: { location: "In the New York metro area — Edison, central New Jersey.",
      fact: "The BAPS Shri Swaminarayan Mandir in Edison was inaugurated in 1998 and is one of the largest BAPS spiritual and cultural centers in the northeastern United States.",
      guru: "Pramukh Swami Maharaj visited Edison in 1994, 2004 and 2007, and personally installed the Nilkanth Varni murti in 2007; the 2019 mandir's murtis were blessed by Mahant Swami Maharaj." } },
    { id: 'atlanta', name: 'Atlanta (Lilburn)', city: 'Georgia, USA', group: 'na', region: 'us-east',
      hints: { location: "In Lilburn, a suburb north-east of Atlanta, Georgia.",
      fact: "Inaugurated in 2007 after 17 months of construction — more than 34,000 hand-carved stone pieces were assembled to create the mandir.",
      guru: "Its murti-pratishtha carries the blessings of Pramukh Swami Maharaj." } },
    { id: 'tampa', name: 'Tampa', city: 'Florida, USA', group: 'na', region: 'us-east',
      hints: { location: "On Florida's Gulf coast.",
      fact: "A BAPS mandir serving the west-central Florida community.",
      guru: "Consecrated with the guru's blessings." } },
    { id: 'chicago', name: 'Chicago (Bartlett)', city: 'Illinois, USA', group: 'na', region: 'us-central',
      hints: { location: "In Bartlett, a north-western suburb of Chicago, Illinois.",
      fact: "A traditional hand-carved stone mandir that opened in 2004.",
      guru: "Its murti-pratishtha was performed during Pramukh Swami Maharaj's era." } },
    { id: 'houston', name: 'Houston', city: 'Texas, USA', group: 'na', region: 'us-central',
      hints: { location: "In the largest city in Texas.",
      fact: "Inaugurated in 2004, it is recognised as the first traditional stone Hindu mandir in North America.",
      guru: "Consecrated with Pramukh Swami Maharaj's blessings." } },
    { id: 'chinohills', name: 'Chino Hills', city: 'California, USA', group: 'na', region: 'us-west',
      hints: { location: "In the Inland Empire, east of Los Angeles, California.",
      fact: "Inaugurated in 2012, it is one of the largest traditional Hindu mandirs on the U.S. West Coast.",
      guru: "Consecrated with Pramukh Swami Maharaj's blessings." } },
    { id: 'toronto', name: 'Toronto', city: 'Ontario, Canada', group: 'na', region: 'canada',
      hints: { location: "In Canada's largest city, in Ontario.",
      fact: "Inaugurated in 2007, it was the first traditional stone Hindu mandir in Canada.",
      guru: "Pramukh Swami Maharaj inaugurated it in 2007." } },
    { id: 'neasden', name: 'Neasden (London)', city: 'United Kingdom', group: 'intl', region: 'europe',
      hints: { location: "In north-west London, United Kingdom.",
      fact: "Opened in 1995 as the first traditional Hindu stone mandir in Europe — hand-carved in India, then assembled in London.",
      guru: "Inaugurated by Pramukh Swami Maharaj in August 1995." } },
    { id: 'abudhabi', name: 'Abu Dhabi', city: 'United Arab Emirates', group: 'intl', region: 'mideast',
      hints: { location: "In the capital of the United Arab Emirates, in the Middle East.",
      fact: "The first traditional Hindu stone mandir in the Middle East; its seven spires represent the seven emirates of the UAE.",
      guru: "Envisioned by Pramukh Swami Maharaj in 1997 and inaugurated by Mahant Swami Maharaj on 14 February 2024." } },
    { id: 'nairobi', name: 'Nairobi', city: 'Kenya', group: 'intl', region: 'africa',
      hints: { location: "In the capital of Kenya, in East Africa.",
      fact: "Part of BAPS's long-standing presence in East Africa.",
      guru: "Consecrated with the guru's blessings." } },
    { id: 'delhi', name: 'Akshardham, New Delhi', city: 'Delhi, India', group: 'india', region: 'india-n',
      hints: { location: "On the banks of the Yamuna in India's capital.",
      fact: "Swaminarayan Akshardham, New Delhi — inaugurated on 6 November 2005, known worldwide for its scale and intricate detail.",
      guru: "Created under the inspiration of Pramukh Swami Maharaj." } },
    { id: 'gandhinagar', name: 'Akshardham, Gandhinagar', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In the capital city of Gujarat, India.",
      fact: "Swaminarayan Akshardham, Gandhinagar — inaugurated in 1992, the original Akshardham monument.",
      guru: "Built under the inspiration of Pramukh Swami Maharaj." } },
    { id: 'sarangpur', name: 'Sarangpur', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In the Botad district of Gujarat, India.",
      fact: "Home to the revered Kashtabhanjan Dev Hanumanji shrine — inaugurated in 1916 by Shastriji Maharaj. It is the tallest BAPS mandir in Gujarat and the primary training centre for BAPS sadhus.",
      guru: "Shastriji Maharaj established the mandir here in 1916 and later passed away to Akshardham in Sarangpur in 1951." } },
    { id: 'gadhada', name: 'Gadhada', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In the Botad district of Gujarat, India.",
      fact: "Deeply sacred — Bhagwan Swaminarayan spent many years here; site of the Akshar Deri.",
      guru: "One of the most spiritually significant sites of the Swaminarayan Sampraday." } },
    { id: 'melbourne', name: 'Melbourne', city: 'Australia', group: 'intl', region: 'oceania',
      hints: { location: "In south-eastern Australia.",
      fact: "A BAPS mandir serving the Australian community.",
      guru: "Consecrated with the guru's blessings." } },
    { id: 'auckland', name: 'Auckland', city: 'New Zealand', group: 'intl', region: 'oceania',
      hints: { location: "In New Zealand's largest city.",
      fact: "A BAPS mandir serving the New Zealand community.",
      guru: "Consecrated with the guru's blessings." } },
    { id: 'bochasan', name: 'Bochasan', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In the Anand district of Gujarat, India.",
      fact: "The birthplace of BAPS — Brahmaswarup Shastriji Maharaj established the very first BAPS mandir here in 1907, enshrining Akshar and Purushottam.",
      guru: "Founded by Brahmaswarup Shastriji Maharaj, the first guru of BAPS." } },
    { id: 'atladra', name: 'Atladra (Vadodara)', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In Atladra, Vadodara, Gujarat, India.",
      fact: "One of BAPS's early shikharbaddha mandirs — inaugurated on 12 July 1945 by Brahmaswarup Shastriji Maharaj, the founder of BAPS.",
      guru: "Established by Shastriji Maharaj; long associated with Yogiji Maharaj, who held the first Satsang seminars here." } },
    { id: 'surat', name: 'Surat', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In Adajan, in the diamond city of Surat, on the banks of the Tapi in Gujarat.",
      fact: "Established in 1985, this shikharbaddha mandir's murti pratishtha was performed by Pramukh Swami Maharaj in 1996. Surat later hosted Pramukh Swami Maharaj's 96th birthday celebrations.",
      guru: "Its murtis were consecrated by Pramukh Swami Maharaj." } },
    { id: 'mumbai', name: 'Mumbai (Dadar)', city: 'Maharashtra, India', group: 'india', region: 'india-w',
      hints: { location: "In Dadar, in the heart of Mumbai, Maharashtra.",
      fact: "Known as Akshar Bhuvan, it began as a modest two-room apartment in congested Dadar and was the first mandir consecrated by Yogiji Maharaj outside Gujarat. It housed the 51 youths whom Yogiji Maharaj initiated as sadhus.",
      guru: "Consecrated by Yogiji Maharaj, who passed away to Akshardham in Mumbai on 23 January 1971." } },
    { id: 'anand', name: 'Anand', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In the Charotar region of central Gujarat, near Vidyanagar and Bochasan.",
      fact: "Serves the Anand area of Gujarat's Charotar region — the heartland of BAPS, close to Bochasan where the Sanstha's very first mandir was established in 1907.",
      guru: "A BAPS mandir under the guidance of Mahant Swami Maharaj." } },
    { id: 'ahmedabad', name: 'Ahmedabad (Shahibaug)', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In Shahibaug, Ahmedabad — the international headquarters of BAPS.",
      fact: "Built on a site sanctified by Bhagwan Swaminarayan on his way to bathe in the Sabarmati, this five-spired shikharbaddha mandir was consecrated by Yogiji Maharaj on 11 May 1962, fulfilling Shastriji Maharaj's wish. It celebrated its golden jubilee in 2012.",
      guru: "Consecrated by Yogiji Maharaj in 1962; today the international headquarters under Mahant Swami Maharaj." } },
    { id: 'chansad', name: 'Chansad', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In Chansad, a village near Vadodara in Gujarat.",
      fact: "The birthplace of Pramukh Swami Maharaj — born Shantilal on 7 December 1921; he left Chansad in 1939 to join Shastriji Maharaj and become a sadhu.",
      guru: "Mahant Swami Maharaj consecrated the murtis in this mandir in Pramukh Swami Maharaj's birth village." } },
    { id: 'mahelav', name: 'Mahelav', city: 'Gujarat, India', group: 'india', region: 'india-w',
      hints: { location: "In Mahelav, a village in the Charotar region of Gujarat.",
      fact: "The birthplace of Brahmaswarup Shastriji Maharaj, founder of BAPS (born 31 January 1865). Its three-spired mandir — long a wish of Yogiji Maharaj — was completed by Pramukh Swami Maharaj, who performed the murti pratishtha on 22 January 1999.",
      guru: "A three-shikhar mandir consecrated by Pramukh Swami Maharaj in 1999." } },
  ];

  // Northeast US satsang centers — the Match-the-Murti round draws only
  // from these (plus Robbinsville and Edison above, which are already
  // flagged `ne: true`). Mark `exterior: false` since these aren't part
  // of the "famous mandir photo" round — only the murti-matching round.
  [
    ['hartford', 'Hartford', 'Newington, CT', 'ne-ct', {
      location: "In Newington, in the Greater Hartford area of Connecticut.",
      fact: "The BAPS mandir serving Greater Hartford — inaugurated in 2007.",
      guru: "Consecrated under the guidance of the BAPS guru parampara; today under Mahant Swami Maharaj." }],
    ['newhaven', 'New Haven', 'Milford, CT', 'ne-ct', {
      location: "In Milford, in the New Haven area of Connecticut.",
      fact: "The historic 100th BAPS mandir in North America — its murti pratishtha took place on 7 October 2018.",
      guru: "Its murtis were consecrated by Mahant Swami Maharaj in Edison, NJ in September 2017, then enshrined here in 2018." }],
    ['boston', 'Boston', 'Lowell, MA', 'ne-ma', {
      location: "In Lowell, in the Greater Boston area of Massachusetts.",
      fact: "Serves the New England satsang community, which has been graced by the vicharan (visits) of both Pramukh Swami Maharaj and Mahant Swami Maharaj. A new mandir and Satsang Activity Center in Tyngsboro, MA broke ground in June 2023.",
      guru: "Blessed by the vicharan of Pramukh Swami Maharaj and Mahant Swami Maharaj over the years." }],
    ['southboston', 'South Boston', 'Sharon, MA', 'ne-ma', {
      location: "In Sharon, south of Boston in southeastern Massachusetts.",
      fact: "Inaugurated in 2018, it serves devotees throughout southeastern Massachusetts.",
      guru: "A BAPS mandir under the guidance of Mahant Swami Maharaj." }],
    ['westborough', 'Westborough', 'Westborough, MA', 'ne-ma'],
    ['springfield', 'Springfield', 'Agawam, MA', 'ne-ma'],
    ['albanyny', 'Albany', 'Albany, NY', 'ne-ny'],
    ['longisland', 'Long Island', 'Melville, NY', 'ne-ny'],
    ['flushing', 'New York (Flushing)', 'Flushing, NY', 'ne-ny', {
      location: "In Flushing, Queens — New York City.",
      fact: "The very first BAPS mandir in North America — inaugurated by Pramukh Swami Maharaj in 1974 on historic Bowne Street, with the murti pratishtha in the newly built mandir in 1977. It celebrated its 50th anniversary in 2024.",
      guru: "Founded by Pramukh Swami Maharaj on his first visit to North America in 1974." }],
    ['westchester', 'Westchester', 'Yonkers, NY', 'ne-ny'],
    ['syracuse', 'Syracuse', 'Syracuse, NY', 'ne-ny'],
    ['jerseycity', 'Jersey City', 'North Bergen, NJ', 'ne-nj'],
    ['parsippany', 'Parsippany', 'Parsippany, NJ', 'ne-nj'],
    ['clifton', 'Clifton', 'Clifton, NJ', 'ne-nj'],
    ['cherryhill', 'Cherry Hill', 'Cherry Hill, NJ', 'ne-nj'],
    ['atlanticcity', 'Atlantic City', 'Galloway, NJ', 'ne-nj', {
      location: "In Galloway, near Atlantic City in southern New Jersey.",
      fact: "Inaugurated in 2023, it supports the growing BAPS community in southern New Jersey.",
      guru: "A BAPS mandir under the guidance of Mahant Swami Maharaj." }],
    ['piscataway', 'Piscataway', 'Piscataway, NJ', 'ne-nj'],
    ['philadelphia', 'Philadelphia', 'Levittown, PA', 'ne-pa'],
    ['lansdale', 'Lansdale', 'Souderton, PA', 'ne-pa'],
    ['allentown', 'Allentown', 'Hellertown, PA', 'ne-pa'],
    ['harrisburg', 'Harrisburg', 'Harrisburg, PA', 'ne-pa'],
    ['downingtown', 'Downingtown', 'Downingtown, PA', 'ne-pa'],
    ['pittsburgh', 'Pittsburgh', 'Coraopolis, PA', 'ne-pa'],
    ['scranton', 'Scranton', 'Scranton, PA', 'ne-pa'],
    ['warrington', 'Warrington', 'Warrington, PA', 'ne-pa'],
    ['washingtondc', 'Washington DC', 'Beltsville, MD', 'ne-dmv', {
      location: "In Beltsville, Maryland, serving the DC / Maryland / Virginia region.",
      fact: "The mandir serving the Washington, D.C. region was inaugurated in 2018 — a major center for spiritual, cultural, and community activities.",
      guru: "A regional BAPS center under the guidance of Mahant Swami Maharaj." }],
    ['baltimore', 'Baltimore', 'Nottingham, MD', 'ne-dmv'],
    ['newcastle', 'New Castle', 'New Castle, DE', 'ne-dmv'],
    ['nova', 'Northern Virginia', 'Chantilly, VA', 'ne-va'],
    ['richmond', 'Richmond', 'North Chesterfield, VA', 'ne-va', {
      location: "In North Chesterfield, in the Richmond area of Virginia.",
      fact: "Inaugurated in 2024, it is one of BAPS's newest mandirs in the eastern United States.",
      guru: "A BAPS mandir under the guidance of Mahant Swami Maharaj." }],
    ['roanoke', 'Roanoke', 'Salem, VA', 'ne-va'],
    ['staunton', 'Staunton', 'Staunton, VA', 'ne-va'],
    ['virginiabeach', 'Virginia Beach', 'Newport News, VA', 'ne-va'],
    ['morgantown', 'Morgantown', 'Morgantown, WV', 'ne-va'],
  ].forEach((row) => {
    const [id, name, city, neRegion, custom] = row;
    const regionNames = { 'ne-ct': 'Connecticut', 'ne-ma': 'Massachusetts', 'ne-ny': 'New York State', 'ne-nj': 'New Jersey', 'ne-pa': 'Pennsylvania', 'ne-dmv': 'the DC / Maryland / Delaware area', 'ne-va': 'Virginia' };
    const rn = regionNames[neRegion];
    const base = {
      location: 'This mandir is in ' + rn + ', in the northeastern US.',
      fact: 'The ' + name + ' BAPS mandir is located in ' + city + '.',
      guru: 'Serves the ' + name + ' BAPS satsang mandal under the guidance of Mahant Swami Maharaj.',
    };
    MANDIRS.push({ id, name, city, group: 'ne', neRegion, ne: true, exterior: false, hints: Object.assign(base, custom || {}) });
  });

  // ---------- small helpers ----------
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- persistence (localStorage — this is a static site, no server) ----------
  const PHOTOS_KEY = 'baps_guess_photos';
  function loadPhotos() {
    try {
      const raw = localStorage.getItem(PHOTOS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function savePhotos(photos) {
    try { localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos)); } catch (e) { /* storage full or unavailable — game still works */ }
  }
  function getHighScore(key) {
    try { return +localStorage.getItem(key) || 0; } catch (e) { return 0; }
  }
  function setHighScore(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (e) {}
  }

  // ============================================================
  // The game
  // ============================================================
  class MandirGuesser {
    constructor(root) {
      this.root = root;
      this.confetti = Array.from({ length: 18 }, (_, i) => ({
        left: Math.round(Math.random() * 96) + 2,
        color: ['#c67139', '#7a8a5e', '#d67f48', '#aebf92', '#8c491a', '#56633f'][i % 6],
        delay: +(Math.random() * 0.25).toFixed(2),
        dur: +(1.1 + Math.random() * 0.8).toFixed(2),
      }));
      this.state = {
        screen: 'home', mode: 'mandir',
        score: 0, streak: 0, bestStreak: 0, strikes: 0, hintsLeft: CONFIG.hintsPerGame,
        questionNum: 0, q: null, opts: [], answered: false, chosenId: null,
        revealedHints: [], hintCursor: 0,
        timeLeft: 0, timerPct: 100, celebrate: false,
        highScoreMandir: getHighScore('baps_guess_highscore_mandir'),
        highStreakMandir: getHighScore('baps_guess_beststreak_mandir'),
        highScoreMurti: getHighScore('baps_guess_highscore_murti'),
        highStreakMurti: getHighScore('baps_guess_beststreak_murti'),
        photos: loadPhotos(), recent: [], isHigh: false,
      };
      this.timer = null;
      this.audioCtx = null;

      this.root.addEventListener('click', (e) => this.onClick(e));
      this.root.addEventListener('change', (e) => this.onChange(e));
      this.root.addEventListener('dragover', (e) => this.onDragOver(e));
      this.root.addEventListener('dragleave', (e) => this.onDragLeave(e));
      this.root.addEventListener('drop', (e) => this.onDrop(e));

      this.render();
    }

    setState(patch) {
      Object.assign(this.state, patch);
      this.render();
    }

    // ---- picking questions ----
    slotId(mandir, mode) {
      return (mode || this.state.mode) === 'murti' ? 'murti-' + mandir.id : 'temple-' + mandir.id;
    }
    pool(mode) {
      const base = mode === 'murti' ? MANDIRS.filter((m) => m.ne) : MANDIRS.filter((m) => m.exterior !== false);
      const withPhoto = base.filter((m) => this.state.photos[this.slotId(m, mode)]);
      return withPhoto.length ? withPhoto : base;
    }
    roundTime() {
      return this.state.mode === 'murti' ? CONFIG.murtiTimerSeconds : CONFIG.timerSeconds;
    }

    // ---- timer ----
    clearTimer() {
      if (this.timer) { clearInterval(this.timer); this.timer = null; }
    }
    startTimer() {
      this.clearTimer();
      if (!CONFIG.timerOn) return;
      const total = this.roundTime();
      const deadline = Date.now() + total * 1000;
      this.timer = setInterval(() => {
        const left = Math.max(0, (deadline - Date.now()) / 1000);
        const pct = (left / total) * 100;
        this.state.timeLeft = left;
        this.state.timerPct = pct;
        this.updateTimerBar(pct);
        if (left <= 0) { this.clearTimer(); this.timeUp(); }
      }, 100);
    }
    updateTimerBar(pct) {
      const bar = this.root.querySelector('.timer-fill');
      if (!bar) return;
      bar.style.width = Math.round(pct) + '%';
      bar.style.background = pct < 30 ? 'var(--color-accent-600)' : pct < 60 ? 'var(--color-accent-400)' : 'var(--color-accent-2-500)';
    }

    // ---- sound (simple beeps, no audio files needed) ----
    beep(freqs, type, dur) {
      if (!CONFIG.soundOn) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        this.audioCtx = this.audioCtx || new AudioCtx();
        const ac = this.audioCtx;
        const t = ac.currentTime;
        freqs.forEach((f, i) => {
          const osc = ac.createOscillator();
          const gain = ac.createGain();
          osc.type = type; osc.frequency.value = f;
          osc.connect(gain); gain.connect(ac.destination);
          const start = t + i * dur;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.16, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
          osc.start(start); osc.stop(start + dur);
        });
      } catch (e) { /* audio isn't essential to the game — fail quietly */ }
    }
    sndRight() { this.beep([660, 880], 'sine', 0.13); }
    sndWrong() { this.beep([180, 120], 'square', 0.18); }
    sndWin() { this.beep([523, 659, 784, 1046], 'sine', 0.12); }

    // ---- game flow ----
    startGame(mode) {
      this.clearTimer();
      this.setState({
        screen: 'play', mode, score: 0, streak: 0, bestStreak: 0, strikes: 0,
        hintsLeft: CONFIG.hintsPerGame, questionNum: 0, recent: [], isHigh: false,
        photos: loadPhotos(),
      });
      this.nextQuestion();
    }
    nextQuestion() {
      const mode = this.state.mode;
      const isMurti = mode === 'murti';
      const roundSet = isMurti ? MANDIRS.filter((m) => m.ne) : MANDIRS.filter((m) => m.exterior !== false);
      const pool = this.pool(mode);

      let asked = this.state.recent.slice();
      let avail = pool.filter((m) => !asked.includes(m.id));
      if (!avail.length) { asked = []; avail = pool; }
      const target = avail[Math.floor(Math.random() * avail.length)];

      // Pick decoys that are "close" to the right answer first, so wrong
      // choices are plausible instead of obviously far away.
      const others = roundSet.filter((m) => m.id !== target.id);
      let decoys;
      if (isMurti) {
        const near = shuffle(others.filter((m) => m.neRegion === target.neRegion));
        const far = shuffle(others.filter((m) => m.neRegion !== target.neRegion));
        decoys = [...near, ...far].slice(0, 3);
      } else {
        const sameRegion = shuffle(others.filter((m) => m.region === target.region));
        const sameGroup = shuffle(others.filter((m) => m.region !== target.region && m.group === target.group));
        const rest = shuffle(others.filter((m) => m.group !== target.group));
        decoys = [...sameRegion, ...sameGroup, ...rest].slice(0, 3);
      }
      const opts = shuffle([target, ...decoys]);

      this.setState({
        q: target, opts, answered: false, chosenId: null, revealedHints: [], hintCursor: 0,
        questionNum: this.state.questionNum + 1, timeLeft: this.roundTime(), timerPct: 100,
        celebrate: false, recent: [...asked, target.id],
      });
      this.startTimer();
    }
    choose(index) {
      if (this.state.answered) return;
      this.clearTimer();
      const opt = this.state.opts[index];
      const q = this.state.q;
      const correct = opt.id === q.id;
      const points = CONFIG.pointsPerQuestion;
      if (correct) {
        const streak = this.state.streak + 1;
        const bestStreak = Math.max(this.state.bestStreak, streak);
        const celebrate = streak >= 3 && streak % 3 === 0;
        this.setState({ answered: true, chosenId: opt.id, score: this.state.score + points, streak, bestStreak, celebrate });
        celebrate ? this.sndWin() : this.sndRight();
        if (celebrate) setTimeout(() => this.setState({ celebrate: false }), 1600);
      } else {
        this.setState({ answered: true, chosenId: opt.id, strikes: this.state.strikes + 1, streak: 0 });
        this.sndWrong();
      }
    }
    timeUp() {
      if (this.state.answered) return;
      this.setState({ answered: true, chosenId: null, strikes: this.state.strikes + 1, streak: 0 });
      this.sndWrong();
    }
    useHint() {
      if (this.state.answered || this.state.hintsLeft <= 0 || this.state.hintCursor >= 3) return;
      const q = this.state.q;
      const order = [
        { label: 'General location', text: q.hints.location },
        { label: 'Satsang fact', text: q.hints.fact },
        { label: 'Guru connection', text: q.hints.guru },
      ];
      const hint = order[this.state.hintCursor];
      this.setState({
        revealedHints: [...this.state.revealedHints, hint],
        hintCursor: this.state.hintCursor + 1,
        hintsLeft: this.state.hintsLeft - 1,
      });
    }
    next() {
      if (this.state.strikes >= CONFIG.strikesAllowed) this.finish();
      else this.nextQuestion();
    }
    finish() {
      this.clearTimer();
      const mode = this.state.mode;
      const curHigh = mode === 'murti' ? this.state.highScoreMurti : this.state.highScoreMandir;
      const curStreak = mode === 'murti' ? this.state.highStreakMurti : this.state.highStreakMandir;
      const isHigh = this.state.score > curHigh;
      const newHigh = Math.max(curHigh, this.state.score);
      const newStreak = Math.max(curStreak, this.state.bestStreak);
      setHighScore('baps_guess_highscore_' + mode, newHigh);
      setHighScore('baps_guess_beststreak_' + mode, newStreak);
      const patch = { screen: 'over', isHigh };
      if (mode === 'murti') { patch.highScoreMurti = newHigh; patch.highStreakMurti = newStreak; }
      else { patch.highScoreMandir = newHigh; patch.highStreakMandir = newStreak; }
      this.setState(patch);
    }
    goHome() { this.clearTimer(); this.setState({ screen: 'home' }); }
    goSetup() { this.clearTimer(); this.setState({ screen: 'setup' }); }
    closeSetup() { this.setState({ screen: 'home', photos: loadPhotos() }); }

    // ---- photo library ----
    // Photos are stored as compressed data URLs in localStorage, keyed by
    // slot id (e.g. "temple-robbinsville" or "murti-flushing"). That's the
    // closest static-site equivalent of the design mockup's local sidecar
    // file — there's no server here to write files to.
    handleFile(slotId, file) {
      if (!file || !/^image\//.test(file.type)) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 640;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          const photos = Object.assign({}, this.state.photos, { [slotId]: dataUrl });
          savePhotos(photos);
          this.setState({ photos });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
    removePhoto(slotId) {
      const photos = Object.assign({}, this.state.photos);
      delete photos[slotId];
      savePhotos(photos);
      this.setState({ photos });
    }
    clearAllPhotos() {
      if (!confirm('Remove every photo from the photo library on this device?')) return;
      savePhotos({});
      this.setState({ photos: {} });
    }

    // ---- events (delegated to the root element so re-rendering is safe) ----
    onClick(e) {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      const action = el.dataset.action;
      if (action === 'start-mandir') this.startGame('mandir');
      else if (action === 'start-murti') this.startGame('murti');
      else if (action === 'go-setup') this.goSetup();
      else if (action === 'close-setup') this.closeSetup();
      else if (action === 'go-home') this.goHome();
      else if (action === 'choose') this.choose(+el.dataset.index);
      else if (action === 'hint') this.useHint();
      else if (action === 'next') this.next();
      else if (action === 'play-again') this.startGame(this.state.mode);
      else if (action === 'remove-photo') { e.stopPropagation(); this.removePhoto(el.dataset.slot); }
      else if (action === 'clear-photos') this.clearAllPhotos();
    }
    onChange(e) {
      const input = e.target.closest('input[type="file"][data-slot]');
      if (!input || !input.files || !input.files[0]) return;
      this.handleFile(input.dataset.slot, input.files[0]);
    }
    onDragOver(e) {
      const slot = e.target.closest('.image-slot');
      if (!slot) return;
      e.preventDefault();
      slot.classList.add('drag-over');
    }
    onDragLeave(e) {
      const slot = e.target.closest('.image-slot');
      if (slot) slot.classList.remove('drag-over');
    }
    onDrop(e) {
      const slot = e.target.closest('.image-slot');
      if (!slot) return;
      e.preventDefault();
      slot.classList.remove('drag-over');
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) this.handleFile(slot.dataset.slot, file);
    }

    // ---- rendering ----
    render() {
      const s = this.state;
      let inner = '';
      if (s.screen === 'home') inner = this.renderHome();
      else if (s.screen === 'play') inner = this.renderPlay();
      else if (s.screen === 'over') inner = this.renderOver();
      else if (s.screen === 'setup') inner = this.renderSetup();
      this.root.innerHTML = '<div class="app-shell"><div class="app-card">' + inner + '</div></div>';
    }

    renderHome() {
      const s = this.state;
      return `
        <div class="home">
          <div class="home-header">
            <img class="home-logo" src="images/logo.png" alt="Dradhpriti — Shastras · Siddhant · Sanstha · Satpurush">
            <h1 class="home-title">Guess the Mandir</h1>
            <p class="home-sub">See a BAPS mandir from somewhere in the world — name it before your three strikes run out.</p>
          </div>

          <div class="score-cards">
            <div class="score-card">
              <span class="score-card-label">
                <span class="score-card-kicker">Guess the Mandir · best</span>
                <span class="score-card-streak">Top streak ${s.highStreakMandir} 🔥</span>
              </span>
              <span class="score-card-value">${s.highScoreMandir}</span>
            </div>
            <div class="score-card">
              <span class="score-card-label">
                <span class="score-card-kicker">Match the Murti · best</span>
                <span class="score-card-streak">Top streak ${s.highStreakMurti} 🔥</span>
              </span>
              <span class="score-card-value">${s.highScoreMurti}</span>
            </div>
          </div>

          <h4 class="pick-round-title">Pick a round</h4>
          <div class="round-list">
            <button class="round-btn round-btn-mandir" data-action="start-mandir">
              <span class="round-icon round-icon-mandir">🛕</span>
              <span class="round-text">
                <span class="round-text-title">Guess the Mandir</span>
                <span class="round-text-sub">Name the mandir from its photo</span>
              </span>
              <span class="round-arrow round-arrow-mandir">→</span>
            </button>
            <button class="round-btn round-btn-murti" data-action="start-murti">
              <span class="round-icon round-icon-murti">✨</span>
              <span class="round-text">
                <span class="round-text-title">Expert · Match the Murti</span>
                <span class="round-text-sub">Which local mandir do these murtis belong to?</span>
              </span>
              <span class="round-arrow round-arrow-murti">→</span>
            </button>
          </div>

          <div class="home-chips">
            <span class="chip">${CONFIG.pointsPerQuestion} pts / question</span>
            <span class="chip">${CONFIG.strikesAllowed} strikes = game over</span>
            <span class="chip">${CONFIG.hintsPerGame} hints per game</span>
            <span class="chip">🔥 build a streak</span>
          </div>

          <div class="setup-link-wrap">
            <button class="btn btn-ghost setup-link" data-action="go-setup">📷 Photo library</button>
          </div>
        </div>`;
    }

    renderPlay() {
      const s = this.state;
      const strikesAllowed = CONFIG.strikesAllowed;
      const remaining = strikesAllowed - s.strikes;
      const lives = Array.from({ length: strikesAllowed }, (_, i) => i < remaining
        ? 'background:var(--color-accent);border-color:var(--color-accent)'
        : 'background:transparent;border-color:var(--color-neutral-400)');
      const roundLabel = s.mode === 'murti' ? 'Match the Murti' : 'Guess the Mandir';
      const streakColor = s.streak >= 3 ? 'color:var(--color-accent-700)' : 'color:color-mix(in srgb,var(--color-text) 60%,transparent)';
      const streakFire = s.streak >= 3 ? '<span class="streak-fire-pulse">🔥</span>' : '<span>🔥</span>';

      const curPhoto = s.q ? s.photos[this.slotId(s.q)] : null;
      const timerColor = s.timerPct < 30 ? 'var(--color-accent-600)' : s.timerPct < 60 ? 'var(--color-accent-400)' : 'var(--color-accent-2-500)';

      const optionsHtml = s.opts.map((opt, i) => {
        let cls = 'option-btn';
        let mark = '';
        if (s.answered) {
          if (opt.id === s.q.id) { cls += ' option-btn-correct'; mark = '✓'; }
          else if (opt.id === s.chosenId) { cls += ' option-btn-wrong'; mark = '✗'; }
          else cls += ' option-btn-dim';
        }
        return `<button class="${cls}" data-action="choose" data-index="${i}" ${s.answered ? 'disabled' : ''}>
          <span class="option-btn-name">${escapeHtml(opt.name)}</span>
          <span class="option-btn-mark">${mark}</span>
        </button>`;
      }).join('');

      const hintsHtml = s.revealedHints.map((h) => `
        <div class="hint-reveal">
          <div class="hint-reveal-label">${escapeHtml(h.label)}</div>
          <div class="hint-reveal-text">${escapeHtml(h.text)}</div>
        </div>`).join('');

      let feedbackHtml = '';
      if (s.answered) {
        const win = s.chosenId === s.q.id;
        const timeout = s.chosenId === null;
        const points = CONFIG.pointsPerQuestion;
        const fbTitle = win ? ('Correct! +' + points + (s.celebrate ? '  🔥 On fire!' : '')) : (timeout ? "Time's up!" : 'Not quite');
        const fbBg = win ? 'var(--color-accent-2-100)' : 'var(--color-accent-100)';
        const fbBorder = win ? 'var(--color-accent-2-400)' : 'var(--color-accent-300)';
        const fbColor = win ? 'var(--color-accent-2-800)' : 'var(--color-accent-800)';
        const factText = s.q ? s.q.hints.fact : '';
        const strikesOver = s.strikes >= strikesAllowed;
        feedbackHtml = `
          <div class="feedback">
            <div class="feedback-panel" style="background:${fbBg};border-color:${fbBorder}">
              <div class="feedback-title" style="color:${fbColor}">${escapeHtml(fbTitle)}</div>
              <div class="feedback-fact">${escapeHtml(factText)}</div>
            </div>
            <button class="btn btn-primary btn-block next-btn" data-action="next">${strikesOver ? 'See results' : 'Next mandir'} →</button>
          </div>`;
      }

      const confettiHtml = s.celebrate ? `
        <div class="confetti-layer">
          ${this.confetti.map((c) => `<span class="confetti-piece" style="left:${c.left}%;background:${c.color};animation:om-fall ${c.dur}s ease-in ${c.delay}s both"></span>`).join('')}
        </div>` : '';

      return `
        <div>
          <div class="play-topbar">
            <div class="score-pill">
              <span class="score-pill-label">Score</span>
              <span class="score-pill-value">${s.score}</span>
            </div>
            <div class="lives">
              ${lives.map((sty) => `<span class="life-dot" style="${sty}"></span>`).join('')}
            </div>
          </div>

          <div class="play-meta">
            <span class="round-label">${roundLabel} · Q${s.questionNum}</span>
            <span class="streak-label" style="${streakColor}">${streakFire} ${s.streak} streak</span>
          </div>

          ${CONFIG.timerOn ? `
          <div class="timer-track">
            <div class="timer-fill" style="width:${Math.round(s.timerPct)}%;background:${timerColor}"></div>
          </div>` : ''}

          <div class="photo-stage">
            ${curPhoto
              ? `<img class="photo-img" src="${curPhoto}" alt="Mandir">`
              : `<div class="photo-pending">
                  <span class="photo-pending-icon">🖼️</span>
                  <span class="photo-pending-title">Photo pending</span>
                  <span class="photo-pending-sub">Add official BAPS photos in the photo library — the game still runs so you can test it.</span>
                </div>`}
            ${s.answered ? `<span class="photo-answer-badge">${escapeHtml(s.q.name + ' · ' + s.q.city)}</span>` : ''}
          </div>

          <h3 class="prompt">${s.mode === 'murti' ? 'Which local mandir do these murtis belong to?' : 'Name the mandir from its photo'}</h3>

          <div class="options">${optionsHtml}</div>

          ${!s.answered ? `<button class="btn btn-secondary btn-block hint-btn" data-action="hint" ${(s.hintsLeft <= 0 || s.hintCursor >= 3) ? 'disabled' : ''}>💡 Hint · ${s.hintsLeft} left</button>` : ''}
          ${hintsHtml}
          ${feedbackHtml}

          <div class="quit-wrap">
            <button class="btn btn-ghost" data-action="go-home">Quit to menu</button>
          </div>

          ${confettiHtml}
        </div>`;
    }

    renderOver() {
      const s = this.state;
      const overTitle = s.score >= 100 ? 'Incredible!' : s.score >= 50 ? 'Well played!' : 'Good game';
      return `
        <div class="over">
          ${s.isHigh ? '<span class="over-badge">🎉 New high score!</span>' : ''}
          <h1 class="over-title">${escapeHtml(overTitle)}</h1>
          <p class="over-sub">You ran out of strikes.</p>

          <div class="over-card">
            <div class="over-card-kicker">Final score</div>
            <div class="over-card-score">${s.score}</div>
            <div class="over-stats">
              <div>
                <div class="over-stat-value">${s.questionNum}</div>
                <div class="over-stat-label">answered</div>
              </div>
              <div>
                <div class="over-stat-value">${s.bestStreak} 🔥</div>
                <div class="over-stat-label">best streak</div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-block over-play-again" data-action="play-again">Play again</button>
          <button class="btn btn-secondary btn-block over-change-round" data-action="go-home">Change round</button>
        </div>`;
    }

    renderSetup() {
      const s = this.state;
      const mandirList = MANDIRS.filter((m) => m.exterior !== false).map((m) => ({ name: m.name, city: m.city, slot: 'temple-' + m.id }));
      const murtiList = MANDIRS.filter((m) => m.ne).map((m) => ({ name: m.name, city: m.city, slot: 'murti-' + m.id }));

      const slotHtml = (item) => {
        const photo = s.photos[item.slot];
        return `
          <div>
            <div class="image-slot" data-slot="${item.slot}">
              ${photo
                ? `<img src="${photo}" alt="${escapeHtml(item.name)}"><button class="image-slot-remove" data-action="remove-photo" data-slot="${item.slot}" aria-label="Remove photo">✕</button>`
                : `<span class="image-slot-placeholder">Drop photo</span>`}
              <input type="file" accept="image/*" data-slot="${item.slot}" aria-label="Upload photo for ${escapeHtml(item.name)}">
            </div>
            <div class="slot-name">${escapeHtml(item.name)}</div>
            <div class="slot-city">${escapeHtml(item.city)}</div>
          </div>`;
      };

      return `
        <div>
          <div class="setup-header">
            <button class="btn btn-secondary btn-icon" data-action="close-setup">←</button>
            <h2 class="setup-title">Photo library</h2>
          </div>
          <div class="setup-note">
            Drag &amp; drop a photo onto each slot (or tap to browse). Photos are saved on this device. <b>Only use official BAPS photos or ones your team took.</b> A slot left empty just won't be quizzed.
          </div>
          <div class="setup-note-2">
            📝 The hint facts are <b>drafts</b> — please verify build dates and Pramukh Swami Maharaj visits before the gala.
          </div>

          <h4 class="setup-section-title setup-section-title-mandir">Mandir exteriors</h4>
          <div class="slot-grid">${mandirList.map(slotHtml).join('')}</div>

          <h4 class="setup-section-title setup-section-title-murti">Murtis · Northeast mandirs (expert round)</h4>
          <div class="slot-grid">${murtiList.map(slotHtml).join('')}</div>

          <button class="btn btn-primary btn-block setup-done" data-action="close-setup">Done — back to menu</button>
          <div class="setup-clear-wrap">
            <button class="btn btn-ghost setup-clear" data-action="clear-photos">Clear all photos on this device</button>
          </div>
        </div>`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new MandirGuesser(document.getElementById('app'));
  });
})();
