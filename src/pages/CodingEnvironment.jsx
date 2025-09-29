import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaExpand, FaCompress, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';

const CodingEnvironment = () => {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>My Playground</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 40px;
      color: white;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    h1 {
      font-size: 3em;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    p {
      font-size: 1.2em;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to CodeMaster!</h1>
    <p>Start coding and see your changes in real-time.</p>
    <button onclick="showMessage()">Click Me!</button>
  </div>

  <script>
    function showMessage() {
      alert('Hello from CodeMaster Playground!');
    }
  </script>
</body>
</html>`);

  const [css, setCss] = useState(`/* Add your CSS styles here */
button {
  background: #4FD1C5;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1em;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

button:hover {
  background: #38B2AC;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.container {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`);

  const [js, setJs] = useState(`// Add your JavaScript here
console.log('Welcome to CodeMaster Playground!');

// Example interactive function
function showMessage() {
  const messages = [
    "Great job! 🎉",
    "You're learning! 💪",
    "CodeMaster rocks! 🚀",
    "Keep coding! 👨‍💻"
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  alert(randomMessage);
}

// Add some dynamic behavior
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('button');
  if (button) {
    button.addEventListener('click', showMessage);
  }
});

// Utility function for demonstrations
function addRainbowEffect(element) {
  if (element) {
    element.style.background = 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)';
    element.style.backgroundSize = '400% 400%';
    element.style.animation = 'rainbow 3s ease infinite';
  }
}`);

  const [output, setOutput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('html');

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedCode = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          @keyframes rainbow {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        </style>
      </head>
      <body>
        ${html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/g, '')}
        <script>
          try {
            ${js}
          } catch(error) {
            console.error('JavaScript Error:', error);
          }
        </script>
      </body>
      </html>
    `;
    setOutput(combinedCode);
  };

  const runCode = () => {
    updateOutput();
  };

  const clearCode = () => {
    setHtml(`<!DOCTYPE html>\n<html>\n<head>\n  <title>My Playground</title>\n</head>\n<body>\n  \n</body>\n</html>`);
    setCss('/* Add your CSS here */');
    setJs('// Add your JavaScript here');
  };

  const loadExample = (example) => {
    switch (example) {
      case 'counter':
        setHtml(`<!DOCTYPE html>
<html>
<body>
  <div class="counter">
    <h1>Counter: <span id="count">0</span></h1>
    <button onclick="increment()">Increment</button>
    <button onclick="decrement()">Decrement</button>
    <button onclick="reset()">Reset</button>
  </div>
</body>
</html>`);
        setCss(`.counter {
  text-align: center;
  padding: 50px;
  font-family: Arial, sans-serif;
}

button {
  background: #4FD1C5;
  color: white;
  border: none;
  padding: 12px 24px;
  margin: 5px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

button:hover {
  background: #38B2AC;
}

#count {
  color: #4FD1C5;
  font-weight: bold;
}`);
        setJs(`let count = 0;

function increment() {
  count++;
  updateDisplay();
}

function decrement() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('count').textContent = count;
}`);
        break;

      case 'todo':
        setHtml(`<!DOCTYPE html>
<html>
<body>
  <div class="todo-app">
    <h1>Todo List</h1>
    <div class="input-section">
      <input type="text" id="todoInput" placeholder="Add a new task...">
      <button onclick="addTodo()">Add</button>
    </div>
    <ul id="todoList"></ul>
  </div>
</body>
</html>`);
        setCss(`.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todoInput {
  flex: 1;
  padding: 12px;
  border: 2px solid #4FD1C5;
  border-radius: 6px;
  font-size: 16px;
}

button {
  background: #4FD1C5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #38B2AC;
}

#todoList {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #4FD1C5;
}

.todo-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.delete-btn {
  background: #FC8181;
  padding: 6px 12px;
  font-size: 12px;
}

.delete-btn:hover {
  background: #F56565;
}`);
        setJs(`let todos = [];

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  
  if (text) {
    todos.push({ id: Date.now(), text, completed: false });
    input.value = '';
    renderTodos();
  }
}

function toggleTodo(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
    li.innerHTML = \`
      <span onclick="toggleTodo(\${todo.id})" style="cursor: pointer; flex: 1;">\${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(\${todo.id})">Delete</button>
    \`;
    list.appendChild(li);
  });
}

// Allow adding todos with Enter key
document.getElementById('todoInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});`);
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Code <span className="text-emerald-400">Playground</span>
          </h1>
          <p className="text-xl text-gray-400">
            Write HTML, CSS, and JavaScript and see the results in real-time
          </p>
        </motion.div>

        <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-6 h-[calc(100vh-200px)]`}>
          <div className={`bg-gray-800 rounded-xl border border-gray-700 flex flex-col ${isFullscreen ? 'hidden' : ''}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                    activeTab === 'html'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <FaHtml5 className="mr-2 text-orange-500" />
                  HTML
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                    activeTab === 'css'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <FaCss3Alt className="mr-2 text-blue-500" />
                  CSS
                </button>
                <button
                  onClick={() => setActiveTab('js')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                    activeTab === 'js'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <FaJs className="mr-2 text-yellow-500" />
                  JavaScript
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={clearCode}
                  className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={runCode}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center"
                >
                  <FaPlay className="mr-2" />
                  Run
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {activeTab === 'html' && (
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
                  spellCheck="false"
                />
              )}
              {activeTab === 'css' && (
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
                  spellCheck="false"
                />
              )}
              {activeTab === 'js' && (
                <textarea
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
                  spellCheck="false"
                />
              )}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Examples:</span>
                <button
                  onClick={() => loadExample('counter')}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                >
                  Counter App
                </button>
                <button
                  onClick={() => loadExample('todo')}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                >
                  Todo List
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Output Preview</h3>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
            <div className="flex-1 bg-white rounded-b-xl">
              <iframe
                srcDoc={output}
                title="output"
                sandbox="allow-scripts"
                className="w-full h-full rounded-b-xl"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gray-800 rounded-xl p-6 border border-emerald-900"
        >
          <h3 className="text-lg font-semibold text-white mb-4">💡 Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-gray-300">
              <strong>HTML:</strong> Structure your content with semantic tags
            </div>
            <div className="text-gray-300">
              <strong>CSS:</strong> Use Flexbox and Grid for modern layouts
            </div>
            <div className="text-gray-300">
              <strong>JS:</strong> Manipulate the DOM and handle events
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingEnvironment;