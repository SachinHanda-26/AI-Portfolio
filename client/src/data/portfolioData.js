/**
 * Portfolio static data — sourced from Section 2 of the agent brief.
 * This data drives the portfolio UI sections.
 * 
 * IMPORTANT: Do not invent, alter, or supplement data beyond what is
 * in the source-of-truth (resume + PI Q&As).
 */

export const personalInfo = {
  name: 'Sachin Handa',
  tagline: 'MERN Stack + AI Developer',
  location: 'Khanna, Punjab',
  phone: '+91-7340774202',
  email: 'sachinhanda202@gmail.com',
  linkedin: 'https://linkedin.com/in/sachinhanda017',
  github: 'https://github.com/SachinHanda-26',
  // TODO: add hosted resume PDF link
  resumeLink: '#',
  // TODO: add profile photo
  photoUrl: null,
};

export const professionalSummary =
  'Software Engineering student with strong JavaScript, OOP, and data structures fundamentals. ' +
  'Experienced in developing MERN stack applications and exploring Agentic AI using LangGraph and RAG. ' +
  'Proficient with Git, RESTful APIs, and modern development workflows, with a passion for solving ' +
  'problems through structured engineering.';

export const education = [
  {
    institution: 'Chandigarh Group of Colleges, Landran',
    degree: 'Bachelor of Technology in Computer Science',
    period: '2023–Present',
    score: 'CGPA: 7.9',
  },
  {
    institution: 'Sacred Heart Convent Sr. Sec. School, Khanna',
    degree: 'Intermediate (12th)',
    period: '2023',
    score: '88.2%',
  },
  {
    institution: 'Sacred Heart Convent Sr. Sec. School, Khanna',
    degree: 'Matriculation (10th)',
    period: '2021',
    score: '80.8%',
  },
];

export const technicalSkills = {
  Languages: ['JavaScript', 'Python'],
  'AI Frameworks': ['LangChain', 'LangGraph', 'RAG', 'Hugging Face', 'Ollama', 'Groq'],
  Technologies: ['Express.js', 'React.js', 'Node.js', 'RESTful APIs', 'Redux Toolkit', 'Tailwind CSS', 'FastAPIs'],
  Databases: ['MongoDB', 'SQL'],
  'Core CS': ['Object-Oriented Programming (OOP)', 'Data Structures & Algorithms', 'Software Engineering'],
  Tools: ['Jupyter', 'VS Code', 'Git', 'GitHub', 'Postman', 'Firebase', 'Netlify', 'Render'],
};

export const softSkills = [
  'Team Leadership',
  'Management & Coordination',
  'Decision Making & Analytical Skills',
  'Speaking & Writing Skills',
];

export const projects = [
  {
    title: 'DevTinder',
    subtitle: 'Developer Networking Platform',
    stack: ['React.js', 'Express.js', 'Node.js', 'DaisyUI', 'MongoDB'],
    github: 'https://github.com/SachinHanda-26/DevTinder',
    highlights: [
      'Developed a MERN stack application for developer profile creation and networking.',
      'Built RESTful APIs for authentication, user management, and connections.',
      'Designed responsive UI using React.js, Tailwind CSS, and DaisyUI.',
      'Implemented secure JWT-based authentication and protected routes.',
      'Used MongoDB for efficient data storage and querying.',
    ],
  },
  {
    title: 'CineMind AI',
    subtitle: 'AI Movie Recommender',
    stack: ['React.js', 'Node.js', 'Gemini API', 'Tailwind CSS', 'Firebase'],
    github: 'https://github.com/SachinHanda-26/Cinemind-AI',
    highlights: [
      'Built an AI-powered movie recommendation system based on user mood and preferences.',
      'Integrated Gemini API to generate personalized movie and series suggestions.',
      'Developed responsive UI using React.js and Tailwind CSS for seamless user experience.',
      'Implemented authentication and data handling using Firebase.',
      'Designed efficient API handling for real-time recommendation generation.',
    ],
  },
  {
    title: 'SupportGenie AI',
    subtitle: 'Autonomous Customer Support Agent',
    stack: ['Python', 'Streamlit', 'LangGraph', 'LangChain', 'Groq', 'FAISS', 'Hugging Face', 'MongoDB'],
    github: 'https://github.com/SachinHanda-26/Support-Genie-AI',
    highlights: [
      'Developed an Autonomous Customer Support Agent using LangGraph and LangChain.',
      'Implemented RAG with FAISS and Hugging Face embeddings for context-aware responses.',
      'Integrated Groq LLMs with tool calling and conversational memory.',
      'Built an interactive Streamlit interface for customer support and ticket management.',
      'Designed a scalable multi-agent workflow for intelligent query handling.',
    ],
  },
];

export const workExperience = [
  {
    role: 'AWS Solutions Architecture Job Simulation',
    company: 'Forage',
    period: 'Feb 2025 – March 2025',
    highlights: [
      'Designed cloud-based solutions using AWS services focusing on scalability, performance, and cost optimization.',
      'Evaluated system requirements and implemented best practices for security, availability, and reliability.',
    ],
  },
];

export const achievements = [
  { title: 'Software Testing — NPTEL, IIT Kharagpur, Elite Badge', date: 'May 2026' },
  { title: 'Solved 150+ Problems on LeetCode', date: 'Feb 2026' },
  { title: 'Patent Filed: Smart Waste Segregation System (CBS989)', date: 'April 2026' },
  { title: 'Intercollege Winner, Smart India Hackathon (SIH)', date: 'Sep 2025' },
  { title: 'Machine & Deep Learning Algorithms: Introduction (Infosys)', date: 'Jul 2025' },
  { title: 'AWS Academy Graduate – Cloud Operations', date: 'Feb 2025' },
  { title: 'Complete Java Programming (Udemy)', date: 'Aug 2024' },
  { title: 'B.Tech Scholarship via PTU Counselling', date: 'June 2023' },
];
