// Load data from JSON and populate the page
async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    // Populate profile
    populateProfile(data.profile);
    
    // Populate tech stack
    populateTechStack(data.techStack);
    
    // Populate projects (Indie Apps and Open Source)
    populateProjects(data);
    
    // Populate experience
    populateExperience(data.experience);
    
    // Populate education
    populateEducation(data.education);
    
    // Update links
    updateLinks(data.profile.links);
    
    // Update status bar with user info
    updateStatusBar(data.profile);
    
    // Setup tab switching
    setupTabSwitching();
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Populate profile section
function populateProfile(profile) {
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileTitle').textContent = profile.title;
  document.getElementById('profileBio').textContent = profile.bio;
  
  const profileImage = document.getElementById('profileImage');
  profileImage.style.backgroundImage = `url('${profile.image}')`;
}

// Populate tech stack
function populateTechStack(technologies) {
  const techStack = document.getElementById('techStack');
  techStack.innerHTML = '';
  
  technologies.forEach(tech => {
    const badge = document.createElement('span');
    badge.className = 'px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono';
    badge.textContent = tech;
    techStack.appendChild(badge);
  });
}

// Populate projects - Indie Apps and Open Source
function populateProjects(data) {
  // Populate Indie Apps
  const indieAppsGrid = document.getElementById('indieAppsGrid');
  indieAppsGrid.innerHTML = '';
  indieAppsGrid.className = 'projectContent p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#fafafa] dark:bg-[#151f28]';
  
  if (data.indieApps) {
    data.indieApps.forEach(project => {
      const projectCard = createIndieAppCard(project);
      indieAppsGrid.appendChild(projectCard);
    });
  }
  
  // Populate Open Source
  const openSourceGrid = document.getElementById('openSourceGrid');
  openSourceGrid.innerHTML = '';
  openSourceGrid.className = 'projectContent hidden p-6 bg-[#fafafa] dark:bg-[#151f28] overflow-x-auto';
  openSourceGrid.style.display = 'none';
  
  if (data.openSourceProjects) {
    const container = document.createElement('div');
    container.className = 'flex gap-6';
    container.style.minWidth = 'min-content';
    
    data.openSourceProjects.forEach(project => {
      const projectCard = createOpenSourceCard(project);
      container.appendChild(projectCard);
    });
    
    openSourceGrid.appendChild(container);
  }
}

function createIndieAppCard(project) {
  const div = document.createElement('div');
  div.className = 'group bg-white dark:bg-[#1e2a38] border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300';
  
  const badgeColorMap = {
    'blue': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-700',
    'green': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-700',
    'purple': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 border-purple-200 dark:border-purple-700'
  };
  
  const badgeClass = badgeColorMap[project.badgeColor] || badgeColorMap.blue;
  
  let buttonsHTML = '';
  if (project.platforms) {
    project.platforms.forEach(button => {
      const isAppStore = button.icon === 'ios';
      const buttonClass = isAppStore 
        ? 'bg-black text-white hover:bg-gray-800' 
        : 'bg-white border border-gray-300 text-black hover:bg-gray-50';
      
      buttonsHTML += `
        <a href="${button.url}" target="_blank" class="flex-1 ${buttonClass} text-[10px] font-bold py-2 rounded flex items-center justify-center gap-1 transition-colors">
          <span class="material-symbols-outlined text-[14px]">${button.icon}</span>
          ${button.label}
        </a>
      `;
    });
  }
  
  div.innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div class="w-16 h-16 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-sm">
        <img class="w-full h-full object-cover" src="${project.icon}" alt="${project.name}">
      </div>
      <div class="text-[10px] font-semibold text-gray-400">
        ${project.date}
      </div>
    </div>
    <h3 class="font-bold text-lg mb-1 group-hover:text-primary transition-colors">${project.name}</h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">${project.description}</p>
    <div class="flex gap-2 mt-auto">
      ${buttonsHTML}
    </div>
  `;
  
  return div;
}

function createOpenSourceCard(project) {
  const div = document.createElement('div');
  div.className = 'flex-shrink-0 w-80 group bg-white dark:bg-[#1e2a38] border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300';
  
  let toolsHTML = '';
  if (project.tools && project.tools.length > 0) {
    toolsHTML = `
      <div class="flex flex-wrap gap-2 mb-4">
        ${project.tools.map(tool => `<span class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">${tool}</span>`).join('')}
      </div>
    `;
  }
  
  div.innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div class="w-16 h-16 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-sm">
        <img class="w-full h-full object-cover" src="${project.icon}" alt="${project.name}">
      </div>
      <div class="text-[10px] font-semibold text-gray-400">
        ${project.date}
      </div>
    </div>
    <h3 class="font-bold text-lg mb-1 group-hover:text-primary transition-colors">${project.name}</h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">${project.description}</p>
    ${toolsHTML}
    <div class="flex gap-2 mt-auto">
      <a href="${project.github}" target="_blank" class="flex-1 bg-black text-white hover:bg-gray-800 text-[10px] font-bold py-2 rounded flex items-center justify-center gap-1 transition-colors">
        <span class="material-symbols-outlined text-[14px]">code</span>
        GitHub
      </a>
    </div>
  `;
  
  return div;
}

// Populate experience
function populateExperience(experiences) {
  const timeline = document.getElementById('experienceTimeline');
  timeline.innerHTML = '';
  
  experiences.forEach(exp => {
    const item = createExperienceItem(exp);
    timeline.appendChild(item);
  });
}

function createExperienceItem(experience) {
  const div = document.createElement('div');
  div.className = 'relative pl-8';
  
  const isCurrent = experience.endDate === 'Present';
  const dotClass = isCurrent 
    ? 'bg-primary h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm'
    : 'bg-white border-2 border-gray-400 h-4 w-4 rounded-full dark:bg-gray-700';
  
  div.innerHTML = `
    <span class="absolute -left-[9px] top-1 ${dotClass}"></span>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
      <h4 class="text-lg font-bold">${experience.title}</h4>
      <span class="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500 border border-gray-200 dark:border-gray-700">
        ${experience.startDate} - ${experience.endDate}
      </span>
    </div>
    <p class="text-primary text-sm font-semibold mb-1">${experience.company}</p>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
      <span class="material-symbols-outlined text-[12px] align-middle">location_on</span>
      ${experience.location} • ${experience.employmentType}
    </p>
  `;
  
  return div;
}

// Populate education timeline
function populateEducation(education) {
  const timeline = document.getElementById('educationTimeline');
  timeline.innerHTML = '';
  
  education.forEach(edu => {
    const item = createEducationItem(edu);
    timeline.appendChild(item);
  });
}

function createEducationItem(education) {
  const div = document.createElement('div');
  div.className = 'relative pl-8';
  
  div.innerHTML = `
    <span class="absolute -left-[9px] top-1 bg-primary h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></span>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
      <h4 class="text-lg font-bold">${education.licence}</h4>
      <span class="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500 border border-gray-200 dark:border-gray-700">
        ${education.startDate} - ${education.endDate}
      </span>
    </div>
    <p class="text-primary text-sm font-semibold mb-1">${education.university}</p>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
      <span class="material-symbols-outlined text-[12px] align-middle">location_on</span>
      ${education.location} • GPA: ${education.graduate}
    </p>
  `;
  
  return div;
}

// Update links
function updateLinks(links) {
  const githubBtn = document.getElementById('githubBtn');
  const linkedinBtn = document.getElementById('linkedinBtn');
  const emailBtn = document.getElementById('emailBtn');
  const appstoreBtn = document.getElementById('appstoreBtn');
  const playstoreBtn = document.getElementById('playstoreBtn');
  const mediumBtn = document.getElementById('mediumBtn');
  const xBtn = document.getElementById('xBtn');
  const instagramBtn = document.getElementById('instagramBtn');
  const youtubeBtn = document.getElementById('youtubeBtn');
  const cvBtn = document.getElementById('cvBtn') || document.querySelector('#cvBtn');
  
  if (links.github) {
    githubBtn.href = links.github;
    githubBtn.target = '_blank';
  }
  
  if (links.linkedin) {
    linkedinBtn.href = links.linkedin;
    linkedinBtn.target = '_blank';
  }
  
  if (links.email) {
    emailBtn.href = `mailto:${links.email}`;
  }
  
  if (links.appstore) {
    appstoreBtn.href = links.appstore;
  }
  
  if (links.playstore) {
    playstoreBtn.href = links.playstore;
  }
  
  if (links.medium) {
    mediumBtn.href = links.medium;
  }
  
  if (links.x) {
    xBtn.href = links.x;
  }
  
  if (links.instagram) {
    instagramBtn.href = links.instagram;
  }
  
  if (links.youtube) {
    youtubeBtn.href = links.youtube;
  }
  
  // Add CV generation functionality
  if (cvBtn) {
    // CV button is now handled separately in DOMContentLoaded
  }
}

// Generate and download CV as PDF

// Generate and download CV as PDF
function generateCV(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  let y = 20;
  
  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(data.profile.name, 20, y);
  y += 10;
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(data.profile.title, 20, y);
  y += 15;
  
  // Bio
  doc.setFontSize(12);
  const bioLines = doc.splitTextToSize(data.profile.bio, 170);
  doc.text(bioLines, 20, y);
  y += bioLines.length * 5 + 10;
  
  // Contact
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTACT', 20, y);
  y += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Email: ${data.profile.links.email}`, 20, y);
  y += 6;
  doc.text(`LinkedIn: ${data.profile.links.linkedin}`, 20, y);
  y += 6;
  doc.text(`GitHub: ${data.profile.links.github}`, 20, y);
  y += 6;
  doc.text(`Portfolio: ${data.profile.links.portfolio}`, 20, y);
  y += 15;
  
  // Tech Stack
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TECH STACK', 20, y);
  y += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(data.techStack.join(', '), 20, y);
  y += 15;
  
  // Experience
  if (data.experience && data.experience.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EXPERIENCE', 20, y);
    y += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    data.experience.forEach(exp => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${exp.title} at ${exp.company}`, 20, y);
      y += 6;
      
      doc.setFont('helvetica', 'normal');
      const duration = `${exp.startDate} - ${exp.endDate}`;
      const location = exp.location ? ` | ${exp.location}` : '';
      doc.text(`${duration}${location}`, 20, y);
      y += 8;
    });
    
    y += 5;
  }
  
  // Education
  if (data.education && data.education.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', 20, y);
    y += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    data.education.forEach(edu => {
      doc.setFont('helvetica', 'bold');
      doc.text(edu.licence, 20, y);
      y += 6;
      
      doc.setFont('helvetica', 'normal');
      const location = edu.location ? `, ${edu.location}` : '';
      doc.text(`${edu.university}${location}`, 20, y);
      y += 6;
      
      const years = `${edu.startDate} - ${edu.endDate}`;
      const gpa = edu.graduate ? ` | GPA: ${edu.graduate}` : '';
      doc.text(`${years}${gpa}`, 20, y);
      y += 8;
    });
  }
  
  // Download
  doc.save(`${data.profile.name.replace(' ', '_')}_CV.pdf`);
}

function updateStatusBar(user) {
  const statusLocation = document.getElementById('statusLocation');
  const statusBirthday = document.getElementById('statusBirthday');
  
  if (user && user.location) {
    statusLocation.innerHTML = `<span class="material-symbols-outlined text-[9px] align-middle">location_on</span> ${user.location.charAt(0).toUpperCase() + user.location.slice(1)}`;
  }
  
  if (user && user.birthday) {
    statusBirthday.innerHTML = `<span class="material-symbols-outlined text-[9px] align-middle">cake</span> ${user.birthday}`;
  }
}

// Update current time in header
function updateTime() {
  // Yerel saat - 24 saatlik format
  const localTime = new Date().toLocaleString('tr-TR', { 
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  document.getElementById('currentTime').textContent = localTime;
}

// Dark mode toggle
function initDarkModeToggle() {
  const html = document.documentElement;
  
  // Check for saved preference or default to system preference
  const savedMode = localStorage.getItem('darkMode');
  const isDark = savedMode === 'true' || 
    (savedMode === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    html.classList.add('dark');
    updateDarkModeIcon(true);
  } else {
    html.classList.remove('dark');
    updateDarkModeIcon(false);
  }
  
  // Add event listener for toggle button
  const toggleBtn = document.getElementById('darkModeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleDarkMode);
  }
  
  // Listen for system theme changes only if user hasn't set a manual preference
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
      // Only auto-update if user hasn't manually set a preference
      if (localStorage.getItem('darkMode') === null) {
        if (e.matches) {
          html.classList.add('dark');
          updateDarkModeIcon(true);
        } else {
          html.classList.remove('dark');
          updateDarkModeIcon(false);
        }
      }
    });
  }
}

// Update dark mode icon based on current mode
function updateDarkModeIcon(isDark) {
  const icon = document.getElementById('darkModeIcon');
  if (icon) {
    icon.textContent = isDark ? 'light_mode' : 'dark_mode';
  }
}

// Toggle dark mode
function toggleDarkMode() {
  const html = document.documentElement;
  const isDarkNow = html.classList.contains('dark');
  
  if (isDarkNow) {
    html.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    updateDarkModeIcon(false);
  } else {
    html.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
    updateDarkModeIcon(true);
  }
}

// Tab switching for projects
function setupTabSwitching() {
  const tabs = document.querySelectorAll('.projectTab');
  const indieAppsGrid = document.getElementById('indieAppsGrid');
  const openSourceGrid = document.getElementById('openSourceGrid');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Remove active state from all tabs
      tabs.forEach(t => {
        t.classList.remove('text-primary', 'bg-window-light', 'dark:bg-window-dark');
        t.classList.add('text-gray-500', 'bg-transparent', 'hover:bg-black/5', 'dark:hover:bg-white/5');
      });
      
      // Add active state to clicked tab
      tab.classList.remove('text-gray-500', 'bg-transparent', 'hover:bg-black/5', 'dark:hover:bg-white/5');
      tab.classList.add('text-primary', 'bg-window-light', 'dark:bg-window-dark');
      
      // Hide all grids
      indieAppsGrid.style.display = 'none';
      openSourceGrid.style.display = 'none';
      
      // Show selected grid
      if (tabName === 'indie') {
        indieAppsGrid.style.display = 'grid';
      } else if (tabName === 'opensource') {
        openSourceGrid.style.display = 'block';
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initDarkModeToggle();
  loadData();
  updateTime();
  setInterval(updateTime, 1000); // Update time every second
  
  // Setup CV button after a short delay to ensure DOM is ready
  setTimeout(() => {
    const cvBtn = document.getElementById('cvBtn') || document.querySelector('#cvBtn');
    if (cvBtn) {
      cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Load data again or use cached data
        fetch('data.json')
          .then(response => response.json())
          .then(data => generateCV(data))
          .catch(error => console.error('Error loading data for CV:', error));
      });
    }
  }, 100);
});
