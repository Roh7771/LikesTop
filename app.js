const posts = [];

const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.innerHTML = `
    <div class="form-group">
        <label>Введите текст или Url</label>
        <input class="form-control" data-type="text">
    </div>
    <div class="form-group">
        <label>Выберите тип поста</label>
        <select class="form-control" data-type="select">
            <option>Обычный</option>
            <option>Картинка</option>
            <option>Видео</option>
            <option>Аудио</option>
        </select>
    </div>
    <button class="btn btn-primary" data-type="button">Добавить</button>
`;

const textEl = formEl.querySelector('[data-type=text]');
const selectEl = formEl.querySelector('[data-type=select]');

buttonEl = formEl.querySelector('[data-type=button]');
buttonEl.addEventListener('click', (e) => {
    e.preventDefault();
    const text = textEl.value;
    const type = selectEl.value;
    posts.push({
        text,
        type,
        likes: 0,
    });
    textEl.value = '';
    selectEl.value = 'Обычный';
    rebuildPosts(postsEl, posts);
})

rootEl.appendChild(formEl);

const postsEl = document.createElement('div');
rootEl.appendChild(postsEl);

function rebuildPosts(containerEl, iterateItems) {
    for (const item of [...containerEl.children]) {
        containerEl.removeChild(item)
    }

    iterateItems.sort(function (a, b) {
        return b.likes - a.likes
    })

    for (const item of iterateItems) {
        const newPostEl = document.createElement('div');
        newPostEl.className = 'card mt-3';

        if (item.type === 'Обычный') {
            newPostEl.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">${item.text}</p>
                        <button data-action="like" class="btn btn-primary mr-2">❤ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'Картинка') {
            newPostEl.innerHTML = `
                <div class="card">
                    <img src="${item.text}" class="card-img-top">
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary mr-2">❤ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'Видео') {
            newPostEl.innerHTML = `
                <div class="card">
                    <div class="card-img-top embed-responsive embed-responsive-16by9">
                        <video src="${item.text}" controls=""></video>
                    </div>
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary mr-2">❤ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'Аудио') {
            newPostEl.innerHTML = `
                <div class="card">
                    <audio controls="" class="card-img-top" src="${item.text}"></audio>
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary mr-2">❤ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        }

        newPostEl.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'like') {
                item.likes++;
            } else if (e.target.dataset.action === 'dislike') {
                item.likes--;
            }
            rebuildPosts(containerEl, iterateItems);
        })

        containerEl.appendChild(newPostEl);
    }
}