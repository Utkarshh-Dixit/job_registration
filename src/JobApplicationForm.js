import React, { useState } from "react";
import useValidation from "./hook/useValidation";

const JobApplicationForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  });

  const errors = useValidation(formValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues((prevValues) => ({
        ...prevValues,
        additionalSkills: checked
          ? [...prevValues.additionalSkills, value]
          : prevValues.additionalSkills.filter((skill) => skill !== value),
      }));
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      alert(`Form submitted:\n${JSON.stringify(formValues, null, 2)}`);
    } else {
      alert("Please fix the errors before submitting");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
        </label>
        {errors.fullName && <span>{errors.fullName}</span>}
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
        </label>
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      </div>
      <div>
        <label>
          Applying for Position:
          <select
            name="position"
            value={formValues.position}
            onChange={handleChange}
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </label>
      </div>
      {(formValues.position === "Developer" ||
        formValues.position === "Designer") && (
        <div>
          <label>
            Relevant Experience (Years):
            <input
              type="number"
              name="relevantExperience"
              value={formValues.relevantExperience}
              onChange={handleChange}
            />
          </label>
          {errors.relevantExperience && (
            <span>{errors.relevantExperience}</span>
          )}
        </div>
      )}
      {formValues.position === "Designer" && (
        <div>
          <label>
            Portfolio URL:
            <input
              type="text"
              name="portfolioURL"
              value={formValues.portfolioURL}
              onChange={handleChange}
            />
          </label>
          {errors.portfolioURL && <span>{errors.portfolioURL}</span>}
        </div>
      )}
      {formValues.position === "Manager" && (
        <div>
          <label>
            Management Experience:
            <input
              type="text"
              name="managementExperience"
              value={formValues.managementExperience}
              onChange={handleChange}
            />
          </label>
          {errors.managementExperience && (
            <span>{errors.managementExperience}</span>
          )}
        </div>
      )}
      <div>
        <label>Additional Skills:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="JavaScript"
              onChange={handleChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="CSS"
              onChange={handleChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="Python"
              onChange={handleChange}
            />
            Python
          </label>
        </div>
        {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
      </div>
      <div>
        <label>
          Preferred Interview Time:
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={formValues.preferredInterviewTime}
            onChange={handleChange}
          />
        </label>
        {errors.preferredInterviewTime && (
          <span>{errors.preferredInterviewTime}</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
