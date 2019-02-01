var tasks = {
    list: [
        {title: 'First Task', body:'Go shopping'},
        {title: 'Second Task', body:'Wash dishes'},
    ],
};

new Vue({
    el:'#app',
    data: () => tasks,
    methods: {
        addTask: () => {
            const title = document.getElementById('title').value;
            const body = document.getElementById('body').value;

            tasks.list.push({ title, body });
        },
        editTask: (task) => {
            const title = prompt("Enter new title of the task, leave blank if not changed") || task.title;
            const body = prompt("Enter new description of the task, leave blank if not changed") || task.title;

            tasks.list.forEach((el) => {
                if (el.title == task.title) {
                    el.title = title;
                    el.body = body;
                }
            });
        }
    },
    computed: {
        orderedTasks: () => {
            return tasks.list.sort((a,b) => {
                return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0);
            });
        }
    }
})
