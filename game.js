// ===============================
// MindPlay – Journey Through the Codeverse (Orion Edition)
// Supports:
//   ?chapter=1,2,...  → משחק "מלא" בפרקים
//   ?lesson=1,2,3,... → משימות מבודדות ל-SCHOLAR
// types: dialogue / cutscene / mcq / code / drag
// ===============================

// --- URL params ---
const params = new URLSearchParams(window.location.search);
const chapterNum = Number(params.get('chapter') || 1);
const lessonParam = params.get('lesson');
const lessonNum = lessonParam ? Number(lessonParam) : null;
const isLessonMode = !!lessonParam;

// --- Chapters data (מצב משחק מלא) ---
const chapters = {
  // פרק 1 – מודול בסיס החללית
  1: [
    // סצנה 1 – הקריאה מהמסך (הכיתה + פורטל)
    {
      type: 'cutscene',
      icon: '🖥️',
      bg: 'assets/backgrounds/ch1-classroom-portal.png',
      story: 'אור ונדב נשאבו למשחק החלל שתכנתו בעצמם!',
      character: 'מערכת',
      avatar: 'assets/characters/system-alert.png',
      text: 'אני חייב את עזרתכם! החללית שלי קורסת!!',
      effect: 'portal'
    },

    // סצנה 2 – ברוכים הבאים לחללית
    {
      type: 'cutscene',
      icon: '🚀',
      bg: 'assets/backgrounds/ch1-orion-bridge.png',
      story: 'הילדים נשאבים אל חללית עצומה הבנויה מקטעי קוד.',
      character: 'AI אוריון',
      avatar: 'assets/characters/ai-orion.png',
      text:
        'ברוכים הבאים צוות צעיר! אני מיינדפלי, הבוט של החללית – אני חייב את עזרתכם בתיקון חדר המנועים כדי שנוכל להמריא.',
      effect: 'ship'
    },

    // סצנה 3 – חדר המנוע (משימת print)
    {
      type: 'code',
      icon: '⚙️',
      bg: 'assets/backgrounds/ch1-engine-room.png',
      story:
        'חדר המנוע הראשי: מנוע ענק בצורת 3 צינורות שקופים מלא בזרמי טקסט כבויים. ככל שמדפיסים טקסט – הצינורות נדלקים באור אנרגיה.',
      prompt: 'כתוב/כתבי שורת קוד אחת שמדליקה את המנוע עם ההודעה Start',
      hint: 'השתמשו בפקודת print ובגרשיים, למשל: print("Start")',
      validator: {
        mode: 'exact',
        patterns: ["print('Start')", 'print("Start")']
      },
      effect: 'engine',
      successText: '✅ מעולה! הצינור הראשון נדלק ופועל.'
    },

    // סצנה 4 – הצינור השני (MCQ על print טקסט)
    {
      type: 'mcq',
      icon: '💡',
      bg: 'assets/backgrounds/ch1-light-core.png',
      story:
        'עכשיו הגיע הזמן לתקן את הצינור השני – בחרו את ההדפסה התקינה מבין האפשרויות.',
      hint:
        'הדפסה של טקסט בפייתון חייבת לכלול גרשיים סביב הטקסט, למשל: print("שלום")',
      question: 'איזו שורה תפעיל את הצינור השני? בחרו את הפקודה התקינה:',
      answers: [
        { text: 'print("second tube start!")', correct: true },
        { text: 'print second tube start!', correct: false },
        { text: 'console.log("second tube start!")', correct: false },
        { text: 'alert("second tube start!")', correct: false }
      ],
      effect: 'light'
    },

    // סצנה 5 – הצינור השלישי (Drag להרכבת print)
    {
      type: 'drag',
      icon: '🧰',
      bg: 'assets/backgrounds/ch1-library.png',
      story:
        'אתם נהדרים! כמעט סיימנו את המשימה – רק נותר הצינור השלישי כדי שהמנוע שלנו יפעל ונוכל להמריא.',
      prompt:
        'גררו את החלקים לאזור "סדר נכון" כדי ליצור את הפקודה שמפעילה את הצינור השלישי:',
      // החלקים שמופיעים כצ׳יפים
      items: ['"start tube 3"', ')', 'print('],
      // הסדר הנכון של הצ׳יפים
      targetOrder: ['print(', '"start tube 3"', ')'],
      effect: 'library'
    },

    // סצנה 6 – סיום מודול הבסיס
    {
      type: 'cutscene',
      icon: '🌌',
      bg: 'assets/backgrounds/ch1-front-corridor.png',
      story:
        'מסדרון קדמי נדלק באורות כחולים. נתיבי מידע זורמים על הרצפה כמו נתיבי לייזר. מסך ענק מציג: CORE MODULE REPAIRED.',
      character: 'AI אוריון',
      avatar: 'assets/characters/ai-orion.png',
      text:
        'עבודה מדהימה, צוות! הפעלתם את כל שלושת הצינורות של המנוע. עכשיו אפשר לצאת אל המסע הבין־כוכבי.\nהיעד הבא במפת הגלקסיה: VARIABLE PRIME – כוכב המשתנים האמיתיים!',
      effect: 'summary'
    }
  ],

  // פרק 2 – placeholder לכוכב המשתנים (אפשר לפתח בהמשך)
  2: [
    {
      type: 'dialogue',
      icon: '🪐',
      bg: 'assets/backgrounds/ch2-variable-planet.png',
      character: 'AI אוריון',
      avatar: 'assets/characters/ai-orion.png',
      text: 'ברוכים הבאים ל-VARIABLE PRIME! פה נבחן את כוח המשתנים שלכם.',
      story: 'משימות המשתנים יופיעו כאן בהמשך.'
    }
  ]
};

// --- Lessons data (מצב משימות ל-SCHOLAR) ---
const lessons = {
  // משימה 1 – print והפעלת המנוע
  1: [
    {
      type: 'cutscene',
      icon: '🖥️',
      bg: 'assets/backgrounds/ch1-classroom-portal.png',
      character: 'AI אוריון',
      avatar: 'assets/characters/ai-orion.png',
      story: 'משימת Print – מפעילים את מנוע החללית.',
      text:
        'כדי להמריא, נצטרך לגרום לי לדבר באמצעות print – זה מפעיל את המנוע הפנימי של החללית!',
      effect: 'portal'
    },
    {
      type: 'code',
      icon: '⚙️',
      bg: 'assets/backgrounds/ch1-engine-room.png',
      story: 'כתוב/כתבי פקודת print שמדליקה את המנוע עם ההודעה Start.',
      prompt: 'כתוב/כתבי שורה אחת שמדפיסה: Start',
      hint: 'שימו את Start בתוך גרשיים, למשל: print("Start")',
      validator: {
        mode: 'exact',
        patterns: ["print('Start')", 'print("Start")']
      },
      effect: 'engine',
      successText: '✅ מעולה! הצינור הראשון נדלק ופועל.'
    }
  ],

  // משימה 2 – הצינור השני (MCQ על print טקסט)
  2: [
    {
      type: 'cutscene',
      icon: '💡',
      bg: 'assets/backgrounds/ch1-light-core.png',
      character: 'AI אוריון',
      avatar: 'assets/characters/ai-orion.png',
      story:
        'עכשיו הגיע הזמן לתקן את הצינור השני – בחרו את ההדפסה התקינה מבין האפשרויות.',
      text:
        'זכרו: הדפסה של טקסט בפייתון חייבת גרשיים סביב הטקסט. מוכנים לבחור את הפקודה הנכונה?',
      effect: 'light'
    },
    {
      type: 'mcq',
      icon: '💡',
      bg: 'assets/backgrounds/ch1-light-core.png',
      story: 'איזו פקודה תדפיס נכון את הטקסט ותפעיל את הצינור השני?',
      hint:
        'הדפסה של טקסט בפייתון חייבת לכלול גרשיים סביב הטקסט, למשל: print("Hello")',
      question: 'איזו שורה תפעיל את הצינור השני? בחרו את הפקודה התקינה:',
      answers: [
        { text: 'print("second tube start!")', correct: true },
        { text: 'print second tube start!', correct: false },
        { text: 'console.log("second tube start!")', correct: false },
        { text: 'alert("second tube start!")', correct: false }
      ],
      effect: 'light'
    }
  ],

  // משימה 3 – הצינור השלישי (Drag להרכבת print)
  3: [
    {
      type: 'cutscene',
      icon: '🧰',
      bg: 'assets/backgrounds/ch1-library.png',
      character: 'AI אוריון',
      avatar: 'assets/characters/ai-orion.png',
      story: 'הפעלת הצינור השלישי.',
      text:
        'אתם נהדרים! כמעט סיימנו את המשימה – רק נותר הצינור השלישי כדי שהמנוע שלנו יפעל ונוכל להמריא.',
      effect: 'library'
    },
    {
      type: 'drag',
      icon: '🧩',
      bg: 'assets/backgrounds/ch1-library.png',
      story:
        'גררו את שם הפקודה המתאימה לאזור "סדר נכון" כדי להשלים את הפקודה שמדפיסה start tube 3.',
      prompt:
        'גררו את החלקים לאזור "סדר נכון" כדי ליצור את הפקודה:\nprint("start tube 3")',
      items: ['"start tube 3"', ')', 'print('],
      targetOrder: ['print(', '"start tube 3"', ')'],
      effect: 'library'
    }
  ]
};

// --- levels selection ---
let levels;
if (isLessonMode) {
  levels = lessons[lessonNum] || lessons[1];
} else {
  levels = chapters[chapterNum] || chapters[1];
}

// --- state ---
let levelIndex = 0;
let locked = false;

// --- DOM ---
const storyEl = document.getElementById('story');
const storyIconEl = document.getElementById('storyIcon');

const characterRow = document.getElementById('characterRow');
const characterAvatar = document.getElementById('characterAvatar');
const characterName = document.getElementById('characterName');
const characterText = document.getElementById('characterText');

const dialogueNextBtn = document.getElementById('dialogueNextBtn');

const mcqBox = document.getElementById('mcqBox');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const hintBtn = document.getElementById('hintBtn');
const nextBtn = document.getElementById('nextBtn');

// סיפור משימה בתוך כרטיס המשימה
const challengeStoryEl = document.getElementById('challengeStory');

const codeBox = document.getElementById('codeBox');
const codePromptEl = document.getElementById('codePrompt');
const codeInputEl = document.getElementById('codeInput');
const runCodeBtn = document.getElementById('runCodeBtn');
const nextFromCodeBtn = document.getElementById('nextFromCodeBtn');

const dragBox = document.getElementById('dragBox');
const dragPromptEl = document.getElementById('dragPrompt');
const dragItemsEl = document.getElementById('dragItems');
const dragTargetEl = document.getElementById('dragTarget');
const checkDragBtn = document.getElementById('checkDragBtn');
const nextFromDragBtn = document.getElementById('nextFromDragBtn');

const feedbackEl = document.getElementById('feedback');
const chapterTitleEl = document.getElementById('chapterTitle');
const levelCounterEl = document.getElementById('levelCounter');
const progressBarEl = document.getElementById('progressBar');
const gameEl = document.querySelector('.game');

// --- sounds ---
function s(id) {
  const el = document.getElementById(id);
  if (el) {
    el.currentTime = 0;
    el.play().catch(() => {});
  }
}

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
}
function beep(freq = 440, duration = 0.12) {
  try {
    ensureAudio();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    o.frequency.value = freq;
    o.type = 'sine';
    g.gain.value = 0.05;
    o.start();
    o.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

// --- helpers ---
function setTopUI() {
  if (isLessonMode) {
    chapterTitleEl.textContent = `משימה ${lessonNum}`;
  } else {
    let title = `פרק ${chapterNum}`;
    if (chapterNum === 1) {
      title += ' – מודול בסיס החללית';
    }
    chapterTitleEl.textContent = title;
  }

  levelCounterEl.textContent = `שלב ${levelIndex + 1}/${levels.length}`;
  const denom = levels.length - 1 || 1;
  progressBarEl.style.width = `${(levelIndex / denom) * 100}%`;
}

function resetFeedback() {
  feedbackEl.textContent = '';
  feedbackEl.className = '';
}

function hideAllBoxes() {
  mcqBox.classList.add('hidden');
  codeBox.classList.add('hidden');
  dragBox.classList.add('hidden');
  nextBtn.classList.add('hidden');
  nextFromCodeBtn.classList.add('hidden');
  nextFromDragBtn.classList.add('hidden');
  dialogueNextBtn.classList.add('hidden');
}

// אין כפילות טקסט: כשיש דמות — מסתירים storyEl הרגיל
function showCharacter(lvl) {
  const hasChar = !!(lvl.character || lvl.text);
  if (hasChar) {
    characterRow.classList.remove('hidden');
    characterName.textContent = lvl.character || '';
    characterText.textContent = lvl.text || '';

    if (lvl.avatar) {
      characterAvatar.src = lvl.avatar;
      characterAvatar.classList.remove('hidden');
      characterAvatar.alt = lvl.character || 'דמות';
    } else {
      characterAvatar.classList.add('hidden');
    }

    storyEl.classList.add('hidden');
  } else {
    characterRow.classList.add('hidden');
    storyEl.classList.remove('hidden');
  }
}

function normalize(s) {
  return (s || '')
    .replace(/\s+/g, '')
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .toLowerCase();
}

function validateCode(userInput, validator) {
  const user = normalize(userInput);
  if (!validator) return false;

  if (validator.mode === 'exact') {
    return validator.patterns.some((p) => user === normalize(p));
  }

  if (validator.mode === 'contains') {
    return validator.patterns.every((p) => user.includes(normalize(p)));
  }

  if (validator.mode === 'regex') {
    return new RegExp(validator.pattern).test(userInput);
  }
  return false;
}

// --- renderers ---

// cutscene + dialogue משתמשים באותו רנדרר
function renderDialogue(lvl) {
  hideAllBoxes();
  gameEl.classList.add('mode-dialogue');
  gameEl.classList.remove('mode-challenge');

  storyEl.textContent = lvl.story || '';
  showCharacter(lvl);

  s('sndDialogue');
  dialogueNextBtn.classList.remove('hidden');
}

function renderMCQ(lvl) {
  hideAllBoxes();
  gameEl.classList.add('mode-challenge');
  gameEl.classList.remove('mode-dialogue');

  mcqBox.classList.remove('hidden');
  showCharacter({}); // מסתיר את שורת הדמות
  storyEl.textContent = '';

  if (challengeStoryEl) {
    challengeStoryEl.textContent = lvl.story || '';
  }

  questionEl.textContent = lvl.question || '';
  answersEl.innerHTML = '';

  (lvl.answers || []).forEach((a) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = a.text;
    btn.onclick = () => chooseMCQ(a.correct, btn);
    answersEl.appendChild(btn);
  });

  hintBtn.onclick = () => {
    if (lvl.hint) {
      feedbackEl.textContent = '💡 ' + lvl.hint;
      feedbackEl.className = '';
    } else {
      feedbackEl.textContent = 'אין רמז בשלב הזה 🙂';
      feedbackEl.className = '';
    }
  };
}

function chooseMCQ(isCorrect, btnEl) {
  if (locked) return;
  if (isCorrect) {
    locked = true;
    beep(880, 0.12);
    btnEl.classList.add('correct');
    feedbackEl.textContent = '✅ נכון! המערכת מגיבה.';
    feedbackEl.classList.add('correct');
    nextBtn.classList.remove('hidden');
    s('sndCorrect');
  } else {
    beep(220, 0.15);
    btnEl.classList.add('wrong');
    feedbackEl.textContent = '❌ לא נכון, נסו שוב.';
    feedbackEl.classList.add('wrong');
    setTimeout(() => btnEl.classList.remove('wrong'), 450);
    s('sndWrong');
  }
}

function renderCode(lvl) {
  hideAllBoxes();
  gameEl.classList.add('mode-challenge');
  gameEl.classList.remove('mode-dialogue');

  codeBox.classList.remove('hidden');
  showCharacter({});
  storyEl.textContent = lvl.story || '';
  codePromptEl.textContent = lvl.prompt || 'כתוב/י קוד:';
  codeInputEl.value = '';
  codeInputEl.focus();

  runCodeBtn.onclick = () => {
    const ok = validateCode(codeInputEl.value, lvl.validator);
    if (ok) {
      beep(880, 0.12);
      feedbackEl.textContent =
        lvl.successText || '✅ מעולה! זה קוד נכון.';
      feedbackEl.className = 'correct';
      nextFromCodeBtn.classList.remove('hidden');
      s('sndCorrect');
    } else {
      beep(220, 0.15);
      feedbackEl.textContent = '❌ כמעט… נסו שוב.';
      feedbackEl.className = 'wrong';
      if (lvl.hint) {
        feedbackEl.textContent += '\n💡 רמז: ' + lvl.hint;
      }
      s('sndWrong');
    }
  };
}

function renderDrag(lvl) {
  hideAllBoxes();
  gameEl.classList.add('mode-challenge');
  gameEl.classList.remove('mode-dialogue');

  dragBox.classList.remove('hidden');
  showCharacter({});
  storyEl.textContent = lvl.story || '';
  dragPromptEl.textContent = lvl.prompt || 'גרור/י לסדר נכון:';
  dragItemsEl.innerHTML = '';
  dragTargetEl.innerHTML = '';

  (lvl.items || []).forEach((text, idx) => {
    const chip = createDragChip(text, idx);
    dragItemsEl.appendChild(chip);
  });

  enableDropZone(dragItemsEl);
  enableDropZone(dragTargetEl);

  checkDragBtn.onclick = () => {
    const current = [...dragTargetEl.querySelectorAll('.drag-chip')].map(
      (c) => c.dataset.value
    );

    const ok =
      JSON.stri
