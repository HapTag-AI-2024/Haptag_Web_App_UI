document.addEventListener('DOMContentLoaded', () => {

    // --- Sidebar Toggle Functionality ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    // --- User Profile Dropdown Toggle (Click-based) ---
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        const userProfileButton = userProfile.querySelector('.user-profile-button');
        userProfileButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the window click listener from firing immediately
            userProfile.classList.toggle('active');
        });
        // Close dropdown if clicked outside
        window.addEventListener('click', () => {
            if (userProfile.classList.contains('active')) {
                userProfile.classList.remove('active');
            }
        });
    }
        // --- Upload and Progress Bar Simulation ---
    const uploadButton = document.getElementById('upload-button');
    if (uploadButton) {
        console.log("Button Clicked");
        const uploadCard = document.getElementById('upload-card');
        const progressCard = document.getElementById('progress-card');
        const previewCard = document.getElementById('preview-card');
        const actionsDiv = document.getElementById('page-actions-div');

        uploadButton.addEventListener('click', () => {
            // 1. Hide upload card and show progress bar
            progressCard.style.display = 'block';

            // 2. Start filling the progress bar
            const progressBarInner = progressCard.querySelector('.progress-bar-inner');
            setTimeout(() => {
                progressBarInner.style.width = '100%';
            }, 100); // Small delay to ensure the element is rendered

            // 3. After progress is complete, show the preview
            setTimeout(() => {
                console.log("entered timeout");
                progressCard.style.display = 'none';
                previewCard.style.display = 'block';
                actionsDiv.style.display = 'flex';
            }, 2500); // Wait 2.5 seconds for the bar to fill
        });
    }
    
     // --- Loading Modal Functionality ---
    const detectBtn = document.getElementById('detect-anomalies-btn');
    if (detectBtn) {
        detectBtn.addEventListener('click', () => {
            const loaderHTML = `<div class="loader-overlay"><div class="loader-content"><h2>Analyzing Session</h2><div class="spinner"></div><p>Our AI models are scanning for anomalies.<br>This may take a few moments.</p></div></div>`;
            document.body.insertAdjacentHTML('beforeend', loaderHTML);
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 4000);
        });
    }
    
    // ===== Dashboard-Specific Functionality =====
    // We check if these elements exist before adding listeners to prevent errors on other pages.
    
    const lensTabs = document.querySelectorAll('.lens-tab');
    if (lensTabs.length > 0) {
        const views = document.querySelectorAll('.view');
        lensTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                lensTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const viewId = tab.dataset.view;
                views.forEach(view => {
                    view.style.display = view.id === viewId ? 'block' : 'none';
                });
            });
        });
    }

    // --- AI Analyst Report Tab Toggling ---
    const aiTabs = document.querySelectorAll('.ai-tab');
    const aiContents = document.querySelectorAll('.ai-summary-content');
    aiTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            aiTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            aiContents.forEach((content, contentIndex) => {
                content.style.display = index === contentIndex ? 'block' : 'none';
            });
        });
    });

    // --- Anomaly Table Context Row Toggling ---
    const actionButtons = document.querySelectorAll('.anomaly-table .icon-button');
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const row = button.closest('tr');
                const contextRow = row.nextElementSibling;

                if (contextRow && contextRow.classList.contains('context-row')) {
                    const isVisible = contextRow.style.display === 'table-row';
                    // Hide all other open context rows first
                    document.querySelectorAll('.context-row').forEach(cr => {
                        cr.style.display = 'none';
                    });
                    // Toggle the clicked row
                    contextRow.style.display = isVisible ? 'none' : 'table-row';
                }
            });
        });
    }

    
    // --- Interactive Checklist Strikethrough ---
    const checklistItems = document.querySelectorAll('.action-checklist input[type="checkbox"]');
    checklistItems.forEach(checkbox => {
        // Apply initial state based on 'checked' property
        if (checkbox.checked) {
            checkbox.closest('label').style.textDecoration = 'line-through';
            checkbox.closest('label').style.color = 'var(--text-light)';
        }
        
        // Add event listener for changes
        checkbox.addEventListener('change', (event) => {
            const label = event.target.closest('label');
            if (event.target.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = 'var(--text-light)';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = 'var(--dark-gray)';
            }
        });
    });
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        const firstHeader = accordionHeaders[0];
        if (firstHeader) {
            firstHeader.classList.add('active');
            const firstContent = firstHeader.nextElementSibling;
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        }
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isActive = header.classList.contains('active');
                
                // One-at-a-time accordion behavior
                accordionHeaders.forEach(h => {
                    h.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                });
                
                if (!isActive) {
                    header.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

});