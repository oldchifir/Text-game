// Создание элементов HTML
const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

// Создание объекта gameState для хранения состояния игры
let gameState = {};

// Функция для начала игры
function startGame() {
    // Очистка состояния игры
    gameState = {};
    // Показа текстового узла с индексом 1
    showTextNode(1);
}

// Функция для отображения текстового узла
function showTextNode(textNodeIndex) {
    // Поиск текущего узла по индексу
    const currentNode = textNodes.find(node => node.id === textNodeIndex);
    // Установка текста элемента textElement
    textElement.innerText = currentNode.text;
    // Удаление всех дочерних элементов optionButtonsElement
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    // Прохождение по массиву options текущего узла и добавление кнопок событием
    currentNode.options.forEach(option => {
        // Проверка на доступность опции
        if (isOptionAvailable(option)) {
            // Создание новой кнопки
            const button = document.createElement('button');
            // Установка текста кнопки
            button.innerText = option.text;
            // Добавление класса к кнопке
            button.classList.add('btn');
            // Привязка обработчика события нажатия к функции handleOptionSelection
            button.addEventListener('click', () => handleOptionSelection(option));
            // Добавление кнопки в элемент optionButtonsElement
            optionButtonsElement.appendChild(button);
        }
    });
    const currentImage = textNodes.find(node => node.id === textNodeIndex).image;
    const imageElement = document.getElementById('image');
    imageElement.src = currentImage;
}

// Функция для проверки доступности опции
function isOptionAvailable(option) {
    // Возврат true, если requiredState опции равен null или вызывает функцию с игровым состоянием
    return option.requiredState == null || option.requiredState(gameState);
}

// Функция для обработки выбора опции
function handleOptionSelection(option) {
    // Если следующий идентификатор текстового узла равен 0, вызывается функция startGame
    if (option.nextText <= 0) {
        startGame();
    } else {
        // Обновление состояния игры
        gameState = { ...gameState, ...option.setState };
        // Показа текстового узла с индексом следующего текстового узла
        showTextNode(option.nextText);
    }
}

const textNodes = [
    {
        id: 1,
        text: 'Вы оказываетесь потерянным в глухом лесу. Вы видит развилку дорог и должен выбрать, куда пойти',
        options: [
            {
                text: 'Пойти по широкой дороге',
                nextText: 2
            },
            {
                text: 'Пойти по узкой тропинке',
                nextText: 3
            },
            {
                text: 'Остаться на месте и ждать помощи',
                nextText: 4
            }
        ],
        image: 'img/photo_2023-12-15_21-39-48.jpg'
    },
    {
        id: 2,
        text: 'Вы сталкиваетесь с рекой, через которую нужно переплыть',
        options: [
            {
                text: 'Попытаться переплыть реку',
                nextText: 5
            },
            {
                text: 'Поискать мост или переправу',
                nextText: 6
            },
            {
                text: 'Искать другой путь вокруг реки',
                nextText: 6
            }
        ],
        image: 'img/photo_2023-12-15_22-32-29.jpg'
    },
    {
        id: 3,
        text: 'Вы натыкаетесь на заброшенную хижину',
        options: [
            {
                text: 'Зайти в хижину и поискать полезные предметы',
                nextText: 7
            },
            {
                text: 'Обойти хижину и продолжить путь',
                nextText: 8
            },
            {
                text: 'Попытаться найти следы других людей',
                nextText: 7
            }
        ],
        image: 'img/photo_2023-12-15_22-34-57.jpg'
    },
    {
        id: 4,
        text: 'Вы простояли пол часа, но так никто и не пришел',
        options: [
            {
                text: 'Пойти по широкой дороге',
                nextText: 2
            },
            {
                text: 'Пойти по узкой тропинке',
                nextText: 3
            }
        ],
        image: 'img/photo_2023-12-15_21-39-48.jpg'
    },
    {// концовка №1
        id: 5,
        text: 'Сильное течение сносит вас на камни и вы теряете сознание, позже ваше бездыханное тело находят спасатели, вы погибли',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ],
        image: 'img/photo_2023-12-15_22-36-48.jpg'
    },
    {
        id: 6,
        text: 'Вы находите дерево, поваленное через реку, вы успешно про ходите по нему и находите заброшенную хижину',
        options: [
            {
                text: 'Зайти в хижину и поискать полезные предметы',
                nextText: 7
            },
            {
                text: 'Обойти хижину и продолжить путь',
                nextText: 8
            },
            {
                text: 'Попытаться найти следы других людей',
                nextText: 7
            }
        ],
        image: 'img/photo_2023-12-15_22-34-57.jpg'
    },
    {
        id: 7,
        text: 'Вы ничичего не находите',
        options: [
            {
                text: 'Обойти хижину и продолжить путь',
                nextText: 8
            }
        ],
        image: 'img/photo_2023-12-15_22-34-57.jpg'
    },
    {
        id: 8,
        text: 'Вы шли по лесу 2 часа как вдруг подул сильнейший ветер и начался буран',
        options: [
            {
                text: 'Найти укрытие и подождать, пока буря закончится',
                nextText: 10
            },
            {
                text: 'Продолжить движение, игнорируя бурю',
                nextText: 9
            }
        ],
        image: 'img/photo_2023-12-15_22-39-54.jpg'
    },
    {// концовка №2
        id: 9,
        text: 'Идя по трапе на вас падает дерево. Вы погибли',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ],
        image: 'img/gPXy4KN9OHw.jpg'
    },
    {
        id: 10,
        text: 'Вы находите старую берлогу медведя и входите в нее. Как буря заканчивается вы видете в далеке свет',
        options: [
            {
                text: 'Идти к свету, надеясь на помощь',
                nextText: 11
            },
            {
                text: 'Остаться на месте и подождать до утра',
                nextText: 12
            }
        ],
        image: 'img/photo.jpg'
    },
    {// концовка №3
        id: 11,
        text: 'Свет оказывается фонарем спасателей, вас забирают и вы выбираетесь из леса',
        options: [
            {
                text: 'Вы победили! Играть снова',
                nextText: -1
            }
        ],
        image: 'img/ночью-ищут-человека.jpg'
    },
    {// концовка №4
        id: 12,
        text: 'Вы остаетесь на месте и укладываетесь спать, вы просыпаетесь от громкого шороха, это медевдь. Как итог вы стали его завтраком',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ],
        img: 'img/photo_2023-12-15_22-55-51.jpg'
    }
]

startGame();