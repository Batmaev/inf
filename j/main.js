/**
 * @param {string} what = "anime" | "plot" | "distr":
 * 
 * "anime" - чтобы запустить анимацию со сталкивающимися шариками
 * 
 * "plot"  - чтобы нарисовать график зависимости от времени усреднённой по времени энергии 
 *  
 * "distr" - чтобы нарисовать распределения по скоростям и энергиям
 */
function main(what) {
    const diameter = Number(document.forms['gen'].diameter.value);
    const Nparticles = Number(document.forms['gen'].Nparticles.value)
    const masses = new Array(Nparticles); 
    
    for (let i = 0; i < Nparticles; i++) {
        masses[i] = i % 2 ? 4 : 1;
    }
    
    /**
     * [number] - позиции частиц сразу после очередного столкновения,
     * 
     * причём в positions[Nparticles] и в positions[-1] лежат координаты стенок, которые не меняются.
     *///Просто так проще было писать функцию calculateCollisions в файле helpers, которая рассчитывает столкновения.
    const positions = new Array(Nparticles + 1);
     
    const totalLength = document.getElementById("anime").getBoundingClientRect().width;
    if (totalLength <= Nparticles * diameter) {
        alert("Шарики не помещаются. Попробуйте увеличить размер окна, уменьшить число шариков, уменьшить их диаметр или повернуть телефон горизонтально");
        return false;
    }

    /**
     * [number] - скорости частиц сразу после очередного столкновения,
     * 
     * причём velocities[Nparticles] = 0 = velocities[-1] - скорости стенок
     *///Просто так проще было писать функцию calculateCollisions в файле helpers, которая рассчитывает столкновения.
    const velocities = new Array(Nparticles + 1);
    const between = (totalLength + diameter) / (Nparticles + 1);

    /**
     * Сбрасывает начальные положения и скорости
     */
    function discharge() {
        for (let i = -1; i < positions.length; i++) {
            positions[i] = (i + 1) * between - diameter / 2;
        }
        for (let i = -1; i < velocities.length; i++) {
            velocities[i] = 0;
        }
        velocities[0] = Number(document.forms['gen'].v_1.value);
    }

    const mpvdn = {
        masses, positions, velocities, diameter, Nparticles
    }

    discharge();

    /**Время, когда последний шарик начнёт двигаться*/
    const t0 = gett0(mpvdn);

    discharge()

    if (what === "anime") {
        /**Время между кадрами */
        const dt = 1000 / Number(document.forms['animef'].playrate.value);
        const inversion_time = t0 * Number(document.forms['animef'].t_k_t.value);

        /**positionsHistory[frame][particle] :: number */
        let positionsHistory = prepareanimation(mpvdn, dt, inversion_time);
        let anime1 = anime(positionsHistory, masses, diameter, dt);

        //Плохо инвертировать скорости в момент столкновения, нужно чуть-чуть подождать
        const colls = createCollisions(mpvdn);
        const artif = Math.min(colls[findSoonestCollisions(colls)[0]] / 2, dt); //Дополнительное время
        for (let i = 0; i < Nparticles; i++) {
            positions[i] += velocities[i] * artif;
        }
        for (let i = 0; i < Nparticles; i++) {
            velocities[i] *= -1;
        }
        
        velocities[0] += Number(document.forms['animef'].v1_err.value);
        let positionsHistory2 = prepareanimation(mpvdn, dt, inversion_time + artif);

        anime1.then(a => {
            alert(`Сейчас скорости изменятся на противоположные. Средний модуль скорости ${mean(velocities)} пикс./мс`);
            anime(positionsHistory2, masses, diameter, dt);
        });

        function mean(velocities) {
            return velocities.reduce((a, b) => (Math.abs(a) + Math.abs(b))) / Nparticles;
        }
    }

    if (what === "plot") {
        const when_stop = t0 * Number(document.forms['ef'].stop.value);
        const deltaT = t0 * Number(document.forms['ef'].deltaT.value);

        const r = energy(mpvdn, when_stop, deltaT);

        const en_Obj = document.getElementById("energy");
        en_Obj.clear();
        const XYCL = [
            { X: r.t, Y: r.e1, color: "var(--m1-color)", lines: true },
            { X: r.t, Y: r.e2, color: "var(--m2-color)", lines: true }
        ];
        en_Obj.drawGraph(XYCL, 0, 0);
    }

    if(what === "distr"){

        //Я сначала думал не делать лишнее discharge после gett0, поэтому брал v0 повторно из формы, а не как velocities[0]
        const v0 =  Number(document.forms["gen"].v_1.value)
        const Nintervals = Number(document.forms["di"].Nintervals.value)

        let r = distributions(mpvdn, v0, Nintervals, t0, Number(document.forms["di"].Ndots.value))
        let th = theory(masses, v0, r.vx, r.ex)

        const vel_obj = document.getElementById("vel_dist")
        const XYCLv = [
            {X: r.vx, Y: th.v1, color: "var(--th-color)", lines: true},
            {X: r.vx, Y: th.v2, color: "var(--th-color)", lines: true},
            {X: r.vx, Y: r.v1, color: "var(--m1-color)", lines: true},
            {X: r.vx, Y: r.v2, color: "var(--m2-color)", lines: true},]
        vel_obj.clear()
        vel_obj.drawGraph(XYCLv, 0)

        const en_obj = document.getElementById("en_dist")
        const XYCLe = [
            {X: r.ex, Y: th.e, color: "var(--th-color)", lines: true},
            {X: r.ex, Y: r.e1, color: "var(--m1-color)", lines: true},
            {X: r.ex, Y: r.e2, color: "var(--m2-color)", lines: true},
        ]
        en_obj.clear()
        en_obj.drawGraph(XYCLe, 0, 0)
    }
}
