$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()


    })

    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            "密码6-12 位不呢个出现空格"],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) return '两次输入的密码不一致，请重输入'
        }
    })


    /* 注册表单事件 */

    var baseUrl = 'http://ajax.frontend.itheima.net'

    $('#regForm').on('submit', submitData)

    function submitData(e) {
        console.log(11);
        // e.preventDefault();
        e.preventDefault()
        var dataStr = $(this).serialize()
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: dataStr,
            success: function (res) {
                layui.layer.msg(res.message);
                console.log(res.message);

                if (res.status !== 0) return

                /* 将用户名自动放入 */
                let uname = $('.reg-box name=[username]').val()
                $('.login-box name=[username]').val(uname);

                let password = $('.reg-box name=[password]').val()
                $('.login-box name=[password]').val(password);
                $('#regForm')[0].reset();

                $('#link_reg').click();

            }
        })
    }
    /* 登录事件 */
    $('#formlogin').on('submit', function (e) {
        var dataStr = $(this).serialize()
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: dataStr,
            success: function (res) {
                if (res.status !== 0) {
                    return alert('登陆失败')
                } else {
                    console.log(res)
                }
                localStorage.setItem('token', res.token);
                location = '/index.html';
            }
        })
    })

})