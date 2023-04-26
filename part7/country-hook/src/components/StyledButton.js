import { styled } from '@mui/material/styles'
import { Button } from '@mui/material/'

const StyledButton = styled(Button)({
  borderColor: '#000000',
  color: '#000000',
  '&:hover': {
    borderColor: '#000000',
    boxShadow: 'none',
  },
})

export default StyledButton
