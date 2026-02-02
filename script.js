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

function submitTest() {
  let total = 0;

  activeSection.questions.forEach((q, i) => {
    let score = responses[i];
    if (q.r) score = 6 - score; // reverse scoring
    total += score;
  });

  const avg = (total / activeSection.questions.length).toFixed(2);

  document.getElementById("questionArea").classList.add("hidden");
  const resultBox = document.getElementById("resultArea");
  resultBox.classList.remove("hidden");

  resultBox.innerHTML = `
    <h2>${activeSection.title} Result</h2>
    <div class="score-box">
      <strong>Average Score:</strong> ${avg} / 5
    </div>
    <p>Higher score indicates stronger presence of this trait.</p>
    <button class="btn" onclick="closeTest()">Close</button>
  `;

  // SEND TO FORMSPREE (SILENT)
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
      responses: responses
    })
  });
}

function closeTest() {
  document.getElementById("testModal").classList.add("hidden");
}
