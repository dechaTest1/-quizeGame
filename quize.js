// JSON Data สำหรับคำถามและคำตอบ
const quizData = {
    "title": "Quiz Master - ทดสอบความรู้ทั่วไป",
    "questions": [
        {
            "id": 1,
            "question": "เมืองหลวงของประเทศไทยคือใด?",
            "options": ["กรุงเทพมหานคร", "เชียงใหม่", "ขอนแก่น", "หาดใหญ่"],
            "correct": 0,
            "explanation": "กรุงเทพมหานครเป็นเมืองหลวงของประเทศไทย",
            "details": [
                "กรุงเทพมหานคร: เมืองหลวงของประเทศไทย ศูนย์กลางเศรษฐกิจและการปกครอง",
                "เชียงใหม่: เมืองใหญ่ทางภาคเหนือ มีวัฒนธรรมล้านนา",
                "ขอนแก่น: เมืองสำคัญในภาคตะวันออกเฉียงเหนือ",
                "หาดใหญ่: เมืองเศรษฐกิจสำคัญในภาคใต้"
            ]
        },
        {
            "id": 2,
            "question": "ธาตุที่มีสัญลักษณ์ H คือ?",
            "options": ["ฮีเลียม", "ไฮโดรเจน", "ฮาโลเจน", "ไฮดรอกไซด์"],
            "correct": 1,
            "explanation": "H เป็นสัญลักษณ์ของธาตุไฮโดรเจน",
            "details": [
                "ฮีเลียม: He เป็นธาตุเฉื่อยในหมู่ 18",
                "ไฮโดรเจน: H เป็นธาตุเบาที่สุดในจักรวาล",
                "ฮาโลเจน: กลุ่มธาตุหมู่ 17 เช่น F, Cl, Br, I",
                "ไฮดรอกไซด์: ไม่ใช่ธาตุ แต่เป็นหมู่ OH- ในเคมี"
            ]
        },
        {
            "id": 3,
            "question": "ใครเป็นผู้เขียนนวนิยายเรื่อง 'แฮร์รี่ พอตเตอร์'?",
            "options": ["J.K. Rowling", "Stephen King", "George R.R. Martin", "J.R.R. Tolkien"],
            "correct": 0,
            "explanation": "J.K. Rowling เป็นผู้เขียนซีรีส์แฮร์รี่ พอตเตอร์"
        },
        {
            "id": 4,
            "question": "ดาวเคราะห์ที่ใหญ่ที่สุดในระบบสุริยะคือ?",
            "options": ["ดาวศุกร์", "ดาวพฤหัสบดี", "ดาวเสาร์", "ดาวยูเรนัส"],
            "correct": 1,
            "explanation": "ดาวพฤหัสบดีเป็นดาวเคราะห์ที่ใหญ่ที่สุดในระบบสุริยะ"
        },
        {
            "id": 5,
            "question": "ภาษาโปรแกรมใดที่ใช้สร้างเว็บไซต์ด้าน Front-end?",
            "options": ["Python", "JavaScript", "Java", "C++"],
            "correct": 1,
            "explanation": "JavaScript เป็นภาษาหลักที่ใช้สร้างเว็บไซต์ด้าน Front-end"
        },
        {
            "id": 6,
            "question": "ทวีปใดที่มีประเทศมากที่สุด?",
            "options": ["เอเชีย", "ยุโรป", "แอฟริกา", "อเมริกาใต้"],
            "correct": 2,
            "explanation": "ทวีปแอฟริกามีประเทศมากที่สุด รวม 54 ประเทศ"
        },
        {
            "id": 7,
            "question": "ในคณิตศาสตร์ π (pi) มีค่าประมาณเท่าใด?",
            "options": ["3.14", "2.71", "1.41", "4.13"],
            "correct": 0,
            "explanation": "π (pi) มีค่าประมาณ 3.14159..."
        },
        {
            "id": 8,
            "question": "สีใดที่ได้จากการผสมสีแดงและสีเหลือง?",
            "options": ["สีเขียว", "สีม่วง", "สีส้ม", "สีชมพู"],
            "correct": 2,
            "explanation": "สีส้มได้จากการผสมสีแดงและสีเหลือง"
        },
        {
            "id": 9,
            "question": "ประเทศใดที่มีประชากรมากที่สุดในโลก?",
            "options": ["อินเดีย", "จีน", "อเมริกา", "อินโดนีเซีย"],
            "correct": 0,
            "explanation": "อินเดียมีประชากรมากที่สุดในโลกในปัจจุบัน"
        },
        {
            "id": 10,
            "question": "ใครเป็นผู้คิดค้นทฤษฎีสัมพันธภาพ?",
            "options": ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Nikola Tesla"],
            "correct": 1,
            "explanation": "Albert Einstein เป็นผู้คิดค้นทฤษฎีสัมพันธภาพ"
        }
    ]
};

// ตัวแปรสำหรับควบคุมควิซ
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let isAnswered = false;

// ฟังก์ชันเริ่มต้นควิซ
function startQuiz() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    // Show nurse and clear speech bubble
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    const speechBubble = document.getElementById('speechBubble');
    if (nurseContainer) nurseContainer.style.display = '';
    if (speechBubble) speechBubble.textContent = '';
    showQuestion();
}


// ฟังก์ชันแสดง modal รายละเอียดตัวเลือก (ย้ายออกมา top-level)
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
                <div class="option-detail-modal-body">${detail || 'ไม่มีรายละเอียดเพิ่มเติม'}</div>
            </div>
        `;
        document.body.appendChild(modal);
        // Close modal on button click or background click
        document.getElementById('optionDetailModalClose').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }, 0);
}

// ฟังก์ชันแสดงคำถาม
function showQuestion() {
    const question = quizData.questions[currentQuestion];

    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = quizData.questions.length;
    document.getElementById('questionText').textContent = question.question;

    // อัปเดต progress bar
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // แสดงตัวเลือก
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        // Add text span
        const textSpan = document.createElement('span');
        textSpan.textContent = option;
        optionElement.appendChild(textSpan);
        optionsContainer.appendChild(optionElement);
    });
    // ลบปุ่ม info เฉลยถ้ามีค้างอยู่
    const oldExplainBtn = document.getElementById('optionExplainBtn');
    if (oldExplainBtn) oldExplainBtn.remove();

    // รีเซ็ตสถานะ
    selectedAnswer = null;
    isAnswered = false;

    document.getElementById('nextButton').disabled = true;
    document.getElementById('feedback').classList.remove('show');
    // ซ่อนเฉพาะ speech bubble ทุกครั้งที่เปลี่ยนข้อ แต่ nurse โชว์เสมอ
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    if (nurseContainer) nurseContainer.classList.remove('show-bubble');

    // เปลี่ยนข้อความปุ่ม
    const nextButton = document.getElementById('nextButton');
    if (currentQuestion === quizData.questions.length - 1) {
        nextButton.textContent = 'ดูผลลัพธ์';
    } else {
        nextButton.textContent = 'คำถามต่อไป';
    }

    // แสดง/ซ่อนปุ่มย้อนกลับ
    const backButton = document.getElementById('backButton');
    if (currentQuestion === 0) {
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'block';
    }

    // เรียก setupConfirmButton หลัง render ตัวเลือก
    setupConfirmButton(function (selectedOptionDiv) {
        const options = Array.from(optionsContainer.children);
        const answerIndex = options.indexOf(selectedOptionDiv);
        confirmAnswer(answerIndex);
    });
}

// ฟังก์ชันใหม่สำหรับยืนยันคำตอบ
function confirmAnswer(answerIndex) {
    if (isAnswered) return;

    const options = document.querySelectorAll('.option');
    const question = quizData.questions[currentQuestion];

    // เลือกคำตอบ
    selectedAnswer = answerIndex;
    options[answerIndex].classList.add('selected');

    setTimeout(() => {
        isAnswered = true;

        // แสดงคำตอบที่ถูกต้อง
        options[question.correct].classList.add('correct');

        // แสดงปุ่ม "ดูคำอธิบายตัวเลือก" หลังตอบเสร็จ (modal)
        if (question.details) {
            // ลบปุ่มเดิมถ้ามี
            let oldBtn = document.getElementById('showAllOptionDetailsBtn');
            if (oldBtn) oldBtn.remove();
            // สร้างปุ่มใหม่
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
            btn.innerHTML = 'ดูคำอธิบายตัวเลือก';
            btn.onclick = function (e) {
                e.stopPropagation();
                showAllOptionDetailsModal(question, answerIndex);
            };
            // หา quiz-container เพื่อแปะปุ่ม
            const quizContainer = document.querySelector('.quiz-container');
            if (quizContainer) quizContainer.appendChild(btn);
        }

// ฟังก์ชัน modal แสดงรายละเอียดทุกตัวเลือก (move to top-level)
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
    content.innerHTML = `<button class="option-detail-modal-close" id="allOptionDetailsModalClose">&times;</button><div class="option-detail-modal-body"><b>คำอธิบายตัวเลือก:</b><br></div>`;
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

        // ถ้าเลือกผิด แสดงคำตอบที่ผิด
        if (selectedAnswer !== question.correct) {
            options[selectedAnswer].classList.add('incorrect');
            showFeedback('incorrect', 'คำตอบที่ถูกต้อง: ' + question.options[question.correct]);
        } else {
            score++;
            showFeedback('correct', 'ถูกต้อง! ' + question.explanation);
            showCelebrateEffect();
        }

        // เอฟเฟกต์ฉลองเมื่อผู้ใช้ตอบถูก
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

        // เปิดใช้งานปุ่มถัดไป
        document.getElementById('nextButton').disabled = false;

        // ปิดการคลิกตัวเลือก
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // ซ่อนปุ่มยืนยัน
        document.getElementById('confirmButton').style.display = 'none';
    }, 300);
}

// ฟังก์ชัน setupConfirmButton สำหรับปุ่มยืนยันคำตอบ
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

// ฟังก์ชันเลือกคำตอบ
function selectAnswer(answerIndex) {
    if (isAnswered) return;

    const options = document.querySelectorAll('.option');
    const question = quizData.questions[currentQuestion];

    // เลือกคำตอบ
    selectedAnswer = answerIndex;
    options[answerIndex].classList.add('selected');

    // ตรวจสอบคำตอบ
    setTimeout(() => {
        isAnswered = true;

        // แสดงคำตอบที่ถูกต้อง
        options[question.correct].classList.add('correct');

        // ถ้าเลือกผิด แสดงคำตอบที่ผิด
        if (selectedAnswer !== question.correct) {
            options[selectedAnswer].classList.add('incorrect');
            showFeedback('incorrect', 'คำตอบที่ถูกต้อง: ' + question.options[question.correct]);
        } else {
            score++;
            showFeedback('correct', 'ถูกต้อง! ' + question.explanation);
        }

        // เปิดใช้งานปุ่มถัดไป
        document.getElementById('nextButton').disabled = false;

        // ปิดการคลิกตัวเลือก
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

    }, 300);
}

// ฟังก์ชันแสดงข้อมูลป้อนกลับ
function showFeedback(type, message) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;

    // Nurse feedback logic with typewriter effect
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    const speechBubble = document.getElementById('speechBubble') || document.getElementById('nurseSpeechBubble');
    if (nurseContainer && speechBubble) {
        let nurseMsg = '';
        if (type === 'correct') {
            const praise = [
                'เยี่ยมมากค่ะ!',
                'เก่งสุดๆ!',
                'ตอบถูกต้องค่ะ!',
                'สุดยอดเลย!',
                'น่าประทับใจมาก!'
            ];
            nurseMsg = praise[Math.floor(Math.random() * praise.length)] + ' ' + (message || '');
        } else {
            const encourage = [
                'ไม่เป็นไรนะคะ ลองใหม่ได้!',
                'สู้ๆ ค่ะ!',
                'อย่าท้อค่ะ คุณทำได้!',
                'ผิดพลาดเป็นครูนะคะ!',
                'เดี๋ยวก็เก่งขึ้นค่ะ!'
            ];
            nurseMsg = encourage[Math.floor(Math.random() * encourage.length)] + ' ' + (message || '');
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
    }
}
// ฟังก์ชันกลับไปคำถามก่อนหน้า
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// ฟังก์ชันไปคำถามถัดไป
function nextQuestion() {
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

// ฟังก์ชันแสดงผลลัพธ์
function showResult() {
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');

    const percentage = Math.round((score / quizData.questions.length) * 100);

    // อัปเดตคะแนน
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('totalQuestionsFinal').textContent = quizData.questions.length;

    // แสดงข้อความผลลัพธ์
    let message = '';
    if (percentage >= 80) {
        message = '🎉 ยอดเยี่ยม! คุณเก่งมาก!';
    } else if (percentage >= 60) {
        message = '👍 ดีมาก! คุณทำได้ดี!';
    } else if (percentage >= 40) {
        message = '😊 ไม่เป็นไร ลองใหม่นะ!';
    } else {
        message = '💪 อย่าท้อ! ฝึกฝนเพิ่มเติม!';
    }

    document.getElementById('resultMessage').textContent = message;

    // อัปเดตวงกลมคะแนน
    const scoreCircle = document.querySelector('.score-circle');
    const degrees = (percentage / 100) * 360;
    scoreCircle.style.background = `conic-gradient(#667eea 0deg, #764ba2 ${degrees}deg, #e0e0e0 ${degrees}deg)`;
}

// ฟังก์ชันรีเซ็ตควิซ
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    isAnswered = false;

    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    // ซ่อน nurse feedback เมื่อรีเซ็ต
    const nurseContainer = document.getElementById('nurseFeedbackContainer');
    if (nurseContainer) nurseContainer.style.display = 'none';
}

// เริ่มต้นแอพ
window.onload = function () {
    console.log('Quiz App Loaded Successfully!');
    console.log('Total Questions:', quizData.questions.length);
};

