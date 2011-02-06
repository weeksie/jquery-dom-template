/* 
Copyright (C) 2011 by Scotty Weeks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. 
 */
(function($){
    var methods = {
        initialize: function(selector) {
            return this.each(function(){
                $(this).html($(selector));
            });
        },
        replace: function(replacements){
            return this.each(function(){
                var $this = $(this);
                $.each(replacements, function(key, value) {
                    var matches = $this.find(key);
                    
                    if(value.charAt) {        // string
                        matches.html(value);
                    } else if (value.slice) { // array
                        var parent     = matches.parent(),
                            newElement = matches.clone();

                        // in the case of an Array [Function, Array] we
                        // take the match as a template and duplicate
                        // it for each element in the array, using the
                        // function to format the template.
                        if($.isFunction(value[0])) {
                            for(var l = value[1].length, i = 0; i<l; i++) {
                                value[0](i, newElement, value[1][i]);
                                parent.append(newElement);
                                newElement = matches.clone();
                            }
                            
                        // apply array values to matches                           
                        } else { 
                            for(var l = value.length, i = 0; i<l; i++) {
                                newElement.html(value[i]);
                                parent.append(newElement);
                                newElement = matches.clone();
                            }
                        }
                        
                        // clean up template
                        matches.remove();
                    }
                });
            });
        }
    };

    $.fn.template = function(method){
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    };
})(jQuery);
