let isPaused = false;
let isRecording = false;
let frames = [];
let recordingStartTime;
let currentMediaRecorder = null;

// Function to handle the export button click
function handleExport() {
    // Create and show the export dialog
    const dialog = document.createElement('div');
    dialog.className = 'export-dialog';
// /* <button class="export-option" id="exportGif">Export as GIF</button> */

    dialog.innerHTML = `
        <div class="export-dialog-content">
            <h3>Export Options</h3>
            <button class="export-option" id="exportImage">Export as Image</button>
            <button class="export-option" id="exportVideo">Export as Video</button>
            <button class="export-option" id="cancelExport">Cancel</button>
        </div>
    `;
    document.body.appendChild(dialog);

    // Add event listeners for the dialog buttons
    document.getElementById('exportImage').addEventListener('click', () => {
        exportAsImage();
        dialog.remove();
    });

    document.getElementById('exportVideo').addEventListener('click', () => {
        exportAsVideo();
        dialog.remove();
    });

    document.getElementById('cancelExport').addEventListener('click', () => {
        // Reset recording state if it was active
        if (isRecording) {
            isRecording = false;
            const exportButton = document.getElementById('exportButton');
            exportButton.textContent = 'Export';
            exportButton.style.backgroundColor = '#6b7280';
        }
        dialog.remove();
    });
}
















////==================================================================================================

// Function to export as image
function exportAsImage() {
    const link = document.createElement('a');
    const canvas = document.querySelector('canvas');
    const dataURL = canvas.toDataURL('image/png');
    link.download = 'text-waves-export.png';
    link.href = dataURL;
    link.click();
}

// Function to export as video
function exportAsVideo() {
    if (!isRecording) {
        // Start recording
        isRecording = true;
        
        // Change export button to show recording state
        const exportButton = document.getElementById('exportButton');
        exportButton.textContent = '⏺ Recording...';
        exportButton.style.backgroundColor = '#dc2626';
        
        // Change pause button to stop button
        const pauseButton = document.getElementById('pauseButton');
        pauseButton.textContent = '⏹';
        pauseButton.style.backgroundColor = '#dc2626';
        
        const canvas = document.querySelector('canvas');
        const stream = canvas.captureStream(60);
        
        // Try different MP4 configurations
        let mimeType = 'video/mp4';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'video/mp4;codecs=avc1.42E01E';
        }
        if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'video/mp4;codecs=h264';
        }
        
        currentMediaRecorder = new MediaRecorder(stream, {
            mimeType: mimeType,
            videoBitsPerSecond: 1000000 // Reduced to 1 Mbps for better compatibility
        });
        
        const chunks = [];
        currentMediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        currentMediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'text-waves-export.mp4';
            link.click();
            
            // Reset recording state
            isRecording = false;
            exportButton.textContent = 'Export';
            exportButton.style.backgroundColor = '#6b7280';
            
            // Reset pause button
            pauseButton.textContent = '⏸';
            pauseButton.style.backgroundColor = '#6b7280';
            
            currentMediaRecorder = null;
        };
        
        // Start recording with a smaller timeslice for more frequent data chunks
        currentMediaRecorder.start(1000); // Get data every second
    }
}

// Function to create video from captured frames
function createVideoFromFrames() {
    const canvas = document.querySelector('canvas');
    const video = document.createElement('video');
    video.width = canvas.width;
    video.height = canvas.height;
    
    // Create a MediaRecorder
    const stream = canvas.captureStream(60); // 60 FPS
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/mp4'
    });
    
    const chunks = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'text-waves-export.mp4';
        link.click();
    };
    
    // Start recording
    mediaRecorder.start();
    
    // // Stop recording after 6 seconds (360 frames at 60 FPS)
    // setTimeout(() => {
    //     mediaRecorder.stop();
    // }, 6000); // Changed from 5000 to 6000 for 6 seconds
}

// Function to export as GIF
function exportAsGif() {
    if (!isRecording) {
        // Start recording
        isRecording = true;
        frames = [];
        recordingStartTime = Date.now();
        
        // Change export button to show recording state
        const exportButton = document.getElementById('exportButton');
        exportButton.textContent = '⏺ Recording...';
        exportButton.style.backgroundColor = '#dc2626'; // Red color for recording
        
        // Start capturing frames
        const captureFrame = () => {
            if (isRecording) {
                const canvas = document.querySelector('canvas');
                frames.push(canvas.toDataURL('image/png'));
                setTimeout(captureFrame, 16.67); // Capture at 60 FPS
            }
        };
        captureFrame();
        
        // Stop recording after 5 seconds
        setTimeout(() => {
            isRecording = false;
            exportButton.textContent = 'Export';
            exportButton.style.backgroundColor = '#6b7280';
            
            // Create GIF from frames
            createGifFromFrames();
        }, 5000);
    }
}

// Function to create GIF from captured frames
function createGifFromFrames() {
    const canvas = document.querySelector('canvas');
    const gif = new GIF({
        workers: 2,
        quality: 10,
        width: canvas.width,
        height: canvas.height,
        fps: 30 // We'll create a 30fps GIF for better file size
    });

    // Convert data URLs to Image objects
    const loadImage = (dataUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = dataUrl;
        });
    };

    // Process frames
    Promise.all(frames.map(loadImage))
        .then((images) => {
            // Add frames to GIF
            images.forEach((img) => {
                gif.addFrame(img, { delay: 33.33 }); // 1000ms / 30fps ≈ 33.33ms
            });

            // Render the GIF
            gif.on('finished', (blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'text-waves-export.gif';
                link.click();
            });

            gif.render();
        });
}

// Function to handle the pause/stop button click
function handlePause() {
    if (isRecording) {
        // If recording, stop the recording
        if (currentMediaRecorder) {
            currentMediaRecorder.stop();
        }
    } else {
        // If not recording, handle pause/play
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
    pauseButton.style.right = '160px'; // Changed from 100px to 160px to move it further left
    
    // Add the pause button to the document
    document.body.appendChild(pauseButton);
    
    // Add event listener for pause button
    pauseButton.addEventListener('click', handlePause);
});
