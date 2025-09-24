import Link from "next/link";
import "./page.css";

const Home = () => {
  return (
    <main className="home-container">
      {/* Title & Mascot */}
      <div className="hero">
        <img src="/mascot.png" alt="Linkcode Mascot" className="mascot" />
        <h1 className="title">Linkcode</h1>
        <p className="subtitle">
          The free, fun, and effective way to learn to code!
        </p>
        <p className="subtext">Join over 1,00,025 coders</p>

        {/* Buttons */}
        <div className="button-group">
          <Link href="/login?role=student">
            <button className="btn student-btn">Student Login</button>
          </Link>
          <Link href="/login?role=teacher">
            <button className="btn teacher-btn">Teacher Login</button>
          </Link>
        </div>
      </div>

      {/* Tech Icons */}
      <div className="tech-icons">
        <span>🐍 Python</span>
        <span>🌐 HTML</span>
        <span>⚡ JavaScript</span>
        <span>☕ Java</span>
        <span>💻 C++</span>
        <span>🗄️ SQL</span>
      </div>
    </main>
  );
};

export default Home;
