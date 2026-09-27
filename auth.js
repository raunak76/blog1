/**
 * SafeSphere - User Authentication & Session Management Module
 * Supports Simple Client-Side Registration, Login, Demo Accounts,
 * and Persistent Session via LocalStorage.
 */

const SafeSphereAuth = {
  // Default demo accounts for quick testing & presentation
  defaultAccounts: [
    {
      id: "user_admin",
      name: "Dr. Elena Vance",
      email: "admin@safesphere.org",
      password: "password123",
      role: "Safety Lead & Admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "user_student",
      name: "Raunak Kumar",
      email: "student@safesphere.org",
      password: "password123",
      role: "Community Author",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    }
  ],

  // Get current logged-in user
  getCurrentUser() {
    try {
      const user = localStorage.getItem('safesphere_current_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  // Get all registered users from LocalStorage + defaults
  getUsers() {
    const customUsers = JSON.parse(localStorage.getItem('safesphere_registered_users') || '[]');
    return [...this.defaultAccounts, ...customUsers];
  },

  // Register a new user
  register(name, email, password, role = "Community Contributor") {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: "An account with this email already exists!" };
    }

    const newUser = {
      id: "user_" + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      role: role,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`
    };

    const customUsers = JSON.parse(localStorage.getItem('safesphere_registered_users') || '[]');
    customUsers.push(newUser);
    localStorage.setItem('safesphere_registered_users', JSON.stringify(customUsers));

    // Auto login
    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  // Login with email and password
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    } else {
      return { success: false, message: "Invalid email or password. Try demo accounts below!" };
    }
  },

  // Set current user session
  setCurrentUser(user) {
    localStorage.setItem('safesphere_current_user', JSON.stringify(user));
    this.updateNavbarAuthUI();
  },

  // Logout current user
  logout() {
    localStorage.removeItem('safesphere_current_user');
    this.updateNavbarAuthUI();
    if (typeof window.renderBlogsList === 'function') {
      window.renderBlogsList();
    }
    if (window.SafeSphereUtils && window.SafeSphereUtils.showToast) {
      window.SafeSphereUtils.showToast("Logged out successfully.", "info");
    }
  },

  // Update Navbar UI depending on auth state
  updateNavbarAuthUI() {
    const user = this.getCurrentUser();
    const authContainer = document.getElementById('navbarAuthContainer');
    if (!authContainer) return;

    if (user) {
      authContainer.innerHTML = `
        <div class="user-profile-menu">
          <button class="user-profile-btn" id="userProfileBtn" title="Account Menu">
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar-sm" />
            <span class="user-display-name">${user.name.split(' ')[0]}</span>
            <span style="font-size: 0.75rem;">▼</span>
          </button>
          <div class="user-dropdown-menu" id="userDropdownMenu">
            <div class="dropdown-header">
              <strong>${user.name}</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${user.email}</div>
              <span class="badge badge-primary" style="margin-top: 4px; font-size: 0.7rem;">${user.role}</span>
            </div>
            <button class="dropdown-item" id="navWriteBlogBtn">
              <span>✍️</span> Write New Blog
            </button>
            <button class="dropdown-item" id="navMyBlogsBtn">
              <span>📚</span> Manage My Blogs
            </button>
            <button class="dropdown-item logout-item" id="navLogoutBtn">
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      `;

      // Attach Dropdown toggle
      const profileBtn = document.getElementById('userProfileBtn');
      const dropdown = document.getElementById('userDropdownMenu');
      if (profileBtn && dropdown) {
        profileBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
            dropdown.classList.remove('show');
          }
        });
      }

      // Attach actions
      const writeBtn = document.getElementById('navWriteBlogBtn');
      if (writeBtn) {
        writeBtn.addEventListener('click', () => {
          dropdown.classList.remove('show');
          if (typeof window.openBlogEditorModal === 'function') {
            window.openBlogEditorModal();
          } else {
            window.location.href = 'blogs.html?action=write';
          }
        });
      }

      const myBlogsBtn = document.getElementById('navMyBlogsBtn');
      if (myBlogsBtn) {
        myBlogsBtn.addEventListener('click', () => {
          dropdown.classList.remove('show');
          window.location.href = 'blogs.html?category=my-blogs';
        });
      }

      const logoutBtn = document.getElementById('navLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          this.logout();
        });
      }
    } else {
      authContainer.innerHTML = `
        <button class="btn btn-secondary btn-sm" id="navLoginBtn" style="font-weight: 700;">
          <span>👤 Login / Register</span>
        </button>
      `;

      const loginBtn = document.getElementById('navLoginBtn');
      if (loginBtn) {
        loginBtn.addEventListener('click', () => {
          this.openAuthModal();
        });
      }
    }
  },

  // Open Auth Modal (Login / Signup)
  openAuthModal(defaultMode = "login") {
    let modal = document.getElementById('authModalOverlay');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'authModalOverlay';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content auth-modal-box" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.4rem;">🔐</span>
            <h2 style="font-size: 1.3rem; margin: 0;">SafeSphere Account</h2>
          </div>
          <button class="btn-icon" id="authModalCloseBtn" aria-label="Close">✕</button>
        </div>

        <div class="modal-body" style="padding: 1.75rem;">
          <!-- Mode Tabs (Login / Register) -->
          <div class="auth-tabs">
            <button class="auth-tab-btn ${defaultMode === 'login' ? 'active' : ''}" id="tabLoginBtn">Sign In</button>
            <button class="auth-tab-btn ${defaultMode === 'register' ? 'active' : ''}" id="tabRegisterBtn">Create Account</button>
          </div>

          <!-- Login Form -->
          <form id="loginForm" style="${defaultMode === 'login' ? 'display: flex;' : 'display: none;'} flex-direction: column; gap: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">Email Address</label>
              <input type="email" id="loginEmail" class="comment-input" style="width: 100%;" placeholder="e.g. admin@safesphere.org" required />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">Password</label>
              <input type="password" id="loginPassword" class="comment-input" style="width: 100%;" placeholder="••••••••" required />
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; width: 100%;">
              Sign In to SafeSphere →
            </button>

            <!-- Quick Demo Login Buttons for College Presentation / Testing -->
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); text-align: center;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                🚀 Quick 1-Click Demo Login:
              </span>
              <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 0.6rem; flex-wrap: wrap;">
                <button type="button" class="btn btn-secondary btn-sm" id="demoAdminBtn">
                  👨‍🏫 Demo Lead (Dr. Vance)
                </button>
                <button type="button" class="btn btn-secondary btn-sm" id="demoStudentBtn">
                  🎓 Demo Author (Raunak)
                </button>
              </div>
            </div>
          </form>

          <!-- Register Form -->
          <form id="registerForm" style="${defaultMode === 'register' ? 'display: flex;' : 'display: none;'} flex-direction: column; gap: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">Full Name</label>
              <input type="text" id="regName" class="comment-input" style="width: 100%;" placeholder="e.g. Priya Sharma" required />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">Email Address</label>
              <input type="email" id="regEmail" class="comment-input" style="width: 100%;" placeholder="priya@example.com" required />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">Password</label>
              <input type="password" id="regPassword" class="comment-input" style="width: 100%;" placeholder="Minimum 6 characters" minlength="6" required />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem;">Role / Designation</label>
              <select id="regRole" class="comment-input" style="width: 100%;">
                <option value="Safety Contributor">Safety Contributor</option>
                <option value="Student Researcher">Student Researcher</option>
                <option value="Emergency Volunteer">Emergency Volunteer</option>
                <option value="Cyber Specialist">Cyber Specialist</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; width: 100%;">
              Create Author Account 🚀
            </button>
          </form>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Event handlers
    const closeBtn = document.getElementById('authModalCloseBtn');
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');
    const formLogin = document.getElementById('loginForm');
    const formReg = document.getElementById('registerForm');

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabReg.classList.remove('active');
      formLogin.style.display = 'flex';
      formReg.style.display = 'none';
    });

    tabReg.addEventListener('click', () => {
      tabReg.classList.add('active');
      tabLogin.classList.remove('active');
      formReg.style.display = 'flex';
      formLogin.style.display = 'none';
    });

    // 1-Click Demo Logins
    document.getElementById('demoAdminBtn').addEventListener('click', () => {
      const res = SafeSphereAuth.login("admin@safesphere.org", "password123");
      if (res.success) {
        closeModal();
        if (window.SafeSphereUtils) window.SafeSphereUtils.showToast("Welcome Dr. Elena Vance (Admin Lead)!", "success");
        if (typeof window.renderBlogsList === 'function') window.renderBlogsList();
      }
    });

    document.getElementById('demoStudentBtn').addEventListener('click', () => {
      const res = SafeSphereAuth.login("student@safesphere.org", "password123");
      if (res.success) {
        closeModal();
        if (window.SafeSphereUtils) window.SafeSphereUtils.showToast("Welcome Raunak Kumar!", "success");
        if (typeof window.renderBlogsList === 'function') window.renderBlogsList();
      }
    });

    // Handle Login Submit
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value;

      const res = SafeSphereAuth.login(email, pass);
      if (res.success) {
        closeModal();
        if (window.SafeSphereUtils) window.SafeSphereUtils.showToast(`🎉 Logged in as ${res.user.name}`, "success");
        if (typeof window.renderBlogsList === 'function') window.renderBlogsList();
      } else {
        if (window.SafeSphereUtils) window.SafeSphereUtils.showToast(res.message, "danger");
      }
    });

    // Handle Register Submit
    formReg.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const pass = document.getElementById('regPassword').value;
      const role = document.getElementById('regRole').value;

      const res = SafeSphereAuth.register(name, email, pass, role);
      if (res.success) {
        closeModal();
        if (window.SafeSphereUtils) window.SafeSphereUtils.showToast(`🎉 Welcome to SafeSphere, ${res.user.name}! You can now write and manage blogs.`, "success");
        if (typeof window.renderBlogsList === 'function') window.renderBlogsList();
      } else {
        if (window.SafeSphereUtils) window.SafeSphereUtils.showToast(res.message, "danger");
      }
    });
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  SafeSphereAuth.updateNavbarAuthUI();
});

// Expose globally
window.SafeSphereAuth = SafeSphereAuth;
