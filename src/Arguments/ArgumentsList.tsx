import { Box } from '@mui/material'
import React from 'react'
import { createdArgumentsProps } from 'types'
import Argument from './Argument'

interface ArgumentsListProps {
  createdArguments: createdArgumentsProps[]
  setCreatedArguments: React.Dispatch<React.SetStateAction<createdArgumentsProps[]>>
}

const ArgumentsList: React.FC<ArgumentsListProps> = ({ createdArguments, setCreatedArguments }) => {
  const handleDelete = (id: number) => {
    const newArguments = createdArguments.filter((arg) => arg.id !== id)
    setCreatedArguments(newArguments)
  }

  const handleValueChange = (id: number, value: boolean) => {
    const updatedCreatedArguments = [...createdArguments]
    updatedCreatedArguments.map((arg) => (arg.id === id ? Object.assign(arg, { value }) : arg))
    setCreatedArguments(updatedCreatedArguments)
  }

  const hanldeNameChange = (id: number, name: string) => {
    const updatedCreatedArguments = [...createdArguments]
    updatedCreatedArguments.map((arg) => (arg.id === id ? Object.assign(arg, { name }) : arg))
    setCreatedArguments(updatedCreatedArguments)
  }

  return (
    <Box>
      {createdArguments.map((arg) => (
        <Box display="flex" key={arg.id}>
          <Argument
            updateValue={handleValueChange}
            onDelete={handleDelete}
            onNameChange={hanldeNameChange}
            arg={arg}
          />
        </Box>
      ))}
    </Box>
  )
}

export default ArgumentsList
