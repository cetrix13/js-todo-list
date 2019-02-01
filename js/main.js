let tasks = {
    list: [
        {title: 'Einkaufen', body:'Ich muss heute einkaufen gehen', isCompleted: false},
        {title: 'Ausraümen', body:'Ich muss morgen Geschirr spülen', isCompleted: false},
    ],
};

new Vue({
    el:'#app',
    data: () => {
        return (localStorage.list)
            ? tasks = { list: JSON.parse(localStorage.getItem('list')) }
            : tasks;
    },
    updated: () => {
         localStorage.setItem('list', JSON.stringify(tasks.list));
    },
    methods: {
        addTask: () => {
            const title = document.getElementById('title');
            const body = document.getElementById('body');

            tasks.list.push({ title: title.value, body: body.value, isCompleted: false });
            title.value = '';
            body.value = '';
        },
        editTask: (task) => {
            const title = prompt('Enter new title of the task, leave blank if not changed') || task.title;
            const body = prompt('Enter new description of the task, leave blank if not changed') || task.body;

            tasks.list.forEach((el) => {
                if (el.title == task.title) {
                    el.title = title;
                    el.body = body;
                }
            });
        },
        deleteTask: (index) => {
            tasks.list.splice(index, 1);
        },
        completeTask: (task) => {
            task.isCompleted = ! task.isCompleted;
            localStorage.setItem('list', JSON.stringify(tasks.list));
        },
    },
    computed: {
        orderedTasks: () => {
            return tasks.list.sort((a,b) => {
                return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0);
            });
        },
    },

});
