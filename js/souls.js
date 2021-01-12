function sortSouls(souls) {
    souls.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    })

    return souls
};

function getSoulBadges(mobLocationAll) {
    var badges = [];
    $.each(mobLocationAll, function (key, location) {
        var locationRU = '';
        switch (location) {
            case 'muldian':
                locationRU = 'Мальдия'
                break;
            case 'el-bed':
                locationRU = 'Эль Ведд'
                break;
            case 'east-road':
                locationRU = 'Восточная дорога ветров'
                break;
            case 'north-road':
                locationRU = 'Северная дорога ветров'
                break;
            case 'west-road':
                locationRU = 'Западная дорога ветров'
                break;
            case 'gorda':
                locationRU = 'Горда'
                break;
            case 'nelstadt':
                locationRU = 'Долина Нельштадт'
                break;
            case 'himurartu':
                locationRU = 'Пустыня Химурарту'
                break;
            case 'gorge':
                locationRU = 'Лейбгольские Теснины'
                break;
            case 'montori':
                locationRU = 'Долина Монтори'
                break;
            case 'tambrin':
                locationRU = 'Север великой Тамбринской Пустыни'
                break;
            default:
                break;
        }
        var locationHTML = "<div class='bg-" + location + " badges' title='" + locationRU + "'></div>"

        badges.push(locationHTML)
    })

    return badges;
};

function renderSoul(color, soulItem) {
    switch (color) {
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
}

function getSouls() {
    $.getJSON("../js/souls.json", function (data) {
        var souls = sortSouls(data.souls);

        $.each(souls, function (key, soul) {
            var mobs = [];
            var soulItem = '';

            $.each(soul.drop, function (key, mob) {
                var badges = getSoulBadges(mob.mobLocationAll);

                var curMob = "<div class='d-flex align-items-center mb-2'><a class='text-secondary' href='../pages/locations/" + mob.mobLocationMain + "/" + mob.mobLink + "'>" + mob.mobName + " (" + mob.mobLvl + " ур.) </a>" + badges.join("") + "</div>";
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

            renderSoul(soul.color, soulItem);
        });
    })
};

getSouls();