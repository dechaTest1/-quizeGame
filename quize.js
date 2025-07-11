// --- Nurse Character Image Cycling Logic ---
const nurseCharacterImgs = [
    'assets/Nurse_character_1.png',
    'assets/Nurse_character_2.png',
    'assets/Nurse_character_3.png',
    'assets/Nurse_character_4.png'
];
const nurseTrueImg = 'assets/Nurse_true.png';
const nurseFalseImg = 'assets/Nurse_false.png';
const nurseResultImg = 'assets/Nurse_result.png';

let nurseCycleIndex = 0;
function showNurseCycleImage() {
    const nurseImg = document.getElementById('nurseCharacter');
    if (!nurseImg) return;
    nurseImg.src = nurseCharacterImgs[nurseCycleIndex];
}

function nextNurseCycleImage() {
    nurseCycleIndex = (nurseCycleIndex + 1) % nurseCharacterImgs.length;
    showNurseCycleImage();
}


function showNurseTrue() {
    const nurseImg = document.getElementById('nurseCharacter');
    if (nurseImg) nurseImg.src = nurseTrueImg;
}


function showNurseFalse() {
    const nurseImg = document.getElementById('nurseCharacter');
    if (nurseImg) nurseImg.src = nurseFalseImg;
}


function showNurseResult() {
    const nurseImg = document.getElementById('nurseCharacter');
    if (nurseImg) nurseImg.src = nurseResultImg;
}
let quizData = null;

async function loadQuizData() {
    if (quizData) return quizData;
    const res = await fetch('quizData.json');
    quizData = await res.json();
    return quizData;
}

// Variables for quiz control
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let isAnswered = false;

// Function to start quiz
async function startQuiz() {
    await loadQuizData();
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    // Show nurse and clear speech bubble
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    const speechBubble = document.getElementById('speechBubble');
    if (nurseContainer) nurseContainer.style.display = '';
    if (speechBubble) speechBubble.textContent = '';
    nurseCycleIndex = 0;
    showNurseCycleImage();
    showQuestion();
}

// Function to show option detail modal (moved to top-level)
function showOptionDetailModal(question, optionIndex) {
    // Remove existing modal if any
    setTimeout(() => {
        const oldModal = document.getElementById('optionDetailModal');
        if (oldModal) oldModal.remove();
        // Get detail text
        const detail = (question.details && question.details[optionIndex]) ? question.details[optionIndex] : '';
        // Create modal
        const modal = document.createElement('div');
        modal.id = 'optionDetailModal';
        modal.className = 'option-detail-modal';
        modal.innerHTML = `
            <div class="option-detail-modal-content">
                <button class="option-detail-modal-close" id="optionDetailModalClose">&times;</button>
                <div class="option-detail-modal-body">${detail || 'No additional details available'}</div>
            </div>
        `;
        document.body.appendChild(modal);
        // Close modal on button click or background click
        document.getElementById('optionDetailModalClose').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }, 0);
}

// Function to show question
async function showQuestion() {
    await loadQuizData();
    const question = quizData.questions[currentQuestion];

    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = quizData.questions.length;
    // Render question: support array (multi-line) or string
    const questionTextDiv = document.getElementById('questionText');
    questionTextDiv.innerHTML = '';
    if (Array.isArray(question.question)) {
        question.question.forEach((line) => {
            const p = document.createElement('div');
            p.textContent = line;
            p.style.textAlign = 'left';
            p.style.margin = '0 auto';
            p.style.width = '100%';
            p.style.maxWidth = '98%';
            p.style.fontWeight = '500'; // ทุกบรรทัดตัวหนา
            p.style.lineHeight = '1.5';
            questionTextDiv.appendChild(p);
        });
    } else {
        const p = document.createElement('div');
        p.textContent = question.question;
        p.style.textAlign = 'left';
        p.style.margin = '0 auto';
        p.style.width = '100%';
        p.style.maxWidth = '98%';
        p.style.fontWeight = '500';
        p.style.lineHeight = '1.5';
        questionTextDiv.appendChild(p);
    }

    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Show options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        // Add text span
        const textSpan = document.createElement('span');
        textSpan.textContent = option;
        optionElement.appendChild(textSpan);
        // Add click event to select answer
        optionElement.onclick = function () {
            if (!isAnswered) {
                // Remove selected from all
                Array.from(optionsContainer.children).forEach(opt => opt.classList.remove('selected'));
                optionElement.classList.add('selected');
                selectedAnswer = index;
                document.getElementById('nextButton').disabled = false;
            }
        };
        optionsContainer.appendChild(optionElement);
    });

    // Remove info button if exists
    const oldExplainBtn = document.getElementById('optionExplainBtn');
    if (oldExplainBtn) oldExplainBtn.remove();

    // Remove show option details button if exists
    const oldShowAllOptionDetailsBtn = document.getElementById('showAllOptionDetailsBtn');
    if (oldShowAllOptionDetailsBtn) oldShowAllOptionDetailsBtn.remove();

    // Reset state
    selectedAnswer = null;
    isAnswered = false;

    document.getElementById('nextButton').disabled = true;
    document.getElementById('feedback').classList.remove('show');


    // Change nurse image to next in cycle (except on first question)
    if (currentQuestion !== 0) {
        nextNurseCycleImage();
    } else {
        nurseCycleIndex = 0;
        showNurseCycleImage();
    }
    // Hide only speech bubble every time question changes, but nurse always shows
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    if (nurseContainer) nurseContainer.classList.remove('show-bubble');

    // Change button text
    const nextButton = document.getElementById('nextButton');
    if (currentQuestion === quizData.questions.length - 1) {
        nextButton.textContent = 'View Results';
    } else {
        nextButton.textContent = 'Next';
    }

    // Show/hide back button
    const backButton = document.getElementById('backButton');
    if (currentQuestion === 0) {
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'block';
    }

    // Call setupConfirmButton after rendering options
    setupConfirmButton(function (selectedOptionDiv) {
        const options = Array.from(optionsContainer.children);
        const answerIndex = options.indexOf(selectedOptionDiv);
        confirmAnswer(answerIndex);
        // Show option details button after confirming answer for all questions
        let btn = document.createElement('button');
        btn.id = 'showAllOptionDetailsBtn';
        btn.className = 'quiz-button';
        btn.style.position = 'absolute';
        btn.style.top = '18px';
        btn.style.right = '18px';
        btn.style.zIndex = '10';
        btn.style.width = 'auto';
        btn.style.padding = '8px 22px';
        btn.style.fontSize = '1em';
        btn.style.background = '#fff';
        btn.style.color = '#1976D2';
        btn.style.border = '2px solid #2196F3';
        btn.style.borderRadius = '18px';
        btn.style.boxShadow = '0 2px 8px rgba(33, 150, 243, 0.08)';
        btn.innerHTML = 'View Option Details';
        btn.onclick = function (e) {
            e.stopPropagation();
            showAllOptionDetailsModal(quizData.questions[currentQuestion], answerIndex);
        };
        const quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) quizContainer.appendChild(btn);
    });
}

// New function to confirm answer
function confirmAnswer(answerIndex) {
    if (isAnswered) return;

    const options = document.querySelectorAll('.option');
    const question = quizData.questions[currentQuestion];

    // Select answer
    selectedAnswer = answerIndex;
    options[answerIndex].classList.add('selected');

    // --- Ensure userAnswers is updated ---
    userAnswers[currentQuestion] = answerIndex;
    // --- End update ---

    setTimeout(() => {
        isAnswered = true;

        // Show correct answer
        options[question.correct].classList.add('correct');

        // Show "View Option Details" button after answering (modal)
        if (question.details) {
            // Remove existing button if any
            let oldBtn = document.getElementById('showAllOptionDetailsBtn');
            if (oldBtn) oldBtn.remove();
            // Create new button
            let btn = document.createElement('button');
            btn.id = 'showAllOptionDetailsBtn';
            btn.className = 'quiz-button';
            btn.style.position = 'absolute';
            btn.style.top = '18px';
            btn.style.right = '18px';
            btn.style.zIndex = '10';
            btn.style.width = 'auto';
            btn.style.padding = '8px 22px';
            btn.style.fontSize = '1em';
            btn.style.background = '#fff';
            btn.style.color = '#1976D2';
            btn.style.border = '2px solid #2196F3';
            btn.style.borderRadius = '18px';
            btn.style.boxShadow = '0 2px 8px rgba(33, 150, 243, 0.08)';
            btn.innerHTML = 'View Option Details';
            btn.onclick = function (e) {
                e.stopPropagation();
                showAllOptionDetailsModal(question, answerIndex);
            };
            // Find quiz-container to attach button
            const quizContainer = document.querySelector('.quiz-container');
            if (quizContainer) quizContainer.appendChild(btn);
        }

        // If wrong answer, show incorrect answer
        if (selectedAnswer !== question.correct) {
            options[selectedAnswer].classList.add('incorrect');
            let feedbackMsg = 'Correct answer: ' + '"' + question.options[question.correct] + '"';
            if (question.explanation) {
                feedbackMsg += '<br><span style="color:#1976D2;">' + question.explanation + '</span>';
            }
            showFeedback('incorrect', feedbackMsg);
        } else {
            score++;
            showFeedback('correct', 'Correct! ' + question.explanation);
            showCelebrateEffect();
        }

        // Celebration effect when user answers correctly
        function showCelebrateEffect() {
            const container = document.createElement('div');
            container.className = 'celebrate-effect';
            for (let i = 0; i < 36; i++) {
                const confetti = document.createElement('div');
                const size = Math.random() * 14 + 10;
                confetti.style.position = 'absolute';
                confetti.style.left = (Math.random() * 100) + 'vw';
                confetti.style.top = (Math.random() * 40 + 30) + 'vh';
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                confetti.style.borderRadius = '50%';
                confetti.style.background = randomConfettiColor();
                confetti.style.opacity = '0.85';
                confetti.style.animation = `popConfetti 2.5s cubic-bezier(.62,.01,.48,1.01) forwards`;
                confetti.style.animationDelay = (Math.random() * 0.7) + 's';
                container.appendChild(confetti);
            }
            document.body.appendChild(container);
            setTimeout(() => container.remove(), 3000);
        }

        function randomConfettiColor() {
            const colors = ['#FFD700', '#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#00BCD4', '#FFEB3B', '#8BC34A'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        // Enable next button
        document.getElementById('nextButton').disabled = false;

        // Disable option clicking
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Hide confirm button
        document.getElementById('confirmButton').style.display = 'none';
    }, 300);
}

// Modal function to show details for all options (move to top-level)
function showAllOptionDetailsModal(question, answerIndex) {
    // Remove existing modal if any
    const oldModal = document.getElementById('allOptionDetailsModal');
    if (oldModal) oldModal.remove();
    // Create modal
    let modal = document.createElement('div');
    modal.id = 'allOptionDetailsModal';
    modal.className = 'option-detail-modal';
    let content = document.createElement('div');
    content.className = 'option-detail-modal-content';
    content.style.minWidth = '320px';
    content.style.maxWidth = '98vw';
    content.innerHTML = `<button class="option-detail-modal-close" id="allOptionDetailsModalClose">&times;</button><div class="option-detail-modal-body"><b>Option Explanations:</b><br></div>`;
    let body = content.querySelector('.option-detail-modal-body');
    question.options.forEach((opt, idx) => {
        let isCorrect = (idx === question.correct);
        let icon = isCorrect ? '✔️' : '❌';
        let color = isCorrect ? '#388e3c' : '#d32f2f';
        let fontWeight = 'bold';
        let detail = (question.details && question.details[idx]) ? question.details[idx] : '-';
        body.innerHTML += `<div style="margin:10px 0 0 0;padding:7px 0 7px 0;display:flex;align-items:flex-start;gap:8px;">
            <span style="font-size:1.2em;color:${color};font-weight:${fontWeight};min-width:2em;">${icon}</span>
            <span style="color:${color};font-weight:${fontWeight};">${opt}</span>
        </div>
        <div style="margin-left:2.5em;color:#1976D2;white-space:pre-line;">${detail}</div>`;
    });
    modal.appendChild(content);
    document.body.appendChild(modal);
    document.getElementById('allOptionDetailsModalClose').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// setupConfirmButton function for confirm answer button
function setupConfirmButton(onConfirm) {
    const optionsContainer = document.getElementById('optionsContainer');
    const confirmButton = document.getElementById('confirmButton');
    confirmButton.style.display = 'none';
    confirmButton.disabled = false;
    let selectedOption = null;
    let confirmCallback = onConfirm;
    Array.from(optionsContainer.children).forEach(option => {
        option.onclick = function () {
            Array.from(optionsContainer.children).forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedOption = this;
            confirmButton.style.display = '';
        };
    });
    confirmButton.onclick = function () {
        if (selectedOption && confirmCallback) {
            confirmButton.disabled = true;
            confirmCallback(selectedOption);
        }
    };
}

// Function to select answer
function selectAnswer(answerIndex) {
    if (isAnswered) return;

    const options = document.querySelectorAll('.option');
    const question = quizData.questions[currentQuestion];

    // Select answer
    selectedAnswer = answerIndex;
    options[answerIndex].classList.add('selected');

    // Check answer
    setTimeout(() => {
        isAnswered = true;

        // Show correct answer
        options[question.correct].classList.add('correct');

        // If wrong answer, show incorrect answer
        if (selectedAnswer !== question.correct) {
            options[selectedAnswer].classList.add('incorrect');
            showFeedback('incorrect', 'Correct answer: ' + question.options[question.correct]);
        } else {
            score++;
            showFeedback('correct', 'Correct! ' + question.explanation);
        }

        // Enable next button
        document.getElementById('nextButton').disabled = false;

        // Disable option clicking
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

    }, 300);
}

// Function to show feedback
function showFeedback(type, message) {
    const feedback = document.getElementById('feedback');
    // Extract explanation
    let mainMsg = message;
    let explanation = '';
    const expMatch = message.match(/<span[^>]*>([\s\S]*)<\/span>/);
    if (expMatch) {
        mainMsg = message.replace(/<br><span[^>]*>[\s\S]*<\/span>/, '');
        explanation = expMatch[1];
    }
    feedback.innerHTML = mainMsg;
    feedback.className = `feedback ${type} show`;
    // If there's explanation, show with typewriter effect
    if (explanation) {
        const expElem = document.createElement('div');
        expElem.style.color = '#1976D2';
        expElem.style.fontSize = '1.1em';
        expElem.style.marginTop = '8px';
        feedback.appendChild(expElem);
        let i = 0;
        function typeWriter() {
            if (i < explanation.length) {
                expElem.textContent += explanation.charAt(i);
                i++;
                setTimeout(typeWriter, 18 + Math.random() * 32);
            }
        }
        setTimeout(typeWriter, 250);
    }
    // Nurse feedback logic with typewriter effect and image swap
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    const speechBubble = document.getElementById('speechBubble') || document.getElementById('nurseSpeechBubble');
    if (nurseContainer && speechBubble) {
        let nurseMsg = '';
        // Convert message to plain text (remove HTML tags)
        function stripHtml(html) {
            let tmp = document.createElement('div');
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || '';
        }
        // Extract only correct answer ("history")
        let correctOnly = '';
        if (type === 'correct') {
            showNurseTrue();
            const praise = [
                'Excellent!',
                'Great job!',
                'Correct answer!',
                'Outstanding!',
                'Very impressive!'
            ];
            // Extract only correct answer from message
            const match = (message || '').match(/"([^"]+)"/);
            if (match) correctOnly = 'Correct answer: "' + match[1] + '"';
            nurseMsg = praise[Math.floor(Math.random() * praise.length)] + ' ' + correctOnly;
        } else {
            showNurseFalse();
            const encourage = [
                'That\'s okay, try again!',
                'Keep going!',
                'Don\'t give up, you can do it!',
                'Mistakes are great teachers!',
                'You\'ll get better!'
            ];
            // Extract only correct answer from message
            const match = (message || '').match(/"([^"]+)"/);
            if (match) correctOnly = 'Correct answer: "' + match[1] + '"';
            nurseMsg = encourage[Math.floor(Math.random() * encourage.length)] + ' ' + correctOnly;
            // หลัง feedback ผิด ให้เปลี่ยนกลับเป็นรูป cycle ทันทีเมื่อเปลี่ยนข้อ
        }
        nurseContainer.style.display = 'flex';
        // Typewriter effect
        let i = 0;
        speechBubble.textContent = '';
        function typeWriter() {
            if (i < nurseMsg.length) {
                speechBubble.textContent += nurseMsg.charAt(i);
                i++;
                setTimeout(typeWriter, 18 + Math.random() * 32); // speed: 18-50ms/char
            }
        }
        setTimeout(typeWriter, 250); // delay before start typing
        // ไม่ resume cycle อัตโนมัติ ให้รอจนกดข้อถัดไป
    }
}

// Function to go to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Function to go to next question
function nextQuestion() {
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

// Function to show results
function showResult() {
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    showNurseResult();

    const percentage = Math.round((score / quizData.questions.length) * 100);

    // Update score
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('totalQuestionsFinal').textContent = quizData.questions.length;

    // Show result message
    let message = '';
    if (percentage >= 80) {
        message = '🎉 Excellent! You did great!';
    } else if (percentage >= 60) {
        message = '👍 Very good! Well done!';
    } else if (percentage >= 40) {
        message = '😊 That\'s okay, try again!';
    } else {
        message = '💪 Don\'t give up! Practice more!';
    }

    document.getElementById('resultMessage').textContent = message;

    // Update score circle
    const scoreCircle = document.querySelector('.score-circle');
    const degrees = (percentage / 100) * 360;
    scoreCircle.style.background = `conic-gradient(#667eea 0deg, #764ba2 ${degrees}deg, #e0e0e0 ${degrees}deg)`;

    // Hide option details button if exists
    const oldShowAllOptionDetailsBtn = document.getElementById('showAllOptionDetailsBtn');
    if (oldShowAllOptionDetailsBtn) oldShowAllOptionDetailsBtn.remove();

    // Hide option details modal if exists
    const oldAllOptionDetailsModal = document.getElementById('allOptionDetailsModal');
    if (oldAllOptionDetailsModal) oldAllOptionDetailsModal.remove();
}

// Function to create and download JSON summary
function downloadQuizSummary() {
    const summary = {
        score: score,
        total: quizData.questions.length,
        percentage: Math.round((score / quizData.questions.length) * 100),
        answers: userAnswers, // Need to store userAnswers for each question
        questions: quizData.questions.map(q => ({
            question: q.question,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation
        }))
    };
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz_summary.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Store userAnswers every time an answer is given
let userAnswers = [];

// Function to reset quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    isAnswered = false;
    userAnswers = [];

    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    // Hide nurse feedback when resetting
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    if (nurseContainer) nurseContainer.style.display = 'none';
    // nothing to stop, nurse image will reset on startQuiz
}

// Function to show quiz summary modal
function showQuizSummaryModal() {
    loadQuizData().then(() => {
        const modal = document.getElementById('quizSummaryModal');
        const content = document.getElementById('quizSummaryContent');
        // Create summary data
        let html = '';
        html += `<div style='font-size:1.2em;font-weight:bold;margin-bottom:10px;'>Quiz Summary</div>`;
        html += `<div style='margin-bottom:10px;'>Score: <b>${score}</b> / ${quizData.questions.length} (${Math.round((score / quizData.questions.length) * 100)}%)</div>`;
        html += `<div style='margin-bottom:10px;'>\n`;
        quizData.questions.forEach((q, idx) => {
            const userAns = userAnswers[idx];
            const isCorrect = userAns === q.correct;
            html += `<div style='margin-bottom:12px;padding:10px 0;border-bottom:1px solid #e0e0e0;'>`;
            // Render question: support array (multi-line) or string
            if (Array.isArray(q.question)) {
                html += `<div style='font-weight:bold;'>${idx + 1}.`;
                q.question.forEach((line) => {
                    html += `<div style='font-weight:500;'>${line}</div>`;
                });
                html += `</div>`;
            } else {
                html += `<div style='font-weight:bold;'>${idx + 1}. ${q.question}</div>`;
            }
            html += `<div style='margin:4px 0 4px 0;'>`;
            q.options.forEach((opt, i) => {
                let style = 'color:#333; font-weight:normal;';
                let icon = '';
                if (i === userAns && i === q.correct) {
                    style = 'color:#388e3c;font-weight:bold;';
                    icon = '✔️ ';
                } else if (i === userAns && i !== q.correct) {
                    style = 'color:#d32f2f;font-weight:bold;';
                    icon = '❌ ';
                } else if (i === q.correct) {
                    style = 'color:#388e3c;font-weight:bold;';
                    icon = '✔️ ';
                }
                // Remove A. B. C. D. prefix if already present in opt
                let displayOpt = opt;
                const abcdRegex = /^[A-D]\.\s/;
                if (abcdRegex.test(opt)) {
                    displayOpt = opt;
                } else {
                    displayOpt = String.fromCharCode(65 + i) + '. ' + opt;
                }
                html += `<div style='margin-left:1.5em;${style}'>${icon}${displayOpt}</div>`;
            });
            html += `</div>`;
            html += `<div style='margin:4px 0;'>`;
            if (isCorrect) {
                html += `<span style='color:#388e3c;font-weight:bold;'>✔️ Correct answer</span>`;
            } else {
                html += `<span style='color:#d32f2f;font-weight:bold;'>❌ Wrong answer</span> <span style='color:#388e3c;'>Correct answer: ${q.options[q.correct]}</span>`;
            }
            html += `</div>`;
            if (q.explanation) {
                html += `<div style='color:#1976D2;margin-top:2px;'>Explanation: ${q.explanation}</div>`;
            }
            html += `</div>`;
        });
        html += `</div>`;
        content.innerHTML = html;
        modal.style.display = '';
        // Close button
        document.getElementById('quizSummaryModalClose').onclick = () => { modal.style.display = 'none'; };
        modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    });
}

// Bind event to showSummaryBtn after page loads
window.onload = function () {
    loadQuizData().then(() => {
        console.log('Quiz App Loaded Successfully!');
        console.log('Total Questions:', quizData.questions.length);
        const btn = document.getElementById('showSummaryBtn');
        if (btn) btn.onclick = showQuizSummaryModal;
    });
};

window.startQuiz = startQuiz;
window.previousQuestion = previousQuestion;
window.nextQuestion = nextQuestion;
window.resetQuiz = resetQuiz;
window.showOptionDetailModal = showOptionDetailModal;
