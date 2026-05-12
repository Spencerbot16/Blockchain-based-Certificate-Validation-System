import { useState } from "react";
import Admin from "./admin";
import Verifier from "./verifier";
import Student from "./student";

export default function Home() {
  const [page, setPage] = useState("");

  if (page === "admin") return <Admin />;
  if (page === "verifier") return <Verifier />;
  if (page === "student") return <Student />;

  return (
    <div className="appPage">
      <div className="appShell">
        <div className="appHeader">
          <div className="appBrand">
            <div>
              <div className="appTitle">Blockchain Certificate Verification System</div>
              <div className="appSubtitle">Issue and verify certificates with hashes</div>
            </div>
          </div>
          
        </div>

        <div className="appCard">
          <div className="appCardBody">
            <div style={{ display: "grid", gap: 6 }}>
              <div className="appH2">Choose a role</div>
              <div className="appP">
              </div>
            </div>

            <div className="appGrid3">
              <div className="appChoice" onClick={() => setPage("admin")} role="button" tabIndex={0}>
                <h3>👨‍💼 Admin</h3>
                <p>Register students, issue certificates, and view records</p>
              </div>

              <div className="appChoice" onClick={() => setPage("verifier")} role="button" tabIndex={0}>
                <h3>🔍 Verifier</h3>
                <p>Verify certificates by PDF upload or hash</p>
              </div>

              <div className="appChoice" onClick={() => setPage("student")} role="button" tabIndex={0}>
                <h3>🎓 Student</h3>
                <p>Login and view issued certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}