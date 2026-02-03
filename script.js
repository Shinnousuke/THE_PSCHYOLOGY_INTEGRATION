let quizStarted = false;
let outsideClickCount = 0;


const SECTION_TYPES = {
  personality: [
    {
      min: 1, max: 2.5,
      type: "Introvert / Sensor / Feeler / Perceiver",
      desc: "You tend to be reflective, emotionally sensitive, and inward-focused. You prefer familiarity, meaningful conversations, and thoughtful decision-making over constant stimulation.",
      traits: [
        "Prefers smaller groups",
        "Emotionally reflective",
        "Detail-oriented",
        "Values routine",
        "Thoughtful communicator"
      ]
    },
    {
      min: 2.6, max: 3.5,
      type: "Balanced Personality",
      desc: "You display a flexible mix of traits. You can adapt your behavior depending on the situation and maintain emotional balance in most environments.",
      traits: [
        "Situational adaptability",
        "Balanced emotions",
        "Flexible thinking",
        "Moderate sociability",
        "Stable personality"
      ]
    },
    {
      min: 3.6, max: 5,
      type: "Extrovert / Intuitive / Thinker / Judger",
      desc: "You are expressive, idea-driven, and structured. You enjoy interaction, leadership, and goal-oriented environments.",
      traits: [
        "Socially energetic",
        "Goal-focused",
        "Decisive",
        "Big-picture thinker",
        "Leadership oriented"
      ]
    }
  ],

  behaviour: [
    {
      min: 1, max: 2.5,
      type: "Emotional / Impulsive Behaviour",
      desc: "Your actions are often emotion-driven and spontaneous. You may react quickly without considering long-term consequences.",
      traits: [
        "Emotion-led reactions",
        "Impulsive actions",
        "High intensity emotions",
        "Quick decision-making",
        "Needs self-regulation"
      ]
    },
    {
      min: 2.6, max: 3.5,
      type: "Balanced / Adaptive Behaviour",
      desc: "You manage emotions reasonably well and adjust behavior based on experience and feedback.",
      traits: [
        "Emotionally aware",
        "Adaptive responses",
        "Learns from experience",
        "Moderate discipline",
        "Balanced control"
      ]
    },
    {
      min: 3.6, max: 5,
      type: "Disciplined / Cognitive Behaviour",
      desc: "You act thoughtfully, follow rules, and show strong self-control even under pressure.",
      traits: [
        "Highly disciplined",
        "Rule-oriented",
        "Responsible actions",
        "Low impulsivity",
        "Consistent habits"
      ]
    }
  ],

  stress: [
    {
      min: 1, max: 2.5,
      type: "Low Stress / Strong Coping",
      desc: "You handle pressure well and recover quickly from stressful situations.",
      traits: [
        "Healthy coping strategies",
        "Low emotional exhaustion",
        "Stable mood",
        "Good stress recovery",
        "Mental resilience"
      ]
    },
    {
      min: 2.6, max: 3.5,
      type: "Moderate / Transitional Stress",
      desc: "Stress appears during demanding periods but remains manageable.",
      traits: [
        "Situational stress",
        "Occasional fatigue",
        "Needs self-care",
        "Balanced stress level",
        "Generally functional"
      ]
    },
    {
      min: 3.6, max: 5,
      type: "High / Chronic Stress",
      desc: "You often feel overwhelmed. Stress may impact sleep, energy, or emotions.",
      traits: [
        "Emotional exhaustion",
        "Sleep disruption",
        "Frequent worry",
        "Needs support systems",
        "Chronic pressure"
      ]
    }
  ],

  eq: [
    {
      min: 1, max: 2.5,
      type: "Low Emotional Intelligence",
      desc: "Emotional awareness and regulation may need development.",
      traits: [
        "Difficulty managing emotions",
        "Low empathy",
        "Misreads social cues",
        "Defensive reactions",
        "Needs emotional skills"
      ]
    },
    {
      min: 2.6, max: 3.5,
      type: "Moderate Emotional Intelligence",
      desc: "You understand emotions fairly well and manage most situations adequately.",
      traits: [
        "Functional empathy",
        "Basic emotional control",
        "Improving self-awareness",
        "Moderate communication",
        "Growth potential"
      ]
    },
    {
      min: 3.6, max: 5,
      type: "High Emotional Intelligence",
      desc: "You are emotionally aware, empathetic, and composed even in conflict.",
      traits: [
        "Strong self-awareness",
        "Excellent empathy",
        "Emotional regulation",
        "Healthy relationships",
        "Calm under pressure"
      ]
    }
  ],

  motivation: [
    {
      min: 1, max: 2.5,
      type: "Extrinsic Motivation",
      desc: "Motivation depends largely on rewards, praise, or pressure.",
      traits: [
        "Reward-driven",
        "Needs validation",
        "Low intrinsic drive",
        "Inconsistent effort",
        "External focus"
      ]
    },
    {
      min: 2.6, max: 3.5,
      type: "Balanced Motivation",
      desc: "You combine internal purpose with external rewards.",
      traits: [
        "Moderate self-drive",
        "Goal-oriented",
        "Needs structure",
        "Motivation fluctuates",
        "Purpose-driven at times"
      ]
    },
    {
      min: 3.6, max: 5,
      type: "Strong Intrinsic Motivation",
      desc: "You are driven by personal growth, mastery, and internal satisfaction.",
      traits: [
        "Highly self-motivated",
        "Persistent mindset",
        "Enjoys challenges",
        "Goal clarity",
        "Growth focused"
      ]
    }
  ],

  cognitive: [
    {
      min: 1, max: 2.5,
      type: "Intuitive / Concrete Thinker",
      desc: "You rely more on instinct than structured reasoning.",
      traits: [
        "Intuition-based decisions",
        "Prefers simplicity",
        "Avoids over-analysis",
        "Concrete thinking",
        "Fast judgments"
      ]
    },
    {
      min: 2.6, max: 3.5,
      type: "Balanced Thinking Style",
      desc: "You blend logic and intuition depending on context.",
      traits: [
        "Flexible thinking",
        "Context-aware decisions",
        "Learns from feedback",
        "Moderate analysis",
        "Adaptive mindset"
      ]
    },
    {
      min: 3.6, max: 5,
      type: "Analytical / Critical Thinker",
      desc: "You enjoy structured reasoning and complex problem solving.",
      traits: [
        "Logical reasoning",
        "Critical analysis",
        "Structured thinking",
        "Learns from mistakes",
        "Comfortable with complexity"
      ]
    }
  ]
};

const SECTIONS = [
  {
    id: "personality",
    title: "Personality",
    questions: [
      { q: "I enjoy meeting new people and socializing frequently.", r: false },
      { q: "I prefer planning things in advance rather than acting spontaneously.", r: false },
      { q: "I remain calm even in stressful situations.", r: false },
      { q: "I like trying new experiences and ideas.", r: false },
      { q: "I complete tasks thoroughly and carefully.", r: false },
      { q: "I get irritated easily over small matters.", r: true },
      { q: "I feel confident expressing my opinions in a group.", r: false },
      { q: "I often reflect on my thoughts and feelings.", r: false },
      { q: "I adapt quickly to changes in plans.", r: false },
      { q: "I keep my commitments even when it is difficult.", r: false },
      { q: "I worry a lot about things beyond my control.", r: true },
      { q: "I enjoy working independently.", r: false },
      { q: "I am open to constructive criticism.", r: false },
      { q: "I stay organized in my daily life.", r: false },
      { q: "I feel emotionally stable most of the time.", r: false }
    ]
  },
  {
    id: "behaviour",
    title: "Behaviour Analysis",
    questions: [
      { q: "I act without thinking when I am excited or upset.", r: true },
      { q: "I am consistent in my daily habits.", r: false },
      { q: "I delay tasks even when they are important.", r: true },
      { q: "I control my reactions during conflicts.", r: false },
      { q: "I take responsibility for my actions.", r: false },
      { q: "I tend to repeat behaviors that worked well in the past.", r: false },
      { q: "I get distracted easily while working.", r: true },
      { q: "I follow rules even when no one is watching.", r: false },
      { q: "I react emotionally before analyzing a situation.", r: true },
      { q: "I am disciplined with my time and routine.", r: false },
      { q: "I make impulsive decisions.", r: true },
      { q: "I adjust my behavior based on feedback.", r: false },
      { q: "I remain patient when things don’t go my way.", r: false },
      { q: "I avoid situations that make me uncomfortable.", r: true },
      { q: "I think about consequences before acting.", r: false }
    ]
  },

  {
    id: "stress",
    title: "Stress & Coping",
    questions: [
      { q: "I feel stressed by my daily responsibilities.", r: true },
      { q: "I find it hard to relax after a busy day.", r: true },
      { q: "I feel overwhelmed by deadlines or expectations.", r: true },
      { q: "I manage stress effectively.", r: false },
      { q: "I experience physical symptoms like headaches or fatigue due to stress.", r: true },
      { q: "I talk to someone when I feel stressed.", r: false },
      { q: "I feel in control of my problems.", r: false },
      { q: "I lose sleep because of worrying.", r: true },
      { q: "I use healthy methods to cope with stress.", r: false },
      { q: "I get frustrated easily under pressure.", r: true },
      { q: "I recover quickly after stressful situations.", r: false },
      { q: "I feel emotionally drained at the end of the day.", r: true }
    ]
  },

  {
    id: "eq",
    title: "Emotional Intelligence",
    questions: [
      { q: "I understand my emotions as I experience them.", r: false },
      { q: "I can control my emotions in difficult situations.", r: false },
      { q: "I notice how others feel even if they don’t say it.", r: false },
      { q: "I remain calm during emotional conflicts.", r: false },
      { q: "I empathize with others’ problems.", r: false },
      { q: "I express my emotions clearly and appropriately.", r: false },
      { q: "I handle criticism without getting defensive.", r: false },
      { q: "I motivate myself even when I feel low.", r: false },
      { q: "I understand how my emotions affect my behavior.", r: false },
      { q: "I help others manage their emotions.", r: false }
    ]
  },

  {
    id: "motivation",
    title: "Motivation & Goals",
    questions: [
      { q: "I set clear goals for myself.", r: false },
      { q: "I stay motivated even when progress is slow.", r: false },
      { q: "I work mainly for external rewards.", r: true },
      { q: "I feel satisfied when I complete a challenging task.", r: false },
      { q: "I procrastinate even when tasks are important.", r: true },
      { q: "I push myself to improve continuously.", r: false },
      { q: "I give up easily when things become difficult.", r: true },
      { q: "I enjoy learning new skills.", r: false },
      { q: "I stay focused on long-term goals.", r: false },
      { q: "I need frequent motivation from others to work.", r: true },
      { q: "I manage my time effectively to achieve goals.", r: false },
      { q: "I feel driven to perform better than my past self.", r: false }
    ]
  },

  {
    id: "cognitive",
    title: "Cognitive / Decision-Making Style",
    questions: [
      { q: "I analyze all options before making decisions.", r: false },
      { q: "I trust my intuition while making choices.", r: false },
      { q: "I make decisions quickly without much thought.", r: true },
      { q: "I enjoy solving complex problems.", r: false },
      { q: "I change my decision if I receive better information.", r: false },
      { q: "I feel confident about the decisions I make.", r: false },
      { q: "I rely more on logic than emotions while deciding.", r: false },
      { q: "I feel confused when faced with many choices.", r: true },
      { q: "I learn from past decision-making mistakes.", r: false },
      { q: "I prefer structured thinking over guesswork.", r: false }
    ]
  }
];


const FORMSPREE_URL = "https://formspree.io/f/xkozvlrv"; // 🔴 replace

let activeSection = null;
let currentQuestion = 0;
let responses = [];
let userData = {};

const SCALE = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
];


function startTest(sectionId) {

  console.log("Test started:", sectionId);

  activeSection = SECTIONS.find(s => s.id === sectionId);

  quizStarted = false;        // ✅ ADD
  outsideClickCount = 0;      // ✅ ADD

  document.getElementById("testModal").classList.remove("hidden");
  document.getElementById("userInfo").classList.remove("hidden");
  document.getElementById("questionArea").classList.add("hidden");
  document.getElementById("resultArea").classList.add("hidden");

  currentQuestion = 0;
  responses = [];
}


function beginTest() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();

  if (!name || !email) {
    alert("Please enter name and email");
    return;
  }

  userData = { name, email };

  quizStarted = true;          // ✅ ADD
  outsideClickCount = 0;       // ✅ ADD

  document.getElementById("userInfo").classList.add("hidden");
  document.getElementById("questionArea").classList.remove("hidden");

  loadQuestion();
}


function loadQuestion() {
  const q = activeSection.questions[currentQuestion];
  document.getElementById("questionText").innerText = q.q;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  SCALE.forEach((label, i) => {
    const opt = document.createElement("label");
    opt.innerHTML = `
      <input type="radio" name="scale" value="${i + 1}">
      ${i + 1} – ${label}
    `;
    container.appendChild(opt);
  });

  if (responses[currentQuestion]) {
    document.querySelector(
      `input[value="${responses[currentQuestion]}"]`
    ).checked = true;
  }

  document.getElementById("progressText").innerText =
    `${currentQuestion + 1} / ${activeSection.questions.length}`;

  document.getElementById("prevBtn").style.visibility =
    currentQuestion === 0 ? "hidden" : "visible";

  document.getElementById("nextBtn").innerText =
    currentQuestion === activeSection.questions.length - 1
      ? "Submit"
      : "Next →";
}

function nextQuestion() {
  const selected = document.querySelector('input[name="scale"]:checked');
  if (!selected) {
    alert("Please select an option");
    return;
  }

  responses[currentQuestion] = Number(selected.value);

  if (currentQuestion === activeSection.questions.length - 1) {
    submitTest();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  currentQuestion--;
  loadQuestion();
}

function getResultType(sectionId, avgScore) {
  const ranges = SECTION_TYPES[sectionId];
  if (!ranges) return null;

  return ranges.find(r =>
    avgScore >= r.min && avgScore <= r.max
  );
}

function submitTest() {
  let total = 0;

  activeSection.questions.forEach((q, i) => {
    let score = responses[i];
    if (q.r) score = 6 - score;
    total += score;
  });

  const avg = +(total / activeSection.questions.length).toFixed(2);

  const resultType = getResultType(activeSection.id, avg);

  document.getElementById("questionArea").classList.add("hidden");
  const resultBox = document.getElementById("resultArea");
  resultBox.classList.remove("hidden");

  let traitsHTML = "";
  if (resultType?.traits) {
    traitsHTML = `
      <ul class="traits-list">
        ${resultType.traits.map(t => `<li>${t}</li>`).join("")}
      </ul>
    `;
  }

  resultBox.innerHTML = `
    <h2>${activeSection.title} Result</h2>

    <div class="score-box">
      <strong>Average Score:</strong> ${avg} / 5
    </div>

    <h3>${resultType?.type || "Result Summary"}</h3>

    <p>${resultType?.desc || ""}</p>

    ${traitsHTML}

    <button class="btn" onclick="closeTest()">Close</button>
  `;

  // send silently
  fetch(FORMSPREE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      section: activeSection.title,
      average_score: avg,
      result_type: resultType?.type,
      traits: resultType?.traits,
      responses
    })
  });
}



function closeTest() {
  document.getElementById("testModal").classList.add("hidden");
  quizStarted = false;
  outsideClickCount = 0;
}


const modal = document.getElementById("testModal");

modal.addEventListener("click", function (e) {

  // 🔒 EXIT ONLY IF CLICKED ON BACKDROP
  if (e.target !== modal) return;

  // 🔹 CASE 1: Name & Email screen
  if (!quizStarted) {
    closeTest();
    return;
  }

  // 🔹 CASE 2: Quiz in progress
  outsideClickCount++;

  if (outsideClickCount === 1) {
    showExitWarning();
  } else {
    submitIncompleteTest();
    closeTest();
  }
});




function showExitWarning() {
  const warning = document.createElement("div");
  warning.className = "exit-warning";
  warning.innerText = "Please continue the test, it won’t take much longer 🙂";

  document.body.appendChild(warning);

  setTimeout(() => warning.remove(), 2500);
}
function submitIncompleteTest() {
  if (!responses.length) return;

  activeSection.questions.forEach((q, i) => {
    if (!responses[i]) responses[i] = 3; // Neutral default
  });

  submitTest();
}
