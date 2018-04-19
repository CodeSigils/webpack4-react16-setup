const requestAnimationFrame = cb => {
  setTimeout(cb, 0);
};

// Assign the above function to the global function
global.requestAnimationFrame = requestAnimationFrame;

export default requestAnimationFrame;
