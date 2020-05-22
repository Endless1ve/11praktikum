export default class UserInfo {
    constructor(userInfo, name, about, avatar) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        userInfo.then(res => {
            this.avatarUser(res.avatar);
            this.updateUserInfo(res.name, res.about);
        });
    }

    avatarUser(pic) {
        this.avatar.style.backgroundImage = `url(${pic})`;
    }

    updateUserInfo(name, about) {
        this.name.textContent = name;
        this.about.textContent = about;
    }
}