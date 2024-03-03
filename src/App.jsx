import { useState } from 'react';
import viteLogo from './assets/vite.svg';
import reactLogo from '/react.svg';
import './App.css';

function App() {
  const [addTaskWindow, setAddTaskWindow] = useState(false);
  const [id, setId] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [columnOneList, setColumnOneList] = useState([]);
  const [columnTwoList, setColumnTwoList] = useState([]);
  const [columnThreeList, setColumnThreeList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchColumnOneList, setSearchColumnOneList] = useState([]);
  const [searchColumnTwoList, setSearchColumnTwoList] = useState([]);
  const [searchColumnThreeList, setSearchColumnThreeList] = useState([]);
  const [showColumnOneMobile, setShowColumnOneMobile] = useState(true);
  const [showColumnTwoMobile, setShowColumnTwoMobile] = useState(true);
  const [showColumnThreeMobile, setShowColumnThreeMobile] = useState(true);

  const showColumnOneList = searchVal === "" ? columnOneList : searchColumnOneList;
  const showColumnTwoList = searchVal === "" ? columnTwoList : searchColumnTwoList;
  const showColumnThreeList = searchVal === "" ? columnThreeList : searchColumnThreeList;

  const [columnOneTaskOptions, setColumnOneTaskOptions] = useState(
    showColumnOneList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnTwoTaskOptions, setColumnTwoTaskOptions] = useState(
    showColumnTwoList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnThreeTaskOptions, setColumnThreeTaskOptions] = useState(
    showColumnThreeList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnOneStatusOptions, setColumnOneStatusOptions] = useState(
    showColumnOneList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnTwoStatusOptions, setColumnTwoStatusOptions] = useState(
    showColumnTwoList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnThreeStatusOptions, setColumnThreeStatusOptions] = useState(
    showColumnThreeList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnOneEditTaskWindow, setColumnOneEditTaskWindow] = useState(
    showColumnOneList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnTwoEditTaskWindow, setColumnTwoEditTaskWindow] = useState(
    showColumnTwoList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [columnThreeEditTaskWindow, setColumnThreeEditTaskWindow] = useState(
    showColumnThreeList.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  
  const handleAddTask = (event) => {
    event.preventDefault();
    if (!taskName.trim() || !description.trim() || !dueDate.trim()) return;
    let status = "Yet to Start";
    const date = new Date(dueDate).toLocaleString('default', {month: 'short', day: 'numeric', year: 'numeric'});
    const newTaskObject = {id, taskName, description, date, priority, status};
    setColumnOneList([...columnOneList, newTaskObject]);
    setId(id + 1);
    setTaskName("");
    setDescription("");
    setAddTaskWindow(false);
    document.body.style.overflow = 'auto';
  };

  const handleSearch = (e) => {
    const inputVal = e.target.value;
    setSearchVal(inputVal);
    setSearchColumnOneList(columnOneList.filter(
      v => v.taskName.toLowerCase().includes(inputVal.toLowerCase())
    ));
    setSearchColumnTwoList(columnTwoList.filter(
      v => v.taskName.toLowerCase().includes(inputVal.toLowerCase())
    ));
    setSearchColumnThreeList(columnThreeList.filter(
      v => v.taskName.toLowerCase().includes(inputVal.toLowerCase())
    ));
  };

  const showTaskOptions = (v) => {
    if (v.status === 'Yet to Start') {
      setColumnOneTaskOptions({ [v.id]: !columnOneTaskOptions[v.id] });
    } else if (v.status === 'In Progress') {
      setColumnTwoTaskOptions({ [v.id]: !columnTwoTaskOptions[v.id] });
    } else if (v.status === 'Completed') {
      setColumnThreeTaskOptions({ [v.id]: !columnThreeTaskOptions[v.id] });
    }
    setColumnOneEditTaskWindow({ [v.id]: false });
    setColumnOneStatusOptions({ [v.id]: false });
    setColumnTwoEditTaskWindow({ [v.id]: false });
    setColumnTwoStatusOptions({ [v.id]: false });
    setColumnThreeEditTaskWindow({ [v.id]: false });
    setColumnThreeStatusOptions({ [v.id]: false });
  };

  const showUpdateStatus = (v) => {
    if (v.status === 'Yet to Start') {
      setColumnOneStatusOptions({ [v.id]: !columnOneStatusOptions[v.id] });
    } else if (v.status === 'In Progress') {
      setColumnTwoStatusOptions({ [v.id]: !columnTwoStatusOptions[v.id] });
    } else if (v.status === 'Completed') {
      setColumnThreeStatusOptions({ [v.id]: !columnThreeStatusOptions[v.id] });
    }
    setColumnOneEditTaskWindow({ [v.id]: false });
    setColumnTwoEditTaskWindow({ [v.id]: false });
    setColumnThreeEditTaskWindow({ [v.id]: false });
  };

  const showEditTaskWindow = (v) => {
    if (v.status === 'Yet to Start') {
      setColumnOneEditTaskWindow({ [v.id]: !columnOneEditTaskWindow[v.id] });
    } else if (v.status === 'In Progress') {
      setColumnTwoEditTaskWindow({ [v.id]: !columnTwoEditTaskWindow[v.id] });
    } else if (v.status === 'Completed') {
      setColumnThreeEditTaskWindow({ [v.id]: !columnThreeEditTaskWindow[v.id] });
    }
    setTaskName(v.taskName);
    setDescription(v.description);
    setColumnOneStatusOptions({ [v.id]: false });
    setColumnTwoStatusOptions({ [v.id]: false });
    setColumnThreeStatusOptions({ [v.id]: false });
  };

  const handleUpdateTask = (v) => {
    v.taskName = taskName;
    v.description = description;
    setColumnOneTaskOptions({ [v.id]: false });
    setColumnTwoTaskOptions({ [v.id]: false });
    setColumnThreeTaskOptions({ [v.id]: false });
  };
  
  const handleUpdateStatus = (v, x) => {
    if (v.status === 'Yet to Start' && v.status !== x) {
      setColumnOneList(columnOneList.filter(item => item.id !== v.id));
      if (x === 'In Progress') {
        setColumnTwoList([...columnTwoList, v]);
      } else if (x === 'Completed') {
        setColumnThreeList([...columnThreeList, v]);
      }
    } else if (v.status === 'In Progress' && v.status !== x) {
      setColumnTwoList(columnTwoList.filter(item => item.id !== v.id));
      if (x === 'Yet to Start') {
        setColumnOneList([...columnOneList, v]);
      } else if (x === 'Completed') {
        setColumnThreeList([...columnThreeList, v]);
      }
    } else if (v.status === 'Completed' && v.status !== x) {
      setColumnThreeList(columnThreeList.filter(item => item.id !== v.id));
      if (x === 'Yet to Start') {
        setColumnOneList([...columnOneList, v]);
      } else if (x === 'In Progress') {
        setColumnTwoList([...columnTwoList, v]);
      }
    }
    v.status = x;
    setColumnOneTaskOptions({ [v.id]: false });
    setColumnTwoTaskOptions({ [v.id]: false });
    setColumnThreeTaskOptions({ [v.id]: false });
  };

  const handleDeleteTask = (v) => {
    if (v.status === 'Yet to Start') {
      setColumnOneList(columnOneList.filter(item => item.id !== v.id));
    } else if (v.status === 'In Progress') {
      setColumnTwoList(columnTwoList.filter(item => item.id !== v.id));
    } else if (v.status === 'Completed') {
      setColumnThreeList(columnThreeList.filter(item => item.id !== v.id));
    }
  };

  const showAddTaskWindow = () => {
    setAddTaskWindow(true);
    document.body.style.overflow = 'hidden';
  };
  const hideAddTaskWindow = () => {
    setAddTaskWindow(false)
    document.body.style.overflow = 'auto';
  };

  const showAllColumns = () => {
    setShowColumnOneMobile(true);
    setShowColumnTwoMobile(true);
    setShowColumnThreeMobile(true);
  };
  const showOnlyColumnOne = () => {
    setShowColumnOneMobile(true);
    setShowColumnTwoMobile(false);
    setShowColumnThreeMobile(false);
  };
  const showOnlyColumnTwo = () => {
    setShowColumnTwoMobile(true);
    setShowColumnOneMobile(false);
    setShowColumnThreeMobile(false);
  };
  const showOnlyColumnThree = () => {
    setShowColumnThreeMobile(true);
    setShowColumnOneMobile(false);
    setShowColumnTwoMobile(false);
  };

  return (
    <>
      <nav>
        <div id='logoContainer'>
          <img src={reactLogo} alt='Logo'/>
          <p>What-To-Do</p>
        </div>
        <div id='userContainer'>
          <img src={viteLogo} alt='User Image'/>
          <p>Xinzeo</p>
        </div>
        <div id='menuIcon'>☰</div>
      </nav>
      <div id='searchTaskContainer'>
        <input
          name='searchBar'
          type='search'
          placeholder='Search for tasks'
          value={searchVal}
          onChange={handleSearch}
        />
        <button onClick={showAddTaskWindow}>+ Add New Task</button>
      </div>
      <div id='showColumnsMobileBtns'>
        <span>
          <button onClick={showAllColumns}>All</button>
        </span>
        <span className={(showColumnOneMobile && !showColumnTwoMobile) ? 'columnMobileBtnsContainer' : ''}>
          <button onClick={showOnlyColumnOne}>Yet to Start</button>
        </span>
        <span className={(showColumnTwoMobile && !showColumnThreeMobile) ? 'columnMobileBtnsContainer' : ''}>
          <button onClick={showOnlyColumnTwo}>In Progress</button>
        </span>
        <span className={(showColumnThreeMobile && !showColumnOneMobile) ? 'columnMobileBtnsContainer' : ''}>
          <button onClick={showOnlyColumnThree}>Completed</button>
        </span>
      </div>
      <div id='taskManagement'>
        {addTaskWindow && <div id='addTaskWindow'>
          <div id='addTaskHeading'>
            <h3>&#10095; Add New Task</h3>
            <button id='closeAddTask' onClick={hideAddTaskWindow}>&#10094; Back</button>
          </div>
          <form id='newTaskForm' onSubmit={handleAddTask}>
            <>
              <p className='taskInputLabels'>Task Name</p>
              <input
                name='taskName'
                type='text'
                placeholder='eg., Design a Website'
                onChange={(e) => setTaskName(e.target.value)}
              />
            </>
            <>
              <p className='taskInputLabels'>Description</p>
              <textarea
                name='description'
                placeholder='Description goes here...'
                onChange={(e) => setDescription(e.target.value)}
              />
            </>
            <span id='secondaryInputs'>
              <span>
                <p className='taskInputLabels'>Set Deadline</p>
                <input
                  type='date'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </span>
              <span id='radioInput'>
                <p className='taskInputLabels'>Set Priority</p>
                <>
                  <label>
                    <input
                      type='radio'
                      name='priority'
                      value='Low'
                      checked={priority === 'Low'}
                      onChange={() => setPriority('Low')}
                    /> Low
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='priority'
                      value='Medium'
                      checked={priority === 'Medium'}
                      onChange={() => setPriority('Medium')}
                    /> Medium
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='priority'
                      value='High'
                      checked={priority === 'High'}
                      onChange={() => setPriority('High')}
                    /> High
                  </label>
                </>
              </span>
            </span>
            <button id='addTask' type='submit'>+ Add Task</button>
          </form>
        </div>}
        <div className={showColumnOneMobile ? 'columnOne' : 'hideColumns'}>
          <div className={showColumnTwoMobile ? 'columnHeading' : 'hideColumns'}>
            <h3>Yet To Start</h3>
            <p id='taskCountBlue'>{columnOneList.length}</p>
          </div>
          <div className='showTasks'>
            {(showColumnOneList.length === 0 && searchVal === "") ? <p className='emptyListTexts'>No Tasks To Show</p> :
            (searchColumnOneList.length === 0 && searchVal !== "") ? <p className='emptyListTexts'>No Search Results</p> :
            showColumnOneList.map(v => (
              <div key={v.id} className='taskContainer'>
                <div className='taskEditHeader'>
                  <span className={
                    v.priority === "High" ? 'highPriority'
                    : v.priority === "Medium" ? 'midPriority'
                    : 'lowPriority'
                  }>
                    &#128978; {v.priority}
                  </span>
                  <button className='taskEditBtn' onClick={() => showTaskOptions(v)}>
                    {columnOneTaskOptions[v.id] ? String.fromCharCode(10005) : String.fromCharCode(8942)}
                  </button>
                  {columnOneTaskOptions[v.id] && <div className='taskActions'>
                    <div className={columnOneEditTaskWindow[v.id] ? 'taskActionBtnContainer' : 'editTaskContainer'}>
                      <button className='taskActionBtns' onClick={() => showEditTaskWindow(v)}>
                        {columnOneEditTaskWindow[v.id] ? 'Cancel' : 'Edit'}
                      </button>
                      {columnOneEditTaskWindow[v.id] && <>
                        <button className='updateTaskBtn' onClick={() => handleUpdateTask(v)}>Update</button>
                        <p>Task Name</p>
                        <input
                          name='taskName'
                          type='text'
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                        />
                        <p>Description</p>
                        <textarea
                          name='description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </>}
                    </div>
                    <div className={columnOneStatusOptions[v.id] ? 'taskActionBtnContainer' : 'editTaskContainer'}>
                      <button className='taskActionBtns' onClick={() => showUpdateStatus(v)}>
                        {columnOneStatusOptions[v.id] ? 'Cancel' : 'Status'}
                      </button>
                      {columnOneStatusOptions[v.id] && <div className='statusUpdateBtnContainer'>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'Yet to Start')}>Yet To Start</button>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'In Progress')}>In Progress</button>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'Completed')}>Completed</button>
                      </div>}
                    </div>
                    <button className='taskActionBtns' onClick={() => handleDeleteTask(v)}>Delete</button>
                  </div>}
                </div>
                <h2 className='taskContent'>{v.taskName}:</h2>
                <p className='taskContent'>&#10239; {v.description}</p>
                <p className='taskDate'>{v.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={showColumnTwoMobile ? 'columnTwo' : 'hideColumns'}>
          <div className={showColumnThreeMobile ? 'columnHeading' : 'hideColumns'}>
            <h3>In Progress</h3>
            <p id='taskCountOrange'>{columnTwoList.length}</p>
          </div>
          <div className='showTasks'>
            {(showColumnTwoList.length === 0 && searchVal === "") ? <p className='emptyListTexts'>No Tasks To Show</p> :
            (searchColumnTwoList.length === 0 && searchVal !== "") ? <p className='emptyListTexts'>No Search Results</p> :
            showColumnTwoList.map(v => (
              <div key={v.id} className='taskContainer'>
                <div className='taskEditHeader'>
                  <span className={
                    v.priority === "High" ? 'highPriority'
                    : v.priority === "Medium" ? 'midPriority'
                    : 'lowPriority'
                  }>
                    &#128978; {v.priority}
                  </span>
                  <button className='taskEditBtn' onClick={() => showTaskOptions(v)}>
                    {columnTwoTaskOptions[v.id] ? String.fromCharCode(10005) : String.fromCharCode(8942)}
                  </button>
                  {columnTwoTaskOptions[v.id] && <div className='taskActions'>
                    <div className={columnTwoEditTaskWindow[v.id] ? 'taskActionBtnContainer' : 'editTaskContainer'}>
                      <button className='taskActionBtns' onClick={() => showEditTaskWindow(v)}>
                        {columnTwoEditTaskWindow[v.id] ? 'Cancel' : 'Edit'}
                      </button>
                      {columnTwoEditTaskWindow[v.id] && <>
                        <button className='updateTaskBtn' onClick={() => handleUpdateTask(v)}>Update</button>
                        <p>Task Name</p>
                        <input
                          name='taskName'
                          type='text'
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                        />
                        <p>Description</p>
                        <textarea
                          name='description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </>}
                    </div>
                    <div className={columnTwoStatusOptions[v.id] ? 'taskActionBtnContainer' : 'editTaskContainer'}>
                      <button className='taskActionBtns' onClick={() => showUpdateStatus(v)}>
                        {columnTwoStatusOptions[v.id] ? 'Cancel' : 'Status'}
                      </button>
                      {columnTwoStatusOptions[v.id] && <div className='statusUpdateBtnContainer'>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'Yet to Start')}>Yet To Start</button>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'In Progress')}>In Progress</button>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'Completed')}>Completed</button>
                      </div>}
                    </div>
                    <button className='taskActionBtns' onClick={() => handleDeleteTask(v)}>Delete</button>
                  </div>}
                </div>
                <h2 className='taskContent'>{v.taskName}:</h2>
                <p className='taskContent'>&#10239; {v.description}</p>
                <p className='taskDate'>{v.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={showColumnThreeMobile ? 'columnThree' : 'hideColumns'}>
          <div className={showColumnOneMobile ? 'columnHeading' : 'hideColumns'}>
            <h3>Completed</h3>
            <p id='taskCountGreen'>{columnThreeList.length}</p>
          </div>
          <div className='showTasks'>
            {(showColumnThreeList.length === 0 && searchVal === "") ? <p className='emptyListTexts'>No Tasks To Show</p> :
            (searchColumnThreeList.length === 0 && searchVal !== "") ? <p className='emptyListTexts'>No Search Results</p> :
            showColumnThreeList.map(v => (
              <div key={v.id} className='taskContainer'>
                <div className='taskEditHeader'>
                  <span className={
                    v.priority === "High" ? 'highPriority'
                    : v.priority === "Medium" ? 'midPriority'
                    : 'lowPriority'
                  }>
                    &#128978; {v.priority}
                  </span>
                  <button className='taskEditBtn' onClick={() => showTaskOptions(v)}>
                    {columnThreeTaskOptions[v.id] ? String.fromCharCode(10005) : String.fromCharCode(8942)}
                  </button>
                  {columnThreeTaskOptions[v.id] && <div className='taskActions'>
                    <div className={columnThreeEditTaskWindow[v.id] ? 'taskActionBtnContainer' : 'editTaskContainer'}>
                      <button className='taskActionBtns' onClick={() => showEditTaskWindow(v)}>
                        {columnThreeEditTaskWindow[v.id] ? 'Cancel' : 'Edit'}
                      </button>
                      {columnThreeEditTaskWindow[v.id] && <>
                        <button className='updateTaskBtn' onClick={() => handleUpdateTask(v)}>Update</button>
                        <p>Task Name</p>
                        <input
                          name='taskName'
                          type='text'
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                        />
                        <p>Description</p>
                        <textarea
                          name='description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </>}
                    </div>
                    <div className={columnThreeStatusOptions[v.id] ? 'taskActionBtnContainer' : 'editTaskContainer'}>
                      <button className='taskActionBtns' onClick={() => showUpdateStatus(v)}>
                        {columnThreeStatusOptions[v.id] ? 'Cancel' : 'Status'}
                      </button>
                      {columnThreeStatusOptions[v.id] && <div className='statusUpdateBtnContainer'>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'Yet to Start')}>Yet To Start</button>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'In Progress')}>In Progress</button>
                        <button className='statusUpdateBtns' onClick={() => handleUpdateStatus(v, 'Completed')}>Completed</button>
                      </div>}
                    </div>
                    <button className='taskActionBtns' onClick={() => handleDeleteTask(v)}>Delete</button>
                  </div>}
                </div>
                <h2 className='taskContent'>{v.taskName}:</h2>
                <p className='taskContent'>&#10239; {v.description}</p>
                <p className='taskDate'>{v.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
