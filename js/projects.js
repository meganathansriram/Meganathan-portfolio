// Store projects in localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// Display projects
function renderProjects() {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";

  projects.forEach((project, index) => {
    projectsList.innerHTML += `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button onclick="editProject(${index})">Edit</button>
        <button onclick="deleteProject(${index})">Delete</button>
      </div>
    `;
  });
}

// Add / Edit project
document.getElementById("project-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex === "") {
    // Add new project
    projects.push({ title, description });
  } else {
    // Update existing project
    projects[editIndex] = { title, description };
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
  document.getElementById("project-form").reset();
});

// Edit project
function editProject(index) {
  document.getElementById("title").value = projects[index].title;
  document.getElementById("description").value = projects[index].description;
  document.getElementById("editIndex").value = index;
}

// Delete project
function deleteProject(index) {
  projects.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
}

// Initial render
renderProjects();
