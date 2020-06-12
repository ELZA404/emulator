var App = new Vue({
    el: '#acidity',
    template:
    '<div>'+
        '<table>'+
            '<tr>'+
                '<td>'+
                    '<label>Id</label>'+
                '</td>'+
                '<td>'+
                    '<input type="number" v-model="id" min="1">'+
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>'+
                    '<label>Active</label>'+
                '</td>'+
                '<td>'+
                    '<select @change="changeActive($event)" disabled>'+
                        '<option :selected="active == true" value="true">'+
                            'active'+
                        '</option>'+
                        '<option :selected="active == false" value="false">'+
                            'not active'+
                        '</option>'+
                    '</select>'+
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>'+
                    '<label>Acidity</label>'+
                '</td>'+
                '<td>'+
                    '<input type="number" v-model="acidity"> %'+
                '</td>'+
            '</tr>'+
        '</table>'+
    '</div>',
    data(){
        return{
            id: '',
            active: '',
            acidity: '',
        }
    },
    created(){
        this.interval = setInterval(() => this.getData(), 2000)//2000 мс = 2 сек
    },
    methods:{
        getData(){
            if (this.id !== '' && this.id > 0){
                axios.get("/emul/acidity/" + this.id)
                .then(response => {
                    if(response.data != null){
                        this.id = response.data.id;
                        this.active = response.data.active;
                        this.acidity = response.data.acidity;
                    }
                })
                .then(() => {
                    let lambda = Math.floor(Math.random() * 2) + 1;//Генерация числа от 1 до 2 (для смены значения кислотности)
                    let move = Math.floor(Math.random() * 2) + 1;//Генерация числа от 1 до 2 (для случайного понижения или повышения)
                    let acid = this.acidity;
                    if(acid < 3){
                        acid += lambda; // прибавляем чтоб не выйти за нижнее значение 1
                    }else if (acid > 12){
                        acid -= lambda; //отнимаем чтоб не выйти за верхнее значение 14
                    }else {
                        if(move == 1){
                            acid += lambda;
                        }else {
                            acid -= lambda;
                        }
                    }
                    axios.post('/emul/acidity/' + this.id, {acidity: Number(acid)})
                })
            }
        },

        changeActive(event){
            if(event.target.value == 'true'){
                this.active = event.target.value;
            }else if( event.target.value == 'false'){
                this.active = event.target.value;
            }
        }
    }
})