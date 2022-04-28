const _common_text = [
	'Do not use commas, currency/percent signs, or spaces.', //0
	'<br><span class="invalid-value">' //1
]

const _error_dictionary = [
	'Error[000]: Specified less-than range is not valid. Use &lt;+numbers only (eg. &lt;123.67).',
	'Error[001]: Specified greater-than range is not valid. Use &gt;+numbers only (eg. &gt;123.67).',
	'Error[002]: &lt; or &gt; must be followed by a number.',
	'Error[003]: &lt; or &gt; range may each only be used once in a command.',
	'Error[004]: Query not found.'
]

var _errors = []; //array of error messages

function escapeHtml(unsafe)
{
	unsafe = unsafe.valueOf();
	return unsafe
		 .replace(/&/g, "&amp;")
		 .replace(/</g, "&lt;")
		 .replace(/>/g, "&gt;")
		 .replace(/"/g, "&quot;")
		 .replace(/'/g, "&#039;");
}

function greetings(term) {
	const greeting = $('<img src="./fulcrum3_banner.bmp"><span>FULCRUM Field-Ticketing System</span>');
	term.echo(greeting);
}