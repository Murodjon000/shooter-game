import Phaser from "phaser";
import ScrollingBackground from "../entities/ScrollingBackground";

import { getLocalScore } from "../helpers/storage";
import { getData, setData } from "../helpers/api";

import sprBtnRestart from "../files/sprBtnRestart.png";
import sprBtnRestartHover from "../files/sprBtnRestartHover.png";
import sprBtnRestartDown from "../files/sprBtnRestartDown.png";
import sprBg0 from "../files/sprBg0.png";
import sprBg1 from "../files/sprBg1.png";

import sndBtnOver from "../files/sndBtnOver.mp3";
import sndBtnDown from "../files/sndBtnDown.mp3";

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }

  preload() {
    this.load.image("sprBg0", sprBg0);
    this.load.image("sprBg1", sprBg1);
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

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.btnRestart.on(
      "pointerover",
      function () {
        this.btnRestart.setTexture("sprBtnRestartHover");
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
        this.btnRestart.setTexture("sprBtnRestartDown");
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

    this.scores = getLocalScore();
    this.scoreScene = this.add.text(
      this.game.config.width * 0.025,
      this.game.config.height * 0.925,
      `Score: ${this.scores[0]}`,
      {
        color: "#d0c600",
        fontFamily: "sans-serif",
        fontSize: "3vw",
        lineHeight: 1.3,
      }
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
    this.btnRestart.setInteractive();

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["sprBg0", "sprBg1"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.userName = "";

    const div = document.createElement("div");
    div.innerHTML = `
    <input type='text' id='name' placeholder='Enter your name' style= 'font-size:1.5rem width: ${
      this.game.config.width * 0.25
    }'</br>
    <input type='button' name='submitBtn' value='Submit Score' style='font-size:1.5rem'/>
    `;

    const element = this.add.dom(280, 480, div);
    element.addListener("click");

    element.on("click", (event) => {
      if (event.target.name === "submitBtn") {
        const inputText = document.getElementById("name");
        if (inputText.value !== "") {
          element.removeListener("click");
          element.setVisible(false);
          this.userName = inputText.value;
          this.submit = setData(this.userName, this.scores[0]);
          this.submit.then(() => {
            this.scene.start("SceneLeaderBoard");
          });
        }
      }
    });
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneGameOver;
