import * as React from 'react';
import Input from '../Input';

export default class MaskedInputWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.mask = this.props.mask;
        this.defs = {
            '9': "[0-9]",
            'a': "[A-Za-z]",
            '*': "[A-Za-z0-9]"
        };
        this.placeholder = props.placeholder || "_";
        this.tests = [];
        this.firstNonMaskPos = null;
        this.length = this.mask.length;
        this.maskView = this.mask.replace(/9|a|\*/g, this.placeholder);
        this.selectionRange = {};
        this.state = {
            hiddenPartOfMask: "",
            visiblePartOfMask: this.maskView,
        };
        this.buffer = this.mask.split("").map(
            (char, i) => { 
                if (char != '?') 
                    return this.defs[char] ? this.placeholder : char; 
        });
        this.fillTests(this.mask);
    }
    fillTests = mask => {
       mask.split("").forEach((char, i) => {
            if (this.defs[char]) {
                this.tests.push(new RegExp(this.defs[char]));
                if (this.firstNonMaskPos == null)
                    this.firstNonMaskPos = this.tests.length - 1;
            } else {
                this.tests.push(null);
            }
      })
    }
    componentDidMount = () => {
        this.refs._input.input.value = this.props.value;
        this.checkVal();
        this.updateMaskRendering();
    }  
    __handleBackspaceDeleteKeyDown = isDelKey =>{
        var pos = this.refs._input.getSelectionRange();
        var begin = pos.begin;
        var end = pos.end;
        if (end - begin === 0) {
            begin = !isDelKey ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
            end = isDelKey  ? this.seekNext(end) : end;
        }
        this.clearBuffer(begin, end);
        this.shiftL(begin, end - 1);
    }
    __handleKeyDown = e => {
        var key = e.which;
        if(e.ctrlKey || e.altKey || e.metaKey || this.isSpecialKey(key))
            return;

        if (key === 8 || key === 46) {
            e.preventDefault();
            this.__handleBackspaceDeleteKeyDown(key === 46); 
        }else{
            var pos = this.refs._input.getSelectionRange();
            if (key) {
                if (pos.end - pos.begin != 0) {
                    this.clearBuffer(pos.begin, pos.end);
                    this.shiftL(pos.begin, pos.end - 1);
                }
                var p = this.seekNext(pos.begin - 1);
                if (p < this.length) {
                    var c = String.fromCharCode(key);
                    if (this.tests[p].test(c)) {
                        this.shiftR(p);
                        this.buffer[p] = c;
                        var next = this.seekNext(p);
                        this.storeSelectionRange(next);
                    } else {
                        this.refs._input.blink();
                    }
                    e.preventDefault();
                    this.updateInput();
                }else{
                    e.preventDefault();
                }
            }   
        } 
    }
    __handleKeyUp = e => {
        if(e.keyCode == 89 && e.ctrlKey || e.keyCode == 90 && e.ctrlKey){    // ctrl+z || ctrl+y
            this.__defferedInputUpdate();
            return;
        }
    }
    __defferedInputUpdate = () => {
        var that = this;
        setTimeout(function () {
            that.checkVal();
            that.updateInput();
        }, 0);
    }
    __getInputValue = () => {
        return this.refs._input.input.value
    }
    __setInputValue = value => {
        if(value === null)
            value = "";
        var start = this.selectionRange.begin;
        var end = this.selectionRange.end;
        this.refs._input.input.value = value;
        this.refs._input.setSelectionRange(start, end); 
    }
    updateInput = () => {
        this.fillBuffer();
        this.updateMaskRendering();
     }

    updateMaskRendering = () => {
       var value = this.trimBuffer();
       var hiddenPart = "";
       this.__setInputValue(value.join(""));
       value.map( (item, i) => {
            hiddenPart += !!this.tests[i] ? this.placeholder : item;
       });
       var visiblePart = this.maskView.substring(hiddenPart.length, this.maskView.length);
       this.setState({ hiddenPartOfMask: hiddenPart, visiblePartOfMask: visiblePart})
    }
    storeSelectionRange = (begin, end) => {
        this.selectionRange = {begin: begin || end, end: end || begin};
    }
    fillBuffer = () => {
        var test = this.__getInputValue();
        for (var i = 0; i < this.length; i++)
            if (this.tests[i]) {
                var c = test.charAt(i);
                if (this.tests[i].test(c))
                    this.buffer[i] = c;
            }
    }
    clearBuffer = (start, end) => {
        for (var i = start; i < end && i < this.length; i++) {
            if (this.tests[i])
                this.buffer[i] = this.placeholder;
        }
    }
    trimBuffer = () => {
        var length = this.buffer.indexOf(this.placeholder);
        return length !== -1 
                ? this.buffer.slice(0, length) 
                : this.buffer;
    }
    checkVal = allow => {
        var test = this.__getInputValue();
        var lastMatch = -1;
        for (var i = 0, pos = 0; i < this.length; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.placeholder;
                while (pos++ < test.length) {
                    var c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length)
                    break;
            } else if (this.buffer[i] == test.charAt(pos) && i != this.length) {
                pos++;
                lastMatch = i;
            }
        }
        if (!allow && lastMatch + 1 < this.length) {
            this.clearBuffer(0, this.length);
            this.fillBuffer();
            if (lastMatch < 0) {
                this.__setInputValue("");
            } else {
                this.checkVal(true);
            }
        } else if (allow || lastMatch + 1 >= this.length) {
            this.updateMaskRendering();
            if (!allow)
                var value = this.__getInputValue().substring(0, lastMatch + 1)
            this.updateMaskRendering();
        }
        this.refs._input.setSelectionRange(this.length ? i : this.firstNonMaskPos);
    }
    shiftL = (begin, end) => {
        if (begin < 0)
            return;
        for (var i = begin, j = this.seekNext(end); i < this.length; i++) {
            if (this.tests[i]) {
                if (j < this.length && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.placeholder;
                } else
                    break;
                j = this.seekNext(j);
            }
        }
        this.storeSelectionRange(Math.max(this.firstNonMaskPos, begin));
        this.updateMaskRendering();
    }
    shiftR = pos => {
        for (var i = pos, c = this.placeholder; i < this.length; i++) {
            if (this.tests[i]) {
                var j = this.seekNext(i);
                var t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.length && this.tests[j].test(t))
                    c = t;
                else
                    break;
            }
        }
    }
    seekPrev = pos => {
        while (--pos >= 0 && !this.tests[pos]);
        return pos;
    }
    seekNext = pos => {
        while (++pos <= this.length && !this.tests[pos]);
        return pos;
    }
    isSpecialKey = keyCode => !!~[9, 13, 16, 37, 38, 39, 40].indexOf(keyCode)
    render = ()  => {
        return (   
                <Input 
                    onKeyUp = {this.__handleKeyUp}
                    onKeyDown = {this.__handleKeyDown}
                    onCut = {this.__defferedInputUpdate}
                    onPaste = {this.__defferedInputUpdate}
                    visiblepart = {this.state.visiblePartOfMask}
                    hiddenpart = {this.state.hiddenPartOfMask}
                    maskAttached={true}
                    ref="_input"
                    type="text" />
        );
    }
}