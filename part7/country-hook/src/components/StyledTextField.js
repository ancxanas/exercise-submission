import styled from '@emotion/styled'
import { TextField } from '@mui/material'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#000000',
  },
  '& label': {
    color: '#000000',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#000000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000000',
    },
    '&:hover fieldset': {
      borderColor: '#000000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
    },
  },
})

export default StyledTextField
