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

function download(file, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(document.getElementById("textarea1").value));
  element.setAttribute('download', file);
  document.body.appendChild(element);
  element.click();
}

var file = document.getElementById("myFile").files[0];
var reader = new FileReader();

function editoroption1() {
  document.getElementById("textarea1")
  .style.fontWeight = "bold";
}

function editoroption2() {
  document.getElementById("textarea1")
  .style.fontStyle = "italic";
}

function editoroption3() {
  document.getElementById("textarea1")
  .style.textAlign = "left";
}

function editoroption4() {
  document.getElementById("textarea1")
  .style.textAlign = "center";
}

function editoroption5() {
  document.getElementById("textarea1")
  .style.textAlign = "right";
}

function editoroption6() {
  document.getElementById("textarea1")
  .style.textTransform = "uppercase";
}

function editoroption7() {
  document.getElementById("textarea1")
  .style.textTransform = "lowercase";
}

function editoroption8() {
  document.getElementById("textarea1")
  .style.textTransform = "capitalize";
}

function editoroption9() {
  document.getElementById("textarea1")
  .style.fontWeight = "normal";
  document.getElementById("textarea1")
  .style.textAlign = "left";
  document.getElementById("textarea1")
  .style.fontStyle = "normal";
  document.getElementById("textarea1")
  .style.textTransform = "capitalize";
  document.getElementById("textarea1")
  .value = "";
}

function editoroption10() {
  let text = document.getElementById("textarea1").value;
  let filename = "text.txt";
  download(filename, text);
}

function editoroption11() {
  const fileInput = document.getElementById("myFile");
  fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var textArea = document.getElementById("textarea1");
      textArea.value = e.target.result;
    };
    reader.readAsText(file);
  });
}
