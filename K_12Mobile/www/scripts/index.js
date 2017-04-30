// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        // ons.notification.alert('Ready');
      //  ons.disableDeviceBackButtonHandler();
        document.addEventListener("backbutton", onBackKeyDown, false);
        ons.disableDeviceBackButtonHandler();
        //ons.enableDeviceBackButtonHandler();
        // Set a new handler
        ons.setDefaultDeviceBackButtonListener(function (e) { });




    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function onBackKeyDown(e) {
     
      //  e.preventDefault();
        if (studentNavigator.topPage.name == "HomePage")
        {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            ons.notification.confirm({
                message: 'Are you sure you want to close?',
                title: 'Close app',
                buttonLabels: ['Yes', 'No'],
                callback: function (idx) {
                    switch (idx) {
                        case 0:
                          
                            try {
                                if (navigator.app) {
                                    navigator.app.exitApp();
                                } else if (navigator.device) {
                                    navigator.device.exitApp();
                                }
                            }
                            catch (err) {
                            }
                            break;
                        case 1:
                           
                            break;
                    }
                }
            });
        }
        else
        {
            //console.log("myfafdsa");
            angular.element(document).injector().get('$state').go("^");

        }
     
       
       // if(state.go().)
        //navigator.app.exitApp();
        return false;
    }


} )();