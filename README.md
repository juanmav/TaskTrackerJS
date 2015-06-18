# TaskTrackerJs developed with TDD methodology

## Comandos

### Para generar una nueva tarea en curso:

(Si se inicia una nueva tarea se termina la que esta en curso)

```javascript
SMTask.newTask(\'Nombre Tarea\')
```

### para finalizar una tarea:

```javascript
SMTask.endTask()
```
### Para saber que tarea esta activa:

```javascript
SMTask.getActiveTask()
```

### Para saber el reporte de tareas:

```javascript
SMTask.report()
```

### de una fecha puntual

```javascript
SMTask.report(\'25.12.2015\')
```