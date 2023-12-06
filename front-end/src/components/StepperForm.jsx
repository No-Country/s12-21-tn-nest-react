import React from 'react';
import Submit from './Submit';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SignUp from '../SignUp/SignUp'; 
import MentorForm from './MentorForm';
import StudentForm from './StudentForm';
import Mentorship from './Mentorship';
import { useState } from "react";

const steps = ['SignUp', 'MentorForm', 'Mentorship']; 

const StepperForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [userTypeSelection, setUserTypeSelection] = React.useState(null);
  const [user, setUser] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [mentorship, setMentorship] = useState(null);


  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      console.log("presubmit");
      console.log(user);

      try {
        await Submit(user, mentor, mentorship);
        console.log("postsubmit");
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUserTypeSelection = (selectedType) => {
    setUserTypeSelection(selectedType);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <SignUp onUserTypeSelection={handleUserTypeSelection} user={user}/>;
      case 1:
        return userTypeSelection === 'mentor' ? <MentorForm mentor={mentor}/> : <StudentForm />;
      case 2:
        return <Mentorship mentorship={mentorship}/>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                sx={{
                  fontSize: '2rem',
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography
        variant="h4" 
        sx={{ mt: 2, mb: 1 }}
      >
        Step {activeStep + 1}
      </Typography>
      {renderStepContent(activeStep)}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />

        <Button onClick={activeStep === steps.length - 1 ? handleNext : handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>


      </Box>
    </Box>
  );
};

export default StepperForm;