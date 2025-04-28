document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const quizModal = document.getElementById('quizModal');
    const questionModal = document.getElementById('questionModal');
    const skipQuizBtn = document.getElementById('skipQuiz');
    const takeQuizBtn = document.getElementById('takeQuiz');
    const checkAnswerBtn = document.getElementById('checkAnswer');
    const revealAnswerBtn = document.getElementById('revealAnswer');
    const proceedBtn = document.getElementById('proceed');
    const quizAnswerInput = document.getElementById('quizAnswer');
    const feedbackIcon = document.getElementById('feedbackIcon');
    
    // Correct answer
    const correctAnswer = "Anekdota";
    
    // Show quiz modal immediately when page loads
    setTimeout(() => {
        document.body.classList.add('modal-active');
        quizModal.style.display = 'flex';
    }, 300);
    
    // Skip Quiz button - hide modal
    skipQuizBtn.addEventListener('click', function() {
        document.body.classList.remove('modal-active');
        quizModal.style.display = 'none';
    });
    
    // Take Quiz button - show question modal
    takeQuizBtn.addEventListener('click', function() {
        quizModal.style.display = 'none';
        questionModal.style.display = 'flex';
    });
    
    // Check Answer button
    checkAnswerBtn.addEventListener('click', function() {
        const userAnswer = quizAnswerInput.value.trim();
        
        if (userAnswer === "") {
            return; // Don't check empty answers
        }
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            // Correct answer
            quizAnswerInput.classList.add('correct');
            quizAnswerInput.classList.remove('incorrect');
            
            feedbackIcon.innerHTML = '<i class="fas fa-check"></i>';
            feedbackIcon.classList.add('correct', 'show');
            feedbackIcon.classList.remove('incorrect');
            
            // Hide check button, show proceed button
            checkAnswerBtn.style.display = 'none';
            proceedBtn.style.display = 'inline-block';
        } else {
            // Incorrect answer
            quizAnswerInput.classList.add('incorrect');
            quizAnswerInput.classList.remove('correct');
            
            feedbackIcon.innerHTML = '<i class="fas fa-times"></i>';
            feedbackIcon.classList.add('incorrect', 'show');
            feedbackIcon.classList.remove('correct');
        }
    });
    
    // Reveal Answer button
    revealAnswerBtn.addEventListener('click', function() {
        quizAnswerInput.value = correctAnswer;
        quizAnswerInput.classList.add('correct');
        quizAnswerInput.classList.remove('incorrect');
        
        feedbackIcon.innerHTML = '<i class="fas fa-check"></i>';
        feedbackIcon.classList.add('correct', 'show');
        feedbackIcon.classList.remove('incorrect');
        
        // Hide check button, show proceed button
        checkAnswerBtn.style.display = 'none';
        proceedBtn.style.display = 'inline-block';
    });
    
    // Proceed button - hide modal
    proceedBtn.addEventListener('click', function() {
        document.body.classList.remove('modal-active');
        questionModal.style.display = 'none';
    });
    
    // Reset input styles when user starts typing again
    quizAnswerInput.addEventListener('input', function() {
        if (this.value.trim() !== "") {
            this.classList.remove('correct', 'incorrect');
            feedbackIcon.classList.remove('show', 'correct', 'incorrect');
            
            // If we had shown the proceed button, switch back to check button
            if (proceedBtn.style.display === 'inline-block') {
                proceedBtn.style.display = 'none';
                checkAnswerBtn.style.display = 'inline-block';
            }
        }
    });
});