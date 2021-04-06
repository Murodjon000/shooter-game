import Phaser from 'phaser';
import ScrollingBackground from '../entities/ScrollingBackground';

import { getLocalScore } from '../helpers/storage';
import { setData } from '../helpers/api';

import sprBtnRestart from '../files/restrat.png';

import sprBg0 from '../files/sprBg0.png';
import sprBg1 from '../files/sprBg1.png';
import gameOverT from '../files/game-over.png';
import records from '../files/records.png';

import sndBtnOver from '../files/sndBtnOver.mp3';
import sndBtnDown from '../files/sndBtnDown.mp3';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.image('sprBtnRestart', sprBtnRestart);
    this.load.audio('sndBtnOver', sndBtnOver);
    this.load.audio('sndBtnDown', sndBtnDown);
    this.load.image('gameOverT', gameOverT);
    this.load.image('records', records);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.25,
      this.game.config.height * 0.8,
      'sprBtnRestart',
    );
    this.btnGameOverT = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.2,
      'gameOverT',
    );

    this.btnRecords = this.add.sprite(
      this.game.config.width * 0.75,
      this.game.config.height * 0.8,
      'records',
    );

    this.btnRestart.on('pointerover', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.sfx.btnOver.play();
    });
    this.btnRestart.on('pointerout', () => {
      this.setTexture('sprBtnRestart');
    });

    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.sfx.btnDown.play();
    });
    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.scene.start('SceneMain');
    });

    this.btnRecords.on('pointerup', () => {
      this.btnRestart.setTexture('records');
      this.scene.start('SceneLeaderBoard');
    });

    this.scores = getLocalScore();
    this.scoreScene = this.add.text(
      this.game.config.width * 0.025,
      this.game.config.height * 0.925,
      `Score: ${this.scores[0]}`,
      {
        color: '#d0c600',
        fontFamily: 'sans-serif',
        fontSize: '3vw',
        lineHeight: 1.3,
      },
    );
    this.btnRestart.setScale(0.4);
    this.btnRestart.setInteractive();
    this.btnRecords.setScale(0.4);
    this.btnRecords.setInteractive();

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.userName = '';

    const div = document.createElement('div');
    div.innerHTML = `
    <div class='input-box'>
    <input type='text' id='name' placeholder='Enter your name'/'</br>
    <input type='button' name='submitBtn' value='Submit Score' />
    </div>
    `;

    const element = this.add.dom(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      div,
    );
    element.addListener('click');

    element.on('click', (event) => {
      if (event.target.name === 'submitBtn') {
        const inputText = document.getElementById('name');
        if (inputText.value !== '') {
          element.removeListener('click');
          element.setVisible(false);
          this.userName = inputText.value;
          this.submit = setData(this.userName, this.scores[0]);
          this.submit.then(() => {
            this.scene.start('SceneLeaderBoard');
          });
        }
      }
    });
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneGameOver;
