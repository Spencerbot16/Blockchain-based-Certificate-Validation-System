import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config";
import SHA256 from "crypto-js/sha256";
import BackButton from "../components/BackButton";

const ABI = [
  "function listingPrice() view returns (uint256)",
  "function createToken(string memory tokenURI, uint256 price) payable"
];

export default function Issue() {

  const [student, setStudent] = useState({
    roll: "",
    email: "",
    name: "",
    department: "",
    graduation: "",
    cgpa: ""
  });

  const [file, setFile] = useState(null);

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function issueCertificate() {
    try {
      if (!student.roll || !student.email || !student.name) {
        alert("Please fill required fields ❗");
        return;
      }

      if (!file) {
        alert("Please upload PDF ❗");
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileData = e.target.result;

        const hash = SHA256(fileData).toString();

        console.log("Generated Hash:", hash);

        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
        const signer = provider.getSigner(0);

        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const listingPrice = await contract.listingPrice();

        const tx = await contract.createToken(
          hash,
          ethers.utils.parseEther("0.1"),
          { value: listingPrice }
        );

        await tx.wait();

        const reader2 = new FileReader();

        reader2.onload = () => {
          const base64File = reader2.result;

          let records = JSON.parse(localStorage.getItem("certRecords")) || [];

          records.push({
            ...student,
            hash: hash,
            file: base64File,
            status: "Issued"
          });

          localStorage.setItem("certRecords", JSON.stringify(records));

          alert("Certificate Issued Successfully 🎓");
        };

        reader2.readAsDataURL(file);

        // Clear form
        setStudent({
          roll: "",
          email: "",
          name: "",
          department: "",
          graduation: "",
          cgpa: ""
        });

        setFile(null);
      };

      reader.readAsBinaryString(file);

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="appPage">
      <div className="appShell">
        <div className="appHeader">
          <div>
            <div className="appTitle">Admin</div>
            <div className="appSubtitle">Issue a certificate </div>
          </div>
          
        </div>

        <div className="appCard">
          <div className="appCardBody">
            <div className="appH2">📄 Issue certificate</div>
            

            <div style={{ display: "grid", gap: 10 }}>
              <input className="appInput" name="roll" placeholder="Roll Number" onChange={handleChange} value={student.roll} />
              <input className="appInput" name="email" placeholder="Email Address" onChange={handleChange} value={student.email} />
              <input className="appInput" name="name" placeholder="Full Name" onChange={handleChange} value={student.name} />

              <hr className="appDivider" />

              <input className="appInput" name="department" placeholder="Department" onChange={handleChange} value={student.department} />
              <input className="appInput" name="graduation" placeholder="Year of Graduation" onChange={handleChange} value={student.graduation} />
              <input className="appInput" name="cgpa" placeholder="CGPA / Percentage" onChange={handleChange} value={student.cgpa} />

              <label className="appFieldLabel">Certificate PDF</label>
              <input className="appInput" type="file" onChange={handleFile} />

              <button className="appButton" onClick={issueCertificate}>
                Issue certificate
              </button>
            </div>

            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}