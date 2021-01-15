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
                var curMob = `<div class='d-flex align-items-center mb-2' role="button"><a class="text-secondary" data-toggle="modal" data-target="#staticBackdrop">
                ${mob.mobName} - ${mob.mobLvl} ур.
              </a> 
              ${badges.join('')}</div>
              <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="card mb-3 h-100">
      <div class="row no-gutters">
          <div class="col-md-12 p-1">
              <img src="../img/mobs/snake6.PNG" class="card-img" alt="Гремучая змея">
          </div>
          <div class="col-12">
              <div class="card-body p-1">
                  <h5 class="card-title text-center">Гремучая змея</h5>
                  <ul class="list-group list-group-vertical-sm mb-1">
                      <li class="list-group-item text-center">
                          <h6>Место обитания</h6>
                      </li>
                      <li class="list-group-item">
                          <div class="text-gorge"> Северная дорога - I, J-12,13</div>
                          <div class="text-tambrin">Восточная дорога</div>
                          <div class="text-montori">Западная дорога</div>
                      </li>
                  </ul>
                  <ul class="list-group list-group-vertical-sm mb-1">
                      <li class="list-group-item text-center">
                          <h6>Время обитания</h6>
                      </li>
                      <li class="list-group-item">
                          <div class="">День</div>
                          <div class="">Ночь</div>
                      </li>
                  </ul>
                  <ul class="list-group list-group-vertical-sm mb-1">
                      <li class="list-group-item text-center">
                          <h6>Добыча</h6>
                      </li>
                      <li class="list-group-item">
                          <div>
                              <span class="text-hight">Высокий:</span>
                              <span> Желчь, </span>
                              <span> Клык, </span>
                              <span> Бивень, </span>
                              <span> Большая кость </span>
                          </div>
                          <div>
                              <span class="text-medium">Средний:</span>
                              <span> Желчь, </span>
                              <span> Клык, </span>
                              <span> Бивень, </span>
                              <span> Большая кость </span>
                          </div>
                          <div>
                              <span class="text-low">Низкий:</span>
                              <span> Желчь, </span>
                              <span> Клык, </span>
                              <span> Бивень, </span>
                              <span> Большая кость </span>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>`
                /* var curMob = "<div class='d-flex align-items-center mb-2'><a class='text-secondary' href='../pages/locations/" + mob.mobLocationMain + "/" + mob.mobLink + "'>" + mob.mobName + " (" + mob.mobLvl + " ур.) </a>" + badges.join("") + "</div>"; */
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