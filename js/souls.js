function getSouls() {
    $.getJSON("../js/souls.json", function (data) {
        var souls = data.souls;
        souls.sort(function(a,b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0; 
        })

        $.each(souls, function (key, soul) {
            var mobs = [];
            var soulItem = '';

            $.each(soul.drop, function (key, mob) {
                var curMob = "<a class='text-secondary' href='../pages/locations/" + mob.mobLocation + "/" + mob.mobLink + "'>" + mob.mobName + " (" + mob.mobLvl + " ур.) </a> <br>";
                mobs.push(curMob);
            })

            soulItem =
                "<ul class = 'list-group list-group-horizontal w-100 pb-1 text-center'>" +
                "<li class ='list-group-item col-1'>" +
                "<img src='../img/" + soul.img + "' alt='" + soul.color + "'>" +
                "</li>" +
                "<li class ='list-group-item col-2'>" + soul.name + "</li>" +
                "<li class ='list-group-item col-2'>" + soul.part + "</li>" +
                "<li class ='list-group-item col-4'>" + soul.effect + "</li>" +
                "<li class ='list-group-item col-3'>" + mobs.join("") + "</li>" +
                "</ul>";

            switch (soul.color) {
                case 'aqua':
                    $('<div/>', {
                        "class": "row",
                        html: soulItem
                    }).appendTo(".aqua-souls");
                    break;
                case 'black':
                    $('<div/>', {
                        "class": "row",
                        html: soulItem
                    }).appendTo(".black-souls");
                    break;
                case 'blue':
                    $('<div/>', {
                        "class": "row",
                        html: soulItem
                    }).appendTo(".blue-souls");
                    break;
                case 'green':
                    $('<div/>', {
                        "class": "row",
                        html: soulItem
                    }).appendTo(".green-souls");
                    break;
                case 'purple':
                    $('<div/>', {
                        "class": "row",
                        html: soulItem
                    }).appendTo(".purple-souls");
                    break;
                case 'red':
                    $('<div/>', {
                        "class": "row",
                        html: soulItem
                    }).appendTo(".red-souls");
                    break;
                case 'yellow':
                    $('<div/>', {
                        "class": "row",
                        html: soulItem
                    }).appendTo(".yellow-souls");
                    break;
                default:
                    break;
            }
        });
    })
};

getSouls();