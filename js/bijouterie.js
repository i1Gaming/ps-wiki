function sortByLvl(armor) {
    armor.sort(function(a, b) {
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

function getSoulBadges(mobLocationAll) {
    var badges = [];
    $.each(mobLocationAll, function(key, location) {
        var locationRU = getRuLocation(location);

        var locationHTML = "<div class='bg-" + location + " badges' title='" + locationRU + "'></div>"

        badges.push(locationHTML)
    })

    return badges;
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
        case 'roscha':
            locationRU = 'Забытая роща'
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
        case 'astir':
            locationRU = 'Астир'
            break;
        case 'kingdom':
            locationRU = 'Королевство Сэнт-Фальстайн'
            break;
        case 'empire':
            locationRU = 'Лотарская империя'
            break;
        case 'union':
            locationRU = 'Союз северных племен Ванриг'
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

function getSlots(slots) {
    if (slots) {
        return `(${slots} сл.)`;
    } else {
        return ``;
    }
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
                dropNameRU = `${dropInfo.allBijouterie.find(element => element.name == dropItem.name).nameRU} ${getSlots(dropItem.slots)}`
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

function getModal(armor, curMob, dropData) {

    var modal = `<!-- Modal -->
    <div class="modal fade" id="${armor.name}_${curMob.name}" tabindex="-1" aria-labelledby="${armor.name}_${curMob.name}Label" aria-hidden="true">
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
                                <span class="modal-title mob__name" id="${armor.name}_${curMob.name}ModalLabel">${curMob.nameRU}</span>
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
    </div>`;

    return modal;
}

function getDrop(armor, data) {
    var mobs = [];
    $.each(armor.drop, function(key, mobName) {
        var curMob = data.allMobs.find(element => element.name == mobName.name);
        var curMobHabitats = [];
        $.each(curMob.habitat, function(key, location) {
            curMobHabitats.push(location.location);
        });
        var badges = getSoulBadges(curMobHabitats);
        var curMobHTML = `<div class='d-flex align-items-center mb-2 ${curMob.name}__drop' role="button">
        <a class="text-secondary" data-toggle="modal" data-target="#${armor.name}_${curMob.name}">
            ${curMob.nameRU} (${curMob.lvl} ур.) ${getSlots(mobName.slot)}
        </a> 
        ${badges.join('')}
        </div>
        ${getModal(armor, curMob, data)}
        `
        mobs.push(curMobHTML);
    })

    return mobs.join('');
}

function filter() {

    var chosenArmor = [];
    $.each($(".js-loc-filter").find(".form-check-input"), function(key, value) {
        if (value.checked) {
            chosenArmor.push(value.id);
        }
    });

    var allArmors = $(".js-armor");


    $.each(allArmors, function(key, item) {
        var itemLocations = item.querySelectorAll('[data-location]');
        var allLocations = [];
        $.each(itemLocations, function(key, location) {
            allLocations.push(location.dataset.location);
        });
        console.log(allLocations);
        var showStatus = true;
        $.each(chosenArmor, function(key, curLoc) {
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

function searchByName() {
    var input = $("#mob-search");
    input.keyup(function() {
        var items = $(".js-armor");
        var inputValue = input.val();
        $.each(items, function(key, item) {
            if (item.getElementsByClassName("js-armor__name")[0].innerText.toLowerCase().includes(inputValue.toLowerCase())) {
                item.classList.remove("d-none");
            } else {
                item.classList.add("d-none");
            }
        })
    });
};

function renderArmor() {
    getData().then(function(data) {
        var allArmor = sortByLvl(data.allBijouterie);

        $.each(allArmor, function(key, armor) {

            var mobCartHTML = `<div class="mob">
            <div class="mob__title">
                <div class="mob__name js-armor__name" data-location="${armor.type}">${armor.nameRU}</div>
            </div>
            <div class="mob__img-container">
                <img class="mob__img" src="../img/bijouterie/${armor.name}.PNG" alt="${armor.nameRU}" srcset="" data-toggle="modal" data-target="#${armor.name}" style="cursor:pointer">
                <div id="${armor.name}" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="${armor.name}Label" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered img-pop-up">
                        <div class="modal-content">
                            <div class="modal-body d-flex justify-content-center">
                                <img src="../img/bijouterie/${armor.name}.PNG" class="w-100">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mob__location">
                <span class="mob__location-title">С кого добывается:</span>
                ${getDrop(armor, data)}
            </div>
            </div>`;

            $('<div/>', {
                "class": "col-12 col-md-6 col-lg-4 my-2 js-armor",
                html: mobCartHTML
            }).appendTo(`.${armor.type}-bijouterie`);
        });
    });
};


renderArmor();
searchByName();