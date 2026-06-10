export const preloadImageSequence = (startFrame, frameCount, imagesArray, currentFrameUrl, onInitialLoad) => {
  // Initialize the array with nulls to maintain fixed length for GSAP scrubbing
  for (let i = startFrame; i < frameCount; i++) {
    imagesArray.push(null);
  }
  
  const loadImagesChunk = (startIndex, chunkSize) => {
    let endIndex = Math.min(startIndex + chunkSize, frameCount);
    for (let i = startIndex; i < endIndex; i++) {
      const img = new Image();
      img.decoding = "async";
      
      if (i < startFrame + 10) {
        img.fetchPriority = "high";
      } else {
        img.fetchPriority = "low";
      }
      
      img.src = currentFrameUrl(i);

      if (i === startFrame && onInitialLoad) {
        img.onload = onInitialLoad;
      }
      
      imagesArray[i - startFrame] = img;
    }

    if (endIndex < frameCount) {
      const nextBatch = () => loadImagesChunk(endIndex, chunkSize);
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(nextBatch);
      } else {
        setTimeout(nextBatch, 50);
      }
    }
  };

  // Load first 20 frames immediately, the rest will lazy load in the background
  loadImagesChunk(startFrame, 20);
};
