Моделирование одноатомного газа
======
Здесь есть шарики массы _m_ и _4m_. Они расположены вперемешку в узком желобе с жёсткими стенками. 

Они двигаются без трения и абсолютно упруго сталкиваются со стенками и между собой.

Это домашнее задание по предмету "Компьютерные технологии" в университете.

Что было сделано:
------
1. Анимация с шариками

2. В заданный момент все скорости шариков меняются на противоположные, и можно пронаблюдать, как всё возвращается в исходное состояние. Так можно проверить корректность модели.

3. График усреднённой по времени энергии для одного из тяжелых и одного из лёгких шариков. В соответствии с распределением Маквселла-Больцмана, распределение частиц по энергиям не зависит от массы, поэтому получаются две горизонтальные линии на одинаковой высоте.

4. Плотность распределения скоростей и энергии шариков разной массы.

Теория
---
Распределение Максвелла-Больцмана в одномерном случае:

`P([v, v+dv]) = sqrt(m / 2 pi kT) * exp(-mv^2/2 / kT) dv` (1)

Получим из этого распределение по энергиям:

`m v^2 / 2 = E`

`v = sqrt(2E/m)`

`dv = 1 / sqrt(2 E m) dE`

Если подставить это в (1), то массы сократятся:

`1/(2 sqrt(pi kT)) * 1/sqrt(E) * exp(-E/kT) dE`

Но каждому значению энергии соответствуют два значения скорости: положительное и отрицательное. Поэтому, чтобы получить плотность распределения, нужно умножить это выражение на два: 

`P([E, E+dE]) = 1/sqrt(pi kT) * 1/sqrt(E) * exp(-E/kT) dE`

Алгоритм
----
Когда _n_ шариков находятся на одной линии, есть _n + 1_ возможное столкновение шарика с шариком и шарика со стенкой. 

На каждом шаге программа вычисляет ближайшее столкновение. Для этого достаточно разделить растояние между каждой парой шариков на разность их скоростей, и выбрать наименьшее.

Вычислив время до ближайшего столкновения, алгоритм считает, на какое расстояние сместится каждый шарик и как изменятся скорости столкнувшихся шариков.

И всё. Этого достаточно, чтобы начать считать следующее столкновение, и так далее.