

    class todoClass {

        constructor(name, description) {
            if (!name) throw "necesitamos el nombre";
            this.name = name;
            this.description = description
            this.date = new Date();
            this.id = new Date().getTime();
            this.completed=false;

        }




    } 


