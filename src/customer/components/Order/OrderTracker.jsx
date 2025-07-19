import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const allSteps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
  "Return Initiate",
  "Returned"
];

const OrderTracker = ({ activeStep }) => {
  // Conditionally slice steps based on current progress
  let steps = [...allSteps];

  // Only include return steps if we're at or beyond "Return Initiate" (index 5)
  if (activeStep < 5) {
    steps = allSteps.slice(0, 5); // Up to "Delivered"
  } else if (activeStep === 5) {
    steps = allSteps.slice(0, 6); // Include "Return Initiate"
  } // If activeStep is 6 or more, show all

  return (
    <div className='w-full'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: '#9155fd', fontSize: '44px' }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
