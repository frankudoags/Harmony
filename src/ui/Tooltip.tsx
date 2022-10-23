import { Box} from 'grommet'

export const TipContent = ({ message }: any) => (
  <Box direction="row" align="center">
    <Box background="background" direction="row" pad="small" round="xsmall" border={{color: 'border' }}>
      <div>{message}</div>
    </Box>
  </Box>
)