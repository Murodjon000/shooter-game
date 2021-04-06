import Phaser from "phaser";
import ScrollingBackground from "../entities/ScrollingBackground";

import sprBg0 from "../files/sprBg0.png";
import sprBg1 from "../files/sprBg1.png";
import playBtn from "../files/play.png";
import aboutBtn from "../files/about.png";
import recordsBtn from "../files/records.png";
import galaxy from "../files/galaxy-1.png";
//Sounds

import sndBtnOver from "../files/sndBtnOver.mp3";
import sndBtnDown from "../files/sndBtnDown.mp3";

import song from "../files/main-song.mp3";

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("sprBg0", sprBg0);
    this.load.image("sprBg1", sprBg1);
    this.load.image("playBtn", playBtn);
    this.load.image("aboutBtn", aboutBtn);
    this.load.image("recordsBtn", recordsBtn);
    this.load.audio("sndBtnOver", sndBtnOver);
    this.load.audio("sndBtnDown", sndBtnDown);
    this.load.audio("song", song);
    this.load.image("galaxy", galaxy);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
      song: this.sound.add("song", { volume: 0.1 }),
    };

    this.sfx.song.play();
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "playBtn"
    );

    this.btnLeader = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.7,
      "recordsBtn"
    );

    this.btnAbout = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      "aboutBtn"
    );

    this.btnPlay.on(
      "pointerover",
      function () {
        this.btnPlay.setTexture("playBtn");
        this.sfx.btnOver.play();
      },
      this
    );
    this.btnPlay.on("pointerout", function () {
      this.btnPlay.setTexture("playBtn");
      this.setTexture("playBtn");
    });

    this.btnPlay.on(
      "pointerdown",
      function () {
        this.btnPlay.setTexture("playBtn");
        this.sfx.btnDown.play();
      },
      this
    );
    this.btnPlay.on(
      "pointerup",
      function () {
        this.btnPlay.setTexture("playBtn");
        this.sfx.song.stop();
        this.scene.start("SceneMain");
      },
      this
    );

    this.btnLeader.on(
      "pointerup",
      function () {
        this.sfx.song.stop();
        this.scene.start("SceneLeaderBoard");
      },
      this
    );

    this.btnAbout.on(
      "pointerup",
      function () {
        this.sfx.song.stop();
        this.scene.start("SceneAbout");
      },
      this
    );

    this.title = this.add.sprite(this.game.config.width * 0.52, 128, "galaxy");
    this.title.setOrigin(0.5);

    this.btnPlay.setScale(0.5);
    this.btnLeader.setScale(0.5);
    this.btnAbout.setScale(0.5);
    this.btnPlay.setInteractive();
    this.btnLeader.setInteractive();
    this.btnAbout.setInteractive();

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["sprBg0", "sprBg1"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}
export default SceneMainMenu;
