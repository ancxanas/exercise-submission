import styled from '@emotion/styled'
import { TextField } from '@mui/material'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#221266',
  },
  '& label': {
    color: '#221266',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#221266',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#221266',
    },
    '&:hover fieldset': {
      borderColor: '#221266',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#221266',
    },
  },
})

export default StyledTextField
