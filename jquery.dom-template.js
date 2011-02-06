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
