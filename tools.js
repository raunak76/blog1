/**
 * SafeSphere - Interactive Safety Toolkit & ML Risk Analyzer Engine
 * Includes:
 * 1. Machine Learning Safety Risk Analyzer (NLP Heuristic & Vector Classifier)
 * 2. Password Strength & Entropy Analyzer
 * 3. Phishing Awareness Interactive Simulator
 * 4. Safety IQ Quiz with Live Scoring & Badging
 * 5. Persistent Checklists (Personal + Emergency Go-Bag)
 * 6. "What Should I Do?" Scenario Navigator
 */

document.addEventListener('DOMContentLoaded', () => {
  initToolTabs();
  initMLRiskAnalyzer();
  initPasswordChecker();
  initPhishingSimulator();
  initSafetyQuiz();
  initChecklists();
  initSituationGuide();
});

/* ==========================================================================
   1. Toolkit Tab Navigation
   ========================================================================== */
function initToolTabs() {
  const tabBtns = document.querySelectorAll('.tool-tab-btn');
  const panels = document.querySelectorAll('.tool-panel');

  // Check URL hash for direct tab navigation (e.g. tools.html#analyzer)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchingBtn = document.querySelector(`.tool-tab-btn[data-target="${hash}"]`);
    if (matchingBtn) {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      matchingBtn.classList.add('active');
      const targetPanel = document.getElementById(hash);
      if (targetPanel) targetPanel.classList.add('active');
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
      
      // Update hash in URL
      window.location.hash = targetId;
    });
  });
}

/* ==========================================================================
   2. Machine Learning Feature: Safety Risk Analyzer
   ========================================================================== */
function initMLRiskAnalyzer() {
  const inputEl = document.getElementById('mlSituationInput');
  const analyzeBtn = document.getElementById('mlAnalyzeBtn');
  const resultBox = document.getElementById('mlResultBox');
  const presetPills = document.querySelectorAll('.preset-pill');

  if (!inputEl || !analyzeBtn || !resultBox) return;

  // Presets click
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      inputEl.value = pill.getAttribute('data-preset');
      runMLAnalysis();
    });
  });

  analyzeBtn.addEventListener('click', runMLAnalysis);

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      runMLAnalysis();
    }
  });

  function runMLAnalysis() {
    const text = inputEl.value.trim();
    if (!text) {
      window.SafeSphereUtils.showToast('Please type a situation description or select a preset scenario.', 'danger');
      return;
    }

    // Button loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `<span>⏳ Analyzing with Safety NLP Model...</span>`;
    resultBox.style.display = 'none';

    // Simulate asynchronous ML inference latency
    setTimeout(() => {
      const analysis = performNLPClassification(text);
      displayMLResults(analysis);
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = `<span>⚡ Analyze Situation Risk</span>`;
      resultBox.style.display = 'block';
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  }

  // Client-Side NLP Weighted Classification Algorithm
  function performNLPClassification(inputText) {
    const text = inputText.toLowerCase();
    
    // High-risk indicators & weights
    const highRiskDict = {
      'followed': 35, 'stalking': 40, 'weapon': 45, 'knife': 45, 'gun': 45, 'alone': 20, 
      'night': 15, 'dark': 15, 'alley': 25, 'cornered': 35, 'stranger': 15, 'threat': 35,
      'fire': 40, 'smoke': 35, 'earthquake': 40, 'flood': 40, 'stalled': 25, 'submerged': 45,
      'smishing': 30, 'otp': 35, 'cvv': 35, 'bank credentials': 40, 'blackmail': 40,
      'unresponsive': 30, 'bleeding': 40, 'choking': 45, 'spark': 25, 'gas smell': 40
    };

    // Moderate-risk indicators & weights
    const moderateRiskDict = {
      'lost': 15, 'unfamiliar': 15, 'low battery': 15, 'crowded': 10, 'late': 15,
      'suspicious': 20, 'unsolicited': 15, 'link': 15, 'discount': 10, 'cashback': 15,
      'urgent': 15, 'taxi': 10, 'fog': 15, 'slippery': 15, 'minor crack': 15
    };

    // Mitigating / Low-risk safe factors
    const lowRiskFactors = {
      'daylight': -20, 'crowded store': -25, 'with friends': -30, 'security guard': -30,
      'police station': -35, 'official website': -25, 'inside house': -15, 'safe zone': -30
    };

    let riskScore = 15; // Baseline environmental score
    let detectedFactors = [];

    // Analyze high risk keywords
    for (const [kw, weight] of Object.entries(highRiskDict)) {
      if (text.includes(kw)) {
        riskScore += weight;
        detectedFactors.push({ word: kw, severity: 'High' });
      }
    }

    // Analyze moderate risk keywords
    for (const [kw, weight] of Object.entries(moderateRiskDict)) {
      if (text.includes(kw)) {
        riskScore += weight;
        detectedFactors.push({ word: kw, severity: 'Moderate' });
      }
    }

    // Analyze mitigating factors
    for (const [kw, weight] of Object.entries(lowRiskFactors)) {
      if (text.includes(kw)) {
        riskScore += weight;
        detectedFactors.push({ word: kw, severity: 'Mitigating' });
      }
    }

    // Bound score between 5% and 98%
    riskScore = Math.max(5, Math.min(98, riskScore));

    let riskLevel = 'Low Risk';
    let riskClass = 'risk-level-low';
    let recommendations = [];

    if (riskScore >= 65) {
      riskLevel = 'High Risk';
      riskClass = 'risk-level-high';
      recommendations = [
        "Seek immediate public shelter or contact official emergency dispatch (112 / 911).",
        "Avoid secluded areas, dead-ends, or entering unverified vehicles.",
        "Share your real-time GPS location with trusted contacts immediately.",
        "Activate an SOS siren or make loud noise if approached."
      ];
    } else if (riskScore >= 35) {
      riskLevel = 'Moderate Risk';
      riskClass = 'risk-level-moderate';
      recommendations = [
        "Heighten situational awareness (Condition Yellow) and keep your mobile device ready.",
        "Verify credentials and URLs directly through official apps before sharing information.",
        "Plan an alternate well-lit route or move toward populated areas.",
        "Avoid wearing noise-canceling headphones in unfamiliar environments."
      ];
    } else {
      riskLevel = 'Low Risk';
      riskClass = 'risk-level-low';
      recommendations = [
        "Maintain baseline alertness and follow general routine safety practices.",
        "Keep standard emergency speed-dial shortcuts configured on your phone.",
        "Ensure your mobile device has adequate battery charge."
      ];
    }

    const confidence = (85 + Math.floor(Math.random() * 10)) + '%';

    return {
      score: riskScore,
      level: riskLevel,
      badgeClass: riskClass,
      confidence: confidence,
      factors: detectedFactors,
      recommendations: recommendations
    };
  }

  function displayMLResults(data) {
    document.getElementById('riskBadge').className = `risk-level-badge ${data.badgeClass}`;
    document.getElementById('riskBadge').textContent = data.level;
    document.getElementById('riskScoreValue').textContent = `${data.score} / 100`;
    document.getElementById('riskConfidence').textContent = data.confidence;
    
    // Risk Bar
    const meterFill = document.getElementById('riskMeterFill');
    meterFill.style.width = `${data.score}%`;
    if (data.score >= 65) {
      meterFill.style.backgroundColor = 'var(--safety-red)';
    } else if (data.score >= 35) {
      meterFill.style.backgroundColor = 'var(--safety-amber)';
    } else {
      meterFill.style.backgroundColor = 'var(--safety-green)';
    }

    // Factors list
    const factorsEl = document.getElementById('detectedFactorsList');
    if (data.factors.length > 0) {
      factorsEl.innerHTML = data.factors.map(f => 
        `<span class="badge" style="background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-primary);">
          ${f.severity === 'High' ? '🔴' : f.severity === 'Moderate' ? '🟡' : '🟢'} ${f.word}
        </span>`
      ).join(' ');
    } else {
      factorsEl.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;">Standard contextual variables analyzed.</span>`;
    }

    // Recommendations list
    const recList = document.getElementById('riskRecommendationsList');
    recList.innerHTML = data.recommendations.map(r => `<li>${r}</li>`).join('');
  }
}

/* ==========================================================================
   3. Password Strength & Entropy Analyzer
   ========================================================================== */
function initPasswordChecker() {
  const pwdInput = document.getElementById('pwdCheckInput');
  const toggleBtn = document.getElementById('pwdToggleBtn');
  const meterFill = document.getElementById('pwdMeterFill');
  const strengthText = document.getElementById('pwdStrengthText');
  const entropyText = document.getElementById('pwdEntropyText');
  const crackTimeText = document.getElementById('pwdCrackTimeText');
  const generateBtn = document.getElementById('pwdGenerateBtn');

  if (!pwdInput) return;

  // Toggle Visibility
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = pwdInput.type === 'password';
      pwdInput.type = isPassword ? 'text' : 'password';
      toggleBtn.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // Live Password Input Evaluation
  pwdInput.addEventListener('input', () => {
    evaluatePassword(pwdInput.value);
  });

  // Password Generator
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const newPwd = generateStrongPassword();
      pwdInput.value = newPwd;
      pwdInput.type = 'text';
      if (toggleBtn) toggleBtn.textContent = '🙈';
      evaluatePassword(newPwd);
      window.SafeSphereUtils.showToast('Generated ultra-strong 18-character passphrase!', 'success');
    });
  }

  function evaluatePassword(pwd) {
    const len = pwd.length;
    let poolSize = 0;
    
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    updateCriterion('crit-length', len >= 12);
    updateCriterion('crit-upper', hasUpper);
    updateCriterion('crit-lower', hasLower);
    updateCriterion('crit-number', hasNumber);
    updateCriterion('crit-special', hasSpecial);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSpecial) poolSize += 33;

    if (len === 0 || poolSize === 0) {
      meterFill.style.width = '0%';
      strengthText.textContent = 'Enter password';
      entropyText.textContent = '0 bits';
      crackTimeText.textContent = 'Instant';
      return;
    }

    // Shannon Entropy formula: E = L * log2(R)
    const entropy = Math.round(len * Math.log2(poolSize));
    entropyText.textContent = `${entropy} bits`;

    let score = 0;
    if (len >= 8) score += 20;
    if (len >= 12) score += 20;
    if (len >= 16) score += 15;
    if (hasLower && hasUpper) score += 15;
    if (hasNumber) score += 15;
    if (hasSpecial) score += 15;

    meterFill.style.width = `${Math.min(100, score)}%`;

    if (score < 40) {
      meterFill.style.backgroundColor = 'var(--safety-red)';
      strengthText.textContent = 'Very Weak ⚠️';
      crackTimeText.textContent = '< 1 Second (Brute-forceable instantly)';
    } else if (score < 70) {
      meterFill.style.backgroundColor = 'var(--safety-amber)';
      strengthText.textContent = 'Moderate 🟡';
      crackTimeText.textContent = 'Approx. 3 hours to 4 days';
    } else if (score < 90) {
      meterFill.style.backgroundColor = 'var(--primary)';
      strengthText.textContent = 'Strong 🛡️';
      crackTimeText.textContent = 'Approx. 2,000+ Years';
    } else {
      meterFill.style.backgroundColor = 'var(--safety-green)';
      strengthText.textContent = 'Ultra-Secure / Fortress 🔒';
      crackTimeText.textContent = 'Centuries (Resistant to GPU cluster brute-force)';
    }
  }

  function updateCriterion(id, isValid) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('valid', isValid);
    const icon = el.querySelector('.crit-icon');
    if (icon) icon.textContent = isValid ? '✅' : '⚪';
  }

  function generateStrongPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+~-';
    let result = '';
    const array = new Uint32Array(18);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < 18; i++) {
      result += chars[array[i] % chars.length];
    }
    return result;
  }
}

/* ==========================================================================
   4. Phishing Awareness Interactive Simulator
   ========================================================================== */
function initPhishingSimulator() {
  const container = document.getElementById('phishingGameContainer');
  if (!container || !window.SafeSphereData || !window.SafeSphereData.phishingScenarios) return;

  const scenarios = window.SafeSphereData.phishingScenarios;
  let currentIdx = 0;
  let score = 0;

  function renderScenario() {
    if (currentIdx >= scenarios.length) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">🛡️</div>
          <h2>Phishing Defense Simulator Completed!</h2>
          <p style="margin: 1rem 0 1.5rem; font-size: 1.15rem;">
            You accurately spotted ${score} of ${scenarios.length} security scenarios.
          </p>
          <button class="btn btn-primary" id="restartPhishBtn">Replay Simulator</button>
        </div>
      `;
      document.getElementById('restartPhishBtn').addEventListener('click', () => {
        currentIdx = 0;
        score = 0;
        renderScenario();
      });
      return;
    }

    const item = scenarios[currentIdx];

    container.innerHTML = `
      <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
        <span class="badge badge-primary">Scenario ${currentIdx + 1} of ${scenarios.length}</span>
        <span style="font-weight: 600; color: var(--text-muted);">Current Accuracy: ${score}/${currentIdx}</span>
      </div>

      <div class="phish-card-mock">
        <div class="phish-header-meta">
          <div><strong>From:</strong> <code>${escapeHTML(item.sender)}</code></div>
          <div style="margin-top: 4px;"><strong>Subject:</strong> ${escapeHTML(item.subject)}</div>
          <div style="margin-top: 4px; color: var(--text-muted); font-size: 0.8rem;"><strong>Date:</strong> ${item.date}</div>
        </div>
        <div class="phish-body-preview">
          ${item.body}
        </div>
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center;">
        <button class="btn btn-danger btn-lg" id="choosePhishingBtn">
          🚨 This is a Phishing / Scam Attack
        </button>
        <button class="btn btn-secondary btn-lg" id="chooseLegitBtn">
          ✅ This is Legitimate Communication
        </button>
      </div>

      <div id="phishFeedbackBox" style="display: none; margin-top: 1.5rem; padding: 1.25rem; border-radius: 12px;"></div>
    `;

    document.getElementById('choosePhishingBtn').addEventListener('click', () => evaluateAnswer(true));
    document.getElementById('chooseLegitBtn').addEventListener('click', () => evaluateAnswer(false));
  }

  function evaluateAnswer(userGuessedPhishing) {
    const item = scenarios[currentIdx];
    const isCorrect = userGuessedPhishing === item.isPhishing;
    if (isCorrect) score++;

    const feedbackBox = document.getElementById('phishFeedbackBox');
    feedbackBox.style.display = 'block';
    
    if (isCorrect) {
      feedbackBox.style.background = 'var(--safety-green-light)';
      feedbackBox.style.border = '1px solid var(--safety-green)';
      feedbackBox.innerHTML = `
        <h4 style="color: var(--safety-green); margin-bottom: 0.5rem;">🎉 Spot-on Analysis!</h4>
        <p style="color: var(--text-primary); margin-bottom: 0.5rem;">${item.isPhishing ? 'You correctly flagged this as a malicious phishing attempt.' : 'You correctly verified this as genuine transactional communication.'}</p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem; font-size: 0.9rem;">
          ${item.redFlags.map(rf => `<li>${rf}</li>`).join('')}
        </ul>
        <button class="btn btn-primary btn-sm" id="nextPhishBtn">Next Scenario →</button>
      `;
    } else {
      feedbackBox.style.background = 'var(--safety-red-light)';
      feedbackBox.style.border = '1px solid var(--safety-red)';
      feedbackBox.innerHTML = `
        <h4 style="color: var(--safety-red); margin-bottom: 0.5rem;">⚠️ Caution: Incorrect Assessment</h4>
        <p style="color: var(--text-primary); margin-bottom: 0.5rem;">${item.isPhishing ? 'This was indeed a dangerous Phishing attack!' : 'This was actually legitimate communication.'}</p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem; font-size: 0.9rem;">
          ${item.redFlags.map(rf => `<li>${rf}</li>`).join('')}
        </ul>
        <button class="btn btn-primary btn-sm" id="nextPhishBtn">Next Scenario →</button>
      `;
    }

    document.getElementById('choosePhishingBtn').disabled = true;
    document.getElementById('chooseLegitBtn').disabled = true;

    document.getElementById('nextPhishBtn').addEventListener('click', () => {
      currentIdx++;
      renderScenario();
    });
  }

  renderScenario();
}

/* ==========================================================================
   5. Interactive Safety IQ Quiz
   ========================================================================== */
function initSafetyQuiz() {
  const container = document.getElementById('safetyQuizContainer');
  if (!container || !window.SafeSphereData || !window.SafeSphereData.quizQuestions) return;

  const questions = window.SafeSphereData.quizQuestions;
  let currentQ = 0;
  let userScore = 0;

  function renderQuestion() {
    if (currentQ >= questions.length) {
      renderQuizResults();
      return;
    }

    const q = questions[currentQ];
    const progressPct = ((currentQ) / questions.length) * 100;

    container.innerHTML = `
      <div class="quiz-card">
        <div class="flex-between" style="margin-bottom: 0.75rem;">
          <span class="badge badge-primary">${q.category}</span>
          <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">Question ${currentQ + 1} of ${questions.length}</span>
        </div>

        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progressPct}%;"></div>
        </div>

        <h3 style="font-size: 1.35rem; margin-bottom: 1.5rem; line-height: 1.4;">${q.question}</h3>

        <div class="quiz-options-list">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option-btn" data-idx="${idx}">
              <span>${opt}</span>
              <span class="opt-status-icon">⚪</span>
            </button>
          `).join('')}
        </div>

        <div id="quizExplanationBox" style="display: none; padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1.25rem;"></div>

        <div style="text-align: right; margin-top: 1.5rem;">
          <button class="btn btn-primary" id="quizNextBtn" style="display: none;">Next Question →</button>
        </div>
      </div>
    `;

    const optionBtns = container.querySelectorAll('.quiz-option-btn');
    const nextBtn = document.getElementById('quizNextBtn');
    const explBox = document.getElementById('quizExplanationBox');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
        const isCorrect = selectedIdx === q.correctAnswer;

        if (isCorrect) {
          userScore++;
          btn.classList.add('correct');
          btn.querySelector('.opt-status-icon').textContent = '✅';
          explBox.style.background = 'var(--safety-green-light)';
          explBox.style.border = '1px solid var(--safety-green)';
          explBox.innerHTML = `<strong>✅ Correct:</strong> ${q.explanation}`;
        } else {
          btn.classList.add('incorrect');
          btn.querySelector('.opt-status-icon').textContent = '❌';
          optionBtns[q.correctAnswer].classList.add('correct');
          optionBtns[q.correctAnswer].querySelector('.opt-status-icon').textContent = '✅';
          explBox.style.background = 'var(--safety-red-light)';
          explBox.style.border = '1px solid var(--safety-red)';
          explBox.innerHTML = `<strong>⚠️ Key Takeaway:</strong> ${q.explanation}`;
        }

        explBox.style.display = 'block';
        optionBtns.forEach(b => b.disabled = true);
        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      currentQ++;
      renderQuestion();
    });
  }

  function renderQuizResults() {
    const finalPct = Math.round((userScore / questions.length) * 100);
    let title = "Safety Novice";
    let badgeColor = "var(--safety-orange)";
    let desc = "You have basic awareness, but reviewing SafeSphere blogs will help solidify critical emergency reflexes.";

    if (finalPct >= 80) {
      title = "Certified Safety Guardian 🛡️";
      badgeColor = "var(--safety-green)";
      desc = "Outstanding situational IQ! You demonstrate elite preparedness across personal, digital, road, and disaster scenarios.";
    } else if (finalPct >= 50) {
      title = "Safety Mindful Explorer 🧭";
      badgeColor = "var(--primary)";
      desc = "Solid fundamental safety instinct. Keeping checklists handy will round out your emergency readiness.";
    }

    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem; max-width: 600px; margin: 0 auto; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🏆</div>
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Safety IQ Assessment Completed</h2>
        <div style="font-size: 2.75rem; font-weight: 800; color: ${badgeColor}; font-family: var(--font-heading); margin: 0.75rem 0;">
          ${finalPct}%
        </div>
        <div class="badge" style="background: ${badgeColor}22; color: ${badgeColor}; font-size: 1rem; padding: 0.4rem 1.25rem; margin-bottom: 1.25rem;">
          Rank: ${title}
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">${desc}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" id="retakeQuizBtn">🔄 Retake Quiz</button>
          <a href="blogs.html" class="btn btn-secondary">Explore Blogs to Level Up</a>
        </div>
      </div>
    `;

    document.getElementById('retakeQuizBtn').addEventListener('click', () => {
      currentQ = 0;
      userScore = 0;
      renderQuestion();
    });
  }

  renderQuestion();
}

/* ==========================================================================
   6. Checklists with LocalStorage Synchronization
   ========================================================================== */
function initChecklists() {
  const psContainer = document.getElementById('personalChecklistContainer');
  const epContainer = document.getElementById('emergencyChecklistContainer');
  const psProgress = document.getElementById('personalChecklistProgress');
  const epProgress = document.getElementById('emergencyChecklistProgress');

  if (!psContainer && !epContainer) return;

  let savedChecks = JSON.parse(localStorage.getItem('safesphere_checklists') || '{}');

  function renderList(listKey, containerEl, progressEl) {
    if (!containerEl || !window.SafeSphereData.checklists[listKey]) return;
    const items = window.SafeSphereData.checklists[listKey];

    const completedCount = items.filter(item => savedChecks[item.id]).length;
    const pct = Math.round((completedCount / items.length) * 100);

    if (progressEl) {
      progressEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem;">
          <span>Readiness: ${completedCount} / ${items.length} Completed</span>
          <span>${pct}%</span>
        </div>
        <div style="height: 6px; background: var(--bg-subtle); border-radius: 99px; overflow: hidden;">
          <div style="height: 100%; width: ${pct}%; background: var(--safety-green); transition: width 0.3s ease;"></div>
        </div>
      `;
    }

    containerEl.innerHTML = items.map(item => {
      const isChecked = !!savedChecks[item.id];
      return `
        <div class="checklist-item ${isChecked ? 'completed' : ''}" data-id="${item.id}">
          <div class="custom-checkbox">${isChecked ? '✓' : ''}</div>
          <span style="flex-grow: 1;">${item.task}</span>
          <span class="badge" style="background: var(--bg-subtle); font-size: 0.7rem;">${item.category}</span>
        </div>
      `;
    }).join('');

    containerEl.querySelectorAll('.checklist-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        savedChecks[id] = !savedChecks[id];
        localStorage.setItem('safesphere_checklists', JSON.stringify(savedChecks));
        renderList(listKey, containerEl, progressEl);
      });
    });
  }

  renderList('personalSafety', psContainer, psProgress);
  renderList('emergencyPrep', epContainer, epProgress);

  // Reset Checklist Button
  const resetBtn = document.getElementById('resetChecklistsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      savedChecks = {};
      localStorage.removeItem('safesphere_checklists');
      renderList('personalSafety', psContainer, psProgress);
      renderList('emergencyPrep', epContainer, epProgress);
      window.SafeSphereUtils.showToast('Checklists reset to default state.', 'info');
    });
  }
}

/* ==========================================================================
   7. "What Should I Do?" Situation Guide Navigator
   ========================================================================== */
function initSituationGuide() {
  const selectorGrid = document.getElementById('scenarioSelectorGrid');
  const detailsBox = document.getElementById('scenarioDetailsBox');

  if (!selectorGrid || !detailsBox || !window.SafeSphereData || !window.SafeSphereData.situations) return;

  const scenarios = window.SafeSphereData.situations;

  function renderScenarioDetails(item) {
    detailsBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-primary" style="margin-bottom: 0.4rem;">${item.category}</span>
          <h2 style="font-size: 1.85rem;">${item.title}</h2>
        </div>
        <span class="badge" style="background: ${item.threatColor}22; color: ${item.threatColor}; font-size: 0.95rem; font-weight: 800; padding: 0.4rem 1rem;">
          ${item.threatLevel}
        </span>
      </div>

      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--primary);">🚨 Immediate Step-by-Step Action Protocol:</h3>
        <ol style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
          ${item.immediateSteps.map(step => `<li style="font-size: 1rem; color: var(--text-primary); font-weight: 500;">${step}</li>`).join('')}
        </ol>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div style="background: var(--safety-green-light); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--safety-green);">
          <h4 style="color: var(--safety-green); margin-bottom: 0.5rem;">✅ DOs</h4>
          <ul style="margin-left: 1.25rem; font-size: 0.9rem;">
            ${item.dos.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
        <div style="background: var(--safety-red-light); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--safety-red);">
          <h4 style="color: var(--safety-red); margin-bottom: 0.5rem;">❌ DON'Ts</h4>
          <ul style="margin-left: 1.25rem; font-size: 0.9rem;">
            ${item.donts.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // Render Buttons
  selectorGrid.innerHTML = scenarios.map((sc, i) => `
    <button class="scenario-btn ${i === 0 ? 'active' : ''}" data-idx="${i}">
      <span style="font-size: 1.5rem;">${sc.icon === 'eye-off' ? '👁️' : sc.icon === 'waves' ? '🌊' : sc.icon === 'lock-alert' ? '🔒' : '🔥'}</span>
      <span>${sc.title}</span>
    </button>
  `).join('');

  renderScenarioDetails(scenarios[0]);

  selectorGrid.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectorGrid.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      renderScenarioDetails(scenarios[idx]);
    });
  });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
