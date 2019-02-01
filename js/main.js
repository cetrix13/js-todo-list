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
    watch: {
        list: () => {
            localStorage.setItem('list', JSON.stringify(tasks.list));
        },
        title: () => {
            localStorage.setItem('list', JSON.stringify(tasks.list));
        },
        body: () => {
            localStorage.setItem('list', JSON.stringify(tasks.list));
        },
    },
    methods: {
        addTask: () => {
            const title = document.getElementById('title').value;
            const body = document.getElementById('body').value;

            tasks.list.push({ title, body, isCompleted: false });
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
