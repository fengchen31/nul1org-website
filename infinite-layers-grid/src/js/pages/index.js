import '../../styles/index.scss';
import '../../styles/pages/index.scss';
import InfiniteGrid from '../components/infinite-grid';

export default class Index {
  constructor() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    
    // Shuffle array helper
    const shuffleArray = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const allImages = [
      {src: "JohnnyTerror_Lookbook1.jpeg"},
      {src: "JohnnyTerror_Lookbook2.jpeg"},
      {src: "JohnnyTerror_Lookbook3.jpeg"},
      {src: "JohnnyTerror_Lookbook4.jpeg"},
      {src: "JohnnyTerror_Lookbook5.jpeg"},
      {src: "JohnnyTerror_Lookbook6.jpeg"},
      {src: "JohnnyTerror_Lookbook7.jpeg"},
      {src: "JohnnyTerror_Lookbook8.jpeg"},
      {src: "JohnnyTerror_Lookbook9.jpeg"},
      {src: "nul1.org_16th_Lookbook1.jpeg"},
      {src: "nul1.org_16th_Lookbook2.jpeg"},
      {src: "nul1.org_16th_Lookbook3.jpeg"},
      {src: "nul1.org_16th_Lookbook4.jpeg"},
      {src: "nul1.org_16th_Lookbook5.jpeg"},
      {src: "nul1.org_16th_Lookbook6.jpeg"},
      {src: "nul1.org_16th_Lookbook7.jpeg"},
      {src: "nul1.org_16th_Lookbook8.jpeg"},
      {src: "nul1.org_17th_Lookbook1.jpeg"},
      {src: "nul1.org_17th_Lookbook10.jpeg"},
      {src: "nul1.org_17th_Lookbook2.jpeg"},
      {src: "nul1.org_17th_Lookbook3.jpeg"},
      {src: "nul1.org_17th_Lookbook4.jpeg"},
      {src: "nul1.org_17th_Lookbook5.jpeg"},
      {src: "nul1.org_17th_Lookbook6.jpeg"},
      {src: "nul1.org_17th_Lookbook7.jpeg"},
      {src: "nul1.org_17th_Lookbook8.jpeg"},
      {src: "nul1.org_17th_Lookbook9.jpeg"},
      {src: "nul1.org_cs_Lookbook1.jpeg"},
      {src: "nul1.org_cs_Lookbook10.jpeg"},
      {src: "nul1.org_cs_Lookbook2.jpeg"},
      {src: "nul1.org_cs_Lookbook3.jpeg"},
      {src: "nul1.org_cs_Lookbook4.jpeg"},
      {src: "nul1.org_cs_Lookbook5.jpeg"},
      {src: "nul1.org_cs_Lookbook6.jpeg"},
      {src: "nul1.org_cs_Lookbook7.jpeg"},
      {src: "nul1.org_cs_Lookbook8.jpeg"},
      {src: "nul1.org_cs_Lookbook9.jpeg"},
      {src: "nul1.org_eggtall_Lookbook1.jpeg"},
      {src: "nul1.org_eggtall_Lookbook10.jpeg"},
      {src: "nul1.org_eggtall_Lookbook2.jpeg"},
      {src: "nul1.org_eggtall_Lookbook3.jpeg"},
      {src: "nul1.org_eggtall_Lookbook4.jpeg"},
      {src: "nul1.org_eggtall_Lookbook5.jpeg"},
      {src: "nul1.org_eggtall_Lookbook6.jpeg"},
      {src: "nul1.org_eggtall_Lookbook7.jpeg"},
      {src: "nul1.org_eggtall_Lookbook8.jpeg"},
      {src: "nul1.org_eggtall_Lookbook9.jpeg"},
      {src: "nul1org_10th_1.jpeg"},
      {src: "nul1org_10th_2.jpeg"},
      {src: "nul1org_10th_3.jpeg"},
      {src: "nul1org_10th_4.jpeg"},
      {src: "nul1org_10th_5.jpeg"},
      {src: "nul1org_10th_6.jpeg"},
      {src: "nul1org_10th_7.jpeg"},
      {src: "nul1org_10th_8.jpeg"},
      {src: "nul1org_10th_9.jpeg"},
      {src: "nul1org_11th_1.jpeg"},
      {src: "nul1org_11th_10.jpeg"},
      {src: "nul1org_11th_2.jpeg"},
      {src: "nul1org_11th_3.jpeg"},
      {src: "nul1org_11th_4.jpeg"},
      {src: "nul1org_11th_5.jpeg"},
      {src: "nul1org_11th_6.jpeg"},
      {src: "nul1org_11th_7.jpeg"},
      {src: "nul1org_11th_8.jpeg"},
      {src: "nul1org_11th_9.jpeg"},
      {src: "nul1org_12th_1.jpeg"},
      {src: "nul1org_12th_10.jpeg"},
      {src: "nul1org_12th_2.jpeg"},
      {src: "nul1org_12th_3.jpeg"},
      {src: "nul1org_12th_4.jpeg"},
      {src: "nul1org_12th_5.jpeg"},
      {src: "nul1org_12th_6.jpeg"},
      {src: "nul1org_12th_7.jpeg"},
      {src: "nul1org_12th_8.jpeg"},
      {src: "nul1org_12th_9.jpeg"},
      {src: "nul1org_13th_1.jpeg"},
      {src: "nul1org_13th_2.jpeg"},
      {src: "nul1org_13th_3.jpeg"},
      {src: "nul1org_13th_4.jpeg"},
      {src: "nul1org_13th_5.jpeg"},
      {src: "nul1org_13th_6.jpeg"},
      {src: "nul1org_13th_7.jpeg"},
      {src: "nul1org_13th_8.jpeg"},
      {src: "nul1org_14th_lookbook1.jpeg"},
      {src: "nul1org_14th_lookbook10.jpeg"},
      {src: "nul1org_14th_lookbook2.jpeg"},
      {src: "nul1org_14th_lookbook3.jpeg"},
      {src: "nul1org_14th_lookbook4.jpeg"},
      {src: "nul1org_14th_lookbook5.jpeg"},
      {src: "nul1org_14th_lookbook6.jpeg"},
      {src: "nul1org_14th_lookbook7.jpeg"},
      {src: "nul1org_14th_lookbook8.jpeg"},
      {src: "nul1org_14th_lookbook9.jpeg"},
      {src: "nul1org_15th_Lookbook1.jpeg"},
      {src: "nul1org_15th_Lookbook10.jpeg"},
      {src: "nul1org_15th_Lookbook2.jpeg"},
      {src: "nul1org_15th_Lookbook3.jpeg"},
      {src: "nul1org_15th_Lookbook4.jpeg"},
      {src: "nul1org_15th_Lookbook5.jpeg"},
      {src: "nul1org_15th_Lookbook6.jpeg"},
      {src: "nul1org_15th_Lookbook7.jpeg"},
      {src: "nul1org_15th_Lookbook8.jpeg"},
      {src: "nul1org_15th_Lookbook9.jpeg"},
      {src: "nul1org_16th_Lookbook1.jpeg"},
      {src: "nul1org_16th_Lookbook2.jpeg"},
      {src: "nul1org_16th_Lookbook3.jpeg"},
      {src: "nul1org_16th_Lookbook4.jpeg"},
      {src: "nul1org_16th_Lookbook5.jpeg"},
      {src: "nul1org_16th_Lookbook6.jpeg"},
      {src: "nul1org_16th_Lookbook7.jpeg"},
      {src: "nul1org_16th_Lookbook8.jpeg"},
      {src: "nul1org_4th_1.jpeg"},
      {src: "nul1org_4th_2.jpeg"},
      {src: "nul1org_4th_3.jpeg"},
      {src: "nul1org_4th_4.jpeg"},
      {src: "nul1org_4th_5.jpeg"},
      {src: "nul1org_4th_6.jpeg"},
      {src: "nul1org_4th_7.jpeg"},
      {src: "nul1org_7th_1.jpeg"},
      {src: "nul1org_7th_2.jpeg"},
      {src: "nul1org_7th_3.jpeg"},
      {src: "nul1org_7th_4.jpeg"},
      {src: "nul1org_7th_5.jpeg"},
      {src: "nul1org_7th_6.jpeg"},
      {src: "nul1org_7th_7.jpeg"},
      {src: "nul1org_7th_8.jpeg"},
      {src: "nul1org_7th_9.jpeg"},
      {src: "nul1org_8th_1.jpeg"},
      {src: "nul1org_8th_10.jpeg"},
      {src: "nul1org_8th_2.jpeg"},
      {src: "nul1org_8th_3.jpeg"},
      {src: "nul1org_8th_4.jpeg"},
      {src: "nul1org_8th_5.jpeg"},
      {src: "nul1org_8th_6.jpeg"},
      {src: "nul1org_8th_7.jpeg"},
      {src: "nul1org_8th_8.jpeg"},
      {src: "nul1org_8th_9.jpeg"},
      {src: "nul1org_9th_1.jpeg"},
      {src: "nul1org_9th_10.jpeg"},
      {src: "nul1org_9th_2.jpeg"},
      {src: "nul1org_9th_3.jpeg"},
      {src: "nul1org_9th_4.jpeg"},
      {src: "nul1org_9th_5.jpeg"},
      {src: "nul1org_9th_6.jpeg"},
      {src: "nul1org_9th_7.jpeg"},
      {src: "nul1org_9th_8.jpeg"},
      {src: "nul1org_9th_9.jpeg"}
    ];

    // Shuffle images
    this.sources = shuffleArray(allImages);

    // Generate scattered layout with overlap prevention
    const canvasWidth = 8000;
    const canvasHeight = 16000;
    const minSize = 350;
    const maxSize = 550;
    const minSpacing = 150; // Minimum spacing between images

    // Helper function to check if two rectangles overlap
    const checkOverlap = (rect1, rect2, margin) => {
      return !(
        rect1.x + rect1.w + margin < rect2.x ||
        rect2.x + rect2.w + margin < rect1.x ||
        rect1.y + rect1.h + margin < rect2.y ||
        rect2.y + rect2.h + margin < rect1.y
      );
    };

    const placedItems = [];

    this.data = this.sources.map((source, i) => {
      let randomSize = minSize + Math.random() * (maxSize - minSize);

      // 30% chance to scale up by 1.5x
      const shouldScale = Math.random() < 0.3;
      if (shouldScale) {
        randomSize *= 1.5;
      }

      let position = null;
      let attempts = 0;
      const maxAttempts = 50;

      // Try to find a non-overlapping position
      while (!position && attempts < maxAttempts) {
        const testX = Math.random() * (canvasWidth - randomSize);
        const testY = Math.random() * (canvasHeight - randomSize);

        const testRect = {
          x: testX,
          y: testY,
          w: randomSize,
          h: randomSize * 1.25 // Approximate aspect ratio
        };

        // Check if this position overlaps with any existing items
        const hasOverlap = placedItems.some(placed =>
          checkOverlap(testRect, placed, minSpacing)
        );

        if (!hasOverlap) {
          position = { x: testX, y: testY };
          placedItems.push(testRect);
        }

        attempts++;
      }

      // If we couldn't find a spot after max attempts, use a fallback grid position
      if (!position) {
        const fallbackCols = 4;
        const col = i % fallbackCols;
        const row = Math.floor(i / fallbackCols);
        position = {
          x: col * (canvasWidth / fallbackCols) + Math.random() * 200,
          y: row * (canvasHeight / Math.ceil(this.sources.length / fallbackCols)) + Math.random() * 200
        };
      }

      return {
        x: position.x,
        y: position.y,
        w: randomSize,
        h: randomSize
      };
    });

    new InfiniteGrid({
      el: document.querySelector('#images'),
      sources: this.sources,
      data: this.data,
      originalSize: {w: canvasWidth, h: canvasHeight},
    })
  }
  resize() {
    document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`);
  }
}
window.addEventListener('load', () => {
  new Index();
});