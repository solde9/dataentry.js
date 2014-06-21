/**
* dataentry.js a dummy input data entry
*
* Copyright 2014 Nahuel Soldevilla
* Released under the MIT license.
*
* > dt = DataEntry.makeDataEntry()  // make new object
* > dt.attachType("input")  // attach to input element
*
*/
(function( window ) {

  var
  // http://www.kipdola.be/en/blog/skerit/120-keycode-array-javascript
  // A var storing all useful keys for easy access (modified)
  key = { 8 :  'Backspace', 9 :  'Tab', 13 :  'Enter', 16 :  'Shift', 17 :  'Ctrl', 18 :  'Alt', 19 :  'Pause', 20 :  'Capslock', 27 :  'Esc', 32 :  'Backspace', 33 :  'Pageup', 34 :  'Pagedown', 35 :  'End', 36 :  'Home', 37 :  'Leftarrow', 38 :  'Uparrow', 39 :  'Rightarrow', 40 :  'Downarrow', 45 :  'Insert', 46 :  'Delete', 48 :  '0', 49 :  '1', 50 :  '2', 51 :  '3', 52 :  '4', 53 :  '5', 54 :  '6', 55 :  '7', 56 :  '8', 57 :  '9', 65 :  'a', 66 :  'b', 67 :  'c', 68 :  'd', 69 :  'e', 70 :  'f', 71 :  'g', 72 :  'h', 73 :  'i', 74 :  'j', 75 :  'k', 76 :  'l', 77 :  'm', 78 :  'n', 79 :  'o', 80 :  'p', 81 :  'q', 82 :  'r', 83 :  's', 84 :  't', 85 :  'u', 86 :  'v', 87 :  'w', 88 :  'x', 89 :  'y', 90 :  'z', 91 :  'windows', 96 :  '0numpad', 97 :  '1numpad', 98 :  '2numpad', 99 :  '3numpad', 100 :  '4numpad', 101 :  '5numpad', 102 :  '6numpad', 103 :  '7numpad', 104 :  '8numpad', 105 :  '9numpad', 106 :  'Multiply', 107 :  'Plus', 109 :  'Minut', 110 :  'Dot', 111 :  'Slash1', 112 :  'F1', 113 :  'F2', 114 :  'F3', 115 :  'F4', 116 :  'F5', 117 :  'F6', 118 :  'F7', 119 :  'F8', 120 :  'F9', 121 :  'F10', 122 :  'F11', 123 :  'F12', 187 :  'equal', 188 :  'Coma', 191 :  'Slash', 220 :  'Backslash' },

  // get size of object proerties
  getSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  },

  // perform callback and set timeout
  typeProcess = function (callback, process_id_obj) {
    var that = this;

    process_id_obj.id = setTimeout(function () {
      callback();
      that.time = Math.floor((that.MIN_TIME + Math.random() * (that.MAX_TIME - that.MIN_TIME ) ));
      typeProcess.apply(that, [callback, process_id_obj]);
    }, this.time);

  };

  DataEntry = function (time) {
    if (time) {
      this.time = time;
    }
  };


  DataEntry.fn = DataEntry.prototype = {
    // max time elapsed between keystrokes
    MAX_TIME: 250,

    // min time elapsed between keystrokes
    MIN_TIME : 150,

    // id of background process
    process_ids: [],

    // time to next keystroke
    time: 0,

    // get random character
    type : function () {
      return String.fromCharCode(Math.floor((Math.random()*getSize(key))+1));
    },

    // get random char code
    typeCharCode : function () {
      return Math.floor((Math.random()*getSize(key))+1);    
    },

    // attach input ant start typing
    attachType: function (input) {
      if (!input) {
        return; 
      }
      var process_id_obj = {}; 
      that = this;

      typeProcess.apply(this, [function () {
        input.value = input.value + that.type();
      }, process_id_obj]);

      // save to delete later
      this.process_ids.push(process_id_obj);
    },

    // stop typing
    stop: function () {
      for (var i = 0; i < this.process_ids.length; i++) {
        clearTimeout(this.process_ids[i].id);
      }
    },

    // delete content
    attachDelete: function (input) {
      if (!input) {
        return; 
      }
      var process_id_obj = {}; 

      typeProcess.apply(this, [function () {
        input.value = input.value.substring(0, input.value.length - 1);
      }, process_id_obj]);

      // save to delete later
      this.process_ids.push(process_id_obj);
    },

    // attach an input to copy contents
    attachClone: function (input, inputClone) {
      if (!input || !inputClone) {
        return; 
      }
      input.onkeyup = function (e) {
        inputClone.value = input.value;
      };
    }

  };

  DataEntry.makeDataEntry = function (time) {
    return new DataEntry(time);
  };

  window.DataEntry = DataEntry;
  
}(window));

// vim:set ts=2 sw=2 sts=2 expandtab:
