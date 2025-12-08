// ===============================
// MindPlay – Journey Through the Codeverse (Orion Edition)
// Supports:
//   ?chapter=1,2,...  → משחק "מלא" בפרקים
//   ?lesson=1,2,3,... → משימות מבודדות ל-SCHOLAR
// types: dialogue / cutscene / mcq / code / drag
// ===============================

// --- URL params ---
const params = new URLSearchParams(window.location.search);
const chapterNum = Number(params.get("chapter") || 1);
const lessonParam = params.get("lesson");
const lessonNum = lessonParam ? Number(lessonParam) : null;
const isLessonMode = !!lessonParam;

// ===============================
//      CHAPTERS CONTENT
// ===============================

const chapters = {
  // פרק 1 – תיקון חדר הבקרה
  1: [
    // סצנה 1 – נשאבים לחללית (הופעת מיינדפלי)
    {
      type: "cutscene",
      icon: "🚀",
      bg: "assets/backgrounds/ch1-classroom-portal.png",
      story:
        "פורטל אור כחול נפתח בכיתה, ושואב את שני הילדים אל תוך חללית עתידנית ומנצנצת.",
      character: "מיינדפלי הרובוט",
      avatar: "assets/characters/ai-orion.png",
      text:
        "ברוכים הבאים צוות צעיר! אני מיינדפלי, הבוט של החללית – אני חייב את עזרתכם בתיקון חדר הבקרה כדי שנוכל להמריא.",
      effect: "portal"
    },

    // סצנה 3 – קונסולת הבקרה הראשית (CODE – הדפסה ראשונה)
    {
      type: "code",
      icon: "🖥️",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story:
        "לוח קונסולות ענק עומד כבוי. רק שורת פקודות אחת מסוגלת להפעיל אותו מחדש.",
      character: "מיינדפלי הרובוט",
      text:
        "כדי להפעיל את מסך הבקרה הראשי, הדפיסו את המילה Start. זה יתן ניצוץ ראשוני למערכת.",
      prompt: "כתבו שורת קוד שתגרום למערכת הבקרה להדפיס את המילה start",
      hint: 'השתמשו בפקודת print ובגרשיים, למשל: print("start")',
      validator: {
        mode: "exact",
        patterns: ['print("start")', "print('start')"]
      },
      effect: "engine",
      successText: "✅ מעולה! מסך הבקרה הראשי הופעל."
    },

    // סצנה 4 – מסך המשנה של הבקרה (MCQ)
    {
      type: "mcq",
      icon: "💡",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story: "מסך בקרה נוסף נדלק, אך עדיין מציג אזהרה אדומה.",
      character: "מיינדפלי הרובוט",
      text:
        "נדרשת פקודת print נוספת כדי לייצב את המערכת. בחרו את ההדפסה התקינה.",
      hint:
        'הדפסה של טקסט בפייתון חייבת לכלול גרשיים סביב הטקסט, למשל: print("שלום")',
      question: "בחרו בפקודה הנכונה שתדפיס למערכת system stable",
      answers: [
        { text: 'print("system stable")', correct: true },
        { text: "print system stable", correct: false },
        { text: 'console.log("system stable")', correct: false },
        { text: 'alert("system stable")', correct: false }
      ],
      effect: "light"
    },

    // סצנה 5 – לוח הפקודות המשני (DRAG)
    {
      type: "drag",
      icon: "🧩",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story:
        "בלוח הפקודות מופיעים כרטיסים צפים. יש להרכיב את הפקודה המדויקת כדי להשלים את הפעלת חדר הבקרה.",
      character: "מיינדפלי הרובוט",
      text:
        "עלינו להרכיב פקודת print מדויקת. מקמו את החלקים בסדר הנכון כדי לייצר את ההדפסה הדרושה.",
      prompt:
        'גררו את החלקים לאזור "סדר נכון" כדי ליצור את הפקודה:\nprint("control online")',
      items: ['"control online"', ")", "print("],
      targetOrder: ["print(", '"control online"', ")"],
      effect: "library",
      successText: "🎉 נהדר! מערכת הבקרה המשנית מופעלת."
    },

    // סצנה 6 – סיום תיקון חדר הבקרה
    {
      type: "cutscene",
      icon: "🌌",
      bg: "assets/backgrounds/ch1-front-corridor.png",
      story:
        "אורות כחולים נדלקים בכל החדר. כל המסכים מציגים: CONTROL ROOM — ONLINE.",
      character: "מיינדפלי הרובוט",
      avatar: "assets/characters/ai-orion.png",
      text:
        "עבודה מדהימה, צוות! הפעלתם את חדר הבקרה. עכשיו אפשר לצאת אל המסע הבין־כוכבי.היעד הבא במפת הגלקסיה: – כוכב המשתנים !",
   
    }
  ],

  // פרק 2 – placeholder
  2: [
    {
      type: "dialogue",
      icon: "🪐",
      bg: "assets/backgrounds/ch2-variable-planet.png",
      character: "מיינדפלי הרובוט",
      avatar: "assets/characters/ai-orion.png",
      text: "ברוכים הבאים ל-VARIABLE PRIME! פה נבחן את כוח המשתנים שלכם.",
      story: "משימות המשתנים יופיעו כאן בהמשך."
    }
  ]
};

// ===============================
//      LESSONS (SCHOLAR MODE)
// ===============================

const lessons = {
  // משימה 1 – הדפסת Start להפעלת חדר הבקרה
  1: [
    {
      type: "cutscene",
      icon: "🖥️",
      bg: "assets/backgrounds/ch1-classroom-portal.png",
      character: "מיינדפלי הרובוט",
      avatar: "assets/characters/ai-orion.png",
      story: "משימת Print – מפעילים את חדר הבקרה.",
      text:
        "כדי להחזיר את חדר הבקרה לפעולה, נצטרך להשתמש בפקודת print עם ההודעה Start.",
      effect: "portal"
    },
    {
      type: "code",
      icon: "⚙️",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story: "כתוב/כתבי פקודת print שמדליקה את מערכת הבקרה.",
      character: "מיינדפלי הרובוט",
      text:
        "הדפיסו את Start כדי לתת למערכת הבקרה את הניצוץ הראשון שלה!",
      prompt: "כתוב/כתבי שורה אחת שמדפיסה: Start",
      hint: 'שימו את Start בתוך גרשיים, למשל: print("Start")',
      validator: {
        mode: "exact",
        patterns: ["print('Start')", 'print("Start")']
      },
      effect: "engine",
      successText: "🚀 נהדר! מערכת הבקרה הראשית נדלקה!"
    }
  ],

  // משימה 2 – מסך הבקרה המשני (MCQ)
  2: [
    {
      type: "cutscene",
      icon: "💡",
      bg: "assets/backgrounds/ch1-engine-room.png",
      character: "מיינדפלי הרובוט",
      avatar: "assets/characters/ai-orion.png",
      story: "הפעלת מסך הבקרה המשני.",
      text:
        "מסך המשנה עדיין מציג אזהרה. נדרש לבחור את ההדפסה הנכונה כדי לייצב אותו.",
      effect: "light"
    },
    {
      type: "mcq",
      icon: "💡",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story: "בחרו את פקודת ההדפסה התקינה.",
      character: "מיינדפלי הרובוט",
      text: "זכרו – טקסט תמיד חייב להיות בתוך גרשיים!",
      hint:
        'הדפסה של טקסט בפייתון חייבת לכלול גרשיים סביב הטקסט, למשל: print("Hello")',
      question: "איזו פקודת print מייצבת את המסך?",
      answers: [
        { text: 'print("system stable")', correct: true },
        { text: "print system stable", correct: false },
        { text: 'console.log("system stable")', correct: false },
        { text: 'alert("system stable")', correct: false }
      ],
      effect: "light"
    }
  ],

  // משימה 3 – הרכבת פקודת print להפעלת מסך נוסף
  3: [
    {
      type: "cutscene",
      icon: "🧰",
      bg: "assets/backgrounds/ch1-engine-room.png",
      character: "מיינדפלי הרובוט",
      avatar: "assets/characters/ai-orion.png",
      story: "הפעלת לוח הפקודות.",
      text:
        "עלינו להרכיב פקודה שתשלים את תיקון חדר הבקרה.",
      effect: "library"
    },
    {
      type: "drag",
      icon: "🧩",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story: "גררו את החלקים כדי לבנות את פקודת ההדפסה.",
      character: "מיינדפלי הרובוט",
      text:
        "מקמו את החלקים בסדר הנכון כדי ליצור את הפקודה: print('control online')",
      prompt:
        'גררו את החלקים לאזור "סדר נכון" כדי ליצור את הפקודה:\nprint("control online")',
      items: ['"control online"', ")", "print("],
      targetOrder: ["print(", '"control online"', ")"],
      effect: "library"
    }
  ]
};

// ===============================
//      LEVEL SELECTION LOGIC
// ===============================

let levels;
if (isLessonMode) {
  levels = lessons[lessonNum] || lessons[1];
} else {
  levels = chapters[chapterNum] || chapters[1];
}

// ===============================
//        GAME ENGINE BELOW
// ===============================

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


// --- RTL לכל הטקסטים בעברית ---
[storyEl, characterText, codePromptEl, questionEl, challengeStoryEl, feedbackEl].forEach(
  (el) => {
    if (!el) return;
    el.dir = "rtl";
    el.style.textAlign = "right";
  }
);





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
    o.type = "sine";
    g.gain.value = 0.05;
    o.start();
    o.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

// --- helpers ---

const CHARACTER_AVATARS = {
  "מערכת": "assets/characters/system-alert.png",
  "מיינדפלי הרובוט": "assets/characters/ai-orion.png",
  "אור": "assets/characters/or.png",
  "נדב": "assets/characters/nadav.png"
};

function setTopUI() {
  if (isLessonMode) {
    chapterTitleEl.textContent = `משימה ${lessonNum}`;
  } else {
    let title = `פרק ${chapterNum}`;
    if (chapterNum === 1) title += " – תיקון חדר הבקרה";
    chapterTitleEl.textContent = title;
  }

  levelCounterEl.textContent = `שלב ${levelIndex + 1}/${levels.length}`;
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

function showCharacter(lvl) {
  const hasChar = !!(lvl.character && lvl.text);
  if (hasChar) {
    characterRow.classList.remove("hidden");
    characterName.textContent = lvl.character || "";
    characterText.textContent = lvl.text || "";

    const avatarSrc =
      lvl.avatar || CHARACTER_AVATARS[lvl.character];

    if (avatarSrc) {
      characterAvatar.src = avatarSrc;
      characterAvatar.classList.remove("hidden");
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

function renderDialogue(lvl) {
  hideAllBoxes();
  
  gameEl.classList.add("mode-dialogue");
  gameEl.classList.remove("mode-challenge");

  storyEl.textContent = lvl.story || "";
  showCharacter(lvl);
  dialogueNextBtn.classList.remove("hidden");
  s("sndDialogue");
}

function renderMCQ(lvl) {
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  mcqBox.classList.remove("hidden");

  showCharacter(lvl);

  if (!lvl.character || !lvl.text) {
    storyEl.textContent = lvl.story || "";
  } else storyEl.textContent = "";

  if (challengeStoryEl) {
    challengeStoryEl.textContent = lvl.story || "";
  }

  questionEl.textContent = lvl.question || "";
  answersEl.innerHTML = "";

  (lvl.answers || []).forEach((a) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = a.text;
    btn.onclick = () => chooseMCQ(a.correct, btn);
    answersEl.appendChild(btn);
  });

  hintBtn.onclick = () => {
    feedbackEl.textContent = lvl.hint
      ? "💡 " + lvl.hint
      : "אין רמז בשלב הזה 🙂";
    feedbackEl.className = "";
  };
}

function chooseMCQ(isCorrect, btnEl) {
  if (locked) return;
  if (isCorrect) {
    locked = true;
    btnEl.classList.add("correct");
    feedbackEl.textContent = "✅ נכון!";
    feedbackEl.classList.add("correct");
    nextBtn.classList.remove("hidden");
    s("sndCorrect");
  } else {
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
  codeBox.classList.remove("hidden");

  showCharacter(lvl);

  if (!lvl.character || !lvl.text) {
    storyEl.textContent = lvl.story || "";
  } else storyEl.textContent = "";

  codePromptEl.textContent = lvl.prompt || "";
  codeInputEl.value = "";
  codeInputEl.focus();

  runCodeBtn.onclick = () => {
    const ok = validateCode(codeInputEl.value, lvl.validator);
    if (ok) {
      feedbackEl.textContent =
        lvl.successText || "🎉 קוד תקין!";
      feedbackEl.className = "correct";
      nextFromCodeBtn.classList.remove("hidden");
      s("sndCorrect");
    } else {
      feedbackEl.textContent = "❌ כמעט… נסו שוב.\n💡 " + lvl.hint;
      feedbackEl.className = "wrong";
      s("sndWrong");
    }
  };
}

function renderDrag(lvl) {
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  dragBox.classList.remove("hidden");

  showCharacter(lvl);

  if (!lvl.character || !lvl.text) {
    storyEl.textContent = lvl.story || "";
  } else storyEl.textContent = "";

  dragPromptEl.textContent = lvl.prompt || "";
  dragItemsEl.innerHTML = "";
  dragTargetEl.innerHTML = "";

  (lvl.items || []).forEach((text, idx) => {
    const chip = createDragChip(text, idx);
    dragItemsEl.appendChild(chip);
  });

  enableDropZone(dragItemsEl);
  enableDropZone(dragTargetEl);

  checkDragBtn.onclick = () => {
    const current = [...dragTargetEl.querySelectorAll(".drag-chip")].map(
      (c) => c.dataset.value
    );

    const ok =
      JSON.stringify(current) === JSON.stringify(lvl.targetOrder);
    if (ok) {
      feedbackEl.textContent =
        lvl.successText ||
        "🎉 בוצע בהצלחה!";
      feedbackEl.className = "correct";
      nextFromDragBtn.classList.remove("hidden");
      s("sndCorrect");
    } else {
      feedbackEl.textContent =
        "❌ עדיין לא. מקמו מחדש את החלקים.";
      feedbackEl.className = "wrong";
      s("sndWrong");
    }
  };
}

function createDragChip(text, idx) {
  const chip = document.createElement("div");
  chip.className = "drag-chip";
  chip.draggable = true;
  chip.textContent = text;
  chip.dataset.value = text;
  chip.dataset.id = "chip-" + idx;

  chip.addEventListener("dragstart", (e) =>
    e.dataTransfer.setData("text/id", chip.dataset.id)
  );

  chip.addEventListener("click", () => {
    const parent = chip.parentElement;
    if (parent === dragTargetEl) dragItemsEl.appendChild(chip);
    else dragTargetEl.appendChild(chip);
  });

  return chip;
}

function enableDropZone(zone) {
  zone.addEventListener("dragover", (e) => e.preventDefault());
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/id");
    const chip = document.querySelector(`[data-id="${id}"]`);
    if (chip && chip.parentElement !== zone) zone.appendChild(chip);
  });
}

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
  if (lvl.effect) gameEl.classList.add(`effect-${lvl.effect}`);
}

function renderLevel() {
  locked = false;
  resetFeedback();
  setTopUI();

  const lvl = levels[levelIndex];

  if (lvl && lvl.bg) {
    document.body.style.background = `url('${lvl.bg}') center/cover fixed no-repeat #020617`;
  }

  storyIconEl.textContent = lvl.icon || "✨";
  applyEffect(lvl);

  if (lvl.type === "dialogue" || lvl.type === "cutscene")
    return renderDialogue(lvl);
  if (lvl.type === "code") return renderCode(lvl);
  if (lvl.type === "drag") return renderDrag(lvl);
  return renderMCQ(lvl);
}

function goNext() {
  gameEl.classList.add("slide-out");

  setTimeout(() => {
    gameEl.classList.remove("slide-out");
    gameEl.classList.add("slide-in");
    setTimeout(() => gameEl.classList.remove("slide-in"), 350);

    levelIndex++;
    if (levelIndex >= levels.length) levelIndex = 0;
    renderLevel();
  }, 350);
}

nextBtn.onclick = goNext;
nextFromCodeBtn.onclick = goNext;
nextFromDragBtn.onclick = goNext;
dialogueNextBtn.onclick = goNext;

renderLevel();
