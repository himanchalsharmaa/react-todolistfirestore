import React,{useState} from 'react';
import {List,ListItem,ListItemText,Button} from '@material-ui/core';
import { doc, deleteDoc,updateDoc  } from "firebase/firestore";
import db from './firebase';

function Todolistitem(props) {
  var text;
  var isDone=props.taskitem.isDone;
  const [isdone, setIsdone]=useState(isDone);
  if(isdone==true){
   text = {
    color: "red",
    textDecorationLine: 'line-through'
}}
else{  text={
  color:"black"
}}

  return (
    <List>
        <ListItem>
            <ListItemText key={props.taskitem.id} onClick={()=>{
              if(isdone){setIsdone(false);updateDoc(doc(db, "TaskList", props.taskitem.id),{isDone:false})} 
              else{setIsdone(true);updateDoc(doc(db, "TaskList", props.taskitem.id),{isDone:true})};}}
              primaryTypographyProps={{style:text}} primary={props.taskitem.objective} className="eachitem" />
            <Button variant="contained" color="primary" onClick={(event) =>deleteDoc(doc(db, "TaskList", props.taskitem.id)) }>Delete</Button>
        </ListItem>
     
    </List>
  )
}

export default Todolistitem;