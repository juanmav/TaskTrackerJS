# TaskTrackerJs a console time tracker developed with Javascript.

This time tracker is supposed to be used in the browser dev console. Helping to track yours daily tasks.

Why to use it ? Because, in my case, my daily basis is to use some issue tracker like redmine, trac, mantis but the problem with this is you need to remember the issues numbers ( I have a very bad memory with random numbers) and sometimes you need a fast switch to another task. So you can just ´TaskTracker.newTask('a fast switch!!!')´ and in the end of the day a simple ´TaskTracker.report()´ and update the issues in your favorite issue tracker.
## Commands

**To create a new Task.**

`If a task is already running this will be finished before start the new one, this is automatly.`

```javascript
TaskTracker.newTask(\'Nombre Tarea\')
```

**To finish a task**

```javascript
TaskTracker.endTask()
```
**To know wich task is active.**

```javascript
TaskTracker.getActiveTask()
```

**To get the report of the day:**

```javascript
TaskTracker.report()
```

**To get the report of a selected date:**

```javascript
TaskTracker.report(\'25.12.2015\')
```

`The date format is dd.MM.yyyy` (Yes day.month.year)