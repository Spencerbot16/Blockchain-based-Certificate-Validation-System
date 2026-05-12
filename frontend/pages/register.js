import { useState } from "react";
import BackButton from "../components/BackButton";

export default function Register() {

  const [student, setStudent] = useState({
    roll: "",
    email: "",
    password: "",
    name: "",
    department: "",
    graduation: "",
    cgpa: ""
  });

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  function registerStudent() {
    if (!student.roll || !student.email || !student.name) {
      alert("Please fill required fields ❗");
      return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Registered Successfully ✅");

    setStudent({
      roll: "",
      email: "",
      password: "",
      name: "",
      department: "",
      graduation: "",
      cgpa: ""
    });
  }

  return (
    <div className="appPage">
      <div className="appShell">
        <div className="appHeader">
          <div>
            <div className="appTitle">Admin</div>
            <div className="appSubtitle">Register a new student</div>
          </div>
          <span className="appBadge">Students</span>
        </div>

        <div className="appCard">
          <div className="appCardBody">
            <div className="appH2">🎓 Register new student</div>
            

            <div style={{ display: "grid", gap: 10 }}>
              <input className="appInput" name="roll" placeholder="Roll Number" value={student.roll} onChange={handleChange} />
              <input className="appInput" name="email" placeholder="Email Address" value={student.email} onChange={handleChange} />
              <input className="appInput" name="password" placeholder="Temporary Password" value={student.password} onChange={handleChange} />

              <hr className="appDivider" />

              <input className="appInput" name="name" placeholder="Full Name" value={student.name} onChange={handleChange} />
              <input className="appInput" name="department" placeholder="Department" value={student.department} onChange={handleChange} />
              <input className="appInput" name="graduation" placeholder="Year of Graduation" value={student.graduation} onChange={handleChange} />
              <input className="appInput" name="cgpa" placeholder="CGPA / Percentage" value={student.cgpa} onChange={handleChange} />

              <button className="appButton" onClick={registerStudent}>
                Register student
              </button>
            </div>

            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}