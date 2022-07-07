<?php
?>
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <!--Title-->
    <title>@yield('title')</title>
    <!--Styles-->
    <link href="{{asset('css/styles.css')}}" rel="stylesheet" type="text/css"/>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
</head>

<body class="bg-primary">
<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header">
                                <h3 class="text-center font-weight-light my-4">Đăng Nhập</h3>
                            </div>
                            @include('elements.alert')
                            <div class="card-body">
                                <form method="POST" autocomplete="off" action="login/check" class="form-horizontal" enctype="multipart/form-data">
                                    @csrf
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                            <label class="col-form-label" for="inputEmailAddress">Email</label>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="email" class="form-control py-4" name="email"
                                                           placeholder="Enter email address"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                            <label class="col-form-label" for="inputPassword">Mật khẩu</label>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <input type="password" class="form-control py-4" name="password"
                                                           placeholder="Enter password"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input" id="rememberPasswordCheck" name="rememberPasswordCheck" value="yes" type="checkbox" />
                                                <label class="custom-control-label" for="rememberPasswordCheck">Nhớ mật khẩu</label>
                                            </div>
                                        </div>
                                    </div>
                                    {{--                                    <div class="row">--}}
                                    {{--                                        <div class="form-group">--}}
                                    {{--                                            <div class="custom-control custom-checkbox">--}}
                                    {{--                                                <input class="custom-control-input" id="logInAsAdmin" name="logInAsAdmin" value="yes" type="checkbox" />--}}
                                    {{--                                                <label class="custom-control-label" for="logInAsAdmin">Đăng nhập với tư cách quản trị viên</label>--}}
                                    {{--                                            </div>--}}
                                    {{--                                        </div>--}}
                                    {{--                                    </div>--}}
                                    {{--                                    <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">--}}
                                    {{--                                        <a class="small" href="{!! route('password') !!}">Quên mật khẩu?</a>--}}
                                    {{--                                    </div>--}}
                                    <div class="form-group mt-4 mb-0">
                                        <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
                                    </div>
                                </form>
                            </div>
                            {{--                            <div class="card-footer text-center">--}}
                            {{--                                <div class="small"><a href="{!! route('register') !!}">Chưa có tài khoản? Đăng ký!</a></div>--}}
                            {{--                            </div>--}}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <div id="layoutAuthentication_footer">
        <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; Your Website 2020</div>
                    <div>
                        <a href="#">Privacy Policy</a> &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="js/scripts.js"></script>
</body>

</html>
