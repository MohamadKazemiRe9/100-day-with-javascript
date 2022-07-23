const titleInput = document.getElementById("add-task-title");
const descriptionInput = document.getElementById("add-task-decription");
const btnAdd = document.getElementById("btn-add");
const uncomplates = document.getElementById("uncompleted-tasks-container");
const complates = document.getElementById("completed-tasks-container");
let taskDone = document.getElementsByClassName("done-task");
let taskDelete = document.getElementsByClassName("delete-task");
let editTask = document.getElementsByClassName("edit-task");
let btnContainer = document.getElementById("btn-container");


btnAdd.addEventListener("click", function () {
    const title = titleInput.value;
    const description = descriptionInput.value;
    const card = `<div class="col-12 col-sm-6 mb-3 justify-content-start justify-content-lg-center d-flex md-mx-auto">
                    <div class="card">
                        <div class="card-body shadow">
                            <h6 class="card-subtitle mb-2 text-muted">${title}</h6>
                            <p class="card-text">${description}</p>
                            <a href="#" class="card-link text-success done-task">
                                <i class="bi bi-check-square-fill"></i>
                            </a>
                            <a href="#" class="card-link text-danger delete-task">
                                <i class="bi bi-trash"></i>
                            </a>
                            <a href="#" class="card-link text-primary edit-task">
                                <i class="bi bi-pencil-square"></i>
                            </a>
                        </div>
                    </div>
                </div>`
    uncomplates.innerHTML += card;
    titleInput.value = "";
    descriptionInput.value = "";
    // ..
    taskDone = document.getElementsByClassName("done-task");
    taskDelete = document.getElementsByClassName("delete-task");
    editTask = document.getElementsByClassName("edit-task");

    // add event for add when task is added
    doneTask();
    
    // add event for delete when task is added
    deleteTasks();

    // add event for edit when task is added
    edit();
});

function deleteTasks(){
    for (let del of taskDelete){
        del.addEventListener("click", function () {
            let card = this.parentNode.parentNode.parentNode;
            card.classList.add("animate__animated", "animate__fadeOutUp");
            setTimeout(() => {
                card.remove()
            }, 500);
        })
    }
}


function doneTask() {
    for (let task of taskDone){
        task.addEventListener("click", function () {
            // remove animation complated tasks
            removeComplatedTaskClasses();
    
            let card = this.parentNode.parentNode.parentNode;
            card.classList.add("animate__animated", "animate__bounceOutLeft");
            const title = this.parentNode.querySelector(".card-subtitle").innerText;
            const description = this.parentNode.querySelector(".card-text").innerText;
            const complatedCard = `<!-- strat task -->
                                    <div class="col-12 col-sm-6 mb-3 justify-content-start justify-content-lg-center d-flex md-mx-auto animate__animated animate__bounceInRight card-container">
                                        <div class="card">
                                            <div class="card-body shadow">
                                                <h6 class="card-subtitle mb-2 text-muted">${title}</h6>
                                                <p class="card-text text-muted ">${description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end task -->`
            complates.innerHTML += complatedCard;
            setTimeout(() => {
                card.remove()
            }, 1000);
        });
    }
}


function edit(){
    for (let edit of editTask){
        edit.addEventListener("click", function(){
            let titleEdit = this.parentNode.querySelector(".card-subtitle");
            let descriptionEdit = this.parentNode.querySelector(".card-text");
            // fill inputs
            titleInput.value = titleEdit.innerText;
            descriptionInput.value = descriptionEdit.innerText;
            btnAdd.classList.add("d-none");
            const editBtn = document.createElement("button");
            editBtn.setAttribute("class", "btn btn-success");
            editBtn.innerHTML = `Edit <i class="bi bi-pencil-square"></i>`;
            btnContainer.appendChild(editBtn);
            editBtn.addEventListener("click", ()=>{
                titleEdit.innerText = titleInput.value;
                descriptionEdit.innerText = descriptionInput.value;
                titleInput.value = "";
                descriptionInput.value = "";
                btnAdd.classList.remove("d-none");
                editBtn.classList.add("d-none");
                this.parentNode.parentNode.parentNode.classList.add("animate__animated", "animate__flash");
                setTimeout(()=>{
                    this.parentNode.parentNode.parentNode.classList.remove("animate__animated", "animate__flash");
                }, 1000);
            });

        }
    )}
}

doneTask();
deleteTasks();
edit();


function removeComplatedTaskClasses() {
    let cardsContainer = document.getElementsByClassName("card-container");
    for (let card of cardsContainer) {
        card.classList.remove("animate__animated");
    }
}

