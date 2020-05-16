//функция поиска элемента в массиве
export const isInArray = (idHobby, array) => {
    if (array === undefined || array.length === 0) {
        return false;
    }
    if (array.includes(idHobby)) {
        return true;
    } else {
        return false;
    }
};
//функция выбора хобби по данное категории
const categoriesConcrete = ['creativity', 'art', 'dance', 'sport', 'music', 'sport_wrestling', 'sport_water', 'sport_winter', 'sport_game'];
export const sortByCategory = (hobbies, category) => {
    let new_hobbies = [];
    if (category !== 'other') {
        new_hobbies = hobbies.filter(item => item.category === category);
        return new_hobbies;
    }

    new_hobbies = hobbies.filter(item => !categoriesConcrete.includes(item.category));
    return new_hobbies;
};
//функция подсчета хобби по данной категории
export const countHobbyIn = (hobbies) => {
    let dict = {};
    categoriesConcrete.forEach(function (item) {
        dict[item] = 0;
    });
    dict['other'] = 0;
    hobbies.forEach(function (item) {
        if (!categoriesConcrete.includes(item.category) || item.category === 'other') {
            dict['other'] += 1;
        } else {
            dict[item.category] += 1;
        }

    });
    return dict;
};
/*Фильтрация по типу монетизации*/
export const sortByTypeMonitization = (hobbies, type) => {
    let filtered = [];
    hobbies.forEach(function (hobby) {
        hobby.monetization.forEach(function (item) {
            if (item.tariff === type) {
                filtered.push(hobby);
            }
        });
    });
    return filtered;
};

export const DayToString = (day) => {
    const mod = day % 10;
    if (mod === 1) {
        return 'день';
    } else if (mod === 2 || mod === 3 || mod === 4) {
        return 'дня';
    } else {
        return 'дней';
    }
};


