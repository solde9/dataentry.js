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

  // perform callback and set timeout
  typeProcess = function (callback, process_id_obj) {
    var that = this;

    process_id_obj.id = setTimeout(function () {
      callback();
      that.time = Math.floor((that.min_time + Math.random() * (that.max_time - that.min_time ) ));
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

    // get random character
    type : function () {
      return String.fromCharCode(getRandomInt(this.min_code, this.max_code));
    },

    // get random char code
    typeCharCode : function () {
      return getRandomInt(this.min_code, this.max_code);    
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
