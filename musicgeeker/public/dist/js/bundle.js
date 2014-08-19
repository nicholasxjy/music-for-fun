var app=angular.module("mGeek",["ui.router","angular-loading-bar","ngAnimate","mGeek.controllers","mGeek.services","mGeek.directives"]);app.config(function(o,t){t.otherwise("/"),o.state("main",{url:"/",templateUrl:"partials/main.html",controller:"MainCtrl"}).state("home",{url:"/home",templateUrl:"partials/home.html"})});var app=angular.module("mGeek.controllers",["ngDialog","mGeek.services","ui.router","mediaPlayer"]);app.controller("MainCtrl",["$scope","ngDialog",function(o,t){o.showLoginModal=function(){t.open({template:"partials/login.html",controller:"LoginCtrl"})},o.showWeChatModal=function(){t.open({template:"partials/wechat.html"})}}]),app.controller("LoginCtrl",["$scope","ngDialog","Auth","$timeout","$state",function(o,t,e,n,r){o.login={},o.showSignupModal=function(){t.close("ngdialog1"),t.open({template:"partials/register.html",controller:"SignupCtrl"})},o.showForgotPassModal=function(){t.close("ngdialog1"),t.open({template:"partials/forgetpass.html",controller:"ForgotPassCtrl"})},o.loginFormSubmit=function(i){var a=i;e.signin(a).success(function(e){"fail"===e.status?(o.hasError=!0,o.login.msg=e.msg):""!==e.activetip?(o.hasError=!0,o.login.msg=e.activetip,n(function(){t.close("ngdialog1"),r.go("home")},1500)):r.go("home")}).error(function(){alert("Something goes wrong here, dear!")})}}]),app.controller("SignupCtrl",["$scope","ngDialog","Auth",function(o,t,e){o.hasError=!1,o.resultDone=!1,o.register={},o.register.msg="",o.showLoginModal=function(){t.close("ngdialog2"),t.open({template:"partials/login.html",controller:"LoginCtrl"})},o.registerFormSubmit=function(t){var n=t;console.log(n),e.signup(n).success(function(t){"fail"===t.status?(o.hasError=!0,o.resultDone=!0,o.register.msg=t.msg):(o.hasError=!1,o.resultDone=!0,o.register.msg=t.msg)}).error(function(){alert("Something goes wrong here, dear!")})}}]),app.controller("ForgotPassCtrl",["$scope","ngDialog","$timeout","$state","Auth",function(o,t,e,n,r){o.forgotPassFormSubmit=function(t){r.forgotPass(t).success(function(t){"fail"===t.status?(o.hasError=!0,o.resultDone=!0,o.msg=t.msg):(o.hasError=!1,o.resultDone=!0,o.msg=t.msg,e(function(){n.reload()},2e3))}).error(function(){alert("Something goes wrong here, try again!")})}}]),app.controller("AudioCtrl",["$scope","API","$timeout","ngDialog","$state","Auth",function(o,t,e,n,r,i){t.getUser().success(function(t){o.data=t.data}).error(function(){alert("Something goes wrong here!")}),t.getSongs().success(function(t){o.playlist=t.data.songs}).error(function(){alert("Something goes wrong here!")}),o.playing=!0,o.mute=!1,o.hasNotification=!1,o.audioPlay=function(){o.audio1.playPause(),o.playing?(o.playing=!1,o.pause=!0):(o.playing=!0,o.pause=!1)},o.audioPrev=function(){o.audio1.prev(!0)},o.audioNext=function(){o.audio1.next(!0)},o.audioToggleMute=function(){o.mute=!o.mute,o.audio1.toggleMute()},o.audioVolumeUp=function(){var t=o.audio1.volume+.1>1?1:o.audio1.volume+.1;o.audio1.setVolume(t)},o.audioVolumeDown=function(){var t=o.audio1.volume-.1<0?0:o.audio1.volume-.1;o.audio1.setVolume(t)},o.showAnswerFormModal=function(){o.audio1.pause(),o.mute=!0,n.open({template:"partials/answerform.html",scope:o,contoller:"AudioCtrl"})},o.answerFormSubmit=function(r){n.close("ngdialog1");var i=o.audio1.currentTrack,a=0>i-1?0:i-1;r.id=o.playlist[a].id,t.checkSong(r).success(function(t){o.data.user.score=t.score,o.notification=t.msg,o.hasNotification=!0,e(function(){o.hasNotification=!1},2e3)}).error(function(){alert("Something goes wrong here!")})},o.signOut=function(){i.logout().success(function(){r.go("main")}).error(function(){alert("Something goes wrong here!")})}}]),angular.module("mGeek.directives",[]).directive("mgTooltip",function(){return{link:function(o,t){$(t).tooltip()}}});var app=angular.module("mGeek.services",[]);app.factory("Auth",["$http",function(o){return{signup:function(t){return o.post("/api/user/signup",{data:t})},signin:function(t){return o.post("/api/user/signin",{data:t})},forgotPass:function(t){return o.post("/api/user/forgotpass",{data:t})},logout:function(){return o.get("/api/user/logout")}}}]),app.factory("API",["$http",function(o){return{getUser:function(){return o.get("/api/getuser")},getSongs:function(){return o.get("/api/getsongs/")},checkSong:function(t){return o.post("/api/checksong",{data:t})}}}]);