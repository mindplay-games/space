// ===============================
// MindPlay – Journey Through the Codeverse (Orion Edition)
// types: dialogue / cutscene / mcq / code / drag
// chapters via ?chapter=1,2,...
// ===============================

// --- chapter param ---
const params = new URLSearchParams(window.location.search);
const chapterNum = Number(params.get("chapter") || 1);

// --- Chapters data ---
const chapters = {
  // פרק 1 – מודול בסיס החללית
  1: [
    // סצנה 1 – הקריאה מהמסך (הכיתה + פורטל)
    {
      type: "cutscene",
      icon: "🖥️",
      bg: "assets/backgrounds/ch1-classroom-portal.png",
      story:
        "כיתה רגילה בלילה שקט. מחשב אחד מתחיל להבהב באור סגול־תכול, וקוד מסתובב בצורת ספירלה על המסך.",
      character: "מערכת",
      avatar: "assets/characters/system-alert.png",
      text:
        'SYSTEM OVERRIDE – CODEVERSE PORTAL INITIATED\n"הקוד שלי נקרע… נדרשת עזרה מידית!"',
      effect: "portal"
    },

    // סצנה 2 – ברוכים הבאים לחללית אוריון
    {
      type: "cutscene",
      icon: "🚀",
      bg: "assets/backgrounds/ch1-orion-bridge.png",
      story:
        "הקוד על המסך נקרע כמו דף נייר דיגיטלי. נפתח פורטל משושה מפיקסלים זוהרים – והילדים נשאבים אל חללית עצומה העשויה משורות קוד.",
      character: "AI אוריון",
      avatar: "assets/characters/ai-orion.png",
      text:
        "ברוכים הבאים, צוות צעיר! החללית שלי נפגעה — הקוד שלי מקולקל. אני לא יכולה לנווט בחלל… אתם צריכים לעזור לי לתקן את המודולים שלי. קודם נפעיל את בסיס החללית – בלי זה שום דבר לא עובד!",
      effect: "ship"
    },

    // סצנה 3 – חדר המנוע (משימת print)
    {
      type: "code",
      icon: "⚙️",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story:
        "חדר המנוע הראשי: מנוע ענק בצורת צינור שקוף מלא בזרמי טקסט כבויים. ככל שמדפיסים טקסט – הצינורות נדלקים באור אנרגיה.",
      prompt:
        'כתוב/כתבי שורת קוד אחת שמדליקה את המנוע עם ההודעה Engine Start!',
      hint:
        'השתמשו בפקודת print ובגרשיים, למשל: print("Engine Start!")',
      validator: {
        mode: "exact",
        patterns: ["print('Engine Start!')", 'print("Engine Start!")']
      },
      effect: "engine"
    },

    // סצנה 4 – כדור האור צריך ערך כדי לזהור (משתנה)
    {
      type: "mcq",
      icon: "💡",
      bg: "assets/backgrounds/ch1-light-core.png",
      story:
        "בחדר גדול צף כדור אור ענק, כמו שמש קטנה אבל כבויה. על רצפת הזכוכית כתובה הולוגרמה: \"הכדור צריך ערך כדי לזרוח.\"",
      hint: "משתנה בפייתון לא יכול להכיל רווח בשם שלו.",
      question: "איזו שורה תדליק את הכדור?",
      answers: [
        { text: "light_power = 30", correct: true },
        { text: "light power = 30", correct: false },
        { text: "print = 30", correct: false },
        { text: "30 = light_power", correct: false }
      ],
      effect: "light"
    },

    // סצנה 5 – ספריית הקוד של החללית (import time עם Drag)
    {
      type: "drag",
      icon: "🧰",
      bg: "assets/backgrounds/ch1-library.png",
      story:
        "אתם נכנסים לחדר שנראה כמו מוזיאון של ספריות קוד. קוביות קוד מרחפות – חלקן ריקות (לא נטענו), חלקן זוהרות (נטענו).",
      prompt:
        'גררו את שם הספרייה המתאים לאזור "סדר נכון" כדי להשלים את הפקודה:\nimport ____',
      items: ["time", "hour", "clock", "timer"],
      targetOrder: ["time"], // נדרש שיהיה רק "time" בקופסה הימנית
      effect: "library"
    },

    // סצנה 6 – סיום מודול הבסיס
    {
      type: "cutscene",
      icon: "🌌",
      bg: "assets/backgrounds/ch1-front-corridor.png",
      story:
        "מסדרון קדמי נדלק באורות כחולים. נתיבי מידע זורמים על הרצפה כמו נתיבי לייזר. מסך ענק מציג: CORE MODULE REPAIRED.",
      character: "AI אוריון",
      avatar: "assets/characters/ai-orion.png",
      text:
        "עבודה מדהימה, צוות! הפעלתם מנוע, הדלקתם אור וטענתם את ספריית הזמן. עכשיו אפשר לצאת אל המסע הבין־כוכבי.\nהיעד הבא במפת הגלקסיה: VARIABLE PRIME – כוכב המשתנים האמיתיים!",
      effect: "summary"
    }
  ],

  // פרקים עתידיים – כוכב המשתנים, התנאים, הלולאות...
  2: [
    {
      type: "dialogue",
      bg: "assets/backgrounds/ch2-variable-planet.png",
      character: "AI אוריון",
      avatar: "assets/characters/ai-orion.png",
      text: "ברוכים הבאים ל-VARIABLE PRIME! פה נבחן את כוח המשתנים שלכם."
    }
  ]
};

let levels = chapters[chapterNum] || chapters[1];

// --- state ---
let levelIndex = 0;
let locked = false;

// --- DOM ---
const storyEl = document.getElementById("story");
const storyIconEl = document.getElementById("storyIcon");

const characterRow = document.getElementById("characterRow");
const characterAvatar = document.getElementById("characterAvatar");
const characterName = document.getElementById("characterName");
const characterText = document.getElementById("characterText");

const dialogueNextBtn = document.getElementById("dialogueNextBtn");

const mcqBox = document.getElementById("mcqBox");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");

// ⭐ סיפור משימה בתוך כרטיס המשימה
const challengeStoryEl = document.getElementById("challengeStory");

const codeBox = document.getElementById("codeBox");
const codePromptEl = document.getElementById("codePrompt");
const codeInputEl = document.getElementById("codeInput");
const runCodeBtn = document.getElementById("runCodeBtn");
const nextFromCodeBtn = document.getElementById("nextFromCodeBtn");

const dragBox = document.getElementById("dragBox");
const dragPromptEl = document.getElementById("dragPrompt");
const dragItemsEl = document.getElementById("dragItems");
const dragTargetEl = document.getElementById("dragTarget");
const checkDragBtn = document.getElementById("checkDragBtn");
const nextFromDragBtn = document.getElementById("nextFromDragBtn");

const feedbackEl = document.getElementById("feedback");
const chapterTitleEl = document.getElementById("chapterTitle");
const levelCounterEl = document.getElementById("levelCounter");
const progressBarEl = document.getElementById("progressBar");
const gameEl = document.querySelector(".game");

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
    const o = audioCtx.createOscillator(),
      g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    o.frequency.value = freq;
    o.type = "sine";
    g.gain.value = 0.05;
    o.start();
    o.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

// --- helpers ---
function setTopUI() {
  // שם הפרק – אפשר לעדכן לטקסט יותר "חללי"
  chapterTitleEl.textContent = `פרק ${chapterNum} – מודול בסיס החללית`;
  levelCounterEl.textContent = `סצנה ${levelIndex + 1}/${levels.length}`;
  const denom = levels.length - 1 || 1;
  progressBarEl.style.width = `${(levelIndex / denom) * 100}%`;
}

function resetFeedback() {
  feedbackEl.textContent = "";
  feedbackEl.className = "";
}

function hideAllBoxes() {
  mcqBox.classList.add("hidden");
  codeBox.classList.add("hidden");
  dragBox.classList.add("hidden");
  nextBtn.classList.add("hidden");
  nextFromCodeBtn.classList.add("hidden");
  nextFromDragBtn.classList.add("hidden");
  dialogueNextBtn.classList.add("hidden");
}

// אין כפילות טקסט: כשיש דמות — מסתירים storyEl הרגיל
function showCharacter(lvl) {
  const hasChar = !!(lvl.character || lvl.text);
  if (hasChar) {
    characterRow.classList.remove("hidden");
    characterName.textContent = lvl.character || "";
    characterText.textContent = lvl.text || "";

    if (lvl.avatar) {
      characterAvatar.src = lvl.avatar;
      characterAvatar.classList.remove("hidden");
      characterAvatar.alt = lvl.character || "דמות";
    } else {
      characterAvatar.classList.add("hidden");
    }

    storyEl.classList.add("hidden");
  } else {
    characterRow.classList.add("hidden");
    storyEl.classList.remove("hidden");
  }
}

function normalize(s) {
  return (s || "")
    .replace(/\s+/g, "")
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .toLowerCase();
}

function validateCode(userInput, validator) {
  const user = normalize(userInput);
  if (!validator) return false;
  if (validator.mode === "exact") {
    return validator.patterns.some((p) => user === normalize(p));
  }
  if (validator.mode === "contains") {
    return validator.patterns.every((p) => user.includes(normalize(p)));
  }
  if (validator.mode === "regex") {
    return new RegExp(validator.pattern).test(userInput);
  }
  return false;
}

// --- renderers ---

// cutscene + dialogue משתמשים באותו רנדרר
function renderDialogue(lvl) {
  hideAllBoxes();
  gameEl.classList.add("mode-dialogue");
  gameEl.classList.remove("mode-challenge");

  storyEl.textContent = lvl.story || "";
  showCharacter(lvl);

  s("sndDialogue");
  dialogueNextBtn.classList.remove("hidden");
}

function renderMCQ(lvl) {
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  gameEl.classList.remove("mode-dialogue");

  mcqBox.classList.remove("hidden");
  showCharacter({}); // מסתיר את שורת הדמות
  storyEl.textContent = "";

  if (challengeStoryEl) {
    challengeStoryEl.textContent = lvl.story || "";
  }

  questionEl.textContent = lvl.question || "";
  answersEl.innerHTML = "";

  lvl.answers.forEach((a) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = a.text;
    btn.onclick = () => chooseMCQ(a.correct, btn, lvl);
    answersEl.appendChild(btn);
  });

  hintBtn.onclick = () => {
    if (lvl.hint) {
      feedbackEl.textContent = "💡 " + lvl.hint;
      feedbackEl.className = "";
    } else {
      feedbackEl.textContent = "אין רמז בשלב הזה 🙂";
      feedbackEl.className = "";
    }
  };
}

function chooseMCQ(isCorrect, btnEl, lvl) {
  if (locked) return;
  if (isCorrect) {
    locked = true;
    beep(880, 0.12);
    btnEl.classList.add("correct");
    feedbackEl.textContent = "✅ נכון! המערכת מגיבה.";
    feedbackEl.classList.add("correct");
    nextBtn.classList.remove("hidden");
    s("sndCorrect");
  } else {
    beep(220, 0.15);
    btnEl.classList.add("wrong");
    feedbackEl.textContent = "❌ לא נכון, נסו שוב.";
    feedbackEl.classList.add("wrong");
    setTimeout(() => btnEl.classList.remove("wrong"), 450);
    s("sndWrong");
  }
}

function renderCode(lvl) {
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  gameEl.classList.remove("mode-dialogue");

  codeBox.classList.remove("hidden");
  showCharacter({});
  storyEl.textContent = lvl.story || "";
  codePromptEl.textContent = lvl.prompt || "כתוב/י קוד:";
  codeInputEl.value = "";
  codeInputEl.focus();

  runCodeBtn.onclick = () => {
    const ok = validateCode(codeInputEl.value, lvl.validator);
    if (ok) {
      beep(880, 0.12);
      feedbackEl.textContent = "✅ מעולה! המנוע נדלק.";
      feedbackEl.className = "correct";
      nextFromCodeBtn.classList.remove("hidden");
      s("sndCorrect");
    } else {
      beep(220, 0.15);
      feedbackEl.textContent = "❌ כמעט… נסו שוב.";
      feedbackEl.className = "wrong";
      if (lvl.hint) {
        feedbackEl.textContent += "\n💡 רמז: " + lvl.hint;
      }
      s("sndWrong");
    }
  };
}

function renderDrag(lvl) {
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  gameEl.classList.remove("mode-dialogue");

  dragBox.classList.remove("hidden");
  showCharacter({});
  storyEl.textContent = lvl.story || "";
  dragPromptEl.textContent = lvl.prompt || "גרור/י לסדר נכון:";
  dragItemsEl.innerHTML = "";
  dragTargetEl.innerHTML = "";

  // chips מקוריים
  lvl.items.forEach((text, idx) => {
    const chip = createDragChip(text, idx);
    dragItemsEl.appendChild(chip);
  });

  // מאפשרים drop בשתי הקופסאות
  enableDropZone(dragItemsEl);
  enableDropZone(dragTargetEl);

  checkDragBtn.onclick = () => {
    const current = [...dragTargetEl.querySelectorAll(".drag-chip")].map(
      (c) => c.dataset.value
    );

    const ok =
      JSON.stringify(current) === JSON.stringify(lvl.targetOrder || []);
    if (ok) {
      beep(880, 0.12);
      feedbackEl.textContent = "✅ TIME MODULE LOADED ✓";
      feedbackEl.className = "correct";
      nextFromDragBtn.classList.remove("hidden");
      s("sndCorrect");
    } else {
      beep(220, 0.15);
      feedbackEl.textContent =
        "❌ עדיין לא. נסו לגרור את הספרייה האמיתית של פייתון.";
      feedbackEl.className = "wrong";
      s("sndWrong");
    }
  };
}

// ------- helpers for drag -------

function createDragChip(text, idx) {
  const chip = document.createElement("div");
  chip.className = "drag-chip";
  chip.draggable = true;

  chip.textContent = text;
  chip.dataset.value = text;
  chip.dataset.id = "chip-" + idx;

  chip.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/id", chip.dataset.id);
  });

  // קליק מעביר לצד השני
  chip.addEventListener("click", () => {
    const parent = chip.parentElement;
    if (parent === dragTargetEl) {
      dragItemsEl.appendChild(chip);
    } else {
      dragTargetEl.appendChild(chip);
    }
  });

  return chip;
}

function enableDropZone(zone) {
  zone.addEventListener("dragover", (e) => e.preventDefault());

  zone.addEventListener("drop", (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text/id");
    if (!id) return;

    const chip = document.querySelector(`[data-id="${id}"]`);
    if (!chip) return;

    if (chip.parentElement === zone) return;

    zone.appendChild(chip);
  });
}

// --- main ---
const EFFECT_CLASSES = [
  "effect-portal",
  "effect-ship",
  "effect-engine",
  "effect-light",
  "effect-library",
  "effect-summary"
];

function applyEffect(lvl) {
  EFFECT_CLASSES.forEach((cls) => gameEl.classList.remove(cls));
  if (lvl.effect) {
    gameEl.classList.add(`effect-${lvl.effect}`);
  }
}

function renderLevel() {
  locked = false;
  resetFeedback();
  setTopUI();

  const lvl = levels[levelIndex];

  // רקע לפי שלב
  if (lvl.bg) {
    document.body.style.background = `url('${lvl.bg}') center/cover fixed no-repeat #020617`;
  }

  storyIconEl.textContent = lvl.icon || "✨";
  applyEffect(lvl);

  if (lvl.type === "dialogue" || lvl.type === "cutscene") return renderDialogue(lvl);
  if (lvl.type === "code") return renderCode(lvl);
  if (lvl.type === "drag") return renderDrag(lvl);
  return renderMCQ(lvl);
}

function goNext() {
  s("sndClick");

  gameEl.classList.add("slide-out");

  setTimeout(() => {
    gameEl.classList.remove("slide-out");
    gameEl.classList.add("slide-in");
    setTimeout(() => gameEl.classList.remove("slide-in"), 350);

    levelIndex++;
    if (levelIndex >= levels.length) levelIndex = 0; // כרגע לופ – אפשר להחליף למסך מפת גלקסיה בהמשך
    renderLevel();
  }, 350);
}

// כפתורי המשך
nextBtn.onclick = goNext;
nextFromCodeBtn.onclick = goNext;
nextFromDragBtn.onclick = goNext;
dialogueNextBtn.onclick = goNext;

// התחלה
renderLevel();
