import Phaser from 'phaser';

import SceneMainMenu from './js/SceneMainMenu';
import SceneMain from './js/SceneMain';
import SceneGameOver from './js/SceneGameOver';
import SceneLeaderBoard from './js/SceneLeaderBoard';
import SceneAbout from './js/SceneAbout';

const config = {
  type: Phaser.WEBGL,
  parent: 'wrapper',
  width: 480,
  height: 640,
  backgroundColor: 'black',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver,
    SceneLeaderBoard,
    SceneAbout,
  ],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
