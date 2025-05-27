document.addEventListener('DOMContentLoaded', () => {
    // Inject chatbot HTML into the body
    const chatbotHTML = `
    <div class="chat-widget">
        <button class="chat-toggle">
            <i class="fas fa-comments"></i>
        </button>
        <div class="chat-container">
            <div class="chat-header">
                <h3>Chat with Rushikesh AI</h3>
                <button class="close-chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages">
                <div class="message bot">
                    <p>Hi! I'm Rushikesh's AI assistant. How can I help you learn more about my professional background and interests?</p>
                </div>
                <div class="hint-buttons"></div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message...">
                <button class="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Now select elements as before
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');
    const hintButtons = document.querySelector('.hint-buttons');

    // Chatbot responses and hints
    const responses = {
        experience: {
            text: "I have diverse experience in finance and research. Currently, I'm a Research Assistant at Brock University, where I analyze credit spreads and develop empirical models. I also work as a Sales Executive at Glentel Inc, achieving 135% activation growth. Previously, I was Vice President of Brock Finance & Investment Group, overseeing three departments and managing a $100K CAD Student Investment Fund.",
            hints: [
                "What did you do as a Research Assistant?",
                "What was your biggest achievement at Glentel Inc?",
                "Tell me about your role in the Goodman Gold Challenge.",
                "What did you accomplish as Vice President at BFIG?",
                "How did you use R or Python in your work?",
                "What kind of reports have you produced?",
                "What are your skills?",
                "What are you looking for?"
            ]
        },
        skills: {
            text: "My key skills include:\n- Financial Analysis & Modeling\n- Research & Data Analysis\n- Sales & Business Development\n- Leadership & Team Management\n- Investment Strategy\n- Programming (R/Python)\n- Multilingual (English, Hindi, Marathi, French)",
            hints: [
                "What financial modeling tools do you use?",
                "How many languages do you speak?",
                "What are your strengths in sales?",
                "How do you approach investment analysis?",
                "What leadership skills have you developed?",
                "What are you looking for?"
            ]
        },
        looking: {
            text: "I'm seeking opportunities in finance, particularly in:\n- Investment Analysis\n- Financial Research\n- Portfolio Management\n- Business Development\n- Corporate Finance\nI'm open to both full-time positions and internships that will help me grow professionally.",
            hints: [
                "What type of internship are you seeking?",
                "Are you open to relocation?",
                "What are your career goals?",
                "What industries are you interested in?",
                "What kind of team do you want to work with?",
                "Show me your resume",
                "How can I contact you?"
            ]
        },
        contact: {
            text: "I'd love to connect with you personally! Please feel free to email me at <b>rushikeshdokhale@gmail.com</b>, connect with me on <a href='https://www.linkedin.com/in/rushikeshdokhale/' target='_blank'>LinkedIn</a>, or call me at <b>+1 905-341-6800</b>. I'm always happy to chat and answer your questions!",
            hints: [
                "Can I email you my resume?",
                "Are you available for a call?",
                "How can I connect with you on LinkedIn?",
                "Show me your LinkedIn",
                "Show me your resume"
            ]
        },
        default: {
            text: "I'm not sure about that. Would you like to know about my experience, skills, what I'm looking for, or how to contact me?",
            hints: [
                "Tell me about your experience",
                "What are your skills?",
                "What are you looking for?",
                "How can I contact you?",
                "Show me your resume"
            ]
        }
    };

    const hintAnswers = {
        "Tell me about your experience": responses.experience.text,
        "What are your skills?": responses.skills.text,
        "What are you looking for?": responses.looking.text,
        "How can I contact you?": responses.contact.text,
        "Show me your LinkedIn": "Here is my LinkedIn: <a href='https://www.linkedin.com/in/rushikeshdokhale/' target='_blank'>linkedin.com/in/rushikeshdokhale</a>",
        "Show me your resume": "You can view or download my resume <a href='resume.html' target='_blank'>here</a>.",
        "Which programming languages do you know?": "I am proficient in R and Python, especially for financial modeling and data analysis.",
        "Tell me about your leadership experience": "As Vice President of Brock Finance & Investment Group, I led three departments and managed a $100K CAD Student Investment Fund.",
        "What kind of company are you looking for?": "I'm looking for innovative companies in finance, investment, or research, where I can contribute and grow.",
        "Which role did you enjoy the most?": "I enjoyed my role as Vice President at Brock Finance & Investment Group the most, as it allowed me to lead, mentor, and make a tangible impact.",
        "Tell me about a challenge you overcame": "One challenge was leading a team to establish a Student Investment Fund. Coordinating with the dean and alumni required persistence and strong communication.",
        "What did you do as a Research Assistant?": "As a Research Assistant at Brock University, I analyzed a 10-year dataset of credit spreads using R/Python, developed empirical models, and produced reports for policy recommendations.",
        "What was your biggest achievement at Glentel Inc?": "At Glentel Inc, I achieved 135% activation growth, negotiated plans for 228 businesses, and was recognized for leadership potential.",
        "Tell me about your role in the Goodman Gold Challenge.": "In the Goodman Gold Challenge, I analyzed gold mining projects, built DCF valuations, and presented a winning stock pitch.",
        "What did you accomplish as Vice President at BFIG?": "As Vice President at BFIG, I oversaw 3 departments, helped establish a $100K Student Investment Fund, and supervised the Analyst Program.",
        "How did you use R or Python in your work?": "I used R and Python for data analysis, modeling credit spreads, and improving predictive accuracy in research projects.",
        "What kind of reports have you produced?": "I produced 8 reports on yield fluctuations and macro correlations for academic and policy use.",
        "What financial modeling tools do you use?": "I use Excel, R, Python, and Bloomberg Terminal for financial modeling.",
        "How many languages do you speak?": "I speak English, Hindi, Marathi, and am learning French.",
        "What are your strengths in sales?": "My strengths in sales include negotiation, relationship building, and consistently exceeding targets.",
        "How do you approach investment analysis?": "I use a combination of DCF, Monte Carlo simulations, and market research to analyze investments.",
        "What leadership skills have you developed?": "I've developed team management, mentoring, and strategic planning skills through my roles in student organizations and work.",
        "What type of internship are you seeking?": "I'm seeking internships in finance, investment analysis, or research.",
        "Are you open to relocation?": "Yes, I am open to relocation for the right opportunity.",
        "What are your career goals?": "My career goals are to become a leading investment analyst and contribute to innovative financial solutions.",
        "What industries are you interested in?": "I'm interested in finance, investment, research, and technology-driven industries.",
        "What kind of team do you want to work with?": "I enjoy working with collaborative, growth-oriented teams.",
        "Can I email you my resume?": "Yes, you can email me at rushikeshdokhale@gmail.com.",
        "Are you available for a call?": "Yes, you can call me at +1 905-341-6800.",
        "How can I connect with you on LinkedIn?": "Here is my LinkedIn: <a href='https://www.linkedin.com/in/rushikeshdokhale/' target='_blank'>linkedin.com/in/rushikeshdokhale</a>",
        "What awards have you won?": "I've won 1st place at BFIG Stock Pitch Goodman, Top 5 at GCC Mining Stock Pitch, and a bronze medal at the U20-200M Nationals.",
        "Tell me about your academic background.": "I'm pursuing a BBA in Finance at Brock University, with a GPA of 3.6/4.0 and relevant courses in Bloomberg, Canadian Securities, and Financial Modelling.",
        "What are your hobbies?": "My hobbies include trading strategies, investments, geopolitics, hiking, cricket, rock skipping, and instrumental music.",
        "Hi": "Hello! How can I help you today? You can ask me about my experience, skills, education, or interests.",
        "How are you?": "I'm doing great, thank you! I'm always ready to help you learn more about my professional background.",
        "Tell me about yourself": "I'm Rushikesh Dokhale, a finance professional with a passion for research, investment analysis, and continuous learning.",
        "What can you do?": "I can answer questions about my experience, skills, education, achievements, and interests. Just ask!",
        "Why should I hire you?": "I bring a strong academic background, proven research and sales experience, and a passion for finance and investment. I'm a quick learner and a dedicated team player.",
        "What's your biggest strength?": "My biggest strength is my analytical mindset and ability to solve complex problems using data-driven approaches.",
        "What's your biggest weakness?": "I tend to be a perfectionist, but I'm learning to balance quality with efficiency.",
        "Tell me a fun fact about you": "I once won a bronze medal at the U20-200M Nationals in athletics, and I love rock skipping!",
        "What are your strengths?": "My strengths include analytical thinking, leadership, and adaptability. I excel at financial analysis and thrive in team environments.",
        "What are your weaknesses?": "I tend to be a perfectionist, but I am learning to balance quality with efficiency.",
        "Tell me about a time you overcame a challenge.": "While leading the Student Investment Fund project, I overcame resistance by building consensus and demonstrating value to stakeholders.",
        "Why do you want to work here?": "I'm passionate about finance and believe your company offers the perfect environment for growth and impact.",
        "Where do you see yourself in 5 years?": "I see myself as a senior analyst or team lead, contributing to innovative financial solutions and mentoring others.",
        "Describe a successful project you led.": "I led the establishment of a $100K Student Investment Fund at Brock University, collaborating with the dean and alumni.",
        "How do you handle tight deadlines?": "I prioritize tasks, communicate clearly with my team, and stay focused on delivering quality results efficiently."
    };

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatContainer.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    // Show hint buttons
    function showHints(hints) {
        hintButtons.innerHTML = '';
        hints.forEach(hint => {
            const button = document.createElement('button');
            button.className = 'hint-button';
            button.textContent = hint;
            button.addEventListener('click', () => {
                handleHintClick(hint);
                hintButtons.classList.remove('visible');
            });
            hintButtons.appendChild(button);
        });
        hintButtons.classList.add('visible');
    }

    // Show hint buttons at the bottom of chat (as a message)
    function showHintMessage(hints) {
        clearHintMessage();
        const hintMsg = document.createElement('div');
        hintMsg.className = 'hint-message';
        hints.forEach(hint => {
            const button = document.createElement('button');
            button.className = 'hint-button';
            button.textContent = hint;
            button.addEventListener('click', () => {
                handleHintClick(hint);
                clearHintMessage();
            });
            hintMsg.appendChild(button);
        });
        chatMessages.appendChild(hintMsg);
    }
    function clearHintMessage() {
        const oldHint = chatMessages.querySelector('.hint-message');
        if (oldHint) oldHint.remove();
    }

    // Handle hint click
    function handleHintClick(hint) {
        addMessage(hint, 'user');
        clearHintMessage();
        setTimeout(() => {
            let answer = hintAnswers[hint] || responses.default.text;
            addMessage(answer, 'bot');
            // Find the next hints based on the hint or fallback to default
            let nextHints = [];
            if (hint === "Tell me about your experience") nextHints = responses.experience.hints;
            else if (hint === "What are your skills?") nextHints = responses.skills.hints;
            else if (hint === "What are you looking for?") nextHints = responses.looking.hints;
            else if (hint === "How can I contact you?") nextHints = responses.contact.hints;
            else nextHints = responses.default.hints;
            showHints(nextHints);
            setTimeout(() => showHintMessage(nextHints), 1500);
        }, 500);
    }

    // Handle manual input
    function handleUserInput() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            clearHintMessage();

            setTimeout(() => {
                let response = responses.default;
                const lowerMessage = message.toLowerCase();

                // Handle greetings and general questions
                if (
                    lowerMessage === "hi" ||
                    lowerMessage === "hello" ||
                    lowerMessage === "hey" ||
                    lowerMessage === "how are you?" ||
                    lowerMessage === "how are you"
                ) {
                    addMessage(hintAnswers[message] || "Hello! How can I help you today? You can ask me about my experience, skills, education, or interests.", 'bot');
                    showHints(responses.default.hints);
                    setTimeout(() => showHintMessage(responses.default.hints), 1500);
                    return;
                }

                // Handle common interview questions
                if (hintAnswers[message]) {
                    addMessage(hintAnswers[message], 'bot');
                    showHints(responses.default.hints);
                    setTimeout(() => showHintMessage(responses.default.hints), 1500);
                    return;
                }

                // Expanded keyword matching
                if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
                    response = responses.experience;
                } else if (lowerMessage.includes('skill') || lowerMessage.includes('ability')) {
                    response = responses.skills;
                } else if (lowerMessage.includes('looking') || lowerMessage.includes('job') || lowerMessage.includes('position')) {
                    response = responses.looking;
                } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
                    response = responses.contact;
                } else if (lowerMessage.includes('strength')) {
                    addMessage(hintAnswers["What are your strengths?"], 'bot');
                    showHints(responses.default.hints);
                    setTimeout(() => showHintMessage(responses.default.hints), 1500);
                    return;
                } else if (lowerMessage.includes('weakness')) {
                    addMessage(hintAnswers["What are your weaknesses?"], 'bot');
                    showHints(responses.default.hints);
                    setTimeout(() => showHintMessage(responses.default.hints), 1500);
                    return;
                } // ...add more as needed

                // Fallback for unknown/complex questions
                else {
                    addMessage("Thank you for your question! While I may not have an immediate answer here, I'd be delighted to discuss it with you personally. Please feel free to reach out to me at <b>rushikeshdokhale@gmail.com</b>, connect on <a href='https://www.linkedin.com/in/rushikeshdokhale/' target='_blank'>LinkedIn</a>, or call me at <b>+1 905-341-6800</b>. I look forward to connecting and providing any information you need!", 'bot');
                    showHints(responses.default.hints);
                    setTimeout(() => showHintMessage(responses.default.hints), 1500);
                }

                if (response !== responses.default) {
                    addMessage(response.text, 'bot');
                    showHints(response.hints);
                    setTimeout(() => showHintMessage(response.hints), 1500);
                }
            }, 500);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listeners for input
    sendButton.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // Hide hint message if user interacts
    chatInput.addEventListener('input', clearHintMessage);
    chatMessages.addEventListener('click', clearHintMessage);

    // Show initial hints
    showHints(responses.default.hints);
}); 