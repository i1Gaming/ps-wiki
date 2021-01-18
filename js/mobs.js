function sortByName(mobs) {
    mobs.sort(function(a, b) {
        if (a.nameRU > b.nameRU) {
            return 1;
        }
        if (a.nameRU < b.nameRU) {
            return -1;
        }
        return 0;
    })

    return mobs
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

function getRuLocation(locationName) {
    var locationRU = '';
    switch (locationName) {
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
            locationRU = 'Подножье Горды'
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
    return locationRU;
}

function getLifeCycle(day, night) {
    var curLifeCycleHTML = [];
    if (day) {
        curLifeCycleHTML.push(`<span class="mob__location-day" title="Днем"></span>`);
    };
    if (night) {
        curLifeCycleHTML.push(`<span class="mob__location-night" title="Ночью"></span>`);
    }

    return curLifeCycleHTML.join('');
}

function getAllHabitatsHTML(habitats) {
    var allHabitatsHTML = [];
    $.each(habitats, function(key, location) {
        var curLocationRU = getRuLocation(location.location);
        var curLifeCycleHTML = getLifeCycle(location.day, location.night);
        var locationHTML = `<div class="mob__location-detail">
        <span class="mob__location-name">${curLocationRU}</span>
        <span class="mob__location-coordinates">(<span class="font-weight-bold">${location.coordinates}</span>)</span>
        <span class="mob__location-life">
            ${curLifeCycleHTML}
        </span>
    </div>`;
        allHabitatsHTML.push(locationHTML);
    });
    return allHabitatsHTML.join('');
}

function getDrops(drop, dropInfo) {
    var allDrop = [];

    $.each(drop, function(key, dropItem) {
        var dropHTML = '';
        var dropNameRU = '';
        switch (dropItem.type) {
            case "other":
                dropNameRU = dropInfo.allOther.find(element => element.name == dropItem.name).nameRU
                break;
            case "armor":
                dropNameRU = `${dropInfo.allArmor.find(element => element.name == dropItem.name).nameRU} (${dropItem.slots} сл.)`
                break;
            case "bijouterie":
                dropNameRU = dropInfo.allBijouterie.find(element => element.name == dropItem.name).nameRU
                break;
            case "soul":
                dropNameRU = dropInfo.allSouls.find(element => element.name == dropItem.name).nameRU
                break;
            case "weapon":
                dropNameRU = `${dropInfo.allWeapon.find(element => element.name == dropItem.name).nameRU} (${dropItem.slots} сл.)`
                break;
            default:
                break;
        }

        dropHTML = `<div class="${dropItem.name}__drop mob__drop-item">
        <a data-toggle="modal" data-target="#${dropItem.name}">
        ${dropNameRU}, 
        </a>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="${dropItem.name}" tabindex="-1" aria-labelledby="${dropItem.name}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"></div>
        </div>`
        allDrop.push(dropHTML);
    });
    return allDrop.join('');
}

function renderMobs() {
    getData().then(function(data) {
        var allMobs = sortByName(data.allMobs);

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

renderMobs();