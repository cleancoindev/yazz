function(args) {
/*
is_app(true)
control_type("VB")
display_name("postgres client control")
description("This will return the postgres control")
base_component_id("postgres_client_component")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:     "sql",
            name:   "SQL",
            type:   "String",
            default: "SELECT * FROM pg_catalog.pg_tables;"
        }
        ,
        {
            id:     "text",
            name:   "Text",
            type:   "String",
            help:       `<div>Help text for
                            <b>text</b> property
                         </div>`
        }
        ,
        {
            id:     "result",
            name:   "result",
            type:   "Array",
            default:    []
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,
        {
            id:         "executeSql",
            snippet:    `executeSql()`,
            name:       "executeSql",
            type:       "Action",
            help:       `<div>Help text for
                            <b>executeSql</b> function
                            <div>The SQL is store in the "sql" property</div>
                         </div>`
        }
    ]
)//properties
logo_url("/driver_icons/postgres.jpg")
*/

    Vue.component("postgres_client_component",{
        props: ["meta","args", "name","refresh", "design_mode"]
        ,
        template: `<div v-bind:style='"white-space:normal;height:100%;width:100%; border: 0px;" +
                                    "background-color: "+    args["background_color"]  +  ";"'>
                                    Postgres:
                                                {{text}}
                 </div>`
        ,
        data: function() {
            return {
                text: ""
            }
        }
        ,
        watch: {
          // This would be called anytime the value of the input changes
          refresh(newValue, oldValue) {
            if (!this.design_mode) {
              //console.log("refresh: " + this.args.text)
              if (isValidObject(this.args)) {
                  this.text = this.args.text
              }
          }
          }
        },
        mounted: async function() {
            registerComponent(this)

            if (this.design_mode != true) {
           }
        }
        ,
        methods: {
            executeSql: async function() {
                if (!this.design_mode) {
                    var result = await callFunction(
                                        {
                                            driver_name: "postgres_server",
                                            method_name: "postgres_sql"  }
                                            ,{
                                                sql: this.args.sql
                                             })

                   debugger
                   //alert("executeSql: " + JSON.stringify(result,null,2))
                   console.log(JSON.stringify(result,null,2))
                   if (result.value) {
                        return result.value
                   }


               }
                this.changedFn()
                return {}
            }
            ,
            changedFn: function() {
                if (isValidObject(this.args)) {
                    this.args.text = this.text
                }
            }
        }
    })
}