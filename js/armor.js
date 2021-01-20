function sortByLvl(armor) {
    mobs.sort(function(a, b) {
        if (a.lvl > b.lvl) {
            return 1;
        }
        if (a.lvl < b.lvl) {
            return -1;
        }
        return 0;
    })

    return armor
};

function getData() {
    var allMobs, allArmor, allBijouterie, allOther, allSouls, allWeapon;
    var allData = {};
    return ($.getJSON("../js/mobs.json", function(data) {
        allMobs = data.mobs;
    }).then(
        $.getJSON("../js/armor.json", function(data) {
            allArmor = data.armor;
        })
    ).then(
        $.getJSON("../js/other.json", function(data) {
            allOther = data.other;
        })
    ).then(
        $.getJSON("../js/bijouterie.json", function(data) {
            allBijouterie = data.bijouterie;
        })
    ).then(
        $.getJSON("../js/souls.json", function(data) {
            allSouls = data.souls;
        })
    ).then(
        $.getJSON("../js/weapon.json", function(data) {
            allWeapon = data.weapon;
        })
    ).then(function() {
        allData = {
            allMobs,
            allArmor,
            allBijouterie,
            allOther,
            allSouls,
            allWeapon
        };
        return allData;
    }));
};

function renderArmor() {
    getData().then(function(data) {
        var allArmor = sortByLvl(data.allArmor);

        $.each(allMobs, function(key, mob) {

            var mobCartHTML = `<div class="mob">
            <div class="mob__img-container">
                <img class="mob__img" src="../img/mobs/${mob.img}" alt="${mob.nameRU}" srcset="">
            </div>
            <div class="mob__title">
                <div class="mob__name">${mob.nameRU}</div>
                <div class="mob__lvl">(${mob.lvl} Ур.)</div>
            </div>
            <div class="mob__location">
                <span class="mob__location-title">Место обитания:</span>
                ${getAllHabitatsHTML(mob.habitat)}
            </div>
            <div class="mob__drop">
                <div class="mob__drop-title">Добыча:</div>
                <div class="mob__drop-easy-wrapper">
                    <div class="mob__drop-easy">Легкая: </div>
                    ${getDrops(mob.drop.easy, data)}
                </div>
                <div class="mob__drop-medium-wrapper">
                    <div class="mob__drop-medium">Средняя: </div>
                    ${getDrops(mob.drop.medium, data)}
                </div>
                <div class="mob__drop-hard-wrapper">
                    <div class="mob__drop-hard">Тяжелая: </div>
                    ${getDrops(mob.drop.hard, data)}
                </div>
            </div>
            </div>`;

            $('<div/>', {
                "class": "col-12 col-sm-6 col-md-4 col-lg-3 my-2",
                html: mobCartHTML
            }).appendTo(".mobs-container");
        });
    });
};

renderArmor();