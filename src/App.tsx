import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemText,
  Radio,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { BsChevronDown } from "react-icons/bs";
import "./App.css";
import { time } from "console";

const App: React.FC = () => {
  const [taskList, setTaskList] = useState([
    { taskId: 0, name: "Тестовое задание", isActive: false },
    { taskId: 1, name: "Прекрасный код", isActive: true },
    { taskId: 2, name: "Покрытие тестами", isActive: false },
  ]);

  const [visibleTaskList, setVisibleTaskList] = useState([...taskList]);

  const [inputValue, setInputValue] = useState("");

  const [uncompletedTaskNumber, setUncompletedTaskNumber] = useState(2);
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);
  const [isListHided, setIsListHided] = useState(false);
  const addTask = () => {
    const arrLengthPoint = taskList.length == 0 ? 0 : taskList.length;
    if (inputValue.trim() !== "") {
      setTaskList([
        ...taskList,
        { taskId: arrLengthPoint, name: inputValue, isActive: false },
      ]);
      setInputValue("");
      switchSelect('all')
    }
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };
  const switchSelect = (item: string) => {
    if (item === "all") {
      allListSelected();
      setIsAllSelected(true);
      setIsActiveSelected(false);
      setIsCompletedSelected(false);
    } else if (item === "active") {
      activeListSelected();
      setIsActiveSelected(true);
      setIsAllSelected(false);
      setIsCompletedSelected(false);
    } else {
      compltetedListSelected();
      setIsActiveSelected(false);
      setIsAllSelected(false);
      setIsCompletedSelected(true);
    }
  };
  useEffect(() => {
    let pointer: number = 0;
    let timedArr=[...taskList]
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isActive == false) {
        pointer++;
      }
      timedArr[i].taskId = i
    }
    
    setUncompletedTaskNumber(pointer);
   
    setVisibleTaskList([...timedArr]);
  }, [taskList]);
  useEffect(() => {
    setVisibleTaskList([...taskList]);
  }, []);
  const setActiveTask = (id: number) => {
    const timedObj = taskList[id];
    timedObj.isActive = !timedObj.isActive;
    const changeArr = [...taskList];
    changeArr[id] = timedObj;
    setTaskList(changeArr);
    switchSelect("all");
  };
  const activeListSelected = () => {
    setVisibleTaskList([...taskList].filter((item) => item.isActive == false));
  };
  const compltetedListSelected = () => {
    setVisibleTaskList([...taskList].filter((item) => item.isActive == true));
  };
  const allListSelected = () => {
    setVisibleTaskList([...taskList]);
  };
  const clearCompletedTasks = () => {
    setTaskList(taskList.filter((item) => item.isActive == false));
    switchSelect('all')
  };
  useEffect(()=>{
    const itemDocument = document.getElementById('mainList')
    if(isListHided&&itemDocument){
      setTimeout(()=>{
        itemDocument.style.height = '0px'
     
      },500)
    }else if(!isListHided&&itemDocument){
      setTimeout(()=>{
     
        itemDocument.style.height = 'fit-content'
      },80)
     
    }
    
  },[isListHided])

  return (
    <div className="App">
      <p className="main_logo">todos</p>
      <Card className="card">
        <div className="header_div">
          <BsChevronDown
            className={`${isListHided? 'svg_anim':''} svg_chevron`}
            onClick={() => setIsListHided(!isListHided)}
          />
          <Input
            className="main_input"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleEnterPress}
          ></Input>
        </div>
        <List id='mainList' className={`list_base_style ${isListHided ? "hided_list" : ""}`}>
          {visibleTaskList.length == 0 ? (
            <ListItem className="task_item">
              <ListItemText className="emptyList">Empty</ListItemText>
            </ListItem>
          ) : (
            <div>
              {visibleTaskList.map((task) => (
                <ListItem key={task.taskId} className="task_item">
                  <Checkbox
                  data-testid={`checkbox-${task.taskId}`}
                    checked={task.isActive}
                    onClick={() => setActiveTask(task.taskId)}
                  ></Checkbox>
                  <ListItemText className={task.isActive ? `completed` : ""}>
                    {task.name}
                  </ListItemText>
                </ListItem>
              ))}
            </div>
          )}
        </List>
        <div className="card_footer">
          <Typography className="info_text">{`${uncompletedTaskNumber} items left`}</Typography>
          <div className="card_footer_middle">
            <Button
              className={`button ${isAllSelected ? "button_selected" : ""}`}
              onClick={() => switchSelect("all")}
            >
              All
            </Button>
            <Button
              className={`button ${isActiveSelected ? "button_selected" : ""}`}
              onClick={() => switchSelect("active")}
            >
              Active
            </Button>
            <Button
              className={`button ${
                isCompletedSelected ? "button_selected" : ""
              }`}
              onClick={() => switchSelect("completed")}
            >
              Completed
            </Button>
          </div>

          <Button onClick={() => clearCompletedTasks()} className="button">
            Clear completed
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default App;
