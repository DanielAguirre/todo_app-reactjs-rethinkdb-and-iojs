'use strict'

var SimpleListRow = React.createClass({
    render: function(){
        var rows = this.props.simpleList;
        return (
            <ol>
                <li>{elemt.row}</li>
            </lo>
        )
    }
})

var SimpleList = React.createClass({
    getInitialState: function(){
        return {
            simpleList: [
                {
                    'row':'cargando   ....'
                }
            ]
        }
    },
    render: function(){
        return (
            <span>
                <p><strong>
                    Pasos para dominar un nuevo lenguage de programación
                </strong></p>
             </span>
        )
    }
})
