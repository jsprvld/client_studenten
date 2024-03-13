document.getElementById("contactBtn").addEventListener("click", function() {
  document.getElementById("contactPopup").style.display = "block";
  document.getElementById("backgroundOverlay").style.display = "block"; // Show the background overlay
  document.body.classList.add("popup-open"); // Add a class to the body to disable scrolling
});

document.querySelector(".close").addEventListener("click", function() {
  document.getElementById("contactPopup").style.display = "none";
  document.getElementById("backgroundOverlay").style.display = "none"; // Hide the background overlay
  document.body.classList.remove("popup-open"); // Remove the class to enable scrolling
});

