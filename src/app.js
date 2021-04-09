import Card from "./card";

class App {
  constructor() {
    this.list = [];
    this.id = 1;
    this.inputTitle = document.getElementById("inputTitle");
    this.inputContent = document.getElementById("inputContent");
    this.htmlList = document.getElementById("cards-list");

    this.btnSave = document.getElementById("btn-save");
    this.btnUpdate = document.getElementById("btn-update");
    this.btnDeleteAll = document.getElementById("btn-delete-all");

    this.getLocalStorage();
    this.registerEvents();
  }

  registerEvents() {
    this.btnSave.onclick = () => this.addCard();
    this.btnUpdate.onclick = () => this.saveUpdatedCard();
    this.btnDeleteAll.onclick = () => this.deleteAllCards();
  }

  registerButtons() {
    document.querySelectorAll(".btn-destroy").forEach(item => {
      item.onclick = (event) => this.deleteCard(event);
    });

    document.querySelectorAll(".edit-card").forEach(item => {
      item.onclick = (event) => this.editCard(event);
    });
  }
 
  addCard() {
    const card = this.createCard();

    if(card === undefined) {  
      alert("não foi possível adicionar um card com valores vazios");
    } else {
      this.list.push(card);

      this.updateScreen()
      this.registerButtons();

      this.inputTitle.value = "";
      this.inputContent.value = "";
    }
    
  }

  createCard() {
    if(this.inputTitle.value == "" || this.inputContent.value == "") {
      alert("Digite valores");
    } else {
      const avatar = Card.createAvatar();
      const newCard = new Card(this.id, this.inputTitle.value, this.inputContent.value, avatar);

      this.id++;
      return newCard;
    }
  }

  deleteCard(event) {
    const cardRemoved = event.path[3];
    const removedId = parseInt(cardRemoved.dataset.id);
    
    const newList = this.list.filter(item => item.id !== removedId);

    this.list = newList;
    cardRemoved.remove();
    this.saveLocalStorage();
  }

  editCard(event) {
    const cardEdit = event.path[3];
    const editedId = parseInt(cardEdit.dataset.id);

    const card = this.list.find(item => item.id === editedId);
  
    document.getElementById("editInputTitle").value = card.title;
    document.getElementById("editInputContent").value = card.content;
    document.getElementById("editPosition").value = card.id;
  }
  
  saveUpdatedCard() {
    const title = document.getElementById("editInputTitle").value;
    const data = document.getElementById("editInputContent").value;
    const id = parseInt(document.getElementById("editPosition").value);
  
    const card = this.list.find(item => item.id === id);

    card.title = title;
    card.content = data;
  
    this.updateScreen();
  }

  updateScreen() {
    this.htmlList.innerHTML = "";

    this.list.forEach((item) => (this.htmlList.innerHTML += item.assembleCard()));

    this.registerButtons();
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem("cards", JSON.stringify(this.list));
  }

  getLocalStorage() {
    const localStorageList = JSON.parse(localStorage.getItem("cards")) || [];
    let lastId = 0;

    localStorageList.forEach(item => {
      const card = new Card(item.id, item.title, item.content, item.avatar);
      this.list.push(card);
      
      if(item.id > lastId) {
        lastId = item.id;
      }
    });

    this.id = lastId + 1;
    this.updateScreen();
  }
  
  deleteAllCards() {
    localStorage.clear();
    this.list = [];
    this.htmlList.innerHTML = "";
  }
}

new App();