// Smooth Scrolling
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll Animation
const sections = document.querySelectorAll("section");

const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Fetch GitHub Repository
async function fetchGitHubRepository(repoOwner, repoName) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}`
    );
    const repository = await response.json();

    const projectsContainer = document.getElementById("github-projects");

    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    projectElement.innerHTML = `
                <h3><a href="${repository.html_url}" target="_blank">${
      repository.name
    }</a></h3>
                <p>${repository.description || "No description available"}</p>
            `;

    projectsContainer.appendChild(projectElement);
  } catch (error) {
    console.error("Error fetching GitHub repository:", error);
  }
}

// Gunakan nama pengguna dan nama repository GitHub Anda
fetchGitHubRepository("emonizeryan", "kedai-kopi-Senja-bercerita");
fetchGitHubRepository("emonizeryan", "node-cortensor");
