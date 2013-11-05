// Get URL variables
$.extend({
	getUrlVars: function() {
		var vars = [],
		hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},

	getUrlVar: function(name) {
		return $.getUrlVars()[name];
	}
});


// Replace image
$.fn.replaceImg = function(options) {
	var urlParam = $.getUrlVar(options.urlParam),
		arr = ['y','yes','true'];

	if (typeof urlParam == 'undefined' || $.inArray(urlParam.toLowerCase(), arr) === -1) {
		options.find = '~$$$~';
	}

	return this.each(function() {
		var src = $(this).attr('src').replace(options.find, options.replace);

		$(this).attr('src', src);
	});
};


// Replace Kimmy
var options = {
	urlParam : 'kimmy',
	find     : 'kimberly',
	replace  : 'penguin'
};
$('img[src*="kimberly"]').replaceImg(options);


$(document).ready(function() {
	// Placeholder selected
	$('.placeholder img').click(function() {
		var that = this,
			id = $(that).data('id');

		$.post('draw', { person: id }, function(data) {
			var photo = $(that).attr('src').replace('placeholder.png', data.photo);

			$(that).fadeOut(function() {
				$(this)
					.attr('src', photo)
					.attr('alt', data.name)
					.attr('title', data.name)
					.replaceImg(options)
					.fadeIn();
			});
		});
	});
});