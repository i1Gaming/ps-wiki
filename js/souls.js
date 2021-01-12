function getSouls() {
    $.getJSON("../js/souls.json", function (data) {
        var souls = data.souls;
        var soulsHTML = [];
        $.each(souls, function (key, soul) {
            var mobs = [];

            $.each(soul.drop, function(key, mob){         
                var curMob = "<a class='text-secondary' href='../pages/locations/" + mob.mobLocation + "/" + mob.mobLink +"'>"+ mob.mobName + " (" + mob.mobLvl + " ур.) </a> <br>";
                mobs.push(curMob);
            })

            soulsHTML.push(
                "<ul class = 'list-group list-group-horizontal w-100 pb-1 text-center'>"+
                    "<li class ='list-group-item col-1'>"+
                        "<img src='../img/" + soul.img + "' alt='" + soul.color + "'>"+
                    "</li>"+ 
                    "<li class ='list-group-item col-2'>"+soul.name+"</li>"+
                    "<li class ='list-group-item col-2'>"+soul.part+"</li>"+
                    "<li class ='list-group-item col-4'>"+soul.effect+"</li>"+
                    "<li class ='list-group-item col-3'>"+ mobs.join("") +"</li>"+
                "</ul>"
            );
        });

        $('<div/>', {
            "class": "row",
            html: soulsHTML.join("")
        }).appendTo(".helmet-souls");
    })
};

getSouls();