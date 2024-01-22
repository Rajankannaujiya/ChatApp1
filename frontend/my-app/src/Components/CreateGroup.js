import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CreateGroup() {
  return (
    <div className='Create-group'>
        <input placeholder='Type the Group name' className='search-box '></input>
        <IconButton style={{ color: 'black', backgroundColor:'aqua'}}>
                <AddIcon/>
            </IconButton>
    </div>
  )
}

export default CreateGroup;