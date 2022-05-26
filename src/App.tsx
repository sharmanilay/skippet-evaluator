import { useState } from 'react'
import { Box, Button, Grid, Typography, Card } from '@mui/material'
import Header from 'Header'
import ArgumentsList from 'Arguments/ArgumentsList'
import EvaluatorUnit from 'Evaluator/EvaluatorUnit'
import { createdArgumentsProps } from 'types'

function App() {
  const [createdArguments, setCreatedArguments] = useState<createdArgumentsProps[]>([
    { id: 1, name: 'arg 1', value: false },
  ])
  const [result, setResult] = useState<boolean | undefined>(false)
  const [lastArgId, setLastArgId] = useState(1)

  // Function to add custom arguments
  const addArgument = () => {
    const newArgument = {
      id: lastArgId + 1,
      name: `arg ${lastArgId + 1}`,
      value: false,
    }
    setCreatedArguments([...createdArguments, newArgument])
    setLastArgId(lastArgId + 1)
  }

  // Function to update final result from the root evaluator
  const updateResult = (id: string, value: boolean | undefined) => {
    setResult(value)
  }

  return (
    <Box className="App">
      <Header />
      <Box pt={3} pb={1} px={3}>
        <Typography color="#606060" fontWeight={900} variant="h4">
          Logical Operator Playground
        </Typography>
      </Box>
      <Grid container>
        <Grid p={3} item xs={12} md={6}>
          <Card
            sx={{
              border: '1px solid #e0e0e0',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              height: '400px',
              overflowY: 'scroll',
            }}
          >
            <Box pt={1} pb={1} px={3}>
              <Typography color="#606060" fontWeight={900} variant="h6">
                Create custom arguments
              </Typography>
            </Box>
            <Box px={4} my={2}>
              <Button
                sx={{ mb: 2 }}
                size="small"
                variant="outlined"
                color="success"
                onClick={addArgument}
              >
                Add Argument
              </Button>
              {createdArguments.length ? (
                <ArgumentsList
                  setCreatedArguments={setCreatedArguments}
                  createdArguments={createdArguments}
                />
              ) : null}
            </Box>
          </Card>
          <Box py={1} px={3}>
            <Typography color="#606060" fontWeight={900} variant="h6">
              Result
            </Typography>
            <Typography
              color={result === undefined ? '#ff9800' : result ? '#4caf50' : '#ef5350'}
              fontWeight={900}
              variant="h5"
            >
              {result === undefined ? 'Undefined' : result ? 'True' : 'False'}
            </Typography>
          </Box>
        </Grid>
        <Grid p={3} pl={1} item xs={12} md={6}>
          <Card
            sx={{
              border: '1px solid #e0e0e0',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              minHeight: '400px',
            }}
          >
            <Box px={4} my={2}>
              <Box py={1}>
                <Typography color="#606060" fontWeight={900} variant="h6">
                  Create an Expression
                </Typography>
              </Box>
              <Box mt={3}>
                <EvaluatorUnit
                  id="root-op"
                  updateParentResult={updateResult}
                  createdArguments={createdArguments}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
