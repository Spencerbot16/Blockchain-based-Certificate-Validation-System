import { useState } from "react";
import SHA256 from "crypto-js/sha256";
import BackButton from "../components/BackButton";

export default function Verifier() {

  const [file, setFile] = useState(null);
  const [inputHash, setInputHash] = useState("");
  const [result, setResult] = useState(null);

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  // 🔹 Verify using PDF
  function verifyPDF() {
    if (!file) {
      alert("Upload PDF ❗");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const fileData = e.target.result;
      const hash = SHA256(fileData).toString();

      checkHash(hash);
    };

    reader.readAsBinaryString(file);
  }

  // 🔹 Verify using manual hash
  function verifyHash() {
    if (!inputHash) {
      alert("Enter hash ❗");
      return;
    }

    checkHash(inputHash);
  }

  // 🔹 Common check logic
  function checkHash(hash) {
    const records = JSON.parse(localStorage.getItem("certRecords")) || [];

    const found = records.find((r) => r.hash === hash);

    if (!found) {
      setResult({ valid: false });
      return;
    }

    setResult({
      valid: true,
      data: found
    });
  }

  return (
    <div className="appPage">
      <div className="appShell">
        <div className="appHeader">
          <div>
            <div className="appTitle">Verifier</div>
            <div className="appSubtitle">Verify a certificate PDF or hash</div>
          </div>
          <span className="appBadge">Verify</span>
        </div>

        <div className="appCard">
          <div className="appCardBody">
            <div className="appH2">🔍 Verify certificate</div>
            <div className="appP">This checks against records saved locally in your browser for this demo.</div>

            <div style={{ display: "grid", gap: 10 }}>
              <label className="appFieldLabel">Upload PDF</label>
              <input type="file" onChange={handleFile} className="appInput" />
              <button className="appButton" onClick={verifyPDF}>
                Verify via PDF
              </button>

              <hr className="appDivider" />

              <label className="appFieldLabel">Or enter hash</label>
              <input
                className="appInput"
                placeholder="Enter Certificate Hash"
                onChange={(e) => setInputHash(e.target.value)}
              />

              <button className="appButton appButtonSecondary" onClick={verifyHash}>
                Verify via hash
              </button>
            </div>

            {result && (
              <div className="appCard" style={{ boxShadow: "none" }}>
                <div className="appCardBody">
                  {result.valid ? (
                    <>
                      <span className="appBadge appBadgeSuccess">✅ Certificate valid</span>

                      <div className="appP">
                        <b>Name:</b> {result.data.name}
                      </div>
                      <div className="appP">
                        <b>Roll:</b> {result.data.roll}
                      </div>
                      <div className="appP">
                        <b>Department:</b> {result.data.department}
                      </div>

                      <div className="appCode">{result.data.hash}</div>

                      <a href={result.data.file} target="_blank" rel="noreferrer" className="appLink">
                        View certificate 📄
                      </a>
                    </>
                  ) : (
                    <span className="appBadge appBadgeDanger">❌ Invalid certificate</span>
                  )}
                </div>
              </div>
            )}

            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}