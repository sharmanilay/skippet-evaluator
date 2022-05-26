import { Delete } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createdArgumentsProps } from 'types'
import uniqid from 'uniqid'

type childrenResultsProps = {
  id: string
  value: boolean | undefined
}

const constantOperators = ['undefined', 'or', 'nor', 'and', 'nand', 'not', 'constant']

/**
 * def: This component is being used recursively to create the tree structure of the arguments/operators
 *
 * @param id: unique id for each node, used to delete the node if action is allowed
 * @param updateParentResult: this updates the result of the logical equation for the node and its children being set in the parent array
 * @param createdArguments: array of custom arguments created by the user
 *
 */
const EvaluatorUnit: React.FC<{
  id: string
  createdArguments: createdArgumentsProps[]
  updateParentResult: (id: string, value: boolean | undefined) => void
}> = ({ id, createdArguments, updateParentResult }) => {
  const [selectedOperator, setSelectedOperator] = useState<string>('undefined')
  const [childrenResults, setChildrenResults] = useState<childrenResultsProps[]>([])
  const dropdownList: string[] = [...constantOperators, ...createdArguments.map((arg) => arg.name)]
  const [constantValue, setContantValue] = useState<boolean>(false)

  /**
   * Function to populate number of children(and results) on the basis of
   * selected operator at the current level
   */
  useEffect(() => {
    if (
      selectedOperator === 'and' ||
      selectedOperator === 'or' ||
      selectedOperator === 'nand' ||
      selectedOperator === 'nor'
    ) {
      setChildrenResults([
        {
          id: uniqid(),
          value: undefined,
        },
        {
          id: uniqid(),
          value: undefined,
        },
      ])
    } else if (selectedOperator === 'not') {
      setChildrenResults([
        {
          id: uniqid(),
          value: undefined,
        },
      ])
    } else {
      setChildrenResults([])
    }
  }, [selectedOperator])

  /**
   *
   */
  useEffect(() => {
    let value: boolean | undefined
    switch (selectedOperator) {
      case 'and':
        childrenResults.forEach((child, i) => {
          if (i === 0) {
            value = child.value
          } else {
            value = value && child.value
          }
        })
        updateParentResult(id, value)
        break
      case 'or':
        childrenResults.forEach((child, i) => {
          if (i === 0) {
            value = child.value
          } else {
            value = value || child.value
          }
        })
        updateParentResult(id, value)
        break
      case 'nor':
        childrenResults.forEach((child, i) => {
          if (i === 0) {
            value = child.value
          } else {
            value = value || child.value
          }
        })
        updateParentResult(id, !value)
        break
      case 'nand':
        childrenResults.forEach((child, i) => {
          if (i === 0) {
            value = child.value
          } else {
            value = value && child.value
          }
        })
        updateParentResult(id, !value)
        break
      case 'not':
        updateParentResult(id, childrenResults[0] ? !childrenResults[0].value : undefined)
        break
      case 'constant':
        updateParentResult(id, constantValue)
        break
      case 'undefined':
        updateParentResult(id, undefined)
        break
      default:
        value = createdArguments.find((arg) => arg.name === selectedOperator)?.value
        updateParentResult(id, value)
    }
    /**
     * ideally all the variables used should be set in the dependency array but
     * this is special case as when selected operator is changed it changes the dom
     * so it could lead to infinite loop in this case. We already have another useEffect with selectedOperator
     * as dependency which updates the render tree so there will not be consistency issues with updates on selectedOperator
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, constantValue, createdArguments, childrenResults])

  const handleChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    setSelectedOperator(event.target.value)
  }

  const handleConstantChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    if (event.target.value === 'True') {
      setContantValue(true)
    } else {
      setContantValue(false)
    }
  }

  const onDeleteOp = (id: string) => {
    const newChildrenResults = childrenResults.filter((child) => child.id !== id)
    setChildrenResults(newChildrenResults)
  }

  const handleAddChildren = () => {
    setChildrenResults([...childrenResults, { id: uniqid(), value: undefined }])
  }

  const updateChildrenResult = (id: string, value: boolean | undefined) => {
    const newChildrenResults = [...childrenResults]
    newChildrenResults.map((child) => (child.id === id ? Object.assign(child, { value }) : child))
    setChildrenResults(newChildrenResults)
  }

  /**
   * function to render children nodes of EvaluatorUnit component if selectedOperator an operator which needs
   * arguments to compute value
   */
  const renderChildren = () => {
    if (
      selectedOperator === 'and' ||
      selectedOperator === 'or' ||
      selectedOperator === 'xor' ||
      selectedOperator === 'not' ||
      selectedOperator === 'nand' ||
      selectedOperator === 'nor'
    ) {
      return (
        <Box mt={1} pl={1} display="flex" flexDirection="column">
          {childrenResults.map((child, index) => (
            <Box key={child.id} display="flex" alignItems="center">
              <EvaluatorUnit
                id={child.id}
                updateParentResult={updateChildrenResult}
                createdArguments={createdArguments}
              />
              {index > 1 ? (
                <Box>
                  <IconButton
                    aria-label="Delete Op"
                    onClick={() => onDeleteOp(child.id)}
                    edge="end"
                  >
                    <Delete sx={{ fontSize: 30 }} color="error" />
                  </IconButton>
                </Box>
              ) : null}
            </Box>
          ))}
          {selectedOperator !== 'not' ? (
            <Button
              sx={{ mb: 2 }}
              size="small"
              variant="outlined"
              color="success"
              onClick={handleAddChildren}
            >
              Add Op
            </Button>
          ) : null}
        </Box>
      )
    } else if (selectedOperator === 'constant') {
      return (
        <Box mx={2} display="flex" flexDirection="column">
          <FormControl>
            <InputLabel id="constant-value-select-label">Value</InputLabel>
            <Select
              label="Value"
              id="constant-value-select"
              value={constantValue ? 'True' : 'False'}
              onChange={handleConstantChange}
              size="small"
            >
              <MenuItem value="True">True</MenuItem>
              <MenuItem value="False">False</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )
    }
  }

  return (
    <Box
      sx={
        selectedOperator === 'constant'
          ? {
              display: 'flex',
            }
          : {}
      }
      my={1}
    >
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOperator}
          size="small"
          onChange={handleChange}
        >
          {dropdownList.map((operator, index) => (
            <MenuItem key={index} value={operator}>
              {operator}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {renderChildren()}
    </Box>
  )
}

export default EvaluatorUnit
