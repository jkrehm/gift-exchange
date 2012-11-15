$(document).ready(function() {
	// Portrait selected
	// $('.person img').click(function() {
	// 	$('.person .selected').remove();
	// 	$(this).closest('.person').prepend('<span class="selected"></span>');
	// });

	// Placeholder selected
	$('.placeholder img').click(function() {
		var that = this,
			id = $(that).data('id');

		$.post('draw', { person: id }, function(data) {
			var photo = $(that).attr('src').replace('placeholder.png', data.photo);

			$(that).fadeOut(function() {
				$(this).attr('src', photo).attr('alt', data.name).attr('title', data.name).fadeIn();
			});
		});
	});
});