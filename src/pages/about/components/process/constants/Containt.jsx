/* eslint-disable react/jsx-key */

const containt = [
  {
    smallTitle: 'Workflow',
    bigTitle: 'Project Development Workflow',
    desc: [
      <div className="p-l">
        How I approach building academic coursework and real applications —
      </div>,
      <div className="p-l">
        from understanding requirements and schema planning to clean,
      </div>,
      <div className="p-l">
        testable, and maintainable implementation.
      </div>,
    ],
    descMobile: [
      <div className="p-l">
        How I approach building coursework and real applications —
      </div>,
      <div className="p-l">
        from requirements and schema planning to clean, testable code.
      </div>,
    ],
    options: [
      {
        title: 'Requirement Understanding',
        desc: 'Analyzing user stories, project scope, acceptance criteria, and edge cases before writing code',
      },
      {
        title: 'Schema & Architecture Planning',
        desc: 'Designing ER diagrams, database normalization (3NF), and REST API route blueprints',
      },
      {
        title: 'Modular Component Construction',
        desc: 'Writing clean, reusable UI components and modular backend controllers following separation of concerns',
      },
      {
        title: 'Git Version Control',
        desc: 'Maintaining clean git history with feature branches, atomic commits, and clear pull request summaries',
      },
      {
        title: 'Testing & Verification',
        desc: 'Validating API endpoints with Postman, debugging edge cases, and checking responsive layouts across viewports',
      },
      {
        title: 'Deployment & Documentation',
        desc: 'Deploying preview builds on Vercel/Render and writing clear README setup instructions',
      },
    ],
  },
  {
    smallTitle: 'Mindset',
    bigTitle: 'Internship Mindset & Teamwork',
    desc: [
      <div className="p-l">
        My principles as an intern joining an engineering team — eager to learn,
      </div>,
      <div className="p-l">
        receptive to code reviews, proactive in communication, and committed
      </div>,
      <div className="p-l">
        to team productivity.
      </div>,
    ],
    descMobile: [
      <div className="p-l">
        My principles as an intern joining an engineering team — eager to learn,
      </div>,
      <div className="p-l">
        receptive to code reviews, and proactive in communication.
      </div>,
    ],
    options: [
      {
        title: 'Eagerness to Learn',
        desc: 'Asking thoughtful questions, diving deep into technical documentation, and rapidly adopting team conventions',
      },
      {
        title: 'Receptive to Code Reviews',
        desc: 'Welcoming PR feedback with an open mind to accelerate code quality, conventions, and engineering maturity',
      },
      {
        title: 'Active Communication',
        desc: 'Providing transparent daily progress updates, raising blockers promptly, and participating in standups',
      },
      {
        title: 'Disciplined Problem Solving',
        desc: 'Methodically inspecting logs, reproducing bugs, and researching solutions thoroughly before escalating',
      },
      {
        title: 'Team Player Attitude',
        desc: 'Supporting teammates and collaborating effectively (practiced as Greenwich IT Club leader)',
      },
      {
        title: 'Continuous Self-Study',
        desc: 'Keeping technical curiosity alive by exploring modern developer tooling, libraries, and open-source code',
      },
    ],
  },
];

export default containt;
