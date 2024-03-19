// Show edit button on image hover
var imageContainers = document.querySelectorAll('.image-container');
imageContainers.forEach(function (container) {
  container.addEventListener('mouseenter', function () {
    this.querySelector('.edit-btn').style.display = 'block';
  });
  container.addEventListener('mouseleave', function () {
    this.querySelector('.edit-btn').style.display = 'none';
  });
});

// Open modal on edit button click
var editBtns = document.querySelectorAll('.edit-btn');
editBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var imageUrl = this.parentElement.querySelector('img').src;
    document.getElementById('editedImage').src = imageUrl;
    document.getElementById('imageEditorModal').classList.add('show');
    document.getElementById('imageEditorModal').style.display = 'block'; // Ensure modal is displayed
  });
});

// Show filter options based on selected filter
document.getElementById('filter').addEventListener('change', function () {
  var filterOptions = document.getElementById('filterOptions');
  if (this.value !== 'none') {
    filterOptions.style.display = 'block';
  } else {
    filterOptions.style.display = 'none';
  }
});

// Apply filter to the image
document.getElementById('applyFilterBtn').addEventListener('click', function () {
  var selectedFilter = document.getElementById('filter').value;
  var filterValue = document.getElementById('filterValue').value;
  var filterProperty = selectedFilter + '(' + filterValue + '%)';
  document.getElementById('editedImage').style.filter = filterProperty;
});

// Reset filter
document.getElementById('resetFilterBtn').addEventListener('click', function () {
  document.getElementById('editedImage').style.filter = 'none';
  document.getElementById('filterOptions').style.display = 'none';
});
// Close modal when clicking the close button
document.querySelector('.modal-header .close').addEventListener('click', function () {
  document.getElementById('imageEditorModal').classList.remove('show');
  document.getElementById('imageEditorModal').style.display = 'none';
});


document.getElementById('downloadBtn').addEventListener('click', function () {
  var editedImage = document.getElementById('editedImage');
  var filterStyle = editedImage.style.filter;

  // Retrieve inputs
  var titleInput = document.getElementById('title');
  var formatInput = document.getElementById('format');

  // Get values from inputs
  var title = titleInput.value;
  var format = formatInput.value;

  var filteredImage = new Image();
  filteredImage.onload = function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Apply filter to the canvas
    canvas.width = filteredImage.width;
    canvas.height = filteredImage.height;
    ctx.filter = filterStyle;
    ctx.drawImage(filteredImage, 0, 0);

    // Create download link
    var downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png'); // Always download as PNG
    downloadLink.download = title + '.' + format; // Set filename using the actual title and format

    // Store inputs in local storage
    var imageDetails = {
      title: title,
      format: format,
      imageUrl: editedImage.src
    };
    localStorage.setItem('imageDetails', JSON.stringify(imageDetails));

    // Trigger download and close modal
    downloadLink.addEventListener('click', function () {
      document.getElementById('imageEditorModal').classList.remove('show');
      document.getElementById('imageEditorModal').style.display = 'none';
      alert('Image downloaded successfully!');
    });


    // Trigger download
    downloadLink.click();
  };

  // Set the source of filteredImage to the src of the edited image
  filteredImage.src = editedImage.src;
});


//------------------------------------------------------------file uploding-------------------------------------------------------//


// document.getElementById('file').addEventListener('change', function(event) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = function(e) {
//       const img = document.createElement('img');
//       img.src = e.target.result;
//       img.onload = function() {
//           URL.revokeObjectURL(this.src); // Clean up
//       };
//       img.style.width = '220px'; // Set width
//       img.style.height = '180px'; // Set height
//       document.getElementById('imgcontainer').appendChild(img);
//   };

//   reader.readAsDataURL(file);
// });


// Get DOM elements
const fileInput = document.getElementById('file');
const uploadedImage = document.getElementById('uploadedImage');
const filterSelect = document.getElementById('filter2');
const filterValueInput = document.getElementById('filterValue2');
const applyFilterBtn = document.getElementById('applyFilterBtn2');
const resetFilterBtn = document.getElementById('resetFilterBtn2');
const titleInput = document.getElementById('title2');
const formatSelect = document.getElementById('format2');
const downloadBtn = document.getElementById('downloadBtn2');

document.querySelector('.modal-header .Close').addEventListener('click', function () {
  document.getElementById('imageUploadModal').classList.remove('show');
  document.getElementById('imageUploadModal').style.display = 'none';
});



// Apply filter function
function applyFilter() {
    const filter = filterSelect.value;
    const filterValue = filterValueInput.value;
    uploadedImage.style.filter = `${filter}(${filterValue}%)`;
}

// Reset filter function
function resetFilter() {
    uploadedImage.style.filter = 'none';
    filterValueInput.value = 0;
}

// Handle file input change
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

// Add event listener for filter select
document.getElementById('filter2').addEventListener('change', function () {
  var selectedFilter = this.value;
  var filterValueInput = document.getElementById('filterValue2');
  var filterOptions = document.getElementById('filterOptions2');

  // Show filter range input if a filter other than 'none' is selected
  if (selectedFilter !== 'none') {
      filterValueInput.style.display = 'block';
      filterOptions.style.display = 'block';
  } else {
      filterValueInput.style.display = 'none';
      filterOptions.style.display = 'none';
  }
});

// Apply filter
document.getElementById('applyFilterBtn2').addEventListener('click', function () {
  var selectedFilter = document.getElementById('filter2').value;
  var filterValue = document.getElementById('filterValue2').value;
  var filterProperty = selectedFilter + '(' + filterValue + '%)';
  document.getElementById('uploadedImage').style.filter = filterProperty;
});

// Reset filter
document.getElementById('resetFilterBtn2').addEventListener('click', function () {
  document.getElementById('uploadedImage').style.filter = 'none';
  document.getElementById('filterOptions2').style.display = 'none';
});



// Download button click event
// Download button click event
document.getElementById('downloadBtn2').addEventListener('click', function () {
  var selectedFilter = document.getElementById('filter2').value;
  var filterValue = document.getElementById('filterValue2').value;
  var filterProperty = selectedFilter + '(' + filterValue + '%)';

  // Store data in local storage
  var title = titleInput.value;
  var imgSrc = uploadedImage.src;
  var format = formatSelect.value;

  // Combine data into one object
  var data = {
    title: title,
    imgSrc: imgSrc,
    format: format
  };

  // Store data in localStorage
  localStorage.setItem('UploadData', JSON.stringify(data));



  // Create a new image to ensure it's loaded
  var img = new Image();
  img.crossOrigin = "anonymous"; 
  img.onload = function() {
    // Create a canvas element and draw the edited image on it
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = filterProperty;
    ctx.drawImage(img, 0, 0);

    // Convert canvas to base64 encoded image data
    var imageData = canvas.toDataURL('image/' + format); 

    // Create a temporary link and trigger download
    var downloadLink = document.createElement('a');
    downloadLink.href = imageData;
    downloadLink.download = title + '.' + format; // Use the stored title for filename
    downloadLink.click();

    window.alert('Image downloaded successfully!');

    closeModal();
  };
  img.src = imgSrc;
});


function closeModal() {
document.getElementById('imageUploadModal').style.display = 'none';
var element =document.querySelector('.modal-backdrop.fade.show');
element.classList.remove('show')
}

// function closeModal(){
//   document.getElementById("imageUploadModal").style.display = "none";
//   var element = document.querySelector('.modal-backdrop.fade.show');
//   element.classList.remove('show');
// }



