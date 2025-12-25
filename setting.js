document.addEventListener('DOMContentLoaded', () => {
    console.log('Setting Page loaded!');
    
    // Future logic for handling form submissions, 
    // saving preferences via API, and handling source connections 
    // will go here.

    // Example: Handling the "Add New Source" button
    document.querySelector('.data-sources-panel button').addEventListener('click', () => {
        alert('Opening API connection wizard...');
    });
});