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

  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12H20M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" />
    </svg>
  );

  const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9L12 2L21 9V20C21 20.5523 20.7893 21.0523 20.4142 21.4274C20.0391 21.7924 19.5391 22 19 22H5C4.46086 22 3.96086 21.7924 3.58579 21.4274C3.21071 21.0523 3 20.5523 3 20V9Z" />
      <path d="M9 22V12H15V22" />
    </svg>
  );

  const TodayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2V6" />
      <path d="M8 2V6" />
      <path d="M3 10H21" />
      <path d="M12 14V18" />
    </svg>
  );

  const MoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <circle cx="19" cy="12" r="3" />
      <circle cx="5" cy="12" r="3" />
    </svg>
  );

  const sidebarWidth = isMobile ? '200px' : isTablet ? '240px' : '250px';
  const mainContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#f5f7fa',
    fontFamily: 'Inter, sans-serif',
    overflow: 'hidden',
    marginLeft: sidebarWidth,
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
            {/* Project Name with Edit and Share Icons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 20,
              fontWeight: 600,
              color: '#333',
            }}>
              <span>{selectedProject}</span>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  color: '#8E2DE2',
                }}
                onClick={() => alert('Edit Project')}
              >
                <EditIcon />
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  color: '#8E2DE2',
                }}
                onClick={() => alert('Share Project')}
              >
                <ShareIcon />
              </button>
            </div>

            {/* Top Right Controls */}
            <div style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  background: '#fff',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <FilterIcon /> Filter
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  background: '#fff',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <TodayIcon /> Today
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  background: '#fff',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <ShareIcon /> Share
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  background: '#fff',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <MoreIcon />
              </button>
            </div>
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