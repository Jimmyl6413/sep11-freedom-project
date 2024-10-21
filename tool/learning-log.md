# Tool Learning Log

## Tool: **Kaboom.js**

## Project: **Escape room, Geometry dash, Pac-man**

---
### 9/30/2024:
* Created a [kaboom.html](kaboom.html) and installed kaboom using the CDN.
* Began practicing and testing out codes while watching tutorials on Kaboom js.
* Found basic tutorials on Kaboom js on youtube.
* Found a tutorial on making a [Flappy birds game](https://www.youtube.com/watch?v=hgReGsh5xVU).
* I feel like this tutorial will help me get a hang of how games are made with kaboom and how different concepts work in kaboom js.
### 10/6/2024:
* Began processing and trying to tinker with the Flappy Birds Tutorial video.
* Learned how to use and import sprites to my IDE.

### 10/12/2024:
* Ran into a problem that wasted 10 minutes of my time. When I tried importing the sprite, I typed spirte instead of sprite which was very hard to tell but thank god I remembered to look at the console to see what the problem was or else who knows how long it would of took me to realize.
* Importing sprites
* Learned how to make my sprites jump & move.
* Learned how to set gravity.

### 10/20/2024:
* Added a background img
* Added text to the game
*
// Update loop for moving pipes
function movePipes() {
    const pipes = get('pipe'); // Get all pipes
    pipes.forEach(pipe => {
        pipe.move(-PIPE_SPEED * dt(), 0); // Move pipes left
        // Remove pipes that have gone off-screen
        if (pipe.pos.x < -PIPE_WIDTH) {
            pipe.destroy();
        }
    });
}

// Game loop
loop(1, () => {
    spawnPipe();
});

// Update function
action(() => {
    movePipes();
});


<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->
