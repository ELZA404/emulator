var App = new Vue({
    el: '#humidity',
    template:
    '<div>'+
        '<table>'+
            '<tr>'+
                '<td>'+
                    '<label>Id</label>'+
                '</td>'+
                '<td>'+
                    '<input type="number" min="1" v-model="id">'+
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
                    '<label>Humidity</label>'+
                '</td>'+
                '<td>'+
                    '<input type="number" min="0" max="99" v-model="humidity"> pH'+
                '</td>'+
            '</tr>'+
//            '<tr>'+
//                '<td colspan="3">'+
//                    '<input type="button" value="Send" v-on:click="send()">'+
//                '</td>'+
//            '</tr>'+
//            '<tr>'+
//                '<td colspan="3">'+
//                    '<input type="button" value="Stop" v-on:click="stop()">'+
//                '</td>'+
//            '</tr>'+
        '</table>'+
    '</div>',
    data(){
        return{
            id: '',
            active: '',
            humidity: '',
        }

    },
    created(){
        this.interval = setInterval(() => this.getData(), 3000)
    },
    methods:{

        async getData(){
            if(this.id !== '' && this.id > 0){
                axios.get('/emul/humidity/' + this.id)
                .then(response => {
                    if(response.data != null){
                        this.id = response.data.id;
                        this.active = response.data.active;
                        this.humidity = response.data.humidity;
                        console.log(this.id);
                    }
                })
                .then(() => {
                    let lambda = Math.floor(Math.random() * 3) + 1;//генерация числа от 1 до 3 (для изменения влажности)
                    let move = Math.floor(Math.random() * 2) + 1;//генерация числа от 1 до 2 (дла случайного понижения или повышения)
                    let hum = this.humidity;
                    if(hum > 96){
                        hum -= lambda;//отнимаем чтоб не выйти за верхнее значение 99
                    }else if(hum < 3){
                        hum += lambda;//прибавляем чтоб не выйти за нижнее значение 0
                    }else{
                        if(move == 1){
                            hum += lambda;
                        }else {
                            hum -= lambda;
                        }
                    }
                    axios.post('/emul/humidity/' + this.id, {humidity: Number(hum)})
                })

            }
        },

        changeActive(event){
            if(event.target.value == 'true'){
                this.active = event.target.value;
            }else if( event.target.value == 'false'){
                this.active = event.target.value;
            }
        },

    }
})