import Phaser from "phaser";
import ScrollingBackground from "../entities/ScrollingBackground";
import sprBtnPlay from "../files/sprBtnPlay.png";
import sprBtnPlayHover from "../files/sprBtnPlayHover.png";
import sprBtnPlayDown from "../files/sprBtnPlayDown.png";
import sprBtnRestart from "../files/sprBtnRestart.png";
import sprBtnRestartHover from "../files/sprBtnRestartHover.png";
import sprBtnRestartDown from "../files/sprBtnRestartDown.png";
//Sounds

import sndBtnOver from "../files/sndBtnOver.mp3";
import sndBtnDown from "../files/sndBtnDown.mp3";

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("sprBtnPlay", sprBtnPlay);
    this.load.image("sprBtnPlayHover", sprBtnPlayHover);
    this.load.image("sprBtnPlayDown", sprBtnPlayDown);
    this.load.image("sprBtnRestart", sprBtnRestart);
    this.load.image("sprBtnRestartHover", sprBtnRestartHover);
    this.load.image("sprBtnRestartDown", sprBtnRestartDown);
    this.load.audio("sndBtnOver", sndBtnOver);
    this.load.audio("sndBtnDown", sndBtnDown);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnPlay"
    );

    this.btnPlay.on(
      "pointerover",
      function () {
        this.btnPlay.setTexture("sprBtnPlayHover");
        this.sfx.btnOver.play();
      },
      this
    );
    this.btnPlay.on("pointerout", function () {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on(
      "pointerdown",
      function () {
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.sfx.btnDown.play();
      },
      this
    );
    this.btnPlay.on(
      "pointerup",
      function () {
        this.btnPlay.setTexture("sprBtnPlay");
        this.scene.start("SceneMain");
      },
      this
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      "SPACE SHOOTER",
      {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center",
      }
    );
    this.title.setOrigin(0.5);

    this.btnPlay.setInteractive();

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
