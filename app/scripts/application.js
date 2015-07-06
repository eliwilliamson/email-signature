(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  EmailSignatureGenerator = (function() {
    function EmailSignatureGenerator(inputs) {
      this.inputs = inputs;
      this.toggleDivider = __bind(this.toggleDivider, this);
      this.findDivider = __bind(this.findDivider, this);
      this.updateOptionalField = __bind(this.updateOptionalField, this);
      this.updateField = __bind(this.updateField, this);
      this.watchInput = __bind(this.watchInput, this);
      this.setWatchers = __bind(this.setWatchers, this);
      this.previewContainer = $('#signature-preview');
      this.setWatchers();
    }

    EmailSignatureGenerator.prototype.setWatchers = function() {
      var input, _i, _len, _ref, _results;
      _ref = this.inputs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        input = _ref[_i];
        _results.push(this.watchInput(input));
      }
      return _results;
    };

    EmailSignatureGenerator.prototype.watchInput = function(input) {
      var _this = this;
      return $("#" + input).on('input', function(e) {
        var id, regex;
        id = e.currentTarget.id;
        regex = /optional/;
        if (regex.test(e.currentTarget.className)) {
          return _this.updateOptionalField(id);
        } else {
          return _this.updateField(id);
        }
      });
    };

    EmailSignatureGenerator.prototype.updateField = function(element) {
      var input;
      input = $("#" + element).val();
      return $("#" + element + "-output").text(input);
    };

    EmailSignatureGenerator.prototype.updateOptionalField = function(element) {
      var href, input, output;
      input = $("#" + element).val();
      output = $("#" + element + "-output");
      if (input) {
        if (output.data('uri')) {
          href = output.data('uri');
          output.attr('href', "" + href + input).css('display', 'inline').removeClass('hidden').addClass('visible');
          return this.findDivider(output, 'show');
        } else {
          output.attr('href', "" + input).css('display', 'inline').removeClass('hidden').addClass('visible');
          return this.findDivider(output, 'show');
        }
      } else {
        output.css('display', 'none').removeClass('visible').addClass('hidden');
        return this.findDivider(output, 'hide');
      }
    };

    EmailSignatureGenerator.prototype.findDivider = function(element, toggle) {
      var next, prev;
      next = element.nextAll('.optional-field.visible');
      prev = element.prevAll('.optional-field.visible');
      if (next.length > 0) {
        if (element.find('.separator')) {
          return this.toggleDivider(element, toggle);
        }
      } else if (prev.length > 0) {
        if (prev.find('.separator')) {
          return this.toggleDivider(prev, toggle);
        }
      }
    };

    EmailSignatureGenerator.prototype.toggleDivider = function(parent, toggle) {
      var divider;
      divider = parent.find('.separator');
      if (toggle === 'show') {
        return divider.css('opacity', '1.0');
      } else if (toggle === 'hide') {
        return divider.css('opacity', '0.0');
      }
    };

    return EmailSignatureGenerator;

  })();

  (function() {
    var inputs;
    inputs = ['name', 'job', 'phone', 'twitter', 'dribbble', 'linkedin', 'github'];
    return new EmailSignatureGenerator(inputs);
  })();

}).call(this);
