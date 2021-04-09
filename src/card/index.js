class Card {
  constructor(id, title, content, avatar) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.avatar = avatar;
  }

  assembleCard() {
    const html = `<div class="col-12 col-sm-6 col-lg-3 mb-5" data-id="${this.id}">
                      <div class="card">
                      <img src="${this.avatar}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${this.title}</h5>
                          <p class="card-text">${this.content}</p>
                          <button type="button" class="btn btn-primary edit-card" data-toggle="modal" data-target="#editCard">Editar</button>
                          <button class="btn btn-danger btn-destroy">Excluir</button>
                        </div>
                      </div>
                    </div>`;

    return html;
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static createAvatar() {
    return `
      https://www.gravatar.com/avatar/${this.getRandomInt(1, 500)}?d=robohash`;
  }
}

export default Card;