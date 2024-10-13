// Get references to the popup elements
alert('TIP--click on the button on top and bottom to use more features');
const popup = document.getElementById('popup');
const popupIframe = document.getElementById('popupIframe');
const closePopup = document.getElementById('closePopup');

// Add event listener to all buttons with the class 'openPopup'
document.querySelectorAll('.openPopup').forEach(button => {
    button.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        popupIframe.src = url; // Set iframe src to the URL from the button's data-url attribute
        popup.classList.remove('hidden'); // Show the popup
    });
});

// Add event listener to the close button
closePopup.addEventListener('click', function() {
    popup.classList.add('hidden'); // Hide the popup
    popupIframe.src = ''; // Optionally clear the iframe src when hiding the popup
});
