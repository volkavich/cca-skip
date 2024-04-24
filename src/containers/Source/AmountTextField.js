import * as React from 'react';
import TextField from '@mui/material/TextField';

const AmountTextField = () => {
  return (
    <TextField
      id='standard-number'
      label='Number'
      type='number'
      InputLabelProps={{
        shrink: true,
      }}
      variant='standard'
    />
  );
};

export default AmountTextField;
