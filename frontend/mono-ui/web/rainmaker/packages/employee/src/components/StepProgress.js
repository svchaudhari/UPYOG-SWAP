import React from 'react';
import './StepProgress.css';

const StepProgress = ({ activeStep, stepName }) => {
  return (
    <div className="step-progress">
      <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
        <div className="step-number">1</div>
        <div className="step-label">{stepName}</div>
      </div>
      <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
        <div className="step-number">2</div>
        <div className="step-label">Documents</div>
      </div>
      <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
        <div className="step-number">3</div>
        <div className="step-label">Preview</div>
      </div>
      <div className={`step ${activeStep >= 4 ? 'active' : ''}`}>
        <div className="step-number">4</div>
        <div className="step-label">Payment</div>
      </div>
    </div>
  );
};

export default StepProgress;