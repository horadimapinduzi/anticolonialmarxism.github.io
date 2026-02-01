// DOM Elements
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const editor = document.getElementById('editor');
const wordCount = document.getElementById('word-count');
const lastSaved = document.getElementById('last-saved');
const editorStatus = document.getElementById('editor-status');
const jsonFileInput = document.getElementById('jsonFileInput');

// Tab Management - FIXED VERSION
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;

    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');

    // Hide all tab contents
    tabContents.forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none';
    });

    // Show the selected tab content
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
      activeContent.classList.add('active');
      activeContent.style.display = 'block';
    }

    // Focus editor when switching to text editor tab
    if (tabId === 'text-editor') {
      setTimeout(() => {
        if (editor) editor.focus();
      }, 100);
    }
  });
});

// Text Editor Functions
function formatText(command) {
  document.execCommand(command, false, null);
  if (editor) editor.focus();
  updateWordCount();
}

function setAlignment(align) {
  document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1), false, null);
  if (editor) editor.focus();
}

function clearText() {
  if (editor && confirm('Are you sure you want to clear all text?')) {
    editor.innerHTML = '';
    updateWordCount();
    updateStatus('Text cleared');
  }
}

function updateWordCount() {
  if (!editor) return;
  const text = editor.textContent.trim();
  const words = text ? text.split(/\s+/).filter(word => word.length > 0).length : 0;
  if (wordCount) wordCount.textContent = words;
}

function updateStatus(message) {
  if (editorStatus) {
    editorStatus.textContent = message;
    setTimeout(() => {
      if (editorStatus) editorStatus.textContent = 'Ready';
    }, 2000);
  }
}

// Keyboard Shortcuts
if (editor) {
  editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') { e.preventDefault(); formatText('bold'); }
    if (e.ctrlKey && e.key === 'i') { e.preventDefault(); formatText('italic'); }
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); formatText('underline'); }
  });
}

// Auto-save functionality
let autoSaveTimeout;
function autoSave() {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    if (!editor) return;
    const content = { html: editor.innerHTML, timestamp: new Date().toISOString() };
    localStorage.setItem('textEditorAutoSave', JSON.stringify(content));
    updateLastSaved();
  }, 2000);
}

function updateLastSaved() {
  const now = new Date();
  if (lastSaved) lastSaved.textContent = `Last saved: ${now.toLocaleTimeString()}`;
}

// Save to JSON
function saveToJSON() {
  if (!editor) return;
  const editorData = {
    html: editor.innerHTML,
    text: editor.textContent,
    metadata: {
      timestamp: new Date().toISOString(),
      wordCount: editor.textContent.trim().split(/\s+/).length,
      charCount: editor.textContent.length
    }
  };
  const jsonString = JSON.stringify(editorData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `editor-content-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  updateStatus('Document saved!');
  updateLastSaved();
}

// Load from JSON
function loadFromJSON() {
  if (jsonFileInput) jsonFileInput.click();
}

if (jsonFileInput) {
  jsonFileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      alert('Please select a JSON file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const data = JSON.parse(event.target.result);
        if (editor) {
          if (data.html) {
            editor.innerHTML = data.html;
          } else if (data.text) {
            editor.textContent = data.text;
          }
          updateWordCount();
          updateStatus('Document loaded!');
          if (data.metadata?.timestamp) {
            const date = new Date(data.metadata.timestamp);
            if (lastSaved) lastSaved.textContent = `Last saved: ${date.toLocaleString()}`;
          }
        }
      } catch (error) {
        alert('Error loading file: Invalid JSON format');
        console.error('Error:', error);
      }
    };
    reader.readAsText(file);
    this.value = '';
  });
}

// Initialize editor with auto-saved content
function initializeEditor() {
  const saved = localStorage.getItem('textEditorAutoSave');
  if (saved && editor) {
    try {
      const data = JSON.parse(saved);
      if (data.html) {
        editor.innerHTML = data.html;
        updateWordCount();
        if (data.timestamp && lastSaved) {
          const date = new Date(data.timestamp);
          lastSaved.textContent = `Last saved: ${date.toLocaleString()}`;
        }
      }
    } catch (e) {
      console.error('Error loading auto-save:', e);
      localStorage.removeItem('textEditorAutoSave');
    }
  }

  if (editor) {
    editor.addEventListener('input', () => {
      updateWordCount();
      autoSave();
    });
    editor.addEventListener('focus', () => updateStatus('Editing...'));
    editor.addEventListener('blur', () => updateStatus('Ready'));
  }

  updateWordCount();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize editor
  initializeEditor();

  // Set initial tab to be active
  const firstTab = document.querySelector('.tab-btn.active');
  if (firstTab) {
    // Trigger click to show the correct content
    firstTab.click();
  } else if (tabs.length > 0) {
    // If no tab is marked active, activate the first one
    tabs[0].classList.add('active');
    const firstTabId = tabs[0].dataset.tab;
    const firstContent = document.getElementById(firstTabId);
    if (firstContent) {
      firstContent.classList.add('active');
      firstContent.style.display = 'block';
    }

    // Hide other tabs
    tabContents.forEach(content => {
      if (content.id !== firstTabId) {
        content.style.display = 'none';
      }
    });
  }
});
