const events = require('events');

class DB extends events.EventEmitter {
    
    // объявление массива db и инициализация начальными данными
    db = [ 
        {
            id: 1 ,
            name: 'test1',
            date: '01.01.2001' 
        }, 
        
        {
            id: 2 ,
            name: 'test2',
            date: '02.02.2002' 
        }, 
        
        {
            id: 3 ,
            name: 'test3', 
            date: '03.03.2003' 
        },
    ];

    // функция select, которая возвращает Promise с текущим состоянием массива db
    select = () => {
        return Promise.resolve(this.db);
    };

    // функция insert, которая принимает объект и добавляет его в массив db, если объекта с таким же id еще нет в массиве. Возвращает Promise с добавленным объектом.
    insert = (obj) => {
        var npos = this.db.find(x => x.id == obj.id);
             
        if(npos){
            return Promise.reject("Error");    
        }

        this.db.push(obj);
        return Promise.resolve(this.obj);
    }

    // функция update, которая принимает объект и обновляет объект с таким же id в массиве db, если он существует. Возвращает Promise с обновленным объектом.
    update = (obj) => {
        var npos = this.db.find(x => x.id == obj.id);

        if(!npos){
            return Promise.reject("Error");
        }
        
        this.db.splice(this.db.indexOf(npos),1, obj);
        return Promise.resolve(this.obj);
    }

    // функция delete, которая удаляет объект из массива db по заданному id, если он существует. Возвращает Promise с удаленным объектом.
    delete = (id) => {
        var npos = this.db.find(x => x.id == id );
        
        if(!npos){
            return Promise.reject("Error");
        }
        
        this.db.splice(this.db.indexOf(npos),1);
        return Promise.resolve(this.npos);
    }
}

// экспортируем созданный объект класса DB
module.exports = new DB();
