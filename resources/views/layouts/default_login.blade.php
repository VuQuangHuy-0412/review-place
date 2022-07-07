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

    <style>
        body {
            background-image: url('{{asset('image/bg_login.jpg')}}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
        }
    </style>

    @section('style')
    @show

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
</head>

<body class="bg-primary">

    <div id="layoutAuthentication">

        @yield('body')

        <div id="layoutAuthentication_footer" >
            <footer class="py-4 bg-light mt-auto" style="background-color: #dc3545 !important;">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted" style="color: black !important;">
                            <img src="{{ asset('image/logo_soict.png') }}" width="8%">
                            <span style="font-size: medium;">&nbsp;&nbsp;Hanoi University of Science and Technology</span>
                        </div>
                        <div>
                            <a href="#" style="color: black !important; font-size: medium;">Privacy Policy</a> &middot;
                            <a href="#" style="color: black !important; font-size: medium;">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="js/scripts.js"></script>

    @section('script')
    @show

</body>

</html>
