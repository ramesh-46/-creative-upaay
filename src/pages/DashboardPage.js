import React, { useState, useEffect } from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Column from '../components/Column';
import AddTaskModal from '../components/AddTaskModal';

// Custom hook for localStorage
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

// Redux slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    columns: {
      todo: [],
      progress: [],
      done: [],
    },
    filter: 'All',
  },
  reducers: {
    addTask: (state, action) => {
      state.columns[action.payload.column].push(action.payload.task);
    },
    moveTask: (state, action) => {
      const { from, to, index } = action.payload;
      const task = state.columns[from].splice(index, 1)[0];
      state.columns[to].push(task);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
});

const { addTask, moveTask, setFilter, setColumns } = tasksSlice.actions;

const store = configureStore({ reducer: tasksSlice.reducer });

const DashboardContent = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const filter = useSelector((state) => state.filter);
  const [selectedProject, setSelectedProject] = useState('Mobile App');
  const [showModal, setShowModal] = useState(false);
  const [storedColumns, setStoredColumns] = useLocalStorage('dashboardColumns', columns);

  useEffect(() => {
    dispatch(setColumns(storedColumns));
  }, []);

  useEffect(() => {
    setStoredColumns(columns);
  }, [columns]);

  const [draggingTask, setDraggingTask] = useState(null);
  const onDragStart = (e, column, index) => setDraggingTask({ column, index });
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e, toColumn) => {
    if (draggingTask) {
      dispatch(moveTask({ from: draggingTask.column, to: toColumn, index: draggingTask.index }));
      setDraggingTask(null);
    }
  };

  const handleAddTask = (task, column) => {
    dispatch(addTask({ task, column }));
  };

  // Responsive Logic
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  // ✅ Fixed Layout: Use flex with proper spacing
  const sidebarWidth = isMobile ? '200px' : isTablet ? '240px' : '250px';
  const mainContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#f5f7fa',
    fontFamily: 'Inter, sans-serif',
    overflow: 'hidden',
    marginLeft: sidebarWidth, // Push content to the right
  };

  const contentStyle = {
    padding: isMobile ? 12 : 20,
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isMobile ? 16 : 20,
  };

  const columnsContainerStyle = {
    display: 'flex',
    gap: isMobile ? 10 : 16,
    flexWrap: 'wrap',
    margin: '0 auto',
    maxWidth: isMobile ? '100%' : '1400px',
    padding: isMobile ? 0 : 20,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        style={{ width: sidebarWidth }}
      />

      {/* Main Content - Starts after sidebar */}
      <div style={mainContainerStyle}>
        <Header />
        <div style={contentStyle}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0 }}>{selectedProject}</h2>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '8px 16px',
                background: '#8E2DE2',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <PlusIcon /> Add Task
            </button>
          </div>

          <div style={columnsContainerStyle}>
            <Column
              title="To Do"
              count={columns.todo.length}
              tasks={columns.todo.filter((t) => filter === 'All' || t.priority === filter)}
              columnId="todo"
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragStart={onDragStart}
            />
            <Column
              title="On Progress"
              count={columns.progress.length}
              tasks={columns.progress.filter((t) => filter === 'All' || t.priority === filter)}
              columnId="progress"
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragStart={onDragStart}
            />
            <Column
              title="Done"
              count={columns.done.length}
              tasks={columns.done.filter((t) => filter === 'All' || t.priority === filter)}
              columnId="done"
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragStart={onDragStart}
            />
          </div>
        </div>
      </div>

      <AddTaskModal show={showModal} onClose={() => setShowModal(false)} onSave={handleAddTask} />
    </div>
  );
};

const DashboardPage = () => (
  <Provider store={store}>
    <DashboardContent />
  </Provider>
);

export default DashboardPage;