let list = [
    {title: 'Einkaufen', body:'Ich muss heute einkaufen gehen', isCompleted: false},
    {title: 'Ausräumen', body:'Ich muss morgen Geschirr spülen', isCompleted: false},
    {title: 'Studieren', body:'Ich muss ein Buch lesen', isCompleted: false},
];

if (!window.localStorage.list) {
    window.localStorage.setItem('list', JSON.stringify(list));
}

new Vue({
    el:'#app',
    data: {
        list: JSON.parse(window.localStorage.getItem('list')),
        title: '',
        body: '',
    },
    watch: {
        list: {
            handler: function() {
                window.localStorage.setItem('list', JSON.stringify(this.list));
            },
            deep: true
        }
    },
    methods: {
        addTask: function() {
            this.list.push({ title: this.title, body: this.body, isCompleted: false });
            this.title = '';
            this.body = '';
        },
        editTask: function(task) {
            const title = prompt('Enter new title of the task, leave blank if not changed') || task.title;
            const body = prompt('Enter new description of the task, leave blank if not changed') || task.body;

            this.list.forEach((el) => {
                if (el.title == task.title) {
                    el.title = title;
                    el.body = body;
                }
            });
        },
        deleteTask: function(index) {
            this.list.splice(index, 1);
        },
        completeTask: function(task) {
            task.isCompleted = ! task.isCompleted;
            localStorage.setItem('list', JSON.stringify(this.list));
        },
    },
    computed: {
        orderedTasks: function() {
            return this.list.sort((a,b) => {
                return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0);
            });
        },
        isValidForm: function() {
            return this.title && this.body;
        }
    },
});
