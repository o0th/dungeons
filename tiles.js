/**
 * @return canvas {HTMLCanvasElement}
 */

export const Tiles = (columns = 12, rows = 6, size = 100, padding = 10, margin = 10) => {
  const tiles = plan(columns, rows, size, padding, margin)  

  const canvas = document.createElement('canvas');
  const context = canvas.getContext("2d");

  canvas.height = rows * size + padding * 2
  canvas.width = columns * size + padding * 2

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    tiles.forEach(tile => {
        tile.isHover = (
          mouseX > tile.x &&
          mouseX < tile.x + tile.width &&
          mouseY > tile.y &&
          mouseY < tile.y + tile.height
      )
    });

    draw(canvas, context, tiles)
  });

  draw(canvas, context, tiles)
  return canvas
}

const plan = (columns, rows, size, padding, margin) => {
  const tiles = []

  for (let i = 0; i < columns; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const x = i * size + padding + margin / 2;
      const y = j * size + padding + margin / 2;
      const height = size - margin;
      const width = size - margin;
      tiles.push({ x, y, height, width });
    }
  }

  return tiles 
}

const draw = (canvas, context, tiles) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  tiles.forEach((tile) => {
    context.fillStyle = tile.isHover ?  "#ddd" : "#eee";
    context.fillRect(tile.x, tile.y, tile.width, tile.height);
  })
}
