import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

export default function Records() {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const storedRecords = JSON.parse(localStorage.getItem("certRecords")) || [];
    setRecords(storedRecords);
  }

  return (
    <div className="appPage">
      <div className="appShell">
        <div className="appHeader">
          <div>
            <div className="appTitle">Admin</div>
            <div className="appSubtitle">All issued certificate records</div>
          </div>
          <span className="appBadge">{records.length} record(s)</span>
        </div>

        <div className="appCard">
          <div className="appCardBody">
            <div className="appH2">📊 Records</div>
            <div className="appP">These records are stored locally in your browser for this demo.</div>

            {records.length === 0 ? (
              <div className="appP">No records found.</div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {records.map((r, i) => (
                  <div key={i} className="appCard" style={{ boxShadow: "none" }}>
                    <div className="appCardBody">
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        <div style={{ display: "grid", gap: 2 }}>
                          <div style={{ fontWeight: 760 }}>{r.name || "(no name)"}</div>
                          <div className="appP">
                            Roll <b>{r.roll}</b> · {r.department || "Department not set"}
                          </div>
                        </div>

                        <span className={`appBadge ${r.status === "Issued" ? "appBadgeSuccess" : ""}`}>
                          {r.status || "Unknown"}
                        </span>
                      </div>

                      <div className="appCode">{r.hash}</div>

                      <a href={r.file} target="_blank" rel="noreferrer" className="appLink">
                        View PDF 📄
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