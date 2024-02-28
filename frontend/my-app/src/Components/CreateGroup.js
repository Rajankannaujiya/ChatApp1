import React, {useContext} from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { myContext } from "./mainContainer";
import { toggleTheme } from "../Features/themeSlice";
import { useSelector,useDispatch } from "react-redux";

function CreateGroup() {

  const dispatch=useDispatch();
  const lightTheme=useSelector((state)=>state.themekey)
  const { refresh, setRefresh } = useContext(myContext);
  console.log("Context API : refresh : ", refresh);
  // console.log("Conversations of Sidebar : ", conversations);
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className={'Create-group' + (lightTheme ? "" : " dark")}>
        <input placeholder='Type the Group name' className='search-box '></input>
        <IconButton style={{ color: 'black', backgroundColor:'aqua'}}>
                <AddIcon/>
            </IconButton>
    </div>
  )
}

export default CreateGroup;