// ulib

module.exports = {
  log:function(object){
    if(!console || !console.log) return;

    console.log(object);
  },
  keyboard:function(keyCode){
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
}
