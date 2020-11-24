$.ajaxPrefilter(function (ajaxopt) {
    console.log(ajaxopt)
    ajaxopt.url = 'http://ajax.frontend.itheima.net' + ajaxopt.url;
})