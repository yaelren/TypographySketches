let isPaused = false;

// Function to handle the export button click
function handleExport() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Get the canvas data URL
    const canvas = document.querySelector('canvas');
    const dataURL = canvas.toDataURL('image/png');
    
    // Set the link properties
    link.download = 'text-waves-export.png';
    link.href = dataURL;
    
    // Trigger the download
    link.click();
}

// Function to handle the pause button click
function handlePause() {
    isPaused = !isPaused;
    const pauseButton = document.getElementById('pauseButton');
    
    if (isPaused) {
        pauseButton.textContent = '▶';
        noLoop(); // Stop the p5.js draw loop
    } else {
        pauseButton.textContent = '⏸';
        loop(); // Resume the p5.js draw loop
    }
}

// Add event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for export button
    const exportButton = document.getElementById('exportButton');
    exportButton.addEventListener('click', handleExport);
    
    // Create and add pause button
    const pauseButton = document.createElement('button');
    pauseButton.id = 'pauseButton';
    pauseButton.className = 'export-button';
    pauseButton.textContent = '⏸';
    pauseButton.style.right = '100px'; // Position it to the left of the export button
    
    // Add the pause button to the document
    document.body.appendChild(pauseButton);
    
    // Add event listener for pause button
    pauseButton.addEventListener('click', handlePause);
});
