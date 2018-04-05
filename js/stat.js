'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 30;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
// Рисую прямоугольное Облако
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// Сообщение о победе
var getMessage = function (ctx, color) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.fillText("Ура вы победили!", BAR_HEIGHT, CLOUD_Y + FONT_GAP);
  ctx.fillText("Список результатов:", BAR_HEIGHT, CLOUD_Y + GAP);
}
// Расположение имен
var getNames = function (ctx, names, color) {
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = color;
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - 10);
  }
}
// Цвета колонок гистограммы
var getBarColor = function (name) {
  if (name === "Вы") {
    return 'rgba(255, 0, 0, 1)';
  }
  var n = Math.random();
  return `rgba(0, 0, 204, ${n})`;
}
// Расчет пропоции и опредение высоты колонок гистограммы
var getBars = function (ctx, timesRatio, names) {
  for (var i = 0; i < timesRatio.length; i++) {
    ctx.fillStyle = getBarColor(names[i]);
    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, 240, BAR_WIDTH, -1 * BAR_HEIGHT * timesRatio[i]);
  }
}
// Получение времени для статистики
var getTime = function (ctx, times, timesRatio, color) {
  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = color;
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_HEIGHT * (1 - timesRatio[i]) + BAR_HEIGHT - 70);
  }
}
// Новый массив, полученный на основе пропорции и времени прохождения игры
var getTimeRatio = function (times) {
  var maxTime = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return times.map(function (time) {
    return time/maxTime;
  });
}
// Функция статистики создает облако, тень, сообщение, имена, считает пропоцию и создает колонки гистограммы
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  getMessage(ctx, '#000');
  getNames(ctx, names, '#000');
  var timesRatio = getTimeRatio(times);
  getBars(ctx, timesRatio, names);
  getTime(ctx, times, timesRatio, '#000');
};

// Облако


// В новом файле js/stat.js определите функцию renderStatistics, которая будет являться методом объекта window, со следующими параметрами:
//
// ctx — канвас на котором рисуется игра.
//
// names — массив, с именами игроков прошедших уровень. Имя самого игрока — Вы. Массив имён формируется случайным образом.
//
// times — массив, по длине совпадающий с массивом names. Массив содержит время прохождения уровня соответствующего игрока из массива names. Время прохождения уровня задано в миллисекундах.
//
// Эта функция будет вызываться каждый раз когда игрок проходит уровень. Чтобы успешно пройти уровень, надо выстрелить фаерболом (клавиша Shift) в забор.
//
// При вызове этой функции на канвас ctx должны быть выведены следующие элементы:
//
// Белое облако с координатами [100, 10] высотой 270px и шириной 420px. Облако может быть как правильным многоугольником, нарисованным методом fillRect, так и неправильным нарисованным с помощью методов beginPath, moveTo, closePath, fill и других.
//
// Под облаком должна располагаться тень: многоугольник такой же формы, залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный), смещённый относительно белого на 10px вниз и вправо.
//
// На облаке должен быть отрисован текст сообщения ’Ура вы победили!\nСписок результатов:’ с помощью метода fillText. Текст должен быть набран шрифтом PT Mono размером 16px. NB! Особенностью отрисовки текста на канвасе является то, что он не поддерживает перенос, поэтому каждая новая строчка должна быть отрисована новым вызовом метода fillText или strokeText.
//
// После сообщения о победе должна располагаться гистограмма времён участников. Параметры гистограммы следующие:
//
// Высота гистограммы 150px.
//
// Ширина колонки 40px.
//
// Расстояние между колонками 50px.
//
// Цвет колонки игрока Вы rgba(255, 0, 0, 1).
//
// Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.
