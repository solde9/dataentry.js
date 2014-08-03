/**
* dataentry.js a dummy input data entry
*
* Copyright 2014 Nahuel Soldevilla
* Released under the MIT license.
*
* > dt = DataEntry.makeDataEntry()  // make new object
* > dt.attachType("input")  // attach to input element
*
* TODO:
*   - get text input, assign tab index 
*
*/
(function( window ) {

  var

  // printable characters min code
  PRINTABLE_CHARACTERS_MIN_CODE = 32,

  // printable characters max code
  PRINTABLE_CHARACTERS_MAX_CODE = 255,

  // get size of object proerties
  getSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  },

  /**
  * Returns a random integer between min (inclusive) and max (inclusive)
  */
  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // sleep and insert text on start
  typeProcess = function (callback, process_id_obj, text) {
    var that = this,
        character;

    if (text) {
      // get first character to type
      character = text.charAt(0),
      text = text.substr(1);

      if (!text) {
        // there is no more text to type
        return; 
      }
    }

    process_id_obj.id = setTimeout(function () {
      callback(character);
      that.time = Math.floor((that.min_time + Math.random() * (that.max_time - that.min_time ) ));
      typeProcess.apply(that, [callback, process_id_obj, text]);
    }, this.time);

  };

  DataEntry = function (time) {
    if (time) {
      this.time = time;
    }
  };

  DataEntry.prototype = {
    // max time elapsed between keystrokes
    max_time: 250,

    // min time elapsed between keystrokes
    min_time : 150,

    // id of background process
    process_ids: [],

    // time to next keystroke
    time: 0,

    // min character code
    min_code : 32,

    // max character code
    max_code : 122,

    /**
     * type a character from text or a random character
     * @param {String} character Optional - a text to type. If not present, it will be random
     * @return {Char} character argument or random character
     */
    type : function (character) {
      return character || String.fromCharCode(getRandomInt(this.min_code, this.max_code));
    },

    // get random char code
    typeCharCode : function () {
      return getRandomInt(this.min_code, this.max_code);    
    },

    /**
     * attach input ant start typing
     * @param {String} text Optional - a text to type. If not present, it will be random
     */
    attachType: function (input, text) {
      if (!input) {
        return; 
      }
      var process_id_obj = {}; 
      that = this;

      typeProcess.apply(this, [function (character) {
          input.value = input.value + that.type(character);
      }, process_id_obj, text]);

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
    },

    // methods to manage inputs
    controlApi: { 
      // elements controled by the api
      elements: [],

      // keys pressed on elements
      keys: [],
      
      // add element to control
      addElement: function (elem) {
        this.elements.push(elem);

        // keys pressed
        var keys = this.keys,

        that = this,

        // key press event controller
        keyPressListener = function (e) {
          // store an entry for every key pressed
          keys[e.keyCode] = true;

          // Ctrl +  A/a
          if (keys[17] && keys[65]) {
            that.selectAll();
            e.preventDefault();
          }

        },

        // key up event controller
        keyUpListener = function (e) {
          // mark keys that were released
          keys[e.keyCode] = false;
        };

        elem.addEventListener("keydown",keyPressListener);
        elem.addEventListener("keyup",keyUpListener);
      },

      // select all elements
      selectAll: function () {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].style.backgroundColor = "#3399FF";
          this.elements[i].style.color = "white";
        }
      },

      // clear selection
      clearSelect: function () {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].style.backgroundColor = "";
          this.elements[i].style.color = "";
        }
      }

    } // controlApi 

  };

  DataEntry.makeDataEntry = function (time) {
    return new DataEntry(time);
  };

  window.DataEntry = DataEntry;


}(window));

// vim:set ts=2 sw=2 sts=2 expandtab:
