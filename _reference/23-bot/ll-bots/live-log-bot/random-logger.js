function randomElement(array){
    let randomInt = Math.floor(Math.random() * array.length);
    return array[randomInt]
}

module.exports = ()=>{
    const loggerImages = [
        "https://www.evergreenmagazine.com/static/e51ccc52144bb51f88aa89adfbefb827/logger-750x330.jpg",
        "https://previews.123rf.com/images/tverdohlib/tverdohlib1806/tverdohlib180600063/102278619-elegant-man-in-suit-logger-with-beard.jpg",
        "https://thumbs.dreamstime.com/b/one-handsome-strong-stylish-male-logger-young-man-long-lush-black-beard-moustache-shirt-holding-wooden-axe-standing-130226105.jpg",
        "https://i.pinimg.com/564x/88/a4/31/88a431b8b6d2c443b4ceeaabcd55fe71.jpg",
        "https://i.pinimg.com/564x/a0/2b/b6/a02bb6679813ca595d1bd28a7b507963.jpg",
        "https://i.pinimg.com/750x/f0/35/e8/f035e8327abb9020c3d135303e83c834.jpg",
        "https://i.pinimg.com/564x/bb/6b/49/bb6b49dacd7b715e965196ba7bc784ec.jpg",
        "https://i.pinimg.com/564x/88/a4/31/88a431b8b6d2c443b4ceeaabcd55fe71.jpg",
        "https://www.evergreenmagazine.com/static/e51ccc52144bb51f88aa89adfbefb827/logger-750x330.jpg",
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/logger-cutting-tree-trunk-cameroon-cyril-ruoso.jpg",
        "https://media.istockphoto.com/photos/lumberjack-picture-id617762388?k=20&m=617762388&s=612x612&w=0&h=aZ5yY0tIJrj5HAqbQa-GI7WmMnEl34x0OPsLQzhQ4zw=",
        "https://i.pinimg.com/564x/67/75/e5/6775e5641264c98a114d6852a162b7c5.jpg",
        "https://i.pinimg.com/564x/ce/86/60/ce8660e8b0bdc95ae40f14145307986c.jpg",
        "https://i.pinimg.com/564x/db/d2/34/dbd2340c09f89237881e73ea6ae87b2e.jpg"
    ];
    return randomElement(loggerImages);
}