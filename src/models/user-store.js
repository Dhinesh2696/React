import { extendObservable, action, computed} from 'mobx';
import fetch from 'isomorphic-fetch';




class UserStore {

    constructor() {
        extendObservable(this, {

        users : [],
        selectedUser : {},
        selectedId: computed(function () {
            return this.selectedUser.id;
        }),
          fetched:false,


        selectUser: action.bound(function (user) {
            this.selectedUser = user;
        }),

            getUsers:action.bound(()=> {
                this.fetchdata()
                    .then((res)=>{
                        console.log(res);
                        this.users=res;
                    })
            }),
            addUser:action.bound((value)=>{
            var self=this;
                fetch('http://192.168.1.24:3000/employee', {
                    method: "POST",
                    body: JSON.stringify(value),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(response) {
                    self.getUsers();
                }, function(error) {
                    console.log(error);
                })
            }),
            removeUser:action.bound((id)=>{
                var self=this;
                fetch('http://192.168.1.24:3000/employee/'+id, {
                    method: "DELETE",
                }).then(function(response) {
                    self.getUsers();
                }, function(error) {
                    console.log(error);
                })
            }),
            editUser:action.bound((value,id)=>{
                var self=this;
                fetch('http://192.168.1.24:3000/employee/'+id, {
                    method: "PUT",
                    body: JSON.stringify(value),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(response) {
                    self.getUsers();
                    self.clearSelectedUser;
                }, function(error) {
                    console.log(error);
                })

            }),
        clearSelectedUser: action.bound(function () {
            this.selectedUser = {};
        })


    });

    }

    fetchdata() {
       return fetch('http://192.168.1.24:3000/employee')
            .then(function (res) {
                return res.json();
            }).catch(function(ex) {
                return [];
            console.log('parsing failed', ex)
        })
    }


}

const store = new UserStore();

export default store;
export { UserStore };