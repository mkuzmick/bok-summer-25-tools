const sceneTemplate = require("./sceneTemplate.json")

module.exports = class Scene {
  constructor(name){
    this.balance=0.5;
    this.deinterlace_field_order= 0;
    this.balance= 0.5;
    this.deinterlace_field_order= 0;
    this.deinterlace_mode= 0;
    this.enabled= true;
    this.flags= 0;
    this.hotkeys= {
            "OBSBasic.SelectScene": []
        };
    this.id= "scene";
    this.mixers= 0;
    this.monitoring_type= 0;
    this.muted= false;
    this.name= "check5";
    this.prev_ver= 419430408;
    this.private_settings= {};
    this["push-to-mute"]= false;
    this["push-to-mute-delay"]= 0;
    this["push-to-talk"]= false;
    this["push-to-talk-delay"]= 0;
    this.settings= {
            "custom_size": false,
            "id_counter": 0,
            "items": []
        };
    this.sync= 0;
    this.versioned_id= "scene";
    this.volume= 1.0

  }
}
