// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Commentator = (function() {

    function Commentator(args) {
      this.add_comment = __bind(this.add_comment, this);
      this.el = args.el;
      this.url = args.url;
      this.poster = args.poster || new Commentator.Poster;
      this.comments = args.comments || this.fetch_comments();
      this.reply_link_name = args.reply_link_name || "Comment";
      this.set_display_form(args);
      this.set_templates(args);
      this.el.delegate(".comments_form", "submit", this.add_comment);
      this.render_comments();
      if (this.display_form && (this.url != null)) {
        this.render_form();
      }
    }

    Commentator.prototype.set_display_form = function(args) {
      if (args.display_form != null) {
        return this.display_form = args.display_form;
      } else {
        return this.display_form = true;
      }
    };

    Commentator.prototype.set_templates = function(args) {
      this.comment_template = args.comment_template || CommentatorTemplates.comment;
      this.reply_template = args.reply_template || CommentatorTemplates.reply;
      this.comments_form_template = args.comments_form_template || CommentatorTemplates.comments_form;
      return this.replies_form_template = args.replies_form_template || CommentatorTemplates.replies_form;
    };

    Commentator.prototype.fetch_comments = function() {
      return this.el.data("comments");
    };

    Commentator.prototype.render_comments = function() {
      this.comments_view = new Commentator.CommentsView(this, this.comments);
      return this.el.append(this.comments_view.render());
    };

    Commentator.prototype.render_form = function() {
      this.form_view = new Commentator.CommentFormView(this);
      return this.el.append(this.form_view.render());
    };

    Commentator.prototype.add_comment = function(e) {
      e.preventDefault();
      if (this.form_view.is_comment_valid()) {
        return this._save_comment();
      }
    };

    Commentator.prototype._save_comment = function() {
      var data,
        _this = this;
      data = {
        message: this.form_view.comment()
      };
      return this.poster.post(this.url, data, function(json) {
        _this.comments.push(json);
        _this.comments_view.add_comment(json);
        return _this.form_view.clean();
      });
    };

    return Commentator;

  })();

  Commentator.CommentFormView = (function() {

    function CommentFormView(app) {
      this.app = app;
      this.change_state = __bind(this.change_state, this);

      this.enable = __bind(this.enable, this);

      this.disable = __bind(this.disable, this);

      this.el = $("<form>");
      this.el.addClass("comments_form");
      this.el.delegate("textarea", "keyup", this.change_state);
      this.el.submit(this.disable);
      this.template = this.app.comments_form_template;
    }

    CommentFormView.prototype.render = function() {
      this.el.html(this.template);
      this.disable();
      return this.el;
    };

    CommentFormView.prototype.disable = function() {
      return this.button().attr("disabled", true);
    };

    CommentFormView.prototype.enable = function() {
      return this.button().attr("disabled", false);
    };

    CommentFormView.prototype.change_state = function() {
      if (this.is_comment_valid()) {
        return this.enable();
      } else {
        return this.disable();
      }
    };

    CommentFormView.prototype.is_comment_valid = function() {
      return this.comment() !== "";
    };

    CommentFormView.prototype.comment = function() {
      return this.textarea().val();
    };

    CommentFormView.prototype.clean = function() {
      return this.textarea().val("");
    };

    CommentFormView.prototype.textarea = function() {
      return this.el.find("textarea");
    };

    CommentFormView.prototype.button = function() {
      return this.el.find(".btn");
    };

    return CommentFormView;

  })();

  Commentator.CommentItemView = (function() {

    function CommentItemView(app, comment) {
      this.app = app;
      this.comment = comment;
      this.el = $("<div class='comment'>");
      this.template = this.app.comment_template;
    }

    CommentItemView.prototype.render = function() {
      this.el.html(this.template(this.comment));
      return this.el;
    };

    CommentItemView.prototype.add_replies = function() {
      return this.replies_app = new Replies({
        el: this.replies_el(),
        comment: this.comment,
        reply_template: this.app.reply_template,
        reply_link_name: this.app.reply_link_name,
        replies_form_template: this.app.replies_form_template,
        display_form: this.app.display_form
      });
    };

    CommentItemView.prototype.replies_el = function() {
      return this.el.find("#replies");
    };

    return CommentItemView;

  })();

  Commentator.CommentsView = (function() {

    function CommentsView(app, comments) {
      this.app = app;
      this.comments = comments;
      this.el = $("<div id='comments'>");
    }

    CommentsView.prototype.render = function() {
      var comment, _i, _len, _ref;
      _ref = this.comments;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        comment = _ref[_i];
        this.add_comment(comment);
      }
      return this.el;
    };

    CommentsView.prototype.add_comment = function(comment) {
      var comment_view;
      comment_view = new Commentator.CommentItemView(this.app, comment);
      this.el.append(comment_view.render());
      return comment_view.add_replies();
    };

    return CommentsView;

  })();

  Commentator.Poster = (function() {

    function Poster() {}

    Poster.prototype.post = function(url, data, callback) {
      var _this = this;
      return $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(json) {
          return callback(json);
        }
      });
    };

    return Poster;

  })();

}).call(this);
