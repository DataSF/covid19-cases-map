    /// Not used in main page, saved here just in case


    /// Read CSV data published by domestic team from `source`
    /// Parses CSV for the requested `fields`. `fields` is an object where the key is
    /// the output key and the value is the expected column name in the data.
    /// Calls `callback` with parsed data when successfully complete.
    /// If there is an error, calls `errorHandler` instead.
    function loadCSV(source, fields, callback, errorHandler) {
      var request = new XMLHttpRequest();
      request.open("GET", source);
      request.onreadystatechange = function (event) {
        if (request.readyState === XMLHttpRequest.DONE) {
          try {
            var text = request.responseText;
            var entries = parseCSVForFields(text, fields);
            if (callback) {
              callback(entries);
            }
          } catch (err) {
            console.error(err);
            if (errorHandler) {
              errorHandler(err);
            }
          }
        }
      };

      request.send();
    }

    /// Parse CSV data and return array of objects with requested fields
    function parseCSVForFields(text, fields) {
      var lines = text.split("\n");
      var sep = ",";

      var keyIndices = parseHeader(lines[0], fields);
      if (keyIndices.some(function (v) { return v.index === -1; })) {
        throw (new Error("Heading format for data has changed. Please update this page to expect new data format."))
      }

      var entries = [];
      for (var i = 1; i < lines.length; i += 1) {
        if (lines[i].length === 0) {
          continue;
        }
        var pieces = lines[i].split(sep);
        var obj = keyIndices.reduce(function (collection, keyIndex) {
          collection[keyIndex.key] = pieces[keyIndex.index].trim();
          return collection;
        }, {});
        entries.push(obj);
      }
      return entries;
    }

    function parseHeader(row, fields) {
      var sep = ",";
      var headings = row.split(sep).map(function (heading) { return heading.trim(); });
      return Object.keys(fields).map(function (key) {
        return { key: key, index: headings.indexOf(fields[key]) };
      });
    }