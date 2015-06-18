function TaskTracker(){
    persistence.store.websql.config(persistence, 'MyDB10', 'description', 5 * 1024 * 1024);
    persistence.debug  = false;
    persistence.schemaSync();

    console.info('--------- SMTaskTracker ---------');
    console.info(' Para generar una nueva tarea en curso:');
    console.info(' SMTask.newTask(\'Nombre Tarea\')');
    console.info(' para finalizar una tarea se puede iniciar una nueva tarea o:');
    console.info(' ejecutar: SMTask.endTask()');
    console.info(' Para saber que tarea esta activa:');
    console.info(' SMTask.getActiveTask()');
    console.info(' Para saber el reporte de tareas: ');
    console.info(' SMTask.report()');
    console.info(' de una fecha puntual SMTask.report(\'25.12.2015\')');
}

TaskTracker.START = true;
TaskTracker.END = false;

TaskTracker.Task = persistence.define('Task', {
    name: "TEXT",
    date : "DATE",
    action: "BOOL"
});

TaskTracker.Task.prototype.save = function(){
    persistence.add(this);
    persistence.flush();
};

TaskTracker.prototype.newTask = function(title){
    this.endTask();
    // TODO FIX this with Promises or callbacks
    // http://nodejsreactions.tumblr.com/post/74184070281/throwing-a-few-settimeouts-at-the-problem
    // El timeout es asi el endTask Termina de persistir los cambios.
    setTimeout(function(){
        var task = new TaskTracker.Task();
        task.name = title;
        task.date = new Date();
        task.action = true;
        task.save();
    }, 1000);
};

TaskTracker.prototype.endTask = function(){
    TaskTracker.Task.all().order("date", false).limit(1).list(
        // Tomo la ultima Tarea
        function(results){
            if (results[0] && results[0].action == TaskTracker.START){
                var taskend = new TaskTracker.Task();
                taskend.name = results[0].name;
                taskend.date = new Date();
                taskend.action = TaskTracker.END;

                taskend.save();
                console.log('Tarea Finalizada')
            } else {
                console.log('No habia ninguna tarea anterior en curso');
            }
        }
    );
};

TaskTracker.prototype.getActiveTask = function(){
    TaskTracker.Task.all().order("date", false).limit(1).list(
        // Tomo la ultima Tarea Activa.
        function(results){
            if (results[0] && results[0].action == TaskTracker.START){
                console.log('Tarea Activa: ' + results[0].name);
            } else {
                console.log('No hay tarea en curso');
            }
        }
    );
};

TaskTracker.prototype.report = function(date){
    if (date){
        console.log('Reporte de la fecha: ' + new Date(date.replace(/(\d+)\.(\d+)\.(\d+)/,"$2/$1/$3")));
    } else {
        var from = new Date(new Date().setHours(0,0,0,0));
        var to = new Date(new Date().setHours(23,59,59,0));

        TaskTracker.Task.all().filter('date', '>', from).filter('date', '<', to).order('name').order('date').list(function(results){
            console.log('Reporte de hoy');

            times = [];

            results.forEach(function (task) {
                if (times[task.name] === undefined ){
                    times[task.name] = [];
                }
                times[task.name].push(task.date.getTime());
            });

            console.log('Tarea' + '|' + 'Tiempo' );
            Object.keys(times).forEach(function(key){
                var totalTime;
                if ( times[key].length % 2 == 0){
                    var taskTime = 0;
                    for( var i = 0; i <= times[key].length - 1; i = i + 2){
                        taskTime = taskTime + times[key][i+1] - times[key][i]
                    }
                    console.log(key + ' | ' + ( taskTime / 3600 / 1000 )   );
                } else  {
                    console.log(' ');
                    console.log('Tarea en curso: ' + key);
                }

            });
        });
    }
};

SMTask = new TaskTracker();