$(document).ready(function() {
    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
   // console.log(panels);
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute

        var dataFor = $(this).attr('data-for');

        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        console.log("button clicked " +idFor)
        idFor.slideToggle(400, function() {
            //Completed slidetoggle
            if(idFor.is(':visible'))
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        })
    });


    $('[data-toggle="tooltip"]').tooltip();

    $('button').click(function(e) {
        e.preventDefault();
        alert("This is a demo.\n :-)");
    });
});