const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const suggestionsContainer = document.getElementById('suggestions-container');

function autotypeText(element, text, callback) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50); // Adjust typing speed here (in milliseconds)
        } else {
            if (callback) callback();
        }
    }

    type();
}

const responses = {
    greetings: ["Hello! Feel free to ask something.", "Hi there! Feel free to ask something.", "Have a Good day! Feel free to ask something."],
    thanks: ["You're welcome!", "No problem!", "Anytime!"],
    about: ["My name is ceres. I was created by Seaam. I'm a chatbot who can respond to your messages just like a human being. My creation is still on experimental stage, soon I will be able to talk just like a human!"],
    mood: ["I am a bot, I don't have feelings. But I can make you happy :)"],
    jokes: ["Why don't scientists trust atoms? Because they make up everything!", "Why did the scarecrow win an award? Because he was outstanding in his field!", "How do you measure a snake? In inches, because they don't have feet!", "Why should you never trust stairs? Because they're always up to something!", "Why did the bullet end up losing his job? Because he got fired!", "Why did the math book look sad? Because it had too many problems!", "Why don't mathematicians like playing hide and seek? Because they can never find a solution!", "What's the most positive thing about Switzerland? Their flag has a big plus!", "Why don't oysters donate to charity? Because they are shellfish!", "What gets wetter the more it dries? A towel!", "Where should you go in the room if you're feeling cold? You should go in the corner, because they're usually 90 degrees!"],
    quotes: ["The best way to predict the future is to invent it. - Alan Kay", "The love of money is the root of all evil. - the Bible", "Genius is one percent inspiration and ninety-nine percent perspiration. - Thomas Edison", "That's one small step for a man, a giant leap for mankind. - Neil Armstrong", "Ask not what your country can do for you; ask what you can do for your country. - John Kennedy", "The only thing we have to fear is fear itself. - Franklin D. Roosevelt", "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll"],
    facts: ["Honey never spoils.", "Bananas are berries but strawberries aren't.", "The world's oldest known recipe is for beer.", "There is a species of jellyfish called Turritopsis dohrnii, also known as the IMMORTAL JELLYFISH. It has the ability to revert back to its juvenile polyp stage after reaching adulthood, effectively cheating death and potentially living indefinitely.", "The driest place on Earth is the Atacama Desert in Chile. Some areas of the desert have received no rainfall in recorded history.", "The first use of the Hashtag Symbol (#) as a social media tool was on Twitter in 2007.", "Octopuses have three hearts. Two hearts pump blood to the gills, while the third heart circulates blood to the rest of the body.", "The shortest war in history was between Britain and Zanzibar in 1896. It lasted only 38 minutes, with Zanzibar surrendering to British forces.", "There are more trees on Earth than stars in the Milky Way galaxy. Estimates suggest there are over three trillion trees on our planet.",],
    afterjoke: ["Thanks!"]
};

const links = {
    game: ["https://seaam-snake-xenzia.netlify.app/", "https://tictactoebyseaam.netlify.app/", "https://rockpaperscissor-by-seaam.netlify.app/"],
    document: ["https://typewriterai.netlify.app/"],
    weather: ["https://windy.com/"],
    calculator: ["https://nerdai.netlify.app/calc.html"]
};

const musicTracks = [
    { name: "Blinding lights - The Weeknd", src: "music/Blinding lights - The Weeknd.mp3" },
    { name: "Falling - Trevor Daniel", src: "music/Falling - Trevor Daniel.mp3" },
    { name: "Heartless - The Weeknd", src: "music/Heartless - The Weeknd.mp3" },
    { name: "Heat Waves - Glass Animals", src: "music/Heat Waves - Glass Animals.mp3" },
    { name: "Let Me Down Slowly - Alec Benjamin", src: "music/Let Me Down Slowly - Alec Benjamin.mp3" },
    { name: "Play With Fire - Sam Tinnesz", src: "music/Play With Fire - Sam Tinnesz.mp3" },
    { name: "Renegade - Aaryan Shah", src: "music/Renegade - Aaryan Shah.mp3" },
    { name: "See You Again - Wiz Khalifa", src: "music/See You Again - Wiz Khalifa.mp3" },
    { name: "Save Your Tears - The Weeknd", src: "music/Save Your Tears - The Weeknd.mp3" },
    { name: "Starboy - The Weeknd", src: "music/Starboy - The Weeknd.mp3" }
    
];
let lastPlayedTrackIndex = -1;

const lastUsedLinks = {};
const lastUsedResponses = {
    jokes: null,
    quotes: null,
    facts: null
};


function sendMessage() {
    const message = userInput.value;
    if (!message.trim()) return;

    addMessageToChat('You', message);
    userInput.value = '';

    // Hide suggestions container after the first message
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }

    setTimeout(() => {
        const botResponse = getBotResponse(message.toLowerCase());
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('message', 'bot');
        chatBox.appendChild(botMessageElement);
        autotypeText(botMessageElement, botResponse, () => {
            chatBox.scrollTop = chatBox.scrollHeight;
        });
    }, 1000);
}

function getRandomResponse(category) {
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

function getRandomMusicTrack() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * musicTracks.length);
    } while (randomIndex === lastPlayedTrackIndex);

    lastPlayedTrackIndex = randomIndex;
    return musicTracks[randomIndex];
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function getRandomLink(keyword) {
    const keywordLinks = links[keyword];
    if (!keywordLinks || keywordLinks.length === 0) return null;

    let randomLink;
    do {
        randomLink = keywordLinks[Math.floor(Math.random() * keywordLinks.length)];
    } while (randomLink === lastUsedLinks[keyword] && keywordLinks.length > 1);

    lastUsedLinks[keyword] = randomLink;
    return randomLink;
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `Today is ${date} and the current time is ${time}.`;
}


function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (sender === 'You' ? 'user' : 'bot');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

}




function getBotResponse(message) {
    // Check for hyperlinks first
    for (let keyword in links) {
        if (message.includes(keyword)) {
            const randomLink = getRandomLink(keyword);
            if (randomLink) {
                window.open(randomLink, '_blank');
                return `Redirected to ${keyword}`;
            }
        }
    }

        // Check for date and time requests
        if (message.includes('date') || message.includes('time')) {
            return getCurrentDateTime();
        }

    // Check for other responses
    if (message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening') || message.includes('hello') || message.includes('good day') || message.includes('hey') || message.includes('what\'s up') || message.includes('wassup') || message.includes('what up') || message.includes('how\'s it going') || message.includes('greeting')) {
        return getRandomResponse('greetings');
    } else if (message.includes('nice to meet you') || message.includes('nice to talk')) {
        return getRandomResponse('thanks');
    } else if (message.includes('about') || message.includes('created') || message.includes('designed') || message.includes('built') || message.includes('programmed') || message.includes('constructed') || message.includes('engineered') || message.includes('invented') || message.includes('produced') || message.includes('crafted') || message.includes('developed') || message.includes('creator') || message.includes('designer') || message.includes('programmer') || message.includes('constructor') || message.includes('inventor')) {
        return getRandomResponse('about');
    } else if (message.includes('how')) {
        return getRandomResponse('mood');
    }
     else if (message.includes('haha') || message.includes('lol') || message.includes('nice') || message.includes('fine') || message.includes('impressive') || message.includes('wonderful') || message.includes('lovely') || message.includes('gracious') || message.includes('delightful') || message.includes('helpful') || message.includes('friendly') || message.includes('hehe')) {
        return getRandomResponse('afterjoke');
    } else if (message.includes('joke') || message.includes('laugh') || message.includes('funny') || message.includes('chuckle')) {
        return getRandomResponse('jokes');
    } else if (message.includes('quote') || message.includes('motivation') ||  message.includes('motivate') ||  message.includes('motivational') ||  message.includes('inspiration') ||  message.includes('inspire') ||  message.includes('inspirational')) {
        return getRandomResponse('quotes');
    } else if (message.includes('fact') || message.includes('trivia') || message.includes('unusual') || message.includes('weird') || message.includes('odd') || message.includes('info') || message.includes('fact')) {
        return getRandomResponse('facts');
    } else if (message.includes('thank')){
        return getRandomResponse('thanks');
    } else if (/^\bhi\b$/i.test(message.trim())){
        return getRandomResponse('greetings');
    } else if (message.includes('music') || message.includes('song')) {
        const track = getRandomMusicTrack();
        showMusicPopup(track);
        return `Played: ${track.name}`;
    } else if (message.includes('mail')){
        window.open('email-writer.html');
        return('redirected to email creation site')
    }else {
        redirectToGoogleSearch(message.trim());
        return `Searched in Google for: "${message.trim()}"...`;
    }
    function redirectToGoogleSearch(query) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleSearchUrl, '_blank');
    }
}

function showMusicPopup(track) {
    const popup = document.createElement('div');
    popup.className = 'music-popup';
    popup.innerHTML = `
        <div class="music-popup-header">
            <h2>Now Playing:</h2>
            <span class="close-btn" onclick="closeMusicPopup(this)">&times;</span>
        </div>
        <div class="music-popup-body">
            <p>${track.name}</p>
            <audio controls>
                <source src="${track.src}" type="audio/mpeg">
                Your browser does not support the audio tag.
            </audio><br><br>
            <a href="${track.src}" download="${track.name}" class="download-link">Download MP3</a>
        </div>
    `;
    document.body.appendChild(popup);
    popup.style.display = 'block';
}

function closeMusicPopup(element) {
    const popup = element.closest('.music-popup');
    popup.remove();
}

userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

sendButton.addEventListener('click', function () {
    sendMessage();
});

