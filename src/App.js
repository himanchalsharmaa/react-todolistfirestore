import React,{useState,useEffect} from 'react';
import {Button,Input,InputLabel,FormControl} from '@material-ui/core'
import {List,ListItem,ListItemText} from '@material-ui/core';
import './App.css';
import Todolistitem from './Todolistitem';
import db from './firebase';
import {addDoc,onSnapshot,query,collection,serverTimestamp,orderBy } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

//var cou=0;

function App(){
  const [todolist, setTodoslists]=useState([]);
  const [completedlist, setCompletedlist]=useState([]);
  const [taskinput,setInput]=useState('');
  const [isenough, setIsenough]=useState(true);
  
  useEffect(()=>{
    const q = query(collection(db, "TaskList"),orderBy("timestamp","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    setTodoslists(
      querySnapshot.docs.map(doc => ({id:doc.id,
          objective:doc.data().objective,
          isDone:doc.data().isDone
        })
          ))
    });
  },[]);

  const addtolist=(event)=>{
   //  event.preventDefault();
   // cou=cou+1;
   
   try {
    const docRef = addDoc(collection(db,"TaskList"), {
      objective:taskinput,
      timestamp:serverTimestamp(),
      isDone:false
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
    setInput(''); 
  }
  const showwarning=(event)=>{
    event.preventDefault();
    if(taskinput.length>5){
      addtolist();
    }
    else{
      setIsenough(false);
    
    }
  }
  const text = {
    color: "blue"
};
const filtercomplete=(event)=>{
  todolist.map(item=>{
    const newList = todolist.filter((item) => item.isDone !== false);
    setCompletedlist(newList);
  })

}

  return(
  <div className="App" >
    <br/><br/>
    <h1>To-Do Task List</h1>
    <br/> 
    <form>
    <FormControl>
      <InputLabel>Write A task.. </InputLabel>
      <Input value={taskinput} onChange={event=>{
        setInput(event.target.value);
        if(event.target.value.length>5){
          setIsenough(true);}}}/>
    </FormControl>
    <Button disabled={!taskinput} variant="contained" color="secondary" type="submit" onClick={showwarning}> Add to do</Button>
    </form>
    {isenough?null:
    <List>
    <ListItem>
        <ListItemText primaryTypographyProps={{ style: text }} primary="Task length has to be more than 5 characters" className="eachitem" />
    </ListItem>
    </List>}
    <br/>
    <br/>
      <Container>
        <Row>
          <Col>
    
      <h3>To-do tasks:</h3>
      <ul>
      {todolist.map(taskitem=>(
        <Todolistitem key={taskitem.id} taskitem={taskitem}/>
      ))}
      </ul>
      </Col>

    
    <Col>
      <h3>Completed tasks:</h3>
      <ul>
      {completedlist.map(taskitem=>(
        <List>
          <ListItem>
            <ListItemText key={taskitem.id} primary={taskitem.objective} className="eachitem" />
          </ListItem>
        </List>
      ))}
      </ul>
      </Col>
    </Row>
    </Container>
    <br/>
    <Button variant="contained" color="secondary" type="submit" onClick={filtercomplete}> Filter Completed Tasks</Button>
  </div>);
}
export default App;