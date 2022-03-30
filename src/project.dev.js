window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  CamAdjust: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5fd1drtalxBa6xXWJ2TiYeq", "CamAdjust");
    "use strict";
    var CamAdjust = cc.Class({
      extends: cc.Component,
      properties: {
        cameras: [ cc.Camera ],
        isKeyA: false,
        isKeyD: false,
        isKeyW: false,
        isKeyS: false,
        isKeyO: false,
        isKeyP: false,
        isK: false,
        isL: false
      },
      statics: {},
      onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      update: function update() {
        if (this.isKeyA) for (var i = 0; i < this.cameras.length; i++) this.cameras[i].node.z += 1;
        if (this.isKeyD) for (var _i = 0; _i < this.cameras.length; _i++) this.cameras[_i].node.z -= 1;
        if (this.isKeyW) for (var _i2 = 0; _i2 < this.cameras.length; _i2++) this.cameras[_i2].node.y += 1;
        if (this.isKeyS) for (var _i3 = 0; _i3 < this.cameras.length; _i3++) this.cameras[_i3].node.y -= 1;
        if (this.isKeyO) for (var _i4 = 0; _i4 < this.cameras.length; _i4++) this.cameras[_i4].node.rotationX += .1;
        if (this.isKeyP) for (var _i5 = 0; _i5 < this.cameras.length; _i5++) this.cameras[_i5].node.rotationX -= .1;
        if (this.isK) for (var _i6 = 0; _i6 < this.cameras.length; _i6++) this.cameras[_i6].fov += .1;
        if (this.isL) for (var _i7 = 0; _i7 < this.cameras.length; _i7++) this.cameras[_i7].fov -= .1;
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
          this.isKeyA = true;
          break;

         case cc.macro.KEY.d:
          this.isKeyD = true;
          break;

         case cc.macro.KEY.w:
          this.isKeyW = true;
          break;

         case cc.macro.KEY.s:
          this.isKeyS = true;
          break;

         case cc.macro.KEY.o:
          this.isKeyO = true;
          break;

         case cc.macro.KEY.p:
          this.isKeyP = true;
          break;

         case cc.macro.KEY.k:
          this.isK = true;
          break;

         case cc.macro.KEY.l:
          this.isL = true;
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
          this.isKeyA = false;
          break;

         case cc.macro.KEY.d:
          this.isKeyD = false;
          break;

         case cc.macro.KEY.w:
          this.isKeyW = false;
          break;

         case cc.macro.KEY.s:
          this.isKeyS = false;
          break;

         case cc.macro.KEY.o:
          this.isKeyO = false;
          break;

         case cc.macro.KEY.p:
          this.isKeyP = false;
          break;

         case cc.macro.KEY.k:
          this.isK = false;
          break;

         case cc.macro.KEY.l:
          this.isL = false;
          break;

         case cc.macro.KEY.u:
          console.log(this.cameras[0].node.position, this.cameras[0].node.rotationX, this.cameras[0].fov);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  CamMove: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81200/QmN1OBLMI3Lz7Mmxi", "CamMove");
    "use strict";
    var CamAdjust = cc.Class({
      extends: cc.Component,
      properties: {
        cameras: [ cc.Camera ],
        vx: 0,
        vy: 0,
        ax: .1,
        maxV: .3,
        rotX: 0,
        rotY: 0,
        rotRangeX: 1,
        rotRangeY: 3,
        screenWidth: 0,
        designResolutionHeight_2: 0
      },
      onLoad: function onLoad() {
        this.screenWidth = cc.view.getDesignResolutionSize().height / cc.view.getCanvasSize().height * cc.view.getCanvasSize().width;
        this.designResolutionHeight_2 = cc.view.getDesignResolutionSize().height / 2;
        this.rotX = this.cameras[0].node.eulerAngles.x;
        this.rotY = this.cameras[0].node.eulerAngles.y;
        console.log(this.rotX, this.rotY);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
      },
      onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
      },
      onTouchMove: function onTouchMove(evt) {
        console.log(evt);
      },
      onMouseMove: function onMouseMove(evt) {
        var targetY = (this.screenWidth / 2 - evt._x) / (this.screenWidth / 2) * this.rotRangeY + this.rotY;
        var targetX = (evt._y - this.designResolutionHeight_2) / this.designResolutionHeight_2 * this.rotRangeX + this.rotX;
        for (var i = 0; i < this.cameras.length; i++) {
          var rotate3DTo = cc.rotate3DTo(1, cc.v3(targetX, targetY, 0));
          this.cameras[i].node.stopAllActions();
          this.cameras[i].node.runAction(rotate3DTo);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  CreateSign: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd788Ex8H5CfrI/tt4wbsHW", "CreateSign");
    "use strict";
    var Helper = require("Helper");
    cc.Class({
      extends: cc.Component,
      properties: {
        editBox: cc.EditBox,
        signLabel: cc.Label
      },
      start: function start() {},
      onCreateSignHandler: function onCreateSignHandler() {
        this.signLabel.string = this.editBox.string;
      },
      onDoneHandler: function onDoneHandler() {
        Helper.createSign = this.signLabel.string;
        cc.director.loadScene("game");
      }
    });
    cc._RF.pop();
  }, {
    Helper: "Helper"
  } ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d27c0ENQClBW5w+w2VazEbt", "Game");
    "use strict";
    var OtherPlayer = require("OtherPlayer");
    var MyPlayer = require("MyPlayer");
    var _require = require("./PlayerData"), PlayerData = _require.PlayerData;
    cc.Class({
      extends: cc.Component,
      properties: {
        player: MyPlayer,
        otherPlayers: null,
        otherPlayerPrefab: cc.Prefab,
        playersContainer: cc.Node
      },
      onLoad: function onLoad() {
        this.otherPlayers = {};
      },
      onDestroy: function onDestroy() {},
      update: function update() {},
      onConnectedHandler: function onConnectedHandler() {
        this.player.sendSpawn();
      },
      getMyPlayer: function getMyPlayer() {
        return this.player;
      },
      addAPlayer: function addAPlayer(id) {
        var player = cc.instantiate(this.otherPlayerPrefab);
        player.parent = this.playersContainer;
        var otherPlayer = player.getComponent("OtherPlayer");
        var playerData = new PlayerData();
        playerData.setSocketID(id);
        otherPlayer.setPlayerData(playerData);
        this.otherPlayers[id] = otherPlayer;
        return otherPlayer;
      },
      getAPlayer: function getAPlayer(id) {
        return this.otherPlayers[id];
      },
      removeAPlayer: function removeAPlayer(id) {
        var player = this.otherPlayers[id];
        player && player.node.destroy();
      }
    });
    cc._RF.pop();
  }, {
    "./PlayerData": "PlayerData",
    MyPlayer: "MyPlayer",
    OtherPlayer: "OtherPlayer"
  } ],
  Helper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17981pICCxOZavC5o7YWFCY", "Helper");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Helper = void 0;
    var Helper = {};
    exports.Helper = Helper;
    Helper.createSign = "";
    cc._RF.pop();
  }, {} ],
  MyPlayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94ae6O+HsFGeLCWgpxAsrpv", "MyPlayer");
    "use strict";
    var Server = require("Server");
    var World = require("World");
    var PlayerBase = require("PlayerBase");
    var PlatformTouch = require("PlatformTouch");
    var Helper = require("Helper");
    var _require = require("./PlayerData"), PlayerData = _require.PlayerData;
    var MyPlayer = cc.Class({
      extends: PlayerBase,
      properties: {
        isPositionDirty: false,
        ax: 0,
        speedx: 0,
        updateTimer: 0,
        world: World,
        setTouch: false,
        moveTween: null
      },
      statics: {
        SPEED_AX: 1,
        MAX_SPEED: 5,
        SEVER_UPDATE_INTERVAL: .1
      },
      onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.z = this.node.zIndex = 10 * Math.floor(10 * Math.random() - 5);
        console.log("MyPlayer", this.node.z);
        this.setPlayerData(new PlayerData());
        this.playerData.setSignText(Helper.createSign);
        this.updateSignLabel();
      },
      sendSpawn: function sendSpawn() {
        this.server.sendSpawn({
          pos: this.node.getPosition(),
          sign: Helper.createSign
        });
      },
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.dpadLeft:
         case cc.macro.KEY.left:
          console.log("Press a left key");
          this.moveLeft();
          break;

         case cc.macro.KEY.dpadRight:
         case cc.macro.KEY.right:
          console.log("Press a right key");
          this.moveRight();
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.dpadLeft:
         case cc.macro.KEY.left:
         case cc.macro.KEY.dpadRight:
         case cc.macro.KEY.right:
          this.stopMove();
        }
      },
      moveLeft: function moveLeft() {
        if (this.moveTween) {
          this.moveTween.stop();
          this.moveTween = null;
        }
        this.ax = -MyPlayer.SPEED_AX;
        this.anim.node.scaleX = -1;
        this.playWalk();
        this.stop = false;
      },
      moveRight: function moveRight() {
        if (this.moveTween) {
          this.moveTween.stop();
          this.moveTween = null;
        }
        this.ax = MyPlayer.SPEED_AX;
        this.anim.node.scaleX = 1;
        this.playWalk();
        this.stop = false;
      },
      stopMove: function stopMove() {
        if (this.speed > 0) this.ax = -MyPlayer.SPEED_AX; else if (this.speed < 0) this.ax = MyPlayer.SPEED_AX; else {
          this.ax = 0;
          this.playIdle();
        }
        this.stop = true;
      },
      update: function update(delta) {
        if (!this.setTouch && null != PlatformTouch.instance) {
          this.setTouch = true;
          PlatformTouch.instance.node.on("click_on_ground", this.clickToWalk.bind(this));
        }
        if (0 != this.ax) if (this.speedx * this.ax < 0 && Math.abs(this.speedx) <= Math.abs(this.ax) && this.stop) {
          this.speedx = this.ax = 0;
          this.playIdle();
        } else {
          this.speedx += this.ax;
          this.speedx = this.speedx > 0 ? Math.min(MyPlayer.MAX_SPEED, this.speedx) : Math.max(-MyPlayer.MAX_SPEED, this.speedx);
          var oldx = this.node.x;
          this.node.x += this.speedx;
          this.node.x = Math.min(World.WORLD_BORDER_MAX_X, this.node.x);
          this.node.x = Math.max(World.WORLD_BORDER_MIN_X, this.node.x);
          oldx != this.node.x && (this.isPositionDirty = true);
        }
        this.node.zIndex != Math.floor(this.node.z) && (this.node.zIndex = Math.floor(this.node.z));
        this.moveTween && (this.isPositionDirty = true);
        this.updateTimer += delta;
        if (this.updateTimer > MyPlayer.SEVER_UPDATE_INTERVAL && this.isPositionDirty) {
          this.updateTimer = this.updateTimer % MyPlayer.SEVER_UPDATE_INTERVAL;
          this.isPositionDirty = false;
          this.server.sendPosition(this.node.getPosition());
        }
      },
      clickToWalk: function clickToWalk(worldPos) {
        var _this = this;
        var pos = this.node.parent.convertToNodeSpaceAR(cc.Vec3(worldPos.x, worldPos.y, worldPos.z));
        console.log(pos.x, pos.y, pos.z, Math.floor(pos.z));
        this.ax = 0;
        this.speedx = 0;
        this.node.stopAllActions();
        this.playWalk();
        var oldx = this.node.x;
        if (pos.x > oldx) {
          this.anim.node.scaleX = 1;
          this.updateSignScale(1);
        } else if (pos.x < oldx) {
          this.anim.node.scaleX = -1;
          this.updateSignScale(-1);
        }
        if (this.moveTween) {
          this.moveTween.stop();
          this.moveTween = null;
        }
        this.moveTween = cc.tween(this.node).to(Math.max(.1, Math.abs(pos.x - oldx) / 100), {
          position: cc.v3(pos.x, this.node.y, Math.floor(pos.z))
        }).call(function() {
          _this.playIdle();
          console.log(_this.node.position);
          _this.moveTween = null;
        });
        this.moveTween.start();
      }
    });
    cc._RF.pop();
  }, {
    "./PlayerData": "PlayerData",
    Helper: "Helper",
    PlatformTouch: "PlatformTouch",
    PlayerBase: "PlayerBase",
    Server: "Server",
    World: "World"
  } ],
  OtherPlayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e923r30x1P7KHpwui2uw7T", "OtherPlayer");
    "use strict";
    var Server = require("Server");
    var PlayerBase = require("PlayerBase");
    cc.Class({
      extends: PlayerBase,
      properties: {
        isSpawn: false,
        moveTween: null
      },
      initialize: function initialize(info) {
        this.playerData.setSignText(info.sign);
        this.updateSignLabel();
        this.moveTo(info.pos);
      },
      moveTo: function moveTo(info) {
        var _this = this;
        if (null == info) return;
        if (this.isSpawn) {
          this.node.stopAllActions();
          this.playWalk();
          var oldx = this.node.x;
          if (info.x > oldx) {
            this.anim.node.scaleX = 1;
            this.updateSignScale(1);
          } else if (info.x < oldx) {
            this.anim.node.scaleX = -1;
            this.updateSignScale(-1);
          }
        } else {
          this.isSpawn = true;
          this.node.x = info.x;
          this.node.y = info.y;
          this.node.z = info.z;
          this.node.zIndex = this.node.z;
        }
        if (this.moveTween) {
          this.moveTween.stop();
          this.moveTween = null;
        }
        this.moveTween = cc.tween(this.node).to(.1, {
          position: cc.v3(info.x, this.node.y, info.z)
        }).call(function() {
          _this.playIdle();
          _this.moveTween = null;
        });
        this.moveTween.start();
      },
      update: function update(delta) {
        this.node.zIndex != Math.floor(this.node.z) && (this.node.zIndex = Math.floor(this.node.z));
      }
    });
    cc._RF.pop();
  }, {
    PlayerBase: "PlayerBase",
    Server: "Server"
  } ],
  PlatformTouch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d29caB05JxHJIZCSaR7+Ymy", "PlatformTouch");
    "use strict";
    var PlatformTouch = cc.Class({
      extends: cc.Component,
      properties: {
        camera: cc.Camera,
        platformRoot: cc.Node
      },
      statics: {
        PLATFORM_GROUND_Y: 224,
        instance: null
      },
      onLoad: function onLoad() {
        cc.director.getPhysics3DManager().enabled = true;
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
        PlatformTouch.instance = this;
      },
      onTouch: function onTouch(event) {
        var ray = this.camera.getRay(event.getLocation());
        var maxDistance = 2e3;
        var results = cc.director.getPhysics3DManager().raycastClosest(ray, "3d", maxDistance);
        results && results.hitPoint.y == PlatformTouch.PLATFORM_GROUND_Y && this.node.emit("click_on_ground", results.hitPoint);
      }
    });
    cc._RF.pop();
  }, {} ],
  PlayerBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "836c43/SZJIdaPbJoGUD3yI", "PlayerBase");
    "use strict";
    var Server = require("Server");
    var PlayerData = require("PlayerData");
    var PlayerBase = cc.Class({
      extends: cc.Component,
      properties: {
        server: Server,
        anim: cc.Animation,
        playerData: PlayerData = null,
        signLabel: cc.Label
      },
      statics: {
        ANIM_IDLE: "nft_0_idle",
        ANIM_WALK: "nft_0_walk"
      },
      onLoad: function onLoad() {
        this.playIdle();
      },
      setPlayerData: function setPlayerData(value) {
        this.playerData = value;
      },
      getPlayerData: function getPlayerData() {
        return this.playerData;
      },
      updateSignLabel: function updateSignLabel() {
        null != this.playerData.getSignText() && (this.signLabel.string = this.playerData.getSignText());
      },
      updateSignScale: function updateSignScale(scale) {
        this.signLabel.node.scaleX = scale;
      },
      playIdle: function playIdle() {
        if (this.anim.currentClip && this.anim.currentClip.name == PlayerBase.ANIM_IDLE) return;
        this.anim.play(PlayerBase.ANIM_IDLE);
      },
      playWalk: function playWalk() {
        if (this.anim.currentClip && this.anim.currentClip.name == PlayerBase.ANIM_WALK) return;
        this.anim.play(PlayerBase.ANIM_WALK);
      }
    });
    cc._RF.pop();
  }, {
    PlayerData: "PlayerData",
    Server: "Server"
  } ],
  PlayerData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e0afEAkEFEprH5SX4Tz7zO", "PlayerData");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PlayerData = void 0;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        "value" in descriptor && (descriptor.writable = true);
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      protoProps && _defineProperties(Constructor.prototype, protoProps);
      staticProps && _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var PlayerData = function() {
      function PlayerData() {
        _classCallCheck(this, PlayerData);
        this.socketID = null;
        this.signText = "";
      }
      _createClass(PlayerData, [ {
        key: "setSocketID",
        value: function setSocketID(value) {
          this.socketID = value;
        }
      }, {
        key: "getSocketID",
        value: function getSocketID() {
          return this.socketID;
        }
      }, {
        key: "setSignText",
        value: function setSignText(value) {
          this.signText = value;
        }
      }, {
        key: "getSignText",
        value: function getSignText() {
          return this.signText;
        }
      } ]);
      return PlayerData;
    }();
    exports.PlayerData = PlayerData;
    cc._RF.pop();
  }, {} ],
  Server: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9684a7ODoBMBLDjZ7aH+cuX", "Server");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        chatBox: cc.EditBox,
        speechBubblePrefab: cc.Prefab,
        speechParentNode: cc.Node
      },
      onLoad: function onLoad() {
        console.log("onLoad");
        this.game = this.node.getComponent("Game");
        var isLocalHost = false;
        -1 == window.location.href.indexOf("localhost") && -1 == window.location.href.indexOf("127.0.0.1") || (isLocalHost = true);
        this.socket = new window.io(isLocalHost ? "http://127.0.0.1:3000" : "http://174.129.37.33:3000");
        this.socket.on("connect", this.handleConnect.bind(this));
        this.socket.on("playerJoined", this.handlePlayerJoined.bind(this));
        this.socket.on("roomJoined", this.handleRoomJoined.bind(this));
        this.socket.on("playerLeft", this.handleRoomLeft.bind(this));
        this.socket.on("updateOthersPosition", this.updateOthersPosition.bind(this));
        this.socket.on("playerSpawn", this.handlePlayerSpawn.bind(this));
        this.socket.on("chat", this.chatHandler.bind(this));
      },
      handleConnect: function handleConnect() {
        console.log("connected", this.socket.id);
        this.game.onConnectedHandler();
      },
      handlePlayerJoined: function handlePlayerJoined(info) {
        console.log("handlePlayerJoined", info);
        this.game.addAPlayer(info);
      },
      handleRoomJoined: function handleRoomJoined(info) {
        console.log("handleRoomJoined", info);
        for (var id in info) this.game.addAPlayer(id).initialize(info[id]);
      },
      handleRoomLeft: function handleRoomLeft(info) {
        this.game.removeAPlayer(info);
        console.log("handleRoomLeft", info);
      },
      sendPosition: function sendPosition(info) {
        this.socket.emit("updatePosition", info);
      },
      updateOthersPosition: function updateOthersPosition(id, info) {
        console.log("updateOthersPosition", id, info);
        this.game.getAPlayer(id).moveTo(info);
      },
      sendSpawn: function sendSpawn(info) {
        this.socket.emit("spawn", info);
      },
      handlePlayerSpawn: function handlePlayerSpawn(id, info) {
        console.log("handlePlayerSpawn", id, info);
        if (this.game.getAPlayer(id)) {
          var player = this.game.getAPlayer(id);
          player.getPlayerData().setSignText(info.sign);
          player.updateSignLabel();
          player.moveTo(info.pos);
        }
      },
      sendChatHandler: function sendChatHandler() {
        this.socket.emit("chat", this.chatBox.string);
        var player = this.game.getMyPlayer();
        var bubble = cc.instantiate(this.speechBubblePrefab);
        bubble.getComponentsInChildren(cc.Label)[0].string = this.chatBox.string;
        player.node.addChild(bubble);
        bubble.setPosition(0, Math.random(10) + 280, 0);
        bubble.runAction(cc.sequence(cc.fadeTo(3, 0), cc.removeSelf()));
        this.chatBox.string = "";
      },
      chatHandler: function chatHandler(id, text) {
        console.log("chatHandler", id, text);
        if (this.game.getAPlayer(id)) {
          var player = this.game.getAPlayer(id);
          var bubble = cc.instantiate(this.speechBubblePrefab);
          bubble.getComponentsInChildren(cc.Label)[0].string = text;
          player.node.addChild(bubble);
          bubble.setPosition(0, Math.random(10) + 280);
          bubble.runAction(cc.sequence(cc.fadeTo(3, 0), cc.removeSelf()));
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Splash: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b3e2ok3ztPE52Ol1tJLkWF", "Splash");
    "use strict";
    var Helper = require("Helper");
    cc.Class({
      extends: cc.Component,
      properties: {
        signLabel: cc.Label,
        editBox: cc.EditBox
      },
      onLoad: function onLoad() {},
      onDoneHandler: function onDoneHandler() {
        this.signLabel.string = this.editBox.string;
        Helper.createSign = this.signLabel.string;
        cc.director.loadScene("game");
      },
      onDestroy: function onDestroy() {
        window.createSign = null;
        window.createGame = null;
      }
    });
    cc._RF.pop();
  }, {
    Helper: "Helper"
  } ],
  World: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61f5bFlJlxDfqAGTZ4VATA9", "World");
    "use strict";
    var MyPlayer = require("MyPlayer");
    var World = cc.Class({
      extends: cc.Component,
      properties: {
        bgLayer: cc.Node,
        cameras: [ cc.Camera ],
        myPlayer: cc.Node,
        isKeyA: false,
        isKeyD: false,
        isKeyW: false,
        isKeyS: false,
        isKeyO: false,
        isKeyP: false,
        isK: false,
        isL: false
      },
      statics: {
        WORLD_CAMERA_IND: 1,
        WORLD_BORDER_MIN_X: -1700,
        WORLD_BORDER_MAX_X: 1700,
        BG_SPEED_RATIO: .72
      },
      onLoad: function onLoad() {
        console.log(cc.Canvas.instance.node.getContentSize().width);
      },
      onDestroy: function onDestroy() {},
      update: function update() {
        var cameraPox = this.myPlayer.x;
        cameraPox = Math.max(cameraPox, World.WORLD_BORDER_MIN_X + cc.Canvas.instance.node.getContentSize().width / 2);
        cameraPox = Math.min(cameraPox, World.WORLD_BORDER_MAX_X - cc.Canvas.instance.node.getContentSize().width / 2);
        for (var i = 0; i < this.cameras.length; i++) this.cameras[i].node.x = cameraPox;
        if (this.isKeyA) for (var _i = 0; _i < this.cameras.length; _i++) this.cameras[_i].node.z += 1;
        if (this.isKeyD) for (var _i2 = 0; _i2 < this.cameras.length; _i2++) this.cameras[_i2].node.z -= 1;
        if (this.isKeyW) for (var _i3 = 0; _i3 < this.cameras.length; _i3++) this.cameras[_i3].node.y += 1;
        if (this.isKeyS) for (var _i4 = 0; _i4 < this.cameras.length; _i4++) this.cameras[_i4].node.y -= 1;
        if (this.isKeyO) for (var _i5 = 0; _i5 < this.cameras.length; _i5++) this.cameras[_i5].node.eulerAngles.x += .1;
        if (this.isKeyP) for (var _i6 = 0; _i6 < this.cameras.length; _i6++) this.cameras[_i6].node.eulerAngles.x -= .1;
        if (this.isK) for (var _i7 = 0; _i7 < this.cameras.length; _i7++) this.cameras[_i7].fov += .1;
        if (this.isL) for (var _i8 = 0; _i8 < this.cameras.length; _i8++) this.cameras[_i8].fov -= .1;
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
          this.isKeyA = true;
          break;

         case cc.macro.KEY.d:
          this.isKeyD = true;
          break;

         case cc.macro.KEY.w:
          this.isKeyW = true;
          break;

         case cc.macro.KEY.s:
          this.isKeyS = true;
          break;

         case cc.macro.KEY.o:
          this.isKeyO = true;
          break;

         case cc.macro.KEY.p:
          this.isKeyP = true;
          break;

         case cc.macro.KEY.k:
          this.isK = true;
          break;

         case cc.macro.KEY.l:
          this.isL = true;
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
          this.isKeyA = false;
          break;

         case cc.macro.KEY.d:
          this.isKeyD = false;
          break;

         case cc.macro.KEY.w:
          this.isKeyW = false;
          break;

         case cc.macro.KEY.s:
          this.isKeyS = false;
          break;

         case cc.macro.KEY.o:
          this.isKeyO = false;
          break;

         case cc.macro.KEY.p:
          this.isKeyP = false;
          break;

         case cc.macro.KEY.k:
          this.isK = false;
          break;

         case cc.macro.KEY.l:
          this.isL = false;
          break;

         case cc.macro.KEY.u:
          console.log(this.cameras[0].node.postion, this.cameras[0].node.eulerAngles, this.cameras[0].fov);
        }
      }
    });
    cc._RF.pop();
  }, {
    MyPlayer: "MyPlayer"
  } ]
}, {}, [ "Helper", "CamMove", "Splash", "CreateSign", "CamAdjust", "Game", "MyPlayer", "OtherPlayer", "PlatformTouch", "PlayerBase", "PlayerData", "Server", "World" ]);
//# sourceMappingURL=project.dev.js.map
