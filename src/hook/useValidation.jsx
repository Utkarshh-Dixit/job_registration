import { useState, useEffect } from "react";

const useValidation = (values) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = () => {
      const newErrors = {};
      if (!values.fullName) newErrors.fullName = "Full Name is required";
      if (!values.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(values.email))
        newErrors.email = "Email is invalid";
      if (!values.phoneNumber)
        newErrors.phoneNumber = "Phone Number is required";
      if (values.position === "Developer" || values.position === "Designer") {
        if (!values.relevantExperience || values.relevantExperience <= 0)
          newErrors.relevantExperience =
            "Relevant Experience must be greater than 0";
      }
      if (values.position === "Designer") {
        if (!values.portfolioURL)
          newErrors.portfolioURL = "Portfolio URL is required";
        else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioURL))
          newErrors.portfolioURL = "Portfolio URL is invalid";
      }
      if (values.position === "Manager") {
        if (!values.managementExperience)
          newErrors.managementExperience = "Management Experience is required";
      }
      if (!values.additionalSkills || values.additionalSkills.length === 0)
        newErrors.additionalSkills = "At least one skill must be selected";
      if (!values.preferredInterviewTime)
        newErrors.preferredInterviewTime =
          "Preferred Interview Time is required";

      setErrors(newErrors);
    };

    validate();
  }, [values]);

  return errors;
};

export default useValidation;
