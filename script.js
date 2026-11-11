(function () {
  "use strict";

  /* ---------- timeline data ---------- */

  // PhD window: Aug 2026 to Feb 2031 (about 4.5 years). Months are zero-indexed.
  var PHD_START = new Date(2026, 7, 1);
  var PHD_END = new Date(2031, 1, 28);

  var PHASES = [
    {
      title: "Foundations",
      dates: "Aug 2026 to Jun 2027",
      start: new Date(2026, 7, 1),
      goals: [
        "Finish the linear algebra and linear systems courses, with every exercise done.",
        "Explain Lyapunov stability, LQR, and the Kalman filter at a whiteboard.",
        "Write Python daily, then move on to NumPy, SciPy, and plotting.",
        "Start a reinforcement learning course and build a CasADi model predictive controller (MPC) that tracks a path for a simple boat model."
      ]
    },
    {
      title: "Core research skills",
      dates: "Jul 2027 to Jun 2028",
      start: new Date(2027, 6, 1),
      goals: [
        "Take optimization, nonlinear control, and probability, and implement their main algorithms in code.",
        "Learn the theory behind MPC, dynamic programming, and input-to-state stability.",
        "Learn PyTorch and ROS 2, and run a surface vessel simulation from start to finish.",
        "Read two papers a week and keep your notes in one library."
      ]
    },
    {
      title: "Learning meets control",
      dates: "Jul 2028 to Jun 2029",
      start: new Date(2028, 6, 1),
      goals: [
        "Train reinforcement learning agents and learned dynamics models, and compare them with MPC baselines.",
        "Learn robust, adaptive, and safety-oriented control so you can say what your learned controller guarantees.",
        "Make every experiment reproducible, with code public on GitHub.",
        "Apply for research internships."
      ]
    },
    {
      title: "Consolidate and apply",
      dates: "Jul 2029 to Jun 2030",
      start: new Date(2029, 6, 1),
      goals: [
        "Track experiments properly and speed up your code.",
        "Prepare for machine learning and coding interviews.",
        "Start applications 9 to 12 months before you graduate."
      ]
    },
    {
      title: "Thesis and decisions",
      dates: "Jul 2030 to Feb 2031",
      start: new Date(2030, 6, 1),
      goals: [
        "Write the thesis in LaTeX.",
        "Choose between industry labs, postdocs, and faculty paths."
      ]
    }
  ];

  /* ---------- toolkit data ---------- */

  var SKILLS = [
    // Mathematics
    { area: "Mathematics", title: "Linear algebra (MIT 18.06)", kind: "course", year: 1, url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note: "Gilbert Strang's lectures. They pair well with the course you are taking now." },
    { area: "Mathematics", title: "Introduction to Applied Linear Algebra", kind: "book", year: 1, url: "https://web.stanford.edu/~boyd/vmls/", note: "Boyd and Vandenberghe's free book. It shows the same material through applications." },
    { area: "Mathematics", title: "Differential equations (MIT 18.03SC)", kind: "course", year: 1, url: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/", note: "Control is built on ODEs. Cover linear systems, stability, and phase planes." },
    { area: "Mathematics", title: "Convex Optimization", kind: "book", year: 1, url: "https://web.stanford.edu/~boyd/cvxbook/", note: "The standard text. Read the first four chapters before your optimization course." },
    { area: "Mathematics", title: "Probabilistic Systems Analysis (MIT 6.041)", kind: "course", year: 1, url: "https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/", note: "Probability with exercises and solutions. It prepares you for estimation and reinforcement learning." },
    { area: "Mathematics", title: "Real analysis (MIT 18.100A)", kind: "course", year: 2, url: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/", note: "Gives you the rigor to read the proofs in control and optimization papers." },
    { area: "Mathematics", title: "Matrix methods (MIT 18.065)", kind: "course", year: 2, url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/", note: "SVD, low-rank structure, and optimization in one course, with a machine learning view." },
    { area: "Mathematics", title: "Statistics 110 (Harvard)", kind: "course", year: 2, url: "https://projects.iq.harvard.edu/stat110", note: "Builds probability intuition through problems." },

    // Core theory
    { area: "Core theory", title: "Stability and Lyapunov's method", kind: "concept", year: 1, url: "https://en.wikipedia.org/wiki/Lyapunov_stability", note: "You can prove a system is stable by finding an energy-like function. Practice on a pendulum and on boat heading dynamics." },
    { area: "Core theory", title: "Controllability and observability", kind: "concept", year: 1, url: "https://en.wikipedia.org/wiki/Controllability", note: "You can say what a system can be steered to and what can be inferred from its outputs." },
    { area: "Core theory", title: "State feedback and LQR", kind: "concept", year: 1, url: "https://en.wikipedia.org/wiki/Linear%E2%80%93quadratic_regulator", note: "Derive it from the Riccati equation, then tune it on a simulated vehicle." },
    { area: "Core theory", title: "Kalman filter and LQG", kind: "concept", year: 1, url: "https://en.wikipedia.org/wiki/Kalman_filter", note: "Derive the filter, then implement it with noisy position measurements." },
    { area: "Core theory", title: "Frequency-domain tools", kind: "concept", year: 1, url: "https://en.wikipedia.org/wiki/Nyquist_stability_criterion", note: "Bode plots, Nyquist, and stability margins. They remain the working language of robust design." },
    { area: "Core theory", title: "Optimality conditions: KKT and duality", kind: "concept", year: 1, url: "https://en.wikipedia.org/wiki/Karush%E2%80%93Kuhn%E2%80%93Tucker_conditions", note: "Every MPC solver relies on these conditions." },
    { area: "Core theory", title: "Dynamic programming and the HJB equation", kind: "concept", year: 2, url: "https://en.wikipedia.org/wiki/Hamilton%E2%80%93Jacobi%E2%80%93Bellman_equation", note: "The bridge between optimal control and reinforcement learning." },
    { area: "Core theory", title: "Pontryagin's minimum principle", kind: "concept", year: 2, url: "https://en.wikipedia.org/wiki/Pontryagin%27s_maximum_principle", note: "Necessary conditions for optimal trajectories, and the basis of many trajectory optimizers." },
    { area: "Core theory", title: "MPC: recursive feasibility and stability", kind: "concept", year: 2, url: "https://en.wikipedia.org/wiki/Model_predictive_control", note: "Learn why terminal costs and constraints guarantee stability. The Rawlings, Mayne and Diehl book covers it in full." },
    { area: "Core theory", title: "Feedback linearization and backstepping", kind: "concept", year: 2, url: "https://en.wikipedia.org/wiki/Feedback_linearization", note: "Standard nonlinear design tools. Many vessel controllers use them." },
    { area: "Core theory", title: "Input-to-state stability", kind: "concept", year: 2, url: "https://en.wikipedia.org/wiki/Input-to-state_stability", note: "How bounded disturbances such as wind and current affect a closed loop." },
    { area: "Core theory", title: "Robust control: small gain and H-infinity", kind: "concept", year: 3, url: "https://en.wikipedia.org/wiki/H-infinity_methods_in_control_theory", note: "Designing for model error, which matters when a learned model is imperfect." },
    { area: "Core theory", title: "Adaptive control", kind: "concept", year: 3, url: "https://en.wikipedia.org/wiki/Adaptive_control", note: "Controllers that adjust to unknown parameters. A classical cousin of learning-based control." },
    { area: "Core theory", title: "Sliding mode control", kind: "concept", year: 3, url: "https://en.wikipedia.org/wiki/Sliding_mode_control", note: "A robust nonlinear method you will meet often in marine control papers." },
    { area: "Core theory", title: "Passivity and dissipativity", kind: "concept", year: 3, url: "https://en.wikipedia.org/wiki/Passivity_(engineering)", note: "An energy view of stability that helps when you connect many systems." },
    { area: "Core theory", title: "Control barrier functions", kind: "paper", year: 3, url: "https://arxiv.org/abs/1903.11199", note: "Ames and coauthors' overview of how to enforce safety constraints on a controller." },
    { area: "Core theory", title: "Data-driven models: DMD and Koopman", kind: "concept", year: 3, url: "https://en.wikipedia.org/wiki/Dynamic_mode_decomposition", note: "Learning linear models of nonlinear systems from data." },

    // Control tools
    { area: "Control and modelling", title: "Feedback Systems", kind: "book", year: 1, url: "https://fbswiki.org/", note: "Åström and Murray's free textbook for linear and nonlinear feedback." },
    { area: "Control and modelling", title: "Control Bootcamp (Steve Brunton)", kind: "video", year: 1, url: "https://www.youtube.com/@Eigensteve", note: "Find the Control Bootcamp playlist on this channel. Short lectures on state space, LQR, and estimation." },
    { area: "Control and modelling", title: "python-control", kind: "docs", year: 1, url: "https://python-control.readthedocs.io/", note: "Simulate and analyze linear systems in Python, similar to MATLAB's control toolbox." },
    { area: "Control and modelling", title: "CasADi", kind: "docs", year: 1, url: "https://web.casadi.org/docs/", note: "Build optimal control problems and MPC with automatic differentiation." },
    { area: "Control and modelling", title: "CVXPY", kind: "docs", year: 1, url: "https://www.cvxpy.org/", note: "Write convex problems the way you write them on paper, and solve them in Python." },
    { area: "Control and modelling", title: "Underactuated Robotics", kind: "course", year: 2, url: "https://underactuated.mit.edu/", note: "Nonlinear control and trajectory optimization, with runnable code." },
    { area: "Control and modelling", title: "Nonlinear Systems (Hassan Khalil)", kind: "book", year: 2, url: "https://www.google.com/search?q=Khalil+Nonlinear+Systems+textbook", note: "The standard nonlinear control text. Borrow it from your institute library." },
    { area: "Control and modelling", title: "Model Predictive Control: Theory, Computation, and Design", kind: "book", year: 2, url: "https://sites.engineering.ucsb.edu/~jbraw/mpc/", note: "Rawlings, Mayne, and Diehl's textbook, available free from the authors." },
    { area: "Control and modelling", title: "Kalman and Bayesian Filters in Python", kind: "book", year: 2, url: "https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python", note: "A free notebook book that teaches state estimation by building filters." },
    { area: "Control and modelling", title: "Data-Driven Science and Engineering", kind: "book", year: 2, url: "http://databookuw.com/", note: "Brunton and Kutz on system identification, DMD, and learning dynamics from data." },
    { area: "Control and modelling", title: "do-mpc", kind: "docs", year: 2, url: "https://www.do-mpc.com/", note: "A Python toolbox for MPC, built on CasADi." },
    { area: "Control and modelling", title: "YALMIP", kind: "docs", year: 2, url: "https://yalmip.github.io/", note: "Linear matrix inequalities and robust control design in MATLAB." },
    { area: "Control and modelling", title: "Thor Fossen's marine craft resources", kind: "book", year: 2, url: "https://www.fossen.biz/", note: "The author's site for the standard references on modelling ships and surface vehicles." },
    { area: "Control and modelling", title: "PySINDy", kind: "docs", year: 3, url: "https://pysindy.readthedocs.io/", note: "Discover equations of motion from measured data." },
    { area: "Control and modelling", title: "acados", kind: "docs", year: 3, url: "https://docs.acados.org/", note: "Fast MPC solvers for real-time use on hardware." },

    // Programming
    { area: "Programming", title: "The Python tutorial", kind: "docs", year: 1, url: "https://docs.python.org/3/tutorial/", note: "Read it once, start to finish, with a terminal open." },
    { area: "Programming", title: "CS50's Introduction to Programming with Python", kind: "course", year: 1, url: "https://cs50.harvard.edu/python/", note: "Problem sets that turn basic Python into working habits." },
    { area: "Programming", title: "NumPy: absolute beginners", kind: "docs", year: 1, url: "https://numpy.org/doc/stable/user/absolute_beginners.html", note: "Arrays and vectorized thinking, which every later tool builds on." },
    { area: "Programming", title: "SciPy tutorial", kind: "docs", year: 1, url: "https://docs.scipy.org/doc/scipy/tutorial/index.html", note: "Integration, optimization, and linear algebra routines." },
    { area: "Programming", title: "Matplotlib", kind: "docs", year: 1, url: "https://matplotlib.org/stable/", note: "Make every figure for your papers in code, so you can regenerate it." },
    { area: "Programming", title: "The Missing Semester of Your CS Education", kind: "course", year: 1, url: "https://missing.csail.mit.edu/", note: "Shell, editors, and version control." },
    { area: "Programming", title: "Pro Git", kind: "book", year: 1, url: "https://git-scm.com/book/en/v2", note: "Read the first three chapters. Commit your work daily." },

    // Machine learning
    { area: "Machine learning", title: "Neural Networks: Zero to Hero", kind: "video", year: 1, url: "https://karpathy.ai/zero-to-hero.html", note: "Andrej Karpathy builds neural networks from scratch, line by line." },
    { area: "Machine learning", title: "Stanford CS229", kind: "course", year: 2, url: "https://cs229.stanford.edu/", note: "The mathematical core of machine learning. Notes and problem sets are online." },
    { area: "Machine learning", title: "PyTorch tutorials", kind: "docs", year: 2, url: "https://pytorch.org/tutorials/", note: "Start with the learning basics series." },
    { area: "Machine learning", title: "JAX", kind: "docs", year: 3, url: "https://jax.readthedocs.io/", note: "Fast, differentiable numerical code. Common in current robotics and control research." },

    // Reinforcement learning
    { area: "Reinforcement learning", title: "Reinforcement Learning: An Introduction", kind: "book", year: 1, url: "http://incompleteideas.net/book/the-book-2nd.html", note: "Sutton and Barto's free book. Read parts I and II first." },
    { area: "Reinforcement learning", title: "David Silver's RL lectures", kind: "course", year: 1, url: "https://davidsilver.uk/teaching/", note: "Ten lectures that give a clear map of the field." },
    { area: "Reinforcement learning", title: "Spinning Up in Deep RL", kind: "docs", year: 1, url: "https://spinningup.openai.com/", note: "Concise explanations and readable reference implementations." },
    { area: "Reinforcement learning", title: "Berkeley CS285: Deep Reinforcement Learning", kind: "course", year: 2, url: "https://rail.eecs.berkeley.edu/deeprlcourse/", note: "The best deep RL course for researchers, including model-based methods." },
    { area: "Reinforcement learning", title: "Reinforcement Learning and Optimal Control", kind: "book", year: 2, url: "http://web.mit.edu/dimitrib/www/RLbook.html", note: "Bertsekas connects dynamic programming, MPC, and reinforcement learning in one framework." },
    { area: "Reinforcement learning", title: "Stable-Baselines3", kind: "docs", year: 2, url: "https://stable-baselines3.readthedocs.io/", note: "Reliable implementations to use as baselines in your experiments." },
    { area: "Reinforcement learning", title: "Gymnasium", kind: "docs", year: 2, url: "https://gymnasium.farama.org/", note: "The standard interface for RL environments. Wrap your own boat simulator in it." },
    { area: "Reinforcement learning", title: "Safe Learning in Robotics (survey)", kind: "paper", year: 2, url: "https://arxiv.org/abs/2108.06266", note: "Maps learning-based control and safe reinforcement learning in one survey." },

    // Robotics
    { area: "Robotics and simulation", title: "ROS 2 tutorials", kind: "docs", year: 2, url: "https://docs.ros.org/en/jazzy/Tutorials.html", note: "Nodes, topics, and launch files. Do the beginner tutorials in order." },
    { area: "Robotics and simulation", title: "Gazebo", kind: "docs", year: 2, url: "https://gazebosim.org/docs", note: "Simulate vehicles and sensors, and connect them to ROS 2." },
    { area: "Robotics and simulation", title: "Virtual RobotX (VRX)", kind: "docs", year: 2, url: "https://github.com/osrf/vrx", note: "A Gazebo simulation of surface vessels, the closest ready-made setup to your future vehicles." },
    { area: "Robotics and simulation", title: "Modern Robotics", kind: "course", year: 2, url: "https://modernrobotics.northwestern.edu/", note: "Kinematics, dynamics, and control with a free book and video lectures." },
    { area: "Robotics and simulation", title: "MuJoCo", kind: "docs", year: 3, url: "https://mujoco.readthedocs.io/", note: "A fast physics simulator widely used for learning-based control." },
    { area: "Robotics and simulation", title: "Drake", kind: "docs", year: 3, url: "https://drake.mit.edu/", note: "Simulation and optimization toolbox from the Underactuated Robotics authors." },
    { area: "Robotics and simulation", title: "ArduPilot Rover", kind: "docs", year: 3, url: "https://ardupilot.org/rover/", note: "An open-source autopilot that supports boats. Useful when you reach hardware." },
    { area: "Robotics and simulation", title: "MOOS-IvP", kind: "docs", year: 3, url: "https://oceanai.mit.edu/moos-ivp/", note: "Open-source autonomy software for marine vehicles, from MIT." },

    // Research craft
    { area: "Research habits", title: "arXiv", kind: "tool", year: 1, url: "https://arxiv.org/", note: "Where new papers appear first." },
    { area: "Research habits", title: "arXiv: systems and control feed", kind: "tool", year: 1, url: "https://arxiv.org/list/eess.SY/recent", note: "Skim the new listings every week." },
    { area: "Research habits", title: "arXiv: robotics feed", kind: "tool", year: 1, url: "https://arxiv.org/list/cs.RO/recent", note: "Where learning-based control for robots shows up first." },
    { area: "Research habits", title: "IEEE Control Systems Society", kind: "tool", year: 1, url: "https://ieeecss.org/", note: "Home of the CDC and ACC conferences and the Control Systems Letters journal. Check whether student membership is worth it." },
    { area: "Research habits", title: "Semantic Scholar", kind: "tool", year: 1, url: "https://www.semanticscholar.org/", note: "Follow citations forward and backward from any paper." },
    { area: "Research habits", title: "Zotero", kind: "tool", year: 1, url: "https://www.zotero.org/", note: "Keep every paper and note in one searchable library." },
    { area: "Research habits", title: "How to Read a Paper", kind: "article", year: 1, url: "http://ccr.sigcomm.org/online/files/p83-keshavA.pdf", note: "S. Keshav's three-pass method for reading quickly and deeply." },
    { area: "Research habits", title: "Overleaf: Learn LaTeX", kind: "docs", year: 1, url: "https://www.overleaf.com/learn", note: "Write your first paper and your thesis here." },
    { area: "Research habits", title: "How to Write a Great Research Paper", kind: "video", year: 2, url: "https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/", note: "Simon Peyton Jones on structuring a paper around one clear idea." },
    { area: "Research habits", title: "Weights & Biases docs", kind: "docs", year: 3, url: "https://docs.wandb.ai/", note: "Track experiments so you can reproduce any result." },

    // Career
    { area: "Career", title: "Google DeepMind careers", kind: "tool", year: 3, url: "https://deepmind.google/about/careers/", note: "Read current research engineer and scientist postings to see which skills they ask for." }
  ];

  /* ---------- priority tiers ---------- */

  // Essential: you cannot do this research well without it.
  // Add-on: makes you noticeably stronger. Anything not listed here.
  // Cherry on top: a bonus once the rest is solid.
  var TIERS = { essential: "Essential", addon: "Add-on", cherry: "Cherry on top" };
  var TIER_RANK = { essential: 0, addon: 1, cherry: 2 };

  var ESSENTIAL = [
    "Linear algebra (MIT 18.06)",
    "Differential equations (MIT 18.03SC)",
    "Convex Optimization",
    "Probabilistic Systems Analysis (MIT 6.041)",
    "Stability and Lyapunov's method",
    "Controllability and observability",
    "State feedback and LQR",
    "Kalman filter and LQG",
    "Optimality conditions: KKT and duality",
    "Dynamic programming and the HJB equation",
    "MPC: recursive feasibility and stability",
    "Feedback Systems",
    "CasADi",
    "Model Predictive Control: Theory, Computation, and Design",
    "Thor Fossen's marine craft resources",
    "The Python tutorial",
    "NumPy: absolute beginners",
    "SciPy tutorial",
    "Matplotlib",
    "Pro Git",
    "Neural Networks: Zero to Hero",
    "PyTorch tutorials",
    "Reinforcement Learning: An Introduction",
    "Spinning Up in Deep RL",
    "Berkeley CS285: Deep Reinforcement Learning",
    "Gymnasium",
    "ROS 2 tutorials",
    "Gazebo",
    "arXiv",
    "Zotero",
    "How to Read a Paper",
    "Overleaf: Learn LaTeX"
  ];

  var CHERRY = [
    "Statistics 110 (Harvard)",
    "Sliding mode control",
    "Passivity and dissipativity",
    "Data-driven models: DMD and Koopman",
    "Data-Driven Science and Engineering",
    "do-mpc",
    "YALMIP",
    "PySINDy",
    "Drake",
    "MOOS-IvP",
    "Google DeepMind careers"
  ];

  SKILLS.forEach(function (s) {
    s.tier = ESSENTIAL.indexOf(s.title) !== -1 ? "essential"
      : CHERRY.indexOf(s.title) !== -1 ? "cherry"
      : "addon";
  });

  var STORE_KEY = "toolkit-roadmap-done";

  /* ---------- saved progress ---------- */

  function loadDone() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveDone(d) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(d));
    } catch (e) { /* storage unavailable: progress lasts for this visit only */ }
  }

  var done = loadDone();

  /* ---------- helpers ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function pct(date) {
    var p = (date - PHD_START) / (PHD_END - PHD_START);
    return Math.max(0, Math.min(1, p)) * 100;
  }

  function skillId(s) { return s.title; }

  function months() {
    return Math.max(0, Math.round((new Date() - PHD_START) / (1000 * 60 * 60 * 24 * 30.44)));
  }

  function phdYear() {
    return Math.min(5, Math.floor(months() / 12) + 1);
  }

  /* ---------- the rail ---------- */

  function buildRail() {
    var track = document.getElementById("rail");
    var now = new Date();

    for (var y = 2027; y <= 2031; y++) {
      var tick = el("div", "rail-tick", String(y));
      tick.style.setProperty("--pos", pct(new Date(y, 0, 1)).toFixed(2));
      tick.setAttribute("aria-hidden", "true");
      track.appendChild(tick);
    }

    track.style.setProperty("--pos", pct(now).toFixed(2));

    var label = document.getElementById("today-label");
    label.textContent = now < PHD_START ? "Before you start" : "Month " + months();
  }

  /* ---------- phases ---------- */

  function currentPhaseIndex() {
    var now = new Date();
    var index = 0;
    for (var i = 0; i < PHASES.length; i++) {
      if (now >= PHASES[i].start) index = i;
    }
    return index;
  }

  function buildPhases() {
    var list = document.getElementById("phases");
    var current = currentPhaseIndex();

    PHASES.forEach(function (phase, i) {
      var item = el("li", "phase" + (i === current ? " current" : ""));
      var body = el("div");
      var head = el("div", "phase-head");

      head.appendChild(el("h3", null, phase.title));
      head.appendChild(el("span", "phase-dates", phase.dates));
      if (i === current) head.appendChild(el("span", "phase-now", "You are here"));
      body.appendChild(head);

      var ul = el("ul");
      phase.goals.forEach(function (goal) { ul.appendChild(el("li", null, goal)); });
      body.appendChild(ul);

      item.appendChild(body);
      list.appendChild(item);
    });
  }

  /* ---------- up next ---------- */

  function renderNext() {
    var list = document.getElementById("next");
    var intro = document.getElementById("next-intro");
    list.textContent = "";

    var year = phdYear();
    var pending = SKILLS.filter(function (s) { return !done[skillId(s)]; });
    var due = pending.filter(function (s) { return s.year <= year; });
    var pool = due;
    var label = "Five skills to work on in year " + year + " of your PhD, essentials first.";

    if (due.length === 0) {
      pool = pending.filter(function (s) { return s.year === year + 1; });
      label = "You have covered everything planned for year " + year + ". Here is what comes next.";
    }
    if (pool.length === 0) {
      intro.textContent = pending.length === 0
        ? "You have ticked every skill on this page."
        : "Open the toolkit below to see what is left.";
      return;
    }

    // earliest-year skills first, keeping the order of the lists below
    pool = pool.map(function (s, i) { return { s: s, i: i }; })
      .sort(function (a, b) {
        return TIER_RANK[a.s.tier] - TIER_RANK[b.s.tier] || a.s.year - b.s.year || a.i - b.i;
      })
      .slice(0, 5)
      .map(function (x) { return x.s; });

    intro.textContent = label;

    pool.forEach(function (s) {
      var li = el("li", "next-item");
      var text = el("div");
      var a = el("a", "skill-title", s.title);
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      text.appendChild(a);
      text.appendChild(el("span", "tier tier-" + s.tier, TIERS[s.tier]));
      text.appendChild(el("span", "skill-meta", s.area + ", " + s.kind));
      text.appendChild(el("p", "skill-note", s.note));

      var btn = el("button", "mark", "Mark learned");
      btn.type = "button";
      btn.addEventListener("click", function () {
        done[skillId(s)] = true;
        saveDone(done);
        renderGroups();
      });

      li.appendChild(text);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  /* ---------- toolkit ---------- */

  var areas = [];
  SKILLS.forEach(function (s) {
    if (areas.indexOf(s.area) === -1) areas.push(s.area);
  });

  var activeArea = "All";
  var activeTier = "essential"; // start with the short list; the buttons reveal the rest
  var query = "";

  function buildFilters() {
    var box = document.getElementById("filters");
    ["All"].concat(areas).forEach(function (name) {
      var b = el("button", null, name);
      b.type = "button";
      b.setAttribute("aria-pressed", name === activeArea ? "true" : "false");
      b.addEventListener("click", function () {
        activeArea = name;
        Array.prototype.forEach.call(box.children, function (child) {
          child.setAttribute("aria-pressed", child === b ? "true" : "false");
        });
        renderGroups();
      });
      box.appendChild(b);
    });

    var tierBox = document.getElementById("tier-filters");
    [["all", "Any priority"], ["essential", TIERS.essential], ["addon", TIERS.addon], ["cherry", TIERS.cherry]].forEach(function (pair) {
      var tb = el("button", null, pair[1]);
      tb.type = "button";
      tb.setAttribute("aria-pressed", pair[0] === activeTier ? "true" : "false");
      tb.addEventListener("click", function () {
        activeTier = pair[0];
        Array.prototype.forEach.call(tierBox.children, function (child) {
          child.setAttribute("aria-pressed", child === tb ? "true" : "false");
        });
        renderGroups();
      });
      tierBox.appendChild(tb);
    });

    document.getElementById("search").addEventListener("input", function (e) {
      query = e.target.value.trim().toLowerCase();
      renderGroups();
    });
  }

  function matches(s) {
    if (activeTier !== "all" && s.tier !== activeTier) return false;
    if (!query) return true;
    return (s.title + " " + s.note + " " + s.kind + " " + s.area).toLowerCase().indexOf(query) !== -1;
  }

  function renderGroups() {
    var host = document.getElementById("groups");
    host.textContent = "";
    var shown = 0;

    areas.forEach(function (area) {
      if (activeArea !== "All" && activeArea !== area) return;

      var skills = SKILLS.filter(function (s) { return s.area === area && matches(s); });
      if (skills.length === 0) return;
      shown += skills.length;

      var group = el("section", "group");

      var head = el("div", "group-head");
      head.appendChild(el("h3", null, area));
      var count = el("span", "group-count");
      count.setAttribute("data-count", area);
      head.appendChild(count);
      group.appendChild(head);

      var bar = el("div", "bar");
      var fill = el("span");
      fill.setAttribute("data-fill", area);
      bar.appendChild(fill);
      group.appendChild(bar);

      var ul = el("ul", "skills");
      skills.forEach(function (s) {
        var li = el("li", "skill" + (done[skillId(s)] ? " done" : ""));
        var box = el("input");
        box.type = "checkbox";
        box.checked = !!done[skillId(s)];
        box.setAttribute("aria-label", "Mark " + s.title + " as learned");
        box.addEventListener("change", function () {
          if (box.checked) done[skillId(s)] = true; else delete done[skillId(s)];
          li.classList.toggle("done", box.checked);
          saveDone(done);
          updateProgress();
          renderNext();
        });

        var text = el("div");
        var title = el("span", "skill-title");
        var a = el("a", null, s.title);
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        title.appendChild(a);
        text.appendChild(title);
        text.appendChild(el("span", "tier tier-" + s.tier, TIERS[s.tier]));
        text.appendChild(el("span", "skill-meta", s.kind + ", start in year " + s.year));
        text.appendChild(el("p", "skill-note", s.note));

        li.appendChild(box);
        li.appendChild(text);
        ul.appendChild(li);
      });
      group.appendChild(ul);
      host.appendChild(group);
    });

    var showing = document.getElementById("showing");
    var tierName = activeTier === "all" ? "" : " (" + TIERS[activeTier].toLowerCase() + ")";
    showing.textContent = "Showing " + shown + " of " + SKILLS.length + " skills" + tierName + "." +
      (activeTier === "essential" ? " Choose Any priority to see them all." : "");

    if (shown === 0) {
      host.appendChild(el("p", "empty", "No skills match. Clear the search box, or choose All and Any priority."));
    }

    updateProgress();
    renderNext();
  }

  function updateProgress() {
    var total = SKILLS.length;
    var finished = SKILLS.filter(function (s) { return done[skillId(s)]; }).length;

    var essentials = SKILLS.filter(function (s) { return s.tier === "essential"; });
    var essentialsDone = essentials.filter(function (s) { return done[skillId(s)]; }).length;

    document.getElementById("overall").textContent =
      essentialsDone + " of " + essentials.length + " essentials learned, " +
      finished + " of " + total + " skills overall";

    areas.forEach(function (area) {
      var skills = SKILLS.filter(function (s) { return s.area === area && matches(s); });
      var n = skills.filter(function (s) { return done[skillId(s)]; }).length;
      var count = document.querySelector('[data-count="' + area + '"]');
      var fill = document.querySelector('[data-fill="' + area + '"]');
      if (count) count.textContent = n + " of " + skills.length + " learned";
      if (fill) fill.style.width = (skills.length ? (n / skills.length) * 100 : 0) + "%";
    });
  }

  /* ---------- reset ---------- */

  document.getElementById("reset").addEventListener("click", function () {
    if (!window.confirm("Clear all ticked skills?")) return;
    done = {};
    saveDone(done);
    renderGroups();
  });

  /* ---------- start ---------- */

  buildRail();
  buildPhases();
  buildFilters();
  renderGroups();
})();