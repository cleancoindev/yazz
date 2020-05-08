function(args) {
/*
is_app(true)
component_type("VB")
display_name("Button control")
description("This will return the button control")
base_component_id("button_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:       "text",
            name:     "Text",
            default:  "Click me",
            type:     "String",
            help:       `<div>This is the text that is displayed in the button
                         </div>`
        }
        ,
        {
            id:         "width",
            name:       "Width",
            default:    110,
            type:       "Number"
        }
        ,
        {
            id:         "height",
            name:       "Height",
            default:    50,
            type:       "Number"
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,
        {
            id:     "button_size",
            name:   "Button size",
            type:       "Select",
            default:    "large",
            values:     [
                            {display: "Large",   value: "large"},
                            {display: "Normal",  value: "normal"},
                            {display: "Small",  value: "small"}
                        ]
        }
        ,
        {
            id:     "click_event",
            name:   "Clicked event",
            type:   "Event",
            help:       `<div>Help text for
                            <b>click_event</b> event
                         </div>`
        }

    ]
)//properties
logo_url("/driver_icons/button_control.png")
*/

    Vue.component("button_control",{
      props: [ "meta", "form",  "name", "args" ]
      ,
      template: `<button    type=button
      v-bind:class='"btn btn-info " + (((args.button_size=="large") || (!args.button_size))?"btn-lg ":"")  + (args.button_size=="small"?"btn-sm ":"") '
                            v-bind:style='"height:100%;width:100%; border: 0px;" + "background-color: "+    args["background_color"]  +  ";"'
                            v-on:click='event_callback()'
                            >

                                                {{args.text}}
                 </button>`
    ,
    mounted: function() {
        registerComponent(this)

    }
    ,
    data: function() {
        return {
            msg: "..."
        }
    }
    ,
    methods: {
        event_callback: function() {
            console.log("----- button_control, event_callback: function() = " + this.name)
            //eval("(function(){" + this.args.click_event + "})")()

            this.$emit('send', {
                                            type:               "subcomponent_event",
                                            form_name:           this.meta.form,
                                            control_name:        this.meta.name,
                                            sub_type:           "click",
                                            code:                this.args.click_event
                                        })

        }
     }

    })
}
