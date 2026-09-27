/**
 * SafeSphere - Blogs Engine Module with Full CRUD (Create, Read, Update, Delete)
 * Supports:
 * - Dynamic Search, Category Filtering, Sort
 * - Create New Blog (Saved to LocalStorage)
 * - Edit / Modify Existing Blog
 * - Delete Blog (with Confirmation)
 * - My Blogs View for Logged-In User
 * - Modal Reader with Text-to-Speech, Likes, Bookmarks, and Comments
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogsEngine();
});

// Global reference for re-rendering
window.renderBlogsList = null;
window.openBlogEditorModal = null;

function initBlogsEngine() {
  const blogsGrid = document.getElementById('blogsGrid');
  const searchInput = document.getElementById('blogSearchInput');
  const sortSelect = document.getElementById('blogSortSelect');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const blogsCountEl = document.getElementById('blogsCount');

  // Load custom data from LocalStorage
  let activeCategory = 'all';
  let searchQuery = '';
  let activeSort = 'latest';

  // Check URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const articleParam = urlParams.get('id');
  const actionParam = urlParams.get('action');

  if (categoryParam) {
    activeCategory = categoryParam;
    categoryPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-category') === categoryParam);
    });
  }

  // Helper: Retrieve all active blogs (default + custom - deleted + edited)
  window.getAllSafeSphereBlogs = function() {
    if (!window.SafeSphereData || !window.SafeSphereData.blogs) return [];

    const defaultBlogs = window.SafeSphereData.blogs;
    const customBlogs = JSON.parse(localStorage.getItem('safesphere_custom_blogs') || '[]');
    const deletedIds = JSON.parse(localStorage.getItem('safesphere_deleted_blogs') || '[]');
    const editedMap = JSON.parse(localStorage.getItem('safesphere_edited_blogs') || '{}');

    // Combine custom (newest first) and default
    let combined = [...customBlogs, ...defaultBlogs];

    // Filter out deleted
    combined = combined.filter(b => !deletedIds.includes(b.id));

    // Apply edits
    combined = combined.map(b => {
      if (editedMap[b.id]) {
        return { ...b, ...editedMap[b.id] };
      }
      return b;
    });

    return combined;
  };

  // Render blogs list
  function render() {
    if (!blogsGrid) return;

    const storedLikes = JSON.parse(localStorage.getItem('safesphere_likes') || '{}');
    const storedBookmarks = JSON.parse(localStorage.getItem('safesphere_bookmarks') || '[]');
    const currentUser = window.SafeSphereAuth ? window.SafeSphereAuth.getCurrentUser() : null;

    let list = window.getAllSafeSphereBlogs();

    // 1. Filter by Category / Bookmarked / My Blogs
    if (activeCategory === 'saved') {
      list = list.filter(b => storedBookmarks.includes(b.id));
    } else if (activeCategory === 'my-blogs') {
      if (currentUser) {
        list = list.filter(b => b.author && (b.author.email === currentUser.email || b.author.name === currentUser.name || b.author.id === currentUser.id));
      } else {
        list = [];
      }
    } else if (activeCategory !== 'all') {
      list = list.filter(b => b.categorySlug === activeCategory || b.category.toLowerCase().replace(/\s+/g, '-') === activeCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(b => 
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        (b.author && b.author.name.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q) ||
        (b.tags && b.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // 3. Sort
    if (activeSort === 'latest') {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (activeSort === 'popular') {
      list.sort((a, b) => {
        const likesA = (storedLikes[a.id] ? a.likes + 1 : a.likes);
        const likesB = (storedLikes[b.id] ? b.likes + 1 : b.likes);
        return likesB - likesA;
      });
    } else if (activeSort === 'readtime') {
      list.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    }

    // Update count indicator
    if (blogsCountEl) {
      blogsCountEl.textContent = `Showing ${list.length} ${list.length === 1 ? 'Article' : 'Articles'}${activeCategory === 'my-blogs' ? ' (Authored by you)' : ''}`;
    }

    // Render Cards or Empty State
    if (list.length === 0) {
      blogsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">✍️</div>
          <h3 style="font-size: 1.4rem;">No articles found in this view</h3>
          <p style="margin: 0.5rem 0 1.5rem; color: var(--text-secondary);">
            ${activeCategory === 'my-blogs' ? 'You have not written any safety blogs yet. Start creating your first guide!' : 'Try adjusting your search query or clear active filters.'}
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" id="emptyWriteBtn">✍️ Write New Safety Blog</button>
            <button class="btn btn-secondary btn-sm" id="resetFilterBtn">Show All Articles</button>
          </div>
        </div>
      `;

      const emptyWriteBtn = document.getElementById('emptyWriteBtn');
      if (emptyWriteBtn) {
        emptyWriteBtn.addEventListener('click', () => window.openBlogEditorModal());
      }

      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'all'));
          render();
        });
      }
      return;
    }

    blogsGrid.innerHTML = list.map(blog => {
      const isLiked = !!storedLikes[blog.id];
      const isSaved = storedBookmarks.includes(blog.id);
      const currentLikes = isLiked ? blog.likes + 1 : blog.likes;
      
      // Check if logged in user has permission to edit/delete
      const canManage = currentUser && (
        currentUser.role.includes('Admin') ||
        (blog.author && (blog.author.email === currentUser.email || blog.author.name === currentUser.name || blog.author.id === currentUser.id))
      );

      return `
        <article class="blog-card" data-id="${blog.id}">
          <div class="blog-card-media">
            <img src="${blog.image}" alt="${blog.title}" loading="lazy" />
            <span class="blog-category-badge">${blog.category}</span>
            ${canManage ? `<span class="badge badge-success blog-owner-tag">Your Article</span>` : ''}
          </div>
          <div class="blog-card-body">
            <div class="blog-meta-top">
              <span>📅 ${blog.date}</span>
              <span>⏱️ ${blog.readTime}</span>
            </div>
            <h3 class="blog-card-title">${blog.title}</h3>
            <p class="blog-card-desc">${blog.excerpt}</p>
            <div class="blog-card-footer">
              <div class="blog-author">
                <img src="${blog.author.avatar}" alt="${blog.author.name}" class="blog-author-img" />
                <div>
                  <div class="blog-author-name">${blog.author.name}</div>
                  <div class="blog-author-role">${blog.author.role || 'Contributor'}</div>
                </div>
              </div>
              <div class="blog-card-actions">
                <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${blog.id}" title="Like this article">
                  <span>${isLiked ? '❤️' : '🤍'}</span>
                  <span class="like-count">${currentLikes}</span>
                </button>
                <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${blog.id}" title="Save / Bookmark">
                  <span>${isSaved ? '🔖' : '📑'}</span>
                </button>
              </div>
            </div>

            <!-- Action buttons: Read + (Edit / Delete if author/admin) -->
            <div style="margin-top: 1.25rem; display: flex; gap: 0.5rem; align-items: center;">
              <button class="btn btn-primary btn-sm read-article-btn" data-id="${blog.id}" style="flex-grow: 1;">
                Read Article →
              </button>
              ${canManage ? `
                <button class="btn btn-secondary btn-sm edit-blog-btn" data-id="${blog.id}" title="Edit / Modify Article">
                  ✏️ Edit
                </button>
                <button class="btn btn-danger btn-sm delete-blog-btn" data-id="${blog.id}" title="Delete Article">
                  🗑️
                </button>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachCardEvents();
  }

  window.renderBlogsList = render;

  function attachCardEvents() {
    // Like button
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const storedLikes = JSON.parse(localStorage.getItem('safesphere_likes') || '{}');
        if (storedLikes[id]) {
          delete storedLikes[id];
          if (window.SafeSphereUtils) window.SafeSphereUtils.showToast('Removed from liked articles', 'info');
        } else {
          storedLikes[id] = true;
          if (window.SafeSphereUtils) window.SafeSphereUtils.showToast('❤️ Liked article!', 'success');
        }
        localStorage.setItem('safesphere_likes', JSON.stringify(storedLikes));
        render();
      });
    });

    // Bookmark button
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        let storedBookmarks = JSON.parse(localStorage.getItem('safesphere_bookmarks') || '[]');
        if (storedBookmarks.includes(id)) {
          storedBookmarks = storedBookmarks.filter(item => item !== id);
          if (window.SafeSphereUtils) window.SafeSphereUtils.showToast('Removed from bookmarks', 'info');
        } else {
          storedBookmarks.push(id);
          if (window.SafeSphereUtils) window.SafeSphereUtils.showToast('🔖 Saved to bookmarks!', 'success');
        }
        localStorage.setItem('safesphere_bookmarks', JSON.stringify(storedBookmarks));
        render();
      });
    });

    // Read Article button
    document.querySelectorAll('.read-article-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openArticleModal(id);
      });
    });

    // Edit Article button
    document.querySelectorAll('.edit-blog-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        window.openBlogEditorModal(id);
      });
    });

    // Delete Article button
    document.querySelectorAll('.delete-blog-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        confirmDeleteBlog(id);
      });
    });
  }

  // Filter Listeners
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      render();
    });
  }

  // Initial render
  render();

  // If page loaded with ?id=xxx
  if (articleParam) {
    setTimeout(() => openArticleModal(articleParam), 300);
  }

  // If page loaded with ?action=write
  if (actionParam === 'write') {
    setTimeout(() => window.openBlogEditorModal(), 400);
  }
}

/* ==========================================================================
   Create & Edit Blog Modal Engine (CRUD)
   ========================================================================== */
window.openBlogEditorModal = function(blogIdToEdit = null) {
  const currentUser = window.SafeSphereAuth ? window.SafeSphereAuth.getCurrentUser() : null;

  // If not logged in, prompt login modal
  if (!currentUser) {
    if (window.SafeSphereUtils) {
      window.SafeSphereUtils.showToast("Please sign in or register to publish or edit safety blogs.", "info");
    }
    if (window.SafeSphereAuth) {
      window.SafeSphereAuth.openAuthModal('login');
    }
    return;
  }

  let existingBlog = null;
  if (blogIdToEdit) {
    const allBlogs = window.getAllSafeSphereBlogs ? window.getAllSafeSphereBlogs() : [];
    existingBlog = allBlogs.find(b => b.id === blogIdToEdit);
  }

  let modal = document.getElementById('blogEditorModalOverlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'blogEditorModalOverlay';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const isEditing = !!existingBlog;

  modal.innerHTML = `
    <div class="modal-content blog-editor-modal" role="dialog" aria-modal="true" style="max-width: 860px;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.5rem;">${isEditing ? '✏️' : '✍️'}</span>
          <div>
            <h2 style="font-size: 1.35rem; margin: 0;">${isEditing ? 'Edit Safety Blog Article' : 'Write & Publish New Safety Blog'}</h2>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Author: <strong>${currentUser.name}</strong> (${currentUser.role})</span>
          </div>
        </div>
        <button class="btn-icon" id="editorCloseBtn" aria-label="Close">✕</button>
      </div>

      <div class="modal-body" style="padding: 1.75rem;">
        <form id="blogEditorForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Title -->
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">Article Title *</label>
            <input 
              type="text" 
              id="editorTitle" 
              class="comment-input" 
              style="width: 100%; font-size: 1.05rem;" 
              placeholder="e.g. 5 Critical Rules for Surviving Night-Time Public Transit" 
              value="${isEditing ? escapeAttribute(existingBlog.title) : ''}" 
              required 
            />
          </div>

          <!-- Category & Read Time -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">Safety Domain / Category *</label>
              <select id="editorCategory" class="comment-input" style="width: 100%;" required>
                <option value="Personal Safety" ${isEditing && existingBlog.category === 'Personal Safety' ? 'selected' : ''}>Personal Safety</option>
                <option value="Road Safety" ${isEditing && existingBlog.category === 'Road Safety' ? 'selected' : ''}>Road Safety</option>
                <option value="Cyber Safety" ${isEditing && existingBlog.category === 'Cyber Safety' ? 'selected' : ''}>Cyber Safety</option>
                <option value="Emergency Preparedness" ${isEditing && existingBlog.category === 'Emergency Preparedness' ? 'selected' : ''}>Emergency Preparedness</option>
                <option value="Campus Safety" ${isEditing && existingBlog.category === 'Campus Safety' ? 'selected' : ''}>Campus Safety</option>
                <option value="Disaster Safety" ${isEditing && existingBlog.category === 'Disaster Safety' ? 'selected' : ''}>Disaster Safety</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">Estimated Read Time</label>
              <input 
                type="text" 
                id="editorReadTime" 
                class="comment-input" 
                style="width: 100%;" 
                placeholder="e.g. 5 min read" 
                value="${isEditing ? escapeAttribute(existingBlog.readTime) : '4 min read'}" 
              />
            </div>
          </div>

          <!-- Image URL & Preset Pickers -->
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">Cover Image URL</label>
            <input 
              type="url" 
              id="editorImage" 
              class="comment-input" 
              style="width: 100%; font-size: 0.9rem;" 
              placeholder="https://images.unsplash.com/..." 
              value="${isEditing ? escapeAttribute(existingBlog.image) : 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80'}" 
            />
            <div style="display: flex; gap: 0.4rem; margin-top: 0.4rem; flex-wrap: wrap; align-items: center;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Sample Covers:</span>
              <button type="button" class="preset-pill preset-img-btn" data-url="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80">💻 Cyber Safety</button>
              <button type="button" class="preset-pill preset-img-btn" data-url="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80">🚗 Road Traffic</button>
              <button type="button" class="preset-pill preset-img-btn" data-url="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=900&q=80">🎒 Emergency Kit</button>
              <button type="button" class="preset-pill preset-img-btn" data-url="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80">🏫 Campus Life</button>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">Tags (comma separated)</label>
            <input 
              type="text" 
              id="editorTags" 
              class="comment-input" 
              style="width: 100%;" 
              placeholder="e.g. Solo Travel, Self-Defense, Awareness, Transit" 
              value="${isEditing && existingBlog.tags ? escapeAttribute(existingBlog.tags.join(', ')) : 'Safety, Awareness, Preparedness'}" 
            />
          </div>

          <!-- Excerpt -->
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">Short Excerpt / Summary *</label>
            <textarea 
              id="editorExcerpt" 
              class="comment-textarea" 
              rows="2" 
              placeholder="A brief 2-3 sentence overview of this safety article..." 
              required
            >${isEditing ? existingBlog.excerpt : ''}</textarea>
          </div>

          <!-- Full Content Body -->
          <div>
            <div class="flex-between" style="margin-bottom: 0.35rem;">
              <label style="font-size: 0.85rem; font-weight: 700;">Full Article Content (HTML / Text formatted) *</label>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Supports &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;</span>
            </div>
            <textarea 
              id="editorContent" 
              class="comment-textarea" 
              rows="8" 
              style="font-family: monospace; font-size: 0.95rem; line-height: 1.5;" 
              placeholder="<h3>1. Key Action Step</h3><p>Detailed safety instructions here...</p><div class='blog-callout tip'><strong>💡 Tip:</strong> Always keep emergency speed dial ready.</div>" 
              required
            >${isEditing ? existingBlog.content.trim() : `<h3>1. Overview & Immediate Actions</h3>\n<p>Explain the critical safety threat and what steps readers must immediately take...</p>\n\n<div class="blog-callout tip">\n  <strong>💡 Safety Guideline:</strong> Always maintain baseline awareness in unfamiliar environments.\n</div>\n\n<h3>2. Preventive Protocols</h3>\n<ul>\n  <li>Step 1: Check your surroundings.</li>\n  <li>Step 2: Keep emergency contacts programmed on your phone.</li>\n</ul>`}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem;">
            <button type="button" class="btn btn-secondary" id="editorCancelBtn">Cancel</button>
            <button type="submit" class="btn btn-primary btn-lg">
              ${isEditing ? '💾 Save Changes' : '🚀 Publish Safety Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Preset image handler
  modal.querySelectorAll('.preset-img-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('editorImage').value = btn.getAttribute('data-url');
    });
  });

  // Close handlers
  const closeBtn = document.getElementById('editorCloseBtn');
  const cancelBtn = document.getElementById('editorCancelBtn');

  function closeEditor() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeEditor);
  cancelBtn.addEventListener('click', closeEditor);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeEditor();
  });

  // Handle Form Submit
  const form = document.getElementById('blogEditorForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('editorTitle').value.trim();
    const category = document.getElementById('editorCategory').value;
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const readTime = document.getElementById('editorReadTime').value.trim() || '4 min read';
    const image = document.getElementById('editorImage').value.trim() || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80';
    const tags = document.getElementById('editorTags').value.split(',').map(t => t.trim()).filter(Boolean);
    const excerpt = document.getElementById('editorExcerpt').value.trim();
    const content = document.getElementById('editorContent').value.trim();

    if (isEditing) {
      // Modify existing blog
      const editedMap = JSON.parse(localStorage.getItem('safesphere_edited_blogs') || '{}');
      editedMap[existingBlog.id] = {
        title,
        category,
        categorySlug,
        readTime,
        image,
        tags,
        excerpt,
        content
      };
      localStorage.setItem('safesphere_edited_blogs', JSON.stringify(editedMap));

      // Also update in custom blogs if it was a user created one
      let customBlogs = JSON.parse(localStorage.getItem('safesphere_custom_blogs') || '[]');
      const customIdx = customBlogs.findIndex(b => b.id === existingBlog.id);
      if (customIdx !== -1) {
        customBlogs[customIdx] = {
          ...customBlogs[customIdx],
          title,
          category,
          categorySlug,
          readTime,
          image,
          tags,
          excerpt,
          content
        };
        localStorage.setItem('safesphere_custom_blogs', JSON.stringify(customBlogs));
      }

      closeEditor();
      if (window.SafeSphereUtils) window.SafeSphereUtils.showToast("✅ Article updated and saved successfully!", "success");
      if (typeof window.renderBlogsList === 'function') window.renderBlogsList();
    } else {
      // Create new blog
      const newBlog = {
        id: "blog_" + Date.now(),
        title,
        category,
        categorySlug,
        readTime,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: {
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role,
          email: currentUser.email,
          avatar: currentUser.avatar
        },
        image,
        excerpt,
        likes: 1,
        tags,
        content,
        comments: []
      };

      const customBlogs = JSON.parse(localStorage.getItem('safesphere_custom_blogs') || '[]');
      customBlogs.unshift(newBlog);
      localStorage.setItem('safesphere_custom_blogs', JSON.stringify(customBlogs));

      closeEditor();
      if (window.SafeSphereUtils) window.SafeSphereUtils.showToast("🎉 Your safety blog has been published live!", "success");
      if (typeof window.renderBlogsList === 'function') window.renderBlogsList();
    }
  });
};

/* ==========================================================================
   Delete Blog Confirmation Dialog (CRUD)
   ========================================================================== */
function confirmDeleteBlog(blogId) {
  const allBlogs = window.getAllSafeSphereBlogs ? window.getAllSafeSphereBlogs() : [];
  const blog = allBlogs.find(b => b.id === blogId);
  if (!blog) return;

  let modal = document.getElementById('deleteConfirmModalOverlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'deleteConfirmModalOverlay';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 460px; padding: 2rem; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">🗑️</div>
      <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">Delete Safety Article?</h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
        Are you sure you want to delete <strong>"${escapeHTML(blog.title)}"</strong>? This action cannot be undone.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-secondary" id="cancelDeleteBtn">Cancel</button>
        <button class="btn btn-danger" id="confirmDeleteBtn">Yes, Delete Article</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  function closeDeleteModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDeleteModal();
  });

  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    // 1. If in custom blogs, remove from array
    let customBlogs = JSON.parse(localStorage.getItem('safesphere_custom_blogs') || '[]');
    customBlogs = customBlogs.filter(b => b.id !== blogId);
    localStorage.setItem('safesphere_custom_blogs', JSON.stringify(customBlogs));

    // 2. Also mark in deleted list so default blogs can be deleted
    const deletedIds = JSON.parse(localStorage.getItem('safesphere_deleted_blogs') || '[]');
    if (!deletedIds.includes(blogId)) {
      deletedIds.push(blogId);
      localStorage.setItem('safesphere_deleted_blogs', JSON.stringify(deletedIds));
    }

    closeDeleteModal();
    if (window.SafeSphereUtils) window.SafeSphereUtils.showToast("🗑️ Article was deleted successfully.", "info");
    if (typeof window.renderBlogsList === 'function') window.renderBlogsList();
  });
}

/* ==========================================================================
   Dynamic Article Reader Modal & Comments Engine
   ========================================================================== */
function openArticleModal(blogId) {
  const allBlogs = window.getAllSafeSphereBlogs ? window.getAllSafeSphereBlogs() : (window.SafeSphereData.blogs || []);
  const blog = allBlogs.find(b => b.id === blogId);
  if (!blog) return;

  const currentUser = window.SafeSphereAuth ? window.SafeSphereAuth.getCurrentUser() : null;
  const canManage = currentUser && (
    currentUser.role.includes('Admin') ||
    (blog.author && (blog.author.email === currentUser.email || blog.author.name === currentUser.name || blog.author.id === currentUser.id))
  );

  let modalOverlay = document.getElementById('blogArticleModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'blogArticleModal';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const storedComments = JSON.parse(localStorage.getItem('safesphere_comments') || '{}');
  const allComments = [...(blog.comments || []), ...(storedComments[blog.id] || [])];

  modalOverlay.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="badge badge-primary">${blog.category}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">⏱️ ${blog.readTime}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          ${canManage ? `
            <button class="btn btn-secondary btn-sm" id="modalEditBtn">✏️ Edit</button>
            <button class="btn btn-danger btn-sm" id="modalDeleteBtn">🗑️ Delete</button>
          ` : ''}
          <button class="btn btn-secondary btn-sm" id="modalSpeechBtn" title="Listen to Article">
            🔊 Listen
          </button>
          <button class="btn-icon" id="modalCloseBtn" aria-label="Close modal">✕</button>
        </div>
      </div>
      <div class="modal-body" id="modalBody">
        <div style="margin-bottom: 1.5rem;">
          <h1 style="font-size: 2rem; margin-bottom: 0.75rem;">${blog.title}</h1>
          <div style="display: flex; align-items: center; gap: 1rem; color: var(--text-muted); font-size: 0.9rem;">
            <span>By <strong>${blog.author.name}</strong> (${blog.author.role || 'Contributor'})</span>
            <span>•</span>
            <span>${blog.date}</span>
          </div>
        </div>

        <div style="border-radius: 12px; overflow: hidden; margin-bottom: 2rem; max-height: 380px;">
          <img src="${blog.image}" alt="${blog.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>

        <div class="blog-rendered-content">
          ${blog.content}
        </div>

        <!-- Tags List -->
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 2rem;">
          ${blog.tags ? blog.tags.map(t => `<span class="badge" style="background: var(--bg-subtle); color: var(--text-secondary);">#${t}</span>`).join('') : ''}
        </div>

        <!-- Comments Section -->
        <section class="comments-section">
          <h3>Community Insights & Comments (${allComments.length})</h3>
          
          <form class="comment-form" id="commentSubmitForm">
            <input 
              type="text" 
              id="commentAuthor" 
              class="comment-input" 
              placeholder="Your Name" 
              value="${currentUser ? escapeAttribute(currentUser.name) : ''}" 
              required 
            />
            <textarea id="commentText" class="comment-textarea" rows="3" placeholder="Share your safety tip or thoughts on this article..." required></textarea>
            <div style="text-align: right;">
              <button type="submit" class="btn btn-primary btn-sm">Post Comment</button>
            </div>
          </form>

          <div class="comments-list" id="modalCommentsList">
            ${renderCommentsHTML(allComments)}
          </div>
        </section>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modalCloseBtn');
  const speechBtn = document.getElementById('modalSpeechBtn');
  const commentForm = document.getElementById('commentSubmitForm');

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (speechBtn) {
    speechBtn.addEventListener('click', () => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = blog.content;
      const cleanText = `${blog.title}. ${tempDiv.textContent || tempDiv.innerText || ''}`;
      if (window.SafeSphereUtils) window.SafeSphereUtils.speakText(cleanText);
    });
  }

  // Modal Edit & Delete
  const modalEditBtn = document.getElementById('modalEditBtn');
  if (modalEditBtn) {
    modalEditBtn.addEventListener('click', () => {
      closeModal();
      window.openBlogEditorModal(blog.id);
    });
  }

  const modalDeleteBtn = document.getElementById('modalDeleteBtn');
  if (modalDeleteBtn) {
    modalDeleteBtn.addEventListener('click', () => {
      closeModal();
      confirmDeleteBlog(blog.id);
    });
  }

  // Handle Comment Submission
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('commentAuthor').value.trim();
    const text = document.getElementById('commentText').value.trim();

    if (!author || !text) return;

    const newComment = {
      id: Date.now(),
      user: author,
      text: text,
      date: 'Just now'
    };

    if (!storedComments[blog.id]) storedComments[blog.id] = [];
    storedComments[blog.id].unshift(newComment);
    localStorage.setItem('safesphere_comments', JSON.stringify(storedComments));

    allComments.unshift(newComment);
    document.getElementById('modalCommentsList').innerHTML = renderCommentsHTML(allComments);
    document.getElementById('commentText').value = '';
    if (window.SafeSphereUtils) window.SafeSphereUtils.showToast('💬 Your comment was posted successfully!', 'success');
  });
}

function renderCommentsHTML(comments) {
  if (comments.length === 0) {
    return `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1.5rem 0;">No comments yet. Be the first to start the safety discussion!</p>`;
  }
  return comments.map(c => `
    <div class="comment-bubble">
      <div class="comment-header">
        <span class="comment-user">👤 ${c.user}</span>
        <span style="color: var(--text-muted); font-size: 0.75rem;">${c.date}</span>
      </div>
      <p style="font-size: 0.95rem; margin: 0; color: var(--text-secondary);">${c.text}</p>
    </div>
  `).join('');
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function escapeAttribute(str) {
  return String(str).replace(/"/g, '&quot;');
}
