// Runs when a drag starts on an image
function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);

  // Store the ID of the dragged element in the browser's drag data
  // This is how we retrieve the element later in the drop function
}

// Allows an element (tier or pool) to accept dropped items
function allowDrop(event) {
  event.preventDefault();
}

// Runs when something is dropped into a tier or the image pool
function drop(event) {
  event.preventDefault();

   // Get the ID of the dragged image from drag data
  const data = event.dataTransfer.getData("text");

  // Find the actual image element using that ID
  const draggedItem = document.getElementById(data);

    // Find the closest valid drop zone:
  // either a tier row OR the image pool
  const dropZone = event.target.closest(".tier-items, .image-pool");

  if (dropZone) {

     // Move the image into the new container
    // This is what "sticks" the image into the tier
    dropZone.appendChild(draggedItem);
  }
}

// Initializes drag behavior for all images on the page
function initDraggableItems() {
  const images = document.querySelectorAll("img");

  images.forEach((image, index) => {
    image.draggable = true;

 // Give each image a unique ID so we can track it during drag/drop
    image.id = `image-${index}`;

    image.addEventListener("dragstart", dragStart);
  });
}

// Reset button: sends all tier images back to the image pool
document.getElementById("reset").addEventListener("click", () => {
   
  // Get the bottom image pool container
  const imagePool = document.querySelector(".image-pool");

  const allImages = document.querySelectorAll(".tier-items img");

  allImages.forEach(image => {
    imagePool.appendChild(image);
  });
});

// Run setup once the page fully loads
window.onload = initDraggableItems;
