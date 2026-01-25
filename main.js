// Tab functionality
function openTab(evt, tabName) {
  // Hide all tabcontent
  const tabcontents = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
  }

  // Remove active class from all tablinks
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show current tab and mark button as active
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Initialize on page load
window.onload = function() {
  // Show first tab by default (Christmas List)
  document.getElementById("Christmas List").style.display = "block";
  document.getElementsByClassName("tablinks")[0].className += " active";

  // Hide Random Gizmos tab initially
  document.getElementById("Vegan Diet").style.display = "none";
};

window.addEventListener('load', function(){
	document.getElementById('sampleeditor').setAttribute('contenteditable', 'true');
	document.getElementById('sampleeditor2').setAttribute('contenteditable', 'true');
});

function format(command, value) {
	document.execCommand(command, false, value);
}

function setUrl() {
	var url = document.getElementById('txtFormatUrl').value;
	var sText = document.getSelection();
	document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
	document.getElementById('txtFormatUrl').value = '';
}
