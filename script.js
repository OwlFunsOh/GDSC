const GoogleAnswers = ['Gmail', 'Chrome', ];
const MicrosoftAnswers = ['Draggable 1', 'Draggable 2'];

//check for items in container
function getItemsInContainer(containerId) {
    const container = document.getElementById(containerId);
    const items = [];
  
    container.childNodes.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE && child.draggable) {
            items.push(child.textContent.trim());
          }
    });
    return items;
}

//check answers in a box
function checkAnswers(containerId){
    correct = false;
    userAnswers = getItemsInContainer(containerId);
    userAnswers = userAnswers.sort();

    actualAnswers = null;

    if(containerId == 'GoogleBox'){
        actualAnswers = GoogleAnswers;
    }else if(containerId == 'MicrosoftBox'){
        actualAnswers = MicrosoftAnswers;
    }

    actualAnswers.sort()

    if(userAnswers.length == actualAnswers.length && 
        userAnswers.every((value, index) => value == actualAnswers[index])){
            correct = true;
    }

    if(correct == true){
        setTimeout(() => {
            alert('Items Match!');
          }, 100); // Adjust the delay as needed
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');   
  
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
  
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
  
    containers.forEach(container => {
      container.addEventListener('dragover',   
   (e) => {
        e.preventDefault();
      });
  
      container.addEventListener('drop', (e) => {
        const draggable = document.querySelector('.dragging');

        //check dropped container
        //trolling time :D
        if(container.id == 'GoogleBox'){
            document.getElementById('AnswersBox').appendChild(draggable);
        } else if(container.id == 'MicrosoftBox'){
            document.getElementById('AmazonBox').appendChild(draggable);
        } else if(container.id == 'AmazonBox'){
            document.getElementById('MicrosoftBox').appendChild(draggable);
            checkAnswers('MicrosoftBox')
        } else if(container.id == 'AnswersBox'){
            document.getElementById('GoogleBox').appendChild(draggable);
        }
  
      });
    });
  });
