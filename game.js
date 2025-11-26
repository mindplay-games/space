// ===============================
// MindPlay – מסע הקוד של אוריון
// סוגי שלבים: dialogue / mcq / code / drag
// פרקים דרך ?chapter=1,2,...
// ===============================

// --- chapter param ---
const params = new URLSearchParams(window.location.search);
const chapterNum = Number(params.get("chapter") || 1);

// --- Chapters data ---
// פרק 1: מודול הבסיס של החללית
const chapters = {
  1: [
    // סצנה 1 – הכיתה והפורטל
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-classroom.png",
      story: "כיתה רגילה. מסך המחשב פתאום מתחיל להבהב באור סגול-תכלת.",
      character: "מספר",
      avatar: "assets/characters/narrator-screen.png",
      text: "שורות קוד מסתובבות בספירלה על המסך... ואז הכל נקרע כמו דף דיגיטלי ונפתח פורטל קוד."
    },
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-code-portal.png",
      story: "הילדים נשאבים פנימה דרך משושה זוהר עשוי פיקסלים.",
      character: "מספר",
      avatar: "assets/characters/narrator-screen.png",
      text: "אתם מרגישים נפילה קצרה... וכשאתם פוקחים את העיניים – הכל נראה אחרת."
    },

    // סצנה 2 – חללית אוריון
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-orion-bridge.png",
      story: "אתם עומדים על גשר פיקוד של חללית ענקית שנבנתה מקוד.",
      character: "אוריון – AI החללית",
      avatar: "assets/characters/orion-ai.png",
      text: "ברוכים הבאים, צוות צעיר! אני אוריון. מערכת הקוד שלי נפגעה ואני לא מצליחה לנווט בחלל."
    },
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-orion-bridge.png",
      story: "",
      character: "אוריון – AI החללית",
      avatar: "assets/characters/orion-ai.png",
      text: "יש לנו מסע שלם: כוכב המשתנים, כוכב התנאים, כוכב הלולאות ועוד... אבל קודם נתקן את מודול הבסיס שלי."
    },

    // סצנה 3 – חדר המנוע, למידה של print
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-engine-room.png",
      story: "צינורות שקופים מלאים בטקסט עוברים בחדר המנוע הראשי.",
      character: "אוריון – AI החללית",
      avatar: "assets/characters/orion-ai.png",
      text: "כאן המנוע הפנימי. כדי להפעיל אותו, אני צריכה פקודת הדפסה מתאימה בלוח הבקרה."
    },
    {
      type: "code",
      bg: "assets/backgrounds/bg-engine-room.png",
      story: "חדר המנוע הראשי – משימת הפעלה.",
      codeStory: "כתבו פקודה שמדפיסה את ההודעה Engine Start! כדי להניע את המנוע.",
      prompt: 'כתבו שורת קוד שמדפיסה את הטקסט: Engine Start!',
      validator: {
        mode: "exact",
        patterns: [
          'print("Engine Start!")',
          "print('Engine Start!')"
        ]
      }
    },

    // סצנה 4 – כדור האור והמשתנים
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-light-core.png",
      story: "חדר ענק ובמרכזו כדור אור כבוי, כמו שמש קטנה.",
      character: "אוריון – AI החללית",
      avatar: "assets/characters/orion-ai.png",
      text: "הכדור הזה צריך ערך כדי לזהור. משתנה הוא פשוט שם שמחזיק ערך. ברגע שנגדיר אותו נכון – הכדור יידלק."
    },
    {
      type: "mcq",
      bg: "assets/backgrounds/bg-light-core.png",
      story: "איזו שורה תדליק את כדור האור?",
      question: "בחרו את שורת הקוד התקינה:",
      hint: "שם משתנה לא יכול להכיל רווח, ו-print הוא לא שם טוב למשמרת.",
      answers: [
        { text: "light_power = 30", correct: true },
        { text: "light power = 30", correct: false },
        { text: "print = 30", correct: false },
        { text: "light_power : 30", correct: false }
      ]
    },

    // סצנה 5 – ספריית הקוד, import
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-code-library.png",
      story: "אתם נכנסים לספריית הקוד של החללית.",
      character: "אוריון – AI החללית",
      avatar: "assets/characters/orion-ai.png",
      text: "כאן אני שומרת ספריות – אוספים של כלים מוכנים. כדי להוסיף יכולות חדשות, אנחנו מייבאים ספרייה."
    },
    {
      type: "drag",
      bg: "assets/backgrounds/bg-code-library.png",
      story: "משימת טעינת ספריית הזמן.",
      dragStory: "גררו את שם הספרייה המתאים כך שהשורה תהיה ספרייה אמיתית בפייתון.",
      prompt: "איזה שם ספרייה מתאים למשבצת הריקה?",
      items: ["time", "hour", "clock", "timer", "start_time"],
      targetOrder: ["time"]
    },

    // סצנה 6 – סיום מודול הבסיס
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-core-corridor.png",
      story: "מסדרון קדמי בחללית נדלק באורות כחולים. נתיבי מידע זורמים על הרצפה.",
      character: "אוריון – AI החללית",
      avatar: "assets/characters/orion-ai.png",
      text: "עבודה מדהימה, צוות! הפעלתם את המנוע, הדלקתם את כדור האור וטענתם את ספריית הזמן. מודול הבסיס תוקן!"
    },
    {
      type: "dialogue",
      bg: "assets/backgrounds/bg-core-corridor.png",
      story: "",
      character: "אוריון – AI החללית",
      avatar: "assets/characters/orion-ai.png",
      text: "המערכת מודיעה: CORE MODULE REPAIRED. עכשיו אפשר לצאת אל כוכב המשתנים – Variable Prime!"
    }
  ]
};

// אפשרות לפרקים עתידיים
// chapters[2] = [...];

// בחירת הפרק
let levels = chapters[chapterNum] || chapters[1];

// --- state ---
let levelIndex = 0;
let locked = false;

// --- DOM ---
const storyEl = document.getElementById("story");

const characterRow = document.getElementById("characterRow");
const characterAvatar = document.getElementById("characterAvatar");
const characterName = document.getElementById("characterName");
const characterText = document.getElementById("characterText");

const dialogueNextBtn = document.getElementById("dialogueNextBtn");

const mcqBox = document.getElementById("mcqBox");
const challengeStoryEl = document.getElementById("challengeStory");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");

const codeBox = document.getElementById("codeBox");
const codeStoryEl = document.getElementById("codeStory");
const codePromptEl = document.getElementById("codePrompt");
const codeInputEl = document.getElementById("codeInput");
const runCodeBtn = document.getElementById("runCodeBtn");
const nextFromCodeBtn = document.getElementById("nextFromCodeBtn");

const dragBox = document.getElementById("dragBox");
const dragStoryEl = document.getElementById("dragStory");
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
function s(id){
  const el = document.getElementById(id);
  if(el){
    el.currentTime = 0;
    el.play().catch(()=>{});
  }
}

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function ensureAudio(){ if(!audioCtx) audioCtx = new AudioCtx(); }
function beep(freq=440, duration=0.12){
  try{
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
  }catch(e){}
}

// --- helpers ---
function setTopUI(){
  chapterTitleEl.textContent = `פרק ${chapterNum} – מודול הבסיס`;
  levelCounterEl.textContent = `שלב ${levelIndex+1}/${levels.length}`;
  const denom = levels.length-1 || 1;
  progressBarEl.style.width = `${(levelIndex/denom)*100}%`;
}

function resetFeedback(){
  feedbackEl.textContent = "";
  feedbackEl.className = "";
}

function hideAllBoxes(){
  mcqBox.classList.add("hidden");
  codeBox.classList.add("hidden");
  dragBox.classList.add("hidden");
  nextBtn.classList.add("hidden");
  nextFromCodeBtn.classList.add("hidden");
  nextFromDragBtn.classList.add("hidden");
  dialogueNextBtn.classList.add("hidden");
}

function showCharacter(lvl){
  const hasChar = !!(lvl.character || lvl.text);
  if(hasChar){
    characterRow.classList.remove("hidden");
    characterName.textContent = lvl.character || "";
    characterText.textContent = lvl.text || "";

    if(lvl.avatar){
      characterAvatar.src = lvl.avatar;
      characterAvatar.classList.remove("hidden");
      characterAvatar.alt = lvl.character || "דמות";
    }else{
      characterAvatar.classList.add("hidden");
    }

    storyEl.classList.add("hidden");
  }else{
    characterRow.classList.add("hidden");
    storyEl.classList.remove("hidden");
  }
}

function normalize(s){
  return (s || "")
    .replace(/\s+/g,"")
    .replace(/“|”/g,'"')
    .replace(/‘|’/g,"'")
    .toLowerCase();
}

function validateCode(userInput, validator){
  const user = normalize(userInput);
  if(!validator) return false;

  if(validator.mode === "exact"){
    return validator.patterns.some(p => user === normalize(p));
  }
  if(validator.mode === "contains"){
    return validator.patterns.every(p => user.includes(normalize(p)));
  }
  if(validator.mode === "regex"){
    return new RegExp(validator.pattern).test(userInput);
  }
  return false;
}

// ------- DRAG HELPERS -------

function createDragChip(text, idx){
  const chip = document.createElement("div");
  chip.className = "drag-chip";
  chip.draggable = true;
  chip.textContent = text;
  chip.dataset.value = text;
  chip.dataset.id = "chip-" + idx;

  chip.addEventListener("dragstart", (e)=>{
    e.dataTransfer.setData("text/id", chip.dataset.id);
  });

  chip.addEventListener("click", ()=>{
    const parent = chip.parentElement;
    if(parent === dragTargetEl){
      dragItemsEl.appendChild(chip);
    }else{
      dragTargetEl.appendChild(chip);
    }
  });

  return chip;
}

function enableDropZone(zone){
  zone.addEventListener("dragover", e => e.preventDefault());
  zone.addEventListener("drop", e=>{
    e.preventDefault();
    const id = e.dataTransfer.getData("text/id");
    if(!id) return;
    const chip = document.querySelector(`[data-id="${id}"]`);
    if(!chip) return;
    if(chip.parentElement === zone) return;
    zone.appendChild(chip);
  });
}

// --- renderers ---
function renderDialogue(lvl){
  hideAllBoxes();
  gameEl.classList.add("mode-dialogue");
  gameEl.classList.remove("mode-challenge");

  storyEl.textContent = lvl.story || "";
  showCharacter(lvl);
  s("sndDialogue");
  dialogueNextBtn.classList.remove("hidden");
}

function renderMCQ(lvl){
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  gameEl.classList.remove("mode-dialogue");

  mcqBox.classList.remove("hidden");
  showCharacter({});         // מסתיר את הדמות
  storyEl.textContent = "";  // אין טקסט עליון במצב משימה

  if(challengeStoryEl){
    challengeStoryEl.textContent = lvl.story || "";
  }

  questionEl.textContent = lvl.question || "";
  answersEl.innerHTML = "";

  lvl.answers.forEach((a)=>{
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = a.text;
    btn.onclick = ()=>chooseMCQ(a.correct, btn);
    answersEl.appendChild(btn);
  });

  hintBtn.onclick = ()=>{
    if(lvl.hint){
      feedbackEl.textContent = "💡 " + lvl.hint;
      feedbackEl.className = "";
    }else{
      feedbackEl.textContent = "אין רמז בשלב הזה 🙂";
      feedbackEl.className = "";
    }
  };
}

function chooseMCQ(isCorrect, btnEl){
  if(locked) return;
  if(isCorrect){
    locked = true;
    beep(880,0.12);
    btnEl.classList.add("correct");
    feedbackEl.textContent = "✅ נכון! המערכת נדלקה.";
    feedbackEl.classList.add("correct");
    nextBtn.classList.remove("hidden");
    s("sndCorrect");
  }else{
    beep(220,0.15);
    btnEl.classList.add("wrong");
    feedbackEl.textContent = "❌ לא מדויק. נסו שוב.";
    feedbackEl.classList.add("wrong");
    setTimeout(()=>btnEl.classList.remove("wrong"),450);
    s("sndWrong");
  }
}

function renderCode(lvl){
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  gameEl.classList.remove("mode-dialogue");

  codeBox.classList.remove("hidden");
  showCharacter({});
  storyEl.textContent = "";

  if(codeStoryEl){
    codeStoryEl.textContent = lvl.codeStory || lvl.story || "";
  }

  codePromptEl.textContent = lvl.prompt || "כתבו שורת קוד:";
  codeInputEl.value = "";
  codeInputEl.focus();

  runCodeBtn.onclick = ()=>{
    const ok = validateCode(codeInputEl.value, lvl.validator);
    if(ok){
      beep(880,0.12);
      feedbackEl.textContent = "✅ מעולה! המנוע מגיב לקוד שלכם.";
      feedbackEl.className = "correct";
      nextFromCodeBtn.classList.remove("hidden");
      s("sndCorrect");
    }else{
      beep(220,0.15);
      feedbackEl.textContent = "❌ הקוד לא מפעיל את המנוע. נסו שוב.";
      feedbackEl.className = "wrong";
      s("sndWrong");
    }
  };
}

function renderDrag(lvl){
  hideAllBoxes();
  gameEl.classList.add("mode-challenge");
  gameEl.classList.remove("mode-dialogue");

  dragBox.classList.remove("hidden");
  showCharacter({});
  storyEl.textContent = "";

  dragStoryEl.textContent = lvl.dragStory || lvl.story || "";
  dragPromptEl.textContent = lvl.prompt || "גררו לחלק המתאים:";

  dragItemsEl.innerHTML = "";
  dragTargetEl.innerHTML = "";

  lvl.items.forEach((text, idx)=>{
    const chip = createDragChip(text, idx);
    dragItemsEl.appendChild(chip);
  });

  enableDropZone(dragItemsEl);
  enableDropZone(dragTargetEl);

  checkDragBtn.onclick = ()=>{
    const current = [...dragTargetEl.querySelectorAll(".drag-chip")]
      .map(c => c.dataset.value);

    const ok = JSON.stringify(current) === JSON.stringify(lvl.targetOrder);
    if(ok){
      beep(880,0.12);
      feedbackEl.textContent = "✅ מצוין! ספריית הזמן נטענה.";
      feedbackEl.className = "correct";
      nextFromDragBtn.classList.remove("hidden");
      s("sndCorrect");
    }else{
      beep(220,0.15);
      feedbackEl.textContent = "❌ זו לא ספרייה אמיתית בפייתון. נסו ספרייה אחרת.";
      feedbackEl.className = "wrong";
      s("sndWrong");
    }
  };
}

// --- main ---
function renderLevel(){
  locked = false;
  resetFeedback();
  setTopUI();

  const lvl = levels[levelIndex];

  // רקע לפי סצנה
  if(lvl.bg){
    document.body.style.background =
      `url('${lvl.bg}') center/cover fixed no-repeat`;
  }

  if(lvl.type === "dialogue") return renderDialogue(lvl);
  if(lvl.type === "code") return renderCode(lvl);
  if(lvl.type === "drag") return renderDrag(lvl);
  return renderMCQ(lvl);
}

function goNext(){
  s("sndClick");
  const frame = document.querySelector(".game");
  frame.classList.add("slide-out");

  setTimeout(()=>{
    frame.classList.remove("slide-out");
    levelIndex++;
    if(levelIndex >= levels.length) levelIndex = 0; // כרגע לולאה אחורה להתחלה
    renderLevel();
  }, 250);
}

// חיבור כפתורים
nextBtn.onclick = goNext;
nextFromCodeBtn.onclick = goNext;
nextFromDragBtn.onclick = goNext;
dialogueNextBtn.onclick = goNext;

// התחלה
renderLevel();
