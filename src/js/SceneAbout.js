import Phaser from "phaser";
import ScrollingBackground from "../entities/ScrollingBackground";

import sprBg0 from "../files/sprBg0.png";
import sprBg1 from "../files/sprBg1.png";
import playBtn from "../files/play.png";
import aboutBtn from "../files/about.png";
import mainPage from "../files/main-page.png";

//Sounds

import sndBtnOver from "../files/sndBtnOver.mp3";
import sndBtnDown from "../files/sndBtnDown.mp3";

import song from "../files/spacetheme.mp3";

class SceneAbout extends Phaser.Scene {
  constructor() {
    super({ key: "SceneAbout" });
  }

  preload() {
    this.load.image("sprBg0", sprBg0);
    this.load.image("sprBg1", sprBg1);
    this.load.image("playBtn", playBtn);
    this.load.image("aboutBtn", aboutBtn);
    this.load.image("mainPage", mainPage);
    this.load.audio("sndBtnOver", sndBtnOver);
    this.load.audio("sndBtnDown", sndBtnDown);
    this.load.audio("song", song);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
      song: this.sound.add("song"),
    };

    // this.sfx.song.play();
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.25,
      this.game.config.height * 0.9,
      "playBtn"
    );

    this.btnLeader = this.add.sprite(
      this.game.config.width * 0.75,
      this.game.config.height * 0.9,
      "mainPage"
    );

    this.btnPlay.setScale(0.4);
    this.btnLeader.setScale(0.4);

    this.btnPlay.on(
      "pointerover",
      function () {
        this.btnPlay.setTexture("sprBtnPlayHover");
        this.sfx.btnOver.play();
      },
      this
    );
    this.btnPlay.on("pointerout", function () {
      this.setTexture("playBtn");
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
        this.btnPlay.setTexture("playBtn");
        this.scene.start("SceneMain");
      },
      this
    );

    this.btnLeader.on(
      "pointerup",
      function () {
        this.scene.start("SceneMainMenu");
      },
      this
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      "ABOUT PAGE",
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
    this.btnLeader.setInteractive();

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["sprBg0", "sprBg1"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    const aboutBox = document.createElement("aboutBox");

    aboutBox.innerHTML = `
    <div>
     <p class='about-text'>This is a Shooter game which is built by Murodjon Tursunpulatov with Phaser for the Microverse JavaScript Capstone project.</p>

    </div>
    `;

    this.add.dom(this.game.config.width * 0.5, 200, aboutBox);
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}
export default SceneAbout;
