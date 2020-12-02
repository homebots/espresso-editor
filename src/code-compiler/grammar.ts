export default `{
	function charCode(char) { return String(char).charCodeAt(0); }
	function toSlotId(char) { return charCode(char) - 97; }
    function parseHex(x) { return parseInt(x, 16) }
    function parseInt32(hex) { return hex.split(' ').map(parseHex).map((n, i) => n << ( 8 * (3 - i) ) ).reduce((a, n) => new Uint32Array([n])[0] + a, 0) }
}

program =
	value:(i:(label / instruction / selection) ws? {return i})*

zero  = "0"
digit  = [0-9]
digit_19 = [1-9]
hex = [0-9a-f]i
decimal = digit_19 digit*
number = zero / decimal
int32 = digit_19 digit? digit? digit? digit? digit? digit? digit?
byte = "0x" value:(hex hex) { return parseInt(text(), 16) }
byte32 = "0x" value:(hex hex space hex hex space hex hex space hex hex) { return text().split(' ').map(parseHex) }

false = "false" { return 0; }
true  = "true"  { return 1;  }
ws = [ \t\n\r]*
space = [ ]
spaces =  [ ]+
newline = [\n\r]
quote = "'"

alpha = [a-z]
address = byteHex space byteHex space byteHex space byteHex

number = zero / (digit_19 digit*) { return parseInt(text()) }
string "string" = quote chars:alpha* quote { return chars.concat([0]); }
value_separator = ws "," ws { return "," }



label =
	"@" label:(alpha (alpha/digit)* newline?) { return text().trim() }

instruction =
    i:(
      halt /
      iowrite /
      push_b /
      jumpto
    )

selection
	= comparison

comparison =
	"if" comparator "then"

comparator =
	space
	c:(gt)
    space { return c }

gt =
	"gt" target:slot value_separator a:slot value_separator b:slot { return ["#if", target, a, b] }

halt =
	"halt" newline { return ["halt"] }
push_b = "push_b" slot:slot value_separator byte:byte_value { return ["push_b", slot, byte] }

iowrite =
	"iowrite" pin:byte_value value_separator slot:slot /
    "$" pin:digit space+ "<<" slot:slot
    { return ["iowrite", pin, slot] }

ioread = "ioread" slot:slot value_separator pin:digit { return ["ioread", slot, pin] }
jumpto = "jumpto" space+ label:label { return ["jumpto", label] }

// space-wrapped values
byte_value = ws byte:byte ws { return byte }
number_value = ws number ws { return number }
slot = spaces "#"digit:digit spaces { return digit }

byte
	= zero
    / digit_19
    / digit_19 digit_19
    / "1" digit_19 digit_19
    / "2" [0-5] digit_19
    / byteHex { return parseInt(text()) }

byteHex = "0x" digit digit
false = "false" { return 0; }
true  = "true"  { return 1;  }
ws "whitespace" = [ \t\n\r]*
spaces =  [ ]+
space = [ ]
newline = [\n\r]
quote = "'"
zero  = "0"
digit  = [0-9]
digit_19 = [1-9]
alpha = [a-z]
address = byteHex space byteHex space byteHex space byteHex

number = zero / (digit_19 digit*) { return parseInt(text()) }
string "string" = quote chars:alpha* quote { return chars.concat([0]); }
value_separator = ws "," ws { return "," }
hexadecimal = [0-9a-f]i
`;
