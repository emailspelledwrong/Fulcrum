var vscrap = [false,false,false,false,false,false]; //void,submitted,created,rejected,approved,paid

const invoice_table_page = $('<table id="invoices">'+
	'<tr><th>Invoice#</th><th>Customer</th><th>Status</th><th>Updated</th><th>Submitted</th><th>Paid</th><th class="currency">Value</th></tr>'+
	'<tr><td>4549816</td><td>Tesla</td><td>created</td><td>2022-03-08 02:23:14PM</td><td></td><td></td><td class="currency">$14,779.81</td></tr>'+
	'<tr><td>3178349</td><td>Amazon</td><td>submitted</td><td>2022-02-21 11:05:17AM</td><td>2022-03-02</td><td></td><td class="currency">$12,349,228.99</td></tr>'+
	'<tr><td>4329817</td><td>Alphabet</td><td>paid</td><td>2022-02-14 08:21:54AM</td><td>2022-02-15</td><td>2022-03-29</td><td class="currency">$293,766.12</td></tr>'+
	'<tr><td>0039141</td><td>Oracle</td><td>rejected</td><td>2022-03-08 04:29:13PM</td><td>2022-03-11</td><td></td><td class="currency">$4,723.05</td></tr>'+
	'</table>'+
	'\n<span>Page 1 of 999</span>'); //a fake set of invoice data
	
const inv_help = 'This is the help for the INV command.';
	
var ranges = [NaN,NaN]; //[less-than value, greater-than value]

function isNumeric(str) {
	if (typeof str != "string") return false; // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}

function process_vscrap(val, i) {
	const vscrap_args = ['void','submitted','created','rejected','approved','paid'];
	if (vscrap_args.indexOf(val) != -1) {
		vscrap[vscrap_args.indexOf(val)] = true;
	}
}	

function process_queries(val, i) {
	if (val.startsWith('@')) {
		//load the named query
		_errors.push($('<span>'+_error_dictionary[4]+'</span>'+_common_text[1]+escapeHtml(val)+'</span>'));
	}
}

function process_ranges(val, i) {
	if ((val.startsWith('>') || val.startsWith('<')) && val.length == 1) {
		_errors.push($('<span>'+_error_dictionary[2]+'</span>'+_common_text[1]+escapeHtml(val)+'</span>'));
		return;
	}
	
	if (val.startsWith('<')) {
		if (!isNaN(ranges[0])) {
			_errors.push($('<span>'+_error_dictionary[3]+'</span>'+_common_text[1]+escapeHtml(val)+'</span>')); 
			return;
		}
		var lessThanValue = val.slice(1,val.length);
		if (isNumeric(lessThanValue) == true) { 
			ranges[0] = lessThanValue;
		} else {
			_errors.push($('<span>'+_error_dictionary[0]+'</span>'+_common_text[1]+escapeHtml(val)+'</span>'));
		}
	}

	if (val.startsWith('>')) {
		if (!isNaN(ranges[1])) {
			_errors.push($('<span>'+_error_dictionary[3]+'</span>'+_common_text[1]+escapeHtml(val)+'</span>'));
			return;
		}
		var greaterThanValue = val.slice(1,val.length);
		if (isNumeric(greaterThanValue) == true) { 
			ranges[1] = greaterThanValue;
		} else {
			_errors.push($('<span>'+_error_dictionary[1]+'</span>'+_common_text[1]+escapeHtml(val)+'</span>'));
		}
	}
}