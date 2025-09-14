const words = [
    { english: "apple", japanese: "りんご" },
    { english: "book", japanese: "本" },
    { english: "cat", japanese: "猫" },
    { english: "dog", japanese: "犬" },
    { english: "water", japanese: "水" },
    { english: "car", japanese: "車" },
    { english: "house", japanese: "家" },
    { english: "tree", japanese: "木" },
    { english: "flower", japanese: "花" },
    { english: "sun", japanese: "太陽" }
];

let current = 0;
let score = 0;

const question = document.getElementById('question');
const choicesContainer = document.getElementById('choices');
const choiceButtons = document.querySelectorAll('.choice-btn');
const result = document.getElementById('result');
const next = document.getElementById('next');
const scoreArea = document.getElementById('score');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomChoices(correctAnswer) {
    // 正解を除く他の単語からランダムに3つ選ぶ
    const otherWords = words
        .filter(word => word.english !== correctAnswer)
        .map(word => word.english);
    const randomChoices = shuffleArray([...otherWords])
        .slice(0, 3);
    
    // 正解を含めた4つの選択肢をシャッフル
    return shuffleArray([...randomChoices, correctAnswer]);
}

function showQuestion() {
    // 問題文を表示
    question.textContent = `「${words[current].japanese}」の英語は？`;
    result.textContent = '';
    next.style.display = 'none';

    // 選択肢を生成してボタンに表示
    const choices = getRandomChoices(words[current].english);
    choiceButtons.forEach((button, index) => {
        button.textContent = choices[index];
        button.classList.remove('correct', 'wrong');
        button.disabled = false;
    });

    scoreArea.textContent = `スコア: ${score} / ${words.length}`;
}

function checkAnswer(selectedButton) {
    const userAnswer = selectedButton.textContent;
    const correctAnswer = words[current].english;

    // すべての選択肢を無効化
    choiceButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });

    if (userAnswer === correctAnswer) {
        result.textContent = '正解！';
        score++;
    } else {
        result.textContent = '不正解！';
        selectedButton.classList.add('wrong');
    }

    next.style.display = 'inline-block';
    scoreArea.textContent = `スコア: ${score} / ${words.length}`;
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => checkAnswer(button));
});

next.addEventListener('click', () => {
    current++;
    if (current < words.length) {
        showQuestion();
    } else {
        question.textContent = 'テスト終了！';
        choicesContainer.style.display = 'none';
        next.style.display = 'none';
        result.textContent = `最終スコア: ${score} / ${words.length}`;
    }
});

showQuestion();
