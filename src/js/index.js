import $ from "jquery";

var modalWindow = document.getElementById("modalWindow"); //access to DOM element
var textConfirm = document.getElementById("textConfirm"); //get text span with ajax success
var animation = document.getElementById("animAccess"); //access to modalWindow element which will be animated
var closeBtn = document.getElementById("closeConfirm"); //access to DOM element to close modal window
var timeAnim = 1000; // time to synchronize the animation time and delete the animation class

$( () => {
    
  //On Scroll Functionality
  $(window).scroll( () => {
      var windowTop = $(window).scrollTop();
      windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
      windowTop > 100 ? $('ul').css('top','100px') : $('ul').css('top','160px');
  });
  
  //Click Logo To Scroll To Top
  $('#logo').on('click', () => {
      $('html,body').animate({
          scrollTop: 0
      },500);
  });
  
  //Smooth Scrolling Using Navigation Menu
  $('a[href*="#"]').on('click', function(e){
      $('html,body').animate({
          scrollTop: $($(this).attr('href')).offset().top - 100
      },500);
      e.preventDefault();
  });
  
  //Toggle Menu
  $('#menu-toggle').on('click', () => {
      $('#menu-toggle').toggleClass('closeMenu');
      $('ul').toggleClass('showMenu');
      
      $('li').on('click', () => {
          $('ul').removeClass('showMenu');
          $('#menu-toggle').removeClass('closeMenu');
      });
  });

   
    //Contact form ajax
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    $('#contactForm').submit(function(e) {
        e.preventDefault();
        var c_name = $('#forName').val();
        var c_email = $('#forEmail').val();
        var c_message = $('#forMessage ').val();
        var response = $('#contactForm .ajax-response');
        var formData = {
            'name'       : c_name,
            'email'      : c_email,
            'message'    : c_message
        };
        if (( c_name== '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
            response.fadeIn(500);
            response.html("Please fix the errors and try again.");
        }
        else {
            $.ajax({
                type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : '../php/contact.php', // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                encode      : true,
                success		: function(res){

                    $('#forName').val(""); //clear inputs fields
                    $('#forEmail').val("");
                    $('#forMessage ').val("");
                    var ret = $.parseJSON(JSON.stringify(res));

                    modalWindow.style.display = "flex"; //make modalWindow visible
                    animation.classList.add("zoomIn"); // add class from animation framework
                    var time = setInterval(function () { // make asynchronous removal of the animation framework class and stop animation
                        clearInterval(time);
                        animation.classList.remove("zoomIn");
                    },1000);
                    textConfirm.innerHTML = ret.message;

                }
            });
        }
        return false;
    });
});

closeBtn.onclick = function(){ //close modal window
    animation.classList.add("zoomOut");//with animation
    var time = setInterval(function () {
        modalWindow.style.display = "none";
        clearInterval(time);
        animation.classList.remove("zoomOut");
    },1000);
};

window.onclick = function (event) { //close modal window by click on outer space of modal window
    if(event.target === modalWindow){
        animation.classList.add("zoomOut");
        var time = setInterval(function () {
            modalWindow.style.display = "none";
            clearInterval(time);
            animation.classList.remove("zoomOut");
        },1000);
    }
};