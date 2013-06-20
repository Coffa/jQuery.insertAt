(function($){
      $.fn.insertAt = function(index, element, params) {
        var length = this.children().length,
            attrs = '';
        params ? t = params : t = {dom: null, status: false}
        t.dom = $('<'+$(element).prop("tagName")+'>'.toLowerCase(), {
            data: {
                index: index
            }
        });
        _.each($(element).getAttributes(), function(value, key) {
            t.dom.attr(key, value)
        });
        t.dom.html($(element).html())
        if (length == 0)
            t.dom.appendTo(this);
        else {
            _insert = false;
            _.any(this.children(), function (value) {
                if (index == +$(value).data('index')) {
                    $(value).replaceWith(t.dom);
                    return _insert = true;
                }
                else if (index < +$(value).data('index')){
                    $(value).before(t.dom);
                    return _insert = true;
                }
            }, this)
            if (!_insert) {
                t.dom.appendTo(this);
                t.status = true
            }
        }
        return this;
    }
    $.fn.getAttributes = function() {
        var attributes = {};
        if( this.length ) {
            $.each( this[0].attributes, function( index, attr ) {
                attributes[ attr.name ] = attr.value;
            } );
        }
        return attributes;
    };
})(jQuery);
