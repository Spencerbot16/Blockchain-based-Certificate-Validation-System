import { useState } from "react";
import Register from "./register";
import Issue from "./issue";
import Records from "./records";
import BackButton from "../components/BackButton";

export default function Admin() {
  const [panel, setPanel] = useState("");

  if (panel === "register") return <Register />;
  if (panel === "issue") return <Issue />;
  if (panel === "records") return <Records />;

  return (
    <div className="appPage">
      <div className="appShell">
        <div className="appHeader">
          <div>
            <div className="appTitle">Admin</div>
            <div className="appSubtitle">Manage students, certificates, and records</div>
          </div>
          
        </div>

        <div className="appCard">
          <div className="appCardBody">
            <div className="appH2">👨‍💼 Admin Panel</div>
            <div className="appP">Choose what you want to do.</div>

            <div style={{ display: "grid", gap: 10 }}>
              <button className="appButton" onClick={() => setPanel("register")}>
                Register new student
              </button>

              <button className="appButton" onClick={() => setPanel("issue")}>
                Issue certificate
              </button>

              <button className="appButton appButtonSecondary" onClick={() => setPanel("records")}>
                View all records
              </button>
            </div>

            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}