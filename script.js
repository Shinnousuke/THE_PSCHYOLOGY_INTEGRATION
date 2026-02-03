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
// ✅ Knowledge Cards Carousel - Robust Version
document.addEventListener("DOMContentLoaded", () => {
  const knowledgeTopics = {
  "Personality Traits": [
    `Slide 1: What Is Personality?<br><br>
Personality refers to the unique pattern of thoughts, feelings, and behaviors that make a person who they are.
It influences how we interact with others, respond to situations, make decisions, and express emotions.
Personality develops through a mix of biological factors, life experiences, environment, and personal choices.`,

    `Slide 2: Introvert Personality<br><br>
Introverts focus inward and feel energized by alone time or small groups.
They prefer deep conversations over casual socializing and enjoy reflective activities.
Being introverted does not mean being shy—it reflects how a person recharges and processes experiences.`,

    `Slide 3: Feeler Personality<br><br>
Feelers make decisions based on emotions, values, and how choices affect people.
They are empathetic, compassionate, and sensitive to others’ needs.
They value harmony and emotional connection in relationships.`,

    `Slide 4: Perceiver Personality<br><br>
Perceivers prefer flexibility and spontaneity over strict plans.
They keep options open and adapt as situations change.
This type is curious, creative, and comfortable with uncertainty.`,

    `Slide 5: Balanced Personality<br><br>
Balanced personality reflects flexibility between different traits.
Such individuals can be social yet introspective, emotional yet logical, structured yet adaptable.
Balance helps manage stress, relationships, and life challenges effectively.`,

    `Slide 6: Extrovert Personality<br><br>
Extroverts gain energy from social interactions.
They enjoy people, sharing ideas, and engaging in groups.
Extroversion comes with strong communication skills and outward enthusiasm.`,

    `Slide 7: Intuitive Personality<br><br>
Intuitive individuals focus on patterns, meanings, and future possibilities.
They rely on insights, imagination, and abstract thinking rather than only facts.
This trait is commonly associated with creativity and innovation.`,

    `Slide 8: Thinker Personality<br><br>
Thinkers make decisions using logic, analysis, and objective reasoning.
They prioritize fairness, consistency, and problem-solving.
This personality type often excels in structured thinking and critical evaluation.`,

    `Slide 9: Judger Personality<br><br>
Judgers prefer organization, planning, and clear structure.
They like schedules, deadlines, and closure.
This trait helps in goal-setting, discipline, and long-term planning.`
  ],

  "Behavioural Traits": [
    `Slide 1: What Is Behaviour?<br><br>
Behaviour refers to actions, reactions, and responses of an individual.
It includes conscious actions and unconscious habits influenced by thoughts and emotions.
Behaviour is shaped by personality, environment, experiences, and learning.`,

    `Slide 2: Emotional Behaviour<br><br>
Emotional behaviour is driven by feelings like happiness, anger, fear, or sadness.
It reflects how well a person understands and manages emotions.
Strong emotional awareness leads to healthier behaviour.`,

    `Slide 3: Impulsive Behaviour<br><br>
Impulsive behaviour involves acting without much thought.
It is often driven by immediate emotions or urges.
While spontaneity can be positive, frequent impulsiveness may cause conflict or regret.`,

    `Slide 4: Balanced Behaviour<br><br>
Balanced behaviour reflects emotional control and thoughtful decision-making.
It helps maintain healthy relationships and personal well-being.
It involves responding rather than reacting.`,

    `Slide 5: Adaptive Behaviour<br><br>
Adaptive behaviour is the ability to adjust actions according to situations.
It helps cope with change, challenges, and new environments.
Flexibility is a key aspect.`,

    `Slide 6: Disciplined Behaviour<br><br>
Disciplined behaviour involves self-control, consistency, and responsibility.
It helps achieve goals and maintain routines.
Discipline supports long-term success.`,

    `Slide 7: Cognitive Behaviour<br><br>
Cognitive behaviour is influenced by thoughts, beliefs, and perceptions.
How we think affects how we act and respond.
Positive thinking leads to healthier behavioural patterns.`,

    `Slide 8: How Behaviour Affects Others<br><br>
Your behaviour influences relationships and team dynamics.
Emotional outbursts or impulsiveness may strain connections.
Balanced, disciplined behaviour encourages trust and collaboration.`,

    `Slide 9: How Behaviour Affects Yourself<br><br>
Behaviour impacts mental and physical health.
Good habits enhance well-being, while negative patterns can cause stress or burnout.
Self-awareness improves personal growth and decision-making.`,

    `Slide 10: Impacts of Behaviour<br><br>
Behaviour affects productivity, social relationships, and emotional balance.
Understanding behavioural patterns helps improve interactions, learning, and self-development.`
  ],

  "Stress and Coping": [
    `Slide 1: What Is Stress?<br><br>
Stress is the body’s response to pressure or challenging situations.
It can be caused by external demands or internal thoughts.
Stress is natural but harmful if unmanaged.`,

    `Slide 2: Low Stress<br><br>
Low stress keeps the mind alert and motivated.
It can improve focus, productivity, and performance.
It is generally manageable and short-term.`,

    `Slide 3: Moderate Stress<br><br>
Moderate stress occurs when demands increase.
It may cause temporary anxiety or tiredness.
Proper coping helps manage it effectively.`,

    `Slide 4: High Stress<br><br>
High stress is intense and long-lasting.
It can affect sleep, health, mood, and concentration.
Chronic stress negatively impacts mental and physical well-being.`,

    `Slide 5: Strong Coping Ability<br><br>
Strong coping handles stress healthily.
Includes problem-solving, emotional regulation, and support-seeking.
People recover faster with strong coping skills.`,

    `Slide 6: Low Coping Ability<br><br>
Low coping makes stress management difficult.
It may lead to avoidance, emotional outbursts, or burnout.
Improving coping skills is essential.`,

    `Slide 7: How To Cope With Stress<br><br>
Deep breathing, mindfulness, regular exercise, time management, and social support are effective strategies.`,

    `Slide 8: Why Coping Is Important<br><br>
Coping reduces negative health effects.
Maintains emotional balance, relationships, and productivity.`,

    `Slide 9: Remedies Anywhere<br><br>
Short walks, deep breathing, stretching, listening to music, or journaling can help anywhere.`,

    `Slide 10: Impacts of Stress<br><br>
Stress affects mood, energy, focus, and physical health.
Proper management improves performance and mental well-being.`
  ],

  "Emotional Intelligence": [
    `Slide 1: What Is Emotional Intelligence?<br><br>
EQ is the ability to understand, manage, and express emotions effectively.
Also involves recognizing emotions in others and responding empathetically.
Plays a key role in handling relationships, stress, and challenges.`,

    `Slide 2: Importance of EQ<br><br>
Influences decision-making, communication, and emotional balance.
High EQ helps manage conflicts calmly and build strong relationships.
Considered as important as intellectual ability.`,

    `Slide 3: Low EQ<br><br>
Difficulty understanding or controlling emotions.
May react impulsively or struggle with empathy.
Can cause misunderstandings and stress.`,

    `Slide 4: Moderate EQ<br><br>
Partial awareness of emotions.
Can manage emotions in some situations but struggles under pressure.
Improvement is possible with practice.`,

    `Slide 5: High EQ<br><br>
Strong self-awareness and emotional regulation.
Respond thoughtfully rather than react emotionally.
Handles stress well and maintains healthy relationships.`,

    `Slide 6: Crying & EQ<br><br>
Crying is a natural emotional release.
High EQ allows understanding of emotions behind crying, not suppressing them.`,

    `Slide 7: How EQ Impacts Us<br><br>
Better mental health, stress control, decision-making, and social interactions.`,

    `Slide 8: How EQ Impacts Others<br><br>
Empathetic interactions improve relationships.
Others feel understood and supported.`,

    `Slide 9: Remedies to Improve EQ<br><br>
Mindfulness, journaling, reflecting on emotions, active listening, empathy exercises.`
  ],

  "Motivation and Goals": [
    `Slide 1: What Is Motivation?<br><br>
Inner drive that pushes action, growth, and achieving goals.
Gives direction, energy, and purpose to behaviour.`,

    `Slide 2: Why Motivation Is Important<br><br>
Keeps focus despite difficulties.
Encourages persistence and goal-oriented behaviour.`,

    `Slide 3: Extrinsic Motivation<br><br>
Driven by external rewards: money, praise, grades, recognition.
Effective for short-term goals.`,

    `Slide 4: Balanced Motivation<br><br>
Combines internal interest with external rewards.
Supports long-term consistency without burnout.`,

    `Slide 5: Strong Extrinsic Motivation<br><br>
Heavily relies on rewards or pressure.
Can drive performance but may cause stress.
Motivation may drop if rewards are removed.`,

    `Slide 6: Why People Need Motivation<br><br>
To act, grow, persist, and achieve goals.`,

    `Slide 7: Consequences of No Motivation<br><br>
Low productivity, lack of focus, procrastination, missed goals.`,

    `Slide 8: Impact on Others<br><br>
Motivated individuals inspire teamwork.
Lack of motivation may demotivate peers.`,

    `Slide 9: Effect on Productivity<br><br>
Strong motivation boosts consistency, efficiency, and output.`
  ],

  "Cognitive Biases": [
    `Slide 1: What Is Cognitive Thinking?<br><br>
How the mind processes information: perception, memory, reasoning, problem-solving.
Cognitive styles influence understanding and responses.`,

    `Slide 2: Intuitive Thinking<br><br>
Relies on instinct and pattern recognition.
Decisions made quickly based on experience.
Useful for creativity and rapid decisions.`,

    `Slide 3: Concrete Thinking<br><br>
Focuses on facts, details, and observable info.
Works well for routine tasks and clear instructions.`,

    `Slide 4: Balanced Cognitive Style<br><br>
Combines intuition with logic.
Flexible thinking supports effective decision-making.`,

    `Slide 5: Analytical Thinking<br><br>
Breaks problems into smaller parts.
Relies on data, structure, and logical evaluation.
Effective for problem-solving and planning.`,

    `Slide 6: Critical Thinking<br><br>
Evaluates info objectively.
Questions assumptions and identifies biases.
Helps in informed and rational choices.`,

    `Slide 7: Importance of Cognitive Thinking<br><br>
Shapes learning and understanding.
Improves adaptability and reasoning.
Crucial for personal and professional success.`,

    `Slide 8: Effect on Productivity<br><br>
Clear cognitive processing improves focus, efficiency, and reduces errors.
Better thinking = smarter work.`,

    `Slide 9: Why Know Your Cognitive Style?<br><br>
Self-awareness improves decision-making.
Understanding others’ thinking enhances communication.
Supports personal and professional growth.`
  ],
  "Overview Remedies": [
  `Slide 1: Healthy Lifestyle<br><br>
Regular exercise, balanced diet, and sufficient sleep improve mood and cognitive function.
Physical health strongly supports mental well-being.`,

  `Slide 2: Stress Management Techniques<br><br>
Mindfulness, meditation, deep breathing, yoga, and time management reduce stress.
Helps prevent burnout and promotes calmness.`,

  `Slide 3: Emotional Expression<br><br>
Talk about feelings with trusted friends, family, or therapists.
Journaling or creative outlets helps process emotions effectively.`,

  `Slide 4: Cognitive & Behavioural Strategies<br><br>
Positive thinking, setting realistic goals, problem-solving, and challenging negative thoughts.
Cognitive-behavioural approaches help change unhelpful patterns.`,

  `Slide 5: Social Support & Professional Help<br><br>
Maintain healthy relationships and support networks.
Seek professional help when needed (psychologists, counselors, therapists).
Combining self-care with professional guidance enhances recovery and growth.`
]
,
"Mental Health Basics": [
  `Slide 1: What Is Mental Health?<br><br>
Mental health refers to your emotional, psychological, and social well-being.
It affects how you think, feel, and behave daily.
Good mental health helps handle stress, relate to others, and make decisions.`,

  `Slide 2: Common Mental Health Issues<br><br>
Stress, anxiety, depression, and mood disorders are common challenges.
They can affect work, relationships, and daily functioning.
Early recognition and support are key to management.`,

  `Slide 3: Signs of Poor Mental Health<br><br>
Persistent sadness or irritability, fatigue, changes in sleep or appetite, difficulty concentrating, and social withdrawal.
Noticing these signs early helps in seeking timely support.`,

  `Slide 4: Importance of Awareness<br><br>
Understanding your mental health reduces stigma.
Awareness promotes self-care, empathy, and seeking help when needed.
It encourages a proactive approach to well-being.`,

  `Slide 5: Building Mental Resilience<br><br>
Resilience helps cope with challenges and recover from setbacks.
It involves emotional regulation, problem-solving skills, support networks, and maintaining a balanced lifestyle.`
]


};

  let currentKnowledgeIndex = 0;
  let currentKnowledgeArray = [];

  document.querySelectorAll(".knowledge-card").forEach(card => {
    card.addEventListener("click", () => {
      const topic = card.innerText;
      currentKnowledgeArray = knowledgeTopics[topic];
      currentKnowledgeIndex = 0;
      showKnowledgeCard();
      document.getElementById("knowledgeModal").classList.remove("hidden");
    });
  });

  document.getElementById("closeKnowledgeModal").addEventListener("click", () => {
    document.getElementById("knowledgeModal").classList.add("hidden");
  });

  document.getElementById("prevKnowledge").addEventListener("click", () => {
    if (currentKnowledgeIndex > 0) currentKnowledgeIndex--;
    showKnowledgeCard();
  });

  document.getElementById("nextKnowledge").addEventListener("click", () => {
    if (currentKnowledgeIndex < currentKnowledgeArray.length - 1) currentKnowledgeIndex++;
    showKnowledgeCard();
  });

  function showKnowledgeCard() {
    const content = currentKnowledgeArray[currentKnowledgeIndex];
    document.getElementById("knowledgeContent").innerHTML = `<p>${content}</p>`;
    document.getElementById("knowledgeProgress").innerText = `${currentKnowledgeIndex + 1} / ${currentKnowledgeArray.length}`;
  }
});
