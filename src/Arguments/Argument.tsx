import { Delete, Edit, SaveAsSharp } from '@mui/icons-material'
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { createdArgumentsProps } from 'types'

interface ArgumentProps {
  updateValue: (index: number, value: boolean) => void
  onNameChange: (index: number, name: string) => void
  onDelete: (index: number) => void
  arg: createdArgumentsProps
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}))

const Argument: React.FC<ArgumentProps> = ({ updateValue, onNameChange, onDelete, arg }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [currentName, setCurrentName] = useState<string>(arg.name)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setCurrentName(event.target.value)
  }

  const handleNameSubmit = () => {
    if (currentName.length > 0) {
      setEditMode(false)
      onNameChange(arg.id, currentName)
    }
  }

  const handleValueUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(arg.id, event.target.checked)
  }

  const showArgumentName = () => {
    return (
      <TextField
        label="Argument Name"
        id="outlined-adornment-argument"
        type="text"
        size="small"
        disabled={!editMode}
        value={currentName}
        onChange={handleNameChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {editMode ? (
                <IconButton
                  disabled={currentName.length === 0}
                  aria-label="save argument name"
                  onClick={handleNameSubmit}
                  edge="end"
                >
                  <SaveAsSharp color={currentName.length === 0 ? 'error' : 'primary'} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="toggle edit mode"
                  onClick={() => setEditMode(true)}
                  onMouseDown={() => setEditMode(true)}
                  edge="end"
                >
                  <Edit color="primary" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    )
  }

  return (
    <Box flexGrow={1} display="flex" alignItems="center" justifyContent="flex-start" py={'2px'}>
      <Box alignSelf="center" mr={2}>
        {showArgumentName()}
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" mx={2}>
        <Typography fontSize="16px" fontWeight={900}>
          Value
        </Typography>
        <Stack my={'2px'} direction="row" spacing={1} alignItems="center">
          <Typography fontSize="14px">False</Typography>
          <AntSwitch
            checked={arg.value}
            onChange={handleValueUpdate}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography fontSize="14px">True</Typography>
        </Stack>
      </Box>
      <Box mx={2}>
        <IconButton
          disabled={currentName.length === 0}
          aria-label="Delete Argument"
          onClick={() => onDelete(arg.id)}
          edge="end"
        >
          <Delete sx={{ fontSize: 30 }} color="error" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Argument
