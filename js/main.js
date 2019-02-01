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
