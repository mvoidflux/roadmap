/* ---------- timeline data ---------- */

// PhD window: Jul 2026 to Jun 2031 (five years). Months are zero-indexed.
var PHD_START = new Date(2026, 6, 1);
var PHD_END = new Date(2031, 5, 30);

var PHASES = [
  {
    title: "Foundations",
    dates: "Jul 2026 to Jun 2027",
    start: new Date(2026, 6, 1),
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
    dates: "Jul 2030 to Jun 2031",
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
  { area: "Mathematics", title: "Introduction to Applied Linear Algebra", kind: "book", year: 5, url: "https://web.stanford.edu/~boyd/vmls/", note: "Boyd and Vandenberghe's free book. It shows the same material through applications." },
  { area: "Mathematics", title: "Differential equations (MIT 18.03SC)", kind: "course", year: 1, url: "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/", note: "Control is built on ODEs. Cover linear systems, stability, and phase planes." },
  { area: "Mathematics", title: "Stanford EE364a: Convex Optimization I", kind: "course", year: 3, url: "https://web.stanford.edu/class/ee364a/", note: "Boyd's lectures, slides, and homework. Watch alongside the book." },
  { area: "Mathematics", title: "Convex Optimization", kind: "book", year: 1, url: "https://web.stanford.edu/~boyd/cvxbook/", note: "The standard text. Read the first four chapters before your optimization course." },
  { area: "Mathematics", title: "Probabilistic Systems Analysis (MIT 6.041)", kind: "course", year: 2, url: "https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/", note: "Probability with exercises and solutions. It prepares you for estimation and reinforcement learning." },
  { area: "Mathematics", title: "Real analysis (MIT 18.100A)", kind: "course", year: 5, url: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/", note: "Gives you the rigor to read the proofs in control and optimization papers." },
  { area: "Mathematics", title: "Matrix methods (MIT 18.065)", kind: "course", year: 5, url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/", note: "SVD, low-rank structure, and optimization in one course, with a machine learning view." },
  { area: "Mathematics", title: "Statistics 110 (Harvard)", kind: "course", year: 5, url: "https://projects.iq.harvard.edu/stat110", note: "Builds probability intuition through problems." },

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
  { area: "Core theory", title: "Linear Matrix Inequalities in System and Control Theory", kind: "book", year: 3, url: "https://web.stanford.edu/~boyd/lmibook/", note: "Boyd and coauthors' free book. It turns many robust control questions into convex problems." },
  { area: "Core theory", title: "Control barrier functions", kind: "paper", year: 3, url: "https://arxiv.org/abs/1903.11199", note: "Ames and coauthors' overview of how to enforce safety constraints on a controller." },
  { area: "Core theory", title: "Data-driven models: DMD and Koopman", kind: "concept", year: 3, url: "https://en.wikipedia.org/wiki/Dynamic_mode_decomposition", note: "Learning linear models of nonlinear systems from data." },

  // Control tools
  { area: "Control and modelling", title: "Feedback Systems", kind: "book", year: 1, url: "https://fbswiki.org/", note: "Åström and Murray's free textbook for linear and nonlinear feedback." },
  { area: "Control and modelling", title: "Control Bootcamp (Steve Brunton)", kind: "video", year: 1, url: "https://www.youtube.com/@Eigensteve", note: "Find the Control Bootcamp playlist on this channel. Short lectures on state space, LQR, and estimation." },
  { area: "Control and modelling", title: "python-control", kind: "docs", year: 1, url: "https://python-control.readthedocs.io/", note: "Simulate and analyze linear systems in Python, similar to MATLAB's control toolbox." },
  { area: "Control and modelling", title: "CasADi", kind: "docs", year: 1, url: "https://web.casadi.org/docs/", note: "Build optimal control problems and MPC with automatic differentiation." },
  { area: "Control and modelling", title: "CVXPY", kind: "docs", year: 1, url: "https://www.cvxpy.org/", note: "Write convex problems the way you write them on paper, and solve them in Python." },
  { area: "Control and modelling", title: "Underactuated Robotics", kind: "course", year: 4, url: "https://underactuated.mit.edu/", note: "Nonlinear control and trajectory optimization, with runnable code." },
  { area: "Control and modelling", title: "Nonlinear Systems (Hassan Khalil)", kind: "book", year: 2, url: "https://www.google.com/search?q=Khalil+Nonlinear+Systems+textbook", note: "The standard nonlinear control text. Borrow it from your institute library." },
  { area: "Control and modelling", title: "Model Predictive Control: Theory, Computation, and Design", kind: "book", year: 2, url: "https://sites.engineering.ucsb.edu/~jbraw/mpc/", note: "Rawlings, Mayne, and Diehl's textbook, available free from the authors." },
  { area: "Control and modelling", title: "Kalman and Bayesian Filters in Python", kind: "book", year: 4, url: "https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python", note: "A free notebook book that teaches state estimation by building filters." },
  { area: "Control and modelling", title: "Data-Driven Science and Engineering", kind: "book", year: 4, url: "http://databookuw.com/", note: "Brunton and Kutz on system identification, DMD, and learning dynamics from data." },
  { area: "Control and modelling", title: "do-mpc", kind: "docs", year: 3, url: "https://www.do-mpc.com/", note: "A Python toolbox for MPC, built on CasADi." },
  { area: "Control and modelling", title: "YALMIP", kind: "docs", year: 4, url: "https://yalmip.github.io/", note: "Linear matrix inequalities and robust control design in MATLAB." },
  { area: "Control and modelling", title: "Thor Fossen's marine craft resources", kind: "book", year: 2, url: "https://www.fossen.biz/", note: "The author's site for the standard references on modelling ships and surface vehicles." },
  { area: "Control and modelling", title: "PySINDy", kind: "docs", year: 4, url: "https://pysindy.readthedocs.io/", note: "Discover equations of motion from measured data." },
  { area: "Control and modelling", title: "acados", kind: "docs", year: 3, url: "https://docs.acados.org/", note: "Fast MPC solvers for real-time use on hardware." },

  // Programming
  { area: "Programming", title: "The Python tutorial", kind: "docs", year: 1, url: "https://docs.python.org/3/tutorial/", note: "Read it once, start to finish, with a terminal open." },
  { area: "Programming", title: "CS50's Introduction to Programming with Python", kind: "course", year: 5, url: "https://cs50.harvard.edu/python/", note: "Problem sets that turn basic Python into working habits." },
  { area: "Programming", title: "NumPy: absolute beginners", kind: "docs", year: 1, url: "https://numpy.org/doc/stable/user/absolute_beginners.html", note: "Arrays and vectorized thinking, which every later tool builds on." },
  { area: "Programming", title: "SciPy tutorial", kind: "docs", year: 1, url: "https://docs.scipy.org/doc/scipy/tutorial/index.html", note: "Integration, optimization, and linear algebra routines." },
  { area: "Programming", title: "Matplotlib", kind: "docs", year: 1, url: "https://matplotlib.org/stable/", note: "Make every figure for your papers in code, so you can regenerate it." },
  { area: "Programming", title: "The Missing Semester of Your CS Education", kind: "course", year: 1, url: "https://missing.csail.mit.edu/", note: "Shell, editors, and version control." },
  { area: "Programming", title: "pytest", kind: "docs", year: 2, url: "https://docs.pytest.org/", note: "Write small tests for your simulator and controller so a refactor cannot silently change results." },
  { area: "Programming", title: "Docker: get started", kind: "docs", year: 3, url: "https://docs.docker.com/get-started/", note: "Package your environment so a reviewer can run your experiments." },
  { area: "Programming", title: "Numba", kind: "docs", year: 4, url: "https://numba.readthedocs.io/", note: "Speed up slow Python loops after you have profiled them." },
  { area: "Programming", title: "Pro Git", kind: "book", year: 1, url: "https://git-scm.com/book/en/v2", note: "Read the first three chapters. Commit your work daily." },

  // Machine learning
  { area: "Machine learning", title: "Neural Networks: Zero to Hero", kind: "video", year: 2, url: "https://karpathy.ai/zero-to-hero.html", note: "Andrej Karpathy builds neural networks from scratch, line by line." },
  { area: "Machine learning", title: "Stanford CS229", kind: "course", year: 4, url: "https://cs229.stanford.edu/", note: "The mathematical core of machine learning. Notes and problem sets are online." },
  { area: "Machine learning", title: "PyTorch tutorials", kind: "docs", year: 2, url: "https://pytorch.org/tutorials/", note: "Start with the learning basics series." },
  { area: "Machine learning", title: "JAX", kind: "docs", year: 3, url: "https://jax.readthedocs.io/", note: "Fast, differentiable numerical code. Common in current robotics and control research." },

  // Reinforcement learning
  { area: "Reinforcement learning", title: "Reinforcement Learning: An Introduction", kind: "book", year: 1, url: "http://incompleteideas.net/book/the-book-2nd.html", note: "Sutton and Barto's free book. Read parts I and II first." },
  { area: "Reinforcement learning", title: "David Silver's RL lectures", kind: "course", year: 3, url: "https://davidsilver.uk/teaching/", note: "Ten lectures that give a clear map of the field." },
  { area: "Reinforcement learning", title: "Spinning Up in Deep RL", kind: "docs", year: 3, url: "https://spinningup.openai.com/", note: "Concise explanations and readable reference implementations." },
  { area: "Reinforcement learning", title: "Berkeley CS285: Deep Reinforcement Learning", kind: "course", year: 3, url: "https://rail.eecs.berkeley.edu/deeprlcourse/", note: "The best deep RL course for researchers, including model-based methods." },
  { area: "Reinforcement learning", title: "Reinforcement Learning and Optimal Control", kind: "book", year: 4, url: "http://web.mit.edu/dimitrib/www/RLbook.html", note: "Bertsekas connects dynamic programming, MPC, and reinforcement learning in one framework." },
  { area: "Reinforcement learning", title: "Stable-Baselines3", kind: "docs", year: 3, url: "https://stable-baselines3.readthedocs.io/", note: "Reliable implementations to use as baselines in your experiments." },
  { area: "Reinforcement learning", title: "Gymnasium", kind: "docs", year: 3, url: "https://gymnasium.farama.org/", note: "The standard interface for RL environments. Wrap your own boat simulator in it." },
  { area: "Reinforcement learning", title: "Safe Learning in Robotics (survey)", kind: "paper", year: 3, url: "https://arxiv.org/abs/2108.06266", note: "Maps learning-based control and safe reinforcement learning in one survey." },

  // Robotics
  { area: "Robotics and simulation", title: "ROS 2 tutorials", kind: "docs", year: 2, url: "https://docs.ros.org/en/jazzy/Tutorials.html", note: "Nodes, topics, and launch files. Do the beginner tutorials in order." },
  { area: "Robotics and simulation", title: "Gazebo", kind: "docs", year: 2, url: "https://gazebosim.org/docs", note: "Simulate vehicles and sensors, and connect them to ROS 2." },
  { area: "Robotics and simulation", title: "Virtual RobotX (VRX)", kind: "docs", year: 2, url: "https://github.com/osrf/vrx", note: "A Gazebo simulation of surface vessels, the closest ready-made setup to your future vehicles." },
  { area: "Robotics and simulation", title: "Modern Robotics", kind: "course", year: 4, url: "https://modernrobotics.northwestern.edu/", note: "Kinematics, dynamics, and control with a free book and video lectures." },
  { area: "Robotics and simulation", title: "MuJoCo", kind: "docs", year: 3, url: "https://mujoco.readthedocs.io/", note: "A fast physics simulator widely used for learning-based control." },
  { area: "Robotics and simulation", title: "Drake", kind: "docs", year: 4, url: "https://drake.mit.edu/", note: "Simulation and optimization toolbox from the Underactuated Robotics authors." },
  { area: "Robotics and simulation", title: "ArduPilot Rover", kind: "docs", year: 4, url: "https://ardupilot.org/rover/", note: "An open-source autopilot that supports boats. Useful when you reach hardware." },
  { area: "Robotics and simulation", title: "MOOS-IvP", kind: "docs", year: 5, url: "https://oceanai.mit.edu/moos-ivp/", note: "Open-source autonomy software for marine vehicles, from MIT." },

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
  { area: "Research habits", title: "The Illustrated Guide to a PhD", kind: "article", year: 1, url: "http://matt.might.net/articles/phd-school-in-pictures/", note: "Matt Might's five-minute picture of what a PhD contributes. Reread it each year." },
  { area: "Research habits", title: "The Turing Way", kind: "book", year: 3, url: "https://book.the-turing-way.org/", note: "A free handbook on reproducible research: code, data, and sharing." },
  { area: "Research habits", title: "Weights & Biases docs", kind: "docs", year: 4, url: "https://docs.wandb.ai/", note: "Track experiments so you can reproduce any result." },

  // Career
  { area: "Career", title: "Introduction to Machine Learning Interviews", kind: "book", year: 4, url: "https://huyenchip.com/ml-interviews-book/", note: "Chip Huyen's free guide to what ML research and engineering interviews ask." },
  { area: "Career", title: "Google DeepMind careers", kind: "tool", year: 5, url: "https://deepmind.google/about/careers/", note: "Read current research engineer and scientist postings to see which skills they ask for." }
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

/* ---------- time estimates ---------- */

// [hours to watch or read, hours to practise]. Rough guides for a PhD student working part-time.
var HOURS = {
  "Linear algebra (MIT 18.06)": [35, 60],
  "Introduction to Applied Linear Algebra": [25, 40],
  "Stanford EE364a: Convex Optimization I": [30, 50],
  "Differential equations (MIT 18.03SC)": [35, 50],
  "Convex Optimization": [30, 60],
  "Probabilistic Systems Analysis (MIT 6.041)": [35, 55],
  "Real analysis (MIT 18.100A)": [35, 70],
  "Matrix methods (MIT 18.065)": [30, 50],
  "Statistics 110 (Harvard)": [35, 50],
  "Stability and Lyapunov's method": [4, 15],
  "Controllability and observability": [3, 10],
  "State feedback and LQR": [4, 12],
  "Kalman filter and LQG": [5, 15],
  "Frequency-domain tools": [4, 12],
  "Optimality conditions: KKT and duality": [4, 10],
  "Dynamic programming and the HJB equation": [4, 12],
  "Pontryagin's minimum principle": [4, 12],
  "MPC: recursive feasibility and stability": [8, 25],
  "Feedback linearization and backstepping": [4, 12],
  "Input-to-state stability": [4, 12],
  "Robust control: small gain and H-infinity": [6, 20],
  "Adaptive control": [5, 15],
  "Sliding mode control": [4, 10],
  "Passivity and dissipativity": [4, 12],
  "Linear Matrix Inequalities in System and Control Theory": [15, 30],
  "Control barrier functions": [4, 15],
  "Data-driven models: DMD and Koopman": [4, 15],
  "Feedback Systems": [30, 50],
  "Control Bootcamp (Steve Brunton)": [8, 12],
  "python-control": [2, 6],
  "CasADi": [4, 20],
  "CVXPY": [2, 8],
  "Underactuated Robotics": [30, 50],
  "Nonlinear Systems (Hassan Khalil)": [40, 70],
  "Model Predictive Control: Theory, Computation, and Design": [30, 50],
  "Kalman and Bayesian Filters in Python": [20, 30],
  "Data-Driven Science and Engineering": [25, 40],
  "do-mpc": [2, 8],
  "YALMIP": [3, 10],
  "Thor Fossen's marine craft resources": [15, 30],
  "PySINDy": [2, 8],
  "acados": [4, 20],
  "The Python tutorial": [6, 10],
  "CS50's Introduction to Programming with Python": [15, 30],
  "NumPy: absolute beginners": [2, 6],
  "SciPy tutorial": [3, 8],
  "Matplotlib": [3, 8],
  "The Missing Semester of Your CS Education": [12, 15],
  "pytest": [2, 5],
  "Docker: get started": [3, 8],
  "Numba": [2, 8],
  "Pro Git": [4, 8],
  "Neural Networks: Zero to Hero": [15, 25],
  "Stanford CS229": [40, 70],
  "PyTorch tutorials": [6, 15],
  "JAX": [3, 12],
  "Reinforcement Learning: An Introduction": [30, 60],
  "David Silver's RL lectures": [15, 20],
  "Spinning Up in Deep RL": [6, 20],
  "Berkeley CS285: Deep Reinforcement Learning": [40, 80],
  "Reinforcement Learning and Optimal Control": [30, 50],
  "Stable-Baselines3": [2, 10],
  "Gymnasium": [2, 8],
  "Safe Learning in Robotics (survey)": [4, 6],
  "ROS 2 tutorials": [8, 20],
  "Gazebo": [4, 12],
  "Virtual RobotX (VRX)": [3, 15],
  "Modern Robotics": [30, 50],
  "MuJoCo": [3, 12],
  "Drake": [4, 15],
  "ArduPilot Rover": [3, 12],
  "MOOS-IvP": [4, 15],
  "arXiv": [1, 1],
  "arXiv: systems and control feed": [1, 1],
  "arXiv: robotics feed": [1, 1],
  "IEEE Control Systems Society": [1, 1],
  "Semantic Scholar": [1, 2],
  "Zotero": [1, 2],
  "How to Read a Paper": [1, 3],
  "Overleaf: Learn LaTeX": [3, 8],
  "The Illustrated Guide to a PhD": [0.5, 1],
  "How to Write a Great Research Paper": [1, 5],
  "The Turing Way": [6, 12],
  "Weights & Biases docs": [2, 6],
  "Introduction to Machine Learning Interviews": [6, 20],
  "Google DeepMind careers": [1, 2]
};

SKILLS.forEach(function (s) {
  s.hours = HOURS[s.title] || [0, 0];
  s.tier = ESSENTIAL.indexOf(s.title) !== -1 ? "essential"
    : CHERRY.indexOf(s.title) !== -1 ? "cherry"
    : "addon";
});