import Phaser from "phaser";
import ScrollingBackground from "../entities/ScrollingBackground";
import { getData } from "../helpers/api";

import sprBtnRestart from "../files/restrat.png";

import sprBg0 from "../files/sprBg0.png";
import sprBg1 from "../files/sprBg1.png";
import mainPage from "../files/main-page.png";
import sndBtnOver from "../files/sndBtnOver.mp3";
import sndBtnDown from "../files/sndBtnDown.mp3";

class SceneLeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: "SceneLeaderBoard" });
  }

  preload() {
    this.load.image("sprBg0", sprBg0);
    this.load.image("sprBg1", sprBg1);
    this.load.image("sprBtnRestart", sprBtnRestart);
    this.load.image("mainPage", mainPage);
    this.load.audio("sndBtnOver", sndBtnOver);
    this.load.audio("sndBtnDown", sndBtnDown);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.25,
      this.game.config.height * 0.925,
      "sprBtnRestart"
    );

    this.btnMain = this.add.sprite(
      this.game.config.width * 0.75,
      this.game.config.height * 0.925,
      "mainPage"
    );

    this.btnRestart.on(
      "pointerover",
      function () {
        this.btnRestart.setTexture("sprBtnRestart");
        this.sfx.btnOver.play();
      },
      this
    );
    this.btnRestart.on("pointerout", function () {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on(
      "pointerdown",
      function () {
        this.btnRestart.setTexture("sprBtnRestart");
        this.sfx.btnDown.play();
      },
      this
    );
    this.btnRestart.on(
      "pointerup",
      function () {
        this.btnRestart.setTexture("sprBtnRestart");
        this.scene.start("SceneMain");
      },
      this
    );
    this.btnMain.on(
      "pointerup",
      function () {
        this.btnMain.setTexture("mainPage");
        this.scene.start("SceneMainMenu");
      },
      this
    );

    this.btnMain.setScale(0.4);
    this.btnRestart.setScale(0.4);

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      "LEADERS BOARD",
      {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center",
      }
    );
    this.title.setOrigin(0.5);
    this.btnRestart.setInteractive();
    this.btnMain.setInteractive();

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["sprBg0", "sprBg1"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.getScores();
  }

  async getScores() {
    try {
      const data = await getData();
      data.forEach((elem, index) => {
        this.add.text(
          this.game.config.width * 0.25,
          this.game.config.height * 0.35 + index * 50,
          `${index + 1}. ${elem.user}: ${elem.score}`,
          {
            color: "#d0c600",
            fontFamily: "sans-serif",
            fontSize: "3vw",
            lineHeight: 1.3,
          }
        );
      });
    } catch {
      this.add.text(
        this.game.config.width * 0.35,
        this.game.config.height * 0.35,
        `Sorry scroe data is unable to get`,
        {
          color: "#d0c600",
          fontFamily: "sans-serif",
          fontSize: "1vw",
          lineHeight: 1.3,
        }
      );
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneLeaderBoard;
