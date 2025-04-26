// Define a new Phaser scene class for the Pacman game
class Pacman extends Phaser.Scene {
  constructor() {
      super();  // Call the parent class constructor
      this.Pacman = null;  // Placeholder for the Pacman sprite
      this.direction = null;  // Current movement direction
      this.previousDirection = "left";  // Store the previous direction for tracking
      this.blockSize = 16;  // Size of each tile/block in the grid
      this.board = [];  // 2D array to represent the tilemap grid
      this.speed = 170;  // Movement speed of Pacman
      this.intersections = [];  // Store intersection points (not used yet)
      this.nextIntersection = null;  // Next intersection to aim for (not used yet)
  }

  preload() {
      // Load tileset image and tilemap JSON
      this.load.image("pacman tileset", "tileset.png");
      this.load.tilemapTiledJSON("map", "pacmantileset.json");

      // Load Pacman animation frames as spritesheets
      this.load.spritesheet("pacman", "sprites/pacman0.png", { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet("pacman1", "sprites/pacman1.png", { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet("pacman2", "sprites/pacman2.png", { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet("pacman3", "sprites/pacman3.png", { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet("pacman4", "sprites/pacman4.png", { frameWidth: 32, frameHeight: 32 });

      // Load the image used for dots
      this.load.image("dot", "sprites/dot(1).png");
  }

  create() {
      // Create the tilemap and its layer from the loaded JSON and tileset
      this.map = this.make.tilemap({ key: "map" });
      const tileset = this.map.addTilesetImage("pacman tileset");
      const layer = this.map.createLayer("Tile Layer 1", [tileset]);

      // Enable collision with tiles except index -1 (empty tiles)
      layer.setCollisionByExclusion(-1, true);

      // Create Pacman sprite at starting position and enable physics
      this.pacman = this.physics.add.sprite(230, 432, "pacman");

      // Define Pacman animation using frames from all loaded spritesheets
      this.anims.create({
          key: "pacmanAnim",
          frames: [
              { key: "pacman" },
              { key: "pacman1" },
              { key: "pacman2" },
              { key: "pacman3" },
              { key: "pacman4" },
          ],
          frameRate: 10,  // Speed of animation
          repeat: -1  // Loop animation forever
      });

      // Play the Pacman animation
      this.pacman.play("pacmanAnim");

      // Create a physics group to hold dots (collectible items)
      this.dots = this.physics.add.group();

      // Set up overlap detection between Pacman and dots
      this.physics.add.overlap(this.pacman, this.dots, this.eatDot, null, this);

      // Populate the tile board and place dots where tiles are empty
      this.populateBoardAndTrackEmptyTiles(layer);
  }

  populateBoardAndTrackEmptyTiles(layer) {
      // Loop through every tile in the layer
      layer.forEachTile((tile) => {
          // Initialize row in board array if it doesn't exist
          if (!this.board[tile.y]) {
              this.board[tile.y] = [];
          }

          // Store tile index in the board
          this.board[tile.y][tile.x] = tile.index;

          // Skip tiles outside the playable area
          if (
              tile.y < 4 ||
              (tile.y > 11 && tile.y < 23 && tile.x > 6 && tile.x < 21) ||
              (tile.y === 17 && tile.x !== 6 && tile.x !== 21)
          )
              return;

          // Get surrounding tiles (to form 2x2 area)
          let rightTile = this.map.getTileAt(tile.x + 1, tile.y, true, "Tile Layer 1");
          let bottomTile = this.map.getTileAt(tile.x, tile.y + 1, true, "Tile Layer 1");
          let rightBottomTile = this.map.getTileAt(tile.x + 1, tile.y + 1, true, "Tile Layer 1");

          // If all four tiles in a 2x2 square are empty (-1), place a dot
          if (
              tile.index === -1 &&
              rightTile && rightTile.index === -1 &&
              bottomTile && bottomTile.index === -1 &&
              rightBottomTile && rightBottomTile.index === -1
          ) {
              const x = tile.x * tile.width;
              const y = tile.y * tile.height;

              // Place dot in the center of the 2x2 tile area
              this.dots.create(x + tile.width, y + tile.height, "dot");
          }
      });
  }

  // Called when Pacman touches a dot
  eatDot(pacman, dot) {
      // Remove the dot from the scene (disable it visually and physically)
      dot.disableBody(true, true);
  }

  update() {
      // Game logic and movement would go here (currently empty)
  }
}

// Game configuration object
const config = {
  type: Phaser.AUTO,  // Use WebGL if available, else fall back to Canvas
  width: 464,
  height: 595,
  parent: "container",  // HTML container ID
  backgroundColor: "#000000",  // Set background to black
  physics: {
      default: "arcade",
      arcade: {
          gravity: { y: 0 },  // No gravity (top-down game)
          debug: false,  // Disable physics debug visuals
      },
  },
  scene: Pacman,  // Set Pacman class as the active scene
};

// Create a new Phaser game with the given configuration
const game = new Phaser.Game(config);
