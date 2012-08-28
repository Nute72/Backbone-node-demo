$.app = {}

// models
$.app.User = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id',
});

$.app.Users = Backbone.Collection.extend({
	url: '/api/users',
	model: $.app.User
});

// views
$.app.UserListView = Backbone.View.extend({
	tagName: 'div',
	className: 'usersListView',
	initialize: function() {
		_.bindAll(this, 'render', 'render_user_summary', 'on_submit', 'on_user_created', 'on_error');
		this.model.bind('reset', this.render);
		this.model.bind('change', this.render);
		this.model.bind('add', this.render_user_summary);
	},

	template: Handlebars.compile($('#tpl_users_list').html()),

	render: function() {
		$(this.el).html(this.template());
		this.model.forEach(this.render_user_summary);
		return $(this.el).html();
	},

	render_user_summary: function(user) {
		var user_summary_view = new $.app.UserSummaryView({model: user});
		this.$('ul.users_list').prepend($(user_summary_view.render()));
	},

	events: {
		'click input[type=submit]': 'on_submit',
	},

	on_submit: function(e) {
		var user = new $.app.User({
			username: this.$('.new_user_username').val(),
			password: this.$('.new_user_password').val()
		 });
		user.save({}, { success: this.on_user_created,
								error: this.on_error });
	},

	on_user_created: function(user, response) {
		this.model.add(user, {at: 0});
	},

	on_error: function(model, response) {
		var error = $.parseJSON(response.responseText);
		this.$('.error_message').html(error.message);
	},
});

$.app.UserSummaryView = Backbone.View.extend({
  tagName: 'li',

  className: 'user_summary_view',

  initialize: function(){
      _.bindAll(this, 'render', 'on_click');
      this.model.bind('change', this.render);
  },

  template: Handlebars.compile($('#tpl_user_summary').html()),

  render: function() {
      return $(this.el).html(this.template(this.model.toJSON()));
  },

	events: {
      'click': 'on_click',
  },

  on_click: function(e) {
      $.app.app.navigate('users/'+this.model.get('_id'), {trigger: true});
  },
});

$.app.UserView = Backbone.View.extend({
  tagName: 'div',

  className: 'user_view',

	 initialize: function(){
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.model.bind('reset', this.render);
	},

	template: Handlebars.compile($('#tpl_user').html()),

	render: function() {
			return $(this.el).html(this.template(this.model.toJSON()));
	},

});

// router
$.app.Router = Backbone.Router.extend({
	  routes: {
	      "": "show_users", /* index.html */
	      "users/:_id": "show_user",
	  },

	  show_users: function() {
      var users_collection = new $.app.Users();
      var users_list_view = new $.app.UserListView({el: $('#content'), model: users_collection });
      users_collection.fetch();
	  },

	  show_user: function(_id) {
      var user = new $.app.User({_id: _id});
      var thread_view = new $.app.UserView({el: $('#content'), model: user});
      user.fetch();
	  },

});

$.app.app = null;
$.app.bootstrap = function() {
	$.app.app = new $.app.Router();
	Backbone.history.start({pushState: true});
};    



