/**
 * Ascii Morph
 * @author: Tim Holman (http://tholman.com)
 */

interface CanvasDimensions {
  x: number;
  y: number;
}

interface Centers {
  x: number;
  y: number;
}

interface Paddings {
  x: number;
  y: number;
}

export var AsciiMorph = (function () {
  'use strict';

  var element: HTMLElement | null = null;
  var canvasDimensions: CanvasDimensions = { x: 0, y: 0 };

  var renderedData: string[] = [];
  var framesToAnimate: string[][] = [];

  function extend(target: any, source: any): any {
    for (var key in source) {
      if (!(key in target)) {
        target[key] = source[key];
      }
    }
    return target;
  }

  function repeat(pattern: string, count: number): string {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
      if (count & 1) result += pattern;
      count >>= 1;
      pattern += pattern;
    }
    return result + pattern;
  }

  function replaceAt(string: string, index: number, character: string): string {
    return (
      string.substr(0, index) +
      character +
      string.substr(index + character.length)
    );
  }

  function init(el: HTMLElement, canvasSize: CanvasDimensions): void {
    element = el;
    canvasDimensions = canvasSize;
  }

  function squareOutData(data: string[]): string[] {
    var i: number;
    var renderDimensions: CanvasDimensions = {
      x: 0,
      y: data.length,
    };

    for (i = 0; i < data.length; i++) {
      if (data[i].length > renderDimensions.x) {
        renderDimensions.x = data[i].length;
      }
    }

    for (i = 0; i < data.length; i++) {
      if (data[i].length < renderDimensions.x) {
        data[i] = data[i] + repeat(' ', renderDimensions.x - data[i].length);
      }
    }

    var paddings: Paddings = {
      x: Math.floor((canvasDimensions.x - renderDimensions.x) / 2),
      y: Math.floor((canvasDimensions.y - renderDimensions.y) / 2),
    };

    for (i = 0; i < data.length; i++) {
      data[i] = repeat(' ', paddings.x) + data[i] + repeat(' ', paddings.x);
    }

    for (i = 0; i < canvasDimensions.y; i++) {
      if (i < paddings.y) {
        data.unshift(repeat(' ', canvasDimensions.x));
      } else if (i > paddings.y + renderDimensions.y - 1) {
        data.push(repeat(' ', canvasDimensions.x));
      }
    }

    return data;
  }

  function getMorphedFrame(data: string[]): string[] | false {
    var firstInLine,
      lastInLine = null;
    var found = false;
    for (var i = 0; i < data.length; i++) {
      var line = data[i];
      firstInLine = line.search(/\S/);
      if (firstInLine === -1) {
        firstInLine = null;
      }

      for (var j = 0; j < line.length; j++) {
        if (line[j] != ' ') {
          lastInLine = j;
        }
      }

      if (firstInLine !== null && lastInLine !== null) {
        data = crushLine(data, i, firstInLine, lastInLine);
        found = true;
      }

      (firstInLine = null), (lastInLine = null);
    }

    if (found) {
      return data;
    } else {
      return false;
    }
  }

  function crushLine(
    data: string[],
    line: number,
    start: number,
    end: number
  ): string[] {
    var centers = {
      x: Math.floor(canvasDimensions.x / 2),
      y: Math.floor(canvasDimensions.y / 2),
    };

    var crushDirection = 1;
    if (line > centers.y) {
      crushDirection = -1;
    }

    var charA = data[line][start];
    var charB = data[line][end];

    data[line] = replaceAt(data[line], start, ' ');
    data[line] = replaceAt(data[line], end, ' ');

    if (!(end - 1 == start + 1) && !(start === end) && !(start + 1 === end)) {
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        start + 1,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1)
      );
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        end - 1,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1)
      );
    } else if (
      (start === end || start + 1 === end) &&
      line + 1 !== centers.y &&
      line - 1 !== centers.y &&
      line !== centers.y
    ) {
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        start,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1)
      );
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        end,
        '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1)
      );
    }

    return data;
  }

  function render(data: string[]): void {
    var ourData = squareOutData(data.slice());
    renderSquareData(ourData);
  }

  function renderSquareData(data: string[]): void {
    if (!element) throw new Error('element is null');

    element.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      element.innerHTML = element.innerHTML + data[i] + '\n';
    }

    renderedData = data;
  }

  async function morph(data: string[], duration: number): Promise<void> {
    return new Promise((resolve) => {
      var frameData = prepareFrames(data.slice());
      animateFrames(frameData, duration, () => resolve());
    });
  }

  function prepareFrames(data: string[]): string[][] {
    var deconstructionFrames = [];
    var constructionFrames = [];

    var clonedData = renderedData;

    // If its taking more than 100 frames, its probably somehow broken
    // Get the deconscrution frames
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(clonedData);
      if (newData === false) {
        break;
      }
      deconstructionFrames.push(newData.slice(0));
      clonedData = newData;
    }

    // Get the constuction frames for the new data
    var squareData = squareOutData(data);
    constructionFrames.unshift(squareData.slice(0));
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(squareData);
      if (newData === false) {
        break;
      }
      constructionFrames.unshift(newData.slice(0));
      squareData = newData;
    }

    return deconstructionFrames.concat(constructionFrames);
  }

  let startTime: number;
  async function animateFrames(
    frameData: string[][],
    duration: number,
    callback: () => void
  ): Promise<void> {
    startTime = Date.now();
    framesToAnimate = frameData;
    animateFrame(duration, callback);
  }

  function animateFrame(duration: number, callback: () => void): void {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = elapsed / duration;
    const frameIndex = Math.min(
      Math.floor(progress * framesToAnimate.length),
      framesToAnimate.length - 1
    );
    const frame = framesToAnimate[frameIndex];

    renderSquareData(frame);
    
    if (frameIndex < framesToAnimate.length - 1) {
      requestAnimationFrame(() => animateFrame(duration, callback));
    } else {
      callback();
    }
  }

  function main(element: HTMLElement, canvasSize: CanvasDimensions): void {
    if (!element || !canvasSize) {
      console.log('sorry, I need an element and a canvas size');
      return;
    }

    init(element, canvasSize);
  }

  return extend(main, {
    render: render,
    morph: morph,
  });
})();
