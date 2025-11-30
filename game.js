// ===============================
// MindPlay – Journey Through the Codeverse (Orion Edition)
// ===============================

// --- URL params ---
const params = new URLSearchParams(window.location.search);
const chapterNum = Number(params.get("chapter") || 1);
const lessonParam = params.get("lesson");
const lessonNum = lessonParam ? Number(lessonParam) : null;
const isLessonMode = !!lessonParam;

//מאי  
// ===============================
//      CHAPTERS CONTENT
// ===============================

const chapters = {
  1: [
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

    {
      type: "code",
      icon: "🖥️",
      bg: "assets/backgrounds/ch1-engine-room.png",
      story:
        "לוח קונסולות ענק עומד כבוי. רק שורת פקודות אחת מסוגלת להפעיל אותו מחדש.",
      character: "מיינדפלי הרובוט",
      text:
        "כדי להפעיל את מסך הבקרה הראשי, הדפיסו את המילה Start. זה יתן ניצוץ ראשוני למערכת.",
      prompt: "כתוב/כתבי שורת קוד שמדליקה את מערכת הבקרה עם ההודעה Start.",
      hint: 'השתמשו בפקודת print ובגרשיים, למשל: print("Start")',
      validator: {
        mode: "exact",
        patterns: ['print("Start")', "print('Start')"]
      },
      effect: "engine",
      successText: "✅ מעולה! מסך הבקרה הראשי הופעל."
    },

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
      question: "איזו שורה תייצב את מערכת הבקרה?",
      answers: [
        { text: 'print("system stable")', correct: true },
        { text: "print system stable", correct: false },
        { text: 'console.log("system stable")', correct: false },
        { text: 'alert("system stable")', correct: false }
      ],
      effect: "light"
    },

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

    {
      type: "cutscene",
      icon: "🌌",
      bg: "assets/backgrounds/ch1-front-corridor.png",
      story:
        "אורות כחולים נדלקים בכל החדר. כל המסכים מציגים: CONTROL ROOM — ONLINE.",
      character: "מיינדפלי הרובוט",
      avatar: "assets/characters/ai-orion.png",
      text:
        "עבודה מדהימה, צוות! הפעלתם את חדר הבקרה. עכשיו אפשר לצאת אל המסע הבין־כוכבי. היעד הבא במפת הגלקסיה: כוכב המשתנים!"
    }
  ],
 
};


// ===============================
//      LESSONS
// ===============================

const lessons = {
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
  ]
};


// ===============================
//      LEVEL SELECTION
// ===============================

let levels = isLessonMode
  ? lessons[lessonNum] || lessons[1]
  : chapters[chapterNum] || chapters[1];


// ===============================
//        GAME ENGINE
// ===============================

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


// --- RTL ---
[storyEl, characterText, codePromptEl, questionEl, challengeStoryEl, feedbackEl].forEach(
  (el) => {
    if (!el) return;
    el.dir = "rtl";
    el.style.textAlign = "right";
  }
);


// --- Helpers ---
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
    characterName.textContent = lvl.character;
    characterText.textContent = lvl.text;

    const avatarSrc =
      lvl.avatar || CHARACTER_AVATARS[lvl.character];

    characterAvatar.src = avatarSrc;
    characterAvatar.classList.remove("hidden");

    storyEl.classList.add("hidden");
  } else {
    characterRow.classList.add("hidden");
    storyEl.classList.remove("hidden");
  }
}


// ===============================
//  FIX: REAL MODE SWITCHING
// ===============================

function enterDialogueMode() {
  gameEl.classList.remove("mode-challenge");
  gameEl.classList.add("mode-dialogue");
}

function enterChallengeMode() {
  gameEl.classList.remove("mode-dialogue");
  gameEl.classList.add("mode-challenge");
}


// ===============================
// RENDERERS
// ===============================

function renderDialogue(lvl) {
  hideAllBoxes();
  enterDialogueMode();

  storyEl.textContent = lvl.story || "";
  showCharacter(lvl);

  dialogueNextBtn.classList.remove("hidden");
}

function renderMCQ(lvl) {
  hideAllBoxes();
  enterChallengeMode();
  mcqBox.classList.remove("hidden");

  showCharacter(lvl);

  if (!lvl.character || !lvl.text) {
    storyEl.textContent = lvl.story || "";
  } else storyEl.textContent = "";

  challengeStoryEl.textContent = lvl.story || "";
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
    feedbackEl.textContent = lvl.hint || "אין רמז בשלב הזה 🙂";
  };
}

function renderCode(lvl) {
  hideAllBoxes();
  enterChallengeMode();
  codeBox.classList.remove("hidden");

  showCharacter(lvl);
  codePromptEl.textContent = lvl.prompt || "";
  codeInputEl.value = "";

  runCodeBtn.onclick = () => {
    const ok = validateCode(codeInputEl.value, lvl.validator);
    if (ok) {
      feedbackEl.textContent = lvl.successText || "🎉 קוד תקין!";
      feedbackEl.className = "correct";
      nextFromCodeBtn.classList.remove("hidden");
    } else {
      feedbackEl.textContent = "❌ כמעט… נסו שוב.\n💡 " + lvl.hint;
      feedbackEl.className = "wrong";
    }
  };
}

function renderDrag(lvl) {
  hideAllBoxes();
  enterChallengeMode();
  dragBox.classList.remove("hidden");

  showCharacter(lvl);

  dragPromptEl.textContent = lvl.prompt || "";
  dragItemsEl.innerHTML = "";
  dragTargetEl.innerHTML = "";

  (lvl.items || []).forEach((text, idx) => {
    dragItemsEl.appendChild(createDragChip(text, idx));
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
      feedbackEl.textContent = lvl.successText || "🎉 בוצע בהצלחה!";
      feedbackEl.className = "correct";
      nextFromDragBtn.classList.remove("hidden");
    } else {
      feedbackEl.textContent = "❌ עדיין לא. מקמו מחדש את החלקים.";
      feedbackEl.className = "wrong";
    }
  };
}


// ===============================
// Engine: choose next renderer
// ===============================

function renderLevel() {
  locked = false;
  feedbackEl.textContent = "";

  const lvl = levels[levelIndex];

  if (lvl.bg)
    document.body.style.background =
      `url('${lvl.bg}') center/cover fixed no-repeat #020617`;

  storyIconEl.textContent = lvl.icon || "✨";

  if (lvl.type === "cutscene" || lvl.type === "dialogue")
    return renderDialogue(lvl);
  if (lvl.type === "code")
    return renderCode(lvl);
  if (lvl.type === "drag")
    return renderDrag(lvl);

  return renderMCQ(lvl);
}


// ===============================
// Navigation
// ===============================

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


// ===============================
// Start
// ===============================

renderLevel();
