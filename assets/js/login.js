$(function () {
    $('#link_reg').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    })
    $('#link_login').on('click', function () {
        $('.reg').hide()
        $('.login').show()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            let pwd = $('.reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = { username: $('#form_reg [name=uersname]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data,
        function (res) {
            if (res.status !== 1) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    
    // 监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'http://api-breakingnews-web.itheima.net/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 1){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
                // console.log(res.token);

            }
        })
    })
   
})