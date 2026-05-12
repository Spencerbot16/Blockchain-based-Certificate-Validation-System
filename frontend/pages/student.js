import { useState } from "react";
import BackButton from "../components/BackButton";

export default function Student() {

  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState(null);
  const [certs, setCerts] = useState([]);

  // 🔹 Login Function
  function login() {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const found = students.find(
      (s) => s.roll === roll && s.password === password
    );

    if (!found) {
      alert("Invalid credentials ❌");
      return;
    }

    setStudent(found);

    const allCerts = JSON.parse(localStorage.getItem("certRecords")) || [];
    const myCerts = allCerts.filter((c) => c.roll === roll);

    setCerts(myCerts);
  }

  // 🔹 LOGIN SCREEN
  if (!student) {
    return (
      <div className="appPage">
        <div className="appShell">
          <div className="appHeader">
            <div>
              <div className="appTitle">Student</div>
              <div className="appSubtitle">Login to view your certificates</div>
            </div>
            <span className="appBadge">Login</span>
          </div>

          <div className="appCard">
            <div className="appCardBody">
              <div className="appH2">🎓 Student login</div>
              <div className="appP">Use the roll number + password created during registration.</div>

              <div style={{ display: "grid", gap: 10 }}>
                <input className="appInput" placeholder="Roll Number" onChange={(e) => setRoll(e.target.value)} />

                <input
                  className="appInput"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="appButton" onClick={login}>
                  Login
                </button>
              </div>

              <BackButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 DASHBOARD SCREEN
  return (
    <div className="appPage">
      <div className="appShell">
        <div className="appHeader">
          <div>
            <div className="appTitle">Student</div>
            <div className="appSubtitle">Welcome, {student.name}</div>
          </div>
          <span className="appBadge">{certs.length} certificate(s)</span>
        </div>

        <div className="appCard">
          <div className="appCardBody">
            <div className="appH2">Your certificates</div>

            {certs.length === 0 ? (
              <div className="appP">No certificates issued yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {certs.map((c, i) => (
                  <div key={i} className="appCard" style={{ boxShadow: "none" }}>
                    <div className="appCardBody">
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        <div style={{ display: "grid", gap: 2 }}>
                          <div style={{ fontWeight: 760 }}>
                            Roll <b>{c.roll}</b>
                          </div>
                          <div className="appP">{c.department || "Department not set"}</div>
                        </div>
                        <span className={`appBadge ${c.status === "Issued" ? "appBadgeSuccess" : ""}`}>
                          {c.status || "Unknown"}
                        </span>
                      </div>

                      <div className="appCode">{c.hash}</div>

                      <a href={c.file} target="_blank" rel="noreferrer" className="appLink">
                        View certificate 📄
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}