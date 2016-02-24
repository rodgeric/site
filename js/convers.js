var serializeObject = function(obj) {
    var pairs = [];
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
            continue;
        }
        if (Object.prototype.toString.call(obj[prop]) == '[object Object]') {
            pairs.push(serializeObject(obj[prop]));
            continue;
        }
        pairs.push(prop + '=' + obj[prop]);
    }
    return pairs.join('&');
};


(function($){


    $.ajaxSubmit = function(params){

        var method   = params.method || "post";
        var type     = params.type || 'json';
        var action   = $(params.form).attr('action');
        var form     = $(params.form).serialize();

        if(params.data && Object.keys(params.data).length){
            form += "&" + serializeObject(params.data);
        }

        if(method == 'post'){
            $.post(action, form, params.callback, type);
        }
        else{
            $.get(action, form, params.callback, type);
        }

    }

    $(window).load(function(){
        $('input[name="city"]').val(YMaps.location.city);

        // Получаем счетчики Google и Метрика
        var variables = Object.keys( window );
        var counters = {};

        if(typeof ga == 'function'){
            counters['ga'] = ga;
        }
        else{
            console.error('Счетчик GoogleAnalytics не установлен');
        }

        for(key in variables){
            if(variables[key].substr(0, 9) === "yaCounter"){
                counters['ya'] = window[ variables[key] ];
            }
        }

        if(typeof counters['ya'] == 'undefined'){
            console.error('Счетчик Яндекс.Метрика не установлен');
        }
        // Получаем счетчики Google и Метрика

        // Диагностика целей и форм
        console.group('Диагностика');
        $(
            'a[data-goal=1],' +
            'li[data-goal=1],' +
            'div[data-goal=1],' +
            'button[data-goal=1]'
        ).each(function(){
                var handler = $(this).attr('data-handler');
                if(typeof handler != 'undefined' && typeof handler != 'function'){
                    console.log($(this));
                    console.error("Error handler не функция");
                }
                else if(typeof $(this).attr('data-goalName') == 'undefined'){
                    console.log($(this));
                    console.error('Имя цели не указано');
                }
            });

        $('form[data-goal=1]').each(function(){
            var goalName = $(this).attr('name');
            if(typeof goalName == 'undefined'){
                console.log($(this));
                console.error('Имя цели не указано');
            }
            var handler = $(this).attr('data-handler');
            if(typeof handler != 'undefined' && typeof window[handler] != 'function'){
                console.log($(this));
                console.error("Error handler не функция");
            }
            var callback = $(this).attr('data-callback');
            if(typeof callback != 'undefined' && typeof window[callback] != 'function'){
                console.log($(this));
                console.error("Error callback не функция");
            }

            if($(this).attr('data-method') != 'ajax' && !$(this).find('input[name=goalName]').length){
                console.log($(this));
                console.error("Вам необходимо добавить в форму тег <input type='hidden' name='goalName' value='имя_цели'>");
            }
        });
        console.groupEnd();
        // Диагностика целей и форм




        // Выводим список целей и форм доступных на странице
        console.group('Список целей и форм');
        $(
            'a[data-goal=1],' +
            'li[data-goal=1],' +
            'div[data-goal=1],' +
            'button[data-goal=1]'
        ).each(function(){
                console.log( $(this) );
                console.log( 'Имя цели:' );
                console.log($(this).attr('data-goalName') );
            });

        $('form[data-goal=1]').each(function(){
            console.log( $(this) );
            console.log( 'Имя цели:' );
            console.log($(this).attr('name') );
        });
        console.groupEnd();
        // Выводим список целей и форм доступных на странице




        /// Обработчики целей и форм
        $(
            'a[data-goal=1],' +
            'li[data-goal=1],' +
            'div[data-goal=1],' +
            'button[data-goal=1]'
        ).click(function(){
                var handler = $(this).attr('data-handler');
                if(typeof window[handler] === 'function'){
                    window[handler](this);
                }
                else{
                    var goalName = $(this).attr('data-goalName');
                    if(typeof goalName != 'undefined'){
                        counters['ya'].reachGoal(goalName);
                        ga('send', 'event', goalName, goalName);
                    }
                    else{
                        console.log($(this));
                        console.error('Имя цели не указано');
                    }
                }
                return true;
            });

        $('form[data-goal=1]').submit(function(e){
            var goalName = $(this).attr('name');
            if(typeof goalName == 'undefined'){
                console.log($(this));
                console.error('Имя цели не указано');
            }

            var handler = $(this).attr('data-handler');
            if(typeof window[handler] === 'function'){
                return window[handler](this);
            }
            else{
                var fmethod = $(this).attr('data-method');
                var passed = true;
                $("form[name="+goalName+"] input[type='text']").each(function(){
                    var inptype = $(this).attr("name");

                    var inpvalue = $(this).val();
                    if (!inputValidate(inptype, inpvalue)){
                        $(this).addClass("notvalid").shake();
                        passed = false;
                        console.log('convers error');
                    }
                });

                if(passed){
                    if(fmethod == 'ajax'){
                        var data = {
                            'goalName' : goalName,
                            'method'   : 'ajax'
                        };
                        var cur = this;
                        var ajaxCallback = function(response){
                            var callback = $(cur).attr('data-callback');
                            if(typeof callback == 'undefined'){
                                console.error('Не установлен callback для формы');
                                console.log($(cur));
                            }
                            else if(typeof window[callback] != 'function'){
                                console.error('Callback ' + callback + ' - не функция');
                                console.log(callback);
                            }
                            else{
                                window[callback](cur);
                            }
                        }

                        $.ajaxSubmit({
                            form : this,
                            callback : ajaxCallback,
                            data : data
                        });
                        counters['ya'].reachGoal(goalName);
                        ga('send', 'event', goalName, goalName);
                        return false;
                    }
                    counters['ya'].reachGoal(goalName);
                    ga('send', 'event', goalName, goalName);
                    return true;
                }
                else{
                    var failValidate = $(this).attr('data-failValidate');
                    if(typeof failValidate != 'undefined' && typeof window[failValidate] == 'function'){
                        window[failValidate](this);
                    }
                    else if(typeof failValidate != 'undefined'){
                        console.error('Error failValidate - не функция');
                    }
                    return false; // не прошла валидация
                }
            }
        });



        /// Обработчики целей и форм

        function inputValidate(type, val) {
            switch (type) {
                case "mail":
                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    return pattern.test(val);
                    break
                case "phone":
                    var pattern = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/);
                    return pattern.test(val);
                    break
                case "name":
                    if (val.length > 2) return true;
                    break
                case "date":
                    if (val.length > 1) {
                        return true;}
                    break
                case "info":
                    if (val.length > 5) {
                        return true;}
                    break
                default:
                    break
            }
        }
    });
})(jQuery);
