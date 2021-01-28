function sortByLvl(mobs) {
    mobs.sort(function(a, b) {
        if (a.lvl > b.lvl) {
            return 1;
        }
        if (a.lvl < b.lvl) {
            return -1;
        }
        return 0;
    })

    return mobs
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

function getAllHabitatsHTML(habitats) {
    var allHabitatsHTML = [];
    $.each(habitats, function(key, location) {
        var curLocationRU = getRuLocation(location.location);
        var curLifeCycleHTML = getLifeCycle(location.day, location.night);
        var locationHTML = `<div class="mob__location-detail">
        <span class="mob__location-name" data-location="${location.location}">${curLocationRU}</span>
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
        ${getModal(dropItem, dropInfo)}`;

        allDrop.push(dropHTML);
    });
    return allDrop.join('');
}

function getImgPath(item, itemType) {
    var path = '';
    switch (itemType) {
        case 'soul':
            path = `${item.img}`
            break;
        default:
            path = `${itemType}/${item.name}.PNG`
            break;
    }
    return path;
}

function getAllMobsNames(dropList, allMobs) {
    var allMobsHTML = [];
    $.each(dropList, function(key, drop) {
        var err = allMobs.find(element => element.name == drop.name)
        if (!err) {
            debugger
        };

        var curMobHTML = '';
        curMobName = allMobs.find(element => element.name == drop.name).nameRU;
        curMobHTML = `<div class="${drop}__drop d-block">
        <span> ${curMobName}, </span>
    </div>`;
        allMobsHTML.push(curMobHTML);
    });

    return allMobsHTML.join('');
}

function getSoulEffect(soul) {
    return (
        `<div class="text-center">${soul.effect}</div>`
    );
}

function getModal(dropItem, dropInfo) {
    var item;

    switch (dropItem.type) {
        case "other":
            item = dropInfo.allOther.find(element => element.name == dropItem.name);
            break;
        case "armor":
            item = dropInfo.allArmor.find(element => element.name == dropItem.name);
            break;
        case "bijouterie":
            item = dropInfo.allBijouterie.find(element => element.name == dropItem.name);
            break;
        case "soul":
            item = dropInfo.allSouls.find(element => element.name == dropItem.name);
            break;
        case "weapon":
            item = dropInfo.allWeapon.find(element => element.name == dropItem.name);
            break;
        default:
            break;
    }

    var modalHTML = `<!-- Modal -->
    <div class="modal fade" id="${item.name}" tabindex="-1" aria-labelledby="${item.name}Label" aria-hidden="true">
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
                            <img class="modal-img" src="../img/${getImgPath(item, dropItem.type)}" alt="" srcset="">
                        </div>
                        <div class="info__container col-7">
                            <div class="modal-name mob__title">
                                <span class="modal-title mob__name" id="${item.name}ModalLabel">${item.nameRU}</span>
                            </div>
                            ${dropItem.type == "soul" ? getSoulEffect(item) : ''}
                            <div class="mob__location d-flex align-items-center flex-column">
                                <span class="mob__location-title">С кого добывается: </span> ${getAllMobsNames(item.drop, dropInfo.allMobs)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->`;
    return modalHTML;
}

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

function renderMobs() {
    getData().then(function(data) {
        var allMobs = sortByLvl(data.allMobs);

        $.each(allMobs, function(key, mob) {

            var mobCartHTML = `<div class="mob">
            <div class="mob__img-container">
                <img class="mob__img" src="../img/mobs/${mob.img}" alt="${mob.nameRU}" srcset="">
            </div>
            <div class="mob__title">
                <div class="mob__name js-mob__name">${mob.nameRU}</div>
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
                "class": "col-12 col-sm-6 col-md-4 col-lg-3 my-2 js-mob",
                html: mobCartHTML
            }).appendTo(".mobs-container");
        });
    });
};

renderMobs();
searchByName();