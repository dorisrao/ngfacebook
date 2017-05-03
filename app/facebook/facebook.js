'use strict';

angular.module('ngsocial.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', '$facebookProvider', function($routeProvider, $facebookProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'facebookCtrl'
  });

  $facebookProvider.setAppId('288940921518213');
  $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");
}])

.run(function($rootScope){
	(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

})


.controller('facebookCtrl', ['$scope', '$facebook','$q', function($scope, $facebook, $q) {
	$scope.isLoggedIn = false;
  refresh();
	$scope.login = function(){
		$facebook.login().then(function(){
			//scope.response = response;
      $scope.isLoggedIn = true;
		  console.log('logged in');
     // $scope.welcomeMsg = refresh();
      refresh();
       //console.log('refresh',refresh().$$state.value);
      // console.log('$scope.welcomeMsg',$scope.welcomeMsg);
		});  
	}

  $scope.logout = function(){
    $facebook.logout().then(function(){
      $scope.isLoggedIn = false;
      console.log('logged out');
      refresh();
    });
  }

  $scope.addPost = function(){
      $facebook.api('/me/feed', 
        'post', {message: $scope.newPost}
      ).then(function(){
        console.log('post added');
        refresh();
      });   
  }


  function refresh(){
    $facebook.api('/me', {fields:'id, name, first_name, last_name, email, gender, locale, picture, link, permissions, posts'}).then(
      function(response){
        $scope.welcomeMsg = "Welcome " + response.name;
        // console.log(response.posts.data);
        $scope.id = response.id;
        $scope.first_name = response.first_name;
        $scope.last_name = response.last_name;
        $scope.email = response.email;
        $scope.gender = response.gender;
        $scope.locale = response.locale;  
        // $facebook.api(
        //   "/me/picture",
        //   function (response) {
        //     if (response && !response.error) {
        //       console.log(response.data.url);
        //     }
        //   }
        // );  
        $scope.pictureUrl = response.picture.data.url;
        $scope.link = response.link;
        //  $facebook.api(
        // "/me/permissions",
        //   function (response) {
        //     if (response && !response.error) {
        //       console.log(permissions);
        //     }
        //   }
        // );
        $scope.permissions = response.permissions.data;
        // $scope.first_permit = response.permissions.data[0].permission;
        // console.log($scope.first_permit);
      //   $facebook.api(
      //     "/me/posts",
      //     function (response) {
      //       if (response && !response.error) {
      //         console.log(response);
      //       }
      //     }
      // );
        $scope.posts = response.posts.data;
      },
      function(err){
        $scope.welcomeMsg = "Please log in";
      });
  }
      

   // var deferred = $q.defer();  
   //  function refresh(){
   //      $facebook.api('/me').then(function(response) {
   //        $scope.welcomeMsg = "Welcome " + response.name;
   //              deferred.resolve(response.name);
   //              //$scope.welcomeMsg = response;
   //              },
   //              function(error){
   //                            deferred.reject(error);
   //                    });
   //        return deferred.promise;  
     
   //  }

}]);