function dragStart(event) {
  // Store the dragged element's ID
  event.dataTransfer.setData("text", event.target.id);
}

// Allow an item to be dropped into a tier
function allowDrop(event) {
  event.preventDefault(); // Allow the drop
}

// When an item is dropped into a tier
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedItem = document.getElementById(data);
  
  // Append the dragged item to the new tier
  const targetTier = event.target.closest('.tier-items');
  if (targetTier && targetTier !== draggedItem.parentElement) {
    targetTier.appendChild(draggedItem);
  }
}

// Reset all items back to their original container
document.getElementById('reset').addEventListener('click', function() {
  // Find all items (images) and move them back to the "container"
  const allItems = document.querySelectorAll('.tier-items img');
  const container = document.querySelector('.container');
  
  allItems.forEach(item => {
    container.appendChild(item);  // Move back to the container
  });
});

// Initialize draggable images and set event listeners
function initDraggableItems() {
  const images = document.querySelectorAll('.container img');
  
  images.forEach((image, index) => {
    image.setAttribute('draggable', true);
    image.setAttribute('id', `image-${index + 1}`);  // Unique ID for each image
    image.addEventListener('dragstart', dragStart);
  });
}

// Call initDraggableItems to set up the initial state when the page loads
window.onload = initDraggableItems;
