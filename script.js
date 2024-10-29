const GoogleAnswers = ['Gmail', 'Chrome', 'Youtube', 'Gemini'];
const MicrosoftAnswers = ['Bing', 'Copilot', 'Excel', 'OneDrive'];
const AmazonAnswers = ['Kindle', 'Simple Storage Service', 'Amplify', 'Lambda']

//check for items in container
function getItemsInContainer(containerId) {
    const container = document.getElementById(containerId);
    const items = [];
  
    container.childNodes.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE && child.draggable) {
            items.push(child.textContent.trim());
          }
    });

    //alert(items);
    return items;
}

//check answers in a box
function checkAnswers(containerId){
    correct = false;
    userAnswers = getItemsInContainer(containerId);
    userAnswers = userAnswers.sort();

    actualAnswers = null;

    if(containerId == 'GoogleAnswers'){
        actualAnswers = GoogleAnswers;
    }else if(containerId == 'MicrosoftAnswers'){
        actualAnswers = MicrosoftAnswers;
    }else if(containerId == 'AmazonAnswers'){
        actualAnswers = AmazonAnswers;
    }

    actualAnswers.sort()

    if(userAnswers.length == actualAnswers.length && 
        userAnswers.every((value, index) => value == actualAnswers[index])){
            correct = true;
    }
    
    //if(correct == true){
    //    setTimeout(() => {
    //        alert('Items Match!');
    //      }, 100); // Adjust the delay as needed
    //}
    
    return correct;
}

function checkAllAnswers(){
    GoogleCorrect = checkAnswers('GoogleAnswers');
    AmazonCorrect = checkAnswers('AmazonAnswers');
    MicrosoftCorrect = checkAnswers('MicrosoftAnswers')

    if(GoogleCorrect && AmazonCorrect && MicrosoftCorrect){
      return true;
    }

    return false;
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
            document.getElementById('AnswerContainer').appendChild(draggable);
        } else if(container.id == 'MicrosoftBox'){
            document.getElementById('AmazonAnswers').appendChild(draggable);
            checkAnswers('AmazonAnswers');
        } else if(container.id == 'AmazonBox'){
            document.getElementById('MicrosoftAnswers').appendChild(draggable);
            checkAnswers('MicrosoftAnswers');
        } else if(container.id == 'AnswersBox'){
            document.getElementById('GoogleAnswers').appendChild(draggable);
            checkAnswers('GoogleAnswers');
        }

        if(checkAllAnswers()){
          setTimeout(() => {
          alert('All Items Match!');
          }, 100); // Adjust the delay as needed
        }
  
      });
    });
  });
