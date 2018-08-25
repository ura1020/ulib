// ulib

let keyEvent = function(keyCode){
  let key = {
    code:keyCode,
    isDown:false,
    isUp:true,
    press:null,
    release:null,
    repeat:null,
    removeEventAll:null,
  }

  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) {
        key.press()
      }
      else if(key.repeat){
        key.repeat()
      }
      key.isDown = true
      key.isUp = false
    }
    event.preventDefault()
  }

  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release){
        key.release()
      }
      key.isDown = false
      key.isUp = true
    }
    event.preventDefault()
  }

  window.addEventListener("keydown",key.downHandler,false);
  window.addEventListener("keyup",key.upHandler,false);

  key.removeEventAll = () => {
    window.removeEventListener("keydown",key.downHandler,false);
    window.removeEventListener("keyup",key.upHandler,false);
  }
  return key
}

module.exports = {
  log:function(object){
    if(!console || !console.log) return;

    console.log(object);
  },

  keyEvent:keyEvent,
  leftEvent:function(){return keyEvent(37)},
  rightEvent:function(){return keyEvent(39)},
  upEvent:function(){return keyEvent(38)},
  downEvent:function(){return keyEvent(40)},
  spaceEvent:function(){return keyEvent(32)},
}
