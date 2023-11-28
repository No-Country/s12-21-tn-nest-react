import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SignUp from '../SignUp/SignUp'; 
import MentorForm from './MentorForm';
import StudentForm from './StudentForm';
import Category from './Category';

const steps = ['SignUp', 'MentorForm', 'Category']; 

const StepperForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [userTypeSelection, setUserTypeSelection] = React.useState(null);

  const isStepOptional = (step) => {
    return false; // No step is optional
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleUserTypeSelection = (selectedType) => {
    setUserTypeSelection(selectedType);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <SignUp onUserTypeSelection={handleUserTypeSelection} />;
      case 1:
        return userTypeSelection === 'mentor' ? <MentorForm /> : <StudentForm />;
      case 2:
        return <Category />;
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
        {isStepOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )}

        <Button onClick={activeStep === steps.length - 1 ? null : handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default StepperForm;