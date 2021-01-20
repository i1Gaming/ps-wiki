function sortSouls(souls) {
    souls.sort(function(a, b) {
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
    $.each(mobLocationAll, function(key, location) {
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
                "class": "row soul__item js-mob",
                html: soulItem
            }).appendTo(".aqua-souls");
            break;
        case 'black':
            $('<div/>', {
                "class": "row soul__item js-mob",
                html: soulItem
            }).appendTo(".black-souls");
            break;
        case 'blue':
            $('<div/>', {
                "class": "row soul__item js-mob",
                html: soulItem
            }).appendTo(".blue-souls ");
            break;
        case 'green':
            $('<div/>', {
                "class": "row soul__item js-mob",
                html: soulItem
            }).appendTo(".green-souls");
            break;
        case 'purple':
            $('<div/>', {
                "class": "row soul__item js-mob",
                html: soulItem
            }).appendTo(".purple-souls");
            break;
        case 'red':
            $('<div/>', {
                "class": "row soul__item js-mob",
                html: soulItem
            }).appendTo(".red-souls");
            break;
        case 'yellow':
            $('<div/>', {
                "class": "row soul__item js-mob",
                html: soulItem
            }).appendTo(".yellow-souls");
            break;
        default:
            break;
    }
}

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
        <span class="mob__location-name ">${curLocationRU}</span>
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

        dropHTML =
            `<div class="${dropItem.name}__drop mob__drop-item">
            <span> ${dropNameRU}, </span>
        </div>`;

        allDrop.push(dropHTML);
    });
    return allDrop.join('');
}

function getDropData() {
    var allArmor, allBijouterie, allOther, allWeapon;
    var allData = {};
    return (
        $.getJSON("../js/armor.json", function(data) {
            allArmor = data.armor;
        }).then(
            $.getJSON("../js/other.json", function(data) {
                allOther = data.other;
            })
        ).then(
            $.getJSON("../js/bijouterie.json", function(data) {
                allBijouterie = data.bijouterie;
            })
        ).then(
            $.getJSON("../js/weapon.json", function(data) {
                allWeapon = data.weapon;
            })
        ).then(function() {
            allData = {
                allArmor,
                allBijouterie,
                allOther,
                allWeapon
            };
            return allData;
        }));
};

function getSouls() {
    $.getJSON("../js/souls.json", function(data) {
        var souls = sortSouls(data.souls);
        $.getJSON("../js/mobs.json", function(mobsData) {
            console.log(mobsData);
            var allMobs = mobsData.mobs;

            getDropData().then(function(data) {
                var dropData = data;
                dropData.allSouls = souls;

                $.each(souls, function(key, soul) {
                    var mobs = [];
                    var soulItem = '';

                    $.each(soul.drop, function(key, mobName) {
                        var curMob = allMobs.find(element => element.name == mobName);
                        var curMobHabitats = [];
                        $.each(curMob.habitat, function(key, location) {
                            curMobHabitats.push(location.location);
                        });
                        var badges = getSoulBadges(curMobHabitats);

                        var curMobHTML = `<div class='d-flex align-items-center mb-2 ${curMob.name}__drop' role="button">
                        <a class="text-secondary" data-toggle="modal" data-target="#${soul.name}_${curMob.name}">
                            ${curMob.nameRU} (${curMob.lvl} ур.)
                        </a> 
                        ${badges.join('')}
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="${soul.name}_${curMob.name}" tabindex="-1" aria-labelledby="${soul.name}_${curMob.name}Label" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <span class="modal-logo-title">Pandora Saga Legacy</span>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">X</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="modal-img__container col-5">
                                                <img class="modal-img" src="../img/mobs/${curMob.img}" alt="${curMob.nameRU}" srcset="">
                                            </div>
                                            <div class="info__container col-7">
                                                <div class="modal-name mob__title">
                                                    <span class="modal-title mob__name" id="${soul.name}_${curMob.name}ModalLabel">${curMob.nameRU}</span>
                                                    <span class="mob__lvl">${curMob.lvl} (ур.)</span>
                                                </div>
                                                <div class="mob__location">
                                                    <span class="mob__location-title">Место обитания:</span> ${getAllHabitatsHTML(curMob.habitat)}
                                                </div>
                                                <div class="mob__drop">
                                                    <div class="mob__drop-title">Добыча:</div>
                                                    <div class="mob__drop-easy-wrapper">
                                                        <div class="mob__drop-easy">Легкая: </div>
                                                        ${getDrops(curMob.drop.easy, dropData)}
                                                    </div>
                                                    <div class="mob__drop-medium-wrapper">
                                                        <div class="mob__drop-medium">Средняя: </div>
                                                        ${getDrops(curMob.drop.medium, dropData)}
                                                    </div>
                                                    <div class="mob__drop-hard-wrapper">
                                                        <div class="mob__drop-hard">Тяжелая: </div>
                                                        ${getDrops(curMob.drop.hard, dropData)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                        mobs.push(curMobHTML);
                    })

                    soulItem =
                        "<ul class = 'list-group list-group-horizontal w-100 text-center'>" +
                        "<li class ='list-group-item col-1 soul__img-container'>" +
                        "<img class='soul__img' src='../img/" + soul.img + "' alt='" + soul.color + "'>" +
                        "</li>" +
                        "<li class ='list-group-item soul__name col-2 js-mob__name' data-location='" + soul.color + "'>" + soul.nameRU + "</li>" +
                        "<li class ='list-group-item soul__part col-2'>" + soul.part + "</li>" +
                        "<li class ='list-group-item soul__effect col-4'>" + soul.effect + "</li>" +
                        "<li class ='list-group-item soul__mobs col-3'>" + mobs.join("") + "</li>" +
                        "</ul>";

                    renderSoul(soul.color, soulItem);
                });
            })
        });
    })
};

function searchByName() {
    var input = $("#mob-search");
    input.keyup(function() {
        var items = $(".js-mob");
        var inputValue = input.val();
        $.each(items, function(key, item) {
            if (item.getElementsByClassName("js-mob__name")[0].innerText.toLowerCase().includes(inputValue.toLowerCase())) {
                item.classList.remove("d-none");
            } else {
                item.classList.add("d-none");
            }
        })
    });
};

function filter(event) {

    var chosenLoc = [];
    $.each($(".js-loc-filter").find(".form-check-input"), function(key, value) {
        if (value.checked) {
            chosenLoc.push(value.id);
        }
    });

    var allMobs = $(".js-mob");


    $.each(allMobs, function(key, item) {
        var itemLocations = item.querySelectorAll('[data-location]');
        var allLocations = [];
        $.each(itemLocations, function(key, location) {
            allLocations.push(location.dataset.location);
        });

        console.log(allLocations);
        var showStatus = true;
        $.each(chosenLoc, function(key, curLoc) {
            if (!allLocations.includes(curLoc)) {
                showStatus = false;
            };
        });

        if (showStatus) {
            item.classList.remove("d-none");
        } else {
            item.classList.add("d-none");
        };
    });
}

getSouls();
searchByName();