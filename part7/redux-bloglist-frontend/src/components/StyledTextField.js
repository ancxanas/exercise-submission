import styled from '@emotion/styled'
import { TextField } from '@mui/material'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#66fcf1',
  },
  '& label': {
    color: '#66fcf1',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#66fcf1',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#66fcf1',
    },
    '&:hover fieldset': {
      borderColor: '#66fcf1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#66fcf1',
    },
  },
})

export default StyledTextField
