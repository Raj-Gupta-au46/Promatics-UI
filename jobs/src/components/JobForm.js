import React, { useState } from "react";
import axios from "axios";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    coverLetter: "",
  });
  const [skills, setSkills] = useState([""]);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillChange = (index, e) => {
    const newSkills = [...skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("skills", skills.join(",")); // Convert array to comma-separated string
    data.append("experience", formData.experience);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", resume);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/apply",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting application");
    }
  };

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Skills:</label>
          {skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e)}
                required
              />
              {index === skills.length - 1 && (
                <button type="button" onClick={addSkill}>
                  Add Skill
                </button>
              )}
            </div>
          ))}
        </div>
        <div>
          <label>Experience (comma separated):</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cover Letter:</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Resume:</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JobApplicationForm;
