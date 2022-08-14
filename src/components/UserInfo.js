export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            avatarLink: this._avatarElement.src
        }
    }

    setUserInfo({avatarLink, name, about}) {
        if (avatarLink !== undefined) {
            this._avatarElement.src = avatarLink;
        }
        if (name !== undefined) {
            this._nameElement.textContent = name;
        }
        if (about !== undefined) {
            this._aboutElement.textContent = about;
        }
    }
}